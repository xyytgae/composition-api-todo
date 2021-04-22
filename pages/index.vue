<template>
  <div>
    <h1>TODOアプリ</h1>
    <v-card>
      <v-card-title>
        Todoを新規作成
      </v-card-title>
      <v-card-text>
        <TodoAddComponent />

        <v-divider></v-divider>
        <TodosListComponent />
      </v-card-text>
    </v-card>

    <TodoDialogComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from '@nuxtjs/composition-api'
import TodoAddComponent from '@/components/TodoAddComponent.vue'
import TodosListComponent from '@/components/TodosListComponent.vue'
import TodoDialogComponent from '@/components/TodoDialogComponent.vue'
import TodoKey from '@/compositions/use-todo-key'
import useTodo from '@/compositions/use-todo'

export default defineComponent({
  components: {
    TodoAddComponent,
    TodosListComponent,
    TodoDialogComponent,
  },
  setup() {
    provide(TodoKey, useTodo())
    return {}
  },
})
</script>
