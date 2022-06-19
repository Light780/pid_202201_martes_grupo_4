import { Apartment, EmojiPeople, Person, Pets, Receipt } from '@mui/icons-material';
import { Grid, Table, TableHead, TablePagination, TableRow, Paper, TableCell, TableBody, TableContainer } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import React, { useEffect, useState } from 'react';
import { consultarCantidades } from '../actions/UtilsAction';
import { useStateValue } from '../context/store';
import { useStyles } from './tools/style'
import Cards from './utils/Cards';
const Inicio = () => {
    const styles = useStyles();
    const [{ sesionUsuario }, dispatch] = useStateValue()
    const [dashboard, setDashboard] = useState({
        cantDepartamentos: 0,
        cantPersonas: 0,
        cantVisitas: 0,
        cantBoletas: 0,
        cantIncidencias: 0,
        listaCantDep: []
    })
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const peticionGet = () => {
        consultarCantidades().then(response => {
            if (response.status === 200) {
                setDashboard(response.data)
            } else {
                dispatch({
                    type: 'OPEN_SNACKBAR',
                    openMensaje: {
                        open: true,
                        mensaje: 'Error al consultar',
                        severity: 'error'
                    }
                })
            }
        })
    }

    useEffect(() => {
        peticionGet();
    }, [])

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, dashboard.listaCantDep.length - page * rowsPerPage);
    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };
    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className={styles.grow}>

            <Grid container spacing={3} className={styles.container}>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Cards
                        icono={<Apartment className={styles.iconCard} />}
                        titulo="Departamentos"
                        texto={dashboard.cantDepartamentos}
                        color="gray"
                        fontColor="white"
                        link="/mantenimiento/departamento" />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Cards
                        icono={<Person className={styles.iconCard} />}
                        titulo="Personas"
                        texto={dashboard.cantPersonas}
                        color="red"
                        fontColor="white"
                        link="/mantenimiento/persona" />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Cards
                        icono={<Pets className={styles.iconCard} />}
                        titulo="Mascotas"
                        texto={dashboard.cantMascotas}
                        color="green"
                        fontColor="white"
                        link="/mantenimiento/mascota" />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Cards
                        icono={<EmojiPeople className={styles.iconCard} />}
                        titulo="Visitas"
                        texto={dashboard.cantVisitas}
                        color="orange"
                        fontColor="white"
                        link="/visita/consultaVisita" />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Cards
                        icono={<Receipt className={styles.iconCard} />}
                        titulo="Boletas"
                        texto={dashboard.cantBoletas}
                        color="skyblue"
                        fontColor="white"
                        link="/servicio/consultarBoleta" />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Cards
                        icono={<ReportProblemIcon className={styles.iconCard} />}
                        titulo="Incidencias"
                        texto={dashboard.cantIncidencias}
                        color="darkorange"
                        fontColor="white"
                        link="/incidencia/consultarIncidencia" />
                </Grid>
            </Grid>
            <div className={styles.container} style={{ paddingBottom:"25px" }}>
                <Paper className={styles.paperBody}>
                    <TableContainer className={styles.table}>
                        <Table stickyHeader style={{ width: "100%" }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'>Departamento</TableCell>
                                    <TableCell align='center'>Personas</TableCell>
                                    <TableCell align='center'>Mascotas</TableCell>
                                    <TableCell align='center'>Incidencias</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dashboard.listaCantDep && dashboard.listaCantDep.slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                ).map((departamento, index) =>
                                    <TableRow
                                        key={departamento.departamentoId}
                                        style={
                                            index % 2
                                                ? { background: "#f5f5f5" }
                                                : { background: "white" }
                                        }
                                    >
                                        <TableCell size="small" align="center">
                                            {departamento.nroDepartamento}
                                        </TableCell>
                                        <TableCell size="small" align="center">
                                            {departamento.cantPersonas}
                                        </TableCell>
                                        <TableCell size="small" align="center">
                                            {departamento.cantIncidencias}
                                        </TableCell>
                                        <TableCell size="small" align="center">
                                            {departamento.cantMascotas}
                                        </TableCell>
                                    </TableRow>
                                )}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows/2}} className={styles.tableRow}>
                                        <TableCell colSpan={4} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={dashboard.listaCantDep.length ?? 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowsPerPageChange}
                    />
                </Paper>
            </div>
        </div>
    );
};

export default Inicio;