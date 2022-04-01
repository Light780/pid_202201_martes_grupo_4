using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AppDepa.Dominio;
using AppDepa.Dominio.Interfaces.Repositorios;
using AppDepa.Infraestructura.Datos.Contextos;

namespace AppDepa.Infraestructura.Datos.Repositorios
{
    public class VentaDetalleRepositorio : IRepositorioDetalle<VentaDetalle, Guid>
    {
        private VentaContexto db;

        public VentaDetalleRepositorio(VentaContexto _db)
        {
            db = _db;
        }

        public VentaDetalle Agregar(VentaDetalle entidad)
        {
            db.VentaDetalles.Add(entidad);
            return entidad;
        }

        public void GuardarTodosLosCambios()
        {
            db.SaveChanges();
        }
    }
}
