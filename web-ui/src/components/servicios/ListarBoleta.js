import { Grid, Table, Button, Container, TextField, Typography, Modal, TableContainer, TableHead, TablePagination, TableCell, TableBody, TableRow, Paper, Checkbox, FormControlLabel, Hidden, IconButton } from '@mui/material';
import { Edit, Delete, Info, CheckCircle } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { useStyles, style } from '../tools/style'
import {listarBoleta} from '../../actions/BoletaAction'
import { useStateValue } from '../../context/store';
import SelectParametro from '../utils/SelectParametro';
import ResponsiveButton from '../utils/ResponsiveButton';
import Departamento from '../mantenimiento/Departamento';

function ListarBoleta(){
    const [page, setPage] = useState(0)
    const [{ sesionUsuario }, dispatch] = useStateValue()
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [listaBoleta, setListaBoleta] = useState([])
    const [filtro, setFiltro] = useState({
        filtroDepartamento: "",
        filtroFechaPago: ""
    })
    const [boleta, setBoleta] = useState({
        boletaId: 0,
        servicioId : 0,
        Departamento : '',
        Periodo:'',
        codigoPago:'',
        monto: 0.00,
        usuarioId: sesionUsuario.usuario.usuarioId,
        fechaPago:  ''
    })
    const [errores, setErrores] = useState({})
    const peticionGet = () => {
        listarBoleta(filtro).then(respuesta =>{
            if (respuesta.status === 200) {
                setListaBoleta(respuesta.data)
            }else{
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
}