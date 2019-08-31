import * as types from './mutation-types'

export default {
    [types.SET_FILTER_QUERY] (state, payload) {
        state.filterQuery = {...payload}
    },

    [types.SAVE_DATA] (state, payload) {
        const editedItem = payload
        const editedIndex = state.reservations.findIndex((v) => v.id === editedItem.id)
        if (editedIndex > -1) {
            Object.assign(state.reservations[editedIndex], editedItem)
        } else {
            state.reservations.push(editedItem)
        }
    },

    [types.DELETE_DATA] (state, payload) {
        const deleteId = payload
        confirm('本当に削除しますか？')
        const deleteIndex = state.reservations.findIndex((v) => v.id === deleteId)
        state.reservations.splice(deleteIndex, 1)
    },

    [types.AUTH_LOGIN] (state, payload) {
        state.auth = payload
    },

    [types.FETCH_RESERVATIONS] (state, payload) {
        state.reservations = payload
    },

    [types.SIGNUP] (state) {
        state.auth.username = null
    }
}
