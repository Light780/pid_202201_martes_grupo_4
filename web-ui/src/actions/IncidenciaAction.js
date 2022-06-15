import HttpClient from '../services/HttpClient';

export const registrarIncidencia = (incidencia) => {
    return new Promise((resolve, reject) => {
        HttpClient.post('Incidencia',incidencia).then(response => {
            resolve(response)
        }).catch(e => {
            resolve(e,reject)
        })
    })
}

export const actualizarIncidencia = (incidencia) => {
    return new Promise((resolve, reject) => {
        HttpClient.put('Incidencia',incidencia).then(response => {
            resolve(response)
        }).catch(e => {
            resolve(e,reject)
        })
    })
}

export const consultarUnico = (id) => {
    return new Promise((resolve,reject) => {
        HttpClient.get(`Incidencia/${id}`).then(response => {
            resolve(response)
        }).catch(e => resolve(e,reject))
    })
}
