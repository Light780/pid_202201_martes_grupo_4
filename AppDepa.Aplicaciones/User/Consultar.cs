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

namespace AppDepa.Aplicaciones.User
{
    public class Consultar
    {
        public class UsuarioUnico : IRequest<Usuario> {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<UsuarioUnico, Usuario>
        {
            private readonly GestionDepartamentosContext context;
            public Handler(GestionDepartamentosContext _context)
            {
                this.context = _context;
            }
            public async Task<Usuario> Handle(UsuarioUnico request, CancellationToken cancellationToken)
            {
                var usuario = await context.Usuario.Where(x => x.Id == request.Id).SingleOrDefaultAsync();
                if (usuario == null)
                {
                    throw new ExceptionHandler(HttpStatusCode.NotFound, new { mensaje = "El Usuario no existe" });
                }
                return usuario;
            }
        }
    }
}
