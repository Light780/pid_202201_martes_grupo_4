using AppDepa.Aplicaciones.Exceptions;
using AppDepa.Aplicaciones.Dto;
using AppDepa.Aplicaciones.Utils;
using AppDepa.Dominio;
using AppDepa.Infraestructura.Datos.Context;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
//using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Visitas
{
    public class RegistrarSalida
    {
        public class Ejecuta : IRequest
        {
            public int VisitaId { get; set; }
            public int PersonaVisitaId { get; set; }
            public int PersonaId { get; set; }
            public string Comentario { get; set; }
            public int EstadoId { get; set; }
        }

        public class EjecutaValidator : AbstractValidator<Ejecuta>
        {
            public EjecutaValidator()
            {
                RuleFor(x => x.Comentario)
                    .NotEmpty().WithMessage("Ingresar el Comentario es obligatorio")
                    .MinimumLength(10).WithMessage("El Comentario debe tener mínino 10 caracteres");
            }
        }
        public class Handler : IRequestHandler<Ejecuta>
        {
            private readonly GestionDepartamentosContext context;
            private readonly IUtils utils;
            public Handler(GestionDepartamentosContext _context, IUtils _utils)
            {
                this.context = _context;
                this.utils = _utils;
            }
            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var visita = await context.Visita.Where(x => x.VisitaId == request.VisitaId).SingleOrDefaultAsync();
                if (visita == null)
                {
                    throw new ExceptionHandler(HttpStatusCode.NotFound, new { mensaje = "La Visita no existe" });
                }
                visita.VisitaId = request.VisitaId;
                visita.PersonaVisitaId = request.PersonaVisitaId;
                visita.PersonaId = request.PersonaId;
                visita.FechaSalida = utils.ObtenerFecha();
                visita.Comentario = request.Comentario;
                visita.EstadoId = request.EstadoId;
                context.Visita.Update(visita);
                var result = await context.SaveChangesAsync();
                if (result > 0)
                {
                    return Unit.Value;
                }
                throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "Error al registrar salida de la Visita" });
            }

        }
    }
}
