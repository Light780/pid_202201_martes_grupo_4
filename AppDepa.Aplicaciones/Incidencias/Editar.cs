using AppDepa.Aplicaciones.Exceptions;
using AppDepa.Infraestructura.Datos.Context;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using AppDepa.Dominio;

namespace AppDepa.Aplicaciones.Incidencias
{
    public class Editar
    {
        public class Ejecuta:IRequest
        {
            public int IncidenciaId { get; set; }
            public int DepartamentoId { get; set; }
            public string CodigoIncidencia { get; set; }
            public int TipoIncidenciaId { get; set; }
            public string DescripcionIncidencia { get; set; }
            public int EstadoIncidenciaId { get; set; }
            public DateTime FechaIncidencia { get; set; }
            public int PersonaId { get; set; }
        }

        public class EjecutaValidator : AbstractValidator<Ejecuta>
        {
            public EjecutaValidator()
            {
                RuleFor(x => x.DepartamentoId).NotEmpty().WithMessage("El departamento es obligatorio");
                RuleFor(x => x.TipoIncidenciaId).GreaterThan(0).WithMessage("La tipo de incidencia es obligatorio");
                RuleFor(x => x.DescripcionIncidencia).NotEmpty().WithMessage("El comentario de la incidencia es obligatorio")
                                                     .MinimumLength(10).WithMessage("El comentario debe tener mínimo 10 caracteres");
                RuleFor(x => x.PersonaId).GreaterThan(0).WithMessage("La persona es obligatoria");
                RuleFor(x => x.FechaIncidencia).NotEmpty().NotNull().WithMessage("La fecha es obligatoria");
            }
        }

        public class Handler : IRequestHandler<Ejecuta>
        {
            private readonly GestionDepartamentosContext context;
            public Handler(GestionDepartamentosContext _context)
            {
                this.context = _context;
            }
            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var incidencia = await context.Incidencia.Where(x => x.IncidenciaId == request.IncidenciaId).SingleOrDefaultAsync();
                if (incidencia == null)
                {
                    throw new ExceptionHandler(HttpStatusCode.NotFound, new { mensaje = "La Incidencia no existe" });
                }
                /*var existeCodigoIgual = await context.Incidencia.Where(x => x.CodigoIncidencia.Equals(request.CodigoIncidencia) && x.IncidenciaId != request.IncidenciaId).AnyAsync();
                if (existeCodigoIgual)
                {
                    throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "Ya existe una Incidencia con el mismo código" });
                }*/

                incidencia.DepartamentoId = request.DepartamentoId;
                incidencia.TipoIncidenciaId = request.TipoIncidenciaId;
                incidencia.DescripcionIncidencia = request.DescripcionIncidencia;
                incidencia.EstadoIncidenciaId = request.EstadoIncidenciaId;
                incidencia.FechaIncidencia = request.FechaIncidencia;
                incidencia.PersonaId = request.PersonaId;
                context.Incidencia.Update(incidencia);
                var result = await context.SaveChangesAsync();
                if (result > 0)
                {
                    return Unit.Value;
                }
                throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "Error al actualizar la Incidencia" });
            }
        }
    }
}
