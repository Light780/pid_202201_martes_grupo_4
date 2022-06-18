import HttpClient from '../services/HttpClient';

export  const registrarPago = (pago)=>{
    return new Promise ((resolve ,reject ) => {
        HttpClient.post('Pago',pago).then(response => {
            resolve (response)
        }).catch (e=> {
            resolve(e,reject)
        })
    })
}

export const listarPago = (pagos) =>{
    return new Promise((resolve , reject) =>{
        HttpClient.get('Pago/consulta', {params:{
            pagosId: pagos,
        }
    }).then(response =>{
        resolve(response)
    }).catch(e => resolve(e,reject))
    })
}