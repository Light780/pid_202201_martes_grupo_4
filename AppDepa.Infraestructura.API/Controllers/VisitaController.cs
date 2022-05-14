using AppDepa.Aplicaciones.Dto;
using AppDepa.Aplicaciones.Visitas;
using AppDepa.Dominio;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.API.Controllers
{
    public class VisitaController : CustomController
    {
        [HttpGet("consulta")]
        public async Task<ActionResult<List<VisitaDto>>> ListarPersona([FromQuery] Consultar.ListarVisitas data)
        {
            return await mediator.Send(data);
        }
    }
}
