/*=============================================
OBJETO CON PROPIEDADES DE LA CALCULADORA
=============================================*/

var p = {
	//selecciono los items del DOM de la calculadora.
	teclas: document.querySelectorAll("#calculadora ul li "),

	//genero una propiedad desde el método "tecla.target.getAttribute"
	//inicialmente es nula, solo tomará el valor cuando hagamos click
	accion: null,

	//Donde voy a almancenar el dígito del innerHTML desde el método oprimir tecla.
	digito: null,
	// Para mostrar la propiedad "digito", del ID de la DOM "#operaciones"
	operaciones: document.querySelector("#operaciones"),
	//propiedad para poder cuantificar los signos, así no poder escribir un signo hasta que no tenga otro número
	cantidadSignos: 0,

	cantidadDecimal: false,
	// Propiedad par poder remplazar y digirtar nuevamente posterior a obtener un resultado
	resultado: false

}



/*=============================================
OBJETO CON MÉTODOS DE LA CALCULADORA
=============================================*/

var m = {

	inicio: function() {

		console.log("hola");
		//Con un for sobre todos los items llamamos y almacenamos todas las teclas de la calculadora
		for (var i = 0; i < p.teclas.length; i++) {
			//incoco un listener para usar el el método m.oprimirTecla para cada una de las teclas contadas con el "for"
			p.teclas[i].addEventListener("click", m.oprimirTecla);
		}
	},

	// método con evento para recibir pulsaciones de teclado. "keydown es el método del document que escucha este tipo de eventos". Este dispará otro metodo "oprimir"
	teclado: function() {

		document.addEventListener("keydown", m.oprimir);
	},

	//se encarga de saber qué tecla se está oprimiendo, forma que se pasa un parámetro(el nombre del parámetro puede ser cualquiera)
	oprimir: function(tecla) {

		console.log(tecla.keyCode);
		// condicional donde indico que si keycode es = a 0 diga que las propiedades acción y digito sean 0
		// posterior a la condiciones, mando al método de la calculadora los números correspondientes


		// Entrada de Números
		if (tecla.keyCode == 48 || tecla.keyCode == 96) {

			p.accion = "numero";
			p.digito = 0;

		}

		else if (tecla.keyCode == 49 || tecla.keyCode == 97) {

			p.accion = "numero";
			p.digito = 1;

		}

		else if (tecla.keyCode == 50 || tecla.keyCode == 98) {

			p.accion = "numero";
			p.digito = 2;

		}

		else if (tecla.keyCode == 51 || tecla.keyCode == 99) {

			p.accion = "numero";
			p.digito = 3;

		}

		else if (tecla.keyCode == 52 || tecla.keyCode == 100) {

			p.accion = "numero";
			p.digito = 4;

		}

		else if (tecla.keyCode == 53 || tecla.keyCode == 101) {

			p.accion = "numero";
			p.digito = 5;

		}

		else if (tecla.keyCode == 54 || tecla.keyCode == 102) {

			p.accion = "numero";
			p.digito = 6;

		}

		else if (tecla.keyCode == 55 || tecla.keyCode == 103) {

			p.accion = "numero";
			p.digito = 7;

		}

		else if (tecla.keyCode == 56 || tecla.keyCode == 104) {

			p.accion = "numero";
			p.digito = 8;

		}

		else if (tecla.keyCode == 57 || tecla.keyCode == 105) {

			p.accion = "numero";
			p.digito = 9;

		}


		//Entrada de signos

		else if (tecla.keyCode == 187 || tecla.keyCode == 107) {

			p.accion = "signo";
			p.digito = "+";

		}

		else if (tecla.keyCode == 189 || tecla.keyCode == 109) {

			p.accion = "signo";
			p.digito = "-";

		}

		else if (tecla.keyCode == 88 || tecla.keyCode == 106) {

			p.accion = "signo";
			p.digito = "*";

		}

		else if (tecla.keyCode == 191 || tecla.keyCode == 111) {

			p.accion = "signo";
			p.digito = "/";

		}


		//Entrada de decimal

		else if (tecla.keyCode == 190 || tecla.keyCode == 110) {

			p.accion = "decimal";
			p.digito = ".";

		}


		//Entrada Igual

		else if (tecla.keyCode == 13) {

			p.accion = "igual";

		}


		//Entrada borrar

		else if (tecla.keyCode == 8) {
		// paso la acción vacía para que no se quede un número > de 10 colgado
		p.accion = "";
		m.borrarCalculadora();

		}
		// al realizar el else if metemos todo en un conjunto condicional donde si el else es "cualquier otra tecla no asignada", no haga nada(pasando parámetros vacios).
		else {

			p.accion = "";
			p.digito = "";


		}

		m.calculadora(p.accion, p.digito);
	},


	//declaro el método oprimirTecla que realizará una opción cuando precione una tecla
	//Para distiguir que tecla oprimo, le paso un parámetro (puede ser cualquier nombre, ej "tecla")
	oprimirTecla: function(tecla) {


		/*=============================================
		cambio el tipico string indicando el nombre del parámetro.
		De esta forma la consola en vez de mostrar un string, nos mostrará un objeto con todas sus propiedades, en este caso es un objeto DOM.
		De estar forma al llamar "tecla" con la propiedad ".target" este mostrará el texto encerrado en el objeto DOM correspondiente. 
		Ej: nos devolverá "<li>2</li>" si pulsamos la tecla "2".

		//al indicar el método "getAttribute" podemos llamar a un atributo del objeto dom "class, id, style, etc"
		=============================================*/



		//console.log(tecla.target.getAttribute("class"));

		//No obstante quitamos la consola y el get attribute lo almacenamos en una nueva propiedad action, y así llamarla como a continuación cuando se haga click

		p.accion = tecla.target.getAttribute("class");
		p.digito = tecla.target.innerHTML;
		//console.log("p.accion", p.accion);
		//llamo al método calculadora del objeto m pasándole el parámetro de p.accion, así poder ejecutar con click o con el teclado.
		//también pasamos el parámetro dígito.
		m.calculadora(p.accion, p.digito);

	},
	//creo un nuevo método que recibe como parametro accion que se está almacenando cuando se oprimen las teclas de la pantalla
	// añado también debemos pasar el parámetro dígito en la función del métido calculadora.
	calculadora: function(accion, digito) {

		//con un switch, puedo preguntarle cómo viene el parámetro acción
		switch (accion) {
			case "numero":
				//llamdo directamente al parámetro "digito", porque si llamo a p.digito, me traeré el valor "null"


				// al marcar un número reseteamos el valor de cantidadSignos. Así puede volver a incrementarse.
				p.cantidadSignos = 0;

				//el condicional se realiza para evitar que el 0 quede siempre a la izquieda
				if (p.operaciones.innerHTML == "0") {

					p.operaciones.innerHTML = digito;
				} else {
					// con este condicional pregunto por el estado de la propiedad p.resultado, si está el true, lo deja tal cual, y si está en false me deja volver a escribir un nuevo número, y ademas le digo que lo pase a falso para poder escribirlo.
					if (p.resultado) {
						p.resultado = false;
						p.operaciones.innerHTML = digito;
					} else {

						p.operaciones.innerHTML += digito;

					}


				}

				//console.log("numero");
				break;

			case "signo":
				//lo incremento para cambiar el valor 0 de la propiedad
				p.cantidadSignos++
					//usamos el condicional para indicar que que solo escriba signo si cantidadSignos = 1
					// el número lo pasamos como un string así podemos escribir decimales menos que 1 EJ ".5 o .12"
					if (p.cantidadSignos == "1") {
						//creamos un nuevo condicional para que si hay un 0 solo deje meter dígitos
						// nuevamente la igualación se realiza como string para los decimales menos que 1.
						if (p.operaciones.innerHTML == "0") {
							p.operaciones.innerHTML = 0
						} else {
							p.operaciones.innerHTML += digito;
							// cambiamos la propiedad a false para poder escribir un decimal nuevamente.
							p.cantidadDecimal = false;
							p.resultado = false;
						}
					}


				console.log("signo");
				break;

			case "decimal":
				// el condicional revisa si la propiedad es falsa, si lo es, añade el dígito, si no, no añade nada.
				if (!p.cantidadDecimal && p.cantidadDecimal !=1) {
					p.operaciones.innerHTML += digito;
					// una vez añadido, cambiamos a true para que no se puedan añadir mas dígitos
					p.cantidadDecimal = true;
					p.resultado = false;

				}

				console.log("decimal");
				break;

			case "igual":
				p.operaciones.innerHTML = eval(p.operaciones.innerHTML);
				p.resultado = true;

				console.log("igual");
				break;

		}
		console.log("p.resultado", p.resultado);


	},

	borrarCalculadora: function() {
		p.cantidadDecimal = false;
		p.operaciones.innerHTML = 0;
	}



}

//disparamos el método "inicio".
m.inicio();
//Activamos de forma automática el evento teclado para recibir de inmediato las teclas de teclado automáticamente.
m.teclado();