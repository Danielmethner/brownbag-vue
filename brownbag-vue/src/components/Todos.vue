<template>
  <div>
    <input
      type="text"
      class="form-control"
      placeholder="Log Messages"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <div ref="todoItems" class="todo-item" v-for="(todo, index) in todos" :key="todo.id" >
      <div>
      <div class="todo-item-lbl" v-if="!todo.editing" v-on:dblclick="editTodo(todo)" >{{todo.title}}</div>
      <input class="todo-item-edit form-control" v-focus v-if="todo.editing" type="text" v-model="todo.title" @blur="doneEdit(todo)">
      </div>
      <div class="remove-item" @click="removeTodo(index)">&times;</div>
    </div>
  </div>
</template>

<script>
const focus = {
  inserted(el) {
    el.focus()
  },
}
export default {
  name: "Todos",
  data() {
    return {
      newTodo: "",
      idForTodo: 3,
      todos: [
        { id: 1, title: "my todo", completed: false, editing: false },
        { id: 2, title: "my second todo", completed: false, editing: false }
      ]
    };
  },
  directives: { focus },
  methods: {
    addTodo() {
      if (this.newTodo.length == 0) {
        return;
      }
      this.todos.push({ id: this.idForTodo, title: this.newTodo,editing: false });
      this.newTodo = "";
      this.idForTodo++;
    },
    editTodo(todo) {
      todo.editing = true;
    },
    doneEdit(todo) {
      todo.editing = false;
    },
    removeTodo(index) {
      this.todos.splice(index,1);
    }
  }
};
</script>

<style scoped>
.todo-item {
  align-items: center;
  justify-content: space-between;
  display: flex;
  margin-top: 6px;
  margin-bottom: 6px;
  font-size:20px;
}
.remove-item {
  cursor: pointer;
  margin-right: 14px;
}
.remove-item:hover {
  color:black;
  font-weight: 1000;
}
.todo-item-lbl { 
border: 1px, solid, white;
margin-left:12px;
font-size: 20px;
}
.todo-item-edit  { 
  font-size: 20px;
  color: #2c3e50;
  margin-left: 12px;
  width:100%;
  border: 1px solid #ccc;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>