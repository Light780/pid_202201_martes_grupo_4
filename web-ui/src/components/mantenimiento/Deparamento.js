import { Grid, Table, Button, Container, TextField, Typography, Modal, TableContainer, TableHead, TableCell, TableBody, TableRow, Paper, Checkbox, FormControlLabel } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons/';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { style, styleModal } from '../tools/style'
import axios from 'axios';

function Departamento() {
   const styles = styleModal();

   const [departamento, setDepartamento] = useState({
      DepartamentoId: 0,
      NroDepartamento: '',
      Tamaño: 0,
      TipoDepaId: 0,
      EstadoDepaId: 0,
      CantHabitaciones:0,
      IndCocina:false,
      IndBalcon:false,
      IndLavanderia:false,
      IndPiscina:false,
      IndPatio:false,
      FechaRegistro:''

   })
   const [modalInsertar, setModalInsertar] = useState(false);
   const [modalEditar, setModalEditar] = useState(false);
   const [modalEliminar, setModalEliminar] = useState(false);

   const PeticionGet = async () => {
      // await axios.get(baseUrl)
      //    .then(response => {
      //       setDepartamento(response.departamento);
      //    })
   }
   const PeticionPost = async () => {
      // await axios.get(baseUrl)
      //    .then(response => {
      //       setDepartamento(response.departamento);
      //    })
   }
   const PeticionPut = async () => {
      // await axios.get(baseUrl)
      //    .then(response => {
      //       setDepartamento(response.departamento);
      //    })
   }
   const PeticionDelete = async () => {
      // await axios.get(baseUrl)
      //    .then(response => {
      //       setDepartamento(response.departamento);
      //    })
   }
   const abrirCerrarModalInsertar = () => {
      setModalInsertar(!modalInsertar);
   }
   const handleChange = e => {

   }
   const abrirCerrarModalEditar=()=>{
      setModalEditar(!modalEditar);
   }
   const abrirCerrarModalEliminar=()=>{
      setModalEliminar(!modalEliminar);
   }
   // useEffect(async () => {
   //    //await peticionGet();
   // }, [])

   const bodyInsertar = (
      <div className={styles.modal}>
         <Container component="main" maxWidth="md" justifyContent="center">
            <Typography className={styles.modalTitle} component="h1" variant="h5">Registrar Departamento</Typography>
            <form className={styles.modalForm}>
               <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} md={12}>
                     <TextField name="DepartamentoId" className={styles.inputMaterial} label="Departamento Id" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField name="NroDepartamento" className={styles.inputMaterial} label="Nro de Departamento" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField name="Tamaño" className={styles.inputMaterial} label="Tamaño" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField name="TipoDepaId" className={styles.inputMaterial} label="Tipo de Departamento" onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <TextField name="EstadoDepaId" className={styles.inputMaterial} label="Estado Deparatamento" onChange={handleChange} />
                  </Grid>       
                  <Grid item xs={12} md={6}>
                     <TextField name="CantHabitaciones" className={styles.inputMaterial} label="Cantidad de Habitaciones" onChange={handleChange} />
                  </Grid>   
                  <Grid item xs={12} md={6}>
                     <FormControlLabel 
                     control={<Checkbox checked={departamento.IndCocina} onChange={handleChange} color='primary' name="IndCocina"/>}
                     label="Cocina"/>
                     </Grid>   
                     <Grid item xs={12} md={6}>
                     <FormControlLabel 
                     control={<Checkbox checked={departamento.IndBalcon} onChange={handleChange} color='primary' name="IndBalcon"/>}
                     label="Balcon"/>
                     </Grid>      
                     <Grid item xs={12} md={6}>
                     <FormControlLabel 
                     control={<Checkbox checked={departamento.IndLavanderia} onChange={handleChange} color='primary' name="IndLavanderia"/>}
                     label="Lavanderia"/>
                     </Grid>
                     <Grid item xs={12} md={6}>
                     <FormControlLabel 
                     control={<Checkbox checked={departamento.IndPiscina} onChange={handleChange} color='primary' name="IndPiscina"/>}
                     label="Piscina"/>
                     </Grid>
                     <Grid item xs={12} md={6}>
                     <FormControlLabel 
                     control={<Checkbox checked={departamento.IndPatio} onChange={handleChange} color='primary' name="IndPatio"/>}
                     label="Patio"/>
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
   const bodyEditar=(
      <div className={styles.modal}>
         <Container component="main" maxWidth="md" justifyContent="center">
         <Typography className={styles.modalTitle} component="h1" variant="h5">Editar Departamento</Typography>
         <form className={styles.modalForm}>
           <Grid container spacing={2} justifyContent="center">
           <Grid item xs={12} md={12}>
         <TextField name="DepartamentoId" className={styles.inputMaterial} label="DepartamentoId" onChange={handleChange} value={departamento && departamento.DepartamentoId}></TextField>
             </Grid>
             <Grid item xs={12} md={6}>
         <TextField name="NroDepartamento" className={styles.inputMaterial} label="NroDepartamento" onChange={handleChange} value={departamento && departamento.NroDepartamento}></TextField>
               </Grid>
              <Grid item xs={12} md={6}>
         <TextField name="Tamaño" className={styles.inputMaterial} label="Tamaño" onChange={handleChange} value={departamento && departamento.Tamaño}></TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
         <TextField name="TipoDepaId" className={styles.inputMaterial} label="TipoDepaId" onChange={handleChange} value={departamento && departamento.TipoDepaId}></TextField>
                </Grid>
                  <Grid item xs={12} md={6}>
            <TextField name="EstadoDepaId" className={styles.inputMaterial} label="EstadoDepaId" onChange={handleChange} value={departamento && departamento.EstadoDepaId}></TextField>
              </Grid>    
              <Grid item xs={12} md={6}>
            <TextField name="CantHabitaciones" className={styles.inputMaterial} label="CantHabitaciones" onChange={handleChange} value={departamento && departamento.CantHabitaciones}></TextField>
              </Grid>   
              <Grid item xs={12} md={6}>
                     <FormControlLabel 
                     control={<Checkbox checked={departamento.IndCocina} onChange={handleChange} color='primary' name="IndCocina"/>}
                     label="Cocina" value={departamento && departamento.IndCocina}/>
                     </Grid>   
                     <Grid item xs={12} md={6}>
                     <FormControlLabel 
                     control={<Checkbox checked={departamento.IndBalcon} onChange={handleChange} color='primary' name="IndBalcon"/>}
                     label="Balcon" value={departamento && departamento.IndBalcon}/>
                     </Grid>      
                     <Grid item xs={12} md={6}>
                     <FormControlLabel 
                     control={<Checkbox checked={departamento.IndLavanderia} onChange={handleChange} color='primary' name="IndLavanderia"/>}
                     label="Lavanderia" value={departamento && departamento.IndLavanderia}/>
                     </Grid>
                     <Grid item xs={12} md={6}>
                     <FormControlLabel 
                     control={<Checkbox checked={departamento.IndPiscina} onChange={handleChange} color='primary' name="IndPiscina"/>}
                     label="Piscina" value={departamento && departamento.IndPiscina}/>
                     </Grid>
                     <Grid item xs={12} md={6}>
                     <FormControlLabel 
                     control={<Checkbox checked={departamento.IndPatio} onChange={handleChange} color='primary' name="IndPatio"/>}
                     label="Patio"/>
                     </Grid>           
             </Grid>
             <Grid container spacing={2} justifyContent="center">
             <Grid item xs={6} md={6}>
           <Button color="primary" onClick={()=>PeticionPut()}>Editar</Button>
           </Grid>
           <Grid item xs={6} md={6}>
           <Button onClick={abrirCerrarModalEditar}>Cancelar</Button>
           </Grid>
           </Grid>
          </form>
          </Container>
      </div>
      
   )

   const bodyEliminar=(
      <div className={styles.modal}>
         <p>Estas seguro que deseas eliminar el departamento seleccionado<b>{departamento && departamento.DepartamentoId}</b></p>
         <Grid container spacing={2} justifyContent="center">
         <Grid item xs={6} md={6}>
              <Button color="secondary" onClick={()=>PeticionDelete()}>Si</Button>
              </Grid>
              <Grid item xs={6} md={6}>
              <Button onClick={abrirCerrarModalEliminar}></Button>
              </Grid>
              </Grid>
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
                     <TableCell>Id Departamento</TableCell>
                     <TableCell>Numero de Habitaciones</TableCell>
                     <TableCell>Propietario</TableCell>
                     <TableCell>Area</TableCell>
                     <TableCell>Estado</TableCell>
                     <TableCell>Numero de Edificio</TableCell>
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
export default Departamento;

