using AppDepa.Aplicaciones.Exceptions;
using AppDepa.Dominio;
using AppDepa.Infraestructura.Datos.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Mascotas
{
    public class ConsultarUnico
    {
        public class Ejecuta : IRequest<Mascota>
        {
            public int MascotaId { get; set; }
        }

        public class Handler : IRequestHandler<Ejecuta, Mascota>
        {
            private readonly GestionDepartamentosContext context;
            public Handler(GestionDepartamentosContext _context)
            {
                this.context = _context;
            }
            public async Task<Mascota> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var mascota = await context.Mascota.Where(x => x.MascotaId == request.MascotaId).SingleOrDefaultAsync();
                if (mascota == null)
                {
                    throw new ExceptionHandler(HttpStatusCode.NotFound, new { mensaje = "La Mascota no existe" });
                }
                return mascota;
            }
        }
    }
}
