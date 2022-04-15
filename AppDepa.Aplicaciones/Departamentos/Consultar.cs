using AppDepa.Aplicaciones.Dto;
using AppDepa.Dominio;
using AppDepa.Infraestructura.Datos.Context;
using AppDepa.Infraestructura.Datos.Dapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using AppDepa.Aplicaciones.Utils;

namespace AppDepa.Aplicaciones.Departamentos
{
    public class Consultar
    {
        public class ListaDepartamento: IRequest<List<DepartamentoDto>>
        {

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
                            orderby d.NroDepartamento
                            select new DepartamentoDto
                            {
                                DepartamentoId = d.DepartamentoId,
                                NroDepartamento = d.NroDepartamento,
                                Tamano = d.Tamano,                                
                                TipoDepa = utils.BuscarParamaetro(d.TipoDepaId, "TIPO_DEPA_ID"),
                                Estado = utils.BuscarParamaetro(d.EstadoId, "ESTADO_ID"),
                                CantidadHabitaciones = d.CantidadHabitaciones,
                                IndCocina = d.IndCocina,
                                IndBalcon = d.IndBalcon,
                                IndLavanderia = d.IndLavanderia,
                                IndPiscina = d.IndPiscina,
                                IndPatio = d.IndPatio

                            };
                

                var lista = await query.ToListAsync();
                return lista;
            }
        }        
    }
}
