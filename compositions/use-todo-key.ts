import { InjectionKey } from '@nuxtjs/composition-api'
import { TodoStore } from './use-todo'

const TodoKey: InjectionKey<TodoStore> = Symbol('TodoStore')
export default TodoKey
