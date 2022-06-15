using AppDepa.Aplicaciones.Boletas;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using AppDepa.Aplicaciones.Dto;

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
        public  async Task<ActionResult<List<BoletaDto>>> ListarBoleta([FromQuery] Consultar.ListaBoleta data)
        {
            return await mediator.Send(data);
        }
    }
}
