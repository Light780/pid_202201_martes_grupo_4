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
    [Migration("20220402022258_CambioPK")]
    partial class CambioPK
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.15")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

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
#pragma warning restore 612, 618
        }
    }
}
