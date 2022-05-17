import { Grid, Table, Button, Container, TextField, Typography, Modal, TableContainer, TableHead, TablePagination, TableCell, TableBody, TableRow, Paper, Checkbox, FormLabel } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useStyles, style } from '../tools/style'
import { listarVisita, registrarSalida } from '../../actions/VisitaAction';
import { useStateValue } from '../../context/store';

function Visita() {
   const styles = useStyles();
   const [{ sesionUsuario }, dispatch] = useStateValue()
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const [listaVisita, setListaVisita] = useState([])
   const [Visita, setVisita] = useState({
      visitaId: 0,
      personaId: 0,
      nombrePersona: '',
      nroDepartamento: '',
      documento: '',
      tipoDocumentoId: 0,
      tipoDoc: '',
      telefono: '',
      estadoId: 2,
      correo: '',
      sexo: '',
      tipoPersonaId: 3,
      departamentoId: 0,
      fechaSalida: '',
      usuario: '',
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
   const [errores, setErrores] = useState({})

   const [modalDetalle, setModalDetalle] = useState(false);
   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };
   const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

   const emptyRows = rowsPerPage - Math.min(rowsPerPage, listaVisita.length - page * rowsPerPage);

   const peticionGet = () => {
        listarVisita(filtro).then(respuesta => {
         if (respuesta.status === 200) {
            setListaVisita(respuesta.data)
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

   // Registrar hora de Salida
   const limpiarForm = () => {
      setVisita({
         comentario: ''
      })
      setErrores({})
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



const bodyInsertarHoraSalida = (
   <div className={styles.modal}>
      <Container component="main" maxWidth="md" justifyContent="center">
         <Typography className={styles.modalTitle} component="h1" variant="h5">Hora de Salida</Typography>
         <form className={styles.modalForm} >
            <Grid container spacing={2} justifyContent="center">

               <Grid item xs={12} md={12}>
                  <FormLabel class="lblHora">Hora</FormLabel>
                  <TextField value={Visita.horaEntrada} disabled name="hora" className={styles.inputMaterial} onChange={handleChange}/>
                  <TextField value={Visita.visitaId} disabled name="id" className={styles.inputMaterial} hidden="false"/>
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

                           <FormLabel class="lblNombre">Nombre</FormLabel>
                           <TextField name="nombreCompleto" 
                        className={styles.inputMaterial} label="Nombre Completo" />
                              {/* <SelectDepartamento value={filtro.filtroDepartamentoId}
                                 label="Filtro Depart."
                                 className={styles.inputMaterial}
                                 onChange={handleChangeFiltro}
                                 name="filtroDepartamentoId"
                                 disabled={!checkFiltro.filtroDepartamentoId} /> */}
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

                                 <TableCell align='center' style={{ fontSize:"20px"}}>#</TableCell>
                                 <TableCell align='left' style={{ fontSize:"14px"}}>Nombre</TableCell>
                                 <TableCell align='center' style={{ fontSize:"14px"}}>Tipo documento</TableCell>
                                 <TableCell align='center' style={{ fontSize:"14px"}}>N° documento</TableCell>
                                 <TableCell align='center' style={{ fontSize:"14px"}}>Departamento</TableCell>
                                 <TableCell align='center' style={{ fontSize:"14px"}}>Usuario registro</TableCell>
                                 <TableCell align='center' style={{ fontSize:"14px"}}>Hora de Ingreso</TableCell>
                                 <TableCell align='center' style={{ fontSize:"14px"}}>Estado</TableCell>
                                 <TableCell align='center' style={{ fontSize:"14px"}}>Registrar salida</TableCell>
                              </TableRow>
                           </TableHead>

                           <TableBody>
                              {listaVisita.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((persona, index) => (
                                 <TableRow key={persona.personaId} style={index % 2 ? { background: "#f5f5f5" } : { background: "white" }}>
                                     
                                    <TableCell size="small" align='center' width="5%">{index + 1}</TableCell>
                                    <TableCell size="small" align='left' width="15%">{persona.nombrePersona}</TableCell>
                                    <TableCell size="small" align='center' width="10%">{persona.tipoDoc}</TableCell>
                                    <TableCell size="small" align='center' width="10%">{persona.documento}</TableCell>
                                    <TableCell size="small" align='center' width="10%">{persona.nroDepartamento}</TableCell>
                                    <TableCell size="small" align='center' width="10%">{persona.usuario}</TableCell>
                                    <TableCell size="small" align='center' width="15%">{persona.fechaRegistro}</TableCell>
                                    <TableCell size="small" align='center' width="10%" 
                                    style={persona.fechaSalida == "" ? {color: "red", fontWeight: "bold", fontSize: "15px"} : 
                                    { color: "green", fontWeight: "bold", fontSize: "15px"}}>{persona.fechaSalida == "" ? "NO SALIÓ" : "SALIÓ"}</TableCell>
                                    <TableCell size="small" align='center'>
                                       
                                        <Button variant="contained" style={{background : "orange", marginRight:"20px"}}>
                                           Ver
                                        </Button>
                                        <Button variant="contained" disabled={persona.fechaSalida == "" ? false : true} onClick={async () => {
                                             limpiarForm();
                                             //await peticionUnico(departamento);
                                             setVisita(persona);
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

export default Visita;

