import {useParams} from 'react-router-dom';
import useModals from '../context/ModalContext';
import Note from './Note';
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

		const arr = notes.filter(note => note.title.toLowerCase().includes(search) || note.asunto.toLowerCase().includes(search)),

		arr2 = trash.filter(note => note.title.toLowerCase().includes(search) || note.asunto.toLowerCase().includes(search));

		return [...arr,...arr2];

	},

	result = SearchResults();

	console.log(result);

	return(

		<>

			<Header/>

			{

				(result.length > 0) ? 

					<div className="grid-notes" style={GridSize}>
				
						 {result.map((note,i) => <Note key={i} note={note}/>)}

					</div>

				: <Void origin="search"/>

			}

			

			{modalView && <ModalOfView/>}

			{searchModal && <SearchForm	/>}

		</>	

	);

}

export default SearchResults;