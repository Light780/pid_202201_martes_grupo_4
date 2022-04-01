using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppDepa.Aplicaciones.Interfaces;
using AppDepa.Dominio;
using AppDepa.Dominio.Interfaces.Repositorios;

namespace AppDepa.Aplicaciones.Servicios
{
    public class VentaServicio : IServicioMovimiento<Venta, Guid>
    {
        IRepositorioMovimiento<Venta, Guid> repoVenta;
        IRepositorioBase<Producto, Guid> repoProducto;
        IRepositorioDetalle<VentaDetalle, Guid> repoDetalle;

        public VentaServicio(
            IRepositorioMovimiento<Venta, Guid> _repoVenta,
            IRepositorioBase<Producto, Guid> _repoProducto,
            IRepositorioDetalle<VentaDetalle, Guid> _repoDetalle
        )
        {
            repoVenta = _repoVenta;
            repoProducto = _repoProducto;
            repoDetalle = _repoDetalle;
        }

        public Venta Agregar(Venta entidad)
        {
            if (entidad == null)
                throw new ArgumentNullException("La 'Venta' es requerida");

            var ventaAgregada = repoVenta.Agregar(entidad);

            entidad.VentaDetalles.ForEach(detalle => {

                var productoSeleccionado = repoProducto.SeleccionarPorID(detalle.productoId);
                if(productoSeleccionado == null)
                    throw new ArgumentNullException("Usted esta intentando vender un producto que no existe");

                var detalleNuevo = new VentaDetalle();
                detalleNuevo.ventaId = ventaAgregada.ventaId;
                detalleNuevo.productoId = detalle.productoId;
                detalleNuevo.costoUnitario = productoSeleccionado.precio;
                detalleNuevo.cantidadVendida = detalle.cantidadVendida;
                detalleNuevo.subtotal = detalleNuevo.precioUnitario * detalleNuevo.cantidadVendida;
                detalleNuevo.impuesto = detalleNuevo.subtotal * 15 / 100;
                detalleNuevo.total = detalleNuevo.subtotal + detalleNuevo.impuesto;
                repoDetalle.Agregar(detalleNuevo);

                productoSeleccionado.cantidadEnStock -= detalleNuevo.cantidadVendida;
                repoProducto.Editar(productoSeleccionado);

                entidad.subtotal += detalleNuevo.subtotal;
                entidad.impuesto += detalleNuevo.impuesto;
                entidad.total += detalleNuevo.total;
            });

            repoVenta.GuardarTodosLosCambios();
            return entidad;
        }

        public void Anular(Guid entidadId)
        {
            repoVenta.Anular(entidadId);
            repoVenta.GuardarTodosLosCambios();
        }

        public List<Venta> Listar()
        {
            return repoVenta.Listar();
        }

        public Venta SeleccionarPorID(Guid entidadId)
        {
            return repoVenta.SeleccionarPorID(entidadId);
        }
    }
}
