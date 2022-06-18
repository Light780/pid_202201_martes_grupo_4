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
using AppDepa.Aplicaciones.Utils;

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
            public int UsuarioId { get; set; }
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
            private readonly IUtils utils;

            public Handler(GestionDepartamentosContext _context, IUtils _utils)
            {
                this.context = _context;
                utils = _utils;
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
                    #region "Registrar Historial Incidencia"
                    HistorialIncidencia historialIncidencia = new HistorialIncidencia()
                    {
                        IncidenciaId = incidencia.IncidenciaId,
                        DepartamentoId = incidencia.DepartamentoId,
                        TipoIncidenciaId = incidencia.TipoIncidenciaId,
                        DescripcionIncidencia = incidencia.DescripcionIncidencia,
                        EstadoIncidenciaId = incidencia.EstadoIncidenciaId,
                        FechaIncidencia = incidencia.FechaIncidencia,
                        FechaRegistro = utils.ObtenerFecha(),
                        UsuarioId = request.UsuarioId,
                        PersonaId = incidencia.PersonaId
                    };
                    context.HistorialIncidencia.Add(historialIncidencia);
                    result = await context.SaveChangesAsync();

                    if (result > 0)
                    {
                        return Unit.Value;
                    }
                    throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "Error al registrar Historial Incidencia" });
                    #endregion
                }
                throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "Error al actualizar la Incidencia" });
            }
        }
    }
}
