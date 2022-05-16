import React from 'react';
import {Autocomplete, TextField } from '@mui/material'
const AutoCompletePersona = ({ onChange, className, error=false, errorMessage, label = "Persona", disabled = false, options, value }) => {        
    return (
        <Autocomplete            
            disabled={disabled}
            fullWidth
            value={value}
            getOptionLabel={(option) => option.documento || ""}
            onChange={onChange}
            options={options}            
            renderInput={(params) => <TextField {...params} fullWidth label={label} error={error} helperText={errorMessage} className={className}/>}
        />
    );
};

export default AutoCompletePersona;