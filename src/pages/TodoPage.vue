<template>
  <q-page class="bg-gray-3 column">
    <div class="q-pa-sm bg-primary">
      <q-input
        v-model="newTask"
        @keyup.enter="addTask"
        class="col"
        square
        filled
        bg-color="white"
        placeholder="add task"
        maxlength="12"
        dense
      >
        <template v-slot:append>
          <q-btn
            @click="addTask"
            :disable="!newTask"
            round
            dense
            flat
            icon="add"
          />
        </template>
      </q-input>
    </div>
    <div class="q-pa-sm bg-primary">
      <q-input
        v-model="search"
        class="col"
        square
        filled
        bg-color="white"
        placeholder="search"
        dense
      >
      </q-input>
    </div>
    <q-list separator bordered>
      <transition-group
        appear
        enter-active-class="animated fadeInDown"
        leave-active-class="animated fadeOutRight"
      >
        <q-item
          v-for="(task, index) in filteredTasks"
          :key="index"
          @click="task.done = !task.done"
          :class="{ 'done bg-blue-1': task.done }"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-checkbox
              v-model="task.done"
              class="no-pointer-events"
              color="primary"
            />
          </q-item-section>
          <q-item-section avatar>
            <q-btn
              :id="'favorite' + index"
              @click.stop="makeFavorite(index)"
              :icon="task.favorite ? 'mdi-star' : 'mdi-star-outline'"
              color="amber"
              round
              size="md"
              dense
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ task.title }}</q-item-label>
          </q-item-section>
          <q-item-section v-if="task.done" side>
            <q-btn
              @click.stop="deleteTask(index)"
              flat
              round
              dense
              color="primary"
              icon="delete"
            />
          </q-item-section>
        </q-item>
      </transition-group>
    </q-list>
    <div v-if="!tasks.length" class="no-tasks absolute-center">
      <q-icon name="check" size="100px" color="primary" />
      <div class="text-h5 text-primary text-center">no tasks</div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      newTask: "",
      tasks: [],
      search: "",
      // products: [
      //   { id: 1, name: "Foo" },
      //   { id: 2, name: "Bar" },
      //   { id: 3, name: "Baz" },
      //   { id: 4, name: "Foobar" },
      // ],
      // search: "",
    };
  },
  computed: {
    filteredTasks() {
      return this.tasks.filter((task) => {
        //     // return true if the product should be visible
        //     // in this example we just check if the search string
        //     // is a substring of the product name (case insensitive)
        return (
          task.title.toLowerCase().indexOf(this.search.toLowerCase()) != -1
        );
      });
    },
  },
  methods: {
    deleteTask(index) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to delete this?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.tasks.splice(index, 1);
          this.$q.notify("task deleted");
        });
    },
    addTask() {
      if (this.newTask) {
        console.log("addTask");
        this.tasks.push({
          title: this.newTask,
          done: false,
        });
        this.newTask = "";
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
      }
    },
    makeFavorite(index) {
      this.tasks[index].favorite = !this.tasks[index].favorite;
      let favoriteItem = document.getElementById("favorite" + index);
      // console.log("favoriteItem");
      // console.log(favoriteItem);
      favoriteItem.classList.add("animated", "shakeY");
      // favoriteItem.classList.add("shakeY");
      setTimeout(() => {
        favoriteItem.classList.remove("animated", "shakeY");
        // favoriteItem.classList.remove("animated");
      }, 500);
    },
  },
  created() {
    let storageTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storageTasks && storageTasks.length > 0) {
      this.tasks = storageTasks;
    }
  },
});
</script>
<style lang="scss">
.done {
  .q-item__label {
    text-decoration: line-through;
    color: #bbb;
  }
}
.no-tasks {
  opacity: 0.5;
}
</style>
