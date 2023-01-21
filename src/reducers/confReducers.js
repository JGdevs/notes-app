import {TYPES} from '../actions/confActions.js';

export const initialStateConf = JSON.parse(localStorage.getItem('confNotes')) || {

	theme:'light',
	view:'square',
	bgColor:'bg-default'

}

export function confReducer (state,action) {

	switch (action.type) {

		case TYPES.changeTheme : {

			const newConf = {...state,theme:action.payload}

			localStorage.setItem('confNotes',JSON.stringify(newConf));

			return newConf;

		}

		case TYPES.changeView : {

			const newConf = {...state,view:action.payload}

			localStorage.setItem('confNotes',JSON.stringify(newConf));

			return newConf;

		}

		case TYPES.changeBgColor : {

			const newConf = {...state,bgColor:action.payload}

			localStorage.setItem('confNotes',JSON.stringify(newConf));

			return newConf

		}

		default : return state;

	}

}