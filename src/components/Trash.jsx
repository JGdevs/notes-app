import useNotes from '../context/NotesContext';
import useModals from '../context/ModalContext';
import Void from './Void';
import Note from './Note.jsx';
import CheckList from './CheckList';
import ModalOfView from './ModalOfView';
import ModalOfOrder from './ModalOfOrder';
import SearchForm from './SearchForm';
import useConf from '../context/ConfContext';
import Header from './Header';

const Trash = ({view,setView}) => {

	const {trash} = useNotes(),

	{conf} = useConf(),

	{modalView,modalOrder,searchModal} = useModals(),

	size = (conf.view === 'square') ? '12.5rem' : '25rem',

	GridSize = {

		gridTemplateColumns:`repeat(auto-fit,${size})`

	};

	return(

		<>

			<Header/>

			<div className="grid-notes" style={GridSize}>
			
				{

					(!trash || trash.length == 0) 

					? <Void origin="trash"/> 

					: trash.map((n,i = 0) => {

						if(typeof n.asunto == 'object') return <CheckList note={n} key={i + 1}/>

						else return <Note note={n} key={i + 1}/>	

					})

				}

				{modalView && <ModalOfView/>}

				{modalOrder && <ModalOfOrder/>}

				{searchModal && <SearchForm/>}

			</div>

		</>

	);

}

export default Trash;