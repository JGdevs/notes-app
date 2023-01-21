import useModals from '../context/ModalContext';
import useNotes from '../context/NotesContext';
import styles from '../styles/ModalOf.module.css';

const ModalOfColor = ({note}) => {

	const arrayColors = ['bg-blue','bg-red','bg-violet','bg-green','bg-pink','bg-default'],

	{setColorModal} = useModals(),

	{setNotes} = useNotes(),

	changeColor = (e) => {

		note.bgColor = e.target.classList[0];

		setNotes(prevNotes => prevNotes.map(n => (n.id !== note.id) ? n : note));

		sessionStorage.setItem('data',JSON.stringify(note));

		setColorModal(false);

	}

	return (

		<div className={styles.modal}>
			
			<i className={`bi-x text-white ${styles.cross}`} onClick={() => setColorModal(false)}></i>

			<section className={styles.colorModal}>
				
				{arrayColors.map((color,i) => <div className={`${color} ${styles.colorModalChild}`} key={i} onClick={changeColor}></div>)}

			</section>

		</div>	

	)

}

export default ModalOfColor;