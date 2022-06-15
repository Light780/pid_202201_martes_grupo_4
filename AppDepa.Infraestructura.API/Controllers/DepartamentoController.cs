using AppDepa.Aplicaciones.Departamentos;
using AppDepa.Dominio;
using AppDepa.Infraestructura.Datos.Dapper.Departamento;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.API.Controllers
{
    public class DepartamentoController : CustomController
    {
        [HttpPost]
        public async Task<ActionResult<Unit>> RegistrarDepartamento([FromBody] Registrar.Ejecuta data)
        {
            return await mediator.Send(data);
        }
        [HttpPut]
        public async Task<ActionResult<Unit>> ActualizarDepartamento([FromBody] Editar.Ejecuta data)
        {
            return await mediator.Send(data);
        }

        [HttpGet("consulta")]
        public async Task<ActionResult<List<DepartamentoDto>>> ListarDepartamento([FromQuery] Consultar.ListaDepartamento data)
        {
            return await mediator.Send(data);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Departamento>> ObtenerDepartamento(int id)
        {
            return await mediator.Send(new ConsultarUnico.Ejecuta() { DepartamentoId = id });
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> EliminarDepartamento(int id)
        {
            return await mediator.Send(new Eliminar.Ejecuta() { DepartamentoId = id });
        }

    }
}
