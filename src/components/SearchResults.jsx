import {useParams} from 'react-router-dom';
import useModals from '../context/ModalContext';
import Note from './Note';
import CheckList from './CheckList';
import ModalOfView from './ModalOfView';
import SearchForm from './SearchForm';
import Header from './Header';
import useConf from '../context/ConfContext';
import useNotes from '../context/NotesContext';
import Void from './Void';

const SearchResults = () => {

	let {search} = useParams();

	const {conf} = useConf(),

	{trash,notes} = useNotes(),

	{modalView,searchModal} = useModals(),

	GridSize = {gridTemplateColumns:`repeat(auto-fit,${conf.view})`},

	SearchResults = () => {

		search = search.toLowerCase();

		const arr = notes.filter(note => {

			if(note.title.toLowerCase().includes(search)) return true;

			else if (typeof note.asunto === 'string') {

				if(note.asunto.toLowerCase().includes(search)) return true;

			}

			else {

				if(note.asunto.find(({value}) => value.toLowerCase() === search)) return true;

			}

		}),

		arr2 = trash.filter(note => {

			if(note.title.toLowerCase().includes(search)) return true;

			else if (typeof note.asunto === 'string') {

				if(note.asunto.toLowerCase().includes(search)) return true;

			}

			else {

				if(note.asunto.find(({value}) => value.toLowerCase() === search)) return true;

			}

		});

		return [...arr,...arr2];

	},

	result = SearchResults();

	return (

		<>

			<Header/>

			{

				(!notes || notes.length == 0) 

				? <Void origin="notas"/> 

				: result.map((note,i = 0) => {

					if(typeof note.asunto === 'object') return <CheckList note={note} key={i}/>

					else return <Note note={note} key={i}/>	

				})

			}

			{modalView && <ModalOfView/>}

			{searchModal && <SearchForm	/>}

		</>	

	);

}

export default SearchResults;