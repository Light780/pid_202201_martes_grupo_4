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

            //private readonly IFactoryConnection connection;

            public Handler(GestionDepartamentosContext _context)
            {
                this.context = _context;
            }

            //public Handler(IFactoryConnection _connection)
            //{
            //    this.connection = _connection;
            //}


            private string BuscaParametro(int param, string reporte)
            {
                return context.Parametros.ToList().Where(p => p.ParametroId == reporte.ToString().Trim() && param == p.ParamId).SingleOrDefault().Descripcion;
            }
            public async Task<List<DepartamentoDto>> Handle(ListaDepartamento request, CancellationToken cancellationToken)
            {
                //var query1 = (from p in context.Parametros where p.ParametroId == "TIPO_DEPA_ID"
                //             select new
                //             {
                //                 Descripcion = p.Descripcion
                //             };)

                // Hacer query con Linq
                var query = from d in context.Departamento
                            join p in context.Parametros on d.TipoDepaId equals p.ParamId
                            where p.ParametroId == "TIPO_DEPA_ID"

                            select new DepartamentoDto
                            {
                                DepartamentoId = d.DepartamentoId,
                                NroDepartamento = d.NroDepartamento,
                                Tamano = d.Tamano,
                                //TipoDepa = p.ParametroId,
                                TipoDepa = context.Parametros.ToList().Where(p => p.ParametroId == "TIPO_DEPA_ID" && d.TipoDepaId == p.ParamId).SingleOrDefault().Descripcion,
                                //EstadoDepa = BuscaParametro(d.EstadoDepaId, "ESTADO_DEPA_ID"),
                                EstadoDepa = d.EstadoDepaId.ToString(),
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
