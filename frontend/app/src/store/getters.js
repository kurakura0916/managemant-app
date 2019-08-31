export default {
    getFilteredReserveData: state => {
        let data = state.reservations
        if (state.filterQuery.name !== '') {
            let result  = []
            data.forEach(v => {
                if (v.name.indexOf(state.filterQuery.name) > -1) {
                    result.push(v)
                }
            })
            return result
        }

        if (state.filterQuery.store_name !== '') {
            data = data.filter(data => data['store_name'] === state.filterQuery.store_name)
        }

        if (state.filterQuery.visit_date !== '') {
            data = data.filter(data => data['visit_date'] === state.filterQuery.visit_date)
        }

        if (state.filterQuery.status !== '') {
            data = data.filter(data => data['status'] === state.filterQuery.status)
        }
        return data
    },

    getStoreName: state => {
        const stores = []
        for (let i=0; i < state.reservations.length; i++) {
            stores.push(state.reservations[i]['store_name'])
        }
        return stores
    },

    getReservationNum: state => {
        let reservation_num = 0
        let reservation_users = 0

        for (let i=0; i < state.reservations.length; i++) {
            reservation_num += 1
            reservation_users += Number(state.reservations[i]['num'])
        }

        state.reservationCards[0]['num'] = reservation_num
        state.reservationCards[1]['num'] = reservation_users

        return state.reservationCards
    },

    getEventsById: state => id => {
        state.events = []
        let object = {title: '', start: '', end: '', textColor: 'white'}
        const store_id = id
        const targetItem = state.reservations.filter(v => v.store_id === store_id)

        targetItem.forEach(v => {
            object['title'] = v.name
            object['start'] = v.visit_date + ' ' + v.start_time
            object['end'] = v.visit_date + ' ' + v.end_time
            state.events.push(object)
        })

        return state.events
    }
}
