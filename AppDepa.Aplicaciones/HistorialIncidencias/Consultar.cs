using AppDepa.Aplicaciones.Dto;
using AppDepa.Aplicaciones.Utils;
using AppDepa.Infraestructura.Datos.Context;
using AppDepa.Infraestructura.Datos.Dapper.HistorialIncidencia;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.HistorialIncidencias
{
    public class Consultar
    {
        public class ListarHistorial : IRequest<List<HistorialIncidenciaDto>>
        {
            public int DepartamentoId { get; set; }
            public int TipoIncidenciaId { get; set; }
        }

        public class Handler : IRequestHandler<ListarHistorial, List<HistorialIncidenciaDto>>
        {
            private readonly IHistorialIncidencias _hiService;
            public Handler(IHistorialIncidencias hiService)
            {
                this._hiService = hiService;
            }
            public async Task<List<HistorialIncidenciaDto>> Handle(ListarHistorial request, CancellationToken cancellationToken)
            {
                var lista = await _hiService.ListarHistorialIndicencia(request.DepartamentoId);
                return lista.ToList();
            }
        }
    }
}
