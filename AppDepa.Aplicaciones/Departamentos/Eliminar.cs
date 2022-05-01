using AppDepa.Aplicaciones.Exceptions;
using AppDepa.Infraestructura.Datos.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Departamentos
{
    public class Eliminar
    {
        public class Ejecuta : IRequest
        {
            public int DepartamentoId { get; set; }
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
                var departamento = await context.Departamento.Where(x => x.DepartamentoId == request.DepartamentoId).SingleOrDefaultAsync();
                if (departamento == null)
                {
                    throw new ExceptionHandler(HttpStatusCode.NotFound, new { mensaje = "El Departamento no existe" });
                }
                departamento.Eliminado = !departamento.Eliminado;
                context.Departamento.Update(departamento);
                var result = await context.SaveChangesAsync();
                if (result > 0)
                {
                    return Unit.Value;
                }
                throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "Error al eliminar el Departamento" });
            }
        }
    }
}
