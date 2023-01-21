import {useRef} from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import useNotes from '../context/NotesContext';
import useModals from  '../context/ModalContext';
import useConf from '../context/ConfContext';
import ModalOfColor from './ModalOfColor';
import styles from '../styles/Notes.module.css';

const OpenNote = () => {

	const nav = useNavigate(),

	note = JSON.parse(sessionStorage.getItem('data')),

	{setNotes,setTrash,trash} = useNotes(),

	{id} = useParams(),

	{conf} = useConf(),

	refTextArea = useRef(),

	refInput = useRef(),

	{colorModal,setColorModal} = useModals(),

	date = new Date().toLocaleString(),

	saveNote = (e) => {

		e.preventDefault();

		const title = refInput.current.value || new Date().toLocaleString(),

		asunto = refTextArea.current.value;

		const modifyNote = {

			id,
			title,
			asunto,
			date:note.date,
			editDate:date,
			bgColor:note.bgColor

		}


		refInput.current.disabled = !refInput.current.disabled;
		refTextArea.current.disabled = !refTextArea.current.disabled;

		e.target.classList.add("hidden");
		e.target.previousElementSibling.classList.remove("hidden");

		sessionStorage.setItem('data',JSON.stringify(modifyNote));

		setNotes(prevNotes => prevNotes.map(n => (n.id == note.id) ? modifyNote : n));

	},

	deleteNote = () => {

		if(note.dateDelete) {

		let newTrash = trash.filter(n => n.id != note.id);

		setTrash(newTrash);

		nav('/papelera');


		}

		else {

		note.dateDelete = date;

		setNotes(prevNotes => prevNotes.filter((n) => n.id !== note.id));

		setTrash(prevTrash => [...prevTrash,note]);

		nav('/');

		}

	},

	restore = () => {

		delete note.dateDelete;

		setNotes(prevNotes => [...prevNotes,note]);

		setTrash(prevTrash => prevTrash.filter(el => el.id !== note.id));

		nav('/papelera');

	},

	setEdit = (e) => {

		refInput.current.disabled = !refInput.current.disabled;
		refTextArea.current.disabled = !refTextArea.current.disabled;

		e.target.classList.add("hidden");
		e.target.nextElementSibling.classList.remove("hidden");

	}

	return (

		<>
				
			<article className={`${styles.openNote} ${conf.theme}-note ${note.bgColor || conf.bgColor}`}>

				<div className={styles.headerNote}>
				
					<span>{note.dateDelete || note.date}</span>

					{ (!note.dateDelete) ? 

						<section>
						
							<i className="bi-pen text-white fs-0 mr-rg" onClick={setEdit}></i>
							<i className="bi-save text-white fs-0 mr-rg hidden" onClick={saveNote}></i>
							<i className="bi-trash2 text-white fs-0 mr-rg" onClick={deleteNote}></i>
							<i className="bi-palette-fill text-white fs-0" onClick={() => setColorModal(true)}></i>

						</section>

						: <section>
							
								<i className="bi-arrow-90deg-left text-white fs-0" onClick={restore}></i>
								<i className="bi-trash2 text-white fs-0 mr-lf" onClick={deleteNote}></i>							

							</section>

					}

				</div>

				<input className={`fs--1 ${conf.theme}-borderNote  border${(note.bgColor) ? note.bgColor.substring(2) : conf.bgColor.substring(2)}`} ref={refInput} type="text" placeholder="Titulo" defaultValue={note.title} disabled/>
				<textarea className="fs--1" ref={refTextArea} placeholder="Escribe Aqui" defaultValue={note.asunto} disabled></textarea>

			</article>

			{colorModal && <ModalOfColor note={note}/>}

		</>

	);

}

export default OpenNote;