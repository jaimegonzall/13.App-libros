console.log("Conectado");

//Definimos las clases

class Libro{
    constructor(titulo, autor, isbn){
        this.titulo = titulo;
        this.autor = autor;
        this.isbn = isbn;
    }
}

class UI{
    static mostrarLibros(){

    }

    static agregarLibroLista(libro){

    }

    static eliminarLibro(){

    }
    static mostrarAlerta(mensaje, className){ // mensaje + clase
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(mensaje));

        const container = document.querySelector('.container');
        const form = document.querySelector('#libro-form');
        container.insertBefore(div, form); // va a insertar el div antes del form

        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
    static limpiarCampo(){
        document.querySelector('#titulo').value = '';
        document.querySelector('#autor').value = '';
        document.querySelector('#isbn').value = '';
    }

}

class Datos{
    // consulta los libros que hay en el local storage
    static traerLibros(){
        let libros;
        if(localStorage.getItem('libros') === null){
            libros = [];
        } else {
            libros = JSON.parse(localStorage.getItem('libros'))
        }
        return libros;
    }

    static agregarLibro(libro){
        const libros = Datos.traerLibros();
        libros.push(libro);
        localStorage.setItem('libros', JSON.stringify(libros));

    }
    static removerLibro(isbn){

    }
}

var formulario = document.querySelector('#libro-form');
formulario.addEventListener('submit', (e) =>{
    e.preventDefault();
    // obtener valores
    const titulo = document.querySelector('#titulo').value;
    const autor = document.querySelector('#autor').value;
    const isbn = document.querySelector('#isbn').value;

    /*     if(titulo === ''){
            UI.mostrarAlerta('Ingrese el título', 'danger'); //danger es una clase css
        }
        if(autor === ''){
            UI.mostrarAlerta('Ingrese el autor', 'danger'); //danger es una clase css
        }
        if(isbn === ''){
            UI.mostrarAlerta('Ingrese el isbn', 'danger'); //danger es una clase css
        } */

    if(titulo === '' || autor === '' || isbn === ''){
        UI.mostrarAlerta('Ingrese todos los datos del formulario', 'danger'); //danger es una clase css
    } else{
        const libro = new Libro (titulo, autor, isbn);
        Datos.agregarLibro(libro);
        UI.limpiarCampo();
    }
});