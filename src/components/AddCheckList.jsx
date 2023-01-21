import {useRef,useState,useEffect} from 'react';
import useNotes from '../context/NotesContext';
import useModals from  '../context/ModalContext';
import useConf from '../context/ConfContext';
import styles from '../styles/Add.module.css';

const AddCheckList = () => {

	const [checkList,setCheckList] = useState([]),

	refInput = useRef(),

	refList = useRef(),

	{setNotes} = useNotes(),

	{conf} = useConf(),

	{setListModal} = useModals(),

	date = new Date().toLocaleString(),

	saveNote = (e) => {

		e.preventDefault();

		const title = refInput.current.value || new Date().toLocaleString(),

		asunto = checkList;

		if(!asunto) {

			setListModal(false);

			return false;

		}

		const note = {

			id: Date.now(),
			title,
			asunto,
			date

		}

		setNotes(prevNotes => [...prevNotes,note]);

		setListModal(false);

	},

	addElement = (e) => {

		refList.current.disabled = !refList.current.disabled;

		if(!refList.current.disabled) refList.current.focus();

		if(refList.current.value !== '') setCheckList(prevState => [...prevState,{value:refList.current.value,finished:false}]);

	}

	useEffect(() => {

		refList.current.value = '';

	},[checkList]);

	return(

		<div className={styles.modal}>

			<div className={styles.cross}><i onClick={() => setListModal(false)} className="bi-x"></i></div>
			
			<form className={`${styles.formNote} ${conf.theme}`} onSubmit={saveNote}>

				<div className={styles.headerNote}>
					
					<span>{date.slice(date.indexOf(',') + 1,date.lastIndexOf(':')) + date.slice(date.lastIndexOf(' '))}</span>

				</div>

				<input className="fs--1" ref={refInput} type="text" placeholder="Titulo"/>
				
				<div className={styles.addListOption}>

					<i className="bi-plus-circle-fill fs-0 mr-rg" onClick={addElement}></i>
					<textarea className={styles.addElList} ref={refList} type="text" placeholder="agregar elemento" disabled></textarea>

				</div>	

				<ul className={styles.checkList}>
						
					{checkList.length > 0 && checkList.map((el,i) => <li key={i}>{el.value}</li>)}

				</ul>

				<input className={`cursor-pointer text-${conf.theme}`} type="submit" value="guardar-nota"/>

			</form>

		</div>

	);

}

export default AddCheckList;