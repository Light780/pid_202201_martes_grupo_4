import { Grid, Table, Button, Container, TextField, Typography, Modal, TableContainer, Stack, TableHead, TablePagination, TableCell, TableBody, TableRow, Paper, Checkbox, FormControlLabel, Hidden, IconButton } from '@mui/material';
import { Edit, Delete, Info, CheckCircle } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { useStyles, style } from '../tools/style'
import { listarBoleta } from '../../actions/BoletaAction'
import { useStateValue } from '../../context/store';
import SelectParametro from '../utils/SelectParametro';
import SelectDepartamento from '../utils/SelectDepartamento';
import ResponsiveButton from '../utils/ResponsiveButton';
import Departamento from '../mantenimiento/Departamento';
import { DatePicker } from '@mui/x-date-pickers';

function ConsultaBoleta() {
  const styles = useStyles();
  const [page, setPage] = useState(0)
  const [{ sesionUsuario }, dispatch] = useStateValue()
  const [errors, setErrors] = useState({})
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [listaBoleta, setListaBoleta] = useState([])
  const [filtro, setFiltro] = useState({
    filtroDepartamentoId: 0,
    filtroAnio: "",
    filtroEstadoId: 0
  })
  const [checkFiltro, setCheckFiltro] = useState({
    filtroDepartamentoId: false,
  })
  const [errores, setErrores] = useState({})
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, listaBoleta.length - page * rowsPerPage)
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

  const handleChange = e => {
    const { name, value } = e.target
    setListaBoleta(anterior => ({
      ...anterior,
   [name]: value
    }))
  }
  const handleChangeFiltro = e => {
    const { name, value } = e.target
    setFiltro(anterior => ({
      ...anterior,
      [name]: value
    }))
  }
  const handleCheckFiltro = e => {
    const { name, value } = e.target
    // setCheckFiltro(anterior => ({
    //   ...anterior,
    //   [name]: value === 'false'
    // }))
    if (value === 'true') {
      setFiltro(anterior => ({
        ...anterior,
        [name]: 0
      }))
    } else {
      setFiltro(anterior => ({
        ...anterior,
        [name]: name === 'filtroEliminado' ? 1 : 0
      }))
    }
  }
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleRowsPerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
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
                  <SelectDepartamento value={filtro.filtroDepartamentoId}
                       label="Filtro Depart."
                       className={styles.inputMaterial}
                       onChange={handleChangeFiltro}
                       name="filtroDepartamentoId"
                       disabled={!checkFiltro.filtroDepartamentoId} />
                  </Grid>
                  <Grid item xs={2} md={2}>
                       <Checkbox checked={checkFiltro.filtroDepartamentoId} className={styles.inputMaterial} style={style.checkFiltro}
                       onChange={handleCheckFiltro} color='primary' value={checkFiltro.filtroDepartamentoId}
                       name="filtroDepartamentoId" />
                   </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                       <DatePicker
                             views={['year']}
                             label="Año"
                             value={boleta.anio}
                             closeOnSelect={true}
                             minDate={new Date("2001-01-01")}
                            onChange={(e) => {
                          setBoleta((anterior) => ({
                           ...anterior,
                          anio: e
                             }))
                     }}
                    renderInput={(params) => <TextField {...params}
                         name="anio"
                         fullWidth                                                    
                         error={Boolean(errors?.anio)}
                         helperText={(errors?.anio)} />}
                    />
                    </Grid>
                <Grid item container xs={3} md={2}>
                  <SelectParametro
                    concepto="ESTADO_SALIO"
                    error={Boolean(errores?.estadoId)}
                    errorMessage={errores?.estadoId}
                    name="estado"
                    className={styles.inputMaterial}
                    //value={boleta.estado}
                    label="Estado"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Paper className={styles.paperBody} style={{ marginTop: "25px" }}>
                <TableContainer className={styles.table}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell align='center'>Servicio</TableCell>
                        <TableCell align='center'>Departamento</TableCell>
                        <TableCell align='center'>Periodo</TableCell>
                        <TableCell align='center'>CodigoPago</TableCell>
                        <TableCell align='center'>Monto</TableCell>
                        <TableCell align='center'>Saldo</TableCell>
                        <TableCell align='center'>Usuario</TableCell>
                        <TableCell align='center'>FechaPago</TableCell>
                        <TableCell align='center'>Estado</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listaBoleta.slice(page * rowsPerPage,page * rowsPerPage + rowsPerPage).map((boleta, index) => (
                          <TableRow key={boleta.boletaId} style={index % 2? { background: "#f5f5f5" } : { background: "white" }}>
                            <TableCell size="small" align="center"> {boleta.servicio}</TableCell>
                            <TableCell size="small" align="center">{boleta.departamento}</TableCell>
                            <TableCell size="small" align="center">{boleta.periodo}</TableCell>
                            <TableCell size="small" align="center">{boleta.codigoPago}</TableCell>
                            <TableCell size="small" align="center">{boleta.monto}</TableCell>
                            <TableCell size="small" align="center">{boleta.saldo}</TableCell>
                            <TableCell size="small" align="center">{boleta.usuario}</TableCell>
                            <TableCell size="small" align="center">{boleta.fechaPago}</TableCell>
                            <TableCell size="small" align="center" width="15%"
                              style={boleta.estado ==="Activo" ? {color: "green", fontWeight: "bold"} : { color: "red", fontWeight: "bold" }} >{boleta.estado} </TableCell>
                            <TableCell size="small" align="center">
                              <Stack spacing={1} direction="row">
                                <Button variant="contained" >
                                  Pagar
                                </Button>
                                <Button variant="contained" >
                                  VerPago
                                </Button>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}

                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={listaBoleta.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            </Paper>
          </Paper>
        </div>
      </Container>
    </React.Fragment>
  )
}

export default ConsultaBoleta