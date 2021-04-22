<template>
  <v-dialog v-model="state.dialog" max-width="800">
    <v-card>
      <v-card-title>Todoを編集</v-card-title>
      <v-card-text v-if="state.editingTodo.id">
        <p>
          作成日：{{
            state.editingTodo.createdAt.toDate().toLocaleString('ja')
          }}
        </p>
        <v-checkbox label="完了" v-model="state.editingTodo.done"></v-checkbox>
        <v-text-field
          label="タイトル"
          v-model="state.editingTodo.title"
        ></v-text-field>
        <v-textarea
          label="内容"
          v-model="state.editingTodo.content"
        ></v-textarea>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" @click="state.dialog = false">閉じる</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="warning" @click="preserve()">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, inject } from '@nuxtjs/composition-api'
import { TodoStore } from '~/compositions/use-todo'
import TodoKey from '~/compositions/use-todo-key'

export default defineComponent({
  setup() {
    const { state, preserve } = inject(TodoKey) as TodoStore
    return {
      state,
      preserve,
    }
  },
})
</script>
