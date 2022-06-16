using System;

namespace AppDepa.Aplicaciones.Utils
{
    public interface IUtils
    {
        DateTime ObtenerFecha();
        DateTime ObtenerUltimoDiaFecha(DateTime fechaInicial);
        string GenerarCodigoAleatorio(int longitud);
    }
}
