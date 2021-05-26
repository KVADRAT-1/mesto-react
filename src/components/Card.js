import React, { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function Card(card) {
	const currentUser = useContext(CurrentUserContext)
	const isOwn = card.owner._id === currentUser._id
	const isLiked = card.likes.some(i => i._id === currentUser._id)
	const cardDeleteButtonClassName = `elements__trash-button ${
		isOwn ? 'elements__trash-button_visible' : 'elements__trash-button_hidden'
	}`
	const cardLikeButtonClassName = `elements__like ${
		isLiked ? 'elements__like_active' : ''
	}`

	function handleDeleteClick() {
		card.onCardDelete({
			likes: card.likes,
			_id: card._id,
		})
	}

	function handlePhotoClick() {
		card.onCardClick({
			name: card.name,
			link: card.link,
		})
	}

	function handleLikeClick() {
		card.onCardLike({
			likes: card.likes,
			_id: card._id,
		})
	}

	return (
		<li className='elements__item'>
			<button
				className={cardDeleteButtonClassName}
				onClick={handleDeleteClick}
				type='button'
			></button>
			<img
				className='elements__photo'
				onClick={handlePhotoClick}
				src={card.link}
				alt={card.name}
			/>
			<div className='elements__group'>
				<h2 className='elements__text'>{card.name}</h2>
				<div className='elements__likes'>
					<button
						className={cardLikeButtonClassName}
						onClick={handleLikeClick}
						type='button'
					></button>
					<div className='elements__like-quantity'>{card.likes.length}</div>
				</div>
			</div>
		</li>
	)
}

export default Card
