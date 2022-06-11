using AppDepa.Aplicaciones.Exceptions;
using AppDepa.Aplicaciones.Utils;
using AppDepa.Dominio;
using AppDepa.Infraestructura.Datos.Context;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Visitas
{
    public class RegistrarEntrada
    {
        public class Ejecuta : IRequest
        {
            public int PersonaVisitaId { get; set; }
            public int PersonaId { get; set; }
            public DateTime FechaPosibleSalida { get; set; }
            public int UsuarioId { get; set; }

        }
        public class EjecutaValidator : AbstractValidator<Ejecuta>
        {
            public EjecutaValidator()
            {
                RuleFor(x => x.PersonaVisitaId).GreaterThan(0).WithMessage("Debe seleccionar una Posible Visita");
                RuleFor(x => x.PersonaId).GreaterThan(0).WithMessage("Debe seleccionar un Anfritrion");
                RuleFor(x => x.FechaPosibleSalida).NotNull().WithMessage("La fecha de la posible salida es obligatoria");
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
                bool validarSalida = await context.Visita.Where(x => x.PersonaVisitaId == request.PersonaVisitaId && x.FechaSalida == null).AnyAsync();
                if (validarSalida)
                {
                    throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "El visitante tiene visitas pendientes por finalizar" });
                }
                Visita visita = new Visita()
                {
                    PersonaVisitaId = request.PersonaVisitaId,
                    PersonaId = request.PersonaId,
                    FechaEntrada = utils.ObtenerFecha(),
                    FechaRegistro = utils.ObtenerFecha(),
                    FechaPosibleSalida = request.FechaPosibleSalida,
                    UsuarioId = request.UsuarioId
                };
                context.Visita.Add(visita);
                var result = await context.SaveChangesAsync();
                if (result > 0)
                {
                    return Unit.Value;
                }
                throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "Error al registrar entrada de Visita" });
            }

        }


    }

}