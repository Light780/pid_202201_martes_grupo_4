using AppDepa.Aplicaciones.User;
using AppDepa.Infraestructura.Datos.Dapper.Usuario;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.API.Controllers
{
    public class UsuarioController : CustomController
    {
        [HttpPost]
        public async Task<ActionResult<Unit>> RegistrarUsuario([FromBody] Registrar.Ejecuta data)
        {
            return await mediator.Send(data);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<UsuarioDto>> GetUsuario(int id)
        {
            return await mediator.Send(new Consultar.UsuarioUnico() { UsuarioId = id });
        }
        [HttpPut]
        public async Task<ActionResult<UsuarioDto>> EditarUsuario([FromBody] Editar.Ejecuta data)
        {
            return await mediator.Send(data);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> EliminarUsuario(int id)
        {
            return await mediator.Send(new Eliminar.Ejecuta { Id = id });
        }
        [HttpPost("login")]
        public async Task<ActionResult<UsuarioDto>> Login([FromBody] Login.Ejecuta data)
        {
            return await mediator.Send(data);
        }
    }
}
