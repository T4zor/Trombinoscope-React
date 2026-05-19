import { useState, useRef } from 'react';
import { Eleve } from '../types';

interface AdminViewProps {
    eleves: Eleve[];
    onAddOrUpdate: (eleve: Eleve) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

export default function AdminView({ eleves, onAddOrUpdate, onDelete }: AdminViewProps) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [age, setAge] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    const resetForm = () => {
        setEditingId(null);
        setPrenom('');
        setNom('');
        setAge('');
        setDescription('');
        setImageUrl('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleEdit = (eleve: Eleve) => {
        setEditingId(eleve.id || null);
        setPrenom(eleve.prenom);
        setNom(eleve.nom);
        setAge(eleve.age.toString());
        setDescription(eleve.description);
        setImageUrl(eleve.imageUrl);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: number | undefined) => {
        if (!id) return;
        if (window.confirm("Voulez-vous vraiment supprimer cet élève ?")) {
            await onDelete(id);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        let finalImageUrl = imageUrl;
        if (fileInputRef.current?.files && fileInputRef.current.files[0]) {
            const file = fileInputRef.current.files[0];
            finalImageUrl = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = () => reject("Erreur de lecture de l'image");
                reader.readAsDataURL(file);
            });
        }

        const eleveData: Eleve = {
            prenom,
            nom,
            age: parseInt(age, 10),
            description,
            imageUrl: finalImageUrl
        };

        if (editingId !== null) {
            eleveData.id = editingId;
        }

        try {
            await onAddOrUpdate(eleveData);
            resetForm();
        } catch (error) {
            console.error(error);
            alert("Erreur lors de l'enregistrement.");
        }
    };

    return (
        <section className="view-section">
            <div className="admin-container">
                <aside className="sidebar glass-panel">
                    <h2>{editingId ? "Modifier l'élève" : "Ajouter un élève"}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="prenom">Prénom</label>
                            <input type="text" id="prenom" required placeholder="Ex: Jean" value={prenom} onChange={e => setPrenom(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nom">Nom</label>
                            <input type="text" id="nom" required placeholder="Ex: Dupont" value={nom} onChange={e => setNom(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Âge</label>
                            <input type="number" id="age" required placeholder="Ex: 21" min="10" max="100" value={age} onChange={e => setAge(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="imageFile">Photo (fichier local, optionnel)</label>
                            <input type="file" id="imageFile" accept="image/*" ref={fileInputRef} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Petite description</label>
                            <textarea id="description" required placeholder="Passionné de code..." value={description} onChange={e => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn-primary">
                                {editingId ? "Sauvegarder" : "Ajouter"}
                            </button>
                            {editingId && (
                                <button type="button" className="btn-secondary" onClick={resetForm}>
                                    Annuler
                                </button>
                            )}
                        </div>
                    </form>
                </aside>

                <div className="admin-list glass-panel">
                    <h2>Liste des élèves</h2>
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Photo</th>
                                    <th>Prénom Nom</th>
                                    <th>Âge</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eleves.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} style={{ textAlign: 'center' }}>Aucun élève enregistré.</td>
                                    </tr>
                                ) : (
                                    eleves.map(eleve => (
                                        <tr key={eleve.id}>
                                            <td>
                                                <img src={eleve.imageUrl || "https://via.placeholder.com/50"} className="table-img" alt="Photo" />
                                            </td>
                                            <td>{eleve.prenom} {eleve.nom}</td>
                                            <td>{eleve.age}</td>
                                            <td>
                                                <button className="action-btn btn-edit" onClick={() => handleEdit(eleve)}>Modifier</button>
                                                <button className="action-btn btn-delete" onClick={() => handleDelete(eleve.id)}>Supprimer</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}
