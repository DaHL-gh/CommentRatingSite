import "./style.css";
import vk from './../../icons/vk.svg'
import gitHub from './../../icons/gitHub.svg'
import telegram from './../../icons/svg-edited.svg'

const Footer = () => {
	return (
		<footer className="footer">
			<div className="container">
				<div className="footer__wrapper">
					<ul className="social">
						<li className="social__item" style = {{listStyle: 'none'}}>
							<a href="https://vk.com/irit_rtf_urfu" target="_blank">
								<img src={vk} alt="Link" />
							</a>
						</li>
						<li className="social__item" style = {{listStyle: 'none'}}>
							<a href="https://github.com/razumm56/emoratevk" target="_blank">
								<img src={gitHub} alt="Link" />
							</a>
						</li>
						<li className="social__item" style = {{listStyle: 'none'}}>
							<a href="https://telegram.me/Iritatoday" target="_blank">
								<img src={telegram} alt="Link" />
							</a>
						</li>
					</ul>
					<div className="copyright">
						<p>© 2024 Created by Elephants Xetren</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
