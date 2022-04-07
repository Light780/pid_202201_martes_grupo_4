using AppDepa.Dominio;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.Datos.Context
{
    public class GestionDepartamentosContext : DbContext
    {
        public GestionDepartamentosContext(DbContextOptions options) : base(options)
        {
                
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Persona>().HasKey(c => c.PersonaId);
            modelBuilder.Entity<Mascota>().HasKey(c => c.MascotaId);
            modelBuilder.Entity<Usuario>().HasKey(c => c.UsuarioId);
            modelBuilder.Entity<Departamento>().HasKey(c => c.DepartamentoId);
            modelBuilder.Entity<Boleta>().HasKey(c => c.BoletaId);
            modelBuilder.Entity<Incidencia>().HasKey(c => c.IncidenciaId);
            modelBuilder.Entity<PagoServicio>().HasKey(c => c.PagoServicioId);
            modelBuilder.Entity<Parametros>().HasNoKey();
            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Persona> Persona { get; set; }
        public DbSet<Mascota> Mascota { get; set; }
        public DbSet<Departamento> Departamento { get; set; }
        public DbSet<Boleta> Boleta { get; set; }
        public DbSet<Incidencia> Incidencia { get; set; }
        public DbSet<PagoServicio> PagoServicio { get; set; }
        public DbSet<Parametros> Parametros { get; set; }
    }
}
