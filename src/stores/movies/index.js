import { defineStore } from "pinia";
import items from "@/movies.json";

export const useMoviesStore = defineStore("movies", {
  state: () => {
    return {
      movies: items.items,
      genres: items.genres,
    };
  },
  actions: {
    getMovieById(id) {
      return this.movies.find((movie) => movie.id.toString() === id.toString());
    },

    addMovie(movie) {
      movie && this.movies.push(movie);
    },

    updateMovieById(id, movie) {
      if (!movie) {
        return;
      }

      const index = this.movies.findIndex(
        (movie) => movie.id.toString() === id.toString()
      );

      if (!index) {
        return;
      }

      this.movies[index] = {
        ...this.movies[index],
        ...movie,
      };
    },

    deleteMovieById(id) {
      if (!id) {
        return;
      }

      const index = this.movies.findIndex(
        (movie) => movie.id.toString() === id.toString()
      );

      this.movies.splice(index, 1);
    },
  },
});
