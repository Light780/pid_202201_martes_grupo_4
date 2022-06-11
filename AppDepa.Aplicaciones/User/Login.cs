using AppDepa.Aplicaciones.Dto;
using AppDepa.Aplicaciones.Exceptions;
using AppDepa.Aplicaciones.Utils;
using AppDepa.Infraestructura.Datos.Context;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.User
{
    public class Login
    {
        public class Ejecuta : IRequest<UsuarioDto>
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }
        public class EjecutaValidation : AbstractValidator<Ejecuta>
        {
            public EjecutaValidation()
            {
                RuleFor(x => x.Email)
                   .NotEmpty().WithMessage("Email no debe estar vacio")
                   .EmailAddress().WithMessage("Debe tener formato de Email");
                RuleFor(x => x.Password)
                    .NotEmpty().WithMessage("Email no debe estar vacio");
            }
        }
        public class Handler : IRequestHandler<Ejecuta, UsuarioDto>
        {
            private readonly GestionDepartamentosContext context;
            private readonly IUtils utils;
            public Handler(GestionDepartamentosContext _context, IUtils _utils)
            {
                this.context = _context;
                this.utils = _utils;
            }
            public async Task<UsuarioDto> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var usuario = await context.Usuario.Where(x => x.Email.Equals(request.Email) && x.Password.Equals(request.Password)).SingleOrDefaultAsync();
                if (usuario == null)
                {
                    throw new ExceptionHandler(HttpStatusCode.BadRequest, "Credenciales incorrectas");
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
