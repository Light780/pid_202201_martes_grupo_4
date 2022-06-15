using AppDepa.Aplicaciones.Exceptions;
using AppDepa.Infraestructura.Datos.Context;
using AppDepa.Infraestructura.Datos.Dapper.Usuario;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.User
{
    public class Consultar
    {
        public class UsuarioUnico : IRequest<UsuarioDto>
        {
            public int UsuarioId { get; set; }
        }

        public class Handler : IRequestHandler<UsuarioUnico, UsuarioDto>
        {
            private readonly GestionDepartamentosContext context;
            public Handler(GestionDepartamentosContext _context)
            {
                this.context = _context;
            }
            public async Task<UsuarioDto> Handle(UsuarioUnico request, CancellationToken cancellationToken)
            {
                var usuario = await context.Usuario.Where(x => x.UsuarioId == request.UsuarioId).SingleOrDefaultAsync();
                if (usuario == null)
                {
                    throw new ExceptionHandler(HttpStatusCode.NotFound, new { mensaje = "El Usuario no existe" });
                }
                return new UsuarioDto()
                {
                    UsuarioId = usuario.UsuarioId,
                    UserName = usuario.UserName,
                    NombreCompleto = usuario.NombreCompleto,
                    Email = usuario.Email,
                    FotoPerfil = usuario.FotoPerfil != null ? Convert.ToBase64String(usuario.FotoPerfil) : ""
                };
            }
        }
    }
}
