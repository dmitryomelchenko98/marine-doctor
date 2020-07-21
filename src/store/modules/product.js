import {http} from '../../axios-config.js'

export default {
    state:{
        product: []
    },
    mutations:{
        updateProduct(state, product){
            state.product = product
        }
    },
    actions:{
        async axiosProduct(context){
            const product = await http.get('/products/')
            context.commit('updateProduct', product.data)
        },
        PRODUCTAdd(context, credentials){
            return new Promise((resolve, reject) => {
              http.post('/products/', JSON.stringify(credentials))
              .then(res=>{
                resolve(res)
              })
              .catch(err=>{
                reject(err)
              })
            })
        },
        deleteProduct(ctx, credentials){
            return new Promise((resolve,reject) => {
                http.delete(`/products/${credentials.id}/`)
                .then(res=>{
                    resolve(res)
                })
                .catch(err=>{
                  reject(err)
                })
            })
        },
        addChangesProd(ctx,credentials){
            return new Promise((resolve, reject) => {
                http.patch(`/products/${credentials.id}/`, JSON.stringify(credentials))
                .then(res=>{
                  resolve(res)
                })
                .catch(err=>{
                  reject(err)
                })
            })
        },
        filterProduct(ctx, crenditials){
            http.get(`/products/`, {
                params: crenditials
            })
            .then((res) => {
                ctx.commit('updateProduct', res.data)
            })
        },
        searchProduct(ctx, crenditials){
            http.get(`/products/`, {
                params: crenditials
            })
            .then((res) => {
                ctx.commit('updateProduct', res.data)
            })
        },
    },
    getters:{
        product(state){
            return state.product
        }
    }
}