import { Container, Typography} from '@mui/material';
import React from 'react';
import style from './tools/style'
const Inicio = () => {
    return (
        <Container maxWidth="xs">
            <div style={style.paper}>
                <Typography component="h1" variant="h5">
                    GESTION DE DEPARTAMENTOS
                </Typography>
            </div>
        </Container>
    );
};

export default Inicio;