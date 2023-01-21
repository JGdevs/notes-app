import {useRef,useEffect,useState} from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import useNotes from '../context/NotesContext';
import useModals from  '../context/ModalContext';
import useConf from '../context/ConfContext';
import ModalOfColor from './ModalOfColor';
import styles from '../styles/Notes.module.css';

const OpenCheckList = () => {

	const note = JSON.parse(sessionStorage.getItem('data')),

	[list,setList] = useState(note.asunto),

	[edit,setEdit] = useState(false),

	nav = useNavigate(),

	{setNotes,setTrash,trash} = useNotes(),

	{id} = useParams(),

	{conf} = useConf(),

	refTextArea = useRef(),

	refInput = useRef(),

	addElementRef = useRef(),

	{colorModal,setColorModal} = useModals(),

	date = new Date().toLocaleString(),

	saveNote = (e) => {

		const title = refInput.current.value || new Date().toLocaleString(),

		modifyItems = Array.from(document.querySelectorAll('.input-list')).map(el => {

			return {finished:false,value:el.value}

		}),

		checkedItems = Array.from(document.querySelectorAll('.finished')).map(el => {

			return {finished:true,value:el.textContent}

		}),

		asunto = list.map(el => {

			if(el.finished === modifyItems[0].finished) {

				const obj = modifyItems[0];

				modifyItems.shift();

				return obj;

			}

			else {

				const obj = checkedItems[0];

				checkedItems.shift();

				return obj;

			}

		}),

		modifyNote = {

			id,
			title,
			asunto,
			date:note.date,
			editDate:date,
			bgColor:note.bgColor

		}

		refInput.current.disabled = !refInput.current.disabled;

		addElementRef.current.classList.toggle('add-list-option');

		e.target.classList.add("hidden");

		e.target.previousElementSibling.classList.remove("hidden");

		sessionStorage.setItem('data',JSON.stringify(modifyNote));

		setNotes(prevNotes => prevNotes.map(n => (n.id == note.id) ? modifyNote : n));

		setEdit(false);

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

	setDisabled = (e) => {

		refInput.current.disabled = !refInput.current.disabled

		addElementRef.current.classList.toggle('add-list-option');

		e.target.classList.add("hidden");

		e.target.nextElementSibling.classList.remove("hidden");

		setEdit(true);

	},

	addElement = (e) => {

		refTextArea.current.disabled = !refTextArea.current.disabled;

		if(!refTextArea.current.disabled) refTextArea.current.focus();

		if(refTextArea.current.value !== '') setList(prevList => [...prevList,{value:refTextArea.current.value,finished:false}]);

	},

	deleteListElement = (e) => {

		setList(prevList => prevList.filter(el => el.value != e.target.previousElementSibling.value));

	},

	checkElement = (e) => {

		if(note.dateDelete) return false; 

		setList(prevList => {

			const newList = prevList.map((list,i) => (i == e.target.id) ? {...list,finished:!list.finished} : list),

			newNote = {...note,asunto:newList}

			sessionStorage.setItem('data',JSON.stringify(newNote));

			return newList;

		});

	},

	handlerChange = (e) => {

		setList(prevList => prevList.map((el,i) => (i == e.target.id) ? {...el,value:e.target.value} : el));

	}

	useEffect(() => {

		refTextArea.current.value = '';

	},[list]);

	useEffect(() => {

		return (note.dateDelete) ? () => {} : () => setNotes(prevNotes => prevNotes.map(n => (n.id == note.id) ? JSON.parse(sessionStorage.getItem('data')) : n));

	},[]);

	return (

		<>

			<article className={`${styles.openNote} ${conf.theme}-note ${note.bgColor || conf.bgColor}`}>

				<div className={styles.headerNote}>
				
					<span>{note.dateDelete || note.date}</span>

					{ (!note.dateDelete) ? 

						<section>
						
							<i className="bi-pen text-white fs-0 mr-rg" onClick={setDisabled}></i>
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

				<input className={`fs--1 border${(note.bgColor) ? note.bgColor.substring(2) : conf.bgColor.substring(2)}`} ref={refInput} type="text" placeholder="Titulo" defaultValue={note.title} disabled/>

				<div className="none" ref={addElementRef}>

					<i className="bi-plus-circle-fill fs-0 mr-rg" onClick={addElement}></i>
					<textarea className={styles.addElList} ref={refTextArea} type="text" placeholder="agregar elemento" disabled></textarea>

				</div>

				<ul>
				
					{list.map((el,i) => <div className={styles.listElement} key={i}>

						{(edit && !el.finished) ? <input className="input-list" id={i} value={el.value} onChange={handlerChange}/> : <li className={`${styles.listElementChilds} ${(el.finished) ? 'finished' : ''}`} id={i} onClick={(!edit) ? checkElement : () =>{}}>{el.value}</li>}

						{edit && <i className="bi-x cross-color fs-0" onClick={deleteListElement}></i>}

					</div>)}	

				</ul>	

			</article>

			{colorModal && <ModalOfColor note={note}/>}

		</>

	)

}

export default OpenCheckList;