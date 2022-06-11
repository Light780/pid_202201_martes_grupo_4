using AppDepa.Aplicaciones.Boletas;
using MediatR;
using Microsoft.AspNetCore.Mvc;
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
    }
}
