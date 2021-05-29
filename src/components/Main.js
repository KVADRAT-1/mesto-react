import React, { useContext } from 'react'
import icon from '../images/edit-icon.svg'
import editIcon from '../images/edit-icon.svg'
import addButton from '../images/add-button.svg'
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function Main(props) {
	const currentUser = useContext(CurrentUserContext)

	return (
		<main className='content'>
			<section className='profile'>
				<div className='profile__avatar-container'>
					<img
						className='profile__avatar-icon'
						onClick={props.onEditAvatar}
						src={icon}
						alt={'Иконка'}
					/>
					<img
						className='profile__avatar'
						onClick={props.onEditAvatar}
						src={`${currentUser.avatar}`}
						alt={currentUser.name}
					/>
				</div>
				<div className='profile__info'>
					<div className='profile__group'>
						<h1 className='profile__name'>{currentUser.name}</h1>
						<button
							className='profile__edit-buttom'
							onClick={props.onEditProfile}
							type='button'
						>
							<img
								className='profile__edit-icon'
								src={editIcon}
								alt={'Редактировать имя'}
							/>
						</button>
					</div>
					<p className='profile__description'>{currentUser.about}</p>
				</div>
				<button
					className='profile__add-button'
					onClick={props.onAddPlace}
					type='button'
				>
					<img className='profile__add-icon' src={addButton} alt={'Крестик'} />
				</button>
			</section>
			<section className='elements'>
				<ul className='elements__list'>
					{props.cards.map(card => (
						<Card
							key={card._id}
							card={card}
							onCardLike={props.onCardLike}
							onCardDelete={props.onCardDelete}
							onCardClick={props.onCardClick}
						/>
					))}
				</ul>
			</section>
		</main>
	)
}

export default Main
