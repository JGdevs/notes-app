import {useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import useModals from '../context/ModalContext';

const SearchForm = () => {

	const nav = useNavigate(),

	{setSearchModal} = useModals(),

	searchRef = useRef(),

	iconRef = useRef(),

	Search = (e) => {

		e.preventDefault();

		nav(`/search/${searchRef.current.value}`);

		setSearchModal(false);

	}

	function handlerChange () {

		if(searchRef.current.value.length > 0) {

			iconRef.current.classList.remove('bi-x');
			iconRef.current.classList.add('bi-search');
			iconRef.current.classList.add('pointer-events-none');

		}

		else {

			iconRef.current.classList.remove('bi-search');
			iconRef.current.classList.add('bi-x');
			iconRef.current.classList.remove('pointer-events-none')

		}

	}

	return (

		<div className="modal-search">
			
			<form className="search-form" onSubmit={Search}>
				
				<input className="search-input" ref={searchRef} type="search" placeholder="Buscar" onChange={handlerChange}></input>
				
				<div className="search-submit">
					
					<input type="submit" value=""></input>
					<i className="bi-x fs-1" ref={iconRef} onClick={() => setSearchModal(false)}></i>

				</div>

			</form>

		</div>

	)
}

export default SearchForm;