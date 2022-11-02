import AppNotes from './components/AppNotes';
import {NotesProvider} from './context/NotesContext';
import {ConfProvider} from './context/ConfContext';

function App() {

  return (

    <ConfProvider>

      <NotesProvider>

        <AppNotes/>
      
      </NotesProvider>

    </ConfProvider>

  );

}

export default App;
