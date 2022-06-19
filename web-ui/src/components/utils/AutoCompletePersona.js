import React from 'react';
import {Autocomplete, TextField } from '@mui/material'
const AutoCompletePersona = ({ onChange, className, error=false, errorMessage, label = "Persona", disabled = false, options, value }) => {        
    return (
        <Autocomplete            
            disabled={disabled}
            disableClearable={false}
            fullWidth
            value={value}
            getOptionLabel={(option) => option.documento || ""}
            onChange={onChange}            
            options={options}
            clearOnBlur={false}            
            renderInput={(params) => <TextField 
                {...params} 
                fullWidth 
                label={label} 
                error={error} 
                helperText={errorMessage} 
                className={className}
                onChange={onChange}/>}
        />
    );
};

export default AutoCompletePersona;