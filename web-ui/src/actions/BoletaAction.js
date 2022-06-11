import HttpClient from '../services/HttpClient';

export const generarBoletas = (boleta) => {
    return new Promise((resolve, reject) => {
        HttpClient.post('Boleta',boleta).then(response => {
            resolve(response)
        }).catch(e => {
            resolve(e,reject)
        })
    })
}