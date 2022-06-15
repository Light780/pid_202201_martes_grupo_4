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
            public string Anio { get; set; }

            public int DepartamentoId { get; set; }

            public int EstadoId { get; set; }
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
                //0 TODOS //1 Cancelado //2 Pendiente
                var queryPagos = from p in context.PagoServicio
                                 group p by p.BoletaId into g
                                 select new
                                 {
                                     BoletaId = g.Key,
                                     Pagado = (decimal?)g.Sum(x => x.Monto)
                                 };

                var queryDto = from b in context.Boleta
                               join p in queryPagos on b.BoletaId equals p.BoletaId into boletaPagos
                               from bp in boletaPagos.DefaultIfEmpty()
                               join d in context.Departamento on b.DepartamentoId equals d.DepartamentoId
                               join u in context.Usuario on b.UsuarioId equals u.UsuarioId
                               where (string.IsNullOrEmpty(request.Anio) || b.Periodo.Substring(0, 4).Equals(request.Anio))
                               where (request.DepartamentoId == 0 || b.DepartamentoId == request.DepartamentoId)
                               where (request.EstadoId == 0 ||
                                      request.EstadoId == 1 && b.Monto - (bp.Pagado ?? 0) == 0 ||
                                      request.EstadoId == 2 && b.Monto - (bp.Pagado ?? 0) != 0)
                               orderby b.BoletaId
                               select new BoletaDto
                               {
                                   BoletaId = b.BoletaId,
                                   Servicio = utils.BuscarParametro(b.ServicioId, "SERVICIO_ID"),
                                   Departamento = d.NroDepartamento,
                                   Periodo = b.Periodo,
                                   CodigoPago = b.CodigoPago,
                                   Monto = b.Monto,
                                   Usuario = u.UserName,
                                   FechaPago = b.FechaPago.ToString("dd/MM/yyyy HH:mm"),
                                   Estado = b.Monto - (bp.Pagado ?? 0) == 0 ? "Cancelado" : "Pendiente",
                                   Saldo = b.Monto - (bp.Pagado ?? 0)
                               };


                return await queryDto.ToListAsync();

            }

        }

    }
}
