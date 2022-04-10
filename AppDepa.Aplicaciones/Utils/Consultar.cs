using AppDepa.Dominio;
using AppDepa.Infraestructura.Datos.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Utils
{
    public class Consultar
    {
        public class ListaParametros : IRequest<List<Parametro>>
        {
            public string ParametroId { get; set; }
        }

        public class Handler : IRequestHandler<ListaParametros, List<Parametro>>
        {
            private readonly GestionDepartamentosContext context;           

            public Handler(GestionDepartamentosContext _context)
            {
                this.context = _context;                
            }

            public async Task<List<Parametro>> Handle(ListaParametros request, CancellationToken cancellationToken)
            {
                return await context.Parametro.Where(x => x.ParametroId.Equals(request.ParametroId)).ToListAsync();
            }
        }
    }
}
