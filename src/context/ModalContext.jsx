import {createContext,useState,useContext} from 'react';

const ModalContext = createContext(),

useModals = () => useContext(ModalContext),

ModalProvider = ({children}) => {

	const [modal,setModal] = useState(false),

	[listModal,setListModal] = useState(false), 

	[modalView,setModalView] = useState(false),

	[modalOrder,setModalOrder] = useState(false),

	[searchModal,setSearchModal] = useState(false),

	[colorModal,setColorModal] = useState(false),

	data = {

		modal,
		setModal,
		modalView,
		setModalView,
		modalOrder,
		setModalOrder,
		searchModal,
		setSearchModal,
		colorModal,
		setColorModal,
		listModal,
		setListModal

	}

	return <ModalContext.Provider value={data}>{children}</ModalContext.Provider>

}

export default useModals;
export {ModalProvider};
