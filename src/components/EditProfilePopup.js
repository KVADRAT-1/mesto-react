import React, { useEffect, useState, useContext } from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')

	const currentUser = useContext(CurrentUserContext)

	useEffect(() => {
		setName(currentUser.name)
		setDescription(currentUser.about)
	}, [currentUser])

	function nameChange(e) {
		setName(e.target.value)
	}

	function descriptionChange(e) {
		setDescription(e.target.value)
	}

	function handleSubmit(e) {
		e.preventDefault()
		props.onUpdateUser({
			name: name,
			about: description,
		})
	}

	return (
		<PopupWithForm
			title='Редактировать профиль'
			name='change-profile'
			buttonText='Сохранить'
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
		>
			<div className='popup__section'>
				<input
					id='popup__input_text_name'
					className='popup__input popup__input_text_name'
					value={name}
					onChange={nameChange}
					name='nameProfile'
					type='text'
					required
					minLength='2'
					maxLength='40'
					placeholder='Имя'
				/>
				<span
					id='popup__input_text_name-error'
					className='popup__input-error'
				></span>
			</div>
			<div className='popup__section'>
				<input
					id='popup__input_text_description'
					className='popup__input popup__input_text_description'
					value={description}
					onChange={descriptionChange}
					name='nameAbout'
					type='text'
					required
					minLength='2'
					maxLength='200'
					placeholder='Описание'
				/>
				<span
					id='popup__input_text_description-error'
					className='popup__input-error'
				></span>
			</div>
		</PopupWithForm>
	)
}

export default EditProfilePopup
