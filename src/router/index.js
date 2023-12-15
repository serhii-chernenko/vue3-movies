import { createRouter, createWebHistory } from "vue-router";
import { useMoviesStore } from "@/stores/movies";

import Home from "@/pages/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    default: true,
  },
  {
    path: "/movie/:id",
    name: "MovieDetailPage",
    component: () => import("@/pages/MovieDetailPage.vue"),
    props: (route) => {
      const moviesStore = useMoviesStore();
      const movie = moviesStore.getMovieById(route.params.id);

      return movie ? { movie } : {};
    },
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === "/") {
    next();
  }

  if (to.path.match(/\/movie\/\d+/)) {
    const moviesStore = useMoviesStore();
    const movie = moviesStore.movies.find((movie) => {
      return movie.id.toString() === to.params.id.toString();
    });

    if (!movie) {
      next({ name: "Home" });
    }
  }

  next();
});

export default router;
