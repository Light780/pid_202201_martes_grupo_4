import HttpClient from '../services/HttpClient';
export const listarParametro = (paramId) => {
    return new Promise((resolve, reject) => {
        HttpClient.get(`Util/${paramId}`).then(response => {
            resolve(response)
        }).catch(e => resolve(e,reject))
    })
}
export const consultarCantidades = () => {
    return new Promise((resolve, reject) => {
        HttpClient.get("Util").then(response => {
            resolve(response)
        }).catch(error => resolve(error,reject))
    })
}
