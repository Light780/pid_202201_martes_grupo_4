using AppDepa.Aplicaciones.Exceptions;
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

namespace AppDepa.Aplicaciones.Departamentos
{
    public class Registrar
    {
        public class Ejecuta : IRequest
        {
            public string NroDepartamento { get; set; }
            public decimal Tamano { get; set; }
            public int TipoDepaId { get; set; }
            public int EstadoId { get; set; }
            public int CantidadHabitaciones { get; set; }
            public bool IndCocina { get; set; }
            public bool IndBalcon { get; set; }
            public bool IndLavanderia { get; set; }
            public bool IndPiscina { get; set; }
            public bool IndPatio { get; set; }
        }
        public class EjecutaValidator : AbstractValidator<Ejecuta>
        {
            public EjecutaValidator()
            {
                RuleFor(x => x.NroDepartamento)
                    .Must(x => int.TryParse(x, out var val)).WithMessage("El Nro del Departamento debe ser numérico")
                    .NotEmpty().WithMessage("El Nro del Departamento es obligatorio")
                    .Length(3).WithMessage("El Nro del Departamento debe tener solo 3 caracteres");
                RuleFor(x => x.Tamano)
                    .GreaterThan(0).WithMessage("El tamaño del Departamento debe ser mayor a 0");
                RuleFor(x => x.TipoDepaId)
                    .GreaterThan(0).WithMessage("El Tipo de Departamento es obligatorio");
                RuleFor(x => x.EstadoId)
                    .GreaterThan(0).WithMessage("El Estado del Departamento es obligatorio");
                RuleFor(x => x.CantidadHabitaciones)
                   .GreaterThan(0).WithMessage("La Cantidad de Habitaciones debe ser mayor a 0");
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
                var existeNroIgual = await context.Departamento.Where(x => x.NroDepartamento.Equals(request.NroDepartamento)).AnyAsync();
                if (existeNroIgual)
                {
                    throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "Ya existe un Departamento con el mismo numero" });
                }
                Departamento dep = new Departamento()
                {
                    NroDepartamento = request.NroDepartamento,
                    Tamano = request.Tamano,
                    TipoDepaId = request.TipoDepaId,
                    EstadoId = request.EstadoId,
                    CantidadHabitaciones = request.CantidadHabitaciones,
                    IndCocina = request.IndCocina,
                    IndBalcon = request.IndBalcon,
                    IndLavanderia = request.IndLavanderia,
                    IndPiscina = request.IndPiscina,
                    IndPatio = request.IndPatio,
                    FechaRegistro = DateTime.UtcNow
                };
                context.Departamento.Add(dep);
                var result = await context.SaveChangesAsync();
                if (result > 0)
                {
                    return Unit.Value;
                }
                throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "Error al registrar el Departamento" });
            }

        }
    }
}
