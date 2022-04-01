using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Dominio.Interfaces.Repositorios
{
    public interface ITransaccion
    {
        void GuardarTodosLosCambios();
    }
}
