using AppDepa.Aplicaciones.Exceptions;
using AppDepa.Infraestructura.Datos.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Mascotas
{
    public class Eliminar
    {
        public class Ejecuta : IRequest
        {
            public int MascotaId { get; set; }
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
                var mascota = await context.Mascota.Where(x => x.MascotaId == request.MascotaId).SingleOrDefaultAsync();
                if(mascota == null)
                {
                    throw new ExceptionHandler(HttpStatusCode.NotFound, new { mensaje = "La Mascota no existe" });
                }
                context.Mascota.Remove(mascota);
                var result = await context.SaveChangesAsync();
                if(result > 0)
                {
                    return Unit.Value;
                }
                throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "Error al eliminar el Mascota" });
            }
        }
    }
}
