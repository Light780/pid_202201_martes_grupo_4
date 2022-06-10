using System;

namespace AppDepa.Aplicaciones.Utils
{
    public interface IUtils
    {
        string BuscarParametro(int param, string reporte);
        DateTime ObtenerFecha();
        void SetUsuarioSession(int usuarioId);
        int GetUsuarioSession();
        void DeleteUsuarioSession();
        string GenerarCodigoAleatorio(int longitud);
    }
}
