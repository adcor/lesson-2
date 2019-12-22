import React from 'react';
import { connect } from 'react-redux';

import {Link} from 'react-router-dom' 

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { ReactComponent as Logo} from '../../assets/crown.svg'


import './header.styles.scss';

const Header = ({ currentUser, hidden }) => (
    <div className='header'>
        <Link className='logo-container' to="/">
            <Logo/>
        </Link>
    
        <div className='options'>
            <Link className='option' to="Shop">
                SHOP
            </Link> 
            
            <Link>
                CONTACT
            </Link>  

            {
                currentUser ? (
                <div className='option' onClick={() => auth.signOut()}> SIGN OUT </div>
                ) : (
                <Link className='option' to='./signin'>SIGN IN</Link>
                ) }

            <CartIcon/>
        </div>
        {
            hidden ? null : 
            <CartDropdown />

        }
    </div>
)

const mapStateToProps = ({user: { currentUser }, cart: { hidden } } ) => ({
    currentUser,
    hidden
});

export default connect(mapStateToProps)(Header);