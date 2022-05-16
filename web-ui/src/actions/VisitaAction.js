// Importar puente conector de WS
import HttpClient from '../services/HttpClient';

export const listarVisita = (filtro) => {
    return new Promise((resolve, reject) => {
        HttpClient.get(`Visita/consulta`, {
            params: {
                departamentoId : filtro.filtroDepartamentoId, 
                tipoPersonaId : filtro.filtroTipoPersonaId
            }
        }).then(response => {
            resolve(response)
        }).catch(e => resolve(e,reject))
    })
}
export const registrarVisita = (visita) => {
    return new Promise((resolve, reject) => {
        HttpClient.post('Visita/registrar',visita).then(response => {
            resolve(response)
        }).catch(e => resolve(e,reject));
    })
}