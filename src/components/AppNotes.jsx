import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {ModalProvider} from '../context/ModalContext';
import MyNotes from './MyNotes';
import Trash from './Trash';
import SearchResults from './SearchResults';
import OpenNote from './OpenNote';
import OpenCheckList from './OpenCheckList';
import useConf from '../context/ConfContext';

const AppNotes = () => {

	const {conf} = useConf();

	if (conf.theme === 'dark') document.querySelector('body').classList.add('dark')

	else document.querySelector('body').classList.remove('dark')

	return (

		<>

			<BrowserRouter>
				
				<ModalProvider>
		  
	    		<Routes>
	    			
	    			<Route path="/" element={<MyNotes/>}/>

	    			<Route path="/papelera" element={<Trash/>}/>

	    			<Route path="/search/:search" element={<SearchResults/>}/>

	    			<Route path="/note/:id" element={<OpenNote/>}/>

	    			<Route path="/checklist/:id" element={<OpenCheckList/>}/> 

	    		</Routes>

		    </ModalProvider>

			</BrowserRouter>

    </>

	);

}

export default AppNotes;