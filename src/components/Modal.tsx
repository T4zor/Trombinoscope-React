import { Eleve } from '../types';

interface ModalProps {
    eleve: Eleve | null;
    onClose: () => void;
}

export default function Modal({ eleve, onClose }: ModalProps) {
    if (!eleve) return null;

    const imageSrc = eleve.imageUrl ? eleve.imageUrl : "https://via.placeholder.com/150";

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>&times;</button>
                <div className="modal-body">
                    <img src={imageSrc} alt={`Photo de ${eleve.prenom}`} className="modal-body-img" />
                    <h2>{eleve.prenom} {eleve.nom}</h2>
                    <span className="age" style={{ display: 'block', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                        {eleve.age} ans
                    </span>
                    <div className="description">{eleve.description}</div>
                </div>
            </div>
        </div>
    );
}
