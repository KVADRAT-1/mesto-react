import React, { useState } from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {
	const [name, setName] = useState('')
	const [link, setLink] = useState('')

	function nameChange(e) {
		setName(e.target.value)
	}

	function linkChange(e) {
		setLink(e.target.value)
	}

	function handleSubmit(e) {
		e.preventDefault()
		props.onAddPlace({
			name: name,
			link: link,
		})
	}

	return (
		<PopupWithForm
			title='Новое место'
			name='addition-picture'
			buttonText='Сохранить'
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
			children={
				<>
					<div className='popup__section'>
						<input
							id='popup__input_name_picture'
							className='popup__input popup__input_name_picture'
							onChange={nameChange}
							name='namePicture'
							type='text'
							placeholder='Название'
							required
							minLength='2'
							maxLength='30'
						/>
						<span
							id='popup__input_name_picture-error'
							className='popup__input-error'
						></span>
					</div>
					<div className='popup__section'>
						<input
							id='popup__input_link_picture'
							className='popup__input popup__input_link_picture'
							onChange={linkChange}
							name='nameLink'
							type='url'
							placeholder='Ссылка на картинку'
							required
						/>
						<span
							id='popup__input_link_picture-error'
							className='popup__input-error'
						></span>
					</div>
				</>
			}
		/>
	)
}

export default AddPlacePopup
