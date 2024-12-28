import { createStore } from 'vuex'
import { signin } from './modules/signin'
import { member } from './modules/member'
import { register } from './modules/register'
import {krathong} from './modules/krathong'

export default createStore({
  modules: {
    member,
    signin,
    register,
    krathong

  }
})
