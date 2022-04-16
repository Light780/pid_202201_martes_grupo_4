import React from 'react';
import { FormHelperText, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
const SelectSexo = ({ name, value, onChange, className, error, errorMessage}) => {
    return (
        <FormControl className={className} error={error} required>
            <InputLabel id="seleccionarLabel">Sexo</InputLabel>
            <Select labelId="seleccionarLabel" value={value} onChange={onChange} name={name} >
                <MenuItem value="">
                    <em>Ninguno</em>
                </MenuItem>
                <MenuItem key='M' value='M'>Masculino</MenuItem>
                <MenuItem key='F' value='F'>Femenino</MenuItem>
            </Select>
            {error && <FormHelperText>{errorMessage}</FormHelperText>}
        </FormControl>
    );
};

export default SelectSexo;