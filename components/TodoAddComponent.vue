<template>
  <div>
    <v-text-field label="タイトル" v-model="state.todo.title"></v-text-field>
    <v-textarea label="内容" v-model="state.todo.content"></v-textarea>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="addTodo">追加</v-btn>
    </v-card-actions>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from '@nuxtjs/composition-api'
import { TodoStore } from '~/compositions/use-todo'
import TodoKey from '~/compositions/use-todo-key'

export default defineComponent({
  setup() {
    const { state, addTodo } = inject(TodoKey) as TodoStore
    return {
      state,
      addTodo,
    }
  },
})
</script>
