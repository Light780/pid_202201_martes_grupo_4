using AppDepa.Aplicaciones.Dto;
using AppDepa.Aplicaciones.Utils;
using AppDepa.Infraestructura.Datos.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Departamentos
{
    public class Consultar
    {
        public class ListaDepartamento : IRequest<List<DepartamentoDto>>
        {
            public int TipoDepaId { get; set; }
        }

        public class Handler : IRequestHandler<ListaDepartamento, List<DepartamentoDto>>
        {
            private readonly GestionDepartamentosContext context;
            private readonly IUtils utils;


            public Handler(GestionDepartamentosContext _context, IUtils _utils)
            {
                this.context = _context;
                this.utils = _utils;
            }

            public async Task<List<DepartamentoDto>> Handle(ListaDepartamento request, CancellationToken cancellationToken)
            {
                // Hacer query con Linq
                var query = from d in context.Departamento
                            join u in context.Usuario on d.UsuarioId equals u.UsuarioId
                            orderby d.NroDepartamento
                            where (request.TipoDepaId == 0 || d.TipoDepaId == request.TipoDepaId)
                            select new DepartamentoDto
                            {
                                DepartamentoId = d.DepartamentoId,
                                NroDepartamento = d.NroDepartamento,
                                Tamano = d.Tamano,
                                TipoDepa = utils.BuscarParametro(d.TipoDepaId, "TIPO_DEPA_ID"),
                                Estado = utils.BuscarParametro(d.EstadoId, "ESTADO_ID"),
                                CantidadHabitaciones = d.CantidadHabitaciones,
                                IndCocina = d.IndCocina,
                                IndBalcon = d.IndBalcon,
                                IndLavanderia = d.IndLavanderia,
                                IndPiscina = d.IndPiscina,
                                IndPatio = d.IndPatio,
                                FechaRegistro = d.FechaRegistro.ToString("dd/MM/yyyy hh:mm"),
                                Usuario = u.UserName
                            };
                return await query.ToListAsync();
            }
        }
    }
}
