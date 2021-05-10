import React from 'react';

function Card({ name, link, likes, onCardClick }) {

    return (
        <li className="elements__item">
            <button className="elements__trash-button" type="button"></button>
            <img className="elements__photo" onClick={() => {onCardClick({name, link})}} src={link} alt={name}/>
            <div className="elements__group">
                <h2 className="elements__text">{name}</h2>
                <div className="elements__likes">
                <button className="elements__like" type="button"></button>
                <div className="elements__like-quantity">{likes.length}</div>
                </div>
            </div>
        </li>
    );
}

export default Card;