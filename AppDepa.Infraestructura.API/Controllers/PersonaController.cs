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

        [HttpGet("{departamentoId}")]
        public async Task<ActionResult<List<PersonaDto>>> ListarPersona(int departamentoId)
        {
            return await mediator.Send(new Consultar.ListarPersonas() { DepartamentoId = departamentoId });
        }

        [HttpPut]
        public async Task<ActionResult<PersonaDto>> ActualizarPersona(Actualizar.Ejecuta data)
        {
            return await mediator.Send(data);
        }
    }
}
