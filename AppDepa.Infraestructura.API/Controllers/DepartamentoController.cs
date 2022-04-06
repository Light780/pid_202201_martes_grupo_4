using AppDepa.Aplicaciones.Departamentos;
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
    }
}
