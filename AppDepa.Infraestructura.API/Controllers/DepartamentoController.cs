using AppDepa.Aplicaciones.Departamentos;
using AppDepa.Aplicaciones.Dto;
using AppDepa.Dominio;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.API.Controllers
{
    public class DepartamentoController : CustomController
    {
        [HttpPost]
        public async Task<ActionResult<Unit>> RegistrarDepartamento(Registrar.Ejecuta data)
        {
            return await mediator.Send(data);
        }

        [HttpGet]
        public async Task<ActionResult<List<DepartamentoDto>>> ListarDepartamento()
        {
            return await mediator.Send(new Consultar.ListaDepartamento());
        }
    }
}
