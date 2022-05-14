import React, { useEffect, useState } from 'react';
import {Autocomplete, TextField } from '@mui/material'
import { listarPersona } from '../../actions/PersonaAction';
const AutoCompletePersona = ({ onChange, className, error=false, errorMessage="", label = "Persona", disabled = false }) => {
    const [personas, setPersonas] = useState([])
    const [isLoading, setLoading] = useState(true);
    const listarPersonasSelect = () => {
        listarPersona({
            filtroDepartamentoId: 0,
            filtroTipoPersonaId: 0,
            filtroEliminado: 0
        }).then(respuesta => {
            let arrayPersona = []            
            respuesta.data.map(persona => {                
                if(persona.tipoPersona === "Posible Visita"){
                    arrayPersona.push({personaId:persona.personaId, nombreCompleto:persona.nombreCompleto, documento:persona.documento})
                }                
            })
            setPersonas(arrayPersona);
            setLoading(false)
        })
    }
    useEffect(() => {
        listarPersonasSelect();
    }, [])
    if (isLoading) {
        return <div className="App">Cargando...</div>;
    }
    return (
        <Autocomplete            
            disabled={disabled}
            fullWidth
            getOptionLabel={(option) => option.documento || ""}
            onChange={onChange}
            options={personas}
            renderInput={(params) => <TextField {...params} fullWidth label={label} error={error} helperText={errorMessage} className={className}/>}
        />
    );
};

export default AutoCompletePersona;