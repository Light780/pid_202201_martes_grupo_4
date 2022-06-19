import { makeStyles } from "@mui/styles";

export const style = {
  paper: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: 20,
  },
  submit: {
    marginTop: 15,
    marginBottom: 10,
  },
  crudTitle: {
    margin: 5,
  },
  backgroundTitle: {
    backgroundColor: "lightgray",
  },
  avatar: {
    margin: 5,
    backgroundColor: "#1976d2",
    width: 100,
    height: 100,
  },
  checkFiltro: {
    marginTop: 15,
  },
  icon: {
    fontSize: 40,
  },
  detail: {
    marginTop: 20,
  },
};
export const useStyles = makeStyles((theme) => ({
  seccionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  seccionMobil: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  grow: {
    flexGrow: 1,
  },
  avatarSize: {
    width: 40,
    height: 40,
  },
  list: {
    width: 250,
  },
  listItemText: {
    fontSize: "14px",
    fontWeight: 600,
    color: "black",
  },
  iconMenu: {
    paddingRight: 10,
  },
  menu: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  subMenu: {
    backgroundColor: "white",
    color: "black",
  },
  modal: {
    position: "absolute",
    width: 700,
    [theme.breakpoints.down("md")]: {
      width: 500,
    },
    [theme.breakpoints.down("sm")]: {
      width: 350,
    },
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  modalForm: {
    width: "100%",
    marginTop: "15px"
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
  crud: {
    paddingTop: 10,
    width: "100%",
  },
  paperTitle: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    marginBottom: 15,
  },
  paperBody: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  table: {    
    maxHeight: 650,
    [theme.breakpoints.down("xs")]: {
      maxHeight: 500,
    },
    [theme.breakpoints.down("md")]: {
      maxHeight: 500,
    },
  },
  modalTitle: {
    marginTop: 5,
  },
  iconCard: {
    color: "white",
  },
  container: {
    paddingTop: "40px",
    paddingLeft: "40px",
    paddingRight: "40px",
    alignItems: "center",
  },
  modalTable: {
    position: "absolute",    
    [theme.breakpoints.up("lg")]: {
      width: 1200,
    },
    [theme.breakpoints.down("lg")]: {
      width: 800,
    },
    [theme.breakpoints.down("md")]: {
      width: 600,
    },
    [theme.breakpoints.down("sm")]: {
      width: 350,
    },
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));
export default useStyles;
