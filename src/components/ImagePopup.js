import React from 'react';

function ImagePopup({ card, onClose }) {
    return (
        <section className={`popup ${card.isOpen && 'popup_opened'}`} id="popup__picture">
            <div className="popup__increase">
                <button id="popup__close-button-picture" className="popup__close-button" onClick={onClose} type="button"></button>
                <img className="popup__photo" src={card.link} alt={card.name}/>
                <p id="popup__text" className="popup__text">{card.name}</p>
            </div>
        </section>
    );
}

export default ImagePopup;