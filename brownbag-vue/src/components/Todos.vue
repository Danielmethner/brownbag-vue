<template>
  <div>
    <input
      type="text"
      class="form-control"
      placeholder="Log Messages"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <div ref="todoItems" class="todo-item" v-for="(todo, index) in todos" :key="todo.id">
        <div class="todo-item-left">
        <input class="todo-item-checkbox" type="checkbox" v-model="todo.completed">
          <div
            class="todo-item-lbl"
            :class="{completed: todo.completed}"
            v-if="!todo.editing"
            v-on:dblclick="editTodo(todo)"
          >{{todo.title}}</div>
          <input
            class="todo-item-edit form-control"
            v-focus
            v-if="todo.editing"
            type="text"
            v-model="todo.title"
            @blur="doneEdit(todo)"
            @keyup.esc="cancelEdit(todo)"
          />
        </div>
      <div class="remove-item" @click="removeTodo(index)">&times;</div>
      
    </div>
    
    <div class="extra-container">
      <div>{{ remaining }} items left</div>
    </div>
  </div>
</template>

<script>
const focus = {
  inserted(el) {
    el.focus();
  }
};
export default {
  name: "Todos",
  data() {
    return {
      newTodo: "",
      idForTodo: 3,
      titlePreEdit: "",
      todos: [
        { id: 1, title: "my todo", completed: false, editing: false },
        { id: 2, title: "my second todo", completed: false, editing: false }
      ]
    };
  },
  computed: {
    remaining(){ 
      return this.todos.filter(todo => !todo.completed).length;
    }},
  directives: { focus },
  methods: {
    addTodo() {
      if (this.newTodo.length == 0) {
        return;
      }
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        editing: false
      });
      this.newTodo = "";
      this.idForTodo++;
    },
    cancelEdit(todo) {
      todo.title = this.titlePreEdit;
      todo.editing = false;
    },
    editTodo(todo) {
      this.titlePreEdit = todo.title;
      todo.editing = true;
    },
    doneEdit(todo) {
      if (todo.title.trim() == "") {
        todo.title = todo.titlePreEdit;
      }
      todo.editing = false;
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    }
  }
};
</script>
<style scoped>
.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.3s;
}
  .todo-item-left { 
    display: flex;
    align-items: center;
  }
.remove-item {
  cursor: pointer;
}
.remove-item:hover {
  color: black;
  font-weight: 1000;
}
.completed { 
      text-decoration: line-through;
    color: grey;
}

.todo-item-lbl {
  border: 1px, solid, white;
  font-size: 20px;
  margin-left: 12px;
  padding: 10px;
}
.todo-item-edit {
    font-size: 24px;
    color: #2c3e50;
    width: 100%;
    border: 1px solid #ccc; 
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
}


  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
  }
  button {
    font-size: 14px;
  }
</style>