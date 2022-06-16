using AppDepa.Infraestructura.Datos.Dapper.Persona;
using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Personas
{
    public class Consultar
    {
        public class ListarPersonas : IRequest<List<PersonaDto>>
        {
            public int DepartamentoId { get; set; }
            public int TipoPersonaId { get; set; }
            public int Eliminado { get; set; }
        }

        public class Handler : IRequestHandler<ListarPersonas, List<PersonaDto>>
        {
            private readonly IPersona _personaService;
            public Handler(IPersona personaService)
            {
                this._personaService = personaService;
            }

            public async Task<List<PersonaDto>> Handle(ListarPersonas request, CancellationToken cancellationToken)
            {
                var lista = await _personaService.ListarPersona(request.DepartamentoId, request.TipoPersonaId, request.Eliminado);
                return lista.ToList();
            }
        }
    }
}
