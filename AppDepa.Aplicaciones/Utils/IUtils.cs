using System;

namespace AppDepa.Aplicaciones.Utils
{
    public interface IUtils
    {
        string BuscarParametro(int param, string reporte);
        DateTime ObtenerFecha();
    }
}
