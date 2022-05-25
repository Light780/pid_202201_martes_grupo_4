using AppDepa.Aplicaciones.Dto;
using AppDepa.Aplicaciones.Utils;
using AppDepa.Infraestructura.Datos.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Visitas
{
    public class Consultar
    {
        public class ListarVisitas : IRequest<List<VisitaDto>>
        {
            public string NombreCompleto { get; set; }
            public string Documento { get; set; }
            public int EstadoId { get; set; }
        }

        public class Handler : IRequestHandler<ListarVisitas, List<VisitaDto>>
        {
            private readonly GestionDepartamentosContext context;
            private readonly IUtils utils;

            public Handler(GestionDepartamentosContext _context, IUtils _utils)
            {
                this.context = _context;
                this.utils = _utils;
            }
            public async Task<List<VisitaDto>> Handle(ListarVisitas request, CancellationToken cancellationToken)
            {
                //0 TODOS
                //1 Finalizado
                //2 No Finalizado
                var query = from v in context.Visita
                            join p in context.Persona on v.PersonaId equals p.PersonaId
                            join pv in context.Persona on v.PersonaVisitaId equals pv.PersonaId
                            join u in context.Usuario on v.UsuarioId equals u.UsuarioId
                            orderby v.VisitaId
                            where (string.IsNullOrEmpty(request.Documento) || v.PersonaVisita.Documento == request.Documento)
                            where (string.IsNullOrEmpty(request.NombreCompleto) || pv.NombreCompleto.Contains(request.NombreCompleto))
                            where (request.EstadoId == 0 || request.EstadoId == 1 && v.FechaSalida != null || request.EstadoId == 2 && v.FechaSalida == null)
                            select new VisitaDto
                            {
                                VisitaId = v.VisitaId,
                                PersonaVisitaId = pv.PersonaId,
                                NombreCompletoVisitante = pv.NombreCompleto,
                                TipoDocVisitante = utils.BuscarParametro(pv.TipoDocumentoId, "TIPO_DOCUMENTO_PERSONA"),
                                DocumentoVisitante = pv.Documento,
                                PersonaId = p.PersonaId,
                                NombreCompletoAnfitrion = p.NombreCompleto,
                                TipoDocAnfitrion = utils.BuscarParametro(p.TipoDocumentoId, "TIPO_DOCUMENTO_PERSONA"),
                                DocumentoAnfitrion = p.Documento,
                                FechaIngreso = v.FechaEntrada.ToString("dd/MM/yyyy HH:mm"),
                                FechaSalida = v.FechaSalida.HasValue ? v.FechaSalida.Value.ToString("dd/MM/yyyy HH:mm") : "",
                                FechaPosibleSalida = v.FechaPosibleSalida.ToString("dd/MM/yyyy HH:mm"),
                                UsuarioRegistro = u.UserName,
                                FechaRegistro = v.FechaRegistro.ToString("dd/MM/yyyy HH:mm"),
                                Comentario = v.Comentario
                            };

                return await query.ToListAsync();
            }
        }
    }
}
