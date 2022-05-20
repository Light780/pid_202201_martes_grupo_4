import { Grid, Table, Button, Container, TextField, Typography, Modal, TableContainer, TableHead, TablePagination, TableCell, TableBody, TableRow, Paper, Checkbox, FormLabel, Hidden } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useStyles, style } from '../tools/style'
import { listarVisita, registrarSalida, consultarUnico } from '../../actions/VisitaAction';
import { useStateValue } from '../../context/store';
import AutoCompleteVisitaDni from '../utils/AutoCompletePersona';
import AutoCompleteVisitaNombre from '../utils/AutoCompleteVisita';
import { listarPersona } from '../../actions/PersonaAction';

function Visita() {
   const styles = useStyles();
   const [{ sesionUsuario }, dispatch] = useStateValue()
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const [listaComboVisita, setVisitas] = useState([])
   const [listaVisita, setListaVisita] = useState([])
   const [valueAutoComplete, setValueAutoComplete] = useState(null)
   const [errors, setErrors] = useState({})
   const [visitante, setVisitante] = useState('')
   const [modalInsertarHoraSalida, setModalInsertarHoraSalida] = useState(false);
   const [modalVerDetalleVisita, setModalVerDetalleVisita] = useState(false);
   const [errores, setErrores] = useState({})

   const [visita, setVisita] = useState({

      //* 1. Atributos del visitante
      visitaId: 0,
      personaVisitaId: 0,
      nombreCompletoVisitante: '',
      tipoDocVisitante: '',
      documentoVisitante: '',

      //* 2. Atributos del anfitrión
      personaId: 0,
      nombreCompletoAnfitrion: '',
      tipoDocAnfitrion: '',
      documentoAnfitrion: '',
      fechaIngreso: '',
      fechaSalida: '',

      //* 3. Atributos generales
      usuarioRegistro: '',
      fechaRegistro: '',
      comentario: '',

      //* Hora de ingreso
      HoraEntrada: ''
   })

   //? Estos son los filtros de los campos nombres y documento
   const [filtro, setFiltro] = useState({
      filtroNombreCompleto: '',
      filtroDocumento: '',
      filtroEstadoId: 0,
   })

   //? Este método lista solo los visitantes (Grilla)
   const peticionGet = () => {
       listarVisita(filtro).then(respuesta => {

         if (respuesta.status === 200) 
         {
            setListaVisita(respuesta.data)
         } 
         else 
         {
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

   //? Paginación (Propiedades de la página/paginación/etc.)
   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

   const emptyRows = rowsPerPage - Math.min(rowsPerPage, listaVisita.length - page * rowsPerPage);

   
   //? Listado de datos para el combo de visitas (Para este caso se está llenando el combo con los documentos del visitante)
   const listarComboVisitas = () => {
      listarPersona({
         filtroTipoPersonaId: 3,
         filtroEliminado: 0
      }).then(respuesta => {
          let arrayPersona = []
          respuesta.data.map(persona => arrayPersona.push({ personaId: persona.personaId, nombreCompleto: persona.nombreCompleto, documento: persona.documento }))
          setVisitas(arrayPersona);
      })
   }

   //? Obtener los datos de un visitante en específico
   const peticionUnico = async (visita) => {
      await consultarUnico(visita.visitaId).then(respuesta => {
         if (respuesta.status === 200) {
            setVisita(respuesta.data)
         } else {
            dispatch({
               type: 'OPEN_SNACKBAR',
               openMensaje: {
                  open: true,
                  mensaje: "Error al consultar al visitante",
                  severity: 'error'
               }
            })
         }
      })
   }

   //$ BEGIN: Evento autocompletado del campo DNI
   const autoCompleteChange = (selectedVisita) => {
      if (selectedVisita != null) {
         setVisitante(selectedVisita)
      }
   }
   //$ END: Evento autocompletado del campo DNI

   const Filtrar = (e) => {
      e.preventDefault();
      setFiltro(anterior => ({
         ...anterior,
         filtroDocumento: visitante.documento,
         filtroNombreCompleto: visitante.nombreCompleto
      }))
      setVisitante('');
   }

   //? BEGIN: Limpiar formulario al registrar la salida
   const limpiarForm = () => {
      setVisita({
         comentario: ''
      })
      setErrores({})
      setValueAutoComplete(null)
   }
   //? END: Limpiar formulario al registrar la salida


   //? BEGIN: Evento que registra la salida de un visitante (Formulario Registro Salida)
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
   //? END: Evento que registra la salida de un visitante (Formulario Registro Salida)


   //$ BEGIN: Validar campos al registrar Salida (Formulario Registro Salida)
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
   //$ END: Validar campos al registrar Salida (Formulario Registro Salida)


   //? BEGIN: Método que muestra la hora asíncrona en el Formulario (Registrar Salida)
   const clock = () => {
      const date = new Date();
      const h =  date.toLocaleTimeString();
      setVisita((anterior) => ({
          ...anterior,
          HoraEntrada: h
      }));
   }
   //? END: Método que muestra la hora asíncrona en el Formulario (Registrar Salida)


   //$ BEGIN: Métodos que sirven para el manejo de los modales
   const abrirCerrarModalInsertarHoraSalida = () => {
      setModalInsertarHoraSalida(!modalInsertarHoraSalida);
   }

   const abrirCerrarModalVerDetalleVisita = () => {
      setModalVerDetalleVisita(!modalVerDetalleVisita);
   }
   //$ END: Métodos que sirven para el manejo de los modales


   //! BEGIN: Evento de Renderizado (UseEffect)
   useEffect(() => {
      setInterval(clock, 1000);
      listarComboVisitas();
      peticionGet();
   }, [filtro])
   //! END: Evento de Renderizado (UseEffect)

   const handleChange = e => {
      const { name, value } = e.target
      setVisita(anterior => ({
         ...anterior,
         [name]: value
      }))
   }

   const bodyInsertarHoraSalida = (
      <div className={styles.modal}>
         <Container component="main" maxWidth="md" justifyContent="center">
            <Typography className={styles.modalTitle} component="h1" variant="h5">Hora de Salida</Typography>
            <form className={styles.modalForm} >
               <Grid container spacing={2} justifyContent="center">

                  <Grid item xs={12} md={12}>
                     <FormLabel class="lblHora">Hora</FormLabel>
                     <TextField value={visita.HoraEntrada} disabled name="hora" className={styles.inputMaterial} onChange={handleChange}/>
                     <Hidden mdUp>{visita.visitaId}</Hidden>
                  </Grid>

                  <Grid item xs={12} md={12}>
                     <TextField value={visita.comentario} error={Boolean(errores?.comentario)}
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

   const bodyDetalleVisita = (
      <div className={styles.modal}>
         <Container component="main" maxWidth="md" justifyContent="center">
            <Typography className={styles.modalTitle} component="h1" variant="h5">Detalle de la salida</Typography>
            <form className={styles.modalForm} >
               <Grid container spacing={2} justifyContent="center">

                  <Grid item xs={12} md={12}>
                     <FormLabel class="lblHora">Hora</FormLabel>
                     <TextField value={visita.fechaEntrada} InputProps={{readOnly: true, disableUnderline: true}} name="hora" className={styles.inputMaterial} onChange={handleChange}
                     disabled/>
                     <Hidden mdUp>{visita.visitaId}</Hidden>
                  </Grid>

                  <Grid item xs={12} md={12}>
                     <TextField value={visita.comentario} error={Boolean(errores?.comentario)}
                        errorMessage={(errores?.comentario)}
                        name="comentario" label="Comentario" className={styles.inputMaterial}
                        onChange={handleChange} InputProps={{readOnly: true, disableUnderline: true}} disabled/>
                  </Grid>
               </Grid>
               <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={6} md={6}>
                     <Button type="button" fullWidth variant="contained" size="large" color="secondary" style={style.submit} onClick={abrirCerrarModalVerDetalleVisita}>
                        Cerrar
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
                        <Grid item container xs={3} md={2} >

                           <Grid item xs={10} md={10}>              
                              <AutoCompleteVisitaNombre
                                    onChange={(event,selectedValue) => autoCompleteChange(selectedValue)}
                                    options={listaComboVisita}
                                    value={valueAutoComplete}                              
                                    label="Nombre"                                                
                                    className={styles.inputMaterial}                              
                                 />
                           </Grid>
                        </Grid>

                        <Grid item container xs={3} md={2} >
                           <AutoCompleteVisitaDni
                                 onChange={(event,selectedValue) => autoCompleteChange(selectedValue)}
                                 options={listaComboVisita}
                                 value={valueAutoComplete}                              
                                 label="Documento"                                                
                                 className={styles.inputMaterial}                              
                              />
                        </Grid>

                        <Grid item container xs={3} md={2} >
                              <Button variant="contained" style={{background : "green", marginRight:"20px", width: "100px", marginLeft:"25px"}}
                                 onClick= {(e) => {Filtrar(e)}}
                              >
                                    Filtrar
                              </Button>
                        </Grid>
                     </Grid>
                     <Paper className={styles.paperBody} style={ {marginTop: "25px"}}>
                        <TableContainer className={styles.table}>
                           <Table stickyHeader>
                              <TableHead>
                                 <TableRow>
                                    <TableCell align='center' style={{ fontSize:"20px", background: "#636e72", color: "white" }}>#</TableCell>
                                    <TableCell align='left'   style={{ fontSize:"14px", background: "#2e86de"}}>Visitante</TableCell>
                                    <TableCell align='center' style={{ fontSize:"14px", background: "#2e86de"}}>Tipo Doc. Visitante</TableCell>
                                    <TableCell align='center' style={{ fontSize:"14px", background: "#2e86de"}}>N° Doc. Visitante</TableCell>
                                    <TableCell align='center' style={{ fontSize:"14px", background: "#0abde3"}}>Anfitrión</TableCell>
                                    <TableCell align='center' style={{ fontSize:"14px", background: "#0abde3"}}>Tipo Doc. Anfitrión</TableCell>
                                    <TableCell align='center' style={{ fontSize:"14px", background: "#0abde3"}}>N° Doc. Anfitrión</TableCell>
                                    <TableCell align='center' style={{ fontSize:"14px", background: "#22a6b3"}}>Fecha de Ingreso</TableCell>
                                    <TableCell align='center' style={{ fontSize:"14px", background: "#22a6b3"}}>Fecha de Salida</TableCell>
                                    <TableCell align='center' style={{ fontSize:"14px", background: "#22a6b3"}}>Usuario</TableCell>
                                    <TableCell align='center' style={{ fontSize:"14px", background: "#22a6b3"}}>Fecha de Registro</TableCell>
                                    <TableCell align='center' style={{ fontSize:"14px"}}>Estado</TableCell>
                                    <TableCell align='center' style={{ fontSize:"14px"}}>Acciones</TableCell>
                                 </TableRow>
                              </TableHead>

                              <TableBody>
                                 {listaVisita.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((visita, index) => (
                                    <TableRow key={visita.PersonaVisitaId} style={index % 2 ? { background: "#f5f5f5" } : { background: "white" }}>
                                       
                                       <TableCell size="small" align='center' width="3%"  style={ index % 2 ? { background: "#636e72", color: "white" } : { background: "#b2bec3", color: "white" }}>{index + 1}</TableCell>
                                       <TableCell size="small" align='left'   width="9%"  style={ index % 2 ? { background: "#2e86de" } : { background: "#54a0ff" }}>{visita.nombreCompletoVisitante}</TableCell>
                                       <TableCell size="small" align='center' width="8%"  style={ index % 2 ? { background: "#2e86de" } : { background: "#54a0ff" }}>{visita.tipoDocVisitante}</TableCell>
                                       <TableCell size="small" align='center' width="7%"  style={ index % 2 ? { background: "#2e86de" } : { background: "#54a0ff" }}>{visita.documentoVisitante}</TableCell>
                                       <TableCell size="small" align='center' width="9%"  style={ index % 2 ? { background: "#0abde3" } : { background: "#48dbfb" }}>{visita.nombreCompletoAnfitrion}</TableCell>
                                       <TableCell size="small" align='center' width="8%"  style={ index % 2 ? { background: "#0abde3" } : { background: "#48dbfb" }}>{visita.tipoDocAnfitrion}</TableCell>
                                       <TableCell size="small" align='center' width="7%"  style={ index % 2 ? { background: "#0abde3" } : { background: "#48dbfb" }}>{visita.documentoAnfitrion}</TableCell>
                                       <TableCell size="small" align='center' width="9%"  style={ index % 2 ? { background: "#22a6b3" } : { background: "#7ed6df" }}>{visita.fechaIngreso}</TableCell>
                                       <TableCell size="small" align='center' width="8%"  style={ index % 2 ? { background: "#22a6b3" } : { background: "#7ed6df" }}>{visita.fechaSalida == "" ? "==============" : visita.fechaSalida}</TableCell>
                                       <TableCell size="small" align='center' width="6%"  style={ index % 2 ? { background: "#22a6b3" } : { background: "#7ed6df" }}>{visita.usuarioRegistro}</TableCell>
                                       <TableCell size="small" align='center' width="8%"  style={ index % 2 ? { background: "#22a6b3" } : { background: "#7ed6df" }}>{visita.fechaRegistro}</TableCell>
                                       <TableCell size="small" align='center' width="6%" 
                                       style={visita.fechaSalida === "" ? {color: "red", fontWeight: "bold", fontSize: "15px"} : 
                                       { color: "green", fontWeight: "bold", fontSize: "15px"}}>{visita.fechaSalida === "" ? "NO SALIÓ" : "SALIÓ"}
                                       </TableCell>
                                       <TableCell size="small" align='center' width="10%">
                                          
                                          <Button variant="contained" style={{background : "orange", marginRight:"20px"}}
                                             onClick= {async () => 
                                                {
                                                   limpiarForm();
                                                   await peticionUnico(visita);
                                                   abrirCerrarModalVerDetalleVisita();
                                                }}>
                                             Ver
                                          </Button>
                                          <Button variant="contained" disabled={visita.fechaSalida === "" ? false : true} 
                                             onClick= {async () => 
                                                      {
                                                         limpiarForm();
                                                         setVisita(visita);
                                                         abrirCerrarModalInsertarHoraSalida();
                                                      }}>
                                             Salir
                                          </Button>
                                          
                                       </TableCell>
                                    </TableRow>
                                 ))}
                                 {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                       <TableCell colSpan={6} />
                                    </TableRow>)}
                              </TableBody>
                           </Table>
                        </TableContainer>           
                     </Paper>
                     
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
         <Modal
            open={modalVerDetalleVisita}
            onClose={abrirCerrarModalVerDetalleVisita} disableBackdropClick >
            {bodyDetalleVisita}
         </Modal>
      </React.Fragment >
   );
}

export default Visita;
