using AppDepa.Aplicaciones.Utils;
using AppDepa.Infraestructura.Datos.Context;
using AppDepa.Infraestructura.Datos.Dapper.Incidencia;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Incidencias
{
    public class Consultar
    {
        public class ListarIncidencias : IRequest<List<IncidenciaDto>>
        {
            public int DepartamentoId { get; set; }
            public int TipoIncidenciaId { get; set; }
            public int EstadoIncidenciaId { get; set; }
            public int Eliminado { get; set; }
        }

        public class Handler : IRequestHandler<ListarIncidencias, List<IncidenciaDto>>
        {
            private readonly IIncidencia _IService;
            public Handler(IIncidencia IService)
            {
                this._IService = IService;
            }
            public async Task<List<IncidenciaDto>> Handle(ListarIncidencias request, CancellationToken cancellationToken)
            {
                var lista = await _IService.ListarIncidencia(request.DepartamentoId, request.TipoIncidenciaId, request.EstadoIncidenciaId, request.Eliminado);
                return lista.ToList();
            }
        }
    }
}
