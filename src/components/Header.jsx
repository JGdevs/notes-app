import {useRef} from 'react';
import {TYPES} from '../actions/confActions';
import {NavLink,useNavigate} from 'react-router-dom';
import useModals from '../context/ModalContext';
import useConf from '../context/ConfContext';

const Header = () => {

	const {setModal,setModalView,setModalOrder,setSearchModal,setListModal} = useModals(),

	menuRef = useRef(),

	nav = useNavigate(),

	{dispatch,conf} = useConf(),

	handlerClick = () => {

		if(window.location.hash == "" || window.location.hash == "#/") setModal(true);

	},

	handlerMenu = ({target}) => {

		if(target.matches('div') || target.matches('i')) {

			menuRef.current.classList.toggle('hidden')
			menuRef.current.classList.toggle('visible')

		}

	},

	changeTheme = () => {

		let payload = (conf.theme === 'light') ? 'dark' : 'light';

		dispatch({type:TYPES.changeTheme,payload});

	}

	return(

		<header className={`header ${conf.theme}`}>

			<h1 className="title-app fs-1" to="/" onClick={()=>nav("/")}>React Notes</h1>

			<i className="bi-clipboard-check fs-1" onClick={() => setListModal(true)}></i>

			<i className="bi-pencil-square fs-1" onClick={handlerClick}></i>

			<i className="bi-list fs-2" onClick={handlerMenu}></i>

			<div className="panel hidden" ref={menuRef}>

				<aside className={`menu-container ${conf.theme}`}>

					<div className="menu-header">
						
						<i className="bi-x fs-2" onClick={handlerMenu}></i>

					</div>

					<nav className="aside-menu" onClick={handlerMenu}>

						<div onClick={()=>setSearchModal(true)}>

							<i className="bi-search fs--1"></i>
							<span className="mr-lf-2">Buscar</span>

						</div>

						<div onClick={() => setModalOrder(true)}>

							<i className="bi-sort-alpha-down fs-0"></i>
							<span className="mr-lf">Ordenar</span>

						</div>
						
						<div>
							
							<i className="bi-trash2 fs-0"></i>
							<NavLink className="mr-lf" activeclassname="active" to="/papelera">Papelera</NavLink>

						</div>

						<div onClick={changeTheme}>

							<i className={`${(conf.theme === 'dark' ? 'bi-moon-fill' : 'bi-sun-fill')} fs-0`}></i>
							<span className="mr-lf">Tema {conf.theme}</span>

						</div>

						<div onClick={() => setModalView(true)}>

							<i className="bi-eye fs-0"></i>
							<span className="mr-lf">Ver</span>

						</div>

					</nav>

				</aside>

			</div>

		</header>

	);

}

export default Header;
