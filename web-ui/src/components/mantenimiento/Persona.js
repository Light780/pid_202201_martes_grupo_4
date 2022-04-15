import { Grid, Table, Button, Container, TextField, Typography, Modal, TableContainer, TableHead, TablePagination, TableCell, TableBody, TableRow, Paper, Checkbox, FormControlLabel, Hidden, IconButton } from '@material-ui/core';
import { Edit, Delete, Info } from '@material-ui/icons/';
import React, { useState, useEffect } from 'react';
import { useStyles, style } from '../tools/style'
import { registrarPersona, consultarPersona} from '../../actions/PersonaAction';
import { useStateValue } from '../../context/store';
import SelectParametro from '../utils/SelectParametro';
function Persona() {
   const styles = useStyles();
   const [{ sesionUsuario }, dispatch] = useStateValue()
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const [listaPersona, setListaPersona] = useState([])
   const [persona, setPersona] = useState({
      personaId: 0,
      nombres: '',
      doc: 0,
      tipodoc: '',
      telefono: 0,
      estadoId:'',
      correo:'',
      sexo:'',
      tipopersona:''

   })
   const [errores, setErrores] = useState({})
   const [modalInsertar, setModalInsertar] = useState(false);
   const [modalEditar, setModalEditar] = useState(false);
   const [modalEliminar, setModalEliminar] = useState(false);
   const [modalDetalle, setModalDetalle] = useState(false);

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };
   const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };
   const emptyRows = rowsPerPage - Math.min(rowsPerPage, listaPersona.length - page * rowsPerPage);
   const peticionGet = () => {
      listarPersona().then(respuesta => {
         if (respuesta.status === 200) {
            setListaPersona(respuesta.data)
         } else {
            dispatch({
               type: 'OPEN_SNACKBAR',
               openMensaje: {
                  open: true,
                  mensaje: 'Error al listar Persona',
                  severity: 'error'
               }
            })
         }
      })
   }
   const limpiarForm = () => {
      setPersona({
         personaId: 0,
         nombres: '',
         doc: 0,
         tipodoc: '',
         telefono: 0,
         estadoId:'',
         correo:'',
         sexo:'',
         tipopersona:'',
         departamentoId:0 
      })
      setErrores({})
   }
   const peticionPost = e => {
      e.preventDefault()
      validarForm(persona)
      if (Object.keys(errores).length === 0) {
         registrarPersona(persona).then(respuesta => {
            if (respuesta.status === 200) {
               dispatch({
                  type: 'OPEN_SNACKBAR',
                  openMensaje: {
                     open: true,
                     mensaje: "Persona registrada correctamente",
                     severity: 'success'
                  }
               })
               abrirCerrarModalInsertar()
               limpiarForm()
               peticionGet()
            } else {
               dispatch({
                  type: 'OPEN_SNACKBAR',
                  openMensaje: {
                     open: true,
                     mensaje: "Error al guardar la Persona\n Detalles del error : " + Object.values(respuesta.response.data.errores),
                     severity: 'error'
                  }
               })
            }
         })
      }

   }
   const peticionUnico = async (persona) => {
      await consultarUnico(persona.personaId).then(respuesta => {
         if (respuesta.status === 200) {
            setPersona(respuesta.data)
         } else {
            dispatch({
               type: 'OPEN_SNACKBAR',
               openMensaje: {
                  open: true,
                  mensaje: "Error al consultar la persona",
                  severity: 'error'
               }
            })
         }
      })
   }

   const validarForm = (persona) => {

      if (persona.personaId === '') {
         setErrores(anterior => ({
            ...anterior,
            personaId: 'El campo es obligatorio'
         }))
      }
      else if (!/^[0-9]+$/.test(persona.personaId)) {
         setErrores(anterior => ({
            ...anterior,
            personaId: 'Debe ser numérico'
         }))
      }
      else if (persona.personaId.trim().length !== 3) {
         setErrores(anterior => ({
            ...anterior,
            personaId: 'Debe tener 3 caracteres'
         }))
      }
      else delete errores.personaId


      if (departamento.doc === '') {
         setErrores(anterior => ({
            ...anterior,
            doc: 'El campo es obligatorio'
         }))
      }
      else if (!/^[0-9]+$/.test(departamento.doc)) {
         setErrores(anterior => ({
            ...anterior,
            doc: 'Debe ser numérico'
         }))
      }
      else if (departamento.doc.trim().length !== 8) {
         setErrores(anterior => ({
            ...anterior,
            doc: 'Debe tener 8 caracteres'
         }))
      }
      else delete errores.doc


      if (departamento.telefono === '') {
         setErrores(anterior => ({
            ...anterior,
            telefono: 'El campo es obligatorio'
         }))
      }
      else if (!/^[0-9]+$/.test(departamento.telefono)) {
         setErrores(anterior => ({
            ...anterior,
             telefono: 'Debe ser numérico'
         }))
      }
      else if (departamento.telefono.trim().length !== 8) {
         setErrores(anterior => ({
            ...anterior,
            telefono: 'Debe tener 9 caracteres'
         }))
      }
      else delete errores.telefono

      const handleCheck = e => {
         const { name, value } = e.target
         setPersona(anterior => ({
            ...anterior,
            [name]: value === 'false'
         }))
      }

      const abrirCerrarModalInsertar = () => {
         limpiarForm()
         setModalInsertar(!modalInsertar);
      }
      const abrirCerrarModalEditar = () => {
         setModalEditar(!modalEditar);
      }
      const abrirCerrarModalEliminar = () => {
         setModalEliminar(!modalEliminar);
      }
      const abrirCerrarModalDetalle = () => {
         setModalDetalle(!modalDetalle);
      }
      useEffect(() => {
         peticionGet()
      }, [])
   

   const PeticionGet = async () => {
      
   }

   const PeticionPost = async () => {
      
   }
   const PeticionPut = async () => {
      // await axios.get(baseUrl)
      //    .then(response => {
      //       setPersona(response.persona);
      //    })
   }
   const PeticionDelete = async () => {
      // await axios.get(baseUrl)
      //    .then(response => {
      //       setPersona(response.persona);
      //    })
   }
  

   const bodyInsertar = (
      <div className={styles.modal}>
         <Container component="main" maxWidth="md" justifyContent="center">
            <Typography className={styles.modalTitle} component="h1" variant="h5">Registrar Persona</Typography>
            <form className={styles.modalForm}>
               <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} md={12}>
                     <TextField name="personaId" className={styles.inputMaterial} label="ID Persona" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField name="nombres" className={styles.inputMaterial} label="Nombres" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField name="doc" className={styles.inputMaterial} label="Documnento " onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField name="tipodoc" className={styles.inputMaterial} label="Tipo Documento" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField name="telefono" className={styles.inputMaterial} label="Telefono" onChange={handleChange} />
                  </Grid> 
                  <Grid item xs={12} md={6}>
                     <TextField name="estadoId" className={styles.inputMaterial} label="Estado ID" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField name="correo" className={styles.inputMaterial} label="Correo" onChange={handleChange} />
                  </Grid> 
                  <Grid item xs={12} md={6}>
                     <TextField name="sexo" className={styles.inputMaterial} label="Sexo" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField name="tipopersona" className={styles.inputMaterial} label="Tipo Persona" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField name="departamentoId" className={styles.inputMaterial} label="Departamento ID" onChange={handleChange} />
                  </Grid>
               </Grid>
               <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={6} md={6}>
                     <Button type="submit" fullWidth variant="contained" size="large" color="primary" style={style.submit} onClick={() => PeticionPost()}>
                        Guardar
                     </Button>
                  </Grid>
                  <Grid item xs={6} md={6}>
                     <Button type="submit" fullWidth variant="contained" size="large" color="secondary" style={style.submit} onClick={abrirCerrarModalInsertar}>Cancelar</Button>
                     </Grid>
               </Grid>
            </form>
         </Container>

      </div>
   )

   
   return (
      <div className={styles.table}>
         <Grid container justify="flex-end">
            <Button type="button"  variant="contained" size="large" color="primary" style={style.submit} onClick={abrirCerrarModalInsertar}>
               Registrar
            </Button>
         </Grid>
         <TableContainer component={Paper}>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell>Persona ID</TableCell>
                     <TableCell>Nombres</TableCell>
                     <TableCell>Documento</TableCell>
                     <TableCell>Tipo Documento</TableCell>
                     <TableCell>Telefono</TableCell>
                     <TableCell>Estado </TableCell>
                     <TableCell>Correo </TableCell>
                     <TableCell>Sexo </TableCell>
                     <TableCell>Tipo Persona </TableCell>
                     <TableCell>Departamento ID </TableCell>
                     <TableCell>Acciones</TableCell>
                  </TableRow>
               </TableHead>

               <TableBody>
                  <TableRow key={1}>
                     <TableCell>{1}</TableCell>
                     <TableCell>{3}</TableCell>
                     <TableCell>{'Alan Becker'}</TableCell>
                     <TableCell>{250}</TableCell>
                     <TableCell>{'Activo'}</TableCell>
                     <TableCell>{15}</TableCell>
                     <TableCell>
                        <Edit />
                        &nbsp;&nbsp;&nbsp;
                        <Delete />
                     </TableCell>
                  </TableRow>
               </TableBody>
            </Table>
         </TableContainer>

         <Modal
            open={modalInsertar}
            onClose={abrirCerrarModalInsertar}>
            {bodyInsertar}
         </Modal>

         <Modal
         open={modalEditar}
         onClose={abrirCerrarModalEditar}>
            {bodyEditar}
         </Modal>

         <Modal
         open={modalEliminar}
         onClose={abrirCerrarModalEliminar}>
          {bodyEliminar}
         </Modal>
      </div>


   );
   }

}
export default Persona;

