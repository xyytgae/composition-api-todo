import { reactive, onMounted } from '@nuxtjs/composition-api'
import firebase from 'firebase/app'
export type FirestoreTimestamp = firebase.firestore.Timestamp

interface Todo {
  id?: string
  title?: string
  content?: string
  done?: boolean
  createdAt?: number | FirestoreTimestamp
}

export default function useTodo() {
  // 状態
  const state = reactive<{
    headers: object[]
    todo: Todo
    todos: Todo[]
    editingTodo: Todo
    dialog: boolean
  }>({
    headers: [
      {
        text: '完了',
        value: 'done',
      },
      {
        text: 'タイトル',
        value: 'title',
      },
      {
        text: '内容',
        value: 'content',
      },
      {
        text: '編集',
        value: 'id',
      },
    ],
    todo: {
      title: '',
      content: '',
      done: false,
    },
    todos: [],
    editingTodo: {
      id: '',
      title: '',
      content: '',
      done: false,
      createdAt: Date.now(),
    },
    dialog: false,
  })

  // ロジック

  // Todoを新規作成
  const addTodo = () => {
    const params: Todo = {
      createdAt: firebase.firestore.FieldValue.serverTimestamp() as FirestoreTimestamp,
      ...state.todo,
    }
    firebase
      .firestore()
      .collection('todos')
      .add(params)
      // .doc()
      // .set(params)
      .then(() => {
        state.todo = { title: '', content: '', done: false }
      })
  }

  // Todoを編集
  const edit = (id: string) => {
    const todo = state.todos.find((todo: Todo) => todo.id === id)

    // 値渡しを防ぐ処理
    state.editingTodo = Object.assign({}, todo)
    state.dialog = true
  }

  // Todosを取得、リアルタイムでTodosを更新
  const getTodos = () => {
    firebase
      .firestore()
      .collection('todos')
      .orderBy('createdAt', 'asc')
      .onSnapshot(todossnapshot => {
        todossnapshot.docChanges().forEach(snapshot => {
          const docData: Todo = {
            id: snapshot.doc.id,
            ...snapshot.doc.data(),
          }

          switch (snapshot.type) {
            case 'added':
              add(docData)
              break
            case 'modified':
              update(docData)
              break
            case 'removed':
              remove(docData)
              break
          }
        })
      })
  }

  // 値が追加された場合にリアルタイムで更新する処理
  const add = (docData: Todo) => {
    const isNotAdded = !state.todos.find((todo: Todo) => todo.id === docData.id)

    if (isNotAdded) {
      state.todos.push(docData)
    }
  }

  // 値が変更された場合にリアルタイムで更新する処理
  const update = (docData: Todo) => {
    state.todos = state.todos.map((todo: Todo) => {
      if (todo.id === docData.id) {
        todo = docData
      }
      return todo
    })
  }

  // 値が削除された場合にリアルタイムで更新する処理
  const remove = (docData: Todo) => {
    state.todos = state.todos.filter((todo: Todo) => todo.id !== docData.id)
  }

  const preserve = () => {
    firebase
      .firestore()
      .collection('todos')
      .doc(state.editingTodo?.id)
      .update({
        content: state.editingTodo?.content,
        title: state.editingTodo?.title,
        done: state.editingTodo?.done,
      })

    state.dialog = false
  }

  // 完了を切り替える
  const finish = (id: string, done: boolean) => {
    firebase
      .firestore()
      .collection('todos')
      .doc(id)
      .update({
        done,
      })
  }

  onMounted(() => {
    getTodos()
  })

  return {
    state,
    addTodo,
    edit,
    getTodos,
    preserve,
    finish,
    onMounted,
  }
}

export type TodoStore = ReturnType<typeof useTodo>
