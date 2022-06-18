import { Grid, Table, Button, Container, TextField, Typography, Modal, TableContainer, TableHead, TablePagination, TableCell, TableBody, TableRow, Paper, Checkbox, FormControlLabel, Hidden, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useStyles, style } from '../tools/style'
import { listarPago } from '../../actions/PagoAction'
import { useStateValue } from '../../context/store';
import SelectParametro from '../utils/SelectParametro';
import SelectDepartamento from '../utils/SelectDepartamento';
import { DatePicker } from '@mui/x-date-pickers';


function ListarPago() {
    const styles = useStyles();
    const [page, setPage] = useState(0)
    const [{ sesionUsuario }, dispatch] = useStateValue()
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [listaPago, setListaPago] = useState([])
    cons[filtro, setFiltro] = useState({
        filtroDepartamentoId:0
      
    })
    const [checkFiltro, setCheckFiltro] = useState({
        filtroDepartamentoId: false,
    })

    const [listarPago ,setListarPago] = useState({
        pagosId:0,
        departamentoId:0
    });

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };
    const handleRowsPerPageChange = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = 
    rowsPerPage - 
    Math.min(rowsPerPage, listaPago.length - page * rowsPerPage);

    const peticionGet = () => {
        listarPago(pagos).then(respuesta => {
            if (respuesta.status === 200) {
                setListaPago(respuesta.data)
            } else {
                dispatch({
                    type: 'OPEN_SNACKBAR',
                    openMensaje: {
                        open: true,
                        mensaje: 'Error al listar pagos',
                        severity: 'error'
                    },
                });
            }
        });
    };

    const handleChangeFiltro = e => {
        const { name, value } = e.target
        setFiltro(anterior => ({
            ...anterior,
            [name]: value
        }));
    };
    const handleCheckFiltro = (e) => {
        const { name, value } = e.target;
        setCheckFiltro((anterior) => ({
          ...anterior,
          [name]: value === "false",
        }));
        if (value === "true") {
          setFiltro((anterior) => ({
            ...anterior,
            [name]: 0,
          }));
    }};
    
    let styleEstadoPago = (estado) => {
        let colorEstado;
        if (estado === "Pagado") {
          colorEstado = { color: "green", fontWeight: "bold" };
        } else {
          if (estado === "Falta Pagar") {
            colorEstado = { color: "orange", fontWeight: "bold" };
          } else {
            colorEstado = { color: "red", fontWeight: "bold" };
          }
        }
        return colorEstado;
      };
    
    useEffect(() => {
        peticionGet();
    }, [filtro]);

      
  
    return (
        <React.Fragment>
            <Container component="main" maxWidth={false}>
                <div className={styles.crud}>
                    <Paper>
                        <Paper className={styles.paperTitle}>
                            <Grid container justifyContent="flex-start">
                                <Typography component="h5" variant="h5" style={style.crudTitle}>
                                    Historial de Pagos
                                </Typography>
                            </Grid>
                        </Paper>
                        < Paper className={styles.paperBody}>
                            <Grid container spacing={2} justifyContent="flex-start">
                                <Grid item container xs={4} md={2}>
                                    <Grid item container xs={3} md={2}>
                                        <Grid item xs={10} md={10}>
                                        <SelectDepartamento
                                        value={filtro.filtroDepartamentoId}
                                        label="Filtro Depart."
                                        className={styles.inputMaterial}
                                        onChange={handleChangeFiltro}
                                        name="filtroDepartamentoId"
                                        disabled={!checkFiltro.filtroDepartamentoId}
                                            />

                                    
                                        </Grid>
                                    </Grid>
                                    <Grid item container xs={3} md={2}>
                                        <SelectParametro
                                            concepto="ESTADO_PAGO"
                                            error={Boolean(errores?.estadoId)}
                                            errorMessage={errores?.estadoId}
                                            name="estado"
                                            className={styles.inputMaterial}
                                            value={pago.estado}
                                            label="Estado"
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Paper className={styles.paperBody} style={{ marginTop: "25px" }}>
                                        <TableContainer className={styles.table}>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell size="small" align="center">N° Operacion</TableCell>
                                                    <TableCell size="small" align="center">Monto</TableCell>
                                                    <TableCell size="small" align="center">Fecha de Pago</TableCell>
                                                    <TableCell size="small" align="center">Usuario</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                      {listaPago.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((pago, index) => (
                        <TableRow key={pago.codigoPago} style={index % 2 ? { background: "#f5f5f5" } : { background: "white" }}>
                          <TableCell size="small" align="center"> {pago.boletaId}</TableCell>
                          <TableCell size="small" align="center">{pago.monto}</TableCell>
                          <TableCell size="small" align="center">{boleta.periodo}</TableCell>
                          <TableCell size="small" align="center">{boleta.fechaPago}</TableCell>
                          <TableCell size="small" align="center">{boleta.usuario}</TableCell>                    
                          <TableCell size="small" align="center" width="15%"
                            style={boleta.estado === "Cancelado" ? { color: "green", fontWeight: "bold" } : { color: "red", fontWeight: "bold" }} >{boleta.estado} </TableCell>
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
                        </Grid>
                    </Paper>

                </Paper>
            </div>
        </Container>
            </React.Fragment >
      )
}

export default ListarPago