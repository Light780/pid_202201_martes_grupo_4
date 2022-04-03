const initialState = {
    usuario:{
        usuarioId: 0,
        userName: '',
        nombreCompleto: '',
        email: '',
        password: '',
        fotoPerfil: '',
        fechaRegistro: ''
    },
    autenticado:false
}
const sesionUsuarioReducer = (state = initialState, action) =>{
    switch (action.type) {
        case "INICIAR_SESION":
            return{
                ...state,
                usuario:action.sesion,
                autenticado:action.autenticado
            };
        case "SALIR_SESION":
            return {
                ...state,
                usuario:action.nuevoUsuario,
                autenticado:action.autenticado
            };
        case "ACTUALIZAR_USUARIO":
            return {
                ...state,
                usuario:action.nuevoUsuario,
                autenticado:action.autenticado
            };        
        default :
            return state;
    }
}
export default sesionUsuarioReducer;