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

export const listarBoleta = (filtro) =>{
    return new Promise((resolve, reject) =>{
        HttpClient.get('Boleta/consulta', {params:{
           departamentoId : filtro.filtroDepartamentoId,
           anio   : filtro.filtroAnio,
           estadoId: filtro.filtroEstadoId
        }
        }).then(response =>{
            resolve(response)
        }).catch(e => resolve(e,reject)) 
    })         
}