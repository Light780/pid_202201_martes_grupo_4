using AppDepa.Aplicaciones.Dto;
using AppDepa.Aplicaciones.Visitas;
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
        public async Task<ActionResult<Unit>> RegistrarVisita(RegistrarEntrada.Ejecuta data)
        {
            return await mediator.Send(data);
        }
        [HttpPost("registrarSalida")]
        public async Task<ActionResult<Unit>> RegistrarSalida(RegistrarSalida.Ejecuta data)
        {
            return await mediator.Send(data);
        }
    }
}
