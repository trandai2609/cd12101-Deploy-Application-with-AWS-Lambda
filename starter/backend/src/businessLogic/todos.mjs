import { TodosAccess } from '../dataLayer/todosAccess.mjs'
import * as uuid from 'uuid'

const todosAccess = new TodosAccess()

export async function getTodos(userId) {
    return todosAccess.getTodosForUser(userId)
}

export async function createTodo(userId, newTodo) {
    const id = uuid.v4()
    const createdAt = new Date().toISOString()


    return todosAccess.createTodo({
        todoId: id,
        userId: userId,
        createdAt: new Date().toISOString(),
        name: newTodo.name,
        dueDate: newTodo.dueDate,
        done: false
    });
}

export async function updateTodo(userId, todoId, updateTodo) {
    return todosAccess.updateTodo(userId, todoId, updateTodo);
}

export async function deleteTodo(userId, todoId) {
    return todosAccess.deleteTodo(userId, todoId)
}

