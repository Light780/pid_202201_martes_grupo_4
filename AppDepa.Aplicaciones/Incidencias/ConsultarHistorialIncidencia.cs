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

namespace AppDepa.Aplicaciones.Incidencias
{
    public class ConsultarHistorialIncidencia
    {
        public class ListarHistorial : IRequest<List<HistorialIncidenciaDto>>
        {
            public int DepartamentoId { get; set; }
            public int TipoIncidenciaId { get; set; }
        }

        public class Handler : IRequestHandler<ListarHistorial, List<HistorialIncidenciaDto>>
        {
            private readonly GestionDepartamentosContext context;
            private readonly IUtils utils;

            public Handler(GestionDepartamentosContext _context, IUtils _utils)
            {
                this.context = _context;
                this.utils = _utils;
            }
            public async Task<List<HistorialIncidenciaDto>> Handle(ListarHistorial request, CancellationToken cancellationToken)
            {
 
                var query = from h in context.HistorialIncidencia
                            join p in context.Persona on h.PersonaId equals p.PersonaId
                            join d in context.Departamento on h.DepartamentoId equals d.DepartamentoId
                            join i in context.Incidencia on h.IncidenciaId equals i.IncidenciaId
                            join u in context.Usuario on h.UsuarioId equals u.UsuarioId
                            orderby h.HistorialIncidenciaId
                            where (request.DepartamentoId == 0 || h.Departamento.DepartamentoId == request.DepartamentoId)
                            where (request.TipoIncidenciaId == 0 || h.TipoIncidenciaId == request.TipoIncidenciaId)
                            select new HistorialIncidenciaDto
                            {
                                HistorialIncidenciaId = h.HistorialIncidenciaId,
                                CodigoIncidencia = i.CodigoIncidencia,
                                NroDepartamento = d.NroDepartamento,
                                TipoDepartamento = utils.BuscarParametro(d.TipoDepaId, "TIPO_DEPA_ID"),
                                TipoIncidencia = utils.BuscarParametro(h.TipoIncidenciaId, "TIPO_INCIDENCIA_ID"),
                                DescripcionIncidencia = h.DescripcionIncidencia,
                                EstadoIncidencia = utils.BuscarParametro(h.EstadoIncidenciaId, "ESTADO_INCIDENCIA_ID"),
                                FechaIncidencia = h.FechaIncidencia.ToString("dd/MM/yyyy HH:mm"),
                                UsuarioRegistro = u.UserName,
                                FechaRegistro = h.FechaRegistro.ToString("dd/MM/yyyy HH:mm"),
                                Informante = p.NombreCompleto
                            };

                return await query.ToListAsync();
                //
            }
        }
    }
}
