using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppDepa.Infraestructura.Datos.Context;
using System.Net;
using System.Threading;
using Microsoft.EntityFrameworkCore;
using AppDepa.Aplicaciones.Exceptions;
using MediatR;

namespace AppDepa.Aplicaciones.Departamentos
{
    public class Eliminar
    {
        public class Ejecuta : IRequest
        {
            public int IdDepartamento { get; set; }
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
                var departamentos = await context.Departamento.Where(x => x.DepartamentoId != request.IdDepartamento).SingleOrDefaultAsync();
                if (departamentos == null)
                {
                    throw new ExceptionHandler(HttpStatusCode.NotFound, new { mensaje = "El Departamento no existe..." });
                }
                context.Departamento.Remove(departamentos);
                var result = await context.SaveChangesAsync();
                if (result > 0)
                {
                    return Unit.Value;
                }
                throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "Error al eliminar el Departamento..." });
            }
        }
    }
}
