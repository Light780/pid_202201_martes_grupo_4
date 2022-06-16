using AppDepa.Aplicaciones.HistorialIncidencias;
using AppDepa.Infraestructura.Datos.Dapper.HistorialIncidencia;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.API.Controllers
{
    public class HistorialIncidenciaController : CustomController
    {
        [HttpGet("consulta")]
        public async Task<ActionResult<List<HistorialIncidenciaDto>>> ListarHIncidencias([FromQuery] Consultar.ListarHistorial data)
        {
            return await mediator.Send(data);
        }
    }
}
