import { Todo } from ".";

export class TodoList {

    constructor() {
        this.cargarLocalStorage();
        //this.todos = [];
    }

    nuevoTodo(todo) {
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    eliminarTodo(id) {
        this.todos = this.todos.filter(todo => todo.id != id);// regresa un array nuevo con todos los ids que no vengn como parametro y lo almacena en this.todo--
        this.guardarLocalStorage();
    }

    marcarCompletadoTodo(id) {
        for (const todo of this.todos) {
            console.log(id, todo.id);
            if (todo.id == id) {
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }

        }

    }

    eliminarCompletados() {
        this.todos = this.todos.filter(todo => !todo.completado);
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {
        localStorage.setItem('todo', JSON.stringify(this.todos));//tengo que guardarlo en modo string por eso uso el JSON

    }

    cargarLocalStorage() {//proceso inverso para transformar string a arrays
        this.todos = (localStorage.getItem('todo'))  // me retorna un objeto literal y necesito que sea una instancia
            ? JSON.parse(localStorage.getItem('todo'))
            : [];
        this.todos = this.todos.map(obj => Todo.fromJson( obj ));// aca lo traansformo a una instancia con el fromJson


    }


}