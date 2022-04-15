using AppDepa.Dominio;
using AppDepa.Infraestructura.Datos.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Utils
{
    public class Utils : IUtils
    {
        private List<Parametro> ListaParametros;
        private readonly GestionDepartamentosContext context;

        public Utils(GestionDepartamentosContext _context)
        {
           this.context=_context;
           InicializarVariables();
        }
        private void InicializarVariables()
        {
            ListaParametros = context.Parametro.ToList();
        }

        public string BuscarParamaetro(int param, string reporte)
        {
            return ListaParametros.Where(x => x.ParametroId.Equals(reporte) && x.ParamId==param).FirstOrDefault().Descripcion ?? "";
        }
    }
}
