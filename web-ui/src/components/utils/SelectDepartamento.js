import React, { useEffect, useState } from 'react';
import { FormHelperText, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { listarDepartamento } from '../../actions/DepartamentoAction';
const SelectDepartamento = ({ name, value, onChange, className, error, errorMessage}) => {
    const [departamentos, setDepartamentos] = useState([])
    const [isLoading, setLoading] = useState(true);
    const listarDepartamentosSelect = () => {
        listarDepartamento().then(respuesta => {
            setDepartamentos(respuesta.data)
            setLoading(false)
        })
    }
    useEffect(() => {
        listarDepartamentosSelect();
    }, [])
    if (isLoading) {
        return <div className="App">Cargando...</div>;
    }
    return (
        <FormControl className={className} error={error}>
            <InputLabel id="seleccionarLabel">Departamento</InputLabel>
            <Select labelId="seleccionarLabel" value={value} onChange={onChange} name={name} >
                <MenuItem value="0">
                    <em>Seleccione una opción</em>
                </MenuItem>
                {departamentos && departamentos.map(departamento => (
                    <MenuItem key={departamento.departamentoId} value={departamento.departamentoId}>{departamento.nroDepartamento}</MenuItem>
                ))}
            </Select>
            {error && <FormHelperText>{errorMessage}</FormHelperText>}
        </FormControl>
    );
};

export default SelectDepartamento;