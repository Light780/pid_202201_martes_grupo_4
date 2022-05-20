using AppDepa.Aplicaciones.Exceptions;
using AppDepa.Dominio;
using AppDepa.Infraestructura.Datos.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Visitas
{
    public class ConsultarUnico
    {
        public class Ejecuta : IRequest<Visita>
        {
            public int VisitaId { get; set; }
        }

        public class Handler : IRequestHandler<Ejecuta, Visita>
        {
            private readonly GestionDepartamentosContext context;
            public Handler(GestionDepartamentosContext _context)
            {
                this.context = _context;
            }
            public async Task<Visita> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var visita = await context.Visita.Where(x => x.VisitaId == request.VisitaId).SingleOrDefaultAsync();
                if (visita == null)
                {
                    throw new ExceptionHandler(HttpStatusCode.NotFound, new { mensaje = "La Visita no existe" });
                }
                return visita;
            }
        }
    }
}
