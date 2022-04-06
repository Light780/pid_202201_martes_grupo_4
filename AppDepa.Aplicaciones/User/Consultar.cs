using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppDepa.Dominio;
using System.Threading;
using AppDepa.Infraestructura.Datos.Context;
using Microsoft.EntityFrameworkCore;
using System.Net;
using AppDepa.Dominio.Exceptions;
using AppDepa.Aplicaciones.Dto;

namespace AppDepa.Aplicaciones.User
{
    public class Consultar
    {
        public class UsuarioUnico : IRequest<UsuarioDto> {
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
