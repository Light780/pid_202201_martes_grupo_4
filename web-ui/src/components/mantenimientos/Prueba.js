import React, { useEffect, useState } from 'react';

function Prueba() {    
    const [texto, setTexto] = useState({
        nombre:'',
        apellido:'',
        edad:''
    });
    useEffect(() => {
        console.log(1);
    },[])
    const listado = e => {
        
    }
    const ingresarValores = e => {
        const {name, value} = e.target;
        setTexto(anterior => ({
            ...anterior,
            [name] : value
        }));
    }    

    /*const [errores, setErrores] = useState({})
    const [modalInsertarHoraSalida, setModalInsertarHoraSalida] = useState(false);
    const abrirCerrarModalInsertarHoraSalida = () => {
        setModalInsertarHoraSalida(!modalInsertarHoraSalida);
    }

    const bodyInsertarHoraSalida = (
        <div className={styles.modal}>
           <Container component="main" maxWidth="md" justifyContent="center">
              <Typography className={styles.modalTitle} component="h1" variant="h5">Hora de Salida</Typography>
              <form className={styles.modalForm} >
                 <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} md={12}>
                       <TextField value={new Date().toLocaleTimeString("")+""} disabled name="hora" className={styles.inputMaterial} label="Hora" onChange={handleChange}/>
                    </Grid>
  
                    <Grid item xs={12} md={12}>
                       <TextField value={visita.comentario} error={Boolean(errores?.comentario)}
                          errorMessage={(errores?.comentario)}
                          name="comentario" className={styles.inputMaterial}
                          onChange={handleChange} />
                    </Grid>
                 </Grid>
                 <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={6} md={6}>
                       <Button type="submit" fullWidth variant="contained" size="large" color="primary" style={style.submit} onClick={peticionPost}>
                          Registrar
                       </Button>
                    </Grid>
                    <Grid item xs={6} md={6}>
                       <Button type="button" fullWidth variant="contained" size="large" color="secondary" style={style.submit} onClick={abrirCerrarModalInsertar}>
                          Cancelar
                       </Button>
                    </Grid>
                 </Grid>
              </form>
           </Container>
  
        </div>
     )*/

    return (
        <div>
            <input type="text" value={texto.nombre} onChange={ingresarValores} name="nombre"/>
            <input type="text" value={texto.apellido} onChange={ingresarValores} name="apellido"/>
            <input type="text" value={texto.edad} onChange={ingresarValores} name="edad"/>
            <h1>Edad {texto.edad}</h1>
            <h1>Nombre {texto.nombre}</h1>
            <h1>Apellido {texto.apellido}</h1>
        </div>
    );

    /*return(
        <React.Fragment>
            <Modal
                open={modalInsertarHoraSalida}
                onClose={(event, reason) => {
                if (reason !== 'backdropClick') {
                    abrirCerrarModalInsertarHoraSalida();
                }
                }}>
                {bodyInsertarHoraSalida}
            </Modal>
        </React.Fragment>
    );*/
};

export default Prueba;