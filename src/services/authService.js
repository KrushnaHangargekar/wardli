/**
 * Wardli Authentication & Session Service
 * Provides client-side user account registration, login verification, session persistence, and logout.
 * Implements strict user isolation and password hashing.
 */

import { storage } from './storage.js';

const USERS_COLLECTION = 'wardli_users_v1';
const SESSION_KEY = 'wardli_active_session_v1';

async function hashPassword(password) {
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  // Simple fallback for environments without crypto.subtle
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `h_${Math.abs(hash).toString(16)}`;
}

export class AuthService {
  constructor(storageRepo = storage) {
    this.storage = storageRepo;
    this.memorySession = null;
    this.memoryUsers = [];
    this._initializeDemoAccounts();
  }

  isBrowser() {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  _getUsers() {
    if (this.isBrowser()) {
      try {
        const raw = window.localStorage.getItem(USERS_COLLECTION);
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        console.error('Error reading users collection:', e);
        return [];
      }
    }
    return this.memoryUsers;
  }

  _saveUsers(users) {
    if (this.isBrowser()) {
      try {
        window.localStorage.setItem(USERS_COLLECTION, JSON.stringify(users));
      } catch (e) {
        console.error('Error saving users collection:', e);
      }
    } else {
      this.memoryUsers = users;
    }
  }

  async _initializeDemoAccounts() {
    const users = this._getUsers();
    const demoAccounts = [
      { id: 'user_default', email: 'alex@wardli.style', name: 'Alex Chen', role: 'Full Capsule Wardrobe' },
      { id: 'user_minimalist', email: 'jordan@wardli.style', name: 'Jordan Lee', role: 'Minimalist Wardrobe' }
    ];

    let updated = false;
    for (const demo of demoAccounts) {
      if (!users.some(u => u.id === demo.id || u.email === demo.email)) {
        const hash = await hashPassword('password123');
        users.push({
          id: demo.id,
          name: demo.name,
          email: demo.email,
          passwordHash: hash,
          isDemo: true,
          createdAt: new Date().toISOString()
        });
        updated = true;
      }
    }

    if (updated) {
      this._saveUsers(users);
    }
  }

  /**
   * Register a new user account
   */
  async register({ name, email, password, preferredCurrency = 'INR' }) {
    if (!name || !name.trim()) {
      throw new Error('Full name is required');
    }
    if (!email || !email.trim() || !email.includes('@')) {
      throw new Error('A valid email address is required');
    }
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    const cleanEmail = email.trim().toLowerCase();
    const users = this._getUsers();

    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      throw new Error('An account with this email address already exists');
    }

    const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const passwordHash = await hashPassword(password);

    const newUser = {
      id: userId,
      name: name.trim(),
      email: cleanEmail,
      passwordHash,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    this._saveUsers(users);

    // Initialize user profile in storage
    this.storage.saveProfile({
      id: userId,
      displayName: newUser.name,
      email: newUser.email,
      repeatAvoidanceDays: 7,
      customCategories: ['Outerwear', 'Activewear']
    });

    if (preferredCurrency) {
      this.storage.setCurrency(preferredCurrency);
    }

    // Automatically establish session
    this.setSession(newUser);
    this.storage.setCurrentUserId(userId);

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    };
  }

  /**
   * Log in with email and password
   */
  async login({ email, password }) {
    if (!email || !password) {
      throw new Error('Please enter both email and password');
    }

    const cleanEmail = email.trim().toLowerCase();
    const users = this._getUsers();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      throw new Error('No account found with this email address');
    }

    const hash = await hashPassword(password);
    if (user.passwordHash !== hash) {
      throw new Error('Incorrect password. Please try again');
    }

    this.setSession(user);
    this.storage.setCurrentUserId(user.id);

    return {
      id: user.id,
      name: user.name,
      email: user.email
    };
  }

  /**
   * Quick login as a demo account (Alex Chen or Jordan Lee)
   */
  loginAsDemo(userId = 'user_default') {
    const users = this._getUsers();
    let user = users.find(u => u.id === userId);
    if (!user) {
      user = {
        id: userId,
        name: userId === 'user_minimalist' ? 'Jordan Lee' : 'Alex Chen',
        email: `${userId}@wardli.style`,
        isDemo: true
      };
    }

    this.setSession(user);
    this.storage.setCurrentUserId(userId);
    return user;
  }

  /**
   * Set active session
   */
  setSession(user) {
    const sessionData = {
      id: user.id,
      name: user.name,
      email: user.email,
      isDemo: !!user.isDemo,
      loginAt: new Date().toISOString()
    };

    if (this.isBrowser()) {
      try {
        window.localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
      } catch (e) {
        console.error('Error saving session:', e);
      }
    } else {
      this.memorySession = sessionData;
    }
  }

  /**
   * Get active session
   */
  getSession() {
    if (this.isBrowser()) {
      try {
        const raw = window.localStorage.getItem(SESSION_KEY);
        return raw ? JSON.parse(raw) : null;
      } catch (e) {
        console.error('Error retrieving session:', e);
        return null;
      }
    }
    return this.memorySession;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return this.getSession() !== null;
  }

  /**
   * Log out active user and clear session
   */
  logout() {
    if (this.isBrowser()) {
      try {
        window.localStorage.removeItem(SESSION_KEY);
      } catch (e) {
        console.error('Error clearing session:', e);
      }
    }
    this.memorySession = null;
    this.storage.setCurrentUserId('user_default');
  }

  /**
   * Get all registered accounts (for multi-account quick switching)
   */
  getAllAccounts() {
    return this._getUsers().map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      isDemo: !!u.isDemo
    }));
  }
}

export const authService = new AuthService(storage);
