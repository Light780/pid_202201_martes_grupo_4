using AppDepa.Aplicaciones.Visitas;
using AppDepa.Dominio;
using AppDepa.Infraestructura.Datos.Dapper.Visita;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.API.Controllers
{
    public class VisitaController : CustomController
    {
        [HttpGet("consulta")]
        public async Task<ActionResult<List<VisitaDto>>> ListarVisita([FromQuery] Consultar.ListarVisitas data)
        {
            return await mediator.Send(data);
        }
        [HttpPost("registrar")]
        public async Task<ActionResult<Unit>> RegistrarVisita([FromBody] RegistrarEntrada.Ejecuta data)
        {
            return await mediator.Send(data);
        }
        [HttpPut("registrarSalida")]
        public async Task<ActionResult<Unit>> RegistrarSalida([FromBody] RegistrarSalida.Ejecuta data)
        {
            return await mediator.Send(data);
        }
    }
}
