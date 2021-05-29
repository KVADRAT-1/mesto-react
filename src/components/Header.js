import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/header-logo.svg'

function Header(props) {
	function handleLogout() {
		if (props.text === 'Выйти') {
			props.handleLogout()
		}
	}

	return (
		<header className='header'>
			<img className='header__logo' src={logo} alt={'logo'} />
			{props.text === 'Выйти' ? (
				<p className='header__mail'>{props.userMail}</p>
			) : (
				<></>
			)}

			<Link
				className='link header__link'
				to={props.link}
				onClick={handleLogout}
			>
				{props.text}
			</Link>
		</header>
	)
}

export default Header
