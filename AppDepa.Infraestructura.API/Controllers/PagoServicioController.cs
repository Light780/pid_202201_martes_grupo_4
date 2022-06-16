using AppDepa.Aplicaciones.PagoServicios;
using AppDepa.Infraestructura.Datos.Dapper.PagoServicio;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.API.Controllers
{
    public class PagoServicioController : CustomController
    {
        [HttpGet]
        public async Task<ActionResult<List<PagoServicioDto>>> ListarPagos([FromQuery] Consultar.ListaPagos data)
        {
            return await mediator.Send(data);
        }
        [HttpPost]
        public async Task<ActionResult<Unit>> RegistrarPago([FromBody] Registrar.Ejecuta data)
        {
            return await mediator.Send(data);
        }
    }
}
