import useNotes from '../context/NotesContext';
import useModals from '../context/ModalContext';
import useConf from '../context/ConfContext';
import styles from '../styles/ModalOf.module.css';

const ModalOfOrder = () => {

	const {notes,setNotes} = useNotes(),

	{setModalOrder} = useModals(),

	{conf} = useConf();

	function sortNotes (arr,order) {

		let nombres = [],

		arrSort = [],

		long = arr.length;

		for(let i = 0; i < arr.length; i++) nombres.push(arr[i][order]); 

		nombres.sort();

		while(arrSort.length < long) {

			for(let i = 0;; i++) {

				if(nombres[0] == arr[i][order]) {

					arrSort.push(arr[i]);

					nombres.shift();

					arr.splice(i,1);	

					break;

				}		

			}

		}

		return arrSort;

	}

	function handlerClick (order) {

		setNotes(sortNotes(notes,order));

		setModalOrder(false);

	}

	return (

		<div className={styles.modal}>

			<div className={styles.cross} onClick={() => setModalOrder(false)}><i className="bi-x"></i></div>
			
			<aside className={`${styles.childModal} ${conf.theme}`}>
			
				<section className={styles.modalOption}>
					
					<h4>Ordernar Alfabeticamente</h4>
						
					<i className="bi-sort-alpha-down fs-5" onClick={() => handlerClick('title')}></i>

				</section>

				<section className={styles.modalOption}>
					
					<h4>Ordernar Cronologicamente</h4>
						
					<i className="bi-clock fs-5" onClick={() => handlerClick('date')}></i>

				</section>

			</aside>	

		</div>

	)

}

export default ModalOfOrder;