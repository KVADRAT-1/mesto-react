import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({isOpen:false});

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard({isOpen: true, name: card.name, link: card.link})
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({isOpen: false});
    }

  return (
    <div className='App'>
      <div className='page'>
        <Header />
        <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} />
        <Footer />
        <PopupWithForm title='Обновить аватар' name='change-avatar' buttonText='Сохранить' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} children={
            <>
                <div className="popup__section">
                    <input id="popup__input_link_avatar" className="popup__input popup__input_link_picture" name="popup__input_link_picture" type="url" placeholder="Ссылка на новый аватар" required/>
                    <span id="popup__input_link_avatar-error" className="popup__input-error"></span>
                </div>
            </>
        }/>
        <PopupWithForm title='Редактировать профиль' name='change-profile' buttonText='Сохранить' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} children={
            <>
                <div className="popup__section">
                    <input id="popup__input_text_name" className="popup__input popup__input_text_name" name="nameProfile" type="text" required minLength="2" maxLength="40" placeholder="Имя"/>
                    <span id="popup__input_text_name-error" className="popup__input-error"></span>
                </div>
                <div className="popup__section">
                    <input id="popup__input_text_description" className="popup__input popup__input_text_description" name="nameAbout" type="text" required minLength="2" maxLength="200" placeholder="Описание"/>
                    <span id="popup__input_text_description-error" className="popup__input-error"></span>
                </div>
            </>
        }/>
        <PopupWithForm title='Новое место' name='addition-picture' buttonText='Сохранить' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} children={
            <>
                <div className="popup__section">
                    <input id="popup__input_name_picture" className="popup__input popup__input_name_picture" name="namePicture" type="text" placeholder="Название" required minLength="2" maxLength="30"/>
                    <span id="popup__input_name_picture-error" className="popup__input-error"></span>
                </div>
                <div className="popup__section">
                    <input id="popup__input_link_picture" className="popup__input popup__input_link_picture" name="nameLink" type="url" placeholder="Ссылка на картинку" required/>
                    <span id="popup__input_link_picture-error" className="popup__input-error"></span>
                </div>
            </>
        }/>
        <PopupWithForm title='Вы уверены ?' name='delete-picture' buttonText='Да' />
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      </div>
    </div>
  );
}

export default App;
