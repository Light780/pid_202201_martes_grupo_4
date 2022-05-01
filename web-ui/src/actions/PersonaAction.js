import HttpClient from '../services/HttpClient';

export const registrarPersona = (persona) => {
    return new Promise((resolve,reject) => {
        HttpClient.post('Persona',persona).then(response => {
            resolve(response)
        }).catch( e => {            
            resolve(e,reject)
        })
    })
}

export const actualizarPersona = (persona) => {
    return new Promise((resolve,reject) => {
        HttpClient.put('Persona',persona).then(response => {
            resolve(response)
        }).catch(e => {
            console.log(e)
            resolve(e,reject)
        })
    })
}
export const listarPersona = (filtro) => {
    return new Promise((resolve, reject) => {
        HttpClient.get(`Persona/consulta`, {
            params: {
                departamentoId : filtro.filtroDepartamentoId, 
                tipoPersonaId : filtro.filtroTipoPersonaId,
                eliminado     : filtro.filtroEliminado
            }
        }).then(response => {
            resolve(response)
        }).catch(e => resolve(e,reject))
    })
}
export const borrarPersona = (id) => {
    return new Promise((resolve,reject) => {
        HttpClient.delete(`Persona/${id}`).then(response => {
            resolve(response)
        }).catch(e => resolve(e,reject))
    })
}


export const consultarUnico = (id) => {
    return new Promise((resolve,reject) => {
        HttpClient.get(`Persona/${id}`).then(response => {
            resolve(response)
        }).catch(e => resolve(e,reject))
    })
}