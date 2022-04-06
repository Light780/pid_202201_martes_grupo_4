using AppDepa.Aplicaciones.Exceptions;
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
using AppDepa.Dominio;

namespace AppDepa.Aplicaciones.Departamentos
{
    public class Registrar
    {
        public class Ejecuta : IRequest
        {
            public string NroDepartamento { get; set; }
            public decimal Tamano { get; set; }                        
            public int TipoDepaId { get; set; }
            public int EstadoDepaId { get; set; }
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
                    .Must(x => int.TryParse(x, out var val)).WithMessage("El Nro del Departamento debe ser numérico");
                RuleFor(x => x.Tamano)
                    .GreaterThan(0).WithMessage("El tamaño del Departamento debe ser mayor a 0");
                RuleFor(x => x.TipoDepaId)
                    .GreaterThan(0).WithMessage("El Tipo de Departamento es obligatorio");
                RuleFor(x => x.EstadoDepaId)
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
                    EstadoDepaId = request.EstadoDepaId,
                    CantidadHabitaciones = request.CantidadHabitaciones,
                    IndCocina = request.IndCocina,
                    IndBalcon = request.IndBalcon,
                    IndLavanderia = request.IndLavanderia,
                    IndPiscina = request.IndPiscina,
                    IndPatio = request.IndPatio
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
