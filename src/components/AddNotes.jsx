import {useRef} from 'react';
import useNotes from '../context/NotesContext';
import useModals from  '../context/ModalContext';
import useConf from '../context/ConfContext';
import styles from '../styles/Add.module.css';

const Addnotes = () => {

	const {setNotes} = useNotes(),

	{conf} = useConf(),

	{setModal} = useModals(),

	refTextArea = useRef(),

	refInput = useRef(),

	date = new Date().toLocaleString(),

	saveNote = (e) => {

		e.preventDefault();

		const title = refInput.current.value || new Date().toLocaleString(),

		asunto = refTextArea.current.value;

		if(!asunto) {

			setModal(false);

			return false;

		}

		const note = {

			id: Date.now(),
			title,
			asunto,
			date

		}

		setNotes(prevNotes => [...prevNotes,note]);

		setModal(false);

	}

	return(

		<div className={styles.modal}>

			<div className={styles.cross}><i onClick={() => setModal(false)} className="bi-x"></i></div>
			
			<form className={`${styles.formNote} ${conf.theme}`} onSubmit={saveNote}>

				<div className={`${styles.headerNote}`}>
					
					<span>{date.slice(date.indexOf(',') + 1,date.lastIndexOf(':')) + date.slice(date.lastIndexOf(' '))}</span>

				</div>

				<input className="fs--1" ref={refInput} type="text" placeholder="Titulo"/>
				<textarea className="fs--1" ref={refTextArea} placeholder="Escribe Aqui"></textarea>
				<input className={`cursor-pointer text-${conf.theme}`} type="submit" value="guardar nota"/>

			</form>

		</div>

	);

}

export default Addnotes;