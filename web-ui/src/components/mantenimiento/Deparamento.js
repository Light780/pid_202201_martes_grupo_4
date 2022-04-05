import { Avatar, Button, Container, TextField, Typography,Modal,TableContainer,TableHead, TableCell, TableBody, TableRow } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons/';
import React, { useState,useEffect } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import style from '../tools/style'
import axios from 'axios';


const baseUrl='http://localhost:8090/consolas'

const useStyles = makeStyles((theme) => ({
   modal: {
       position: 'absolute',
       width: 400,
       backgroundColor: theme.palette.background.paper,
       border: '2px solid #000',
       top: '50%',
       left: '50%',
       transform: 'translate(-50%, -50%)'
   },
   iconos:{
      cursor: 'pointer'
   },
   inputMaterial:{
      width: '100%'
   }
}));

function RegistrarDepa () {
   const styles= useStyles();
     const navigate = useNavigate()
     const [departamento, setDepartamento] = useState({
        ID:'',
        Habitaciones:0,
        propietario:'',
        Area:0,
        Estado:'',
        NroEdificio:0 
    
     })
  const [modalInsertar,setModalInsertar]=useState(false);

  const peticionGet=async()=>{
     await axios.get(baseUrl)
     .then(response=>{
        setDepartamento(response.departamento);
     })
  }
 const PeticionPost=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
       setDepartamento(response.departamento);
    })
 }
const abrirCerrarModalInsertar=()=>{
   setModalInsertar(!modalInsertar);
}

useEffect(async()=>{
   await peticionGet();
},[]) 

const bodyInsertar=(
<div className={styles.modal}>
   <h1>Registrar Nuevo Departamento</h1>
   <TextField name="IdDepartmento" className={styles.inputMaterial} label="Id" onChange={handleChange}/>
   <br/>
   <TextField name="Habitaciones" className={styles.inputMaterial} label="Numero de Habitaciones" onChange={handleChange}/>
   <br/>
   <TextField name="Propietario" className={styles.inputMaterial} label="Propietario" onChange={handleChange}/>
   <br/>
   <TextField name="Area" className={styles.inputMaterial} label="Area" onChange={handleChange}/>
   <br/>
   <TextField name="Estado" className={styles.inputMaterial} label="Estado" onChange={handleChange}/>
   <br/>
   <TextField name="nro_edificio" className={styles.inputMaterial} label="Numero de Edificio" onChange={handleChange}/>
   <br/><br/>
   <div align="right">
   <Button type="submit" fullWidth variant="contained" color="primary"  onClick={()=>peticionPost()}>Registrar</Button>
   <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
   </div>
  </div>
)

  

 return (
    
   <div className='Departamento'>
      <TableContainer>
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
               {departamento.map(consola=>(
                  <TableRow key={consola.ID}>
                     <TableCell>{consola.Habitaciones}</TableCell>
                     <TableCell>{consola.propietario}</TableCell>
                     <TableCell>{consola.Area}</TableCell>
                     <TableCell>{consola.Estado}</TableCell>
                     <TableCell>{consola.NroEdificio}</TableCell>
                     <TableCell>
                        <Edit/>
                        &nbsp;&nbsp;&nbsp;
                        <Delete/>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>

      <Modal
      open={modalInsertar}
      onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
      </Modal>
   </div>

 
);
}

