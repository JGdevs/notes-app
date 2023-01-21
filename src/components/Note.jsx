import {useNavigate} from 'react-router-dom';
import useConf from '../context/ConfContext';
import styles from '../styles/Notes.module.css';

const Note = ({note}) => {

	let {title,asunto,date,id} = note;

	const {conf} = useConf(),

	nav = useNavigate(),

	to = (e) => {

		sessionStorage.setItem('data',JSON.stringify(note))

		nav(`/note/${id}`)

	}

	return (

		<article className={`${styles.notes} ${conf.theme}-note ${note.bgColor || conf.bgColor} ${conf.view}`} onClick={to}>
				
			<section className={styles.notesSection}>

				<h3 className={styles.notesTitle}>{title}</h3>

				<p className={styles.notesText}>{asunto}</p>

			</section>

			<footer className={`${styles.footerNote}`}>

				<span>{date.slice(0,date.indexOf(','))}</span>

			</footer>

		</article>

	)

}

export default Note;