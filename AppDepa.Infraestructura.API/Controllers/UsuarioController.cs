using AppDepa.Aplicaciones.User;
using AppDepa.Dominio;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.API.Controllers
{
    [AllowAnonymous]
    public class UsuarioController : CustomController
    {
        [HttpPost]
        public async Task<ActionResult<Unit>> RegistrarUsuario(Registrar.Ejecuta data)
        {
            return await mediator.Send(data);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<UsuarioData>> GetUsuario(int id)
        {
            return await mediator.Send(new Consultar.UsuarioUnico() { UsuarioId = id});
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<UsuarioData>> EditarUsuario(Editar.Ejecuta data, int id)
        {
            data.UsuarioId = id;
            return await mediator.Send(data);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> EliminarUsuario(int id)
        {            
            return await mediator.Send(new Eliminar.Ejecuta { Id = id});
        }
        [HttpPost("login")]
        public async Task<ActionResult<UsuarioData>> Login(Login.Ejecuta data)
        {
            return await mediator.Send(data);
        }

    }
}
