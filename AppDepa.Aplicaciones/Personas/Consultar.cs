using AppDepa.Aplicaciones.Dto;
using AppDepa.Aplicaciones.Utils;
using AppDepa.Infraestructura.Datos.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;
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
        }

        public class Handler : IRequestHandler<ListarPersonas, List<PersonaDto>>
        {
            private readonly GestionDepartamentosContext context;
            private readonly IUtils utils;
            public Handler(GestionDepartamentosContext _context, IUtils _utils)
            {
                this.context = _context;
                this.utils = _utils;
            }

            public async Task<List<PersonaDto>> Handle(ListarPersonas request, CancellationToken cancellationToken)
            {
                var query = from p in context.Persona
                            join d in context.Departamento on p.DepartamentoId equals d.DepartamentoId
                            join u in context.Usuario on d.UsuarioId equals u.UsuarioId
                            orderby p.PersonaId
                            where (request.DepartamentoId == 0 || p.DepartamentoId == request.DepartamentoId)
                            where (request.TipoPersonaId == 0 || p.TipoPersonaId == request.TipoPersonaId)
                            select new PersonaDto
                            {
                                PersonaId = p.PersonaId,
                                NombreCompleto = p.NombreCompleto,
                                Documento = p.Documento,
                                TipoDocumento = utils.BuscarParametro(p.TipoDocumentoId, "TIPO_DOCUMENTO_PERSONA"),
                                Telefono = p.Telefono,
                                Estado = utils.BuscarParametro(p.EstadoId, "ESTADO_ID"),
                                Correo = p.Correo,
                                Sexo = p.Sexo,
                                TipoPersona = utils.BuscarParametro(p.TipoPersonaId, "TIPO_PERSONA_ID"),
                                Departamento = d.NroDepartamento,
                                FechaRegistro = d.FechaRegistro.ToString("dd/MM/yyyy hh:mm"),
                                Usuario = u.UserName
                            };
                return await query.ToListAsync();
            }
        }
    }
}
