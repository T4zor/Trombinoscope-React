import { Eleve } from '../types';

interface PublicViewProps {
    eleves: Eleve[];
    onEleveClick: (eleve: Eleve) => void;
}

export default function PublicView({ eleves, onEleveClick }: PublicViewProps) {
    return (
        <section className="view-section">
            <div className="grid-container">
                {eleves.length === 0 ? (
                    <p className='empty-message'>Aucun élève enregistré.</p>
                ) : (
                    eleves.map((eleve) => {
                        const imageSrc = eleve.imageUrl ? eleve.imageUrl : "https://via.placeholder.com/150";
                        return (
                            <div 
                                key={eleve.id} 
                                className="card" 
                                style={{ cursor: 'pointer' }}
                                onClick={() => onEleveClick(eleve)}
                            >
                                <div className="card-image">
                                    <img src={imageSrc} alt={`Photo de ${eleve.prenom}`} />
                                </div>
                                <div className="card-content">
                                    <h2>{eleve.prenom} {eleve.nom}</h2>
                                    <span className="age">{eleve.age} ans</span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </section>
    );
}
