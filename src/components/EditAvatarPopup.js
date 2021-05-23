import React, { useEffect } from 'react'
import PopupWithForm from './PopupWithForm'
import { TranslationContext } from '../contexts/CurrentUserContext'

function EditAvatarPopup(props) {
	const [avatar, setAvatar] = React.useState({})

	const currentUser = React.useContext(TranslationContext)

	React.useEffect(() => {
		setAvatar(currentUser.avatar)
	}, [currentUser])

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
			children={
				<>
					<div className='popup__section'>
						<input
							id='popup__input_link_avatar'
							className='popup__input popup__input_link_picture'
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
				</>
			}
		/>
	)
}

export default EditAvatarPopup
