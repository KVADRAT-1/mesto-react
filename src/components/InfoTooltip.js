import React from 'react'

function InfoTooltip({ isOpen, onClose, goodJob }) {
	return (
		<section className={`popup ${isOpen && 'popup_opened'}`}>
			<div className='popup__container'>
				<button
					className={`popup__close-button popup__close-button-InfoTooltip`}
					onClick={onClose}
					type='button'
				></button>
				<div
					className={`popup__image ${
						goodJob ? 'popup__image_goodJob' : 'popup__image_badJob'
					}`}
				></div>
				<button
					className={`popup__submit-button popup__submit-button-InfoTooltip`}
					type='button'
					onClick={onClose}
				>
					{goodJob
						? 'Вы успешно зарегистрировались!'
						: 'Что-то пошло не так! Попробуйте ещё раз.'}
				</button>
			</div>
		</section>
	)
}

export default InfoTooltip
