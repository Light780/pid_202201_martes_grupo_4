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
            public int PersonaId { get; set; }
            public string nombreCompleto { get; set; }
            public int EstadoId { get; set;}


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
                var query = from v in context.Visita
                            join p in context.Persona on v.PersonaId equals p.PersonaId
                            join d in context.Departamento on v.EstadoId equals d.EstadoId
                            orderby v.VisitaId
                            where (request.PersonaId == 0 || v.PersonaId == request.PersonaId)
                            where (request.EstadoId == 0 || v.EstadoId == request.EstadoId)
                            select new VisitaDto
                            {
                                VisitaId = v.VisitaId,
                                PersonaVisita = utils.BuscarParametro(v.PersonaVisitaId,"PERSONA_VISITA"),
                                Persona = utils.BuscarParametro(v.PersonaId, "PERSONA"),
                                FechaEntrada = v.FechaEntrada.ToString("dd/MM/yyyy HH:mm"),
                                FechaSalida = v.FechaSalida.ToString("dd/MM/yyyy HH:mm"),
                                FechaRegistro = v.FechaRegistro.ToString("dd/MM/yyyy HH:mm"),
                                Usuario = utils.BuscarParametro(v.UsuarioId, "USER"),
                                Comentario = v.Comentario,
                                Estado = utils.BuscarParametro(v.EstadoId,"ESTADO_ID")
                            };

                return await query.ToListAsync();
            }
        }
    }
}
