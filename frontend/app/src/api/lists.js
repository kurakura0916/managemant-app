import client from './client'

export default {
    reservations: () => {
        return new Promise((resolve, reject) => {
            client.get(`/reservations`)
                .then(res => resolve(res.data))
                .catch(err => {
                    reject(new Error(err.response.data.message || err.message))
                })
        })
    },

    delete_reservation: id => {
        return new Promise((resolve, reject) => {
            client.delete(`/reservations/${id}`)
                .then(res => resolve(res.data))
                .catch(err => {
                    reject(new Error(err.response.data.message || err.message))
                })
        })
    },

    update_reservation: editedItem => {
        return new Promise((resolve, reject) => {
            client.post('/reservations/update', editedItem)
                .then(res => resolve(res.data))
                .catch(err => {
                    reject(new Error(err.response.data.message || err.message))
                })
        })
    }
}
