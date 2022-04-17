using AppDepa.Aplicaciones.Exceptions;
using AppDepa.Dominio;
using AppDepa.Infraestructura.Datos.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Personas
{
    public class ConsultarUnico
    {
        public class Ejecuta : IRequest<Persona>
        {
            public int PersonaId { get; set; }
        }

        public class Handler : IRequestHandler<Ejecuta, Persona>
        {
            private readonly GestionDepartamentosContext context;
            public Handler(GestionDepartamentosContext _context)
            {
                this.context = _context;
            }
            public async Task<Persona> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var persona = await context.Persona.Where(x => x.PersonaId == request.PersonaId).SingleOrDefaultAsync();
                if (persona == null)
                {
                    throw new ExceptionHandler(HttpStatusCode.NotFound, new { mensaje = "La Persona no existe" });
                }
                return persona;
            }
        }
    }
}
