import { todoList } from "..";
import { Todo, TodoList } from "../classes";

//archivo para crear cosas en el html
// Referencias al html
const divTodoList = document.querySelector('.todo-list');
const textInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtros')

export const crearTodoHtml = (todo) => {

    const htmlTodo = `<li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
    <div class="view">
        <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''} >
        <label>${todo.tarea}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);// no quiero imprimir todo el 'div' sino el <li> que es el primer hijo del elemento
    return div.firstElementChild;

};


//Eventos

textInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && textInput.value.length > 0) {
        const nuevoTodo = new Todo(textInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        textInput.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName;//identifar a que le hago click dentro del elemento//input, label, button
    const todoElemento = event.target.parentElement.parentElement;// para localizar el <li> que contiene la data
    const todoId = todoElemento.getAttribute('data-id');//extraigo el attr data-id

    if (nombreElemento.includes('input')) {
        todoList.marcarCompletadoTodo(todoId);//si lo tiene se lo mando a la class selecciaonda
        todoElemento.classList.toggle('completed');// para lograr el tachado el elemento

    } else if (nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);//eliminar elemento del html

    }
    console.log(todoList);
});

btnBorrar.addEventListener('click', () => {//para borrar los elementos debemos barrer dew abajo para arriba los elementos hijos de divtodolist
    todoList.eliminarCompletados();

    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];

        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);

        }
    }
});

ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;
    console.log(event.target.text);
    if (!filtro) {// esta validacion es por si tocamos en otro lado que no sea un boton y no traiga un undefined
        return;
    }

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));//recorro el elemento y le remuevo el 'selected'
    event.target.classList.add('selected');
    
    for (const elemento of divTodoList.children) {

        elemento.classList.remove('hidden');// remuevo la clase para que se muestren
        const completado = elemento.classList.contains('completed');//selecciono a los completados

        switch (filtro) {//de acuerdo al switch le ponemos o sacamos el atr hidden
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;

            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;
        }

    }

});


