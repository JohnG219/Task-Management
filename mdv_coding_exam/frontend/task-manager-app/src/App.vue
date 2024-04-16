<template>
  <div class="form-container">
    <button
      type="button"
      class="btn btn-primary m-2 float-end"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      @click="resetNewTask"
    >
      Add
    </button>

    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-hidden="true"
      ref="editModal"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ editingTask ? "Edit Task" : "Add Task" }}
            </h5>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="resetEditingTask"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editingTask ? updateTask() : createTask()">
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control"
                  v-model="newTask.title"
                  placeholder="Title"
                  required
                />
              </div>

              <div class="mb-3">
                <input
                  type="text"
                  class="form-control"
                  v-model="newTask.status"
                  placeholder="Status"
                  required
                />
              </div>

              <button type="submit" class="btn btn-primary">
                {{ editingTask ? "Update Task" : "Create Task" }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <h2>List of Tasks:</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.title }}</td>
          <td>
            <span class="badge bg-primary rounded-pill">{{ task.status }}</span>
          </td>
          <td>
            <button
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              @click="editTask(task)"
              class="btn btn-light"
            >
              Edit
            </button>
            <button @click="deleteTask(task.id)" class="btn btn-danger">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { apiUrl } from "./server.json";

export default {
  data() {
    return {
      tasks: [],
      newTask: { title: "", status: "" },
      editingTask: null,
    };
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    fetchTasks() {
    axios
      .get(`${apiUrl}`)
      .then((response) => {
        this.tasks = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
    },
    createTask() {
      axios
        .post(`${apiUrl}`, this.newTask)
        .then((response) => {
          console.log(response.data.msg);
          this.fetchTasks();
          this.newTask = { title: "", status: "" };
          window.alert("Task create success!");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    updateTask() {
      axios
        .put(
          `${apiUrl}/${this.editingTask.id}`,
          this.newTask
        )
        .then((response) => {
          console.log(response.data.msg);
          this.fetchTasks();
          this.newTask = { title: "", status: "" };
          this.editingTask = null;
          window.alert("Task updated successfully!");
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    deleteTask(taskId) {
      axios
        .delete(`${apiUrl}/${taskId}`)
        .then((response) => {
          console.log(response.data.msg);
          this.fetchTasks();
          window.alert("The task was deleted successfully!");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    resetNewTask() {
      this.newTask = { title: "", status: "" };
    },
    resetEditingTask() {
      this.editingTask = null;
    },
    editTask(task) {
      this.editingTask = task;
      this.newTask.title = task.title;
      this.newTask.status = task.status;

      // Show the modal
      this.$refs.editModal.classList.add("show");
      this.$refs.editModal.style.display = "block";
    },
  },
};
</script>

<style>
.modal-dialog {
  max-width: 500px;
}

.modal-header {
  border-bottom: 1px solid #dee2e6;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.form-control {
  margin-bottom: 1rem;
}

.btn-primary {
  margin-right: 0.5rem;
}

.list-group-item {
  margin-top: 1rem;
}

.form-container {
  max-width: 700px;
  margin: 0 auto;

  .table {
    width: 100%;
    border-collapse: collapse;
  }
  th,
  td {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
    color: #333;
  }
  .badge {
    font-size: 12px;
    padding: 3px 6px;
  }
}
</style>