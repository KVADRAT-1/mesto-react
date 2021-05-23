import React from 'react'
import { TranslationContext } from '../contexts/CurrentUserContext.js'

function Card(props) {
	const currentUser = React.useContext(TranslationContext)
	const isOwn = props.owner._id === currentUser._id
	const isLiked = props.likes.some(i => i._id === currentUser._id)
	const cardDeleteButtonClassName = `elements__trash-button ${
		isOwn ? 'elements__trash-button_visible' : 'elements__trash-button_hidden'
	}`
	const cardLikeButtonClassName = `elements__like ${
		isLiked ? 'elements__like_active' : ''
	}`

	function handleLikeClick() {
		props.onCardLike(props)
	}

	function handleDeleteClick() {
		props.onCardDelete(props)
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
				onClick={() => {
					props.onCardClick(props)
				}}
				src={props.link}
				alt={props.name}
			/>
			<div className='elements__group'>
				<h2 className='elements__text'>{props.name}</h2>
				<div className='elements__likes'>
					<button
						className={cardLikeButtonClassName}
						onClick={handleLikeClick}
						type='button'
					></button>
					<div className='elements__like-quantity'>{props.likes.length}</div>
				</div>
			</div>
		</li>
	)
}

export default Card
