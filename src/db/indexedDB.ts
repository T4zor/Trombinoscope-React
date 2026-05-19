import { Eleve } from '../types';

const DB_NAME = "TrombinoscopeDB";
const STORE_NAME = "eleves";

export function initDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
            }
        };
        request.onsuccess = (event) => resolve((event.target as IDBOpenDBRequest).result);
        request.onerror = () => reject("Erreur d'ouverture de IndexedDB");
    });
}

// CREATE
export async function ajouterEleveDB(eleve: Eleve): Promise<void> {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const request = transaction.objectStore(STORE_NAME).add(eleve);
        request.onsuccess = () => resolve();
        request.onerror = () => reject("Erreur lors de l'ajout");
    });
}

// UPDATE
export async function modifierEleveDB(eleve: Eleve): Promise<void> {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const request = transaction.objectStore(STORE_NAME).put(eleve);
        request.onsuccess = () => resolve();
        request.onerror = () => reject("Erreur lors de la modification");
    });
}

// DELETE
export async function supprimerEleveDB(id: number): Promise<void> {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const request = transaction.objectStore(STORE_NAME).delete(id);
        request.onsuccess = () => resolve();
        request.onerror = () => reject("Erreur lors de la suppression");
    });
}

// READ
export async function getElevesDB(): Promise<Eleve[]> {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readonly");
        const request = transaction.objectStore(STORE_NAME).getAll();
        request.onsuccess = () => resolve(request.result as Eleve[]);
        request.onerror = () => reject("Erreur de récupération");
    });
}
