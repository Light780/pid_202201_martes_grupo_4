using AppDepa.Infraestructura.Datos.Dapper.Boleta;
using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Boletas
{
    public class Consultar
    {

        public class ListaBoleta : IRequest<List<BoletaDto>>
        {
            public string Anio { get; set; }

            public int DepartamentoId { get; set; }

            public int EstadoId { get; set; }
        }

        public class Handler : IRequestHandler<ListaBoleta, List<BoletaDto>>
        {
            private readonly IBoleta _boletaService;
            public Handler(IBoleta boletaService)
            {
                this._boletaService = boletaService;
            }

            public async Task<List<BoletaDto>> Handle(ListaBoleta request, CancellationToken cancellationToken)
            {
                //0 TODOS //1 Cancelado //2 Pendiente
                var lista = await _boletaService.ListarBoleta(request.Anio, request.DepartamentoId, request.EstadoId);
                return lista.ToList();
            }

        }

    }
}
