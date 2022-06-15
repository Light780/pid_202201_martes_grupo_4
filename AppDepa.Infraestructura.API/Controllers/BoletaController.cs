using AppDepa.Aplicaciones.Boletas;
using AppDepa.Aplicaciones.Dto;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.API.Controllers
{
    public class BoletaController : CustomController
    {
        [HttpPost]
        public async Task<ActionResult<Unit>> GenerarBoletas([FromBody] Generar.Ejecuta data)
        {
            return await mediator.Send(data);
        }
        [HttpGet("consulta")]
        public async Task<ActionResult<List<BoletaDto>>> ListarBoleta([FromQuery] Consultar.ListaBoleta data)
        {
            return await mediator.Send(data);
        }
    }
}
