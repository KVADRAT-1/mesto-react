import { React, useState } from 'react'
import Authorization from './Authorization'

function Register({ handleRegister }) {
	const [data, setData] = useState({
		email: '',
		password: '',
		message: '',
	})

	function handleChange(e) {
		const { name, value } = e.target
		setData({
			...data,
			[name]: value,
		})
	}

	function handleSubmit(e) {
		e.preventDefault()
		let { email, password } = data
		handleRegister({ email, password })
	}

	return (
		<Authorization
			title='Регистрация'
			name='register'
			buttonText='Зарегистрироваться'
			onSubmit={handleSubmit}
		>
			<div className='authorization__section'>
				<input
					className='authorization__input'
					name='email'
					type='email'
					required
					minLength='2'
					maxLength='40'
					placeholder='Email'
					value={data.email}
					onChange={handleChange}
				/>
				<span
					id='popup__input_text_name-error'
					className='popup__input-error'
				></span>
			</div>
			<div className='authorization__section'>
				<input
					className='authorization__input'
					name='password'
					type='password'
					required
					minLength='2'
					maxLength='200'
					placeholder='Пароль'
					value={data.password}
					onChange={handleChange}
				/>
				<span
					id='popup__input_text_description-error'
					className='popup__input-error'
				></span>
			</div>
		</Authorization>
	)
}

export default Register
