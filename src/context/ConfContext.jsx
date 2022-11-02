import {createContext,useContext,useReducer} from 'react';
import {initialStateConf,confReducer} from '../reducers/confReducers';

const ConfContext = createContext(),

useConf = () => useContext(ConfContext),

ConfProvider = ({children}) => {

	const [conf,dispatch] = useReducer(confReducer,initialStateConf),

	data = {

		conf,
		dispatch

	}

	return <ConfContext.Provider value={data}>{children}</ConfContext.Provider>

}

export default useConf;
export {ConfProvider};