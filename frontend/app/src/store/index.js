import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

const state = {
    auth: {
        token: localStorage.getItem('token'),
        email: null
    },

    reservationsHeaders: [
        {text: '予約番号', align: 'left', sortable: false, value: 'id'},
        {text: 'ステータス', value: 'status'},
        {text: '名前', value: 'name'},
        {text: '店舗名', value: 'store_name'},
        {text: '予約人数', value: 'num'},
        {text: '来店日', value: 'visit_date'},
        {text: '編集', value: 'action'}
    ],

    reservations: [],

    filterQuery: {},

    reservationCards: [
        {title: '予約件数', flex: 6, num: 0},
        {title: '予約人数', flex: 6, num: 0}
    ],
    events: []
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})
