import React, { useEffect, useState } from 'react';

function Prueba() {    
    const [texto, setTexto] = useState({
        nombre:'',
        apellido:'',
        edad:''
    });
    useEffect(() => {
        console.log(1);
    },[])
    const listado = e => {
        
    }
    const ingresarValores = e => {
        const {name, value} = e.target;
        setTexto(anterior => ({
            ...anterior,
            [name] : value
        }));
    }    
    return (
        <div>
            <input type="text" value={texto.nombre} onChange={ingresarValores} name="nombre"/>
            <input type="text" value={texto.apellido} onChange={ingresarValores} name="apellido"/>
            <input type="text" value={texto.edad} onChange={ingresarValores} name="edad"/>
            <h1>Edad {texto.edad}</h1>
            <h1>Nombre {texto.nombre}</h1>
            <h1>Apellido {texto.apellido}</h1>
        </div>
    );
};

export default Prueba;