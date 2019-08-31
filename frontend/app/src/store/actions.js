import { Auth, Lists } from '../api'
import * as types from './mutation-types'

export default {
    // authInfo = {'email': 'aaa@domain.com', 'password': 'hoge'}
    login: ({commit}, authInfo) =>{
        return Auth.login(authInfo)
            .then(({email, token}) => {
                localStorage.setItem('token', token)
                commit(types.AUTH_LOGIN, {token, email})
            })
            .catch(err => {throw err})
    },

    signup: ({commit}, authInfo) => {
      return Auth.signup(authInfo)
          .then(() => {
              localStorage.removeItem('token')
              commit(types.SIGNUP)
          })
          .catch(err => {throw err})
    },

    fetchReservations: ({commit}) => {
        return Lists.reservations()
            .then(response => {
                commit(types.FETCH_RESERVATIONS, response)
            })
            .catch(err => {throw err})
    },

    deleteReservation: ({commit}, id) => {
        return Lists.delete_reservation(id)
            .then(() => {
                commit(types.DELETE_DATA, id)
            })
            .catch(err => {throw err})
    },

    updateReservation: ({commit}, editItem) => {
        return Lists.update_reservation(editItem)
            .then(() => {
                commit(types.SAVE_DATA, editItem)
            })
            .catch(err => {throw err})
    }
}
