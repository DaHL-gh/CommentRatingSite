import './style.css';
import { motion } from "framer-motion";
const Header = () => {
	return (
		<header className="header">
			<div className="header__wrapper">
				<h1 className="header__title">
					<strong>
                    Welcome to our <em>site!</em>
					</strong>
					<br />Emotional assessment of posts from VK
				</h1>
				<div className="header__text">
				</div>
                {/* <div class="arrow animated"></div> */}
				<a href="#!" className="btn" style={{ textDecoration: 'none' }}>
					Link to API
				</a>
			</div>
		</header>
	);
};

export default Header;
