import client from './client'

export default {
    // authInfo = {'email': 'aaa@domain.com', 'password': 'hoge'}
    login: authInfo => {
        return new Promise((resolve, reject) =>{
            client.post('/auth/login', authInfo)
                .then(res => resolve({email: res.data.email, token: res.data.token}))
                .catch(error => {
                    reject(new Error(error.response.data.message || error.message))
                })
        })
    },

    signup: authInfo => {
        return new Promise((resolve, reject) => {
            client.post('/auth/signup', authInfo)
                .then(res => resolve({message: res.data.message}))
                .catch(error => {
                    reject(new Error(error.response.data.message || error.message))
                })
        })
    }
}
