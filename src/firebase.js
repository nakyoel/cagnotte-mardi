// ─────────────────────────────────────────────────────────────────────────────
// firebase.js — Configuration Firebase + fonctions de données
//
// 👉 REMPLIS les valeurs ci-dessous avec ta config Firebase
//    (Console Firebase → Paramètres du projet → "Ajouter une app Web")
// ─────────────────────────────────────────────────────────────────────────────

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey:            "REMPLACE_PAR_TON_API_KEY",
  authDomain:        "REMPLACE_PAR_TON_AUTH_DOMAIN",
  projectId:         "REMPLACE_PAR_TON_PROJECT_ID",
  storageBucket:     "REMPLACE_PAR_TON_STORAGE_BUCKET",
  messagingSenderId: "REMPLACE_PAR_TON_MESSAGING_SENDER_ID",
  appId:             "REMPLACE_PAR_TON_APP_ID",
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
