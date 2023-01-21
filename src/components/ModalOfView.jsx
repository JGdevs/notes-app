import useModals from '../context/ModalContext';
import useConf from '../context/ConfContext';
import {TYPES} from '../actions/confActions';
import styles from '../styles/ModalOf.module.css';

const ModalOfView = ({setView,view}) => {

	const {setModalView} = useModals(),

	{conf,dispatch} = useConf(),

	handlerClick = (view) => {

		dispatch({type:TYPES.changeView,payload:view})

		setModalView(false);

	}

	return(

		<section className={styles.modal}>

			<div className={styles.cross} onClick={() => setModalView(false)}><i className="bi-x"></i></div>

			<aside className={`${styles.childModal} ${conf.theme}`}>
				
				<div className={styles.modalOption} onClick={() => handlerClick('square')}>
						
					<h3>Cuadricula</h3>
						
					<i className="bi-grid fs-5"></i>

				</div>

				<div className={styles.modalOption} onClick={() => handlerClick('list')}>
						
					<h3>Lista</h3>
						
					<i className="bi-view-stacked fs-5"></i>

				</div>

			</aside>

		</section>
	)

}

export default ModalOfView;