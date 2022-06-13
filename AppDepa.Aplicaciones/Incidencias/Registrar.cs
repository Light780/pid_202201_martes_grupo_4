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

namespace AppDepa.Aplicaciones.Incidencias
{
    public class Registrar
    {
        public class Ejecuta : IRequest
        {
            public int DepartamentoId { get; set; }
            public int TipoIncidenciaId { get; set; }
            public string DescripcionIncidencia { get; set; }
            public int PersonaId { get; set; }
            public DateTime FechaIncidencia { get; set; }
            public int UsuarioId { get; set; }
        }

        public class EjecutaValidator : AbstractValidator<Ejecuta>
        {
            public EjecutaValidator()
            {
                RuleFor(x => x.DepartamentoId).GreaterThan(0).WithMessage("El departamento es obligatorio");
                RuleFor(x => x.TipoIncidenciaId).GreaterThan(0).WithMessage("La tipo de incidencia es obligatorio");
                RuleFor(x => x.DescripcionIncidencia).NotEmpty().WithMessage("El comentario de la incidencia es obligatorio");
                RuleFor(x => x.PersonaId).GreaterThan(0).WithMessage("La persona es obligatoria");
                RuleFor(x => x.FechaIncidencia).NotEmpty().NotNull().WithMessage("La fecha es obligatoria");
            }
        }

        public class Handler : IRequestHandler<Ejecuta>
        {
            private readonly GestionDepartamentosContext context;
            private readonly IUtils utils;

            public Handler(GestionDepartamentosContext _context, IUtils _utils)
            {
                context = _context;
                utils = _utils;
            }

            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                try
                {
                    var ultimaIncidencia = await context.Incidencia.OrderByDescending(x => x.IncidenciaId).FirstOrDefaultAsync();

                    int incidenciaId = 0;

                    if (ultimaIncidencia != null)
                        incidenciaId = ultimaIncidencia.IncidenciaId + 1;
                    else
                        incidenciaId = 1;

                    string codigo = incidenciaId.ToString("D4");

                    var incidencia = new Incidencia
                    {
                        DepartamentoId = request.DepartamentoId,
                        CodigoIncidencia = codigo,
                        TipoIncidenciaId = request.TipoIncidenciaId,
                        DescripcionIncidencia = request.DescripcionIncidencia,
                        EstadoIncidenciaId = 2,
                        FechaIncidencia = request.FechaIncidencia,
                        FechaRegistro = utils.ObtenerFecha(),
                        Eliminado = false,
                        UsuarioId = request.UsuarioId,
                        PersonaId = request.PersonaId
                    };

                    context.Incidencia.Add(incidencia);

                    var result = await context.SaveChangesAsync(cancellationToken);

                    if (result > 0)
                    {
                        return Unit.Value;
                    }

                    throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "Error al registrar Incidencia" });
                }
                catch (Exception ex)
                {
                    throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = ex.Message });
                }
                
            }
        }
    }
}
