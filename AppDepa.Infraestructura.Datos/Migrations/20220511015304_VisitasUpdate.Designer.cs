﻿// <auto-generated />
using System;
using AppDepa.Infraestructura.Datos.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace AppDepa.Infraestructura.Datos.Migrations
{
    [DbContext(typeof(GestionDepartamentosContext))]
    [Migration("20220511015304_VisitasUpdate")]
    partial class VisitasUpdate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("BoletaId");

                    b.HasIndex("DepartamentoId");

                    b.HasIndex("UsuarioId");

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

                    b.Property<bool>("Eliminado")
                        .HasColumnType("bit");

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

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("DepartamentoId");

                    b.HasIndex("UsuarioId");

                    b.ToTable("Departamento");
                });

            modelBuilder.Entity("AppDepa.Dominio.HistorialIncidencia", b =>
                {
                    b.Property<int>("HistorialIncidenciaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("DepartamentoId")
                        .HasColumnType("int");

                    b.Property<string>("DescripcionIncidencia")
                        .HasColumnType("varchar(300)");

                    b.Property<int>("EstadoIncidenciaId")
                        .HasColumnType("int");

                    b.Property<DateTime>("FechaIncidencia")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("FechaRegistro")
                        .HasColumnType("datetime2");

                    b.Property<int>("IncidenciaId")
                        .HasColumnType("int");

                    b.Property<int>("TipoIncidenciaId")
                        .HasColumnType("int");

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("HistorialIncidenciaId");

                    b.HasIndex("DepartamentoId");

                    b.HasIndex("IncidenciaId");

                    b.HasIndex("UsuarioId");

                    b.ToTable("HistorialIncidencia");
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

                    b.Property<bool>("Eliminado")
                        .HasColumnType("bit");

                    b.Property<int>("EstadoIncidenciaId")
                        .HasColumnType("int");

                    b.Property<DateTime>("FechaIncidencia")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("FechaRegistro")
                        .HasColumnType("datetime2");

                    b.Property<int>("TipoIncidenciaId")
                        .HasColumnType("int");

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("IncidenciaId");

                    b.HasIndex("DepartamentoId");

                    b.HasIndex("UsuarioId");

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

                    b.Property<bool>("Eliminado")
                        .HasColumnType("bit");

                    b.Property<int>("EspecieId")
                        .HasColumnType("int");

                    b.Property<DateTime>("FechaRegistro")
                        .HasColumnType("datetime2");

                    b.Property<string>("NombreMascota")
                        .HasColumnType("varchar(45)");

                    b.Property<string>("Sexo")
                        .HasColumnType("char(1)");

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("MascotaId");

                    b.HasIndex("DepartamentoId");

                    b.HasIndex("UsuarioId");

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

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("PagoServicioId");

                    b.HasIndex("BoletaId");

                    b.HasIndex("UsuarioId");

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

                    b.Property<bool>("Eliminado")
                        .HasColumnType("bit");

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

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("PersonaId");

                    b.HasIndex("DepartamentoId");

                    b.HasIndex("UsuarioId");

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

                    b.Property<string>("Comentario")
                        .HasColumnType("varchar(300)");

                    b.Property<DateTime>("FechaEntrada")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("FechaRegistro")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("FechaSalida")
                        .HasColumnType("datetime2");

                    b.Property<int>("PersonaId")
                        .HasColumnType("int");

                    b.Property<int>("PersonaVisitaId")
                        .HasColumnType("int");

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("VisitaId");

                    b.HasIndex("PersonaId");

                    b.HasIndex("PersonaVisitaId");

                    b.HasIndex("UsuarioId");

                    b.ToTable("Visita");
                });

            modelBuilder.Entity("AppDepa.Dominio.Boleta", b =>
                {
                    b.HasOne("AppDepa.Dominio.Departamento", "Departamento")
                        .WithMany("Boletas")
                        .HasForeignKey("DepartamentoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AppDepa.Dominio.Usuario", "Usuario")
                        .WithMany("Boletas")
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Departamento");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("AppDepa.Dominio.Departamento", b =>
                {
                    b.HasOne("AppDepa.Dominio.Usuario", "Usuario")
                        .WithMany("Departamentos")
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("AppDepa.Dominio.HistorialIncidencia", b =>
                {
                    b.HasOne("AppDepa.Dominio.Departamento", "Departamento")
                        .WithMany()
                        .HasForeignKey("DepartamentoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AppDepa.Dominio.Incidencia", "Incidencia")
                        .WithMany("HistorialIncidencias")
                        .HasForeignKey("IncidenciaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AppDepa.Dominio.Usuario", "Usuario")
                        .WithMany("HistorialIncidencias")
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Departamento");

                    b.Navigation("Incidencia");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("AppDepa.Dominio.Incidencia", b =>
                {
                    b.HasOne("AppDepa.Dominio.Departamento", "Departamento")
                        .WithMany("Incidencias")
                        .HasForeignKey("DepartamentoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AppDepa.Dominio.Usuario", "Usuario")
                        .WithMany("Incidencias")
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Departamento");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("AppDepa.Dominio.Mascota", b =>
                {
                    b.HasOne("AppDepa.Dominio.Departamento", "Departamento")
                        .WithMany("Mascotas")
                        .HasForeignKey("DepartamentoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AppDepa.Dominio.Usuario", "Usuario")
                        .WithMany("Mascotas")
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Departamento");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("AppDepa.Dominio.PagoServicio", b =>
                {
                    b.HasOne("AppDepa.Dominio.Boleta", "Boleta")
                        .WithMany()
                        .HasForeignKey("BoletaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AppDepa.Dominio.Usuario", "Usuario")
                        .WithMany("PagoServicios")
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Boleta");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("AppDepa.Dominio.Persona", b =>
                {
                    b.HasOne("AppDepa.Dominio.Departamento", "Departamento")
                        .WithMany("Personas")
                        .HasForeignKey("DepartamentoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AppDepa.Dominio.Usuario", "Usuario")
                        .WithMany("Persona")
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Departamento");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("AppDepa.Dominio.Visita", b =>
                {
                    b.HasOne("AppDepa.Dominio.Persona", "Persona")
                        .WithMany("Visitas")
                        .HasForeignKey("PersonaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AppDepa.Dominio.Persona", "PersonaVisita")
                        .WithMany("VisitasPersona")
                        .HasForeignKey("PersonaVisitaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AppDepa.Dominio.Usuario", "Usuario")
                        .WithMany("Visitas")
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Persona");

                    b.Navigation("PersonaVisita");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("AppDepa.Dominio.Departamento", b =>
                {
                    b.Navigation("Boletas");

                    b.Navigation("Incidencias");

                    b.Navigation("Mascotas");

                    b.Navigation("Personas");
                });

            modelBuilder.Entity("AppDepa.Dominio.Incidencia", b =>
                {
                    b.Navigation("HistorialIncidencias");
                });

            modelBuilder.Entity("AppDepa.Dominio.Persona", b =>
                {
                    b.Navigation("Visitas");

                    b.Navigation("VisitasPersona");
                });

            modelBuilder.Entity("AppDepa.Dominio.Usuario", b =>
                {
                    b.Navigation("Boletas");

                    b.Navigation("Departamentos");

                    b.Navigation("HistorialIncidencias");

                    b.Navigation("Incidencias");

                    b.Navigation("Mascotas");

                    b.Navigation("PagoServicios");

                    b.Navigation("Persona");

                    b.Navigation("Visitas");
                });
#pragma warning restore 612, 618
        }
    }
}
