import HttpClient from '../services/HttpClient'
export const loginUsuario = (usuario, dispatch) => {
    return new Promise((resolve, reject) => {
        HttpClient.post('Usuario/login', usuario).then(response => {            
            dispatch({
                type:"INICIAR_SESION",
                sesion:response.data,
                autenticado: true
            });
            resolve(response)
        }).catch(error => {
            resolve(error,reject)
        })
    })
}
export const obtenerUsuario = (id, dispatch) => {
    return new Promise((resolve, reject) => {
        HttpClient.get(`Usuario/${id}`).then(response => {            
            dispatch({
                type:'INICIAR_SESION',
                sesion:response.data,
                autenticado:true
            });
            resolve(response)
        }).catch(error => {
            resolve(error,reject)
        })
    })
}
export const actualizarUsuario = (usuario, dispatch) => {
    return new Promise((resolve, reject) => {
        HttpClient.put(`Usuario`,usuario).then(response => {            
            dispatch({
                type:"INICIAR_SESION",
                sesion:response.data,
                autenticado:true
            })
            
            resolve(response)
        }).catch(error => {
            resolve(error,reject)
        })
    })
}