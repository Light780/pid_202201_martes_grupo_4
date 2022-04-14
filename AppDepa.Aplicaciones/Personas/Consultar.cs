using AppDepa.Aplicaciones.Dto;
using AppDepa.Aplicaciones.Utils;
using AppDepa.Infraestructura.Datos.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Personas
{
    public class Consultar
    {
        public class Ejecuta : IRequest<List<PersonaDto>> { }

        public class Handler : IRequestHandler<Ejecuta, List<PersonaDto>>
        {
            private readonly GestionDepartamentosContext context;
            private readonly IUtils utils;
            public Handler(GestionDepartamentosContext _context, IUtils _utils)
            {
                this.context = _context;
                this.utils = _utils;
            }

            public async Task<List<PersonaDto>> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var query = from p in context.Persona
                            join d in context.Departamento on p.DepartamentoId equals d.DepartamentoId
                            orderby p.PersonaId
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
                                Departamento = d.NroDepartamento
                            };
                return await query.ToListAsync();
            }
        }
    }
}
