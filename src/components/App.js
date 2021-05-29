import { React, useEffect, useState } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
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
import Login from './Login'
import Register from './Register'
import ProtectedRoute from './ProtectedRoute'
import * as auth from '../utils/auth'
import InfoTooltip from './InfoTooltip'

function App() {
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
	const [isInfoTooltip, setIsInfoTooltip] = useState(false)
	const [selectedCard, setSelectedCard] = useState({ isOpen: false })
	const [currentUser, setCurrentUser] = useState({})
	const [goodJob, setGoodJob] = useState(false)
	const [cards, setCards] = useState([])

	const [loggedIn, setloggedIn] = useState({ loggedIn: false })
	const [userData, setUserData] = useState({
		email: '',
		_id: '',
	})

	const history = createBrowserHistory()

	function handlelogin({ email, password }) {
		auth
			.authorization(email, password)
			.then(res => {
				localStorage.setItem('jwt', res.token)
				checkToken()
			})
			.catch(error => infoTooltipOpen(false))
	}

	function checkToken() {
		const jwt = localStorage.getItem('jwt')
		if (jwt) {
			auth
				.tokenValidity(jwt)
				.then(res => {
					const { email, _id } = res.data
					setUserData({
						email: email,
						_id: _id,
					})
					handleEntrance()
				})
				.catch(error => infoTooltipOpen(false))
		}
	}

	function infoTooltipOpen(goodJob) {
		setGoodJob(goodJob)
		handleEditInfoTooltip()
	}

	function handleRegister({ email, password }) {
		auth
			.register(email, password)
			.then(data => {
				history.push('/sign-in')
				infoTooltipOpen(true)
			})
			.catch(error => infoTooltipOpen(false))
	}

	function handleEntrance() {
		setloggedIn({ loggedIn: true })
	}

	function handleLogout() {
		setUserData({
			email: '',
			_id: '',
		})
		setloggedIn({ loggedIn: false })
		localStorage.clear()
	}

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true)
	}

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true)
	}

	function handleEditInfoTooltip() {
		setIsInfoTooltip(true)
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
		setIsInfoTooltip(false)
		setSelectedCard({ isOpen: false })
	}

	useEffect(() => {
		checkToken()
		Promise.all([api.getUserInformation(), api.getInitialCards()])
			.then(([userData, cardsData]) => {
				setCurrentUser(userData)
				setCards(cardsData)
			})
			.catch(error => console.log(error))
	}, [])

	function handleCardLike(card) {
		const isLiked = card.likes.some(i => i._id === currentUser._id)
		api
			.changeLikeCardStatus(card._id, !isLiked)
			.then(newCard => {
				setCards(state => state.map(c => (c._id === card._id ? newCard : c)))
			})
			.catch(error => console.log(error))
	}

	function handleCardDelete(card) {
		api
			.deleteCard(card._id)
			.then(() => {
				setCards(state => state.filter(c => c._id !== card._id))
			})
			.catch(error => console.log(error))
	}

	function handleUpdateAvatar(e) {
		api
			.addUserAvatar(e)
			.then(userData => {
				setCurrentUser(userData)
				closeAllPopups()
			})
			.catch(error => console.log(error))
	}

	function handleUpdateUser(newDataUser) {
		api
			.addUserInformation(newDataUser)
			.then(dataUser => {
				setCurrentUser(dataUser)
				closeAllPopups()
			})
			.catch(error => console.log(error))
	}

	function handleAddPlaceSubmit(data) {
		api
			.addCard(data)
			.then(newCard => {
				setCards([newCard, ...cards])
				closeAllPopups()
			})
			.catch(error => console.log(error))
	}

	return (
		<div className='App'>
			<div className='page'>
				<CurrentUserContext.Provider value={currentUser}>
					<BrowserRouter>
						{!loggedIn.loggedIn ? (
							<Redirect to='/sign-in' />
						) : (
							<Redirect to='/' />
						)}
						<ProtectedRoute
							component={Header}
							userMail={`${userData.email}`}
							text={'Выйти'}
							link={'/sign-in'}
							UserMail={userData.mail}
							loggedIn={loggedIn.loggedIn}
							handleLogout={handleLogout}
						/>
						<ProtectedRoute
							component={Main}
							cards={cards}
							onEditAvatar={handleEditAvatarClick}
							onEditProfile={handleEditProfileClick}
							onAddPlace={handleAddPlaceClick}
							onCardClick={handleCardClick}
							onCardLike={handleCardLike}
							onCardDelete={handleCardDelete}
							loggedIn={loggedIn.loggedIn}
						/>
						<ProtectedRoute component={Footer} loggedIn={loggedIn.loggedIn} />
						<ProtectedRoute
							component={EditAvatarPopup}
							isOpen={isEditAvatarPopupOpen}
							onClose={closeAllPopups}
							onUpdateAvatar={handleUpdateAvatar}
							loggedIn={loggedIn.loggedIn}
						/>
						<ProtectedRoute
							component={EditProfilePopup}
							isOpen={isEditProfilePopupOpen}
							onClose={closeAllPopups}
							onUpdateUser={handleUpdateUser}
							loggedIn={loggedIn.loggedIn}
						/>
						<ProtectedRoute
							component={AddPlacePopup}
							isOpen={isAddPlacePopupOpen}
							onClose={closeAllPopups}
							onAddPlace={handleAddPlaceSubmit}
							loggedIn={loggedIn.loggedIn}
						/>
						<ProtectedRoute
							component={PopupConfirmation}
							loggedIn={loggedIn.loggedIn}
						/>
						<ImagePopup card={selectedCard} onClose={closeAllPopups} />
						<Route exact path='/sign-up'>
							<Header text={'Войти'} link={'/sign-in'} />
							<Register handleRegister={handleRegister} />
						</Route>
						<Route exact path='/sign-in'>
							<Header text={'Регистрация'} link={'/sign-up'} />
							<Login handlelogin={handlelogin} />
						</Route>
						<InfoTooltip
							isOpen={isInfoTooltip}
							onClose={closeAllPopups}
							goodJob={goodJob}
						/>
					</BrowserRouter>
				</CurrentUserContext.Provider>
			</div>
		</div>
	)
}

export default App
