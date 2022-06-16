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
            public int TipoIncidenciaId { get; set; }
            public string DescripcionIncidencia { get; set; }
            public int PersonaId { get; set; }
            public DateTime FechaIncidencia { get; set; }
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
                #region "Actualización Incidencia"
                var incidencia = await context.Incidencia.Where(x => x.IncidenciaId == request.IncidenciaId).SingleOrDefaultAsync();
                if (incidencia == null)
                {
                    throw new ExceptionHandler(HttpStatusCode.NotFound, new { mensaje = "La Incidencia no existe" });
                }
                

                incidencia.DepartamentoId = request.DepartamentoId;
                incidencia.TipoIncidenciaId = request.TipoIncidenciaId;
                incidencia.DescripcionIncidencia = request.DescripcionIncidencia;
                incidencia.PersonaId = request.PersonaId;
                incidencia.FechaIncidencia = request.FechaIncidencia;

                context.Incidencia.Update(incidencia);
                var result = await context.SaveChangesAsync();
                #endregion

                if (result > 0)
                {
                    #region "Actualización Historial Incidencia"

                   var historialIncidencia = await context.HistorialIncidencia.Where(x => x.IncidenciaId == incidencia.IncidenciaId).SingleOrDefaultAsync();

                    historialIncidencia.DepartamentoId = incidencia.DepartamentoId;
                    historialIncidencia.TipoIncidenciaId = incidencia.TipoIncidenciaId;
                    historialIncidencia.DescripcionIncidencia = incidencia.DescripcionIncidencia;
                    historialIncidencia.PersonaId = incidencia.PersonaId;
                    historialIncidencia.FechaIncidencia = incidencia.FechaIncidencia;                 

                    context.HistorialIncidencia.Update(historialIncidencia);
                    result = await context.SaveChangesAsync();

                    if (result > 0)
                    {
                        return Unit.Value;
                    }
                    throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "Error al actualizar Historial Incidencia" });
                    #endregion
                }
                throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "Error al actualizar la Incidencia" });
            }
        }
    }
}
