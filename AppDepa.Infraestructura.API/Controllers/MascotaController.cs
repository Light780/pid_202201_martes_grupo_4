﻿using AppDepa.Aplicaciones.Dto;
using AppDepa.Aplicaciones.Mascotas;
using AppDepa.Dominio;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.API.Controllers
{
    public class MascotaController : CustomController
    {
        [HttpPut]
        public async Task<ActionResult<Unit>> EditarMascotas(Editar.Ejecuta data)
        {
            return await mediator.Send(data);
        }
        [HttpGet("consulta/{departamentoId}")]
        public async Task<ActionResult<List<MascotaDto>>> ListarMascotas(int departamentoId)
        {
            return await mediator.Send(new Consultar.ListarMascotas() { DepartamentoId = departamentoId });
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