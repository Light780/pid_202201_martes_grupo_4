import { Grid, Table, Button, Container, TextField, Typography, Modal, TableContainer, TableHead, TablePagination, TableCell, TableBody, TableRow, Paper, Checkbox, FormControlLabel, Hidden, IconButton } from '@mui/material';
import { Edit, Delete, Info, CheckCircle } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { useStyles, style } from '../tools/style'
import { listarHistorialIncidencia } from '../../actions/HistorialIncidenciaAction';
import { useStateValue } from '../../context/store';
import SelectDepartamento from '../utils/SelectDepartamento';

function HistorialIncidencia() {
   const styles = useStyles();
   const [{ sesionUsuario }, dispatch] = useStateValue()
   const [page, setPage] = useState(0)
   const [rowsPerPage, setRowsPerPage] = useState(10)
   const [listaHistorial, setListaHistorial] = useState([])
   const [filtro, setFiltro] = useState({
      filtroDepartamentoId: 0,
   })
   const [checkFiltro, setCheckFiltro] = useState({
      filtroDepartamentoId: false,
   })
   const [historialIncidencia, setHistorialIncidencia] = useState({
      historialIncidenciaId: 0,
      departamentoId: 0,

   })

   //const [errores, setErrores] = useState({})

   const handlePageChange = (event, newPage) => {
      setPage(newPage);
   };
   const handleRowsPerPageChange = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };
   const emptyRows = rowsPerPage - Math.min(rowsPerPage, listaHistorial.length - page * rowsPerPage);

   const peticionGet = () => {
      listarHistorialIncidencia(filtro).then(respuesta => {
         if (respuesta.status === 200) {
            setListaHistorial(respuesta.data)
         } else {
            dispatch({
               type: 'OPEN_SNACKBAR',
               openMensaje: {
                  open: true,
                  mensaje: 'Error al listar Historial de Incidencias',
                  severity: 'error'
               }
            })
         }
      })
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
      setCheckFiltro(anterior => ({
         ...anterior,
         [name]: value === 'false'
      }))
      if (value === 'true') {
         setFiltro(anterior => ({
            ...anterior,
            [name]: 0
         }))
      } /*else {
         setFiltro(anterior => ({
            ...anterior,
            [name]: name === 'filtroEliminado' ? 1 : 0
         }))
      }*/
   }

   let styleEstadoIncidencia = (estado) => {
        let colorEstado;
        if(estado === "Atendido") {
            colorEstado = {color: "green", fontWeight: "bold"}; 
        }
        else  {    
            if(estado === "No atendido") {
                colorEstado ={ color: "orange", fontWeight: "bold"};
            }
            else {
                colorEstado = { color: "red", fontWeight: "bold"};
            }
        }
        return colorEstado;
   }
  
   useEffect(() => {
      peticionGet()
   }, [filtro])


   return (
      <React.Fragment>
         <Container component="main" maxWidth={false}>
            <div className={styles.crud}>
               <Paper>
                  <Paper className={styles.paperTitle}>
                     <Grid container justifyContent="flex-start">
                        <Typography component="h5" variant="h5" style={style.crudTitle}>
                           Historial de Incidencias
                        </Typography>
                     </Grid>
                  </Paper>
                  <Paper className={styles.paperBody}>
                     <Grid container spacing={2} justifyContent="flex-start">
                        <Grid item container xs={4} md={2} >
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
                     </Grid>
                     <TableContainer className={styles.table}>
                        <Table stickyHeader>
                           <TableHead>
                              <TableRow>
                                 <TableCell align='center'>N° Historial</TableCell>
                                 <TableCell align='center'>Código de Incidencia</TableCell>
                                 <TableCell align='center'>N° de Departamento</TableCell>
                                 <TableCell align='center'>Tipo de Incidencia</TableCell> 
                                 <TableCell align='center'>Descripción</TableCell>
                                 <TableCell align='center'>Fecha de Incidencia</TableCell>
                                 <TableCell align='center'>Usuario</TableCell>
                                 <TableCell align='center'>Fecha de Registro</TableCell>
                                 <TableCell align='center'>Estado</TableCell>
                              </TableRow>
                           </TableHead>

                           <TableBody>
                              {listaHistorial.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((historialIncidencia, index) => (
                                 <TableRow key={historialIncidencia.historialIncidenciaId} style={index % 2 ? { background: "#f5f5f5" } : { background: "white" }}>
                                    <TableCell size="small" align='center'>{historialIncidencia.historialIncidenciaId}</TableCell>
                                    <TableCell size="small" align='center'>{historialIncidencia.codigoIncidencia}</TableCell>
                                    <TableCell size="small" align='center'>{historialIncidencia.departamento}</TableCell>
                                    <TableCell size="small" align='center'>{historialIncidencia.tipoIncidencia}</TableCell>                     
                                    <TableCell size="small" align='center'>{historialIncidencia.descripcionIncidencia}</TableCell>
                                    <TableCell size="small" align='center'>{historialIncidencia.fechaIncidencia}</TableCell>
                                    <TableCell size="small" align='center'>{historialIncidencia.usuarioRegistro}</TableCell>
                                    <TableCell size="small" align='center'>{historialIncidencia.fechaRegistro}</TableCell>
                                    <TableCell size="small" align='center' style={styleEstadoIncidencia(historialIncidencia.estadoIncidencia)}>{historialIncidencia.estadoIncidencia}</TableCell>
                                 </TableRow>
                              ))}
                              {emptyRows > 0 && (
                                 <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                 </TableRow>)}
                           </TableBody>
                        </Table>
                     </TableContainer>
                     <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={listaHistorial.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowsPerPageChange}
                     />
                  </Paper>
               </Paper>
            </div>
         </Container>          
      </React.Fragment >
   );
}
export default HistorialIncidencia;

