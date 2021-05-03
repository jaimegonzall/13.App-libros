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
    static mostrarLibros(){ //consulta los datos
        const libros = Datos.traerLibros();
        libros.forEach((libro) => UI.agregarLibroLista(libro));
    }

    static agregarLibroLista(libro){
        const lista = document.querySelector('#libro-list');
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td>${libro.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        lista.appendChild(fila);
    }

    static eliminarLibro(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove(); //alimino, partiendo del botón, su padre (td) y el padre de este (tr)
        }
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
    static removeLibro(isbn){
        const libros = Datos.traerLibros();
        libros.forEach((libro, index) => {
            if(libro.isbn === isbn){
                libros.splice(index, 1);
            }
        });
        localStorage.setItem('libros', JSON.stringify(libros));
    }
}

//Carga de la página
document.addEventListener('DOMContentLoaded', UI.mostrarLibros);

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
        UI.mostrarAlerta('Libro creado con éxito', 'success');
        Datos.agregarLibro(libro);
        UI.agregarLibroLista(libro);
        UI.limpiarCampo();
    }
});

document.querySelector('#libro-list').addEventListener('click', (e) =>{
    UI.eliminarLibro(e.target);
    // va al botón, va a su padre (td), va a su hermano superior (tc con el isbn) y coge el texto
    Datos.removeLibro(e.target.parentElement.previousElementSibling.textContent);
    UI.mostrarAlerta('Libro eliminado', 'success')
});