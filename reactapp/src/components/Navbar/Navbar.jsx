import React from 'react'
import { NavLink } from 'react-router-dom';
import './style.css'
import BtnDarkMode from '../btnDarkMode/btnDarkMode';
const Navbar = () => {
	const activeLink = "nav-list__link nav-list__link--active";
	const normaleLink = "nav-list__link";

	return (
		<nav className="nav">
			<div className="container">
				<div className="nav-row" >
					<NavLink to="/" className="logo" style={{ textDecoration: 'none' }}>
						<strong>EmoRateVK</strong> 
					</NavLink>
						<BtnDarkMode/>
					<ul className="nav-list" style = {{listStyle: 'none'}}>
						<li className="nav-list__item">
							<NavLink
								to="/"
								className={({ isActive }) => {
									return isActive ? activeLink : normaleLink;
								}} style={{ textDecoration: 'none' }}
							>
								 <strong>Дом</strong>
							</NavLink>
						</li>
						<li className="nav-list__item">
							<NavLink
								to="/app"
								className={({ isActive }) => {
									return isActive ? activeLink : normaleLink;
								}} style={{ textDecoration: 'none' }}
							>
								 <strong>Сервис</strong>
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;