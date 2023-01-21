const Void = ({origin}) => {

	let title,
	icon

	switch (origin) {

		case "notas": {

			title = "no hay notas todavia agrega algunas";
			icon = 'bi-pencil-square'

			break;

		}

		case "trash": {

			title = "la papelera esta vacia";
			icon = 'bi-trash2'

			break;

		}

		case "search": {

			title = "no se encuentran resultados";
			icon = 'bi-search'

			break;

		}

	}

	return (

		<div className="text-void text-center">

			<h2 className="">{title}</h2>

			<i className={` ${icon} fs-6`}></i>

		</div>

	);

}

export default Void;