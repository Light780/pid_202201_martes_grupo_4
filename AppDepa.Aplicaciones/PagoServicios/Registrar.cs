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

namespace AppDepa.Aplicaciones.PagoServicios
{
    public class Registrar
    {
        public class Ejecuta : IRequest
        {
            public int BoletaId { get; set; }
            public string NroOperacion { get; set; }
            public DateTime FechaPago { get; set; }
            public decimal Monto { get; set; }
            public int UsuarioId { get; set; }
            public int PersonaId { get; set; }
        }

        public class EjecutaValidator : AbstractValidator<Ejecuta>
        {
            public EjecutaValidator()
            {
                RuleFor(x => x.FechaPago).NotNull().WithMessage("La fecha de pago es obligatoria");
                RuleFor(x => x.NroOperacion)
                    .NotEmpty().WithMessage("El nro de operacion es obligatorio")
                    .Length(1, 10).WithMessage("El nro de operacion debe tener entre 1 y 10 caracteres");
                RuleFor(x => x.PersonaId).GreaterThan(0).WithMessage("La persona que realiza el pago es obligatoria");
                RuleFor(x => x.BoletaId).GreaterThan(0).WithMessage("La boleta obligatorio");
                RuleFor(x => x.Monto)
                    .GreaterThan(0).WithMessage("El monto debe ser mayor a 0")
                    .NotEmpty().WithMessage("El monto es obligatorio");
            }
        }

        public class Handler : IRequestHandler<Ejecuta>
        {
            private readonly GestionDepartamentosContext _context;

            public Handler(GestionDepartamentosContext context)
            {
                this._context = context;
            }

            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var boleta = await _context.Boleta.Where(x => x.BoletaId == request.BoletaId).FirstOrDefaultAsync();

                var pagado = boleta.PagoServicios.Sum(x => x.Monto);

                var restante = boleta.Monto - pagado;

                if (request.Monto > restante)
                {
                    throw new ExceptionHandler(HttpStatusCode.BadRequest, "El monto a pagar es superior al monto restante");
                }

                PagoServicio pagoServicio = new PagoServicio()
                {
                    BoletaId = request.BoletaId,
                    NroOperacion = request.NroOperacion,
                    FechaPago = request.FechaPago,
                    UsuarioId = request.UsuarioId,
                    Monto = request.Monto,
                    PersonaId = request.PersonaId
                };

                _context.PagoServicio.Add(pagoServicio);
                int result = await _context.SaveChangesAsync();
                if (result > 0)
                {
                    return Unit.Value;

                }
                throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "Error al registrar Pagos" });
            }
        }
    }
}
