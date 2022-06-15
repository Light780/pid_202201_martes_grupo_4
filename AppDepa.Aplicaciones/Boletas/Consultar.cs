using AppDepa.Aplicaciones.Dto;
using AppDepa.Aplicaciones.Utils;
using AppDepa.Infraestructura.Datos.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Boletas
{
    public class Consultar
    {

        public class ListaBoleta : IRequest<List<BoletaDto>>
        {
            public string FechaPago { get; set; }

            public string Departamento { get; set; }
        }

        public class Handler : IRequestHandler<ListaBoleta, List<BoletaDto>>
        {
            private readonly GestionDepartamentosContext context;
            private readonly IUtils utils;
            public Handler(GestionDepartamentosContext _context, IUtils _utils)
            {
                this.context = _context;
                this.utils = _utils;
            }

            public async Task<List<BoletaDto>> Handle(ListaBoleta request, CancellationToken cancellationToken)
            {
                var query = from b in context.Boleta
                            join d in context.Departamento on b.DepartamentoId equals d.DepartamentoId
                            join u in context.Usuario on b.UsuarioId equals u.UsuarioId
                            orderby b.BoletaId
                            select new BoletaDto
                            {
                                BoletaId = b.BoletaId,
                                Servicio= utils.BuscarParametro(b.ServicioId, "TIPO_SERVICIO"),
                                Departamento = d.NroDepartamento,
                                Periodo = b.Periodo,
                                CodigoPago = b.CodigoPago,
                                Monto = b.Monto,
                                Usuario = u.UserName,
                                FechaPago = b.FechaPago.ToString("dd/MM/yyyy HH:mm")
                            };


                return await query.ToListAsync();

            }

        }

    }
}
