using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Exceptions
{
    public class ExceptionHandler : Exception
    {
        public HttpStatusCode Codigo { get; set; }
        public object Errores { get; set; }
        public ExceptionHandler(HttpStatusCode _Codigo, object _Errores = null)
        {
            this.Codigo = _Codigo;
            this.Errores = _Errores;
        }
    }
}
