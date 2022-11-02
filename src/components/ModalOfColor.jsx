import useModals from '../context/ModalContext';
import useNotes from '../context/NotesContext';

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

		<div className="modal">
			
			<i className="bi-x text-white cross" onClick={() => setColorModal(false)}></i>

			<section className="color-modal">
				
				{arrayColors.map((color,i) => <div className={color} key={i} onClick={changeColor}></div>)}

			</section>

		</div>	

	)

}

export default ModalOfColor;