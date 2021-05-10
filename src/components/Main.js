import React, { useEffect } from 'react';
import icon from '../images/edit-icon.svg';
import editIcon from '../images/edit-icon.svg';
import addButton from '../images/add-button.svg';
import api from '../utils/api';
import Card from './Card';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
    const [userAvatar, setUserAvatar] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [cards, setCards] = React.useState([]);

    useEffect(() => {
        Promise.all([api.getUserInformation(), api.getInitialCards()])
            .then(([dataUserInformation, dataInitialCards]) => {
                setUserAvatar(dataUserInformation.avatar);
                setUserName(dataUserInformation.name);
                setUserDescription(dataUserInformation.about);
                setCards(dataInitialCards);
            })
            .catch((err) => {
                console.log("Ошибка при получении данных");
                console.log(err);
            });
    }, [])

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img className="profile__avatar-icon" onClick={onEditAvatar} src={icon} alt={"Иконка"}/>
                    <img className="profile__avatar" onClick={onEditAvatar} src={`${userAvatar}`} alt={userName}/>
                </div>
                <div className="profile__info">
                    <div className="profile__group">
                    <h1 className="profile__name">{userName}</h1>
                    <button className="profile__edit-buttom" onClick={onEditProfile} type="button"><img className="profile__edit-icon" src={editIcon} alt={"Редактировать имя"}/></button>
                    </div>
                    <p className="profile__description">{userDescription}</p>
                </div> 
                <button className="profile__add-button" onClick={onAddPlace } type="button"><img className="profile__add-icon" src={addButton} alt={"Крестик"}/></button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map(({ _id, ...card }) => <Card key={_id} {...card} onCardClick={onCardClick} />)}
                </ul>
            </section>
        </main>
    );
}

export default Main;