import {http} from '../../axios-config.js'

export default {
    actions: {
        async axiosPRODUCTION(ctx){
            const productions = await http.get('/productions/')
            ctx.commit('updatePRODUCTIONS', productions.data)
        },
        PRODUCTIONAdd(context, credentials){
            return new Promise((resolve, reject) => {
              http.post('/productions/', JSON.stringify(credentials))
              .then(res=>{
                resolve(res)
              })
              .catch(err=>{
                reject(err)
              })
            })
        },
        deleteProduction(ctx, credentials){
            return new Promise((resolve,reject) => {
                http.delete(`/productions/${credentials.id}/`)
                .then(res=>{
                    resolve(res)
                })
                .catch(err=>{
                  reject(err)
                })
            })
        },
        addChanges(ctx,credentials){
            return new Promise((resolve, reject) => {
                http.put(`/productions/${credentials.id}/`, JSON.stringify(credentials))
                .then(res=>{
                  resolve(res)
                })
                .catch(err=>{
                  reject(err)
                })
            })
        },
        filterProduction(ctx, crenditials){
            http.get(`/productions/`, {
                params: crenditials
            })
            .then((res) => {
                ctx.commit('updatePRODUCTIONS', res.data)
            })
        },
        searchProduction(ctx, crenditials){
            http.get(`/productions/`, {
                params: crenditials
            })
            .then((res) => {
                ctx.commit('updatePRODUCTIONS', res.data)
            })
        },
    },
    mutations: {
        updatePRODUCTIONS(state, productions){
            state.productions = productions
        }
    },
    state: {
        productions: []
    },
    getters: {
        PRODUCTIONS(state){
            return state.productions
        }
    }
}