import useNotes from '../context/NotesContext';
import useModals from '../context/ModalContext';
import useConf from '../context/ConfContext';
import Void from './Void';
import Note from './Note.jsx';
import CheckList from './CheckList';
import AddNotes from './AddNotes';
import ModalOfView from './ModalOfView';
import ModalOfOrder from './ModalOfOrder';
import SearchForm from './SearchForm';
import Header from './Header';
import AddCheckList from './AddCheckList';

const MyNotes = () => {

	const {notes} = useNotes(),

	{modalView,modalOrder,modal,searchModal,listModal} = useModals(),

	{conf} = useConf(),

	size = (conf.view === 'square') ? '12.5rem' : '25rem',

	GridSize = {

		gridTemplateColumns:`repeat(auto-fit,${size})`

	}

	return(

		<>

			<Header/>

			<div className="grid-notes" style={GridSize}>
			
				{

					(!notes || notes.length == 0) 

					? <Void origin="notas"/> 

					: notes.map((note,i = 0) => {

						if(typeof note.asunto === 'object') return <CheckList note={note} key={i}/>

						else return <Note note={note} key={i}/>	

					})

				}

				{modal && <AddNotes data Edit={false}/>}

				{modalView && <ModalOfView/>}

				{modalOrder && <ModalOfOrder/>}

				{searchModal && <SearchForm/>}

				{listModal && <AddCheckList/>}

			</div>

		</>

	);

}

export default MyNotes;