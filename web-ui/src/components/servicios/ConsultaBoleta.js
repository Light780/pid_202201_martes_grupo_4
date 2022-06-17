import { Grid, Table, Button, Container, TextField, Typography, Modal, TableContainer, Stack, TableHead, TablePagination, TableCell, TableBody, TableRow, Paper, Checkbox, FormControlLabel, Hidden, IconButton } from '@mui/material';
import { Edit, Delete, Info, CheckCircle } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { useStyles, style } from '../tools/style'
import { listarBoleta } from '../../actions/BoletaAction'
import { useStateValue } from '../../context/store';
import SelectParametro from '../utils/SelectParametro';
import ResponsiveButton from '../utils/ResponsiveButton';
import Departamento from '../mantenimiento/Departamento';

function ConsultaBoleta() {
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
    // setMascota(anterior => ({
    //   ...anterior,
    //   [name]: value
    // }))
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
                    <TextField
                      name="Departamento"
                      className={styles.inputMaterial}
                      label="Departamento"
                      onChange={handleChange}
                      //value={boleta.Departamento}
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
                      //value={boleta.filtroFechaPago}
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
                    //value={boleta.estado}
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
                      //Filtrar(e);
                    }}
                  >
                    Filtrar
                  </Button>
                </Grid>
              </Grid>
              <Paper className={styles.paperBody} style={{ marginTop: "25px" }}>
                <TableContainer className={styles.table}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell align="left"
                          style={{ fontSize: "14px", background: "#2e86de" }} >
                          Boleta
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: "14px", background: "#2e86de" }} >
                          Propietario
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: "14px", background: "#2e86de" }}>
                          Mes
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: "14px", background: "#2e86de" }} >
                          FechaPago
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: "14px", background: "#2e86de" }} >
                          Servicio
                        </TableCell>
                        <TableCell align="center" style={{ fontSize: "14px" }}>
                          Acciones
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listaBoleta.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                        .map((boleta, index) => (
                          <TableRow
                            key={boleta.boletaId}
                            style={
                              index % 2
                                ? { background: "#f5f5f5" }
                                : { background: "white" }
                            }
                          >
                            <TableCell
                              size="small"
                              align="center"
                              width="3%"
                              style={
                                index % 2
                                  ? { background: "#636e72", color: "white" }
                                  : { background: "#b2bec3", color: "white" }
                              }
                            >
                              {index + 1}
                            </TableCell>
                            <TableCell size="small" align="center" width="9%"  >
                              {boleta.boletaId}
                            </TableCell>
                            <TableCell size="small" align="center" width="9%"  >
                              {boleta.Departamento}
                            </TableCell>
                            <TableCell size="small" align="center" width="9%"  >
                              {boleta.mes}
                            </TableCell>
                            <TableCell size="small" align="center" width="9%"  >
                              {boleta.fechaPago}
                            </TableCell>
                            <TableCell size="small" align="center" width="9%"  >
                              {boleta.servicioId}
                            </TableCell>
                            <TableCell
                              size="small"
                              align="center"
                              width="6%"
                              // style={
                              //   visita.fechaSalida === ""
                              //     ? {
                              //       color: "red",
                              //       fontWeight: "bold",
                              //       fontSize: "12px"
                              //     }
                              //     : {
                              //       color: "green",
                              //       fontWeight: "bold",
                              //       fontSize: "12px"
                              //     }
                              // }
                            >
                              {boleta.estado}
                            </TableCell>
                            <TableCell size="small" align="center">
                              <Stack spacing={1} direction="row">
                                <Button
                                  //disabled={visita.fechaPago !== "" ? false : true}
                                  variant="contained"
                                  //onClick={async () => { setBoleta(boleta); }}  
                                  >
                                  Pagar
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