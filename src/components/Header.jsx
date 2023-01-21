import AsideMenu from './AsideMenu';
import useModals from '../context/ModalContext';
import {useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import useConf from '../context/ConfContext';
import styles from '../styles/Header.module.css';

const Header = () => {

	const {setModal,setListModal} = useModals(),

	menuRef = useRef(),

	nav = useNavigate(),

	{conf} = useConf(),

	handlerClick = () => {

		if(window.location.hash == "" || window.location.hash == "#/") setModal(true);

	},

	handlerMenu = ({target}) => {

		if(target.matches('div') || target.matches('i')) {

			menuRef.current.classList.toggle('hidden')
			menuRef.current.classList.toggle('visible')

		}

	}

	return(

		<header className={`${styles.header} ${conf.theme}`}>

			<h1 className={styles.titleApp} to="/" onClick={()=>nav("/")}>React Notes</h1>

			<section className={styles.options}>

				<i className={`${styles.headerIcons} bi-clipboard-check fs-1`} onClick={() => setListModal(true)}></i>

				<i className={`${styles.headerIcons} bi-pencil-square fs-1`} onClick={handlerClick}></i>

				<i className={`${styles.headerIcons} bi-list fs-2`} onClick={handlerMenu}></i>

			</section>

			<AsideMenu menuRef={menuRef} handlerMenu={handlerMenu}/>

		</header>

	);

}

export default Header;
