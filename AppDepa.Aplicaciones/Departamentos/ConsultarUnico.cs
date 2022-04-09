using AppDepa.Aplicaciones.Exceptions;
using AppDepa.Dominio;
using AppDepa.Infraestructura.Datos.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Departamentos
{
    public class ConsultarUnico
    {
        public class Ejecuta : IRequest<Departamento>
        {
            public int DepartamentoId { get; set; }           
        }
       
        public class Handler : IRequestHandler<Ejecuta,Departamento>
        {
            private readonly GestionDepartamentosContext context;
            public Handler(GestionDepartamentosContext _context)
            {
                this.context = _context;
            }
            public async Task<Departamento> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var departamento = await context.Departamento.Where(x => x.DepartamentoId == request.DepartamentoId).SingleOrDefaultAsync();
                if (departamento == null)
                {
                    throw new ExceptionHandler(HttpStatusCode.NotFound, new { mensaje = "El Departamento no existe" });
                }
                return departamento;                
            }
        }
    }
}
