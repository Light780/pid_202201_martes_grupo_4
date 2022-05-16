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
            public string NombreCompleto { get; set; }
            public int EstadoId { get; set; }
        }

        public class Handler : IRequestHandler<ListarVisitas, List<VisitaDto>>
        {
            private readonly GestionDepartamentosContext context;
            public Handler(GestionDepartamentosContext _context)
            {
                this.context = _context;
            }
            public async Task<List<VisitaDto>> Handle(ListarVisitas request, CancellationToken cancellationToken)
            {
                var query = from v in context.Visita
                            join p in context.Persona on v.PersonaId equals p.PersonaId
                            join pv in context.Persona on v.PersonaVisitaId equals pv.PersonaId
                            join u in context.Usuario on v.UsuarioId equals u.UsuarioId
                            orderby v.VisitaId
                            where (request.PersonaId == 0 || v.PersonaId == request.PersonaId)
                            where (request.NombreCompleto == "" || p.NombreCompleto.Contains(request.NombreCompleto))
                            where (request.EstadoId == 0 || request.EstadoId == 1 && v.FechaSalida != null || request.EstadoId == 2 && v.FechaSalida == null)
                            select new VisitaDto
                            {
                                VisitaId = v.VisitaId,
                                PersonaVisita = pv.NombreCompleto,
                                Persona = p.NombreCompleto,
                                FechaEntrada = v.FechaEntrada.ToString("dd/MM/yyyy HH:mm"),
                                FechaSalida = v.FechaSalida.HasValue ? v.FechaSalida.Value.ToString("dd/MM/yyyy HH:mm") : "",
                                FechaRegistro = v.FechaRegistro.ToString("dd/MM/yyyy HH:mm"),
                                Usuario = u.UserName,
                                Comentario = v.Comentario,
                            };

                return await query.ToListAsync();
            }
        }
    }
}
