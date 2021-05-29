import React, { useState } from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup(props) {
	const [avatar, setAvatar] = useState('')

	function handleSubmit(e) {
		e.preventDefault()
		props.onUpdateAvatar({
			avatar: avatar,
		})
	}

	function avatarChange(e) {
		setAvatar(e.target.value)
	}

	return (
		<PopupWithForm
			title='Обновить аватар'
			name='change-avatar'
			buttonText='Сохранить'
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
		>
			<div className='popup__section'>
				<input
					id='popup__input_link_avatar'
					className='popup__input popup__input_link_picture'
					value={avatar}
					onChange={avatarChange}
					name='popup__input_link_picture'
					type='url'
					placeholder='Ссылка на новый аватар'
					required
				/>
				<span
					id='popup__input_link_avatar-error'
					className='popup__input-error'
				></span>
			</div>
		</PopupWithForm>
	)
}

export default EditAvatarPopup
