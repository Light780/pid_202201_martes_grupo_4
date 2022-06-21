using AppDepa.Aplicaciones.Exceptions;
using AppDepa.Infraestructura.Datos.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Incidencias
{
    public  class Eliminar
    {
        public class Ejecuta : IRequest
        {
            public int IncidenciaId { get; set; }
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
                var incidencia = await context.Incidencia.Where(x => x.IncidenciaId == request.IncidenciaId).SingleOrDefaultAsync();
                if (incidencia == null)
                {
                    throw new ExceptionHandler(HttpStatusCode.NotFound, new { mensaje = "La Incidencia no existe" });
                }
                incidencia.Eliminado = !incidencia.Eliminado;
                context.Incidencia.Update(incidencia);
                var result = await context.SaveChangesAsync();
                if (result > 0)
                {
                    return Unit.Value;
                }
                throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "Error al eliminar la Incidencia" });
            }
        }
    }
}
    