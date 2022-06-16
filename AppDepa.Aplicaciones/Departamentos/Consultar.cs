using AppDepa.Infraestructura.Datos.Dapper.Departamento;
using MediatR;
using System.Collections.Generic;
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
            public int Eliminado { get; set; }
        }

        public class Handler : IRequestHandler<ListaDepartamento, List<DepartamentoDto>>
        {
            private readonly IDepartamento _departamentoService;
            public Handler(IDepartamento departamentoService)
            {
                this._departamentoService = departamentoService;
            }

            public async Task<List<DepartamentoDto>> Handle(ListaDepartamento request, CancellationToken cancellationToken)
            {
                // Hacer query con Linq
                var lista = await _departamentoService.ListarDepartamento(request.TipoDepaId, request.Eliminado);
                return lista.ToList();
            }
        }
    }
}
