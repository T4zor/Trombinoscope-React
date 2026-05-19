# Trombinoscope React

Une application web de trombinoscope (annuaire de classe) construite avec **React**, **TypeScript** et propulsée par **Vite**. Les données (profils des élèves et photos) sont stockées localement de manière persistante grâce à **IndexedDB**.

## 🚀 Fonctionnalités

- **Architecture SPA (Single Page Application)** avec React.
- **Vue Publique** : Affichage de tous les élèves sous forme de cartes élégantes (Glassmorphism).
- **Vue Administration (CRUD)** :
  - Ajouter un nouvel élève (avec photo locale optionnelle).
  - Modifier un profil existant.
  - Supprimer un élève.
- **Stockage Local** : Toutes les données sont sauvegardées dans le navigateur (IndexedDB), aucune base de données externe n'est requise.
- **Design Moderne** : Animations subtiles, thème sombre, et interface en verre (Glassmorphism) codés en pur CSS.

## 🛠️ Technologies Utilisées

- [React](https://reactjs.org/) (v18)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) (via l'API native du navigateur)
- HTML5 / CSS3 Vanilla

## 📦 Installation et Lancement

1. **Cloner le projet** :
   ```bash
   git clone https://github.com/T4zor/Trombinoscope-React.git
   cd TrombinoscopeTypesReact
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement local** :
   ```bash
   npm run dev
   ```
   L'application sera accessible (généralement) sur `http://localhost:5173`.

## 🏗️ Structure du Projet

```text
src/
├── components/
│   ├── AdminView.tsx     # Formulaire et tableau d'administration
│   ├── Modal.tsx         # Fenêtre modale des détails d'un élève
│   └── PublicView.tsx    # Grille d'affichage publique
├── db/
│   └── indexedDB.ts      # Logique de la base de données (Create, Read, Update, Delete)
├── App.tsx               # Composant racine, gère la navigation et l'état
├── main.tsx              # Point d'entrée React
├── index.css             # Fichier de styles global (Glassmorphism)
└── types.ts              # Définition des interfaces TypeScript (Eleve)
```
