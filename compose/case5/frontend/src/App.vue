<template>
  <div class="container mt-5">
    <h1>Todo Application</h1>
    <div class="mb-3">
      <input 
        type="text" 
        class="form-control" 
        v-model="newTask" 
        placeholder="Add a new task" 
        @keyup.enter="addTask"
      />
      <button class="btn btn-primary mt-2" @click="addTask">Add Task</button>
    </div>
    
    <div class="mt-4">
      <h3>Tasks</h3>
      <div v-if="loading">Loading tasks...</div>
      <div v-else-if="tasks.length === 0">No tasks found. Add your first task!</div>
      <ul class="list-group">
        <li 
          v-for="task in tasks" 
          :key="task.id" 
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <span :class="{ 'text-decoration-line-through': task.completed }">
            {{ task.title }}
          </span>
          <div>
            <button 
              class="btn btn-sm btn-success me-2" 
              @click="toggleComplete(task.id, !task.completed)"
            >
              {{ task.completed ? 'Undo' : 'Complete' }}
            </button>
            <button 
              class="btn btn-sm btn-danger" 
              @click="deleteTask(task.id)"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      tasks: [],
      newTask: '',
      loading: false
    }
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      this.loading = true;
      try {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        this.tasks = data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        this.loading = false;
      }
    },
    async addTask() {
      if (!this.newTask.trim()) return;
      
      try {
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title: this.newTask })
        });
        
        if (response.ok) {
          this.newTask = '';
          this.fetchTasks();
        } else {
          const errorData = await response.text();
          console.error('Server response:', errorData);
        }
      } catch (error) {
        console.error('Error adding task:', error);
      }
    },
    async toggleComplete(id, completed) {
      try {
        const response = await fetch(`/api/tasks/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ completed })
        });
        
        if (response.ok) {
          this.fetchTasks();
        } else {
          console.error('Server responded with status:', response.status);
          const errorData = await response.text();
          console.error('Error details:', errorData);
        }
      } catch (error) {
        console.error('Error updating task:', error);
      }
    },
    async deleteTask(id) {
      try {
        const response = await fetch(`/api/tasks/${id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          this.fetchTasks();
        } else {
          console.error('Server responded with status:', response.status);
          const errorData = await response.text();
          console.error('Error details:', errorData);
        }
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  }
}
</script>