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

namespace AppDepa.Aplicaciones.Personas
{
    class Eliminar
    {
        public class Ejecuta : IRequest
        {
            public int PersonaId { get; set; }
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
                var persona = await context.Persona.Where(x => x.PersonaId == request.PersonaId).SingleOrDefaultAsync();
                if(persona == null)
                {
                    throw new ExceptionHandler(HttpStatusCode.NotFound, new { mensaje = " Esta persona no existe" });
                }
                context.Persona.Remove(persona);
                var result = await context.SaveChangesAsync();
                if(result > 0)
                {
                    return Unit.Value;
                }
                throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "Erroe al eliminar a la persona" });
            }
        }
    }
}
