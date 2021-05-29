import React, { useState } from 'react'
import Authorization from './Authorization'

function Login({ handlelogin }) {
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
		handlelogin({ email, password })
	}

	return (
		<Authorization
			title='Вход'
			name='login'
			buttonText='Войти'
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

export default Login
