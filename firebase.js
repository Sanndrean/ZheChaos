// Firebase config lives here. See README.md to connect your own Realtime Database.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js';

export const firebaseConfig = {
  apiKey: 'AIzaSyA_8eMyCMDuxeklliWzOlsX9hZntYeRK00',
  authDomain: 'zhechaos-63c71.firebaseapp.com',
  databaseURL: 'https://zhechaos-63c71-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'zhechaos-63c71',
  storageBucket: 'zhechaos-63c71.firebasestorage.app',
  messagingSenderId: '865331153726',
  appId: '1:865331153726:web:3de74ac9d6f9d01daa7a6f'
};

export function getFirebaseConfigError() {
  const required = ['apiKey','authDomain','databaseURL','projectId','appId'];
  if (required.some(key => !firebaseConfig[key] || /PASTE_|YOUR.?FIREBASE|<|>/i.test(firebaseConfig[key]))) {
    return 'Konfigurasi Firebase belum lengkap. Isi semua nilai di firebase.js.';
  }
  try {
    const url = new URL(firebaseConfig.databaseURL);
    if (url.protocol !== 'https:' || !/(firebaseio\.com|firebasedatabase\.app)$/i.test(url.hostname)) throw new Error();
  } catch {
    return 'databaseURL tidak valid. Salin URL persis dari Realtime Database → Data.';
  }
  return '';
}
export const firebaseConfigured = !getFirebaseConfigError();
let app, auth, db;

export async function connectFirebase() {
  if (!firebaseConfigured) throw new Error(getFirebaseConfigError());
  app ??= initializeApp(firebaseConfig);
  auth ??= getAuth(app);
  db ??= getDatabase(app);
  if (!auth.currentUser) await signInAnonymously(auth);
  // Firebase Auth persistence can be shared across tabs. Keep a per-tab player id,
  // and detect a duplicated tab that copied sessionStorage before it joins a room.
  let uid;
  try {
    uid = sessionStorage.getItem('zhechaos-player-id');
    if (!uid) uid = crypto.randomUUID();
    if (uid && typeof BroadcastChannel === 'function') {
      const channel = new BroadcastChannel('zhechaos-active-player-ids');
      const requestId = crypto.randomUUID();
      let collision = false;
      channel.onmessage = ({ data }) => {
        if (data?.type === 'probe' && data.uid === uid) channel.postMessage({ type: 'present', uid, requestId: data.requestId });
        if (data?.type === 'present' && data.uid === uid && data.requestId === requestId) collision = true;
      };
      channel.postMessage({ type: 'probe', uid, requestId });
      await new Promise(resolve => setTimeout(resolve, 90));
      channel.close();
      if (collision) uid = crypto.randomUUID();
    }
    sessionStorage.setItem('zhechaos-player-id', uid);
  } catch { uid = crypto.randomUUID(); }
  return { db, auth, uid, authUid: auth.currentUser.uid };
}
