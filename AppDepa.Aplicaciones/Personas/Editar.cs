using AppDepa.Aplicaciones.Exceptions;
using AppDepa.Aplicaciones.Utils;
using AppDepa.Infraestructura.Datos.Context;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Personas
{
    public class Editar
    {
        public class Ejecuta : IRequest
        {
            public int PersonaId { get; set; }
            public string NombreCompleto { get; set; }
            public string Documento { get; set; }
            public int TipoDocumentoId { get; set; }
            public string Telefono { get; set; }
            public int EstadoId { get; set; }
            public string Correo { get; set; }
            public string Sexo { get; set; }
            public int TipoPersonaId { get; set; }
            public int DepartamentoId { get; set; }
        }

        public class EjecutaValidacion : AbstractValidator<Ejecuta>
        {
            public EjecutaValidacion()
            {
                RuleFor(x => x.NombreCompleto)
                    .NotEmpty().WithMessage("El Nombre Completo es obligatorio")
                    .MinimumLength(3).WithMessage("El Nombre Completo debe tener minimo 3 caracteres");

                RuleFor(x => x.TipoDocumentoId)
                   .GreaterThan(0).WithMessage("El Tipo de Documento es obligatorio");

                RuleFor(x => x.Documento)
                   .NotEmpty().WithMessage("El Documento es obligatorio");

                When(persona => persona.TipoDocumentoId == 1, () =>
                {
                    RuleFor(x => x.Documento).Length(8).WithMessage("El Documento debe tener 8 caracteres");
                }).Otherwise(() =>
                {
                    RuleFor(x => x.Documento).Length(12).WithMessage("El Documento debe tener 12 caracteres");
                });

                RuleFor(x => x.Telefono).Length(7, 9).WithMessage("El Telefono debe tener 9 o 7 caracteres");

                RuleFor(x => x.EstadoId).GreaterThan(0).WithMessage("El Estado es obligatorio");

                RuleFor(x => x.Correo)
                    .NotEmpty().WithMessage("El Correo es obligatorio")
                    .EmailAddress().WithMessage("El Correo debe ser un correo valido");

                RuleFor(x => x.Sexo)
                    .NotEmpty().WithMessage("El Sexo es obligatorio");

                RuleFor(x => x.TipoPersonaId).GreaterThan(0).WithMessage("El Tipo Persona es obligatorio");

                RuleFor(x => x.DepartamentoId).GreaterThan(0).WithMessage("El Departamento es obligatorio");

            }

            public class Handler : IRequestHandler<Ejecuta>
            {
                private readonly GestionDepartamentosContext context;
                private readonly IUtils utils;

                public Handler(GestionDepartamentosContext _context, IUtils _util)
                {
                    this.context = _context;
                    this.utils = _util;
                }



                public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
                {
                    var persona = await context.Persona.Where(x => x.PersonaId == request.PersonaId).SingleOrDefaultAsync();
                    // True si existe, false si no existe
                    if (persona == null)
                    {
                        throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "La persona no existe" });
                    }

                    // valida documento existente en otra persona
                    var existeDocumento = await context.Persona.Where(x => x.Documento.Equals(request.Documento) && x.PersonaId != persona.PersonaId).AnyAsync();

                    if (existeDocumento)
                    {
                        throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "El documento ya se encuentra registrado" });
                    }

                    // valida correo existente en otra persona
                    var existeCorreo = await context.Persona.Where(x => x.Correo.Equals(request.Correo) && x.PersonaId != persona.PersonaId).AnyAsync();

                    if (existeCorreo)
                    {
                        throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "El correo ya se encuentra registrado" });
                    }

                    // valida telefono existente en otra persona
                    var existeTelefono = await context.Persona.Where(x => x.Telefono.Equals(request.Telefono) && x.PersonaId != persona.PersonaId).AnyAsync();

                    if (existeTelefono)
                    {
                        throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "El teléfono ya se encuentra registrado" });
                    }

                    // Actualizar los datos de la Persona
                    persona.Documento = request.Documento;
                    persona.TipoDocumentoId = request.TipoDocumentoId;
                    persona.Telefono = request.Telefono;
                    persona.EstadoId = request.EstadoId;
                    persona.Correo = request.Correo;
                    persona.Sexo = request.Sexo;
                    persona.TipoPersonaId = request.TipoPersonaId;
                    persona.DepartamentoId = request.DepartamentoId;

                    context.Persona.Update(persona);
                    var result = await context.SaveChangesAsync();

                    if (result > 0)
                    {
                        return Unit.Value;
                    }
                    throw new ExceptionHandler(HttpStatusCode.BadRequest, new { mensaje = "Error al actualizar Persona" });
                }
            }
        }
    }
}
