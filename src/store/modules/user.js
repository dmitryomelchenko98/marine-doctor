import {http} from '../../axios-config.js'

export default {
    actions: {
        async axiosUser(ctx){
            const user = await http.get('/users/' + localStorage.getItem('id')+ '/')
            ctx.commit('updateUser', user.data)
        },
        userPut(ctx, crenditials){
            return new Promise((resolve,reject) => {
                http.patch('/users/' + localStorage.getItem('id') + '/', JSON.stringify(crenditials))
                .then(res=> {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
            })
        }
    },
    mutations: {
        updateUser(state, user){
            state.user = user
        }
    },
    state: {
        user: []
    },
    getters: {
        USER(state){
            return state.user
        }
    }
}