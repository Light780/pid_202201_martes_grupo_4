﻿using AppDepa.Dominio;
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
            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Departamento> Departamento { get; set; }
        public DbSet<Parametros> Parametros { get; set; }
        public DbSet<Persona> Persona { get; set; }
        public DbSet<Mascota> Mascota { get; set; }
    }
}
