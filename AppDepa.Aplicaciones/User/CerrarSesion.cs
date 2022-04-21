using AppDepa.Aplicaciones.Utils;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.User
{
    public class CerrarSesion
    {
        public class Ejecuta : IRequest { }

        public class Handler : IRequestHandler<Ejecuta>
        {
            private readonly IUtils utils;
            public Handler(IUtils _utils)
            {
                this.utils = _utils;
            }
            public Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                return Task.Run(() =>
                {
                    if (utils.GetUsuarioSession() != 0)
                    {
                        utils.DeleteUsuarioSession();
                    }
                    return Unit.Value;
                });
            }

        }
    }
}
