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
using AppDepa.Aplicaciones.Dto;
using AppDepa.Aplicaciones.Exceptions;

namespace AppDepa.Aplicaciones.User
{
    public class Editar
    {
        public class Ejecuta : IRequest<UsuarioDto>
        {
            public int UsuarioId { get; set; }
            public string UserName { get; set; }
            public string NombreCompleto { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string PasswordConfirm { get; set; }
            public string FotoPerfil { get; set; }
        }
        public class EjecutaValidation : AbstractValidator<Ejecuta>
        {
            public EjecutaValidation()
            {
                RuleFor(x => x.UserName).NotEmpty().WithMessage("Username no debe estar vacio");
                RuleFor(x => x.NombreCompleto).NotEmpty().WithMessage("Nombre Completo no debe estar vacio");                
                RuleFor(x => x.Email)
                    .NotEmpty().WithMessage("Email no debe estar vacio")
                    .EmailAddress().WithMessage("Debe tener formato de Email");
                RuleFor(x => x.Password)
                    .NotEmpty().WithMessage("Email no debe estar vacio")
                    .MinimumLength(8).WithMessage("Debe tener almenos 8 caracteres");
            }
        }
        public class Handler : IRequestHandler<Ejecuta, UsuarioDto>
        {
            private readonly GestionDepartamentosContext context;                        
            public Handler(GestionDepartamentosContext _context)
            {
                this.context = _context;                                
            }
            public async Task<UsuarioDto> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                if (!request.Password.Equals(request.PasswordConfirm))
                    throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "Las contraseñas no coinciden" });
                var usuario = await context.Usuario.Where(x => x.UsuarioId == request.UsuarioId).SingleOrDefaultAsync();
                if (usuario == null)
                {
                    throw new ExceptionHandler(HttpStatusCode.NotFound, new { mensaje = "El Usuario no existe" });
                }
                var existe = await context.Usuario.Where(x => x.UserName.Equals(request.UserName) && x.UsuarioId!=usuario.UsuarioId).AnyAsync();
                if (existe)
                {
                    throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "El Username ya ha sido registrado por otro usuario" });
                }
                existe = await context.Usuario.Where(x => x.Email.Equals(request.Email) && x.UsuarioId != usuario.UsuarioId).AnyAsync();
                if (existe)
                {
                    throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "El Email ya se encuentra registrado por otro usuario" });
                }

                usuario.UserName = request.UserName;
                usuario.NombreCompleto = request.NombreCompleto;
                usuario.Email = request.Email;
                usuario.Password = request.Password;                
                usuario.FotoPerfil = request.FotoPerfil != null ? Convert.FromBase64String(request.FotoPerfil.Split(',')[1]) : usuario.FotoPerfil;
                context.Usuario.Update(usuario);
                var result = await context.SaveChangesAsync();
                if (result > 0)
                {
                    return new UsuarioDto()
                    {
                        UsuarioId = usuario.UsuarioId,
                        UserName = usuario.UserName,
                        NombreCompleto = usuario.NombreCompleto,
                        Email = usuario.Email,
                        FotoPerfil = usuario.FotoPerfil != null ? Convert.ToBase64String(usuario.FotoPerfil) : null,                        
                    };
                }
                throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "Error al modificar datos del usuario" });
            }
        }
    }
}
