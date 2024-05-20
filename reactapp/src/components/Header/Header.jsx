import "./style.css";
import { motion } from "framer-motion";
const Header = () => {
	return (
		<motion.header
			className="header"
			intial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, transition: { duration: 0.2 } }}
		>
			<div className="header__wrapper">
				<h1 className="header__title">
					<strong>
						Welcome to our <em>site!</em>
					</strong>
					<br />
					Emotional assessment of posts from VK
				</h1>
				<div className="header__text"></div>
				{/* <div class="arrow animated"></div> */}
				<a href="https://github.com/DaHL-gh/CommentRatingSite" className="btn" style={{ textDecoration: "none" }} target="_blank">
					Link to API
				</a>
			</div>
		</motion.header>
	);
};

export default Header;
