import Vue from 'vue'
import Router from 'vue-router'
import MovieList from '@/components/movies/MovieList'
import BookList from '@/components/books/BookList'
import MusicList from '@/components/musics/MusicList'
import PhotoList from '@/components/photos/PhotoList'
import MovieDetail from '@/components/movies/MovieDetail'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      component: MovieList
    },
    {
      path: '/musicList',
      component: MusicList
    },
    {
      path: '/photoList',
      component: PhotoList
    },
    {
      path: '/bookList',
      component: BookList
    },
    {
      path:'/movieDetail/:id',
      component:MovieDetail
    }
  ]
})
