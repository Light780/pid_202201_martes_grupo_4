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
    public class ConsultarCantidades
    {
        public class Dashboard : IRequest<object> { }
        public class Handler : IRequestHandler<Dashboard, object>
        {
            private readonly GestionDepartamentosContext context;

            public Handler(GestionDepartamentosContext _context)
            {
                this.context = _context;
            }

            public async Task<object> Handle(Dashboard request, CancellationToken cancellationToken)
            {
                var cantDepartamentos = await context.Departamento.CountAsync();
                var cantPersonas = await context.Persona.CountAsync();
                var cantMascotas = await context.Mascota.CountAsync();
                var cantVisitas = await context.Visita.CountAsync();
                var cantBoletas = await context.Boleta.CountAsync();
                return new
                {
                    cantDepartamentos,
                    cantPersonas,
                    cantMascotas,
                    cantVisitas,
                    cantBoletas
                };
            }
        }
    }
}
