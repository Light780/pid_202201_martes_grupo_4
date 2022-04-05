import { makeStyles } from "@material-ui/core";

export const style = {
    paper: {
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    form: {
        width: "100%",
        marginTop: 20
    },
    submit: {
        marginTop: 15,
        marginBottom:10
    },
    avatar: {
        margin: 5,
        backgroundColor: "#1976d2",
        width: 100,
        height: 100
    },
    icon: {
        fontSize: 40
    }  
}
export const styleModal = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 700,
        [theme.breakpoints.down("md")]: {
            width: 400,
        },
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    modalForm: {
        width: "100%"        
    },
    iconos:{
       cursor: 'pointer'
    },
    inputMaterial:{
       width: '100%'
    },
    table:{
        padding: 10, 
        width: "100%"
    },
    modalTitle: {
        marginTop:5        
    }    
 }));
export default style