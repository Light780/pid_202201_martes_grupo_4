using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppDepa.Dominio.Interfaces;

namespace AppDepa.Dominio.Interfaces.Repositorios
{
    /* Asignamos que métodos tendrá este repositorio */
    public interface IRepositorioMovimiento<TEntidad, TEntidadID> : IAgregar<TEntidad>, IListar<TEntidad, TEntidadID>, ITransaccion
    {
        void Anular(TEntidadID entidadId);
    }
}
