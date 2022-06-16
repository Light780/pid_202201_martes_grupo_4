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
    public class Generar
    {
        public class Ejecuta : IRequest
        {
            public int PagoServicioId { get; set; }
            public int BoletaId { get; set; }
            public decimal Monto { get; set; }
            public int UsuarioId { get; set; }
        }

        public class EjecutaValidator : AbstractValidator<Ejecuta>
        {
            public EjecutaValidator()
            {
                RuleFor(x => x.PagoServicioId).GreaterThan(0).WithMessage("El servicio es obligatorio");
                RuleFor(x =>x.BoletaId).GreaterThan(0).WithMessage("N° boleta obligatorio");
                RuleFor(x => x.Monto)
                    .GreaterThan(0).WithMessage("El monto debe ser mayor a 0")
                    .NotEmpty().WithMessage("El monto es obligatorio");
            }
        }

        public class Handler : IRequestHandler<Ejecuta>
        {
            private readonly GestionDepartamentosContext context;
            private readonly IUtils utils;

            public async Task<Unit> Handle(Ejecuta request , CancellationToken cancellationToken)
            {
                List<PagoServicio> listado = new List<PagoServicio>();
                Enumerable.Range(1, 10).ToList().ForEach(x =>
                {
                    var fechaPago = utils.ObtenerUltimoDiaFecha(DateTime.Now);

                    listado.Add(new PagoServicio
                    {

                        UsuarioId = request.UsuarioId,
                        PagoServicioId = request.PagoServicioId,
                        BoletaId = request.BoletaId,
                        Monto = request.Monto,
                        NroOperacion = utils.GenerarCodigoAleatorio(8),
                        FechaPago = fechaPago
                    });
                });
                context.PagoServicio.AddRange(listado);
                int result = await context.SaveChangesAsync();
                if(result == 0)
                {
                    return Unit.Value;
                    
                }
                throw new ExceptionHandler(HttpStatusCode.BadRequest , new {mensaje = "Error al generar Pagos"});
            }
        }
    }
}
