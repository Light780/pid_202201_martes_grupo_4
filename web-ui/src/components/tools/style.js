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
    crudTitle:{
        margin: 5,        
    },
    backgroundTitle:{
        backgroundColor:'lightgray'
    },
    avatar: {
        margin: 5,
        backgroundColor: "#1976d2",
        width: 100,
        height: 100
    },
    icon: {
        fontSize: 40
    },
    detail:{                
        marginTop:20        
    }  
}
export const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 700,
        [theme.breakpoints.down("md")]: {
            width: 500,
        },
        [theme.breakpoints.down("xs")]: {
            width: 300,
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
    crud:{
        padding: 10, 
        width: "100%"        
    },    
    paperTitle:{
        backgroundColor: theme.palette.primary.main,
        color:theme.palette.primary.contrastText,
    },
    paperBody:{
        paddingLeft:5, 
        paddingRight:5
    },
    table:{        
        maxHeight: 650,
        [theme.breakpoints.down("xs")]: {
            maxHeight: 500,
        },
        [theme.breakpoints.down("md")]: {
            maxHeight: 500,
        }                
    },    
    modalTitle: {
        marginTop:5        
    }    
 }));
export default useStyles