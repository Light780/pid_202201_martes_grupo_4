using AppDepa.Infraestructura.Datos.Dapper.Mascota;
using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Mascotas
{
    public class Consultar
    {
        public class ListarMascotas : IRequest<List<MascotaDto>>
        {
            public int DepartamentoId { get; set; }
            public int EspecieId { get; set; }
            public int Eliminado { get; set; }
        }

        public class Handler : IRequestHandler<ListarMascotas, List<MascotaDto>>
        {
            private readonly IMascota _mascotaService;
            public Handler(IMascota mascotaService)
            {
                this._mascotaService = mascotaService;
            }
            public async Task<List<MascotaDto>> Handle(ListarMascotas request, CancellationToken cancellationToken)
            {
                var lista = await _mascotaService.ListarMascota(request.DepartamentoId, request.EspecieId, request.Eliminado);
                return lista.ToList();
            }
        }
    }
}
