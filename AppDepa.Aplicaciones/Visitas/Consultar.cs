using AppDepa.Infraestructura.Datos.Dapper.Visita;
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
            private readonly IVisita _visitaService;
            public Handler(IVisita visitaService)
            {
                this._visitaService = visitaService;
            }
            public async Task<List<VisitaDto>> Handle(ListarVisitas request, CancellationToken cancellationToken)
            {
                //0 TODOS
                //1 Finalizado
                //2 No Finalizado
                var lista = await _visitaService.ListarVisita(request.NombreCompleto, request.Documento, request.EstadoId);
                return lista.ToList();
            }
        }
    }
}
