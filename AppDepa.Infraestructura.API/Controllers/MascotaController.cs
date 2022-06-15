using AppDepa.Aplicaciones.Mascotas;
using AppDepa.Dominio;
using AppDepa.Infraestructura.Datos.Dapper.Mascota;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.API.Controllers
{
    public class MascotaController : CustomController
    {
        [HttpPost]
        public async Task<ActionResult<Unit>> RegistrarMascota([FromBody] Registrar.Ejecuta data)
        {
            return await mediator.Send(data);
        }
        [HttpPut]
        public async Task<ActionResult<Unit>> EditarMascotas([FromBody] Editar.Ejecuta data)
        {
            return await mediator.Send(data);
        }
        [HttpGet("consulta")]
        public async Task<ActionResult<List<MascotaDto>>> ListarMascotas([FromQuery] Consultar.ListarMascotas data)
        {
            return await mediator.Send(data);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Mascota>> ObtenerMascota(int id)
        {
            return await mediator.Send(new ConsultarUnico.Ejecuta() { MascotaId = id });
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> EliminarMascota(int id)
        {
            return await mediator.Send(new Eliminar.Ejecuta() { MascotaId = id });
        }
    }
}
