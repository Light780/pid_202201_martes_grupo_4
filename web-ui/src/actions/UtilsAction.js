import HttpClient from '../services/HttpClient';
export const listarParametro = (paramId) => {
    return new Promise((resolve, reject) => {
        HttpClient.get(`Parametro/${paramId}`).then(response => {
            resolve(response)
        }).catch(e => resolve(e,reject))
    })
}
