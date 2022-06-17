import { Grid, Table, Button, Container, TextField, Typography, Modal, TableContainer, TableHead, TablePagination, TableCell, TableBody, TableRow, Paper, Checkbox, FormControlLabel, Hidden, IconButton } from '@mui/material';
import { Edit, Delete, Info, CheckCircle } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { useStyles, style } from '../tools/style'
import { listarBoleta } from '../../actions/BoletaAction'
import { useStateValue } from '../../context/store';
import SelectParametro from '../utils/SelectParametro';
import ResponsiveButton from '../utils/ResponsiveButton';
import Departamento from '../mantenimiento/Departamento';

function ListarBoleta() {
  const styles = useStyles();
  const [page, setPage] = useState(0)
  const [{ sesionUsuario }, dispatch] = useStateValue()
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [listaBoleta, setListaBoleta] = useState([])
  const [filtro, setFiltro] = useState({
    filtroDepartamento: "",
    filtroAnio: "",
    filtroEstadoId: 0
  })    
  const [errores, setErrores] = useState({})
  const peticionGet = () => {
    listarBoleta(filtro).then(respuesta => {
      if (respuesta.status === 200) {
        setListaBoleta(respuesta.data)
      } else {
        dispatch({
          type: 'OPEN_SNACKBAR',
          openMensaje: {
            open: true,
            mensaje: 'Error al listar las boletas',
            severity: 'error'
          }
        })
      }
    })
  }
  return (
    <React.Fragment>
      <Container component="main" maxWidth={false}>
        <div className={styles.crud}>
          <Paper>
            <Paper className={styles.paperTitle}>
              <Grid container justifyContent="flex-start">
                <Typography component="h5" variant="h5" style={style.crudTitle}>
                  Pago de Boleta
                </Typography>
              </Grid>
            </Paper>
            <Paper className={styles.paperBody}>
              <Grid container spacing={2} justifyContent="flex-start">
                <Grid item container xs={3} md={2}>
                  <Grid item xs={10} md={10}>
                    <TextField
                      name="Departamento"
                      className={styles.inputMaterial}
                      label="Departamento"
                      onChange={handleChange}
                      value={boleta.Departamento}
                    />
                  </Grid>
                </Grid>
                <Grid item container xs={3} md={2}>
                  <Grid item xs={10} md={10}>
                    <TextField
                      name="Año"
                      className={styles.inputMaterial}
                      label="Año"
                      onChange={handleChange}
                      value={boleta.filtroFechaPago}
                    />
                  </Grid>
                </Grid>
                <Grid item container xs={3} md={2}>
                  <SelectParametro
                    concepto="ESTADO_SALIO"
                    error={Boolean(errores?.estadoId)}
                    errorMessage={errores?.estadoId}
                    name="estado"
                    className={styles.inputMaterial}
                    value={boleta.estado}
                    label="Estado"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item container xs={3} md={2}>
                  <Button
                    variant="contained"
                    style={{
                      background: "green",
                      marginRight: "20px",
                      width: "100px",
                      marginLeft: "25px",
                    }}
                    onClick={(e) => {
                      Filtrar(e);
                    }}
                  >
                    Filtrar
                  </Button>
                </Grid>


              </Grid>
            </Paper>
          </Paper>
        </div>
      </Container>
    </React.Fragment>
  )
}