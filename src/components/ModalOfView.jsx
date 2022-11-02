import useModals from '../context/ModalContext';
import useConf from '../context/ConfContext';
import {TYPES} from '../actions/confActions';

const ModalOfView = ({setView,view}) => {

	const {setModalView} = useModals(),

	{conf,dispatch} = useConf(),

	handlerClick = (view) => {

		dispatch({type:TYPES.changeView,payload:view})

		setModalView(false);

	}

	return(

		<section className="modal">

			<div className="cross" onClick={() => setModalView(false)}><i className="bi-x"></i></div>

			<aside className={`child-modal ${conf.theme}`}>
				
				<div className="modal-option" onClick={() => handlerClick('square')}>
						
					<h3>Cuadricula</h3>
						
					<i className="bi-grid fs-5"></i>

				</div>

				<div className="modal-option" onClick={() => handlerClick('list')}>
						
					<h3>Lista</h3>
						
					<i className="bi-view-stacked fs-5"></i>

				</div>

			</aside>

		</section>
	)

}

export default ModalOfView;