import {useNavigate} from 'react-router-dom';
import useConf from '../context/ConfContext';

const CheckList = ({note}) => {

	const {title,asunto,date,id} = note,

	{conf} = useConf(),

	nav = useNavigate(),

	to = (e) => {

		sessionStorage.setItem('data',JSON.stringify(note))

		nav(`/checklist/${id}`)

	}	

	return (

		<article className={`notes ${conf.theme} ${note.bgColor || conf.bgColor} ${conf.view}`} onClick={to}>
		
			<section>
			
				<h3>{title}</h3>

				<ul>
					
					{asunto.map((el,i) => <li className={(el.finished) ? 'finished' : ''} key={i}>{el.value}</li>)}

				</ul>	

			</section>

			<footer className="footer-note">

				<span>{date.slice(0,date.indexOf(','))}</span>

			</footer>	

		</article>

	)

}

export default CheckList;