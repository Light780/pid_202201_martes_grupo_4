import React from 'react';
import {Autocomplete, TextField } from '@mui/material'
const AutoCompleteVisita = ({ onChange, className, error=false, errorMessage, label = "Persona", disabled = false, options, value }) => {        
    return (
        <Autocomplete            
            disabled={disabled}
            fullWidth
            value={value}
            getOptionLabel={(option) => option.nombreCompleto || ""}
            onChange={onChange}
            options={options}
            clearOnBlur={false}
            clearOnEscape={false}
            renderInput={(params) => <TextField {...params} fullWidth label={label} error={error} helperText={errorMessage} className={className}/>}
        />
    );
};

export default AutoCompleteVisita;