import React from 'react'
import Logo from '../../../assets/Logo.png'
import './Header.css'

const Header = () => {
    return (
        <div className='login-header'>
            <img src={Logo} alt="neofantasy" />
            <h3 className='neo-fan'>NEOFANTASY</h3>
        </div>
    )
}

export default Header