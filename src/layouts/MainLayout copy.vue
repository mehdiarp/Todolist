<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <div>
          <div class="q-px-lg q-pt-lx q-mb-md"></div>
          <div class="text-h3">Todo</div>
          <div class="text-subtitle1">{{ todaysDate }}</div>
        </div>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
        <q-img src="icons/montains.jpg" class="header-image absolute-top" />
        <q-space />
        <!-- <q-input v-model="search" debounce="500" filled placeholder="Search" /> -->
        <!-- <div id="app">
          <div class="search-wrapper panel-heading col-sm-12">
            <input type="text" v-model="search" placeholder="Search" /> <br />
            <br /> -->
        <!-- </div>
          <table class="table" id="myTable">
            <thead>
              <tr>
                <th>tasks</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tasks in filteredTasks" :key="tasks">
                <td>{{ tasks }}</td>
              </tr>
            </tbody>
          </table>
        </div> -->
        <q-toggle
          v-model="lightTheme"
          checked-icon="light_mode"
          color="amber"
          unchecked-icon="nights_stay"
          @update:model-value="toggleTheme"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      :breakpoint="600"
    >
      <q-scroll-area
        style="
          height: calc(100% - 192px);
          margin-top: 192px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item to="/v2" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="list" />
              <!-- <q-icon name="mdi-star" /> -->
            </q-item-section>

            <q-item-section> Todo </q-item-section>
          </q-item>
          <q-item to="/help" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="help" />
            </q-item-section>

            <q-item-section> Help </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="icons/montains.jpg"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">mehdi arp</div>
          <div>frontend</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import { date } from "quasar";
import EssentialLink from "components/EssentialLink.vue";

const linksData = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

export default {
  name: "MainLayout",
  components: {
    // EssentialLink,
  },
  data() {
    return {
      leftDrawerOpen: false,
      // essentialLinks: linksData,
      lightTheme: true,
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
    todaysDate() {
      const timeStamp = Date.now();
      return date.formatDate(timeStamp, "dddd D MMMM");
    },

    // filteredTasks() {
    //   return this.tasks.filter((task) => {
    //     //     // return true if the product should be visible
    //     //     // in this example we just check if the search string
    //     //     // is a substring of the product name (case insensitive)
    //     return task.title.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
    //   });
    // },
  },

  methods: {
    toggleTheme() {
      this.$q.dark.toggle();
      localStorage.setItem("lightTheme", JSON.stringify(this.lightTheme));
    },
  },
  created() {
    let light = JSON.parse(localStorage.getItem("lightTheme"));
    if (light !== null && light !== undefined) {
      this.lightTheme = light;
    }
    if (this.lightTheme === false) {
      this.$q.dark.set(true);
    }
  },
};
</script>
<style lang="scss">
.header-image {
  height: 100%;
  z-index: -1;
  opacity: 0.2;
  filter: grayscale(100%);
}
</style>
