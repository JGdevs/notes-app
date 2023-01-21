import {useNavigate} from 'react-router-dom';
import useConf from '../context/ConfContext';
import styles from '../styles/Notes.module.css';

const CheckList = ({note}) => {

	const {title,asunto,date,id} = note,

	{conf} = useConf(),

	nav = useNavigate(),

	to = (e) => {

		sessionStorage.setItem('data',JSON.stringify(note))

		nav(`/checklist/${id}`)

	}	

	return (

		<article className={`${styles.notes} ${conf.theme}-note ${note.bgColor || conf.bgColor} ${conf.view}`} onClick={to}>
		
			<section>
			
				<h3>{title}</h3>

				<ul className={styles.notesText}>
					
					{asunto.map((el,i) => <li className={(el.finished) ? 'finished' : ''} key={i}>{el.value}</li>)}

				</ul>	

			</section>

			<footer className={styles.footerNote}>

				<span>{date.slice(0,date.indexOf(','))}</span>

			</footer>	

		</article>

	)

}

export default CheckList;