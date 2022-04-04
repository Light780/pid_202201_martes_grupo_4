﻿using AppDepa.Dominio;
using AppDepa.Dominio.Exceptions;
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

namespace AppDepa.Aplicaciones.User
{
    public class Login
    {
        public class Ejecuta : IRequest<UsuarioData>
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
        public class Handler : IRequestHandler<Ejecuta, UsuarioData>
        {
            private readonly GestionDepartamentosContext context;                        
            public Handler(GestionDepartamentosContext _context)
            {
                this.context = _context;                                
            }
            public async Task<UsuarioData> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var usuario = await context.Usuario.Where(x => x.Email.Equals(request.Email) && x.Password.Equals(request.Password)).SingleOrDefaultAsync();
                if(usuario == null)
                {
                    throw new ExceptionHandler(HttpStatusCode.BadRequest, "Credenciales incorrectas");
                }
                return new UsuarioData()
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
