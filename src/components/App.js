import React, { useEffect, useState } from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupConfirmation from './PopupConfirmation'
import EditProfilePopup from './EditProfilePopup'
import ImagePopup from './ImagePopup'
import api from '../utils/api'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'

function App() {
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
	const [selectedCard, setSelectedCard] = useState({ isOpen: false })
	const [currentUser, setCurrentUser] = useState({})
	const [cards, setCards] = useState([])

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true)
	}

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true)
	}

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true)
	}

	function handleCardClick(card) {
		setSelectedCard({ isOpen: true, name: card.name, link: card.link })
	}

	function closeAllPopups() {
		setIsEditAvatarPopupOpen(false)
		setIsEditProfilePopupOpen(false)
		setIsAddPlacePopupOpen(false)
		setSelectedCard({ isOpen: false })
	}

	useEffect(() => {
		api
			.getUserInformation()
			.then(dataUserInformation => {
				setCurrentUser(dataUserInformation)
			})
			.catch(err => {
				console.log('Ошибка при получении данных')
				console.log(err)
			})
	}, [])

	useEffect(() => {
		api
			.getInitialCards()
			.then(dataInitialCards => {
				setCards(dataInitialCards)
			})
			.catch(err => {
				console.log('Ошибка при получении данных')
				console.log(err)
			})
	}, [])

	function handleCardLike(card) {
		const isLiked = card.likes.some(i => i._id === currentUser._id)
		api
			.changeLikeCardStatus(card._id, !isLiked)
			.then(newCard => {
				setCards(state => state.map(c => (c._id === card._id ? newCard : c)))
			})
			.catch(err => {
				console.log('Ошибка при получении данных')
				console.log(err)
			})
	}

	function handleCardDelete(card) {
		api
			.deleteCard(card._id)
			.then(() => {
				setCards(state => state.filter(c => c._id !== card._id))
			})
			.catch(err => {
				console.log('Ошибка при получении данных')
				console.log(err)
			})
	}

	function handleUpdateAvatar(e) {
		api
			.addUserAvatar(e)
			.then(dataAvatar => {
				setCurrentUser(dataAvatar)
				closeAllPopups()
			})
			.catch(err => {
				console.log('Ошибка при получении аватарки')
				console.log(err)
			})
	}

	function handleUpdateUser(newDataUser) {
		api
			.addUserInformation(newDataUser)
			.then(dataUser => {
				setCurrentUser(dataUser)
				closeAllPopups()
			})
			.catch(err => {
				console.log('Ошибка при получении информации о пользователе')
				console.log(err)
			})
	}

	function handleAddPlaceSubmit(data) {
		api
			.getCard(data)
			.then(newCard => {
				setCards([newCard, ...cards])
				closeAllPopups()
			})
			.catch(err => {
				console.log('Ошибка при получении информации о пользователе')
				console.log(err)
			})
	}

	return (
		<div className='App'>
			<div className='page'>
				<CurrentUserContext.Provider value={currentUser}>
					<Header />
					<Main
						cards={cards}
						onEditAvatar={handleEditAvatarClick}
						onEditProfile={handleEditProfileClick}
						onAddPlace={handleAddPlaceClick}
						onCardClick={handleCardClick}
						onCardLike={handleCardLike}
						onCardDelete={handleCardDelete}
					/>
					<Footer />
					<EditAvatarPopup
						isOpen={isEditAvatarPopupOpen}
						onClose={closeAllPopups}
						onUpdateAvatar={handleUpdateAvatar}
					/>
					<EditProfilePopup
						isOpen={isEditProfilePopupOpen}
						onClose={closeAllPopups}
						onUpdateUser={handleUpdateUser}
					/>
					<AddPlacePopup
						isOpen={isAddPlacePopupOpen}
						onClose={closeAllPopups}
						onAddPlace={handleAddPlaceSubmit}
					/>
					<PopupConfirmation />
					<ImagePopup card={selectedCard} onClose={closeAllPopups} />
				</CurrentUserContext.Provider>
			</div>
		</div>
	)
}

export default App
