using AppDepa.Aplicaciones.Incidencias;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.API.Controllers
{
    public class IncidenciaController : CustomController
    {
        [HttpPost]
        public async Task<ActionResult<Unit>> RegistrarIncidencia([FromBody] Registrar.Ejecuta data)
        {
            return await mediator.Send(data);
        }
    }
}
