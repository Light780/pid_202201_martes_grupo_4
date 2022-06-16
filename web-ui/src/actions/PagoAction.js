import HttpClient from '../services/HttpClient';

export  const generarPagos = (pago)=>{
    return new Promise ((resolve ,reject ) => {
        HttpClient.post('Pago',pago).then(response => {
            resolve (response)
        }).catch (e=> {
            resolve(e,reject)
        })
    })
}

export const listarPago = (filtro) =>{
    return new Promise((resolve , reject) =>{
        HttpClient.get('Pago/consulta', {params:{
            Boleta : filtro.filtroBoleta,
            fechaPago : filtro.filtroFechaPago
        }
    }).then(response =>{
        resolve(response)
    }).catch(e => resolve(e,reject))
    })
}