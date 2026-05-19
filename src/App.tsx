import { useState, useEffect } from 'react';
import { Eleve } from './types';
import { getElevesDB, ajouterEleveDB, modifierEleveDB, supprimerEleveDB } from './db/indexedDB';
import PublicView from './components/PublicView';
import AdminView from './components/AdminView';
import Modal from './components/Modal';
import './index.css';

function App() {
    const [view, setView] = useState<'public' | 'admin'>('public');
    const [eleves, setEleves] = useState<Eleve[]>([]);
    const [selectedEleve, setSelectedEleve] = useState<Eleve | null>(null);

    const loadEleves = async () => {
        try {
            const data = await getElevesDB();
            setEleves(data);
        } catch (error) {
            console.error(error);
            alert("Erreur lors du chargement des élèves.");
        }
    };

    useEffect(() => {
        loadEleves();
    }, []);

    const handleAddOrUpdate = async (eleve: Eleve) => {
        if (eleve.id) {
            await modifierEleveDB(eleve);
        } else {
            await ajouterEleveDB(eleve);
        }
        await loadEleves();
    };

    const handleDelete = async (id: number) => {
        await supprimerEleveDB(id);
        await loadEleves();
    };

    return (
        <>
            <div className="background-shapes"></div>
            <header>
                <h1>Trombinoscope <span>Student</span></h1>
                <p>L'annuaire de la classe, propulsé par React, TypeScript & IndexedDB</p>
                
                <nav className="main-nav">
                    <button 
                        className={`nav-btn ${view === 'public' ? 'active' : ''}`}
                        onClick={() => setView('public')}
                    >
                        Vue Publique
                    </button>
                    <button 
                        className={`nav-btn ${view === 'admin' ? 'active' : ''}`}
                        onClick={() => setView('admin')}
                    >
                        Administration
                    </button>
                </nav>
            </header>

            <main className="container">
                {view === 'public' ? (
                    <PublicView eleves={eleves} onEleveClick={setSelectedEleve} />
                ) : (
                    <AdminView eleves={eleves} onAddOrUpdate={handleAddOrUpdate} onDelete={handleDelete} />
                )}
            </main>

            <Modal eleve={selectedEleve} onClose={() => setSelectedEleve(null)} />
        </>
    );
}

export default App;
