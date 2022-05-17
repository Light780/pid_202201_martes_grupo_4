import { Grid, Table, Button, Container, TextField, Typography, Modal, TableContainer, TableHead, TablePagination, TableCell, TableBody, TableRow, Paper, Checkbox, IconButton, FormControlLabel } from '@mui/material';
import { Grid, Table, Button, Container, TextField, Typography, Modal, TableContainer, TableHead, TablePagination, TableCell, TableBody, TableRow, Paper, Checkbox, IconButton, Hidden, FormLabel } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useStyles, style } from '../tools/style'
import { listarVisita, registrarSalida } from '../../actions/VisitaAction';
import { useStateValue } from '../../context/store';
import SelectDepartamento from '../utils/SelectDepartamento';

function Persona() {
   const styles = useStyles();
   const [{ sesionUsuario }, dispatch] = useStateValue()
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const [listaVisita, setListaVisita] = useState([])
   const [Visita, setVisita] = useState({
      //visitaId:0,
      personaId: 0,
      nombreCompleto: '',
      documento: '',
      tipoDocumentoId: 0,
      telefono: '',
      estadoId: 0,
      correo: '',
      sexo: '',
      tipoPersonaId: 3,
      departamentoId: 0,
      comentario: ''

   })
   const [filtro, setFiltro] = useState({
      filtroDepartamentoId: 0,
      filtroTipoPersonaId: 3,
   })
   const [checkFiltro, setCheckFiltro] = useState({
      filtroDepartamentoId: false,
      filtroTipoPersonaId: 3
   })

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };
   const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

   const emptyRows = rowsPerPage - Math.min(rowsPerPage, listaVisita.length - page * rowsPerPage);

   const limpiarForm = () => {
      setVisita({
         visitaId:0,
         comentario: ''
      })
      setErrores({})
   }

   const peticionGet = () => {
      listarVisita(filtro).then(respuesta => {
         if (respuesta.status === 200) {
            setListaVisita(respuesta.data)
            console.log(listaVisita);
         } else {
            dispatch({
               type: 'OPEN_SNACKBAR',
               openMensaje: {
                  open: true,
                  mensaje: 'Error al listar Visita',
                  severity: 'error'
               }
            })
         }
      })
   }

   const peticionPostSalida = e => {
      e.preventDefault()
      validarForm(Visita)
      if (Object.keys(errores).length === 0) {
         registrarSalida(Visita).then(respuesta => {
            if (respuesta.status === 200) {
               dispatch({
                  type: 'OPEN_SNACKBAR',
                  openMensaje: {
                     open: true,
                     mensaje: "Salida registrada correctamente",
                     severity: 'success'
                  }
               })
               abrirCerrarModalInsertarHoraSalida()
               limpiarForm()
               peticionGet()
            } else {
               dispatch({
                  type: 'OPEN_SNACKBAR',
                  openMensaje: {
                     open: true,
                     mensaje: "Error al registrar salida de Visitante\n Detalles del error : " + Object.values(respuesta.response.data.errors),
                     severity: 'error'
                  }
               })
            }
         })
      }
   }

   const validarForm = (Visita) => {
      const newErrors = { ...errores }

      if (Visita.comentario === '') {
         newErrors.comentario = 'El campo es obligatorio'
      }
      else if (Visita.comentario.trim().length < 10) {
         newErrors.comentario = 'Debe tener mínimo 10 caracteres'
      }
      else {
         delete newErrors.comentario
      }
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
      }
   }

   const handleChange = e => {
      const { name, value } = e.target
      setVisita(anterior => ({
         ...anterior,
         [name]: value
      }))
   }

   const [errores, setErrores] = useState({})
   const [modalInsertarHoraSalida, setModalInsertarHoraSalida] = useState(false);
    

   const clock = () => {
      const date = new Date();
      const h =  date.toLocaleTimeString();
      setVisita((anterior) => ({
          ...anterior,
          horaEntrada: h
      }));
  }
  
  const abrirCerrarModalInsertarHoraSalida = () => {
     setModalInsertarHoraSalida(!modalInsertarHoraSalida);
   }

   useEffect(() => {
      setInterval(clock, 1000);
      peticionGet()
   }, [filtro])

   /* Para probar registro de salida:
      <Grid item xs={12} md={12}>
                     <TextField value={Visita.visitaId}
                        name="visitaid" label="Visita Id" className={styles.inputMaterial}
                        onChange={handleChange} />
                  </Grid>
   
   */

   const bodyInsertarHoraSalida = (
      <div className={styles.modal}>
         <Container component="main" maxWidth="md" justifyContent="center">
            <Typography className={styles.modalTitle} component="h1" variant="h5">Hora de Salida</Typography>
            <form className={styles.modalForm} >
               <Grid container spacing={2} justifyContent="center">

                  <Grid item xs={12} md={12}>
                     <FormLabel class="lblHora">Hora</FormLabel>
                     <TextField value={Visita.horaEntrada} disabled name="hora" className={styles.inputMaterial} onChange={handleChange}/>
                  </Grid>

                  <Grid item xs={12} md={12}>
                     <TextField value={Visita.comentario} error={Boolean(errores?.comentario)}
                        errorMessage={(errores?.comentario)}
                        name="comentario" label="Comentario" className={styles.inputMaterial}
                        onChange={handleChange} />
                  </Grid>
               </Grid>
               <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={6} md={6}>
                     <Button type="submit" fullWidth variant="contained" size="large" color="primary" style={style.submit} onClick={peticionPostSalida}>
                        Registrar
                     </Button>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Button type="button" fullWidth variant="contained" size="large" color="secondary" style={style.submit} onClick={abrirCerrarModalInsertarHoraSalida}>
                        Cancelar
                     </Button>
                  </Grid>
               </Grid>
            </form>
         </Container>
      </div>
   )

   return (
      <React.Fragment>
         <Container component="main" maxWidth={false}>
            <div className={styles.crud}>
               <Paper>
                  <Paper className={styles.paperTitle}>
                     <Grid container justifyContent="flex-start">
                        <Typography component="h5" variant="h5" style={style.crudTitle}>
                           Visitas
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
                     <Grid container spacing={2} justifyContent="center">
                        <Grid  item xs={6} md={6}>
                           <Button type="submit" color="primary" component="span" size="medium" onClick={async () => {
                                             limpiarForm();
                                             //await peticionUnico(departamento);
                                             abrirCerrarModalInsertarHoraSalida();
                        }}></Button>
                        </Grid>
                     </Grid>
                     <TableContainer className={styles.table}>
                        <Table stickyHeader>
                           <TableHead>
                              <TableRow>

                                 <TableCell align='center'>#</TableCell>
                                 <TableCell align='left'>Nombre</TableCell>
                                 {/* <TableCell align='center'>Tipo Doc.</TableCell>
                                 <TableCell align='center'>N° Doc</TableCell>
                                 <Hidden mdDown>
                                    <TableCell align='center'>Sexo</TableCell>
                                 </Hidden>
                                 <TableCell align='center'>Tipo Persona</TableCell> */}
                                 <TableCell align='center'>Departamento</TableCell>
                                 <TableCell align='center'>Usuario</TableCell>
                                 <TableCell align='center'>Hora de Ingreso</TableCell>
                                 <TableCell align='center'>Estado</TableCell>
                                 <TableCell align='center'>Acciones</TableCell>
                              </TableRow>
                           </TableHead>

                           <TableBody>
                              {listaVisita.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((persona, index) => (
                                 <TableRow key={persona.personaId} style={index % 2 ? { background: "#f5f5f5" } : { background: "white" }}>

                                    <TableCell size="small" align='center' width="5%">{index + 1}</TableCell>
                                    <TableCell size="small" align='left' width="20%">{persona.nombreCompleto}</TableCell>

                                    {/* <TableCell size="small" align='center'>{persona.tipoDocumento}</TableCell>

                                    <TableCell size="small" align='center'>{persona.documento}</TableCell> */}
                                    {/* <Hidden mdDown>
                                       <TableCell size="small" align='center'>{persona.sexo}</TableCell>
                                    </Hidden>
                                    <TableCell size="small" align='center'>{persona.tipoPersona}</TableCell> */}
                                    <TableCell size="small" align='center' width="10%">{persona.departamento}</TableCell>
                                    <TableCell size="small" align='center' width="15%">{persona.usuario}</TableCell>
                                    <TableCell size="small" align='center' width="15%">{persona.fechaRegistro}</TableCell>
                                    <TableCell size="small" align='center' width="15%"
                                       style={persona.estado == "Activo" ? { color: "green", fontWeight: "bold" } : { color: "red", fontWeight: "bold" }}>{persona.estado}</TableCell>
                                    {/* <TableCell size="small" align='center'>
                                       <IconButton color="primary" component="span" size="medium" onClick={async () => {
                                          limpiarForm();
                                          await peticionUnico(persona);
                                          abrirCerrarModalEditar();
                                       }}>
                                          <Edit />
                                       </IconButton>
                                       <IconButton color="default" component="span" size="medium" onClick={() => {
                                          limpiarForm(); setVisita(persona); abrirCerrarModalDetalle()
                                       }}>
                                          <Info />
                                       </IconButton>
                                       <IconButton color="secondary" component="span" size="medium" onClick={() => {
                                          limpiarForm();
                                          setVisita(persona);
                                          abrirCerrarModalEliminar()
                                       }}
                                       >
                                          <Delete />
                                       </IconButton>
                                    </TableCell> */}
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
                        count={listaVisita.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                     />
                  </Paper>
               </Paper>
            </div>
         </Container>
         <Modal
            open={modalInsertarHoraSalida}
            onClose={abrirCerrarModalInsertarHoraSalida} disableBackdropClick >
            {bodyInsertarHoraSalida}
         </Modal>
      </React.Fragment >
   );
}

export default Persona;

