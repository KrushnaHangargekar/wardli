import test from 'node:test';
import assert from 'node:assert';
import { AuthService } from '../src/services/authService.js';
import { StorageRepository } from '../src/services/storage.js';

test('AuthService — Registration, Login, Session & Isolation', async (t) => {
  const mockStorage = new StorageRepository();
  const auth = new AuthService(mockStorage);

  await t.test('Register new user succeeds with valid credentials', async () => {
    const user = await auth.register({
      name: 'Sarah Connor',
      email: 'sarah@wardli.style',
      password: 'password123',
      preferredCurrency: 'EUR'
    });

    assert.ok(user.id.startsWith('usr_'));
    assert.strictEqual(user.name, 'Sarah Connor');
    assert.strictEqual(user.email, 'sarah@wardli.style');
    assert.strictEqual(auth.isAuthenticated(), true);

    const session = auth.getSession();
    assert.strictEqual(session.id, user.id);
    assert.strictEqual(session.email, 'sarah@wardli.style');

    // Check storage profile
    const profile = mockStorage.getProfile(user.id);
    assert.strictEqual(profile.displayName, 'Sarah Connor');
  });

  await t.test('Registration rejects duplicate email addresses', async () => {
    await assert.rejects(
      async () => {
        await auth.register({
          name: 'Sarah Duplicate',
          email: 'SARAH@wardli.style', // case-insensitive check
          password: 'password999'
        });
      },
      { message: 'An account with this email address already exists' }
    );
  });

  await t.test('Registration rejects short passwords (< 6 chars)', async () => {
    await assert.rejects(
      async () => {
        await auth.register({
          name: 'John Doe',
          email: 'john@wardli.style',
          password: '123'
        });
      },
      { message: 'Password must be at least 6 characters' }
    );
  });

  await t.test('Login with valid credentials establishes session', async () => {
    auth.logout();
    assert.strictEqual(auth.isAuthenticated(), false);

    const loggedIn = await auth.login({
      email: 'sarah@wardli.style',
      password: 'password123'
    });

    assert.strictEqual(loggedIn.email, 'sarah@wardli.style');
    assert.strictEqual(auth.isAuthenticated(), true);
    assert.strictEqual(mockStorage.getCurrentUserId(), loggedIn.id);
  });

  await t.test('Login with incorrect password fails', async () => {
    await assert.rejects(
      async () => {
        await auth.login({
          email: 'sarah@wardli.style',
          password: 'wrongpassword'
        });
      },
      { message: 'Incorrect password. Please try again' }
    );
  });

  await t.test('Login with non-existent email fails', async () => {
    await assert.rejects(
      async () => {
        await auth.login({
          email: 'nonexistent@wardli.style',
          password: 'password123'
        });
      },
      { message: 'No account found with this email address' }
    );
  });

  await t.test('Demo login allows instant access', async () => {
    const demo = auth.loginAsDemo('user_default');
    assert.strictEqual(demo.id, 'user_default');
    assert.strictEqual(auth.isAuthenticated(), true);
    assert.strictEqual(mockStorage.getCurrentUserId(), 'user_default');
  });

  await t.test('Logout terminates session', async () => {
    auth.logout();
    assert.strictEqual(auth.isAuthenticated(), false);
    assert.strictEqual(auth.getSession(), null);
  });
});
