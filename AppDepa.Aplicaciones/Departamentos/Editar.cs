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
    public class Editar
    {
        public class Ejecuta : IRequest
        {
            public int DepartamentoId { get; set; }
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

        public class Handler:IRequestHandler<Ejecuta>
        {
            private readonly GestionDepartamentosContext context;
            public Handler(GestionDepartamentosContext _context)
            {
                this.context = _context;
            }
            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var departamento = await context.Departamento.Where(x => x.DepartamentoId == request.DepartamentoId).SingleOrDefaultAsync();
                if (departamento == null)
                {
                    throw new ExceptionHandler(HttpStatusCode.NotFound, new { mensaje = "El Departamento no existe" });
                }
                var existeNroIgual = await context.Departamento.Where(x => x.NroDepartamento.Equals(request.NroDepartamento) && x.DepartamentoId != request.DepartamentoId).AnyAsync();
                if (existeNroIgual)
                {
                    throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "Ya existe un Departamento con el mismo numero" });
                }

                departamento.NroDepartamento = request.NroDepartamento;
                departamento.Tamano = request.Tamano;
                departamento.TipoDepaId = request.TipoDepaId;
                departamento.EstadoId = request.EstadoId;
                departamento.CantidadHabitaciones = request.CantidadHabitaciones;
                departamento.IndCocina = request.IndCocina;
                departamento.IndBalcon = request.IndBalcon;
                departamento.IndLavanderia = request.IndLavanderia;
                departamento.IndPiscina = request.IndPiscina;
                departamento.IndPatio = request.IndPatio;
                context.Departamento.Update(departamento);
                var result = await context.SaveChangesAsync();
                if (result > 0)
                {
                    return Unit.Value;
                }
                throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "Error al actualizar el Departamento" });
            }
        }
    }
}
