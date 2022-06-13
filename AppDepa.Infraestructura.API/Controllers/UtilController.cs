using AppDepa.Aplicaciones.Utils;
using AppDepa.Dominio;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.API.Controllers
{
    public class UtilController : CustomController
    {
        [HttpGet("{parametroId}")]
        public async Task<ActionResult<List<Parametro>>> ListarParametros(string parametroId)
        {
            return await mediator.Send(new Consultar.ListaParametros() { ParametroId = parametroId });
        }
        [HttpGet]
        public async Task<ActionResult<object>> ListaCantidades()
        {
            return await mediator.Send(new ConsultarCantidades.Dashboard());
        }
    }
}
