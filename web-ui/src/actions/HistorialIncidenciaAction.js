import HttpClient from '../services/HttpClient';

export const listarHistorialIncidencia = (filtro) => {
    return new Promise((resolve, reject) => {
        HttpClient.get(`HistorialIncidencia/consulta`, {params: 
            {
                departamentoId : filtro.filtroDepartamentoId
            }
        }).then(response => {
            resolve(response)
        }).catch(e => resolve(e,reject))
    })
}
