import {http} from '../../axios-config.js'

export default {
    state: {
        token: localStorage.getItem('authorization_token') || null,
        id: localStorage.getItem('id') || null,
    },
    mutations: {
        sing_in(state, token, id){
            state.token = token;
            state.id = id;
        },
        sign_out(state){
            state.token = null;
            state.id = null;
        }
    },
    actions:{
        sing_in(context, credentials){
            return new Promise((resolve, reject) => {
                http.post('/auth/signin/',{
                    email: credentials.email,
                    password: credentials.password
                })
                .then(res => {
                    const token = res.data.authorization_token;
                    const id = res.data.id;
                    localStorage.setItem('authorization_token', token);
                    localStorage.setItem('id', id)
                    context.commit('sing_in', { token, id })
                    resolve(res)
                })
                .catch(error => {
                    console.log('error')
                    reject(error)
                    alert("Логин или пароль не верен")
                })
            })
        },
        sign_out(context){
            localStorage.clear();
            context.commit('sign_out')
        }
    },
    getters: {
        Auth(state) {
           return state.token
        }
    }
}