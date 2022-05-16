using AppDepa.Aplicaciones.Exceptions;
using AppDepa.Aplicaciones.Utils;
using AppDepa.Dominio;
using AppDepa.Infraestructura.Datos.Context;
using FluentValidation;
using MediatR;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Visitas
{
    public class RegistrarEntrada
    {
        public class Ejecuta : IRequest
        {
            public int PersonaVisitaId { get; set; }
            public int PersonaId { get; set; }

        }
        public class EjecutaValidator : AbstractValidator<Ejecuta>
        {
            public EjecutaValidator()
            {
                RuleFor(x => x.PersonaVisitaId).GreaterThan(0).WithMessage("Debe seleccionar una Posible Visita");
                RuleFor(x => x.PersonaId).GreaterThan(0).WithMessage("Debe seleccionar un Anfritrion");
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
                Visita visita = new Visita()
                {
                    PersonaVisitaId = request.PersonaVisitaId,
                    PersonaId = request.PersonaId,
                    FechaEntrada = utils.ObtenerFecha(),
                    FechaRegistro = utils.ObtenerFecha(),
                    UsuarioId = utils.GetUsuarioSession()
                };
                context.Visita.Add(visita);
                var result = await context.SaveChangesAsync();
                if (result > 0)
                {
                    return Unit.Value;
                }
                throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "Error al registrar entrada de Visita" });
            }

        }


    }

}