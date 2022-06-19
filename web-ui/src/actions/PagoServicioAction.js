import HttpClient from '../services/HttpClient';

export const registrarPago = (pago)=>{
    return new Promise ((resolve ,reject ) => {
        HttpClient.post('PagoServicio',pago).then(response => {
            resolve (response)
        }).catch (e=> {
            resolve(e,reject)
        })
    })
}

export const listarPagos = (boleta) =>{
    return new Promise((resolve , reject) =>{
        HttpClient.get('PagoServicio', {params:{
            boletaId: boleta.boletaId,
        }
    }).then(response =>{
        resolve(response)
    }).catch(e => resolve(e,reject))
    })
}