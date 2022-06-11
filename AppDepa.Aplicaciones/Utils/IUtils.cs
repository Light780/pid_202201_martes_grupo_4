using System;

namespace AppDepa.Aplicaciones.Utils
{
    public interface IUtils
    {
        string BuscarParametro(int param, string reporte);
        DateTime ObtenerFecha();
        DateTime ObtenerUltimoDiaFecha(DateTime fechaInicial);
        string GenerarCodigoAleatorio(int longitud);
    }
}
