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