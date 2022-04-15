import HttpClient from '../services/HttpClient';

export const registrarPersona = (persona) => {
    return new Promise((resolve,reject) => {
        HttpClient.post('Persona',persona).then(response => {
            resolve(response)
        }).catch( e => {
            console.log(e)
            resolve(e,reject)
        })
    })
}

export const consultarPersona = (id) => {
    return new Promise((resolve,reject) => {
        HttpClient.get(`Persona/${id}`).then(response => {
            resolve(response)
        }).catch(e => resolve(e,reject))
    })
}