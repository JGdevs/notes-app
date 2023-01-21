import {createContext,useContext} from 'react';
import useLocaleStorage from '../hooks/useLocaleStorage';

const NotesContext = createContext(),

useNotes = () => useContext(NotesContext),

NotesProvider = ({children}) => {

	const [notes,setNotes] = useLocaleStorage('notes',[]),

	[trash,setTrash] = useLocaleStorage('trash',[]),

	data = {

		notes,
		setNotes,
		trash,
		setTrash

	}

	return <NotesContext.Provider value={data}>{children}</NotesContext.Provider>

}

export default useNotes;
export {NotesProvider};
