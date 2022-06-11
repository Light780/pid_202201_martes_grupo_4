using AppDepa.Aplicaciones.Exceptions;
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
using System.Threading;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Boletas
{
    public class Generar
    {
        public class Ejecuta : IRequest
        {
            public int ServicioId { get; set; }
            public int DepartamentoId { get; set; }
            public string Anio { get; set; }
            public decimal Monto { get; set; }
            public int UsuarioId { get; set; }
        }
        public class EjecutaValidator : AbstractValidator<Ejecuta>
        {
            public EjecutaValidator()
            {
                RuleFor(x => x.ServicioId).GreaterThan(0).WithMessage("El servicio es obligatorio");
                RuleFor(x => x.DepartamentoId).GreaterThan(0).WithMessage("El departamento es obligatorio");
                RuleFor(x => x.Anio)
                    .NotEmpty().WithMessage("El año es obligatorio")
                    .Length(4).WithMessage("El año no es valido");
                RuleFor(x => x.Monto)
                    .GreaterThan(0).WithMessage("El monto debe ser mayor a 0")
                    .NotEmpty().WithMessage("El monto es obligatorio");
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
                var generado = await context.Boleta.Where(x => x.Periodo.Substring(0, 4).Equals(request.Anio) && x.DepartamentoId == request.DepartamentoId).AnyAsync();
                if (generado)
                {
                    throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "A este Departamento ya se le han generado boletas" });
                }
                List<Boleta> listado = new List<Boleta>();
                Enumerable.Range(1, 12).ToList().ForEach(x =>
                {
                    var periodo = string.Concat(request.Anio, x.ToString("D2"));
                    var fechaPago = utils.ObtenerUltimoDiaFecha(DateTime.ParseExact(periodo, "yyyyMM", null));
                    listado.Add(new Boleta
                    {
                        UsuarioId = request.UsuarioId,
                        ServicioId = request.ServicioId,
                        DepartamentoId = request.DepartamentoId,
                        Periodo = periodo,
                        Monto = request.Monto,
                        CodigoPago = utils.GenerarCodigoAleatorio(8),
                        FechaPago = fechaPago
                    });
                });
                context.Boleta.AddRange(listado);
                int result = await context.SaveChangesAsync();
                if (result > 0)
                {
                    return Unit.Value;
                }
                throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "Error al generar Boletas" });
            }
        }
    }
}
