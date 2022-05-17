import React, { useEffect, useState } from 'react';
import { FormHelperText, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { listarPersona } from '../../actions/PersonaAction';
const SelectPersona = ({ name, value, onChange, className, error, errorMessage, label="Persona", disabled=false}) => {
    const [personas, setPersonas] = useState([])
    const [isLoading, setLoading] = useState(true);
    const listarPersonasSelect = () => {
        listarPersona({
            filtroDepartamentoId:0,
            filtroTipoPersonaId:0,
            filtroEliminado:0     
        }).then(respuesta => {
            setPersonas(respuesta.data.filter(persona => persona.tipoPersonaId !== 3))
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
        <FormControl className={className} error={error} required>
            <InputLabel id="seleccionarLabel">{label}</InputLabel>
            <Select disabled={disabled} labelId="seleccionarLabel" value={value} onChange={onChange} name={name} >
                <MenuItem value="0" disabled={!disabled}>
                    <em>Seleccione una opción</em>
                </MenuItem>
                {personas && personas.map(persona => (
                    <MenuItem key={persona.personaId} value={persona.personaId}>
                        {persona.nombreCompleto} - Dep. {persona.departamento}
                    </MenuItem>
                ))}
            </Select>
            {error && <FormHelperText>{errorMessage}</FormHelperText>}
        </FormControl>
    );
};

export default SelectPersona;