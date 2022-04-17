using AppDepa.Dominio;
using AppDepa.Infraestructura.Datos.Context;
using System.Collections.Generic;
using System.Linq;

namespace AppDepa.Aplicaciones.Utils
{
    public class Utils : IUtils
    {
        private List<Parametro> ListaParametros;
        private readonly GestionDepartamentosContext context;

        public Utils(GestionDepartamentosContext _context)
        {
            this.context = _context;
            InicializarVariables();
        }
        private void InicializarVariables()
        {
            ListaParametros = context.Parametro.ToList();
        }

        public string BuscarParametro(int param, string reporte)
        {
            return ListaParametros.Where(x => x.ParametroId.Equals(reporte) && x.ParamId == param).SingleOrDefault()?.Descripcion ?? "";
        }
    }
}
