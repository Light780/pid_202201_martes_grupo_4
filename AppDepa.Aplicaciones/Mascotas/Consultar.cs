using AppDepa.Aplicaciones.Dto;
using AppDepa.Aplicaciones.Utils;
using AppDepa.Infraestructura.Datos.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Mascotas
{
    public class Consultar
    {
        public class Ejecuta : IRequest<List<MascotaDto>> { }

        public class Handler : IRequestHandler<Ejecuta, List<MascotaDto>>
        {
            private readonly GestionDepartamentosContext context;
            private readonly IUtils utils;
            public Handler(GestionDepartamentosContext _context, IUtils _utils)
            {
                this.context = _context;
                this.utils = _utils;
            }

            public async Task<List<MascotaDto>> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var query = from m in context.Mascota
                            join d in context.Departamento on m.DepartamentoId equals d.DepartamentoId
                            orderby m.MascotaId
                            select new MascotaDto
                            {
                                MascotaId = m.MascotaId,
                                NombreMascota = m.NombreMascota,
                                Especie = utils.BuscarParametro(m.EspecieId, "ESPECIE_MASCOTA_ID"),
                                Sexo = m.Sexo,
                                Departamento = d.NroDepartamento
                            };
                return await query.ToListAsync();
            }
        }
    }
}
