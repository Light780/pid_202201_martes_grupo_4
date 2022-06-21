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

export const listarIncidencia = (filtro) => {
    return new Promise((resolve, reject) => {
        HttpClient.get(`Incidencia/consulta`, {params: 
            {
                departamentoId : filtro.filtroDepartamentoId,
                tipoIncidenciaId : filtro.filtroTipoIncidenciaId,
                estadoIncidenciaId : filtro.filtroEstadoIncidenciaId,
                eliminado: filtro.filtroEliminado
            }
        }).then(response => {
            resolve(response)
        }).catch(e => resolve(e,reject))
    })
}

export const borrarIncidencia = (id) => {
    return new Promise ((resolve,reject) =>{
        HttpClient.delete(`Incidencia/${id}`).then(response =>{
            resolve(response)
        }).catch(e=> resolve ((r,reject)))
    })
}
