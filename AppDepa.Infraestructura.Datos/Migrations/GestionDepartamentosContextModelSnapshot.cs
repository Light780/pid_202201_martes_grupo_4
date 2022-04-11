﻿// <auto-generated />
using System;
using AppDepa.Infraestructura.Datos.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace AppDepa.Infraestructura.Datos.Migrations
{
    [DbContext(typeof(GestionDepartamentosContext))]
    partial class GestionDepartamentosContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.15")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("AppDepa.Dominio.Boleta", b =>
                {
                    b.Property<int>("BoletaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CodigoPago")
                        .HasColumnType("varchar(8)");

                    b.Property<int>("DepartamentoId")
                        .HasColumnType("int");

                    b.Property<decimal>("Monto")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Periodo")
                        .HasColumnType("varchar(6)");

                    b.Property<int>("ServicioId")
                        .HasColumnType("int");

                    b.HasKey("BoletaId");

                    b.HasIndex("DepartamentoId");

                    b.ToTable("Boleta");
                });

            modelBuilder.Entity("AppDepa.Dominio.Departamento", b =>
                {
                    b.Property<int>("DepartamentoId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CantidadHabitaciones")
                        .HasColumnType("int");

                    b.Property<int>("EstadoId")
                        .HasColumnType("int");

                    b.Property<DateTime>("FechaRegistro")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IndBalcon")
                        .HasColumnType("bit");

                    b.Property<bool>("IndCocina")
                        .HasColumnType("bit");

                    b.Property<bool>("IndLavanderia")
                        .HasColumnType("bit");

                    b.Property<bool>("IndPatio")
                        .HasColumnType("bit");

                    b.Property<bool>("IndPiscina")
                        .HasColumnType("bit");

                    b.Property<string>("NroDepartamento")
                        .HasColumnType("varchar(3)");

                    b.Property<decimal>("Tamano")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("TipoDepaId")
                        .HasColumnType("int");

                    b.HasKey("DepartamentoId");

                    b.ToTable("Departamento");
                });

            modelBuilder.Entity("AppDepa.Dominio.Incidencia", b =>
                {
                    b.Property<int>("IncidenciaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("DepartamentoId")
                        .HasColumnType("int");

                    b.Property<string>("DescripcionIncidencia")
                        .HasColumnType("varchar(300)");

                    b.Property<int>("EstadoId")
                        .HasColumnType("int");

                    b.Property<DateTime>("FechaIncidencia")
                        .HasColumnType("datetime2");

                    b.HasKey("IncidenciaId");

                    b.HasIndex("DepartamentoId");

                    b.ToTable("Incidencia");
                });

            modelBuilder.Entity("AppDepa.Dominio.Mascota", b =>
                {
                    b.Property<int>("MascotaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("DepartamentoId")
                        .HasColumnType("int");

                    b.Property<DateTime>("FechaRegistro")
                        .HasColumnType("datetime2");

                    b.Property<string>("NombreMascota")
                        .HasColumnType("varchar(45)");

                    b.Property<int>("RazaId")
                        .HasColumnType("int");

                    b.Property<string>("Sexo")
                        .HasColumnType("char(1)");

                    b.HasKey("MascotaId");

                    b.HasIndex("DepartamentoId");

                    b.ToTable("Mascota");
                });

            modelBuilder.Entity("AppDepa.Dominio.PagoServicio", b =>
                {
                    b.Property<int>("PagoServicioId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BoletaId")
                        .HasColumnType("int");

                    b.Property<DateTime>("FechaPago")
                        .HasColumnType("datetime2");

                    b.Property<string>("NroOperacion")
                        .HasColumnType("varchar(10)");

                    b.HasKey("PagoServicioId");

                    b.HasIndex("BoletaId");

                    b.ToTable("PagoServicio");
                });

            modelBuilder.Entity("AppDepa.Dominio.Parametro", b =>
                {
                    b.Property<string>("Descripcion")
                        .HasColumnType("varchar(300)");

                    b.Property<int>("Estado")
                        .HasColumnType("int");

                    b.Property<DateTime>("FechaRegistro")
                        .HasColumnType("datetime2");

                    b.Property<int>("ParamId")
                        .HasColumnType("int");

                    b.Property<string>("ParametroId")
                        .HasColumnType("varchar(30)");

                    b.ToTable("Parametro");
                });

            modelBuilder.Entity("AppDepa.Dominio.Persona", b =>
                {
                    b.Property<int>("PersonaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Correo")
                        .HasColumnType("varchar(100)");

                    b.Property<int>("DepartamentoId")
                        .HasColumnType("int");

                    b.Property<string>("Documento")
                        .HasColumnType("varchar(20)");

                    b.Property<int>("EstadoId")
                        .HasColumnType("int");

                    b.Property<DateTime>("FechaRegistro")
                        .HasColumnType("datetime2");

                    b.Property<string>("NombreCompleto")
                        .HasColumnType("varchar(200)");

                    b.Property<string>("Sexo")
                        .HasColumnType("char(1)");

                    b.Property<string>("Telefono")
                        .HasColumnType("varchar(15)");

                    b.Property<int>("TipoDocumentoId")
                        .HasColumnType("int");

                    b.Property<int>("TipoPersonaId")
                        .HasColumnType("int");

                    b.HasKey("PersonaId");

                    b.HasIndex("DepartamentoId");

                    b.ToTable("Persona");
                });

            modelBuilder.Entity("AppDepa.Dominio.Usuario", b =>
                {
                    b.Property<int>("UsuarioId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .HasColumnType("varchar(45)");

                    b.Property<DateTime>("FechaRegistro")
                        .HasColumnType("datetime2");

                    b.Property<byte[]>("FotoPerfil")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("NombreCompleto")
                        .HasColumnType("varchar(80)");

                    b.Property<string>("Password")
                        .HasColumnType("varchar(35)");

                    b.Property<string>("UserName")
                        .HasColumnType("varchar(35)");

                    b.HasKey("UsuarioId");

                    b.ToTable("Usuario");
                });

            modelBuilder.Entity("AppDepa.Dominio.Visita", b =>
                {
                    b.Property<int>("VisitaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("FechaEntrada")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("FechaSalida")
                        .HasColumnType("datetime2");

                    b.Property<int>("PersonaId")
                        .HasColumnType("int");

                    b.HasKey("VisitaId");

                    b.HasIndex("PersonaId");

                    b.ToTable("Visita");
                });

            modelBuilder.Entity("AppDepa.Dominio.Boleta", b =>
                {
                    b.HasOne("AppDepa.Dominio.Departamento", "Departamento")
                        .WithMany("Boletas")
                        .HasForeignKey("DepartamentoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Departamento");
                });

            modelBuilder.Entity("AppDepa.Dominio.Incidencia", b =>
                {
                    b.HasOne("AppDepa.Dominio.Departamento", "Departamento")
                        .WithMany("Incidencias")
                        .HasForeignKey("DepartamentoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Departamento");
                });

            modelBuilder.Entity("AppDepa.Dominio.Mascota", b =>
                {
                    b.HasOne("AppDepa.Dominio.Departamento", "Departamento")
                        .WithMany("Mascotas")
                        .HasForeignKey("DepartamentoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Departamento");
                });

            modelBuilder.Entity("AppDepa.Dominio.PagoServicio", b =>
                {
                    b.HasOne("AppDepa.Dominio.Boleta", "Boleta")
                        .WithMany()
                        .HasForeignKey("BoletaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Boleta");
                });

            modelBuilder.Entity("AppDepa.Dominio.Persona", b =>
                {
                    b.HasOne("AppDepa.Dominio.Departamento", "Departamento")
                        .WithMany("Personas")
                        .HasForeignKey("DepartamentoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Departamento");
                });

            modelBuilder.Entity("AppDepa.Dominio.Visita", b =>
                {
                    b.HasOne("AppDepa.Dominio.Persona", "Persona")
                        .WithMany("Visitas")
                        .HasForeignKey("PersonaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Persona");
                });

            modelBuilder.Entity("AppDepa.Dominio.Departamento", b =>
                {
                    b.Navigation("Boletas");

                    b.Navigation("Incidencias");

                    b.Navigation("Mascotas");

                    b.Navigation("Personas");
                });

            modelBuilder.Entity("AppDepa.Dominio.Persona", b =>
                {
                    b.Navigation("Visitas");
                });
#pragma warning restore 612, 618
        }
    }
}
