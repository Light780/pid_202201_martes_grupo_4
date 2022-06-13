import React from 'react';
import Card from '@mui/material/Card'
import { CardActionArea, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function Cards({ titulo, icono, texto, fontColor, color, link }) {

    const navigate = useNavigate()
    const styles = {
        root: {
            textAlign: 'center',
            background: color
        },
        text: {
            fontSize: 18,
            color: fontColor
        },
        title: {
            fontWeight: 'bold',
            fontSize: 22,
            color: fontColor
        }
    }
    const navigateTo = (e) => {
        navigate(link)    
    }

    return (
        <Card style={styles.root}>
            <CardActionArea onClick={navigateTo}>
                <CardContent>
                    {icono}
                    <Typography style={styles.title}>
                        {(titulo.toUpperCase())}
                    </Typography>

                    <Typography style={styles.text}>
                        {texto}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default Cards;