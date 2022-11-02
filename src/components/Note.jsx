import {useNavigate} from 'react-router-dom';
import useConf from '../context/ConfContext';

const Note = ({note}) => {

	let {title,asunto,date,id} = note;

	const {conf} = useConf(),

	nav = useNavigate(),

	to = (e) => {

		sessionStorage.setItem('data',JSON.stringify(note))

		nav(`/note/${id}`)

	}

	return (

		<article className={`notes ${conf.theme} ${note.bgColor || conf.bgColor} ${conf.view}`} onClick={to}>
				
			<section>

				<h3>{title}</h3>

				<p>{asunto}</p>

			</section>

			<footer className="footer-note">

				<span>{date.slice(0,date.indexOf(','))}</span>

			</footer>

		</article>

	)

}

export default Note;