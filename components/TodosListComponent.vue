<template>
  <div>
    <v-data-table :headers="state.headers" :items="state.todos">
      <template v-slot:[`item.done`]="{ item }">
        <v-checkbox
          v-model="item.done"
          @change="finish(item.id, item.done)"
        ></v-checkbox>
      </template>
      <template v-slot:[`item.id`]="{ item }">
        <v-btn color="green" @click="edit(item.id)" dark>編集</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from '@nuxtjs/composition-api'
import { TodoStore } from '~/compositions/use-todo'
import TodoKey from '~/compositions/use-todo-key'

export default defineComponent({
  setup() {
    const { state, edit, getTodos, finish } = inject(TodoKey) as TodoStore
    return {
      state,
      edit,
      getTodos,
      finish,
    }
  },
})
</script>
