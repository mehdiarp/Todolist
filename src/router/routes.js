const routes = [
  {
    path: "/v1",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout copy.vue"),
    children: [
      { path: "", component: () => import("src/pages/TodoPage.vue") },
      { path: "/help", component: () => import("src/pages/HelpPage.vue") },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
