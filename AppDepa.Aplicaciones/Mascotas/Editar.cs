using AppDepa.Aplicaciones.Exceptions;
using AppDepa.Infraestructura.Datos.Context;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Mascotas
{
    public class Editar
    {
        public class Ejecuta : IRequest
        {
            public int MascotaId { get; set; }
            public string NombreMascota { get; set; }
            public string Sexo { get; set; }
            public int RazaId { get; set; }
            public int DepartamentoId { get; set; }
        }
        public class EjecutaValidatior : AbstractValidator<Ejecuta>
        {
            public EjecutaValidatior()
            {
                RuleFor(x => x.NombreMascota).NotEmpty().WithMessage("El Nombre es obligatorio");
                RuleFor(x => x.Sexo).NotEmpty().WithMessage("El Sexo es obligatorio");
                RuleFor(x => x.RazaId).GreaterThan(0).WithMessage("La Raza es obligatoria");
                RuleFor(x => x.DepartamentoId).GreaterThan(0).WithMessage("El Departamento es obligatoria");
            }
        }
        public class Handler : IRequestHandler<Ejecuta>
        {
            private readonly GestionDepartamentosContext context;

            public Handler(GestionDepartamentosContext _context)
            {
                this.context = _context;
            }
            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var mascota = await context.Mascota.Where(x => x.MascotaId == request.MascotaId).SingleOrDefaultAsync();
                if (mascota == null)
                {
                    throw new ExceptionHandler(HttpStatusCode.NotFound, new { mensaje = "La Mascota no existe" });
                }
                mascota.NombreMascota = request.NombreMascota;
                mascota.Sexo = request.Sexo;
                mascota.RazaId = request.RazaId;
                mascota.DepartamentoId = request.DepartamentoId;
                context.Mascota.Update(mascota);
                var result = await context.SaveChangesAsync();
                if(result > 0)
                {
                    return Unit.Value;
                }
                throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "Error al actualizar Mascota" });
            }
        }
    }
}
