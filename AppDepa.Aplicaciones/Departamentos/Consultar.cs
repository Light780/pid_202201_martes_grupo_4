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
        public class ListaDepartamento: IRequest<List<Departamento>>
        {

        }

        public class Handler : IRequestHandler<ListaDepartamento, List<Departamento>>
        {
            private readonly GestionDepartamentosContext context;

            private readonly IFactoryConnection connection;

            public Handler(GestionDepartamentosContext _context, IFactoryConnection _connection)
            {
                this.context = _context;
                this.connection = _connection;
            }

            public async Task<List<Departamento>> Handle(ListaDepartamento request, CancellationToken cancellationToken)
            {
                // Hacer query con Linq
                //var query = from d in context.Departamento 
                //            join p in context.Parametros on d.TipoDepaId equals p.

                var lista = await context.Departamento.ToListAsync();
                return lista;
            }
        }

    }


}
