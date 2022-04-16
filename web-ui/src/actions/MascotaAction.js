import HttpClient from '../services/HttpClient';

export const registrarMascota= (mascota) => {
    return new Promise((resolve,reject) => {
        HttpClient.post('Mascota',mascota).then(response => {
            resolve(response)
        }).catch( e => {
            console.log(e)
            resolve(e,reject)
        })
    })
}

export const actualizarMascota = (mascota) => {
    return new Promise((resolve, reject) => {
        HttpClient.put('Mascota',mascota).then(response => {
            resolve(response)
        }).catch(e => {
            console.log(e)
            resolve(e,reject)
        })
    })
}

export const listarMascota = (departamentoId) => {
    return new Promise((resolve, reject) => {
        HttpClient.get(`Mascota/consulta`, {params: {departamentoId : departamentoId}}).then(response => {
            resolve(response)
        }).catch(e => resolve(e,reject))
    })
}

export const borrarMascota= (id) => {
    return new Promise((resolve,reject) => {
        HttpClient.delete(`Mascota/${id}`).then(response => {
            resolve(response)
        }).catch(e => resolve(e,reject))
    })
}

export const consultarUnico = (id) => {
    return new Promise((resolve,reject) => {
        HttpClient.get(`Mascota/${id}`).then(response => {
            resolve(response)
        }).catch(e => resolve(e,reject))
    })
}