import useConf from '../context/ConfContext';
import useModals from '../context/ModalContext';
import {TYPES} from '../actions/confActions';
import {NavLink} from 'react-router-dom';
import styles from '../styles/MenuStyles.module.css';

const AsideMenu = ({menuRef,handlerMenu}) => {

	const {dispatch,conf} = useConf(),

	{setModalView,setModalOrder,setSearchModal} = useModals(),

	changeTheme = () => {

		let payload = (conf.theme === 'light') ? 'dark' : 'light';

		dispatch({type:TYPES.changeTheme,payload});

	}

	return (

		<div className={`${styles.panel} hidden`} ref={menuRef}>

			<aside className={`${styles.menuContainer} ${conf.theme}`}>

				<div className={styles.menuHeader}>
					
					<i className="bi-x fs-2" onClick={handlerMenu}></i>

				</div>

				<nav className={styles.asideMenu} onClick={handlerMenu}>

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

	)

}

export default AsideMenu;