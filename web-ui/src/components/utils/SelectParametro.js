import React, { useEffect, useState } from 'react';
import { FormHelperText, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { listarParametro } from '../../actions/UtilsAction';
const SelectParametro = ({ name, value, onChange, className, label, error, errorMessage, concepto }) => {
    const [parametros, setParametros] = useState([])
    const [isLoading, setLoading] = useState(true);
    const listarParametrosSelect = () => {
        listarParametro(concepto).then(respuesta => {
            setParametros(respuesta.data)
            setLoading(false)
        })
    }
    useEffect(() => {
        listarParametrosSelect();
    }, [])
    if (isLoading) {
        return <div className="App">Cargando...</div>;
    }
    return (
        <FormControl className={className} error={error}>
            <InputLabel id="seleccionarLabel">{label}</InputLabel>
            <Select labelId="seleccionarLabel" value={value} onChange={onChange} name={name} >
                <MenuItem value="0">
                    <em>Seleccione una opción</em>
                </MenuItem>
                {parametros && parametros.map(parametro => (
                    <MenuItem key={parametro.descripcion} value={parametro.paramId}>{parametro.descripcion}</MenuItem>
                ))}
            </Select>
            {error && <FormHelperText>{errorMessage}</FormHelperText>}
        </FormControl>
    );
};

export default SelectParametro;