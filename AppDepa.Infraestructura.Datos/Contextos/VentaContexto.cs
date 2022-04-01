using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using AppDepa.Dominio;
using AppDepa.Infraestructura.Datos;
using AppDepa.Infraestructura.Datos.Configs;

namespace AppDepa.Infraestructura.Datos.Contextos
{
    public class VentaContexto : DbContext
    {
        public DbSet<Producto> Productos { get; set; }

        public DbSet<Venta> Ventas { get; set; }

        public DbSet<VentaDetalle> VentaDetalles { get; set; }


        #region "Configuracion de conexiones"

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer("/* Connection String */");
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new ProductoConfig());
            builder.ApplyConfiguration(new VentaConfig());
            builder.ApplyConfiguration(new VentaDetalleConfig());
        }

        #endregion


    }
}
