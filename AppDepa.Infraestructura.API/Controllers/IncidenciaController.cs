using AppDepa.Aplicaciones.Dto;
using AppDepa.Aplicaciones.Incidencias;
using AppDepa.Dominio;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
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

        [HttpPut]
        public async Task<ActionResult<Unit>> ActualizarIncidencia([FromBody] Editar.Ejecuta data)
        {
            return await mediator.Send(data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Incidencia>> ObtenerPersona(int id)
        {
            return await mediator.Send(new ConsultarUnico.Ejecuta() { IncidenciaId = id });
        }
    }
}
