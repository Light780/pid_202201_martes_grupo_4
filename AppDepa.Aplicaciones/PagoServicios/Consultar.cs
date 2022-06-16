using AppDepa.Infraestructura.Datos.Dapper.PagoServicio;
using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.PagoServicios
{
    public class Consultar
    {
        public class ListaPagos : IRequest<List<PagoServicioDto>>
        {
            public int BoletaId { get; set; }
        }
        public class Handler : IRequestHandler<ListaPagos, List<PagoServicioDto>>
        {
            private readonly IPagoServicio _pagoService;
            public Handler(IPagoServicio pagoService)
            {
                this._pagoService = pagoService;
            }
            public async Task<List<PagoServicioDto>> Handle(ListaPagos request, CancellationToken cancellationToken)
            {
                var lista = await _pagoService.ListarPagos(request.BoletaId);
                return lista.ToList();
            }
        }
    }
}
