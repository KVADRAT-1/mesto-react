import { Link } from 'react-router-dom'

function Authorization({ title, name, buttonText, onSubmit, children }) {
	return (
		<div className='authorization'>
			<h2 className='authorization__heading'>{title}</h2>
			<form
				className={`form  authorization__form-${name}`}
				name={`authorization__form-${name}`}
				onSubmit={onSubmit}
				noValidate
			>
				<fieldset className='authorization__form-set popup__form-set'>
					{children}
					<button
						className={`authorization__submit-button authorization__submit-button-${name}`}
						type='submit'
					>
						{buttonText}
					</button>
				</fieldset>
			</form>
			{name === 'register' ? (
				<Link className='link' to='/sign-in'>
					Уже зарегистрированы? Войти
				</Link>
			) : (
				<></>
			)}
		</div>
	)
}

export default Authorization
