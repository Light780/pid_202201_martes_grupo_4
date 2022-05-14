// Importar puente conector de WS
import HttpClient from '../services/HttpClient';

export const listarVisita = (filtro) => {
    return new Promise((resolve, reject) => {
        HttpClient.get(`Persona/consulta`, {
            params: {
                departamentoId : filtro.filtroDepartamentoId, 
                tipoPersonaId : filtro.filtroTipoPersonaId
            }
        }).then(response => {
            resolve(response)
        }).catch(e => resolve(e,reject))
    })
}