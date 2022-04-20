using AppDepa.Aplicaciones.Exceptions;
using AppDepa.Dominio;
using AppDepa.Infraestructura.Datos.Context;
using FluentValidation;
using MediatR;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Mascotas
{
    public class Registrar
    {
        public class Ejecuta : IRequest
        {
            public string NombreMascota { get; set; }
            public string Sexo { get; set; }
            public int EspecieId { get; set; }
            public int DepartamentoId { get; set; }
        }
        public class EjecutaValidatior : AbstractValidator<Ejecuta>
        {
            public EjecutaValidatior()
            {
                RuleFor(x => x.NombreMascota).NotEmpty().WithMessage("El Nombre es obligatorio");
                RuleFor(x => x.Sexo).NotEmpty().WithMessage("El Sexo es obligatorio");
                RuleFor(x => x.EspecieId).GreaterThan(0).WithMessage("La Especie es obligatoria");
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
                Mascota masc = new Mascota()
                {
                    NombreMascota = request.NombreMascota,
                    Sexo = request.Sexo,
                    EspecieId = request.EspecieId,
                    DepartamentoId = request.DepartamentoId,
                    FechaRegistro = DateTime.UtcNow
                };
                context.Mascota.Add(masc);
                var result = await context.SaveChangesAsync();
                if (result > 0)
                {
                    return Unit.Value;
                }
                throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "Error al registrar Mascota" });
            }
        }
    }
}
