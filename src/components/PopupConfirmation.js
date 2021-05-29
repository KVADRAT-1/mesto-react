import React from 'react'
import PopupWithForm from './PopupWithForm'

function PopupConfirmation() {
	return (
		<PopupWithForm title='Вы уверены ?' name='delete-picture' buttonText='Да' />
	)
}

export default PopupConfirmation
