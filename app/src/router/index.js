import Vue from 'vue'
import Router from 'vue-router'
import MovieList from '@/components/movies/MovieList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: MovieList
    }
  ]
})
