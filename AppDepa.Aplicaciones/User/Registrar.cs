using AppDepa.Dominio;
using AppDepa.Infraestructura.Datos.Context;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AppDepa.Dominio.Exceptions;
namespace AppDepa.Aplicaciones.User
{
    public class Registrar
    {
        #region Cuerpo que sera ingresado desde el cliente
        public class Ejecuta : IRequest
        {
            public string UserName { get; set; }
            public string Nombres { get; set; }
            public string Apellidos { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }
        #endregion
        #region Validaciones del cuerpo
        public class EjecutaValidation : AbstractValidator<Ejecuta>
        {
            public EjecutaValidation()
            {
                RuleFor(x => x.UserName).NotEmpty().WithMessage("Username no debe estar vacio");
                RuleFor(x => x.Nombres).NotEmpty().WithMessage("Nombres no debe estar vacio");
                RuleFor(x => x.Apellidos).NotEmpty().WithMessage("Apellidos no debe estar vacio");
                RuleFor(x => x.Email)
                    .NotEmpty().WithMessage("Email no debe estar vacio")
                    .EmailAddress().WithMessage("Debe tener formato de Email");
                RuleFor(x => x.Password)
                    .NotEmpty().WithMessage("Email no debe estar vacio")
                    .MinimumLength(8).WithMessage("Debe tener almenos 8 caracteres");
            }
        }
        #endregion
        #region Accion que se realizará
        public class Handler : IRequestHandler<Ejecuta>
        {
            private readonly GestionDepartamentosContext context;
            public Handler(GestionDepartamentosContext _context)
            {
                this.context = _context;
            }
            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var existe = await context.Usuario.Where(x => x.UserName.Equals(request.UserName)).AnyAsync();
                if (existe)
                {
                    throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "El Username ya ha sido registrado por otro usuario" });
                }
                existe = await context.Usuario.Where(x => x.Email.Equals(request.Email)).AnyAsync();
                if (existe)
                {
                    throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "El Email ya se encuentra registrado por otro usuario" });
                }
                Usuario usuario = new Usuario()
                {
                    UserName = request.UserName,
                    NombreCompleto = string.Concat(request.Nombres, " ", request.Apellidos),
                    Email=request.Email,
                    Password = request.Password,
                    FotoPerfil = null,
                    FechaRegistro = DateTime.UtcNow
                };
                context.Usuario.Add(usuario);
                var result = await context.SaveChangesAsync();
                if(result > 0)
                {
                    return Unit.Value;
                }
                throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "Error al registrar el usuario" });
            }
        }
        #endregion
    }
}
