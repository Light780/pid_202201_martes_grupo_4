using AppDepa.Aplicaciones.Dto;
using AppDepa.Aplicaciones.Personas;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.API.Controllers
{
    public class PersonaController : CustomController
    {
        [HttpPost]
        public async Task<ActionResult<Unit>> RegistrarPersonas(Registrar.Ejecuta data)
        {
            return await mediator.Send(data);
        }

        [HttpGet("consulta/")]
        public async Task<ActionResult<List<PersonaDto>>> ListarPersona([FromQuery] Consultar.ListarPersonas data)
        {
            return await mediator.Send(data);
        }

        [HttpPut]
        public async Task<ActionResult<PersonaDto>> ActualizarPersona(Editar.Ejecuta data)
        {
            return await mediator.Send(data);
        }
    }
}
