import React, { useEffect } from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import EditProfilePopup from './EditProfilePopup'
import ImagePopup from './ImagePopup'
import api from '../utils/api'
import { TranslationContext } from '../contexts/CurrentUserContext.js'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'

function App() {
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
		React.useState(false)
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
		React.useState(false)
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
	const [selectedCard, setSelectedCard] = React.useState({ isOpen: false })
	const [currentUser, setCurrentUser] = React.useState([])
	const [cards, setCards] = React.useState([])

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
		if (!isLiked) {
			api
				.addLike(card._id)
				.then(newCard => {
					setCards(state => state.map(c => (c._id === card._id ? newCard : c)))
				})
				.catch(err => {
					console.log('Ошибка при получении данных')
					console.log(err)
				})
		} else {
			api
				.deleteLike(card._id)
				.then(newCard => {
					setCards(state => state.map(c => (c._id === card._id ? newCard : c)))
				})
				.catch(err => {
					console.log('Ошибка при получении данных')
					console.log(err)
				})
		}
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
			})
			.catch(err => {
				console.log('Ошибка при получении аватарки')
				console.log(err)
			})
		closeAllPopups()
	}

	function handleUpdateUser(newDataUser) {
		api
			.addUserInformation(newDataUser)
			.then(dataUser => {
				setCurrentUser(dataUser)
			})
			.catch(err => {
				console.log('Ошибка при получении информации о пользователе')
				console.log(err)
			})
		closeAllPopups()
	}

	function handleAddPlaceSubmit(data) {
		api
			.getCard(data)
			.then(newCard => {
				setCards([newCard, ...cards])
			})
			.catch(err => {
				console.log('Ошибка при получении информации о пользователе')
				console.log(err)
			})
		closeAllPopups()
	}

	return (
		<div className='App'>
			<div className='page'>
				<TranslationContext.Provider value={currentUser}>
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
					<PopupWithForm
						title='Вы уверены ?'
						name='delete-picture'
						buttonText='Да'
					/>
					<ImagePopup card={selectedCard} onClose={closeAllPopups} />
				</TranslationContext.Provider>
			</div>
		</div>
	)
}

export default App
