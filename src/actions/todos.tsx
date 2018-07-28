import Todo  from '../models/Todo'

let nextId: number = 0

export enum ActionTypes {
  ADD_TODO = '[todos] ADD_TODO',
  TOGGLE_TODO = '[todos] TOGGLE_TODO'
}

export interface AddTodoAction {
  type: ActionTypes.ADD_TODO,
  payload: { todo: Todo }
}

export interface ToggleTodoAction {
  type: ActionTypes.TOGGLE_TODO,
  payload: { todoId: number }
}

export function addTodo(name: string): AddTodoAction {
  return {
    type: ActionTypes.ADD_TODO,
    payload: {
      todo: {
        id: nextId++,
        name,
        done: false
      }
    }
  }
}

export function toggleTodo(todoId: number): ToggleTodoAction {
  return {
    type: ActionTypes.TOGGLE_TODO,
    payload: { todoId }
  }
}

export type Action = AddTodoAction | ToggleTodoAction
