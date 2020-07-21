import {http} from '../../axios-config.js'

export default {
    actions: {
        async axiosSALES(ctx) {
            const sales = await http.get('/sales/')
            ctx.commit('updateSALES', sales.data)
        },
        SALESAdd(context, credentials){
            return new Promise((resolve, reject) => {
              http.post('/sales/', JSON.stringify(credentials))
              .then(res=>{
                resolve(res)
              })
              .catch(err=>{
                reject(err)
              })
            })
        },
        deleteSale(ctx, credentials){
            return new Promise((resolve,reject) => {
                http.delete(`/sales/${credentials.id}/`)
                .then(res=>{
                    resolve(res)
                })
                .catch(err=>{
                  reject(err)
                })
            })
        },
        addChangesSale(ctx,credentials){
            return new Promise((resolve, reject) => {
                http.patch(`/sales/${credentials.id}/`, JSON.stringify(credentials))
                .then(res=>{
                  resolve(res)
                })
                .catch(err=>{
                  reject(err)
                })
            })
        },
        filterSale(ctx, crenditials){
            http.get(`/sales/`, {
                params: crenditials
            })
            .then((res) => {
                ctx.commit('updateSALES', res.data)
            })
        },
        searchSale(ctx, crenditials){
            http.get(`/sales/`, {
                params: crenditials
            })
            .then((res) => {
                ctx.commit('updateSALES', res.data)
            })
        },
    },
    mutations: {
        updateSALES(state, sales){
            state.sales = sales
        }
    },
    state: {
        sales: []
    },
    getters: {
        SALES(state){
            return state.sales
        }
    }
}