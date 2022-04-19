import HttpClient from '../services/HttpClient';

export const registrarDepartamento = (departamento) => {
    return new Promise((resolve,reject) => {
        HttpClient.post('Departamento',departamento).then(response => {
            resolve(response)
        }).catch( e => {            
            resolve(e,reject)
        })
    })
}

export const actualizarDepartamento = (departamento) => {
    return new Promise((resolve, reject) => {
        HttpClient.put('Departamento',departamento).then(response => {
            resolve(response)
        }).catch(e => {            
            resolve(e,reject)
        })
    })
}

export const listarDepartamento = (tipoDepaId) => {
    return new Promise((resolve, reject) => {
        HttpClient.get(`Departamento/consulta`, {params: {tipoDepaId : tipoDepaId}}).then(response => {
            resolve(response)
        }).catch(e => resolve(e,reject))
    })
}

export const borrarDepartamento = (id) => {
    return new Promise((resolve,reject) => {
        HttpClient.delete(`Departamento/${id}`).then(response => {
            resolve(response)
        }).catch(e => resolve(e,reject))
    })
}

export const consultarUnico = (id) => {
    return new Promise((resolve,reject) => {
        HttpClient.get(`Departamento/${id}`).then(response => {
            resolve(response)
        }).catch(e => resolve(e,reject))
    })
}