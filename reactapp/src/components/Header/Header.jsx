import "./style.css";
import { motion } from "framer-motion";
import ParticlesComponent from "../Particles/particles";
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
						Добро пожаловать на <em>сайт!</em>
					</strong>
					<br />
					Эмоциональная оценка постов из ВК
					{/* <ParticlesComponent id='particles'/> */}
				</h1>
				<div className="header__text"></div>
				<a href="https://github.com/DaHL-gh/CommentRatingSite" className="btn" style={{ textDecoration: "none" }} target="_blank">
					Ссылка на API
				</a>
				<ParticlesComponent id='particles'/>
			</div>
		</motion.header>
	);
};

export default Header;
