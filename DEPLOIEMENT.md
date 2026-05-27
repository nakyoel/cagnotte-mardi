# 🚀 Guide de déploiement — Cagnotte Cours du Mardi

## Vue d'ensemble

```
Firebase (base de données) ←→ App React ←→ Vercel (hébergement)
```

---

## ÉTAPE 1 — Créer la base de données Firebase (10 min)

### 1.1 Créer le projet
1. Va sur **console.firebase.google.com**
2. Clique **"Ajouter un projet"**
3. Nom : `cagnotte-tiferet` → Continue → Continue → Créer

### 1.2 Activer Firestore
1. Dans le menu gauche : **Build → Firestore Database**
2. Clique **"Créer une base de données"**
3. Choisis **"Commencer en mode test"** → Suivant → Europe-west (ou Paris) → Activer

### 1.3 Récupérer la config
1. Clique l'icône ⚙️ → **Paramètres du projet**
2. Descends jusqu'à **"Tes applications"** → clique **"</>  Web"**
3. Nom : `cagnotte-web` → Enregistrer
4. **Copie les valeurs** du bloc `firebaseConfig` affiché

### 1.4 Remplir src/firebase.js
Ouvre `src/firebase.js` et remplace les valeurs :

```js
const firebaseConfig = {
  apiKey:            "AIzaSy...",        // ← colle ici
  authDomain:        "xxx.firebaseapp.com",
  projectId:         "cagnotte-tiferet",
  storageBucket:     "xxx.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123:web:abc",
};
```

### 1.5 Règles de sécurité Firestore
Dans la console Firebase → Firestore → **Règles**, colle :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /cagnotte/{doc} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```
⚠️ Ces règles sont ouvertes (suffisant pour un groupe fermé de confiance).
Pour plus de sécurité, contacte-moi et on ajoutera une authentification.

---

## ÉTAPE 2 — Tester en local (5 min)

Assure-toi d'avoir **Node.js** installé (node.js.org).

```bash
# Dans le dossier du projet :
npm install
npm run dev
```

Ouvre **http://localhost:5173** — l'app tourne en local avec Firebase réel.

---

## ÉTAPE 3 — Déployer sur Vercel (5 min)

### Option A — Via GitHub (recommandé)
1. Crée un repo GitHub : github.com → New repository → `cagnotte-mardi`
2. Dans le dossier du projet :
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TON_USERNAME/cagnotte-mardi.git
git push -u origin main
```
3. Va sur **vercel.com** → "Add New Project" → importe ton repo GitHub
4. Clique **Deploy** — c'est tout !

### Option B — Via CLI
```bash
npm install -g vercel
npm run build
vercel --prod
```

Vercel te donne une URL du type : **`cagnotte-mardi.vercel.app`** 🎉

---

## ÉTAPE 4 — Partager l'app

Une fois déployée, tu peux :
- **Partager le lien** directement : `https://cagnotte-mardi.vercel.app`
- **Générer un QR code** du lien sur qr-code-generator.com
- **L'afficher en grand** sur un écran pendant le cours

---

## Résumé des coûts

| Service | Plan | Coût |
|---------|------|------|
| Firebase Firestore | Spark (gratuit) | 0€ |
| Vercel | Hobby (gratuit) | 0€ |
| **Total** | | **0€** |

Le plan gratuit Firebase supporte 50 000 lectures/jour et 20 000 écritures/jour
— largement suffisant pour un groupe de fidèles hebdomadaire.

---

## En cas de problème

Contacte-moi et partage le message d'erreur exact.
