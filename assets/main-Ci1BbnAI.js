import"./modulepreload-polyfill-B5Qt9EMX.js";const ie={Tops:["T-shirt","Shirt","Hoodie","Sweater","Jacket","Polo","Overshirt"],Bottoms:["Jeans","Trousers","Shorts","Skirt","Chinos","Cargo Pants"],Footwear:["Sneakers","Formal Shoes","Boots","Sandals","Slippers","Loafers"],Accessories:["Watch","Belt","Sunglasses","Jewellery","Ring","Chain","Bracelet","Earrings","Wallet","Bag","Backpack","Cap","Hat","Scarf","Tie","Socks"]},F={CLEAN:"Clean",WORN:"Worn",IN_LAUNDRY:"In Laundry",RESERVED:"Reserved"},Z=["Casual","College","Office","Party","Formal","Travel"],de=[{name:"Black",hex:"#000000",isNeutral:!0},{name:"White",hex:"#FFFFFF",isNeutral:!0},{name:"Grey",hex:"#808080",isNeutral:!0},{name:"Navy",hex:"#001F3F",isNeutral:!0},{name:"Charcoal",hex:"#333333",isNeutral:!0},{name:"Beige",hex:"#F5F5DC",isNeutral:!0},{name:"Khaki",hex:"#C3B091",isNeutral:!0},{name:"Brown",hex:"#5C4033",isNeutral:!0},{name:"Cream",hex:"#FFFDD0",isNeutral:!0},{name:"Olive",hex:"#556B2F",isNeutral:!1},{name:"Blue",hex:"#2563EB",isNeutral:!1},{name:"Burgundy",hex:"#800020",isNeutral:!1},{name:"Emerald Green",hex:"#059669",isNeutral:!1},{name:"Rust Orange",hex:"#C2410C",isNeutral:!1},{name:"Pastel Pink",hex:"#F472B6",isNeutral:!1}],pe=7,R={INR:{code:"INR",symbol:"₹",label:"₹ INR (Indian Rupee)"},USD:{code:"USD",symbol:"$",label:"$ USD (US Dollar)"},EUR:{code:"EUR",symbol:"€",label:"€ EUR (Euro)"},GBP:{code:"GBP",symbol:"£",label:"£ GBP (British Pound)"}};function P({id:d=`garm_${Date.now()}_${Math.random().toString(36).substring(2,7)}`,userId:e,name:t,category:o,subcategory:r="",photoUrl:s="",primaryColor:i="Black",secondaryColor:l=null,occasions:a=["Casual"],status:c=F.CLEAN,purchasePrice:n=null,purchaseDate:h=null,wearCount:p=0,isArchived:g=!1,createdAt:S=new Date().toISOString(),updatedAt:u=new Date().toISOString()}){if(!e)throw new Error("Garment requires a valid userId");if(!t||typeof t!="string"||!t.trim())throw new Error("Garment requires a valid name");if(!o||typeof o!="string"||!o.trim())throw new Error("Garment requires a valid category");return{id:d,userId:e,name:t.trim(),category:o.trim(),subcategory:r?r.trim():"",photoUrl:s||"",primaryColor:i||"Black",secondaryColor:l||null,occasions:Array.isArray(a)&&a.length>0?a:["Casual"],status:Object.values(F).includes(c)?c:F.CLEAN,purchasePrice:n!==null&&!isNaN(Number(n))?Number(n):null,purchaseDate:h||null,wearCount:Number(p)||0,isArchived:!!g,createdAt:S,updatedAt:u}}function oe(d){return d?{id:d.id,name:d.name,category:d.category,subcategory:d.subcategory,photoUrl:d.photoUrl,primaryColor:d.primaryColor,secondaryColor:d.secondaryColor,occasions:[...d.occasions||[]],purchasePrice:d.purchasePrice,isArchived:!!d.isArchived}:null}function ue({id:d=`outfit_${Date.now()}_${Math.random().toString(36).substring(2,7)}`,userId:e,name:t="Saved Outfit",occasion:o="Casual",topId:r,bottomId:s,footwearId:i,accessoryIds:l=[],isFavorite:a=!1,createdAt:c=new Date().toISOString()}){if(!e)throw new Error("Outfit requires a valid userId");if(!r||!s||!i)throw new Error("Outfit requires topId, bottomId, and footwearId");return{id:d,userId:e,name:t.trim(),occasion:o,topId:r,bottomId:s,footwearId:i,accessoryIds:Array.isArray(l)?[...l]:[],isFavorite:!!a,createdAt:c}}function ce({id:d=`evt_${Date.now()}_${Math.random().toString(36).substring(2,7)}`,userId:e,outfitId:t=null,itemIds:o=[],itemSnapshots:r=[],wearDate:s=new Date().toISOString().split("T")[0],wearTime:i=null,occasion:l="Casual",notes:a="",createdAt:c=new Date().toISOString()}){if(!e)throw new Error("OutfitEvent requires a valid userId");if(!Array.isArray(o)||o.length===0)throw new Error("OutfitEvent requires at least one worn item ID");return{id:d,userId:e,outfitId:t||null,itemIds:[...o],itemSnapshots:r.map(n=>({...n})),wearDate:s,wearTime:i||null,occasion:l||"Casual",notes:(a||"").trim(),createdAt:c}}function Q({id:d=`plan_${Date.now()}_${Math.random().toString(36).substring(2,7)}`,userId:e,outfitId:t=null,topId:o,bottomId:r,footwearId:s,accessoryIds:i=[],plannedDate:l=new Date().toISOString().split("T")[0],occasion:a="Casual",notes:c="",status:n="Planned",historyEventId:h=null,createdAt:p=new Date().toISOString()}){if(!e)throw new Error("PlannedOutfit requires a valid userId");if(!o||!r||!s)throw new Error("PlannedOutfit requires topId, bottomId, and footwearId");return{id:d,userId:e,outfitId:t||null,topId:o,bottomId:r,footwearId:s,accessoryIds:Array.isArray(i)?[...i]:[],plannedDate:l,occasion:a,notes:(c||"").trim(),status:n,historyEventId:h||null,createdAt:p}}function he({id:d,displayName:e="Wardli User",email:t="user@wardli.style",repeatAvoidanceDays:o=7,customCategories:r=[],createdAt:s=new Date().toISOString()}){if(!d)throw new Error("Profile requires an id (userId)");return{id:d,displayName:e,email:t,repeatAvoidanceDays:Math.max(1,Number(o)||7),customCategories:Array.isArray(r)?[...r]:[],createdAt:s}}const ge="wardli_v1_";class me{constructor(){this.memoryStore={},this.currentUserId="user_default"}isBrowser(){return typeof window<"u"&&typeof window.localStorage<"u"}getCurrentUserId(){return this.currentUserId}setCurrentUserId(e){e&&(this.currentUserId=e)}getCurrency(){if(this.isBrowser())try{const e=window.localStorage.getItem(this._getKey("preferred_currency"));if(e&&R[e])return R[e]}catch{}return this.memoryStore.preferred_currency||R.INR}setCurrency(e){if(!R[e])return;const t=R[e];if(this.isBrowser())try{window.localStorage.setItem(this._getKey("preferred_currency"),e)}catch{}this.memoryStore.preferred_currency=t}_getKey(e){return`${ge}${e}`}_loadCollection(e){if(this.isBrowser())try{const t=window.localStorage.getItem(this._getKey(e));return t?JSON.parse(t):[]}catch(t){return console.error(`Error loading collection ${e}:`,t),[]}else return this.memoryStore[e]||[]}_saveCollection(e,t){if(this.isBrowser())try{window.localStorage.setItem(this._getKey(e),JSON.stringify(t))}catch(o){console.error(`Error saving collection ${e}:`,o)}else this.memoryStore[e]=t}_getAll(e,t=this.currentUserId){return this._loadCollection(e).filter(r=>r.userId===t)}_getById(e,t,o=this.currentUserId){return this._getAll(e,o).find(s=>s.id===t)||null}_save(e,t,o=this.currentUserId){const r=this._loadCollection(e),s=r.findIndex(l=>l.id===t.id&&l.userId===o),i={...t,userId:o};return s>=0?r[s]=i:r.push(i),this._saveCollection(e,r),i}_update(e,t,o,r=this.currentUserId){const s=this._loadCollection(e),i=s.findIndex(l=>l.id===t&&l.userId===r);return i===-1?null:(s[i]={...s[i],...o,userId:r,id:t,updatedAt:new Date().toISOString()},this._saveCollection(e,s),s[i])}_delete(e,t,o=this.currentUserId){const s=this._loadCollection(e).filter(i=>!(i.id===t&&i.userId===o));return this._saveCollection(e,s),!0}getProfile(e=this.currentUserId){return this._loadCollection("profiles").find(o=>o.id===e)||null}saveProfile(e){const t=this._loadCollection("profiles"),o=t.findIndex(r=>r.id===e.id);return o>=0?t[o]={...t[o],...e}:t.push(e),this._saveCollection("profiles",t),e}getGarments(e=this.currentUserId,{includeArchived:t=!1,category:o=null,status:r=null}={}){let s=this._getAll("garments",e);return t||(s=s.filter(i=>!i.isArchived)),o&&o!=="All"&&(s=s.filter(i=>i.category.toLowerCase()===o.toLowerCase())),r&&r!=="All"&&(s=s.filter(i=>i.status===r)),s}getGarment(e,t=this.currentUserId){return this._getById("garments",e,t)}saveGarment(e,t=this.currentUserId){return this._save("garments",e,t)}updateGarment(e,t,o=this.currentUserId){return this._update("garments",e,t,o)}archiveGarment(e,t=this.currentUserId){return this._update("garments",e,{isArchived:!0},t)}unarchiveGarment(e,t=this.currentUserId){return this._update("garments",e,{isArchived:!1},t)}deleteGarment(e,t=this.currentUserId){return this._delete("garments",e,t)}getOutfits(e=this.currentUserId){return this._getAll("outfits",e)}getOutfit(e,t=this.currentUserId){return this._getById("outfits",e,t)}saveOutfit(e,t=this.currentUserId){return this._save("outfits",e,t)}deleteOutfit(e,t=this.currentUserId){return this._delete("outfits",e,t)}getHistoryEvents(e=this.currentUserId,{occasion:t=null,fromDate:o=null,toDate:r=null}={}){let s=this._getAll("outfit_events",e);return t&&t!=="All"&&(s=s.filter(i=>i.occasion.toLowerCase()===t.toLowerCase())),o&&(s=s.filter(i=>i.wearDate>=o)),r&&(s=s.filter(i=>i.wearDate<=r)),s.sort((i,l)=>{const a=l.wearDate.localeCompare(i.wearDate);return a!==0?a:(l.wearTime||"").localeCompare(i.wearTime||"")})}getHistoryEvent(e,t=this.currentUserId){return this._getById("outfit_events",e,t)}saveHistoryEvent(e,t=this.currentUserId){return this._save("outfit_events",e,t)}updateHistoryEvent(e,t,o=this.currentUserId){return this._update("outfit_events",e,t,o)}deleteHistoryEvent(e,t=this.currentUserId){return this._delete("outfit_events",e,t)}getPlannedOutfits(e=this.currentUserId,{status:t=null,fromDate:o=null,toDate:r=null}={}){let s=this._getAll("planned_outfits",e);return t&&t!=="All"&&(s=s.filter(i=>i.status===t)),o&&(s=s.filter(i=>i.plannedDate>=o)),r&&(s=s.filter(i=>i.plannedDate<=r)),s.sort((i,l)=>i.plannedDate.localeCompare(l.plannedDate))}getPlannedOutfit(e,t=this.currentUserId){return this._getById("planned_outfits",e,t)}savePlannedOutfit(e,t=this.currentUserId){return this._save("planned_outfits",e,t)}updatePlannedOutfit(e,t,o=this.currentUserId){return this._update("planned_outfits",e,t,o)}deletePlannedOutfit(e,t=this.currentUserId){return this._delete("planned_outfits",e,t)}getFeedback(e=this.currentUserId){return this._getAll("outfit_feedback",e)}saveFeedback(e,t=this.currentUserId){return this._save("outfit_feedback",e,t)}exportAllUserData(e=this.currentUserId){return{profile:this.getProfile(e),garments:this._getAll("garments",e),outfits:this._getAll("outfits",e),outfit_events:this._getAll("outfit_events",e),planned_outfits:this._getAll("planned_outfits",e),outfit_feedback:this._getAll("outfit_feedback",e),exportedAt:new Date().toISOString()}}importUserData(e,t=this.currentUserId){return e?(e.profile&&this.saveProfile({...e.profile,id:t}),Array.isArray(e.garments)&&e.garments.forEach(o=>this.saveGarment({...o,userId:t},t)),Array.isArray(e.outfits)&&e.outfits.forEach(o=>this.saveOutfit({...o,userId:t},t)),Array.isArray(e.outfit_events)&&e.outfit_events.forEach(o=>this.saveHistoryEvent({...o,userId:t},t)),Array.isArray(e.planned_outfits)&&e.planned_outfits.forEach(o=>this.savePlannedOutfit({...o,userId:t},t)),!0):!1}clearUserData(e=this.currentUserId){["garments","outfits","outfit_events","planned_outfits","outfit_feedback"].forEach(o=>{const s=this._loadCollection(o).filter(i=>i.userId!==e);this._saveCollection(o,s)})}}const y=new me;function z(d,e=y.getCurrency()){if(d==null||isNaN(Number(d)))return"";const t=Number(d),o=t%1===0?t.toLocaleString():t.toFixed(2);return`${e.symbol}${o}`}const ae="wardli_users_v1",te="wardli_active_session_v1";async function se(d){if(typeof crypto<"u"&&crypto.subtle){const o=new TextEncoder().encode(d),r=await crypto.subtle.digest("SHA-256",o);return Array.from(new Uint8Array(r)).map(i=>i.toString(16).padStart(2,"0")).join("")}let e=0;for(let t=0;t<d.length;t++){const o=d.charCodeAt(t);e=(e<<5)-e+o,e|=0}return`h_${Math.abs(e).toString(16)}`}class ye{constructor(e=y){this.storage=e,this.memorySession=null,this.memoryUsers=[],this._initializeDemoAccounts()}isBrowser(){return typeof window<"u"&&typeof window.localStorage<"u"}_getUsers(){if(this.isBrowser())try{const e=window.localStorage.getItem(ae);return e?JSON.parse(e):[]}catch(e){return console.error("Error reading users collection:",e),[]}return this.memoryUsers}_saveUsers(e){if(this.isBrowser())try{window.localStorage.setItem(ae,JSON.stringify(e))}catch(t){console.error("Error saving users collection:",t)}else this.memoryUsers=e}async _initializeDemoAccounts(){const e=this._getUsers(),t=[{id:"user_default",email:"alex@wardli.style",name:"Alex Chen",role:"Full Capsule Wardrobe"},{id:"user_minimalist",email:"jordan@wardli.style",name:"Jordan Lee",role:"Minimalist Wardrobe"}];let o=!1;for(const r of t)if(!e.some(s=>s.id===r.id||s.email===r.email)){const s=await se("password123");e.push({id:r.id,name:r.name,email:r.email,passwordHash:s,isDemo:!0,createdAt:new Date().toISOString()}),o=!0}o&&this._saveUsers(e)}async register({name:e,email:t,password:o,preferredCurrency:r="INR"}){if(!e||!e.trim())throw new Error("Full name is required");if(!t||!t.trim()||!t.includes("@"))throw new Error("A valid email address is required");if(!o||o.length<6)throw new Error("Password must be at least 6 characters");const s=t.trim().toLowerCase(),i=this._getUsers();if(i.some(n=>n.email.toLowerCase()===s))throw new Error("An account with this email address already exists");const l=`usr_${Date.now()}_${Math.random().toString(36).substring(2,7)}`,a=await se(o),c={id:l,name:e.trim(),email:s,passwordHash:a,createdAt:new Date().toISOString()};return i.push(c),this._saveUsers(i),this.storage.saveProfile({id:l,displayName:c.name,email:c.email,repeatAvoidanceDays:7,customCategories:["Outerwear","Activewear"]}),r&&this.storage.setCurrency(r),this.setSession(c),this.storage.setCurrentUserId(l),{id:c.id,name:c.name,email:c.email}}async login({email:e,password:t}){if(!e||!t)throw new Error("Please enter both email and password");const o=e.trim().toLowerCase(),s=this._getUsers().find(l=>l.email.toLowerCase()===o);if(!s)throw new Error("No account found with this email address");const i=await se(t);if(s.passwordHash!==i)throw new Error("Incorrect password. Please try again");return this.setSession(s),this.storage.setCurrentUserId(s.id),{id:s.id,name:s.name,email:s.email}}loginAsDemo(e="user_default"){let o=this._getUsers().find(r=>r.id===e);return o||(o={id:e,name:e==="user_minimalist"?"Jordan Lee":"Alex Chen",email:`${e}@wardli.style`,isDemo:!0}),this.setSession(o),this.storage.setCurrentUserId(e),o}setSession(e){const t={id:e.id,name:e.name,email:e.email,isDemo:!!e.isDemo,loginAt:new Date().toISOString()};if(this.isBrowser())try{window.localStorage.setItem(te,JSON.stringify(t))}catch(o){console.error("Error saving session:",o)}else this.memorySession=t}getSession(){if(this.isBrowser())try{const e=window.localStorage.getItem(te);return e?JSON.parse(e):null}catch(e){return console.error("Error retrieving session:",e),null}return this.memorySession}isAuthenticated(){return this.getSession()!==null}logout(){if(this.isBrowser())try{window.localStorage.removeItem(te)}catch(e){console.error("Error clearing session:",e)}this.memorySession=null,this.storage.setCurrentUserId("user_default")}getAllAccounts(){return this._getUsers().map(e=>({id:e.id,name:e.name,email:e.email,isDemo:!!e.isDemo}))}}const O=new ye(y);function re(d="user_default"){const e=he({id:d,displayName:"Alex Chen",email:"alex@wardli.style",repeatAvoidanceDays:7,customCategories:["Outerwear","Activewear"]}),t=[P({id:"g_top_1",userId:d,name:"Heavyweight Relaxed Tee",category:"Tops",subcategory:"T-shirt",primaryColor:"Black",secondaryColor:null,occasions:["Casual","College","Travel"],status:F.CLEAN,purchasePrice:1499,purchaseDate:"2026-08-15",wearCount:6}),P({id:"g_top_2",userId:d,name:"Boxy Cotton Tee",category:"Tops",subcategory:"T-shirt",primaryColor:"White",secondaryColor:null,occasions:["Casual","College","Party"],status:F.CLEAN,purchasePrice:1299,purchaseDate:"2026-08-20",wearCount:5}),P({id:"g_top_3",userId:d,name:"Charcoal Knit Sweater",category:"Tops",subcategory:"Sweater",primaryColor:"Charcoal",secondaryColor:null,occasions:["Office","Formal","Casual"],status:F.CLEAN,purchasePrice:3499,purchaseDate:"2026-09-05",wearCount:4}),P({id:"g_top_4",userId:d,name:"Oxford Button-Down Shirt",category:"Tops",subcategory:"Shirt",primaryColor:"White",secondaryColor:null,occasions:["Office","Formal","Party"],status:F.CLEAN,purchasePrice:2499,purchaseDate:"2026-07-12",wearCount:3}),P({id:"g_top_5",userId:d,name:"Minimalist Black Overshirt",category:"Tops",subcategory:"Jacket",primaryColor:"Black",secondaryColor:null,occasions:["Office","Casual","Party","College"],status:F.CLEAN,purchasePrice:3999,purchaseDate:"2026-06-10",wearCount:7}),P({id:"g_top_6",userId:d,name:"Structured Fleece Hoodie",category:"Tops",subcategory:"Hoodie",primaryColor:"Grey",secondaryColor:null,occasions:["Casual","College","Travel"],status:F.IN_LAUNDRY,purchasePrice:2999,purchaseDate:"2026-09-18",wearCount:2}),P({id:"g_top_7",userId:d,name:"Tailored Wool Overcoat",category:"Tops",subcategory:"Jacket",primaryColor:"Beige",secondaryColor:null,occasions:["Formal","Party"],status:F.RESERVED,purchasePrice:8999,purchaseDate:"2026-05-14",wearCount:1}),P({id:"g_bot_1",userId:d,name:"Relaxed Pleated Trousers",category:"Bottoms",subcategory:"Trousers",primaryColor:"Black",secondaryColor:null,occasions:["Office","Formal","Casual","Party"],status:F.CLEAN,purchasePrice:3499,purchaseDate:"2026-07-22",wearCount:7}),P({id:"g_bot_2",userId:d,name:"Straight Leg Selvedge Jeans",category:"Bottoms",subcategory:"Jeans",primaryColor:"Navy",secondaryColor:null,occasions:["Casual","College","Travel","Party"],status:F.CLEAN,purchasePrice:4299,purchaseDate:"2026-08-01",wearCount:8}),P({id:"g_bot_3",userId:d,name:"Wide-Leg Minimal Chinos",category:"Bottoms",subcategory:"Chinos",primaryColor:"Khaki",secondaryColor:null,occasions:["Casual","College","Office"],status:F.CLEAN,purchasePrice:2799,purchaseDate:"2026-09-02",wearCount:3}),P({id:"g_bot_4",userId:d,name:"Tailored Linen Shorts",category:"Bottoms",subcategory:"Shorts",primaryColor:"Charcoal",secondaryColor:null,occasions:["Casual","Travel"],status:F.CLEAN,purchasePrice:1899,purchaseDate:"2026-06-25",wearCount:2}),P({id:"g_shoe_1",userId:d,name:"Clean Leather Low Sneakers",category:"Footwear",subcategory:"Sneakers",primaryColor:"White",secondaryColor:null,occasions:["Casual","College","Office","Travel"],status:F.CLEAN,purchasePrice:5499,purchaseDate:"2026-07-15",wearCount:10}),P({id:"g_shoe_2",userId:d,name:"Chunky Sole Leather Derbies",category:"Footwear",subcategory:"Formal Shoes",primaryColor:"Black",secondaryColor:null,occasions:["Formal","Office","Party"],status:F.CLEAN,purchasePrice:6999,purchaseDate:"2026-05-10",wearCount:5}),P({id:"g_shoe_3",userId:d,name:"Suede Chelsea Boots",category:"Footwear",subcategory:"Boots",primaryColor:"Brown",secondaryColor:null,occasions:["Casual","Office","Party"],status:F.CLEAN,purchasePrice:7499,purchaseDate:"2026-08-30",wearCount:4}),P({id:"g_acc_1",userId:d,name:"Minimal Chronograph Watch",category:"Accessories",subcategory:"Watch",primaryColor:"Black",secondaryColor:"White",occasions:["Casual","Office","Formal","Party","College"],status:F.CLEAN,purchasePrice:5999,purchaseDate:"2026-04-10",wearCount:9}),P({id:"g_acc_2",userId:d,name:"Matte Leather Belt",category:"Accessories",subcategory:"Belt",primaryColor:"Black",secondaryColor:null,occasions:["Casual","Office","Formal"],status:F.CLEAN,purchasePrice:1699,purchaseDate:"2026-06-01",wearCount:8}),P({id:"g_acc_3",userId:d,name:"Geometric Acetate Sunglasses",category:"Accessories",subcategory:"Sunglasses",primaryColor:"Black",secondaryColor:null,occasions:["Casual","Travel","Party"],status:F.CLEAN,purchasePrice:2499,purchaseDate:"2026-07-04",wearCount:6}),P({id:"g_acc_4",userId:d,name:"Sterling Silver Signet Ring",category:"Accessories",subcategory:"Ring",primaryColor:"Grey",secondaryColor:null,occasions:["Party","Casual","College"],status:F.CLEAN,purchasePrice:1999,purchaseDate:"2026-08-12",wearCount:5}),P({id:"g_acc_5",userId:d,name:"Everyday Minimalist Backpack",category:"Accessories",subcategory:"Backpack",primaryColor:"Charcoal",secondaryColor:null,occasions:["College","Office","Travel"],status:F.CLEAN,purchasePrice:3499,purchaseDate:"2026-08-25",wearCount:7}),P({id:"g_acc_6",userId:d,name:'Wardli "w." Embroidered Cap',category:"Accessories",subcategory:"Cap",primaryColor:"Black",secondaryColor:"White",occasions:["Casual","College","Travel"],status:F.CLEAN,purchasePrice:999,purchaseDate:"2026-09-01",wearCount:4})],o=new Map(t.map(f=>[f.id,f]));function r(f,k,m,E,_,v,w,L=""){const N=[E,_,v,...w],G=N.map(H=>{const J=o.get(H);return J?oe(J):null}).filter(Boolean);return ce({id:f,userId:d,itemIds:N,itemSnapshots:G,wearDate:k,wearTime:"09:30",occasion:m,notes:L})}const s=new Date().toISOString().split("T")[0],i=new Date;i.setDate(i.getDate()-1);const l=i.toISOString().split("T")[0],a=new Date;a.setDate(a.getDate()-3);const c=a.toISOString().split("T")[0],n=new Date;n.setDate(n.getDate()-4);const h=n.toISOString().split("T")[0],p=new Date;p.setDate(p.getDate()-6);const g=p.toISOString().split("T")[0],S=[r("evt_demo_1",s,"Casual","g_top_1","g_bot_2","g_shoe_1",["g_acc_1","g_acc_6"],"Morning coffee & campus visit"),r("evt_demo_2",s,"Party","g_top_5","g_bot_1","g_shoe_2",["g_acc_1","g_acc_4"],"Evening gallery opening look"),r("evt_demo_3",l,"College","g_top_2","g_bot_2","g_shoe_1",["g_acc_5"],"Design studio class"),r("evt_demo_4",l,"Casual","g_top_1","g_bot_3","g_shoe_1",["g_acc_3"],"Afternoon stroll"),r("evt_demo_5",c,"Office","g_top_4","g_bot_1","g_shoe_2",["g_acc_1","g_acc_2"],"Client presentation outfit"),r("evt_demo_6",h,"Travel","g_top_2","g_bot_2","g_shoe_1",["g_acc_3","g_acc_5"],"Weekend getaway travel look"),r("evt_demo_7",g,"Formal","g_top_3","g_bot_1","g_shoe_2",["g_acc_1"],"Formal dinner banquet")],u=new Date;u.setDate(u.getDate()+1);const x=u.toISOString().split("T")[0],A=new Date;A.setDate(A.getDate()+2);const D=A.toISOString().split("T")[0],b=new Date;b.setDate(b.getDate()+3);const C=b.toISOString().split("T")[0],$=[Q({id:"plan_demo_1",userId:d,topId:"g_top_4",bottomId:"g_bot_1",footwearId:"g_shoe_2",accessoryIds:["g_acc_1","g_acc_2"],plannedDate:x,occasion:"Office",notes:"Quarterly review meeting",status:"Planned"}),Q({id:"plan_demo_2",userId:d,topId:"g_top_6",bottomId:"g_bot_2",footwearId:"g_shoe_1",accessoryIds:["g_acc_5"],plannedDate:D,occasion:"College",notes:"Library study session",status:"Planned"}),Q({id:"plan_demo_3",userId:d,topId:"g_top_5",bottomId:"g_bot_3",footwearId:"g_shoe_1",accessoryIds:["g_acc_3","g_acc_4"],plannedDate:C,occasion:"Casual",notes:"Saturday brunch with friends",status:"Planned"})];return{profile:e,garments:t,events:S,plannedOutfits:$}}function fe(d){const e=d.getCurrentUserId();if(d.getGarments(e,{includeArchived:!0}).length===0){const o=re(e);return d.saveProfile(o.profile),o.garments.forEach(r=>d.saveGarment(r,e)),o.events.forEach(r=>d.saveHistoryEvent(r,e)),o.plannedOutfits.forEach(r=>d.savePlannedOutfit(r,e)),!0}return!1}const j={appIcon:`
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="wardli-logo-svg">
      <rect width="100" height="100" rx="22" fill="#000000"/>
      <path d="M26 36L34.5 64L43 38H49L57.5 64L66 36H73L61 74H54L46 48L38 74H31L19 36H26Z" fill="#FFFFFF"/>
      <circle cx="76.5" cy="71" r="3.5" fill="#FFFFFF"/>
    </svg>
  `,wardrobeIcon:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3c0 .7.3 1.3.8 1.8L2 14v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4l-7.8-7.2c.5-.5.8-1.1.8-1.8a3 3 0 0 0-3-3z"/>
    </svg>
  `,outfitIcon:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/>
    </svg>
  `,plannerIcon:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
      <line x1="16" x2="16" y1="2" y2="6"/>
      <line x1="8" x2="8" y1="2" y2="6"/>
      <line x1="3" x2="21" y1="10" y2="10"/>
    </svg>
  `,historyIcon:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  `,analyticsIcon:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" x2="18" y1="20" y2="10"/>
      <line x1="12" x2="12" y1="20" y2="4"/>
      <line x1="6" x2="6" y1="20" y2="14"/>
    </svg>
  `,profileIcon:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="8" r="5"/>
      <path d="M20 21a8 8 0 0 0-16 0"/>
    </svg>
  `};function B(d="Tops",e="T-shirt",t="#1F1F1F"){const o=(d||"").toLowerCase(),r=(e||"").toLowerCase(),s=["white","#ffffff","cream","#fffdd0","beige"].includes(t.toLowerCase()),i=s?"#27272A":"#18181B",l=s?"#F4F4F5":t.startsWith("#")?t:"#27272A";return o==="tops"?r.includes("shirt")?`
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <path d="M35 25L45 15H75L85 25L108 40L95 62L82 52V105H38V52L25 62L12 40L35 25Z" fill="${l}" stroke="${i}" stroke-width="2.5" stroke-linejoin="round"/>
          <path d="M60 15V105" stroke="${s?"#71717A":"#52525B"}" stroke-width="1.5" stroke-dasharray="2 3"/>
          <path d="M45 15L60 30L75 15" stroke="${i}" stroke-width="2" fill="none"/>
        </svg>
      `:r.includes("hoodie")?`
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <path d="M38 28C38 18 48 12 60 12C72 12 82 18 82 28L106 42L94 66L82 56V106H38V56L26 66L14 42L38 28Z" fill="${l}" stroke="${i}" stroke-width="2.5" stroke-linejoin="round"/>
          <path d="M48 24C48 34 72 34 72 24" stroke="${i}" stroke-width="2"/>
          <rect x="46" y="80" width="28" height="18" rx="3" stroke="${s?"#71717A":"#52525B"}" stroke-width="1.5" fill="none"/>
        </svg>
      `:r.includes("jacket")||r.includes("coat")?`
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <path d="M34 26L48 18H72L86 26L108 44L94 68L84 56V108H36V56L26 68L12 44L34 26Z" fill="${l}" stroke="${i}" stroke-width="2.5" stroke-linejoin="round"/>
          <path d="M48 18L58 48H62L72 18" stroke="${i}" stroke-width="2"/>
          <line x1="60" y1="48" x2="60" y2="108" stroke="${s?"#71717A":"#52525B"}" stroke-width="2"/>
        </svg>
      `:`
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <path d="M36 22C42 27 78 27 84 22L106 38L92 60L82 52V104H38V52L28 60L14 38L36 22Z" fill="${l}" stroke="${i}" stroke-width="2.5" stroke-linejoin="round"/>
          <path d="M46 22C46 29 74 29 74 22" stroke="${i}" stroke-width="2"/>
        </svg>
      `:o==="bottoms"?r.includes("short")?`
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <path d="M36 20H84L90 74H64L60 48L56 74H30L36 20Z" fill="${l}" stroke="${i}" stroke-width="2.5" stroke-linejoin="round"/>
          <line x1="36" y1="28" x2="84" y2="28" stroke="${s?"#71717A":"#52525B"}" stroke-width="1.5"/>
        </svg>
      `:`
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <path d="M38 18H82L88 108H64L60 54L56 108H32L38 18Z" fill="${l}" stroke="${i}" stroke-width="2.5" stroke-linejoin="round"/>
          <line x1="38" y1="26" x2="82" y2="26" stroke="${s?"#71717A":"#52525B"}" stroke-width="1.5"/>
          <line x1="60" y1="26" x2="60" y2="48" stroke="${s?"#71717A":"#52525B"}" stroke-width="1.5"/>
        </svg>
      `:o==="footwear"?r.includes("boot")?`
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <path d="M42 30H70V65L96 74C102 76 104 84 98 90L92 94H26C22 94 20 88 22 84L32 60L42 30Z" fill="${l}" stroke="${i}" stroke-width="2.5" stroke-linejoin="round"/>
          <path d="M22 94H94" stroke="${i}" stroke-width="4"/>
        </svg>
      `:r.includes("formal")||r.includes("derbies")||r.includes("loafer")?`
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <path d="M26 62C34 50 56 50 68 58L98 68C106 72 104 84 96 86H20C16 86 16 74 26 62Z" fill="${l}" stroke="${i}" stroke-width="2.5" stroke-linejoin="round"/>
          <path d="M18 86H98" stroke="${i}" stroke-width="4"/>
          <rect x="22" y="86" width="16" height="5" fill="${i}"/>
        </svg>
      `:`
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <path d="M28 58C36 48 54 48 64 54L96 64C104 68 104 78 98 84H20C16 84 16 72 28 58Z" fill="${l}" stroke="${i}" stroke-width="2.5" stroke-linejoin="round"/>
          <line x1="48" y1="56" x2="60" y2="66" stroke="${s?"#71717A":"#52525B"}" stroke-width="1.5"/>
          <line x1="56" y1="58" x2="68" y2="68" stroke="${s?"#71717A":"#52525B"}" stroke-width="1.5"/>
          <path d="M18 84H98" stroke="${i}" stroke-width="5" stroke-linecap="round"/>
        </svg>
      `:o==="accessories"?r.includes("watch")?`
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <rect x="48" y="14" width="24" height="92" rx="3" fill="${l}" stroke="${i}" stroke-width="2"/>
          <circle cx="60" cy="60" r="24" fill="#FFFFFF" stroke="${i}" stroke-width="3"/>
          <circle cx="60" cy="60" r="2" fill="${i}"/>
          <line x1="60" y1="60" x2="60" y2="44" stroke="${i}" stroke-width="2" stroke-linecap="round"/>
          <line x1="60" y1="60" x2="72" y2="60" stroke="${i}" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `:r.includes("sunglasses")?`
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="48" width="34" height="26" rx="6" fill="${l}" stroke="${i}" stroke-width="2.5"/>
          <rect x="66" y="48" width="34" height="26" rx="6" fill="${l}" stroke="${i}" stroke-width="2.5"/>
          <path d="M54 54C57 51 63 51 66 54" stroke="${i}" stroke-width="2.5"/>
          <line x1="20" y1="52" x2="10" y2="46" stroke="${i}" stroke-width="2"/>
          <line x1="100" y1="52" x2="110" y2="46" stroke="${i}" stroke-width="2"/>
        </svg>
      `:r.includes("belt")?`
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <rect x="18" y="50" width="84" height="20" rx="3" fill="${l}" stroke="${i}" stroke-width="2"/>
          <rect x="48" y="44" width="24" height="32" rx="4" stroke="${i}" stroke-width="3" fill="#FFFFFF"/>
          <line x1="60" y1="50" x2="60" y2="70" stroke="${i}" stroke-width="3"/>
        </svg>
      `:r.includes("ring")?`
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="60" cy="62" rx="26" ry="24" stroke="${i}" stroke-width="4" fill="none"/>
          <rect x="46" y="36" width="28" height="14" rx="3" fill="${l}" stroke="${i}" stroke-width="2"/>
        </svg>
      `:r.includes("bag")||r.includes("backpack")?`
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <path d="M48 30C48 22 72 22 72 30" stroke="${i}" stroke-width="2.5" fill="none"/>
          <rect x="30" y="30" width="60" height="66" rx="8" fill="${l}" stroke="${i}" stroke-width="2.5"/>
          <rect x="40" y="60" width="40" height="26" rx="4" stroke="${s?"#71717A":"#52525B"}" stroke-width="1.5" fill="none"/>
        </svg>
      `:r.includes("cap")||r.includes("hat")?`
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 65C30 40 90 40 90 65" stroke="${i}" stroke-width="2.5" fill="${l}"/>
          <path d="M22 65C22 65 50 62 98 68C104 69 104 74 98 75H22C18 75 18 65 22 65Z" fill="${i}"/>
          <circle cx="60" cy="40" r="3" fill="${i}"/>
        </svg>
      `:`
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="30" stroke="${i}" stroke-width="2.5" fill="${l}"/>
          <path d="M48 60L56 68L72 52" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `:`
    <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="30" width="60" height="60" rx="8" fill="${l}" stroke="${i}" stroke-width="2"/>
    </svg>
  `}class ve{constructor(e=y){this.storage=e}recordWear({userId:e=this.storage.getCurrentUserId(),outfitId:t=null,itemIds:o=[],wearDate:r=new Date().toISOString().split("T")[0],wearTime:s=new Date().toTimeString().substring(0,5),occasion:i="Casual",notes:l="",updateGarmentStatus:a=!0}){if(!e)throw new Error("User ID required");if(!Array.isArray(o)||o.length===0)throw new Error("At least one item must be selected to record wear");const c=[];o.forEach(h=>{const p=this.storage.getGarment(h,e);p?c.push(oe(p)):c.push({id:h,name:"Archived Item",category:"Garment",photoUrl:"",primaryColor:"Unknown",isArchived:!0})});const n=ce({userId:e,outfitId:t,itemIds:o,itemSnapshots:c,wearDate:r,wearTime:s,occasion:i,notes:l});return this.storage.saveHistoryEvent(n,e),o.forEach(h=>{const p=this.storage.getGarment(h,e);if(p){const g={wearCount:(p.wearCount||0)+1};a&&p.status===F.CLEAN&&(g.status=F.WORN),this.storage.updateGarment(h,g,e)}}),n}addManualPastOutfit({userId:e=this.storage.getCurrentUserId(),outfitId:t=null,itemIds:o=[],wearDate:r,wearTime:s=null,occasion:i="Casual",notes:l=""}){if(!r)throw new Error("Valid past wearDate (YYYY-MM-DD) is required");const a=r===new Date().toISOString().split("T")[0];return this.recordWear({userId:e,outfitId:t,itemIds:o,wearDate:r,wearTime:s,occasion:i,notes:l,updateGarmentStatus:a})}updateHistoryEntry(e,t,o=this.storage.getCurrentUserId()){const r=this.storage.getHistoryEvent(e,o);if(!r)throw new Error(`History entry not found: ${e}`);if(t.itemIds&&Array.isArray(t.itemIds)){const s=new Set(r.itemIds),i=new Set(t.itemIds);s.forEach(a=>{if(!i.has(a)){const c=this.storage.getGarment(a,o);c&&this.storage.updateGarment(a,{wearCount:Math.max(0,(c.wearCount||1)-1)},o)}}),i.forEach(a=>{if(!s.has(a)){const c=this.storage.getGarment(a,o);c&&this.storage.updateGarment(a,{wearCount:(c.wearCount||0)+1},o)}});const l=t.itemIds.map(a=>{const c=this.storage.getGarment(a,o);return c?oe(c):{id:a,name:"Item",isArchived:!0}});t.itemSnapshots=l}return this.storage.updateHistoryEvent(e,t,o)}deleteHistoryEntry(e,t=this.storage.getCurrentUserId()){const o=this.storage.getHistoryEvent(e,t);return o?(o.itemIds.forEach(r=>{const s=this.storage.getGarment(r,t);s&&this.storage.updateGarment(r,{wearCount:Math.max(0,(s.wearCount||1)-1)},t)}),this.storage.deleteHistoryEvent(e,t)):!1}getGroupedHistory(e=this.storage.getCurrentUserId(),t="day",o={}){const r=this.storage.getHistoryEvents(e,o),s=new Map,i=new Date().toISOString().split("T")[0],l=new Date;l.setDate(l.getDate()-1);const a=l.toISOString().split("T")[0];return r.forEach(c=>{let n,h;const p=new Date(c.wearDate+"T00:00:00");if(t==="day")n=c.wearDate,c.wearDate===i?h="Today":c.wearDate===a?h="Yesterday":h=p.toLocaleDateString("en-US",{day:"numeric",month:"short",year:"numeric"});else if(t==="week"){const S=(p.getDay()+6)%7,u=new Date(p);u.setDate(p.getDate()-S);const x=new Date(u);x.setDate(u.getDate()+6),n=u.toISOString().split("T")[0],h=`${u.toLocaleDateString("en-US",{day:"numeric",month:"short"})} – ${x.toLocaleDateString("en-US",{day:"numeric",month:"short"})}`}else n=`${p.getFullYear()}-${String(p.getMonth()+1).padStart(2,"0")}`,h=p.toLocaleDateString("en-US",{month:"long",year:"numeric"});s.has(n)||s.set(n,{key:n,title:h,date:c.wearDate,count:0,events:[]});const g=s.get(n);g.count+=1,g.events.push(c)}),Array.from(s.values())}reconcileWearCounts(e=this.storage.getCurrentUserId()){const t=this.storage.getHistoryEvents(e),o={};return t.forEach(s=>{s.itemIds.forEach(i=>{o[i]=(o[i]||0)+1})}),this.storage.getGarments(e,{includeArchived:!0}).forEach(s=>{const i=o[s.id]||0;s.wearCount!==i&&this.storage.updateGarment(s.id,{wearCount:i},e)}),o}}const Y=new ve;class be{constructor(e=y,t=Y){this.storage=e,this.history=t}scheduleOutfit({userId:e=this.storage.getCurrentUserId(),outfitId:t=null,topId:o,bottomId:r,footwearId:s,accessoryIds:i=[],plannedDate:l,occasion:a="Casual",notes:c=""}){if(!l)throw new Error("Planned date is required");if(!o||!r||!s)throw new Error("topId, bottomId, and footwearId are required to plan an outfit");const n=Q({userId:e,outfitId:t,topId:o,bottomId:r,footwearId:s,accessoryIds:i,plannedDate:l,occasion:a,notes:c,status:"Planned"});return this.storage.savePlannedOutfit(n,e),n}getDecoratedPlans({userId:e=this.storage.getCurrentUserId(),fromDate:t=null,toDate:o=null,status:r=null}={}){return this.storage.getPlannedOutfits(e,{fromDate:t,toDate:o,status:r}).map(i=>{const l=this.storage.getGarment(i.topId,e),a=this.storage.getGarment(i.bottomId,e),c=this.storage.getGarment(i.footwearId,e),n=(i.accessoryIds||[]).map(g=>this.storage.getGarment(g,e)).filter(Boolean),h=[l,a,c,...n].filter(Boolean),p=[];return h.forEach(g=>{g.status===F.IN_LAUNDRY?p.push({itemId:g.id,itemName:g.name,status:g.status,message:`"${g.name}" is currently In Laundry`}):g.status===F.RESERVED&&p.push({itemId:g.id,itemName:g.name,status:g.status,message:`"${g.name}" is currently Reserved`})}),{...i,top:l,bottom:a,footwear:c,accessories:n,warnings:p,hasWarnings:p.length>0}})}markPlanAsWorn({planId:e,actualWearDate:t=null,notes:o="",userId:r=this.storage.getCurrentUserId()}){const s=this.storage.getPlannedOutfit(e,r);if(!s)throw new Error(`Plan not found: ${e}`);const i=t||s.plannedDate||new Date().toISOString().split("T")[0],l=[s.topId,s.bottomId,s.footwearId,...s.accessoryIds||[]],a=this.history.recordWear({userId:r,outfitId:s.outfitId,itemIds:l,wearDate:i,occasion:s.occasion,notes:o||s.notes,updateGarmentStatus:i===new Date().toISOString().split("T")[0]});return this.storage.updatePlannedOutfit(e,{status:"Worn",historyEventId:a.id},r),{plan:this.storage.getPlannedOutfit(e,r),historyEvent:a}}updatePlan(e,t,o=this.storage.getCurrentUserId()){return this.storage.updatePlannedOutfit(e,t,o)}deletePlan(e,t=this.storage.getCurrentUserId()){return this.storage.deletePlannedOutfit(e,t)}}const V=new be,ne=new Set(["black","white","grey","gray","charcoal","navy","beige","khaki","cream","denim","brown"]);function le(d,e){if(!d||!e)return 15;const t=d.toLowerCase().trim(),o=e.toLowerCase().trim();if(t===o)return 25;const r=ne.has(t),s=ne.has(o);if(r&&s)return 30;if(r||s)return 25;const i=[["blue","khaki"],["olive","brown"],["burgundy","navy"],["olive","rust orange"],["emerald green","beige"]];for(const[l,a]of i)if(t.includes(l)&&o.includes(a)||t.includes(a)&&o.includes(l))return 20;return 10}class we{constructor(e=y){this.storage=e}checkWearHistory(e,t,o,r=[],s=this.storage.getCurrentUserId()){const i=this.storage.getHistoryEvents(s);let l=0,a=null;for(const c of i){const n=new Set(c.itemIds);n.has(e)&&n.has(t)&&n.has(o)&&(l++,(!a||c.wearDate>a)&&(a=c.wearDate))}return{hasBeenWorn:l>0,totalWears:l,lastWornDate:a}}generateSuggestions({occasion:e="Casual",weather:t=null,userId:o=this.storage.getCurrentUserId(),maxResults:r=3}){const s=this.storage.getProfile(o),i=(s==null?void 0:s.repeatAvoidanceDays)||pe,l=this.storage.getGarments(o,{includeArchived:!1}).filter(m=>m.status===F.CLEAN),a=l.filter(m=>m.category.toLowerCase()==="tops"),c=l.filter(m=>m.category.toLowerCase()==="bottoms"),n=l.filter(m=>m.category.toLowerCase()==="footwear"),h=l.filter(m=>m.category.toLowerCase()==="accessories");if(a.length===0||c.length===0||n.length===0)return{suggestions:[],reason:"Insufficient clean items. Ensure you have clean Tops, Bottoms, and Footwear.",missingCategories:[a.length===0?"Tops":null,c.length===0?"Bottoms":null,n.length===0?"Footwear":null].filter(Boolean)};const p=new Date,g=this.storage.getHistoryEvents(o),S=new Map;g.forEach(m=>{const E=new Date(m.wearDate+"T00:00:00"),_=Math.abs(p-E),v=Math.floor(_/(1e3*60*60*24));m.itemIds.forEach(w=>{(!S.has(w)||v<S.get(w))&&S.set(w,v)})});const u=this.storage.getFeedback(o),x=new Set(u.filter(m=>m.action==="rejected").map(m=>m.outfitHash)),A=this.storage.getOutfits(o),D=new Set(A.filter(m=>m.isFavorite).map(m=>`${m.topId}_${m.bottomId}_${m.footwearId}`)),b=[];for(const m of a)for(const E of c)for(const _ of n){const v=`${m.id}_${E.id}_${_.id}`;if(x.has(v))continue;let w=100;const L=m.occasions.includes(e),N=E.occasions.includes(e),G=_.occasions.includes(e);L&&(w+=35),N&&(w+=35),G&&(w+=30);const H=le(m.primaryColor,E.primaryColor),J=le(E.primaryColor,_.primaryColor);if(w+=H+J,D.has(v)&&(w+=25),t){const T=t.toLowerCase(),M=(m.subcategory||"").toLowerCase(),W=(E.subcategory||"").toLowerCase(),q=(_.subcategory||"").toLowerCase();T==="cold"?(["sweater","hoodie","jacket","overshirt"].some(I=>M.includes(I))&&(w+=30),["jeans","trousers","cargo"].some(I=>W.includes(I))&&(w+=20),["boots"].some(I=>q.includes(I))&&(w+=15),["shorts","sandals","slippers"].some(I=>W.includes(I)||q.includes(I))&&(w-=40)):T==="warm"||T==="hot"?(["t-shirt","polo","shirt"].some(I=>M.includes(I))&&(w+=25),["shorts"].some(I=>W.includes(I))&&(w+=30),["sandals","sneakers","loafers"].some(I=>q.includes(I))&&(w+=20),["hoodie","sweater","jacket","boots"].some(I=>M.includes(I)||q.includes(I))&&(w-=35)):T==="rain"&&(["jacket"].some(I=>M.includes(I))&&(w+=25),["boots","sneakers"].some(I=>q.includes(I))&&(w+=20),["sandals","slippers"].some(I=>q.includes(I))&&(w-=40))}[m.id,E.id,_.id].forEach(T=>{if(S.has(T)){const M=S.get(T);if(M<i){const W=(i-M)*18;w-=W}}});const X=this.checkWearHistory(m.id,E.id,_.id,[],o);X.hasBeenWorn&&X.lastWornDate&&Math.floor((p-new Date(X.lastWornDate+"T00:00:00"))/864e5)<i&&(w-=60);const ee=[];if(h.length>0){const T=[...h].sort((M,W)=>{const q=M.occasions.includes(e)?1:0;return(W.occasions.includes(e)?1:0)-q});for(const M of T){if(ee.length>=2)break;const W=S.get(M.id);W!==void 0&&W<i&&T.length>2||ee.push(M)}}b.push({top:m,bottom:E,footwear:_,accessories:ee,score:w,historyInfo:X})}b.sort((m,E)=>E.score-m.score);const C=[],$=new Set,f=new Set;for(const m of b){if(C.length>=r)break;!$.has(m.top.id)&&!f.has(m.bottom.id)&&(C.push(m),$.add(m.top.id),f.add(m.bottom.id))}if(C.length<r)for(const m of b){if(C.length>=r)break;C.some(_=>_.top.id===m.top.id&&_.bottom.id===m.bottom.id&&_.footwear.id===m.footwear.id)||C.push(m)}return{suggestions:C.map((m,E)=>({suggestionIndex:E+1,occasion:e,top:m.top,bottom:m.bottom,footwear:m.footwear,accessories:[...m.accessories],score:Math.round(m.score),historyInfo:m.historyInfo})),totalCandidates:b.length,avoidanceDays:i}}getAvailableReplacements({category:e,currentOutfit:t,occasion:o="Casual",userId:r=this.storage.getCurrentUserId()}){var c,n,h;const s=this.storage.getGarments(r,{includeArchived:!1,category:e,status:F.CLEAN}),i=t?e.toLowerCase()==="tops"?(c=t.top)==null?void 0:c.id:e.toLowerCase()==="bottoms"?(n=t.bottom)==null?void 0:n.id:e.toLowerCase()==="footwear"?(h=t.footwear)==null?void 0:h.id:null:null,l=this.storage.getHistoryEvents(r),a=new Map;return l.forEach(p=>{p.itemIds.forEach(g=>{a.has(g)||a.set(g,p.wearDate)})}),s.filter(p=>p.id!==i).map(p=>{let g=p.occasions.includes(o)?30:10;const S=a.get(p.id);return{item:p,compatibilityScore:g,lastWornDate:S||null}}).sort((p,g)=>g.compatibilityScore-p.compatibilityScore)}replaceSingleItem(e,t,o){if(!e||!o)return e;const r=t.toLowerCase(),s={...e};r==="tops"?s.top=o:r==="bottoms"?s.bottom=o:r==="footwear"?s.footwear=o:r==="accessories"&&(s.accessories=[...(s.accessories||[]).filter(l=>l.id!==o.id),o]);const i=(s.accessories||[]).map(l=>l.id);return s.historyInfo=this.checkWearHistory(s.top.id,s.bottom.id,s.footwear.id,i),s}removeAccessory(e,t){if(!e)return e;const o={...e};o.accessories=(o.accessories||[]).filter(s=>s.id!==t);const r=o.accessories.map(s=>s.id);return o.historyInfo=this.checkWearHistory(o.top.id,o.bottom.id,o.footwear.id,r),o}}const K=new we;class xe{constructor(){this.overlay=document.createElement("div"),this.overlay.className="modal-overlay",document.body.appendChild(this.overlay),this.overlay.addEventListener("click",e=>{e.target===this.overlay&&this.close()})}close(){this.overlay.classList.remove("open"),setTimeout(()=>{this.overlay.innerHTML=""},250)}_renderSheet(e,t){this.overlay.innerHTML=`
      <div class="modal-sheet">
        <div class="sheet-handle"></div>
        <div class="sheet-header">
          <div class="sheet-title">${e}</div>
          <button class="close-btn" id="modal-close-trigger">&times;</button>
        </div>
        <div class="sheet-content">
          ${t}
        </div>
      </div>
    `,this.overlay.querySelector("#modal-close-trigger").addEventListener("click",()=>this.close()),this.overlay.classList.add("open")}openAddGarment({onSaved:e}){const t=y.getCurrentUserId(),o=y.getProfile(t),i=`
      <form id="form-add-garment">
        <div class="form-group">
          <label class="form-label">Garment Name</label>
          <input type="text" id="garm-name" class="form-input" placeholder="e.g. Heavyweight Relaxed Tee" required>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <div class="form-group">
            <label class="form-label">Category</label>
            <select id="garm-cat" class="form-select">
              ${["Tops","Bottoms","Footwear","Accessories",...(o==null?void 0:o.customCategories)||[]].map(n=>`<option value="${n}">${n}</option>`).join("")}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Subcategory</label>
            <select id="garm-subcat" class="form-select">
              ${(ie.Tops||[]).map(n=>`<option value="${n}">${n}</option>`).join("")}
            </select>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <div class="form-group">
            <label class="form-label">Primary Color</label>
            <select id="garm-color" class="form-select">
              ${de.map(n=>`<option value="${n.name}">${n.name}</option>`).join("")}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Availability Status</label>
            <select id="garm-status" class="form-select">
              <option value="${F.CLEAN}">Clean</option>
              <option value="${F.WORN}">Worn</option>
              <option value="${F.IN_LAUNDRY}">In Laundry</option>
              <option value="${F.RESERVED}">Reserved</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Occasions (Select applicable)</label>
          <div style="display: flex; flex-wrap: wrap; gap: 6px;">
            ${Z.map(n=>`
              <label style="font-size: 12px; display: flex; align-items: center; gap: 4px; background: #F4F4F5; padding: 4px 10px; border-radius: 6px; cursor: pointer;">
                <input type="checkbox" name="occasions" value="${n}" ${n==="Casual"?"checked":""}>
                <span>${n}</span>
              </label>
            `).join("")}
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <div class="form-group">
            <label class="form-label">Purchase Price (${y.getCurrency().symbol})</label>
            <input type="number" id="garm-price" class="form-input" placeholder="e.g. 1499" min="0" step="1">
          </div>
          <div class="form-group">
            <label class="form-label">Purchase Date</label>
            <input type="date" id="garm-pdate" class="form-input">
          </div>
        </div>

        <div style="margin-top: 20px;">
          <button type="submit" class="btn btn-primary btn-block">Add to Wardrobe</button>
        </div>
      </form>
    `;this._renderSheet("Add Wardrobe Item",i);const l=this.overlay.querySelector("#garm-cat"),a=this.overlay.querySelector("#garm-subcat");l.addEventListener("change",()=>{const n=ie[l.value]||["Item","Custom"];a.innerHTML=n.map(h=>`<option value="${h}">${h}</option>`).join("")}),this.overlay.querySelector("#form-add-garment").addEventListener("submit",n=>{n.preventDefault();const h=this.overlay.querySelector("#garm-name").value,p=l.value,g=a.value,S=this.overlay.querySelector("#garm-color").value,u=this.overlay.querySelector("#garm-status").value,x=this.overlay.querySelector("#garm-price").value,A=this.overlay.querySelector("#garm-pdate").value,D=Array.from(this.overlay.querySelectorAll('input[name="occasions"]:checked')).map(C=>C.value),b=P({userId:t,name:h,category:p,subcategory:g,primaryColor:S,occasions:D.length>0?D:["Casual"],status:u,purchasePrice:x?Number(x):null,purchaseDate:A||null});y.saveGarment(b,t),this.close(),e&&e(b)})}openGarmentDetail(e,{onUpdated:t,onDeleted:o}){const r=y.getCurrentUserId(),s=y.getGarment(e,r);if(!s)return;const i=s.purchasePrice&&(s.wearCount||0)>0?`${z(s.purchasePrice/s.wearCount)} / wear`:s.purchasePrice?`${z(s.purchasePrice)} (Unworn)`:"Not set",l=`
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="width: 140px; height: 140px; background: #FAFAFA; border: 1px solid #E5E5E5; border-radius: 16px; margin: 0 auto 14px auto; display: flex; align-items: center; justify-content: center;">
          ${B(s.category,s.subcategory,s.primaryColor)}
        </div>
        <h3 style="font-size: 18px; font-weight: 800; color: #000000;">${s.name}</h3>
        <p style="font-size: 13px; color: #71717A;">${s.category} &bull; ${s.subcategory||""} &bull; ${s.primaryColor}</p>
      </div>

      <div style="background: #FAFAFA; border: 1px solid #E5E5E5; border-radius: 14px; padding: 14px; margin-bottom: 16px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 13px;">
          <div>
            <span style="color: #71717A; font-size: 11px; text-transform: uppercase; font-weight: 700;">Wear Count</span>
            <div style="font-size: 16px; font-weight: 800; color: #000000;">${s.wearCount||0} wears</div>
          </div>
          <div>
            <span style="color: #71717A; font-size: 11px; text-transform: uppercase; font-weight: 700;">Cost Per Wear</span>
            <div style="font-size: 16px; font-weight: 800; color: #059669;">${i}</div>
          </div>
          <div>
            <span style="color: #71717A; font-size: 11px; text-transform: uppercase; font-weight: 700;">Purchase Price</span>
            <div style="font-size: 14px; font-weight: 700; color: #000000;">${s.purchasePrice?z(s.purchasePrice):"None"}</div>
          </div>
          <div>
            <span style="color: #71717A; font-size: 11px; text-transform: uppercase; font-weight: 700;">Occasions</span>
            <div style="font-size: 12px; font-weight: 600; color: #000000;">${(s.occasions||[]).join(", ")}</div>
          </div>
        </div>
      </div>

      <!-- Quick Status Change -->
      <div class="form-group">
        <label class="form-label">Update Availability Status</label>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px;">
          ${Object.values(F).map(c=>`
            <button class="pill-btn ${s.status===c?"active":""}" data-change-status="${c}">
              ${c}
            </button>
          `).join("")}
        </div>
      </div>

      <div style="display: flex; gap: 10px; margin-top: 24px;">
        <button id="btn-archive-garment" class="btn btn-secondary btn-sm" style="flex: 1; color: #DC2626;">
          Archive / Delete Item
        </button>
      </div>
    `;this._renderSheet("Item Details",l),this.overlay.querySelectorAll("[data-change-status]").forEach(c=>{c.addEventListener("click",()=>{const n=c.getAttribute("data-change-status");y.updateGarment(e,{status:n},r),this.close(),t&&t()})});const a=this.overlay.querySelector("#btn-archive-garment");a&&a.addEventListener("click",()=>{confirm(`Archive "${s.name}"? Past wear history will safely retain its snapshot.`)&&(y.archiveGarment(e,r),this.close(),o&&o())})}openSwapDrawer({category:e,currentOutfit:t,occasion:o,onItemChosen:r}){const s=y.getCurrentUserId(),i=K.getAvailableReplacements({category:e,currentOutfit:t,occasion:o,userId:s}),l=`
      <p style="font-size: 12px; color: #71717A; margin-bottom: 14px;">
        Choose another clean ${e} item to swap without rebuilding the whole outfit:
      </p>

      ${i.length===0?`
        <div class="empty-state" style="padding: 20px;">
          <div style="width: 36px; height: 36px; border-radius: 8px; background: #F4F4F5; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#71717A" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3c0 .7.3 1.3.8 1.8L2 14v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4l-7.8-7.2c.5-.5.8-1.1.8-1.8a3 3 0 0 0-3-3z"/></svg>
          </div>
          <div class="empty-state-title">No alternative clean ${e} available</div>
          <p class="empty-state-desc">All other items in this category are either in laundry, reserved, or already selected.</p>
        </div>
      `:`
        <div style="display: flex; flex-direction: column; gap: 8px; max-height: 400px; overflow-y: auto;">
          ${i.map(a=>`
            <div class="swap-choice-item" data-item-id="${a.item.id}" style="
              display: flex; align-items: center; justify-content: space-between;
              background: #FAFAFA; border: 1px solid #E5E5E5; border-radius: 10px;
              padding: 10px 14px; cursor: pointer; transition: 0.15s ease;
            ">
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 40px; height: 40px; background: #fff; border-radius: 8px; border: 1px solid #E5E5E5; display: flex; align-items: center; justify-content: center;">
                  ${B(a.item.category,a.item.subcategory,a.item.primaryColor)}
                </div>
                <div>
                  <div style="font-size: 13px; font-weight: 700; color: #000000;">${a.item.name}</div>
                  <div style="font-size: 11px; color: #71717A;">
                    ${a.item.primaryColor} &bull; ${a.item.occasions.includes(o)?"Matches occasion":"Alternative"}
                  </div>
                </div>
              </div>

              <div style="font-size: 12px; font-weight: 700; color: #000000;">
                Select &rarr;
              </div>
            </div>
          `).join("")}
        </div>
      `}
    `;this._renderSheet(`Replace ${e}`,l),this.overlay.querySelectorAll(".swap-choice-item").forEach(a=>{a.addEventListener("click",()=>{const c=a.getAttribute("data-item-id"),n=y.getGarment(c,s);this.close(),r&&n&&r(n)})})}openHistoryDetail(e,{onUpdated:t,onDeleted:o}){var c;const r=y.getCurrentUserId(),s=y.getHistoryEvent(e,r);if(!s)return;const i=`
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
        <div>
          <span style="font-size: 11px; font-weight: 700; color: #71717A; text-transform: uppercase;">Exact Wear History</span>
          <h3 style="font-size: 18px; font-weight: 800; color: #000000;">${s.wearDate}</h3>
          <span style="font-size: 12px; color: #71717A;">${s.occasion} &bull; ${s.wearTime||"Time unset"}</span>
        </div>
        <span class="status-badge clean">Recorded</span>
      </div>

      ${s.notes?`
        <div style="background: #FAFAFA; border: 1px solid #E5E5E5; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 13px; font-style: italic;">
          &ldquo;${s.notes}&rdquo;
        </div>
      `:""}

      <h4 style="font-size: 13px; font-weight: 700; color: #71717A; text-transform: uppercase; margin-bottom: 8px;">
        Frozen Item Snapshot (${((c=s.itemSnapshots)==null?void 0:c.length)||0} Items)
      </h4>

      <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
        ${(s.itemSnapshots||[]).map(n=>`
          <div style="display: flex; align-items: center; justify-content: space-between; background: #FAFAFA; border: 1px solid #E5E5E5; border-radius: 10px; padding: 10px 12px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 36px; height: 36px; background: #fff; border-radius: 6px; display: flex; align-items: center; justify-content: center; border: 1px solid #E5E5E5;">
                ${B(n.category,n.subcategory,n.primaryColor)}
              </div>
              <div>
                <div style="font-size: 13px; font-weight: 700; color: #000000;">${n.name}</div>
                <div style="font-size: 11px; color: #71717A;">${n.category} &bull; ${n.primaryColor}</div>
              </div>
            </div>
            ${n.purchasePrice?`<span style="font-size: 12px; font-weight: 600; color: #71717A;">${z(n.purchasePrice)}</span>`:""}
          </div>
        `).join("")}
      </div>

      <div style="display: flex; gap: 8px;">
        <button id="btn-edit-history-entry" class="btn btn-secondary btn-sm" style="flex: 1;">
          Correct Date / Notes
        </button>
        <button id="btn-delete-history-entry" class="btn btn-secondary btn-sm" style="color: #DC2626;">
          Delete Entry
        </button>
      </div>
    `;this._renderSheet("Wear History Record",i);const l=this.overlay.querySelector("#btn-edit-history-entry");l&&l.addEventListener("click",()=>{const n=prompt("Correct wear date (YYYY-MM-DD):",s.wearDate);if(n&&n.trim()){const h=prompt("Update notes:",s.notes||"")||"";Y.updateHistoryEntry(s.id,{wearDate:n.trim(),notes:h.trim()},r),this.close(),t&&t()}});const a=this.overlay.querySelector("#btn-delete-history-entry");a&&a.addEventListener("click",()=>{confirm("Delete this wear history entry? This will automatically decrement wear counts for its items.")&&(Y.deleteHistoryEntry(s.id,r),this.close(),o&&o())})}openManualLog({onLogged:e}){const t=y.getCurrentUserId(),o=y.getGarments(t,{includeArchived:!1}),r=`
      <form id="form-manual-log">
        <div class="form-group">
          <label class="form-label">Wear Date</label>
          <input type="date" id="manual-date" class="form-input" value="${new Date().toISOString().split("T")[0]}" required>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <div class="form-group">
            <label class="form-label">Occasion</label>
            <select id="manual-occ" class="form-select">
              ${Z.map(i=>`<option value="${i}">${i}</option>`).join("")}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Time of Day (Optional)</label>
            <input type="time" id="manual-time" class="form-input" value="12:00">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Select Items Worn</label>
          <div style="max-height: 200px; overflow-y: auto; border: 1px solid #E5E5E5; border-radius: 8px; padding: 6px;">
            ${o.map(i=>`
              <label style="display: flex; align-items: center; justify-content: space-between; padding: 6px 10px; border-bottom: 1px solid #F4F4F5; font-size: 13px; cursor: pointer;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <input type="checkbox" name="manual_items" value="${i.id}">
                  <span style="font-weight: 600;">${i.name}</span>
                </div>
                <span style="font-size: 11px; color: #71717A;">${i.category}</span>
              </label>
            `).join("")}
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Notes</label>
          <textarea id="manual-notes" class="form-textarea" placeholder="e.g. Wore this to the museum..."></textarea>
        </div>

        <div style="margin-top: 20px;">
          <button type="submit" class="btn btn-primary btn-block">Log Wear History</button>
        </div>
      </form>
    `;this._renderSheet("Log Past Outfit",r),this.overlay.querySelector("#form-manual-log").addEventListener("submit",i=>{i.preventDefault();const l=this.overlay.querySelector("#manual-date").value,a=this.overlay.querySelector("#manual-occ").value,c=this.overlay.querySelector("#manual-time").value,n=this.overlay.querySelector("#manual-notes").value,h=Array.from(this.overlay.querySelectorAll('input[name="manual_items"]:checked')).map(p=>p.value);if(h.length===0){alert("Please select at least one item that was worn.");return}Y.addManualPastOutfit({userId:t,itemIds:h,wearDate:l,wearTime:c,occasion:a,notes:n.trim()}),this.close(),e&&e()})}openSchedulePlan(e,{onScheduled:t}){const o=y.getCurrentUserId(),r=y.getGarments(o,{category:"Tops"}),s=y.getGarments(o,{category:"Bottoms"}),i=y.getGarments(o,{category:"Footwear"}),l=y.getGarments(o,{category:"Accessories"}),a=`
      <form id="form-schedule-plan">
        <div class="form-group">
          <label class="form-label">Date to Plan</label>
          <input type="date" id="plan-date" class="form-input" value="${e||new Date().toISOString().split("T")[0]}" required>
        </div>

        <div class="form-group">
          <label class="form-label">Occasion</label>
          <select id="plan-occ" class="form-select">
            ${Z.map(n=>`<option value="${n}">${n}</option>`).join("")}
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Top</label>
          <select id="plan-top" class="form-select" required>
            ${r.map(n=>`<option value="${n.id}">${n.name} (${n.status})</option>`).join("")}
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Bottom</label>
          <select id="plan-bot" class="form-select" required>
            ${s.map(n=>`<option value="${n.id}">${n.name} (${n.status})</option>`).join("")}
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Footwear</label>
          <select id="plan-shoes" class="form-select" required>
            ${i.map(n=>`<option value="${n.id}">${n.name} (${n.status})</option>`).join("")}
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Optional Accessories</label>
          <div style="max-height: 120px; overflow-y: auto; border: 1px solid #E5E5E5; border-radius: 8px; padding: 6px;">
            ${l.map(n=>`
              <label style="display: flex; align-items: center; justify-content: space-between; padding: 4px 8px; font-size: 12px; cursor: pointer;">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <input type="checkbox" name="plan_accs" value="${n.id}">
                  <span>${n.name}</span>
                </div>
                <span style="color: #71717A;">${n.status}</span>
              </label>
            `).join("")}
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Plan Notes (Optional)</label>
          <input type="text" id="plan-notes" class="form-input" placeholder="e.g. Meeting at 11am">
        </div>

        <div style="margin-top: 18px;">
          <button type="submit" class="btn btn-primary btn-block">Save to Calendar</button>
        </div>
      </form>
    `;this._renderSheet("Schedule Outfit",a),this.overlay.querySelector("#form-schedule-plan").addEventListener("submit",n=>{n.preventDefault();const h=this.overlay.querySelector("#plan-date").value,p=this.overlay.querySelector("#plan-occ").value,g=this.overlay.querySelector("#plan-top").value,S=this.overlay.querySelector("#plan-bot").value,u=this.overlay.querySelector("#plan-shoes").value,x=this.overlay.querySelector("#plan-notes").value,A=Array.from(this.overlay.querySelectorAll('input[name="plan_accs"]:checked')).map(D=>D.value);V.scheduleOutfit({userId:o,topId:g,bottomId:S,footwearId:u,accessoryIds:A,plannedDate:h,occasion:p,notes:x.trim()}),this.close(),t&&t()})}openLeaderboard(){const e=y.getCurrentUserId(),o=`
      <div style="max-height: 440px; overflow-y: auto;">
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${y.getGarments(e,{includeArchived:!0}).sort((r,s)=>(s.wearCount||0)-(r.wearCount||0)).map((r,s)=>`
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: #FAFAFA; border: 1px solid #E5E5E5; border-radius: 8px; font-size: 13px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-weight: 800; width: 16px; color: #A1A1AA; font-size: 11px;">#${s+1}</span>
                <div>
                  <div style="font-weight: 700; color: #000000;">${r.name}</div>
                  <div style="font-size: 11px; color: #71717A;">${r.category} &bull; ${r.status}</div>
                </div>
              </div>
              <div style="font-weight: 800; background: #FFFFFF; border: 1px solid #E5E5E5; padding: 2px 8px; border-radius: 6px;">
                ${r.wearCount||0} ${r.wearCount===1?"wear":"wears"}
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;this._renderSheet("Wardrobe Wear Counts",o)}openLoginModal({onSuccess:e,onSwitchToSignup:t}={}){this._renderSheet("Log In to Wardli",`
      <form id="form-login" style="display: flex; flex-direction: column; gap: 14px;">
        <div id="login-error-alert" style="display: none; padding: 10px 12px; background: #FEF2F2; border: 1px solid #FCA5A5; color: #991B1B; border-radius: 8px; font-size: 12px; font-weight: 600;"></div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="login-email">Email Address</label>
          <input type="email" id="login-email" class="form-input" placeholder="alex@wardli.style" required autofocus style="background: #FFFFFF;">
        </div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="login-password">Password</label>
          <input type="password" id="login-password" class="form-input" placeholder="Enter your password" required style="background: #FFFFFF;">
        </div>

        <button type="submit" id="btn-submit-login" class="btn btn-primary btn-block" style="padding: 13px; font-size: 14px; font-weight: 700; margin-top: 6px;">
          Log In &rarr;
        </button>

        <div style="text-align: center; margin-top: 4px; font-size: 12px; color: #71717A;">
          Don't have an account? 
          <button type="button" id="btn-goto-signup" style="background: none; border: none; font-weight: 700; color: #000000; cursor: pointer; text-decoration: underline; padding: 0;">
            Sign up now
          </button>
        </div>

        <div style="position: relative; text-align: center; margin: 12px 0 4px 0;">
          <hr style="border: 0; border-top: 1px solid #E5E5E5;">
          <span style="position: absolute; top: -9px; left: 50%; transform: translateX(-50%); background: #FFFFFF; padding: 0 10px; font-size: 11px; color: #A1A1AA; font-weight: 600;">
            OR TEST WITH DEMO
          </span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <button type="button" id="btn-demo-alex" class="btn btn-secondary btn-sm" style="font-size: 12px; font-weight: 600; padding: 8px;">
            Demo: Alex Chen
          </button>
          <button type="button" id="btn-demo-jordan" class="btn btn-secondary btn-sm" style="font-size: 12px; font-weight: 600; padding: 8px;">
            Demo: Jordan Lee
          </button>
        </div>
      </form>
    `);const r=this.overlay.querySelector("#form-login"),s=this.overlay.querySelector("#login-error-alert"),i=this.overlay.querySelector("#login-email"),l=this.overlay.querySelector("#login-password"),a=this.overlay.querySelector("#btn-submit-login"),c=n=>{s.textContent=n,s.style.display="block"};r.addEventListener("submit",async n=>{n.preventDefault(),s.style.display="none",a.disabled=!0,a.textContent="Logging in...";try{const h=await O.login({email:i.value,password:l.value});this.close(),e&&e(h)}catch(h){c(h.message||"Login failed. Please check your credentials."),a.disabled=!1,a.textContent="Log In →"}}),this.overlay.querySelector("#btn-goto-signup").addEventListener("click",()=>{this.close(),t?t():setTimeout(()=>this.openSignupModal({onSuccess:e}),260)}),this.overlay.querySelector("#btn-demo-alex").addEventListener("click",()=>{const n=O.loginAsDemo("user_default");this.close(),e&&e(n)}),this.overlay.querySelector("#btn-demo-jordan").addEventListener("click",()=>{const n=O.loginAsDemo("user_minimalist");this.close(),e&&e(n)})}openSignupModal({onSuccess:e,onSwitchToLogin:t}={}){const o=`
      <form id="form-signup" style="display: flex; flex-direction: column; gap: 14px;">
        <div id="signup-error-alert" style="display: none; padding: 10px 12px; background: #FEF2F2; border: 1px solid #FCA5A5; color: #991B1B; border-radius: 8px; font-size: 12px; font-weight: 600;"></div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="signup-name">Full Name</label>
          <input type="text" id="signup-name" class="form-input" placeholder="e.g. Maya Lin" required autofocus style="background: #FFFFFF;">
        </div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="signup-email">Email Address</label>
          <input type="email" id="signup-email" class="form-input" placeholder="name@domain.com" required style="background: #FFFFFF;">
        </div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="signup-password">Password (minimum 6 characters)</label>
          <input type="password" id="signup-password" class="form-input" placeholder="Create a secure password" minlength="6" required style="background: #FFFFFF;">
        </div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="signup-currency">Preferred Currency</label>
          <select id="signup-currency" class="form-input" style="background: #FFFFFF;">
            ${Object.values(R).map(p=>`
              <option value="${p.code}" ${p.code==="INR"?"selected":""}>${p.label}</option>
            `).join("")}
          </select>
        </div>

        <button type="submit" id="btn-submit-signup" class="btn btn-primary btn-block" style="padding: 13px; font-size: 14px; font-weight: 700; margin-top: 6px;">
          Create My Wardrobe &rarr;
        </button>

        <div style="text-align: center; margin-top: 4px; font-size: 12px; color: #71717A;">
          Already have an account? 
          <button type="button" id="btn-goto-login" style="background: none; border: none; font-weight: 700; color: #000000; cursor: pointer; text-decoration: underline; padding: 0;">
            Log in
          </button>
        </div>
      </form>
    `;this._renderSheet("Create Your Wardli Account",o);const r=this.overlay.querySelector("#form-signup"),s=this.overlay.querySelector("#signup-error-alert"),i=this.overlay.querySelector("#signup-name"),l=this.overlay.querySelector("#signup-email"),a=this.overlay.querySelector("#signup-password"),c=this.overlay.querySelector("#signup-currency"),n=this.overlay.querySelector("#btn-submit-signup"),h=p=>{s.textContent=p,s.style.display="block"};r.addEventListener("submit",async p=>{p.preventDefault(),s.style.display="none",n.disabled=!0,n.textContent="Creating account...";try{const g=await O.register({name:i.value,email:l.value,password:a.value,preferredCurrency:c.value});this.close(),e&&e(g)}catch(g){h(g.message||"Registration failed."),n.disabled=!1,n.textContent="Create My Wardrobe →"}}),this.overlay.querySelector("#btn-goto-login").addEventListener("click",()=>{this.close(),t?t():setTimeout(()=>this.openLoginModal({onSuccess:e}),260)})}openTravelPackingModal(){const e=y.getCurrentUserId(),t=y.getGarments(e,{includeArchived:!1}).filter(g=>g.status===F.CLEAN),o=t.filter(g=>g.category.toLowerCase()==="tops"),r=t.filter(g=>g.category.toLowerCase()==="bottoms"),s=t.filter(g=>g.category.toLowerCase()==="footwear"),i=t.filter(g=>g.category.toLowerCase()==="accessories");this._renderSheet("🎒 Travel Packing Checklist",`
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <p style="font-size: 13px; color: #71717A; margin-bottom: 2px;">
          Build a minimalist travel capsule checklist with zero duplicates based on your clean wardrobe items.
        </p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label">Trip Duration</label>
            <select id="packing-duration" class="form-input" style="background: #FFFFFF;">
              <option value="3" selected>3 Days (Weekend Trip)</option>
              <option value="5">5 Days (Work / City Trip)</option>
              <option value="7">7 Days (Full Week)</option>
            </select>
          </div>

          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label">Trip Style</label>
            <select id="packing-style" class="form-input" style="background: #FFFFFF;">
              <option value="Casual" selected>Casual &amp; Leisure</option>
              <option value="Formal">Business &amp; Formal</option>
              <option value="Travel">Active &amp; Sightseeing</option>
            </select>
          </div>
        </div>

        <div id="packing-list-container" style="max-height: 340px; overflow-y: auto; background: #FAFAFA; border: 1px solid #E5E5E5; border-radius: 12px; padding: 12px;"></div>

        <div style="display: flex; gap: 8px;">
          <button type="button" id="btn-copy-packing" class="btn btn-primary btn-block" style="padding: 12px; font-size: 13px; font-weight: 700;">
            📋 Copy Packing Checklist
          </button>
        </div>
      </div>
    `);const a=this.overlay.querySelector("#packing-list-container"),c=this.overlay.querySelector("#packing-duration"),n=this.overlay.querySelector("#packing-style"),h=this.overlay.querySelector("#btn-copy-packing"),p=()=>{const g=Number(c.value),S=n.value,u=Math.min(g,o.length),x=Math.min(Math.ceil(g/2),r.length),A=Math.min(g>3?2:1,s.length),D=Math.min(g>3?3:2,i.length),b=m=>[...m].sort((E,_)=>{const v=E.occasions.includes(S)?1:0;return(_.occasions.includes(S)?1:0)-v}),C=b(o).slice(0,u),$=b(r).slice(0,x),f=b(s).slice(0,A),k=b(i).slice(0,D);a.innerHTML=`
        <div style="margin-bottom: 12px;">
          <div style="font-size: 11px; font-weight: 800; color: #71717A; text-transform: uppercase; margin-bottom: 6px;">
            Tops (${C.length} items)
          </div>
          ${C.map(m=>`
            <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; padding: 4px 0; cursor: pointer;">
              <input type="checkbox" checked style="accent-color: #000000;">
              <span>${m.name} (${m.subcategory||"Top"})</span>
            </label>
          `).join("")||'<div style="font-size: 12px; color: #A1A1AA;">No clean tops</div>'}
        </div>

        <div style="margin-bottom: 12px;">
          <div style="font-size: 11px; font-weight: 800; color: #71717A; text-transform: uppercase; margin-bottom: 6px;">
            Bottoms (${$.length} items)
          </div>
          ${$.map(m=>`
            <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; padding: 4px 0; cursor: pointer;">
              <input type="checkbox" checked style="accent-color: #000000;">
              <span>${m.name} (${m.subcategory||"Bottom"})</span>
            </label>
          `).join("")||'<div style="font-size: 12px; color: #A1A1AA;">No clean bottoms</div>'}
        </div>

        <div style="margin-bottom: 12px;">
          <div style="font-size: 11px; font-weight: 800; color: #71717A; text-transform: uppercase; margin-bottom: 6px;">
            Footwear (${f.length} pairs)
          </div>
          ${f.map(m=>`
            <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; padding: 4px 0; cursor: pointer;">
              <input type="checkbox" checked style="accent-color: #000000;">
              <span>${m.name}</span>
            </label>
          `).join("")||'<div style="font-size: 12px; color: #A1A1AA;">No clean footwear</div>'}
        </div>

        <div>
          <div style="font-size: 11px; font-weight: 800; color: #71717A; text-transform: uppercase; margin-bottom: 6px;">
            Accessories (${k.length} items)
          </div>
          ${k.map(m=>`
            <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; padding: 4px 0; cursor: pointer;">
              <input type="checkbox" checked style="accent-color: #000000;">
              <span>${m.name}</span>
            </label>
          `).join("")||'<div style="font-size: 12px; color: #A1A1AA;">No accessories</div>'}
        </div>
      `};c.addEventListener("change",p),n.addEventListener("change",p),p(),h.addEventListener("click",()=>{const g=Array.from(a.querySelectorAll("label")).filter(u=>u.querySelector("input").checked).map(u=>`[ ] ${u.querySelector("span").textContent}`),S=`Wardli Travel Packing Checklist (${c.value} Days - ${n.value})

`+g.join(`
`);navigator.clipboard.writeText(S).then(()=>{h.textContent="✓ Copied to Clipboard!",setTimeout(()=>{h.textContent="📋 Copy Packing Checklist"},2e3)}).catch(()=>{alert(S)})})}}const U=new xe;function Ce({onGetStarted:d,onOpenLogin:e,onOpenSignup:t}){const o=document.createElement("div");o.className="onboarding-screen",o.innerHTML=`
    <!-- Top Hero Badge & Headline -->
    <div class="onboarding-hero-header">
      <div class="onboarding-pill-badge">
        <span class="badge-dot"></span>
        <span>The Zero-AI Digital Wardrobe</span>
      </div>

      <div class="onboarding-brand-title">
        <div class="brand-icon-glow">
          ${j.appIcon}
        </div>
        <h1 class="brand-headline">wardli</h1>
      </div>

      <p class="brand-tagline">
        Your wardrobe. Your everyday style.
      </p>
    </div>

    <!-- Living Holographic Pedestal / Clothes Rail Card -->
    <div class="clothes-rail-pedestal" id="interactive-pedestal">
      <div class="pedestal-ambient-glow"></div>

      <!-- Floating Feature Badges -->
      <div class="floating-badge badge-top-left">
        <span class="badge-icon">🏷️</span>
        <span>Curated Capsule</span>
      </div>
      <div class="floating-badge badge-top-right">
        <span class="badge-icon">⚡</span>
        <span>Deterministic Rules</span>
      </div>
      <div class="floating-badge badge-bottom">
        <span class="badge-icon">📊</span>
        <span>Cost-Per-Wear Insights</span>
      </div>

      <!-- Interactive SVG Rail Graphic -->
      <div class="rail-svg-wrapper">
        <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="rail-svg">
          <!-- Rail frame -->
          <line x1="20" y1="30" x2="260" y2="30" stroke="#27272A" stroke-width="4" stroke-linecap="round"/>
          <line x1="40" y1="30" x2="30" y2="180" stroke="#27272A" stroke-width="3.5" stroke-linecap="round"/>
          <line x1="240" y1="30" x2="250" y2="180" stroke="#27272A" stroke-width="3.5" stroke-linecap="round"/>
          <line x1="15" y1="180" x2="55" y2="180" stroke="#27272A" stroke-width="3.5" stroke-linecap="round"/>
          <line x1="225" y1="180" x2="265" y2="180" stroke="#27272A" stroke-width="3.5" stroke-linecap="round"/>

          <!-- Garments with subtle swaying animations -->
          <!-- Garment 1: Black Coat -->
          <g class="hanger-group garment-sway-1">
            <path d="M70 30L60 45H80L70 30Z" stroke="#71717A" stroke-width="1.5" fill="none"/>
            <path d="M54 45L66 40H74L86 45L84 135H56L54 45Z" fill="#18181B"/>
          </g>

          <!-- Garment 2: White Shirt -->
          <g class="hanger-group garment-sway-2">
            <path d="M110 30L100 45H120L110 30Z" stroke="#71717A" stroke-width="1.5" fill="none"/>
            <path d="M96 45L106 40H114L124 45L122 125H98L96 45Z" fill="#F4F4F5" stroke="#D4D4D8" stroke-width="1.5"/>
          </g>

          <!-- Garment 3: Grey Knit -->
          <g class="hanger-group garment-sway-3">
            <path d="M150 30L140 45H160L150 30Z" stroke="#71717A" stroke-width="1.5" fill="none"/>
            <path d="M136 45L146 40H154L164 45L162 120H138L136 45Z" fill="#52525B"/>
          </g>

          <!-- Garment 4: Black Hoodie -->
          <g class="hanger-group garment-sway-4">
            <path d="M190 30L180 45H200L190 30Z" stroke="#71717A" stroke-width="1.5" fill="none"/>
            <path d="M176 45L186 40H194L204 45L202 128H178L176 45Z" fill="#27272A"/>
          </g>

          <!-- Minimal accent plant -->
          <circle cx="255" cy="165" r="12" fill="#E4E4E7"/>
          <path d="M255 165Q260 145 252 135Q245 150 255 165Z" fill="#10B981"/>
        </svg>
      </div>

      <div class="pedestal-caption">
        <span class="sparkle">✦</span>
        <span>Living Digital Capsule</span>
        <span class="sparkle">✦</span>
      </div>
    </div>

    <!-- Onboarding CTAs & Action Controls -->
    <div class="onboarding-actions-card">
      <p class="onboarding-description">
        Organize clothing &amp; accessories, receive rule-based daily looks, and track exact wear history with zero guesswork.
      </p>

      <div class="onboarding-btn-group">
        <button id="btn-onboarding-signup" class="btn-glow-primary">
          <span>Create Free Account</span>
          <span class="btn-arrow">&rarr;</span>
        </button>

        <button id="btn-onboarding-login" class="btn-glass-secondary">
          <span>Log In</span>
        </button>

        <button id="btn-onboarding-demo" class="btn-demo-link">
          <span>Explore with Demo Wardrobe (Alex Chen) &rarr;</span>
        </button>
      </div>
    </div>
  `,o.querySelector("#btn-onboarding-signup").addEventListener("click",t),o.querySelector("#btn-onboarding-login").addEventListener("click",e),o.querySelector("#btn-onboarding-demo").addEventListener("click",d);const r=o.querySelector("#interactive-pedestal");return r&&(r.addEventListener("mousemove",s=>{const i=r.getBoundingClientRect(),l=s.clientX-i.left-i.width/2,c=-(s.clientY-i.top-i.height/2)/i.height*14,n=l/i.width*14;r.style.transform=`perspective(800px) rotateX(${c}deg) rotateY(${n}deg) scale3d(1.02, 1.02, 1.02)`}),r.addEventListener("mouseleave",()=>{r.style.transform="perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"})),o}function Ae({onOpenAddItem:d,onOpenItemDetail:e,onRefresh:t}){const o=document.createElement("div");o.className="wardrobe-screen";let r="All",s="All";function i(){const l=y.getCurrentUserId(),a=y.getProfile(l),n=["All","Tops","Bottoms","Footwear","Accessories",...(a==null?void 0:a.customCategories)||[]],h=y.getGarments(l,{includeArchived:!1,category:r,status:s});o.innerHTML=`
      <div class="screen-header">
        <div>
          <h2 class="screen-title">My Wardrobe</h2>
          <p class="screen-subtitle">${h.length} items in collection</p>
        </div>
        <button id="btn-add-item-trigger" class="btn btn-primary btn-sm">
          + Add Item
        </button>
      </div>

      <!-- Category Filter Pills -->
      <div class="filter-pill-bar" id="category-pills">
        ${n.map(u=>`
          <button class="pill-btn ${u===r?"active":""}" data-category="${u}">
            ${u}
          </button>
        `).join("")}
      </div>

      <!-- Secondary Status Bar -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; font-size: 12px; color: #71717A;">
        <div style="display: flex; align-items: center; gap: 6px; overflow-x: auto;">
          <span>Status:</span>
          ${["All","Clean","Worn","In Laundry","Reserved"].map(u=>`
            <button class="pill-btn btn-sm ${u===s?"active":""}" data-status="${u}" style="padding: 2px 8px; font-size: 11px;">
              ${u}
            </button>
          `).join("")}
        </div>
        <button id="btn-add-custom-cat" style="background: none; border: none; font-size: 11px; font-weight: 600; color: #18181B; cursor: pointer; text-decoration: underline;">
          + Category
        </button>
      </div>

      <!-- Garments Grid -->
      ${h.length===0?`
        <div class="empty-state">
          <div style="width: 40px; height: 40px; border-radius: 10px; background: #F4F4F5; margin: 0 auto 14px; display: flex; align-items: center; justify-content: center;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#71717A" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3c0 .7.3 1.3.8 1.8L2 14v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4l-7.8-7.2c.5-.5.8-1.1.8-1.8a3 3 0 0 0-3-3z"/></svg>
          </div>
          <h3 class="empty-state-title">No items found</h3>
          <p class="empty-state-desc">There are no items matching "${r}" with status "${s}".</p>
          <button id="btn-empty-add" class="btn btn-secondary btn-sm" style="margin-top: 10px;">
            + Add First Item
          </button>
        </div>
      `:`
        <div class="garment-grid">
          ${h.map(u=>{const x=u.status.toLowerCase().replace(" ","-"),A=u.purchasePrice&&(u.wearCount||0)>0?`${z(Math.round(u.purchasePrice/u.wearCount))}/wear`:u.purchasePrice?`${z(u.purchasePrice)}`:"";return`
              <div class="garment-card" data-id="${u.id}">
                <div class="garment-card-media">
                  ${B(u.category,u.subcategory,u.primaryColor)}
                  <div style="position: absolute; top: 6px; left: 6px;">
                    <span class="status-badge ${x}">${u.status}</span>
                  </div>
                  ${A?`
                    <div style="position: absolute; bottom: 6px; right: 6px; font-size: 10px; font-weight: 700; background: rgba(0,0,0,0.6); color: #fff; padding: 2px 6px; border-radius: 4px;">
                      ${A}
                    </div>
                  `:""}
                </div>
                <div class="garment-card-title" title="${u.name}">${u.name}</div>
                <div class="garment-card-meta">
                  <span>${u.subcategory||u.category}</span>
                  <span class="wear-count-tag">${u.wearCount||0} ${u.wearCount===1?"wear":"wears"}</span>
                </div>
              </div>
            `}).join("")}
        </div>
      `}
    `,o.querySelectorAll("#category-pills .pill-btn").forEach(u=>{u.addEventListener("click",()=>{r=u.getAttribute("data-category"),i()})}),o.querySelectorAll("[data-status]").forEach(u=>{u.addEventListener("click",()=>{s=u.getAttribute("data-status"),i()})});const p=o.querySelector("#btn-add-item-trigger");p&&p.addEventListener("click",d);const g=o.querySelector("#btn-empty-add");g&&g.addEventListener("click",d);const S=o.querySelector("#btn-add-custom-cat");S&&S.addEventListener("click",()=>{const u=prompt("Enter new wardrobe category name (e.g. Activewear, Ethnic, Outerwear):");if(u&&u.trim()){const x=u.trim(),A=y.getProfile(l)||{id:l,customCategories:[]};A.customCategories||(A.customCategories=[]),A.customCategories.includes(x)||(A.customCategories.push(x),y.saveProfile(A),r=x,i())}}),o.querySelectorAll(".garment-card").forEach(u=>{u.addEventListener("click",()=>{const x=u.getAttribute("data-id");e(x)})})}return i(),{element:o,refresh:i}}function Se({onOpenSwapDrawer:d,onNavigateHistory:e,onRefreshAll:t}){const o=document.createElement("div");o.className="suggestions-screen";let r="Casual",s=null,i=0,l=[],a=null;function c(){const h=y.getCurrentUserId();l=K.generateSuggestions({occasion:r,weather:s,userId:h,maxResults:3}).suggestions||[],i=0,a=l.length>0?{...l[0]}:null,n()}function n(){var A,D;const h=y.getCurrentUserId(),p=y.getProfile(h),g=(p==null?void 0:p.repeatAvoidanceDays)||7;if(o.innerHTML=`
      <div class="screen-header">
        <div>
          <h2 class="screen-title">Today's Outfit</h2>
          <p class="screen-subtitle">Here's your look for today.</p>
        </div>
        <div style="font-size: 11px; font-weight: 600; background: #F4F4F5; padding: 4px 8px; border-radius: 6px; color: #52525B;">
          Avoid: ${g}d window
        </div>
      </div>

      <!-- Occasion Pill Bar -->
      <div class="filter-pill-bar" id="occasion-pills">
        ${Z.map(b=>`
          <button class="pill-btn ${b===r?"active":""}" data-occ="${b}">
            ${b}
          </button>
        `).join("")}
      </div>

      <!-- Weather Filter Pill Bar -->
      <div style="display: flex; align-items: center; gap: 6px; overflow-x: auto; padding: 0 0 12px 0;" id="weather-pills">
        <span style="font-size: 11px; font-weight: 700; color: #71717A; white-space: nowrap; margin-right: 2px;">Climate:</span>
        <button class="pill-btn ${s===null?"active":""}" data-weather="all" style="font-size: 11px; padding: 4px 9px;">
          Any
        </button>
        <button class="pill-btn ${s==="cold"?"active":""}" data-weather="cold" style="font-size: 11px; padding: 4px 9px;">
          ❄️ Cold (<18°C)
        </button>
        <button class="pill-btn ${s==="warm"?"active":""}" data-weather="warm" style="font-size: 11px; padding: 4px 9px;">
          ☀️ Warm (>24°C)
        </button>
        <button class="pill-btn ${s==="rain"?"active":""}" data-weather="rain" style="font-size: 11px; padding: 4px 9px;">
          🌧️ Rain
        </button>
      </div>

      ${a?`
        <div class="suggestion-card">
          <!-- Outfit Visual Canvas -->
          <div class="outfit-display-canvas">
            <!-- Top Slot -->
            <div class="outfit-slot" data-slot="Tops">
              <div class="outfit-slot-media" title="Tap to replace top">
                ${B(a.top.category,a.top.subcategory,a.top.primaryColor)}
                <span class="slot-swap-hint">Swap</span>
              </div>
              <div class="slot-label">Top</div>
              <div class="slot-name">${a.top.name}</div>
            </div>

            <!-- Bottom Slot -->
            <div class="outfit-slot" data-slot="Bottoms">
              <div class="outfit-slot-media" title="Tap to replace bottom">
                ${B(a.bottom.category,a.bottom.subcategory,a.bottom.primaryColor)}
                <span class="slot-swap-hint">Swap</span>
              </div>
              <div class="slot-label">Bottom</div>
              <div class="slot-name">${a.bottom.name}</div>
            </div>

            <!-- Footwear Slot -->
            <div class="outfit-slot" data-slot="Footwear">
              <div class="outfit-slot-media" title="Tap to replace footwear">
                ${B(a.footwear.category,a.footwear.subcategory,a.footwear.primaryColor)}
                <span class="slot-swap-hint">Swap</span>
              </div>
              <div class="slot-label">Footwear</div>
              <div class="slot-name">${a.footwear.name}</div>
            </div>

            <!-- Accessories Slot / Summary -->
            <div class="outfit-slot" data-slot="Accessories">
              <div class="outfit-slot-media" title="Tap to add/replace accessories">
                ${a.accessories&&a.accessories.length>0?B(a.accessories[0].category,a.accessories[0].subcategory,a.accessories[0].primaryColor):'<div style="color: #A1A1AA; font-size: 11px; text-align: center;">+ Add<br>Accessory</div>'}
                <span class="slot-swap-hint">Swap</span>
              </div>
              <div class="slot-label">Accessories</div>
              <div class="slot-name">${((A=a.accessories)==null?void 0:A.length)||0} selected</div>
            </div>

            <!-- Accessories Chips Strip with Delete Buttons -->
            ${a.accessories&&a.accessories.length>0?`
              <div class="accessories-strip">
                ${a.accessories.map(b=>`
                  <div class="accessory-chip">
                    ${B(b.category,b.subcategory,b.primaryColor)}
                    <span>${b.name}</span>
                    <button class="accessory-remove-btn" data-remove-acc="${b.id}" title="Remove accessory">&times;</button>
                  </div>
                `).join("")}
              </div>
            `:""}
          </div>

          <!-- History & Repetition Indicator Badge -->
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 4px 6px; font-size: 12px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              ${(D=a.historyInfo)!=null&&D.hasBeenWorn?`
                <span style="color: #D97706; font-weight: 600;">
                  Worn ${a.historyInfo.totalWears}&times; &mdash; Last: ${a.historyInfo.lastWornDate}
                </span>
              `:`
                <span style="color: #059669; font-weight: 600;">
                  Not yet recorded
                </span>
              `}
            </div>
            <div style="font-weight: 700; color: #71717A;">
              Score: ${a.score||95}
            </div>
          </div>

          <!-- Carousel Pagination Dots -->
          <div class="carousel-dots">
            ${l.map((b,C)=>`
              <div class="dot ${C===i?"active":""}" data-index="${C}"></div>
            `).join("")}
          </div>

          <!-- Main Actions -->
          <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 4px;">
            <button id="btn-i-wore-this" class="btn btn-primary" style="padding: 14px; font-size: 15px; border-radius: 14px;">
              I Wore This
            </button>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <button id="btn-save-outfit" class="btn btn-secondary btn-sm" style="padding: 10px;">
                Save Outfit
              </button>
              <button id="btn-try-another" class="btn btn-secondary btn-sm" style="padding: 10px;">
                Next (${i+1}/${l.length})
              </button>
            </div>
          </div>
        </div>
      `:`
        <div class="empty-state" style="margin-top: 30px;">
          <div style="width: 40px; height: 40px; border-radius: 10px; background: #F4F4F5; margin: 0 auto 14px; display: flex; align-items: center; justify-content: center;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#71717A" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3c0 .7.3 1.3.8 1.8L2 14v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4l-7.8-7.2c.5-.5.8-1.1.8-1.8a3 3 0 0 0-3-3z"/></svg>
          </div>
          <h3 class="empty-state-title">No clean outfits available</h3>
          <p class="empty-state-desc">You need at least one clean Top, Bottom, and Footwear to generate suggestions.</p>
          <p style="font-size: 12px; color: #71717A; margin-top: 6px;">Check your wardrobe to make sure garments are not marked In Laundry or Reserved.</p>
        </div>
      `}
    `,o.querySelectorAll("#occasion-pills .pill-btn").forEach(b=>{b.addEventListener("click",()=>{r=b.getAttribute("data-occ"),c()})}),o.querySelectorAll("#weather-pills .pill-btn").forEach(b=>{b.addEventListener("click",()=>{const C=b.getAttribute("data-weather");s=C==="all"?null:C,c()})}),!a)return;o.querySelectorAll(".dot").forEach(b=>{b.addEventListener("click",()=>{const C=Number(b.getAttribute("data-index"));l[C]&&(i=C,a={...l[C]},n())})}),o.querySelectorAll(".outfit-slot").forEach(b=>{b.addEventListener("click",()=>{const C=b.getAttribute("data-slot");d({category:C,currentOutfit:a,occasion:r,onItemChosen:$=>{a=K.replaceSingleItem(a,C,$),n()}})})}),o.querySelectorAll("[data-remove-acc]").forEach(b=>{b.addEventListener("click",C=>{C.stopPropagation();const $=b.getAttribute("data-remove-acc");a=K.removeAccessory(a,$),n()})});const S=o.querySelector("#btn-try-another");S&&S.addEventListener("click",()=>{l.length>1&&(i=(i+1)%l.length,a={...l[i]},n())});const u=o.querySelector("#btn-save-outfit");u&&u.addEventListener("click",()=>{const b=(a.accessories||[]).map($=>$.id),C=ue({userId:h,name:`${r} Look`,occasion:r,topId:a.top.id,bottomId:a.bottom.id,footwearId:a.footwear.id,accessoryIds:b,isFavorite:!0});y.saveOutfit(C,h),alert(`Saved "${C.name}" to your favorites!`)});const x=o.querySelector("#btn-i-wore-this");x&&x.addEventListener("click",()=>{const b=(a.accessories||[]).map(k=>k.id),C=[a.top.id,a.bottom.id,a.footwear.id,...b],$=prompt("Any notes about today's outfit? (Optional)","")||"",f=Y.recordWear({userId:h,itemIds:C,wearDate:new Date().toISOString().split("T")[0],occasion:r,notes:$.trim(),updateGarmentStatus:!0});alert(`Recorded! Wore ${C.length} items on ${f.wearDate}. Saved to exact wear history.`),t(),e()})}return c(),{element:o,refresh:c}}function ke({onOpenManualLog:d,onOpenHistoryDetail:e,onOpenLeaderboard:t}){const o=document.createElement("div");o.className="history-screen";let r="day",s="All",i="";function l(){const a=y.getCurrentUserId(),c=Y.getGroupedHistory(a,r,{occasion:s!=="All"?s:null}),n=y.getHistoryEvents(a).length;o.innerHTML=`
      <div class="screen-header">
        <div>
          <h2 class="screen-title">Outfit History</h2>
          <p class="screen-subtitle">${n} recorded wear events</p>
        </div>
        <button id="btn-log-past" class="btn btn-primary btn-sm">
          + Log Past Outfit
        </button>
      </div>

      <!-- Grouping Switcher Tabs & Leaderboard -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
        <div class="filter-pill-bar" style="margin-bottom: 0;">
          <button class="pill-btn ${r==="day"?"active":""}" data-group="day">Day</button>
          <button class="pill-btn ${r==="week"?"active":""}" data-group="week">Week</button>
          <button class="pill-btn ${r==="month"?"active":""}" data-group="month">Month</button>
        </div>

        <button id="btn-wear-summary" style="font-size: 11px; font-weight: 700; background: #F4F4F5; border: 1px solid #E5E5E5; padding: 6px 10px; border-radius: 8px; cursor: pointer;">
          Wear Counts
        </button>
      </div>

      <!-- Filter Bar: Occasion & Search -->
      <div style="display: flex; gap: 8px; margin-bottom: 16px;">
        <select id="select-history-occ" class="form-select" style="flex: 1; padding: 6px 10px; font-size: 12px;">
          <option value="All">All Occasions</option>
          ${Z.map(x=>`<option value="${x}" ${x===s?"selected":""}>${x}</option>`).join("")}
        </select>
        <input type="date" id="input-history-date" class="form-input" style="flex: 1; padding: 6px 10px; font-size: 12px;" value="${i}" placeholder="Filter date">
      </div>

      <!-- Grouped History List -->
      ${c.length===0?`
        <div class="empty-state">
          <div style="width: 40px; height: 40px; border-radius: 10px; background: #F4F4F5; margin: 0 auto 14px; display: flex; align-items: center; justify-content: center;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#71717A" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <h3 class="empty-state-title">No wear history yet</h3>
          <p class="empty-state-desc">Wear an outfit from the suggestions tab or log a past outfit manually to start tracking.</p>
          <button id="btn-empty-log" class="btn btn-secondary btn-sm" style="margin-top: 10px;">
            + Log Past Outfit
          </button>
        </div>
      `:`
        <div class="history-group-list">
          ${c.map(x=>{var D,b;const A=[];return x.events.forEach(C=>{(C.itemSnapshots||[]).forEach($=>{A.length<4&&!A.some(f=>f.id===$.id)&&A.push($)})}),`
              <div class="history-card-item" data-group-key="${x.key}" data-event-id="${(D=x.events[0])==null?void 0:D.id}">
                <div class="history-card-left">
                  <div class="history-thumbnails">
                    ${A.map(C=>`
                      <div class="history-thumb" title="${C.name}">
                        ${B(C.category,C.subcategory,C.primaryColor)}
                      </div>
                    `).join("")}
                  </div>
                  <div>
                    <div class="history-info-date">${x.title}</div>
                    <div class="history-info-sub">
                      ${x.count} ${x.count===1?"outfit tried":"outfits tried"}
                      ${(b=x.events[0])!=null&&b.occasion?`&bull; ${x.events[0].occasion}`:""}
                    </div>
                  </div>
                </div>

                <div style="color: #71717A; font-size: 18px; font-weight: 300;">
                  &rsaquo;
                </div>
              </div>
            `}).join("")}
        </div>
      `}
    `,o.querySelectorAll("[data-group]").forEach(x=>{x.addEventListener("click",()=>{r=x.getAttribute("data-group"),l()})});const h=o.querySelector("#select-history-occ");h&&h.addEventListener("change",x=>{s=x.target.value,l()});const p=o.querySelector("#input-history-date");p&&p.addEventListener("change",x=>{if(i=x.target.value,i){const A=y.getHistoryEvents(a,{fromDate:i,toDate:i});A.length>0?e(A[0].id):alert(`No outfit recorded on ${i}`)}});const g=o.querySelector("#btn-log-past");g&&g.addEventListener("click",d);const S=o.querySelector("#btn-empty-log");S&&S.addEventListener("click",d);const u=o.querySelector("#btn-wear-summary");u&&u.addEventListener("click",t),o.querySelectorAll(".history-card-item").forEach(x=>{x.addEventListener("click",()=>{const A=x.getAttribute("data-event-id");A&&e(A)})})}return l(),{element:o,refresh:l}}function Ee({onOpenPlanModal:d,onRefreshAll:e,onNavigateHistory:t}){const o=document.createElement("div");o.className="planner-screen";let r=new Date().toISOString().split("T")[0];function s(l){const a=new Date(l+"T00:00:00"),c=(a.getDay()+6)%7,n=new Date(a);n.setDate(a.getDate()-c);const h=[];for(let p=0;p<7;p++){const g=new Date(n);g.setDate(n.getDate()+p);const S=g.toISOString().split("T")[0],u=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];h.push({dateStr:S,dayName:u[p],dayNum:g.getDate(),isToday:S===new Date().toISOString().split("T")[0]})}return h}function i(){var A,D,b,C,$,f,k,m,E,_,v,w;const l=y.getCurrentUserId(),a=s(r),c=V.getDecoratedPlans({userId:l}),n=c.find(L=>L.plannedDate===r&&L.status==="Planned"),h=new Date(r+"T00:00:00").toLocaleDateString("en-US",{month:"short",year:"numeric"});o.innerHTML=`
      <div class="screen-header">
        <div>
          <h2 class="screen-title">Weekly Planner</h2>
          <p class="screen-subtitle">${h} &bull; Scheduled looks</p>
        </div>
        <button id="btn-schedule-new" class="btn btn-primary btn-sm">
          + Schedule
        </button>
      </div>

      <!-- Calendar Week Strip (Mon-Sun) -->
      <div class="planner-week-strip">
        ${a.map(L=>{const N=c.some(H=>H.plannedDate===L.dateStr&&H.status==="Planned"),G=L.dateStr===r;return`
            <div class="day-cell ${G?"active":""}" data-day-date="${L.dateStr}">
              <span class="day-name">${L.dayName}</span>
              <span class="day-num">${L.dayNum}</span>
              ${N?`<div style="width: 4px; height: 4px; border-radius: 50%; background: ${G?"#FFFFFF":"#000000"}; margin-top: 4px;"></div>`:""}
            </div>
          `}).join("")}
      </div>

      <!-- Informative Note -->
      <div style="background: #FAFAFA; border: 1px solid #E5E5E5; border-left: 3px solid #27272A; border-radius: 8px; padding: 8px 12px; margin-bottom: 16px; font-size: 11px; color: #71717A;">
        <strong style="color: #1F1F1F;">Note:</strong> Scheduled outfits do not increment wear counts or appear in wear history until you tap &ldquo;Mark as Worn&rdquo;.
      </div>

      <!-- Selected Day's Plan Card -->
      ${n?`
        <div class="planner-plan-card">
          <!-- Real-Time Status Warnings -->
          ${n.hasWarnings?`
            <div class="warning-banner">
              <div style="width: 16px; height: 16px; border-radius: 3px; background: #D97706; flex-shrink: 0; margin-top: 1px;"></div>
              <div>
                ${n.warnings.map(L=>`<div>${L.message}</div>`).join("")}
              </div>
            </div>
          `:""}

          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div>
              <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #71717A;">Scheduled Look</span>
              <h3 style="font-size: 16px; font-weight: 800; color: #000000;">${n.occasion} Outfit</h3>
            </div>
            <span class="status-badge clean">Planned</span>
          </div>

          <!-- Outfits Grid Preview -->
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; background: #FAFAFA; padding: 12px; border-radius: 12px;">
            <!-- Top -->
            <div style="text-align: center;">
              <div style="width: 100%; height: 75px; background: #fff; border-radius: 8px; display: flex; align-items: center; justify-content: center; border: 1px solid #E5E5E5;">
                ${B((A=n.top)==null?void 0:A.category,(D=n.top)==null?void 0:D.subcategory,(b=n.top)==null?void 0:b.primaryColor)}
              </div>
              <div style="font-size: 11px; font-weight: 600; margin-top: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${(C=n.top)==null?void 0:C.name}</div>
            </div>

            <!-- Bottom -->
            <div style="text-align: center;">
              <div style="width: 100%; height: 75px; background: #fff; border-radius: 8px; display: flex; align-items: center; justify-content: center; border: 1px solid #E5E5E5;">
                ${B(($=n.bottom)==null?void 0:$.category,(f=n.bottom)==null?void 0:f.subcategory,(k=n.bottom)==null?void 0:k.primaryColor)}
              </div>
              <div style="font-size: 11px; font-weight: 600; margin-top: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${(m=n.bottom)==null?void 0:m.name}</div>
            </div>

            <!-- Footwear -->
            <div style="text-align: center;">
              <div style="width: 100%; height: 75px; background: #fff; border-radius: 8px; display: flex; align-items: center; justify-content: center; border: 1px solid #E5E5E5;">
                ${B((E=n.footwear)==null?void 0:E.category,(_=n.footwear)==null?void 0:_.subcategory,(v=n.footwear)==null?void 0:v.primaryColor)}
              </div>
              <div style="font-size: 11px; font-weight: 600; margin-top: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${(w=n.footwear)==null?void 0:w.name}</div>
            </div>
          </div>

          <!-- Accessories if present -->
          ${n.accessories&&n.accessories.length>0?`
            <div style="display: flex; gap: 6px; overflow-x: auto; padding: 4px 0;">
              ${n.accessories.map(L=>`
                <div style="display: flex; align-items: center; gap: 4px; background: #FAFAFA; border: 1px solid #E5E5E5; padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 600;">
                  <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #27272A; flex-shrink: 0;"></span>
                  <span>${L.name}</span>
                </div>
              `).join("")}
            </div>
          `:""}

          ${n.notes?`
            <p style="font-size: 12px; color: #52525B; font-style: italic;">
              &ldquo;${n.notes}&rdquo;
            </p>
          `:""}

          <!-- Plan Action Buttons -->
          <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 4px;">
            <button id="btn-mark-plan-worn" class="btn btn-primary" style="padding: 12px;">
              Mark as Worn
            </button>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              <button id="btn-edit-plan" class="btn btn-secondary btn-sm">Edit Plan</button>
              <button id="btn-delete-plan" class="btn btn-secondary btn-sm" style="color: #DC2626;">Remove Plan</button>
            </div>
          </div>
        </div>
      `:`
        <div class="empty-state" style="padding: 30px 10px;">
          <div style="width: 40px; height: 40px; border-radius: 10px; background: #F4F4F5; margin: 0 auto 14px; display: flex; align-items: center; justify-content: center;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#71717A" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
          </div>
          <h3 class="empty-state-title">No outfit planned for this date</h3>
          <p class="empty-state-desc">Plan your look in advance to stay organized throughout the week.</p>
          <button id="btn-plan-for-day" class="btn btn-primary btn-sm" style="margin-top: 10px;">
            + Plan for ${r}
          </button>
        </div>
      `}
    `,o.querySelectorAll(".day-cell").forEach(L=>{L.addEventListener("click",()=>{r=L.getAttribute("data-day-date"),i()})});const p=o.querySelector("#btn-schedule-new");p&&p.addEventListener("click",()=>d(r));const g=o.querySelector("#btn-plan-for-day");g&&g.addEventListener("click",()=>d(r));const S=o.querySelector("#btn-mark-plan-worn");S&&n&&S.addEventListener("click",()=>{confirm(`Confirm you wore this outfit on ${r}? This will record it to your exact wear history.`)&&(V.markPlanAsWorn({planId:n.id,actualWearDate:r,userId:l}),alert("Recorded! Wear count has been updated and a permanent wear history event was created."),e(),t())});const u=o.querySelector("#btn-delete-plan");u&&n&&u.addEventListener("click",()=>{confirm("Are you sure you want to remove this scheduled outfit?")&&(V.deletePlan(n.id,l),i())});const x=o.querySelector("#btn-edit-plan");x&&n&&x.addEventListener("click",()=>{const L=prompt("Update notes for this plan:",n.notes||"");L!==null&&(V.updatePlan(n.id,{notes:L.trim()},l),i())})}return i(),{element:o,refresh:i}}class Fe{constructor(e=y){this.storage=e}getAnalytics(e=this.storage.getCurrentUserId()){const t=this.storage.getGarments(e,{includeArchived:!0}),o=this.storage.getHistoryEvents(e),r=o.length,s=r>0,i=t.filter(v=>v.category.toLowerCase()!=="accessories"),l=t.filter(v=>v.category.toLowerCase()==="accessories"),c=[...i].sort((v,w)=>(w.wearCount||0)-(v.wearCount||0)).filter(v=>(v.wearCount||0)>0).slice(0,5),n=[...i].sort((v,w)=>(v.wearCount||0)-(w.wearCount||0)).slice(0,5),h=i.filter(v=>(v.wearCount||0)===0).length,g=[...l].sort((v,w)=>(w.wearCount||0)-(v.wearCount||0)).filter(v=>(v.wearCount||0)>0).slice(0,5),S=l.filter(v=>(v.wearCount||0)===0).length,u=new Map;o.forEach(v=>{const w=v.wearDate.substring(0,7);u.set(w,(u.get(w)||0)+1)});const x=Array.from(u.entries()).sort(([v],[w])=>v.localeCompare(w)).map(([v,w])=>{const[L,N]=v.split("-"),H=new Date(Number(L),Number(N)-1,1).toLocaleDateString("en-US",{month:"short",year:"numeric"});return{month:v,label:H,count:w}}),A=new Map;o.forEach(v=>{const w=[...v.itemIds].sort().join(",");A.set(w,(A.get(w)||0)+1)});const D=A.size,b=r>0?Math.round((r-D)/r*100):0;let C=null,$=0;for(const[v,w]of A.entries())w>$&&w>1&&($=w,C={itemIds:v.split(","),count:w});const f=t.filter(v=>v.purchasePrice!==null&&v.purchasePrice>0),k=f.map(v=>{const w=Math.max(1,v.wearCount||0),L=Number((v.purchasePrice/w).toFixed(2));return{id:v.id,name:v.name,category:v.category,purchasePrice:v.purchasePrice,wearCount:v.wearCount||0,costPerWear:L,isZeroWear:(v.wearCount||0)===0}}),m=[...k].filter(v=>v.wearCount>0).sort((v,w)=>v.costPerWear-w.costPerWear).slice(0,5),E=[...k].sort((v,w)=>w.costPerWear-v.costPerWear).slice(0,5),_=f.reduce((v,w)=>v+w.purchasePrice,0);return{hasSufficientHistory:s,totalGarments:i.length,totalAccessories:l.length,totalRecordedWears:r,unwornGarmentsCount:h,unwornAccessoriesCount:S,mostWornGarments:c,leastWornGarments:n,mostWornAccessories:g,monthlyBreakdown:x,repetition:{totalOutfitsRecorded:r,uniqueLooks:D,repeatRatePercentage:b,mostRepeatedCombo:C},costPerWear:{hasCostData:f.length>0,totalItemsWithPrice:f.length,totalInvestment:Math.round(_),bestValueItems:m,highestCpwItems:E}}}}const $e=new Fe;function Le({onOpenGarmentDetail:d}){const e=document.createElement("div");e.className="analytics-screen";function t(){const o=y.getCurrentUserId(),r=$e.getAnalytics(o);e.innerHTML=`
      <div class="screen-header">
        <div>
          <h2 class="screen-title">Wardrobe Insights</h2>
          <p class="screen-subtitle">Data-driven analytics & cost-per-wear</p>
        </div>
      </div>

      <!-- Overview KPI Cards -->
      <div class="analytics-kpi-grid">
        <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 14px; padding: 14px;">
          <div style="font-size: 11px; font-weight: 700; color: #71717A; text-transform: uppercase;">Recorded Wears</div>
          <div style="font-size: 26px; font-weight: 800; color: #000000; margin-top: 4px;">${r.totalRecordedWears}</div>
          <div style="font-size: 11px; color: #059669; font-weight: 600;">${r.repetition.uniqueLooks} unique looks</div>
        </div>

        <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 14px; padding: 14px;">
          <div style="font-size: 11px; font-weight: 700; color: #71717A; text-transform: uppercase;">Repetition Rate</div>
          <div style="font-size: 26px; font-weight: 800; color: #000000; margin-top: 4px;">${r.repetition.repeatRatePercentage}%</div>
          <div style="font-size: 11px; color: #71717A;">${r.repetition.repeatRatePercentage<20?"High wardrobe variety":"Consistent style"}</div>
        </div>

        <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 14px; padding: 14px;">
          <div style="font-size: 11px; font-weight: 700; color: #71717A; text-transform: uppercase;">Total Wardrobe</div>
          <div style="font-size: 26px; font-weight: 800; color: #000000; margin-top: 4px;">${r.totalGarments+r.totalAccessories}</div>
          <div style="font-size: 11px; color: #71717A;">${r.totalGarments} clothes &bull; ${r.totalAccessories} accs</div>
        </div>

        <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 14px; padding: 14px;">
          <div style="font-size: 11px; font-weight: 700; color: #71717A; text-transform: uppercase;">Wardrobe Value</div>
          <div style="font-size: 26px; font-weight: 800; color: #000000; margin-top: 4px;">${z(r.costPerWear.totalInvestment)}</div>
          <div style="font-size: 11px; color: #71717A;">${r.costPerWear.totalItemsWithPrice} priced items</div>
        </div>
      </div>

      ${r.hasSufficientHistory?`
        <!-- Section: Most Worn & Least Worn Garments -->
        <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 16px; padding: 16px; margin-bottom: 16px;">
          <h3 style="font-size: 15px; font-weight: 800; color: #000000; margin-bottom: 12px;">Top 5 Most-Worn Garments</h3>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${r.mostWornGarments.map((s,i)=>`
              <div style="display: flex; align-items: center; justify-content: space-between; font-size: 13px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-weight: 800; width: 18px; color: #A1A1AA;">#${i+1}</span>
                  <div style="width: 32px; height: 32px; background: #FAFAFA; border-radius: 6px; display: flex; align-items: center; justify-content: center; border: 1px solid #E5E5E5;">
                    ${B(s.category,s.subcategory,s.primaryColor)}
                  </div>
                  <div>
                    <div style="font-weight: 700; color: #000000;">${s.name}</div>
                    <div style="font-size: 11px; color: #71717A;">${s.category} &bull; ${s.primaryColor}</div>
                  </div>
                </div>
                <div style="font-weight: 800; background: #F4F4F5; padding: 3px 8px; border-radius: 6px;">
                  ${s.wearCount} ${s.wearCount===1?"wear":"wears"}
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Section: Most Worn Accessories -->
        <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 16px; padding: 16px; margin-bottom: 16px;">
          <h3 style="font-size: 15px; font-weight: 800; color: #000000; margin-bottom: 12px;">Most-Worn Accessories</h3>
          ${r.mostWornAccessories.length===0?`
            <div style="font-size: 12px; color: #71717A;">No accessories worn yet in recorded history.</div>
          `:`
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${r.mostWornAccessories.map((s,i)=>`
                <div style="display: flex; align-items: center; justify-content: space-between; font-size: 13px;">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-weight: 800; width: 18px; color: #A1A1AA;">#${i+1}</span>
                    <div style="width: 32px; height: 32px; background: #FAFAFA; border-radius: 6px; display: flex; align-items: center; justify-content: center; border: 1px solid #E5E5E5;">
                      ${B(s.category,s.subcategory,s.primaryColor)}
                    </div>
                    <div>
                      <div style="font-weight: 700; color: #000000;">${s.name}</div>
                      <div style="font-size: 11px; color: #71717A;">${s.subcategory||"Accessory"}</div>
                    </div>
                  </div>
                  <div style="font-weight: 800; background: #F4F4F5; padding: 3px 8px; border-radius: 6px;">
                    ${s.wearCount} ${s.wearCount===1?"wear":"wears"}
                  </div>
                </div>
              `).join("")}
            </div>
          `}
        </div>

        <!-- Section: Monthly Wear Breakdown -->
        <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 16px; padding: 16px; margin-bottom: 16px;">
          <h3 style="font-size: 15px; font-weight: 800; color: #000000; margin-bottom: 12px;">Outfits Recorded by Month</h3>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${r.monthlyBreakdown.map(s=>{const i=Math.max(...r.monthlyBreakdown.map(a=>a.count),1),l=Math.round(s.count/i*100);return`
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 600; margin-bottom: 4px;">
                    <span>${s.label}</span>
                    <span>${s.count} outfits</span>
                  </div>
                  <div style="width: 100%; height: 8px; background: #F4F4F5; border-radius: 4px; overflow: hidden;">
                    <div style="width: ${l}%; height: 100%; background: #000000; border-radius: 4px;"></div>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>

        <!-- Section: Cost-Per-Wear (CPW) Analysis -->
        <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 16px; padding: 16px; margin-bottom: 16px;">
          <h3 style="font-size: 15px; font-weight: 800; color: #000000; margin-bottom: 4px;">Cost-Per-Wear (CPW) Analysis</h3>
          <p style="font-size: 11px; color: #71717A; margin-bottom: 12px;">Purchase price &divide; verified wear count</p>

          <h4 style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #059669; margin-bottom: 8px;">Best Value Items (Lowest CPW)</h4>
          <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
            ${r.costPerWear.bestValueItems.map(s=>`
              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; border-bottom: 1px solid #F4F4F5; padding-bottom: 6px;">
                <div>
                  <div style="font-weight: 700; color: #000000;">${s.name}</div>
                  <div style="color: #71717A;">Cost ${z(s.purchasePrice)} &bull; ${s.wearCount} wears</div>
                </div>
                <div style="font-size: 13px; font-weight: 800; color: #059669; background: #ECFDF5; padding: 2px 8px; border-radius: 6px;">
                  ${z(s.costPerWear)}/wear
                </div>
              </div>
            `).join("")}
          </div>

          <h4 style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #D97706; margin-bottom: 8px;">Investment Items Needing Wear</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${r.costPerWear.highestCpwItems.slice(0,3).map(s=>`
              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; border-bottom: 1px solid #F4F4F5; padding-bottom: 6px;">
                <div>
                  <div style="font-weight: 700; color: #000000;">${s.name}</div>
                  <div style="color: #71717A;">Cost ${z(s.purchasePrice)} &bull; ${s.wearCount} wears</div>
                </div>
                <div style="font-size: 13px; font-weight: 800; color: #D97706; background: #FFFBEB; padding: 2px 8px; border-radius: 6px;">
                  ${z(s.costPerWear)}/wear
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `:`
        <div class="empty-state">
          <div style="width: 40px; height: 40px; border-radius: 10px; background: #F4F4F5; margin: 0 auto 14px; display: flex; align-items: center; justify-content: center;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#71717A" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
          <h3 class="empty-state-title">Not enough data yet</h3>
          <p class="empty-state-desc">Start wearing outfits and logging history to reveal your most-worn pieces, repetition rates, and cost-per-wear.</p>
        </div>
      `}
    `}return t(),{element:e,refresh:t}}function _e({onUserSwitched:d,onRefreshAll:e,onOpenLogin:t,onOpenSignup:o,onLogout:r}){const s=document.createElement("div");s.className="profile-screen";function i(){const l=y.getCurrentUserId(),a=O.getSession(),c=y.getProfile(l)||{id:l,displayName:(a==null?void 0:a.name)||"Wardli User",email:(a==null?void 0:a.email)||`${l}@wardli.style`,repeatAvoidanceDays:7,customCategories:["Outerwear","Activewear"]},n=O.getAllAccounts(),h=y.getCurrency();s.innerHTML=`
      <div style="text-align: center; margin-bottom: 20px; padding-top: 10px;">
        <div style="width: 50px; height: 50px; margin: 0 auto 12px auto;">
          ${j.appIcon}
        </div>
        <h2 style="font-size: 24px; font-weight: 800; letter-spacing: -0.8px; color: #000000;">wardli</h2>
        <p style="font-size: 13px; color: #71717A; font-weight: 500;">Your wardrobe. Your everyday style.</p>
      </div>

      <!-- Current Account Card with Log Out & Auth Actions -->
      <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 16px; padding: 18px; margin-bottom: 16px;">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <h3 style="font-size: 16px; font-weight: 800; color: #000000;">${c.displayName||"Wardli User"}</h3>
              <span style="font-size: 11px; font-weight: 700; color: ${a!=null&&a.isDemo?"#D97706":"#059669"}; background: ${a!=null&&a.isDemo?"#FFFBEB":"#ECFDF5"}; padding: 2px 8px; border-radius: 6px;">
                ${a!=null&&a.isDemo?"Demo Mode":"Authenticated"}
              </span>
            </div>
            <p style="font-size: 12px; color: #71717A; margin-top: 2px;">
              ${c.email||`${l}@wardli.style`}
            </p>
          </div>
          <div style="width: 40px; height: 40px; border-radius: 50%; background: #000000; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px;">
            ${(c.displayName||"U").charAt(0).toUpperCase()}
          </div>
        </div>

        <div style="display: flex; gap: 8px; margin-top: 14px;">
          <button id="btn-profile-logout" class="btn btn-secondary btn-sm" style="flex: 1; color: #DC2626; border-color: #FCA5A5; background: #FEF2F2;">
            Log Out
          </button>
          <button id="btn-profile-login" class="btn btn-secondary btn-sm" style="flex: 1;">
            Log In
          </button>
          <button id="btn-profile-signup" class="btn btn-primary btn-sm" style="flex: 1;">
            Sign Up
          </button>
        </div>
      </div>

      <!-- Currency Preference Settings -->
      <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 16px; padding: 16px; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
          <h3 style="font-size: 14px; font-weight: 800; color: #000000;">Currency</h3>
          <span style="font-size: 12px; font-weight: 700; color: #000000; background: #F4F4F5; padding: 2px 8px; border-radius: 6px;">
            ${h.code} (${h.symbol})
          </span>
        </div>
        <p style="font-size: 12px; color: #71717A; margin-bottom: 12px;">
          Select your currency for wardrobe valuation and cost-per-wear analytics.
        </p>

        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">
          ${Object.values(R).map(f=>`
            <button class="currency-btn" data-currency="${f.code}" style="
              display: flex; flex-direction: column; align-items: center; justify-content: center;
              padding: 10px 4px; border-radius: 10px; border: 1px solid ${f.code===h.code?"#000000":"#E5E5E5"};
              background: ${f.code===h.code?"#000000":"#FFFFFF"};
              color: ${f.code===h.code?"#FFFFFF":"#000000"};
              cursor: pointer; font-family: inherit; transition: all 0.15s ease;
            ">
              <span style="font-size: 16px; font-weight: 800;">${f.symbol}</span>
              <span style="font-size: 11px; font-weight: 600; margin-top: 2px;">${f.code}</span>
            </button>
          `).join("")}
        </div>
      </div>

      <!-- Multi-User Account Switcher (Owner-Level Isolation) -->
      <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 16px; padding: 16px; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <h3 style="font-size: 14px; font-weight: 800; color: #000000;">Switch Active Account</h3>
          <span style="font-size: 11px; font-weight: 700; color: #059669; background: #ECFDF5; padding: 2px 8px; border-radius: 6px;">
            Owner-Isolated
          </span>
        </div>
        <p style="font-size: 12px; color: #71717A; margin-bottom: 12px;">
          Wardli enforces strict user data isolation. Switching accounts proves that User A cannot see or modify User B's wardrobe, photos, or history.
        </p>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${n.map(f=>`
            <div class="user-switch-item" data-user-id="${f.id}" style="
              display: flex; align-items: center; justify-content: space-between;
              padding: 10px 14px; border-radius: 10px; border: 1px solid ${f.id===l?"#000000":"#E5E5E5"};
              background: ${f.id===l?"#FAFAFA":"#FFFFFF"}; cursor: pointer;
            ">
              <div>
                <div style="font-size: 13px; font-weight: 700; color: #000000;">${f.name}</div>
                <div style="font-size: 11px; color: #71717A;">${f.email} ${f.isDemo?"(Demo)":""}</div>
              </div>
              ${f.id===l?'<span style="font-size: 12px; font-weight: 800; color: #000000;">Active</span>':'<span style="font-size: 11px; color: #A1A1AA;">Switch &rarr;</span>'}
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Repeat Avoidance Window Settings -->
      <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 16px; padding: 16px; margin-bottom: 16px;">
        <h3 style="font-size: 14px; font-weight: 800; color: #000000; margin-bottom: 4px;">Outfit Repetition Control</h3>
        <p style="font-size: 12px; color: #71717A; margin-bottom: 14px;">
          Configure how many days Wardli should avoid suggesting recently worn items when suitable alternatives exist.
        </p>

        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <span style="font-size: 13px; font-weight: 600;">Avoidance Window:</span>
          <span id="window-val-label" style="font-size: 15px; font-weight: 800; color: #000000;">${c.repeatAvoidanceDays||7} days</span>
        </div>

        <input type="range" id="avoidance-slider" min="3" max="30" value="${c.repeatAvoidanceDays||7}" style="width: 100%; accent-color: #000000; cursor: pointer;">
        <div style="display: flex; justify-content: space-between; font-size: 10px; color: #A1A1AA; margin-top: 4px;">
          <span>3 days (Minimal)</span>
          <span>7 days (Recommended)</span>
          <span>30 days (Strict)</span>
        </div>
      </div>

      <!-- Custom Categories Management -->
      <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 16px; padding: 16px; margin-bottom: 16px;">
        <h3 style="font-size: 14px; font-weight: 800; color: #000000; margin-bottom: 4px;">Custom Categories</h3>
        <p style="font-size: 12px; color: #71717A; margin-bottom: 12px;">
          Extensible wardrobe organization beyond Tops, Bottoms, Footwear and Accessories.
        </p>

        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
          ${(c.customCategories||[]).map(f=>`
            <div style="display: flex; align-items: center; gap: 6px; background: #F4F4F5; border: 1px solid #E5E5E5; padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: 600;">
              <span>${f}</span>
              <button data-delete-cat="${f}" style="background: none; border: none; color: #A1A1AA; cursor: pointer;">&times;</button>
            </div>
          `).join("")}
        </div>

        <button id="btn-add-cat-profile" class="btn btn-secondary btn-sm" style="width: 100%;">
          + Add New Custom Category
        </button>
      </div>

      <!-- PWA Mobile App Installation -->
      <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 16px; padding: 16px; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <h3 style="font-size: 14px; font-weight: 800; color: #000000;">Install Mobile App</h3>
          <span style="font-size: 11px; font-weight: 700; color: #2563EB; background: #EFF6FF; padding: 2px 8px; border-radius: 6px;">
            PWA Ready
          </span>
        </div>
        <p style="font-size: 12px; color: #71717A; margin-bottom: 12px; line-height: 1.5;">
          Install Wardli directly on your home screen for full-screen offline access without downloading from app stores.
        </p>

        <button id="btn-install-pwa" class="btn btn-primary btn-sm" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;">
          <span>📲</span> <span>Install Wardli to Home Screen</span>
        </button>
        <div id="pwa-install-hint" style="display: none; font-size: 11px; color: #71717A; margin-top: 8px; text-align: center; background: #FAFAFA; padding: 8px; border-radius: 8px;">
          To install on iPhone/iPad: Tap <strong>Share (↑)</strong> in Safari, then tap <strong>Add to Home Screen</strong>.
        </div>
      </div>

      <!-- Backup, Privacy & Reset -->
      <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 16px; padding: 16px; margin-bottom: 24px;">
        <h3 style="font-size: 14px; font-weight: 800; color: #000000; margin-bottom: 12px;">Data Management & Backup</h3>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          <button id="btn-export-json" class="btn btn-secondary btn-sm" style="width: 100%;">
            Export Wardrobe &amp; History (JSON)
          </button>
          <button id="btn-reseed-data" class="btn btn-secondary btn-sm" style="width: 100%;">
            Reset &amp; Load Demo Wardrobe
          </button>
          <a href="/website/index.html" target="_blank" class="btn btn-secondary btn-sm" style="width: 100%; text-decoration: none;">
            View Marketing Website &rarr;
          </a>
        </div>
      </div>
    `;const p=s.querySelector("#btn-profile-logout");p&&p.addEventListener("click",()=>{confirm("Are you sure you want to log out of this account?")&&(O.logout(),r?r():(i(),e()))});const g=s.querySelector("#btn-profile-login");g&&g.addEventListener("click",()=>{t&&t()});const S=s.querySelector("#btn-profile-signup");S&&S.addEventListener("click",()=>{o&&o()});const u=s.querySelector("#btn-install-pwa"),x=s.querySelector("#pwa-install-hint");u&&u.addEventListener("click",async()=>{if(window.deferredPrompt){window.deferredPrompt.prompt();const{outcome:f}=await window.deferredPrompt.userChoice;f==="accepted"&&(window.deferredPrompt=null,u.textContent="✓ Wardli Installed!",u.disabled=!0)}else x&&(x.style.display=x.style.display==="none"?"block":"none")}),s.querySelectorAll(".user-switch-item").forEach(f=>{f.addEventListener("click",()=>{const k=f.getAttribute("data-user-id");if(k!==l){if(y.setCurrentUserId(k),k==="user_minimalist"&&y.getGarments(k).length===0){const E=re(k);E.garments=E.garments.slice(0,6),E.events=E.events.slice(0,3),y.saveProfile({...E.profile,displayName:"Jordan Lee"}),E.garments.forEach(_=>y.saveGarment(_,k)),E.events.forEach(_=>y.saveHistoryEvent(_,k))}const m=n.find(E=>E.id===k);m&&O.setSession(m),d(k)}})}),s.querySelectorAll("[data-currency]").forEach(f=>{f.addEventListener("click",()=>{const k=f.getAttribute("data-currency");y.setCurrency(k),i(),e()})});const A=s.querySelector("#avoidance-slider"),D=s.querySelector("#window-val-label");A&&A.addEventListener("input",f=>{const k=Number(f.target.value);D&&(D.textContent=`${k} days`),c.repeatAvoidanceDays=k,y.saveProfile(c)});const b=s.querySelector("#btn-add-cat-profile");b&&b.addEventListener("click",()=>{const f=prompt("Enter custom category name:");f&&f.trim()&&(c.customCategories||(c.customCategories=[]),c.customCategories.includes(f.trim())||(c.customCategories.push(f.trim()),y.saveProfile(c),i(),e()))}),s.querySelectorAll("[data-delete-cat]").forEach(f=>{f.addEventListener("click",()=>{const k=f.getAttribute("data-delete-cat");c.customCategories=(c.customCategories||[]).filter(m=>m!==k),y.saveProfile(c),i(),e()})});const C=s.querySelector("#btn-export-json");C&&C.addEventListener("click",()=>{const f=y.exportAllUserData(l),k=new Blob([JSON.stringify(f,null,2)],{type:"application/json"}),m=URL.createObjectURL(k),E=document.createElement("a");E.href=m,E.download=`wardli_backup_${l}.json`,E.click()});const $=s.querySelector("#btn-reseed-data");$&&$.addEventListener("click",()=>{if(confirm("Reset this account and reload curated seed items & wear history?")){y.clearUserData(l);const f=re(l);y.saveProfile(f.profile),f.garments.forEach(k=>y.saveGarment(k,l)),f.events.forEach(k=>y.saveHistoryEvent(k,l)),f.plannedOutfits.forEach(k=>y.savePlannedOutfit(k,l)),alert("Curated demo wardrobe and history reloaded!"),e(),i()}})}return i(),{element:s,refresh:i}}class De{constructor(){this.canvas=null,this.ctx=null,this.width=window.innerWidth,this.height=window.innerHeight,this.pointer={x:this.width/2,y:this.height/2,targetX:this.width/2,targetY:this.height/2},this.orbs=[],this.particles=[],this.animationFrame=null,this.isReducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches}mount(e=document.body){document.getElementById("wardli-ambient-canvas")||(this.canvas=document.createElement("canvas"),this.canvas.id="wardli-ambient-canvas",this.canvas.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
      opacity: 1;
      transition: opacity 0.5s ease;
    `,e.prepend(this.canvas),this.ctx=this.canvas.getContext("2d"),this.resize(),this.initOrbs(),this.initParticles(),this.attachEvents(),this.animate())}resize(){this.width=window.innerWidth,this.height=window.innerHeight,this.canvas&&(this.canvas.width=this.width*(window.devicePixelRatio||1),this.canvas.height=this.height*(window.devicePixelRatio||1),this.ctx.scale(window.devicePixelRatio||1,window.devicePixelRatio||1))}initOrbs(){this.orbs=[{x:this.width*.2,y:this.height*.25,radius:Math.min(this.width,this.height)*.5,baseColor:[124,58,237],vx:.35,vy:.25,phase:0},{x:this.width*.8,y:this.height*.35,radius:Math.min(this.width,this.height)*.45,baseColor:[37,99,235],vx:-.3,vy:.35,phase:Math.PI/2},{x:this.width*.5,y:this.height*.8,radius:Math.min(this.width,this.height)*.55,baseColor:[16,185,129],vx:.25,vy:-.3,phase:Math.PI},{x:this.width*.85,y:this.height*.85,radius:Math.min(this.width,this.height)*.4,baseColor:[244,63,94],vx:-.2,vy:-.25,phase:Math.PI*1.5}]}initParticles(){this.particles=[];const e=Math.min(55,Math.floor(this.width/25));for(let t=0;t<e;t++)this.particles.push({x:Math.random()*this.width,y:Math.random()*this.height,size:Math.random()*2+.8,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,alpha:Math.random()*.6+.2,baseAlpha:Math.random()*.5+.2})}attachEvents(){window.addEventListener("resize",()=>{this.resize(),this.initOrbs()}),window.addEventListener("pointermove",e=>{this.pointer.targetX=e.clientX,this.pointer.targetY=e.clientY}),window.addEventListener("touchmove",e=>{e.touches[0]&&(this.pointer.targetX=e.touches[0].clientX,this.pointer.targetY=e.touches[0].clientY)},{passive:!0})}animate(){this.pointer.x+=(this.pointer.targetX-this.pointer.x)*.06,this.pointer.y+=(this.pointer.targetY-this.pointer.y)*.06,this.ctx.clearRect(0,0,this.width,this.height);for(const t of this.orbs){this.isReducedMotion||(t.x+=t.vx,t.y+=t.vy,t.phase+=.008,t.x<-t.radius&&(t.x=this.width+t.radius),t.x>this.width+t.radius&&(t.x=-t.radius),t.y<-t.radius&&(t.y=this.height+t.radius),t.y>this.height+t.radius&&(t.y=-t.radius));const o=this.pointer.x-t.x,r=this.pointer.y-t.y,s=Math.hypot(o,r),i=Math.min(50,(1-s/(this.width||1))*40),l=t.x+o/(s||1)*i,a=t.y+r/(s||1)*i,c=this.ctx.createRadialGradient(l,a,0,l,a,t.radius),[n,h,p]=t.baseColor;c.addColorStop(0,`rgba(${n}, ${h}, ${p}, 0.18)`),c.addColorStop(.4,`rgba(${n}, ${h}, ${p}, 0.08)`),c.addColorStop(.8,`rgba(${n}, ${h}, ${p}, 0.02)`),c.addColorStop(1,"rgba(0, 0, 0, 0)"),this.ctx.fillStyle=c,this.ctx.beginPath(),this.ctx.arc(l,a,t.radius,0,Math.PI*2),this.ctx.fill()}const e=this.ctx.createRadialGradient(this.pointer.x,this.pointer.y,0,this.pointer.x,this.pointer.y,280);e.addColorStop(0,"rgba(255, 255, 255, 0.14)"),e.addColorStop(.35,"rgba(168, 85, 247, 0.06)"),e.addColorStop(.7,"rgba(59, 130, 246, 0.02)"),e.addColorStop(1,"rgba(0, 0, 0, 0)"),this.ctx.fillStyle=e,this.ctx.beginPath(),this.ctx.arc(this.pointer.x,this.pointer.y,280,0,Math.PI*2),this.ctx.fill();for(const t of this.particles)this.isReducedMotion||(t.x+=t.vx,t.y+=t.vy,t.x<0&&(t.x=this.width),t.x>this.width&&(t.x=0),t.y<0&&(t.y=this.height),t.y>this.height&&(t.y=0)),this.ctx.fillStyle=`rgba(255, 255, 255, ${t.alpha*.6})`,this.ctx.beginPath(),this.ctx.arc(t.x,t.y,t.size,0,Math.PI*2),this.ctx.fill();this.animationFrame=requestAnimationFrame(()=>this.animate())}destroy(){this.animationFrame&&cancelAnimationFrame(this.animationFrame),this.canvas&&this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas)}}const Ie=new De;class Pe{constructor(){this.screenControllers={},Ie.mount(),fe(y);const t=new URLSearchParams(window.location.search).get("action"),o=O.getSession();o?(y.setCurrentUserId(o.id),this.currentScreen="wardrobe"):this.currentScreen="onboarding",this.initDOM(),this.attachGlobalEvents(),this.navigateTo(this.currentScreen),t==="login"?setTimeout(()=>this.handleOpenLogin(),300):t==="signup"&&setTimeout(()=>this.handleOpenSignup(),300)}initDOM(){const e=document.getElementById("app-root");e.innerHTML=`
      <div class="app-layout">
        <!-- Top App Bar -->
        <header class="app-header">
          <div class="app-header-inner">
            <a href="#" class="app-brand-lockup" id="brand-home-link">
              <div class="app-icon-mini">w.</div>
              <span class="app-brand-title">wardli</span>
            </a>

            <div class="header-actions">
              <button class="user-badge-btn" id="header-user-btn" title="View Account Profile">
                <span class="user-dot"></span>
                <span id="header-user-name">Alex</span>
              </button>
              <button id="header-auth-action-btn" class="btn btn-secondary btn-sm" style="font-size: 11px; padding: 4px 10px; border-radius: 8px;">
                Log Out
              </button>
            </div>
          </div>
        </header>

        <!-- Navigation Bar (Adapts responsively to mobile and desktop) -->
        <nav class="bottom-nav" id="bottom-nav-bar">
          <div class="nav-inner">
            <button class="nav-item active" data-nav="wardrobe">
              ${j.wardrobeIcon}
              <span>Wardrobe</span>
            </button>
            <button class="nav-item" data-nav="outfits">
              ${j.outfitIcon}
              <span>Outfits</span>
            </button>
            <button class="nav-item" data-nav="planner">
              ${j.plannerIcon}
              <span>Planner</span>
            </button>
            <button class="nav-item" data-nav="history">
              ${j.historyIcon}
              <span>History</span>
            </button>
            <button class="nav-item" data-nav="analytics">
              ${j.analyticsIcon}
              <span>Insights</span>
            </button>
            <button class="nav-item" data-nav="profile">
              ${j.profileIcon}
              <span>Profile</span>
            </button>
          </div>
        </nav>

        <!-- Dynamic Screen Viewport -->
        <main class="app-screen-container" id="screen-viewport"></main>
      </div>
    `,this.viewport=document.getElementById("screen-viewport"),this.navBar=document.getElementById("bottom-nav-bar"),this.updateUserBadge()}updateUserBadge(){const e=document.getElementById("header-user-name"),t=document.getElementById("header-auth-action-btn"),o=y.getCurrentUserId(),r=O.getSession(),s=y.getProfile(o);e&&(r?e.textContent=(r.name||(s==null?void 0:s.displayName)||"User").split(" ")[0]:e.textContent="Guest"),t&&(O.isAuthenticated()?(t.textContent="Log Out",t.style.color="#71717A"):(t.textContent="Log In",t.style.color="#000000"))}attachGlobalEvents(){this.navBar.querySelectorAll(".nav-item").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-nav");this.navigateTo(t)})}),document.getElementById("brand-home-link").addEventListener("click",e=>{e.preventDefault(),this.navigateTo("onboarding")}),document.getElementById("header-user-btn").addEventListener("click",()=>{this.navigateTo("profile")}),document.getElementById("header-auth-action-btn").addEventListener("click",()=>{O.isAuthenticated()?this.handleLogout():this.handleOpenLogin()})}handleOpenLogin(){U.openLoginModal({onSuccess:e=>{this.updateUserBadge(),this.refreshAll(),this.navigateTo("wardrobe")},onSwitchToSignup:()=>{setTimeout(()=>this.handleOpenSignup(),260)}})}handleOpenSignup(){U.openSignupModal({onSuccess:e=>{this.updateUserBadge(),this.refreshAll(),this.navigateTo("wardrobe")},onSwitchToLogin:()=>{setTimeout(()=>this.handleOpenLogin(),260)}})}handleLogout(){O.logout(),this.updateUserBadge(),this.refreshAll(),this.navigateTo("onboarding")}handleDemoEnter(){O.loginAsDemo("user_default"),this.updateUserBadge(),this.refreshAll(),this.navigateTo("wardrobe")}navigateTo(e){if(this.currentScreen=e,this.viewport.innerHTML="",this.navBar.querySelectorAll(".nav-item").forEach(t=>{t.classList.toggle("active",t.getAttribute("data-nav")===e)}),e==="onboarding"){const t=Ce({onOpenLogin:()=>this.handleOpenLogin(),onOpenSignup:()=>this.handleOpenSignup(),onGetStarted:()=>this.handleDemoEnter()});this.viewport.appendChild(t)}else if(e==="wardrobe"){const t=Ae({onOpenAddItem:()=>{U.openAddGarment({onSaved:()=>this.refreshCurrentScreen()})},onOpenItemDetail:o=>{U.openGarmentDetail(o,{onUpdated:()=>this.refreshCurrentScreen(),onDeleted:()=>this.refreshCurrentScreen()})},onRefresh:()=>this.refreshCurrentScreen()});this.screenControllers[e]=t,this.viewport.appendChild(t.element)}else if(e==="outfits"){const t=Se({onOpenSwapDrawer:o=>U.openSwapDrawer(o),onNavigateHistory:()=>this.navigateTo("history"),onRefreshAll:()=>this.refreshAll()});this.screenControllers[e]=t,this.viewport.appendChild(t.element)}else if(e==="planner"){const t=Ee({onOpenPlanModal:o=>{U.openSchedulePlan(o,{onScheduled:()=>this.refreshCurrentScreen()})},onRefreshAll:()=>this.refreshAll(),onNavigateHistory:()=>this.navigateTo("history")});this.screenControllers[e]=t,this.viewport.appendChild(t.element)}else if(e==="history"){const t=ke({onOpenManualLog:()=>{U.openManualLog({onLogged:()=>{this.refreshCurrentScreen(),this.refreshAll()}})},onOpenHistoryDetail:o=>{U.openHistoryDetail(o,{onUpdated:()=>this.refreshCurrentScreen(),onDeleted:()=>{this.refreshCurrentScreen(),this.refreshAll()}})},onOpenLeaderboard:()=>U.openLeaderboard()});this.screenControllers[e]=t,this.viewport.appendChild(t.element)}else if(e==="analytics"){const t=Le({onOpenGarmentDetail:o=>{U.openGarmentDetail(o,{onUpdated:()=>this.refreshCurrentScreen(),onDeleted:()=>this.refreshCurrentScreen()})}});this.screenControllers[e]=t,this.viewport.appendChild(t.element)}else if(e==="profile"){const t=_e({onOpenLogin:()=>this.handleOpenLogin(),onOpenSignup:()=>this.handleOpenSignup(),onLogout:()=>this.handleLogout(),onUserSwitched:()=>{this.updateUserBadge(),this.refreshAll(),this.navigateTo("wardrobe")},onRefreshAll:()=>this.refreshAll()});this.screenControllers[e]=t,this.viewport.appendChild(t.element)}this.viewport.scrollTop=0}refreshCurrentScreen(){var e;(e=this.screenControllers[this.currentScreen])!=null&&e.refresh&&this.screenControllers[this.currentScreen].refresh()}refreshAll(){Object.values(this.screenControllers).forEach(e=>{e!=null&&e.refresh&&e.refresh()}),this.updateUserBadge()}}window.deferredPrompt=null;window.addEventListener("beforeinstallprompt",d=>{d.preventDefault(),window.deferredPrompt=d});document.addEventListener("DOMContentLoaded",()=>{window.wardliApp=new Pe});
