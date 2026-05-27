// ─────────────────────────────────────────────────────────────────────────────
// firebase.js — Configuration Firebase + fonctions de données
//
// 👉 REMPLIS les valeurs ci-dessous avec ta config Firebase
//    (Console Firebase → Paramètres du projet → "Ajouter une app Web")
// ─────────────────────────────────────────────────────────────────────────────

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBPZMZRbpYowhACSxeK0B8kp9js47UVhuc",
  authDomain: "cagnotte-mardi.firebaseapp.com",
  projectId: "cagnotte-mardi",
  storageBucket: "cagnotte-mardi.firebasestorage.app",
  messagingSenderId: "988716235455",
  appId: "1:988716235455:web:1d1db44626203d5d82e40a",
  measurementId: "G-9FBFZS278W",
};

// ── Initialisation ────────────────────────────────────────────────────────────
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// ── Référence au document principal ──────────────────────────────────────────
const mainRef = () => doc(db, 'cagnotte', 'main');

const DEFAULT_DATA = {
  transactions: [],
  revolut_url: '',
  admin_password: 'Torah1',
};

// ── Chargement initial ────────────────────────────────────────────────────────
export async function loadData() {
  try {
    const snap = await getDoc(mainRef());
    if (snap.exists()) return snap.data();
    // Premier lancement : initialise le document
    await setDoc(mainRef(), DEFAULT_DATA);
    return { ...DEFAULT_DATA };
  } catch (e) {
    console.error('Firebase loadData error:', e);
    return { ...DEFAULT_DATA };
  }
}

// ── Sauvegarde ────────────────────────────────────────────────────────────────
export async function saveData(data) {
  try {
    await setDoc(mainRef(), data);
  } catch (e) {
    console.error('Firebase saveData error:', e);
  }
}

// ── Écoute temps réel ─────────────────────────────────────────────────────────
// Retourne la fonction de désabonnement (à appeler dans le cleanup useEffect)
export function subscribeData(callback) {
  return onSnapshot(mainRef(), (snap) => {
    if (snap.exists()) callback(snap.data());
  }, (err) => {
    console.error('Firebase subscribe error:', err);
  });
}
