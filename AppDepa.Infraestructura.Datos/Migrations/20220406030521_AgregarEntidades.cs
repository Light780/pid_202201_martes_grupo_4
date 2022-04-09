using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AppDepa.Infraestructura.Datos.Migrations
{
    public partial class AgregarEntidades : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Departamento",
                columns: table => new
                {
                    DepartamentoId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NroDepartamento = table.Column<string>(type: "varchar(15)", nullable: true),
                    Tamano = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Direccion = table.Column<string>(type: "varchar(500)", nullable: true),
                    TipoDepaId = table.Column<int>(type: "int", nullable: false),
                    EstadoDepaId = table.Column<int>(type: "int", nullable: false),
                    CantidadHabitaciones = table.Column<int>(type: "int", nullable: false),
                    IndCocina = table.Column<bool>(type: "bit", nullable: false),
                    IndBano = table.Column<bool>(type: "bit", nullable: false),
                    IndBalcon = table.Column<bool>(type: "bit", nullable: false),
                    IndLavanderia = table.Column<bool>(type: "bit", nullable: false),
                    IndPiscina = table.Column<bool>(type: "bit", nullable: false),
                    IndPatio = table.Column<bool>(type: "bit", nullable: false),
                    FechaRegistro = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departamento", x => x.DepartamentoId);
                });

            //migrationBuilder.CreateTable(
            //    name: "Parametros",
            //    columns: table => new
            //    {
            //        ParametroId = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        ParamId = table.Column<string>(type: "varchar(200)", nullable: true),
            //        Nombre = table.Column<string>(type: "varchar(100)", nullable: false),
            //        Descripcion = table.Column<string>(type: "varchar(300)", nullable: true),
            //        Estado = table.Column<int>(type: "int", nullable: false),
            //        FechaRegistro = table.Column<DateTime>(type: "datetime2", nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Parametros", x => x.ParametroId);
            //    });

            migrationBuilder.CreateTable(
                name: "Propietario",
                columns: table => new
                {
                    PropietarioId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Titular = table.Column<string>(type: "varchar(200)", nullable: true),
                    Documento = table.Column<string>(type: "varchar(20)", nullable: true),
                    TipoDocumentoId = table.Column<int>(type: "int", nullable: false),
                    Telefono = table.Column<string>(type: "varchar(15)", nullable: true),
                    EstadoPropietarioId = table.Column<int>(type: "int", nullable: false),
                    Correo = table.Column<string>(type: "varchar(100)", nullable: true),
                    FechaRegistro = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Propietario", x => x.PropietarioId);
                });

            migrationBuilder.CreateTable(
                name: "Boleta",
                columns: table => new
                {
                    BoletaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ServicioId = table.Column<int>(type: "int", nullable: false),
                    DepartamentoId = table.Column<int>(type: "int", nullable: false),
                    Periodo = table.Column<string>(type: "varchar(6)", nullable: true),
                    CodigoPago = table.Column<string>(type: "varchar(8)", nullable: true),
                    Monto = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Boleta", x => x.BoletaId);
                    table.ForeignKey(
                        name: "FK_Boleta_Departamento_DepartamentoId",
                        column: x => x.DepartamentoId,
                        principalTable: "Departamento",
                        principalColumn: "DepartamentoId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Incidencia",
                columns: table => new
                {
                    IncidenciaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DepartamentoId = table.Column<int>(type: "int", nullable: false),
                    DescripcionIncidencia = table.Column<string>(type: "varchar(300)", nullable: true),
                    EstadoId = table.Column<int>(type: "int", nullable: false),
                    FechaIncidencia = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Incidencia", x => x.IncidenciaId);
                    table.ForeignKey(
                        name: "FK_Incidencia_Departamento_DepartamentoId",
                        column: x => x.DepartamentoId,
                        principalTable: "Departamento",
                        principalColumn: "DepartamentoId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PagoServicio",
                columns: table => new
                {
                    PagoServicioId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BoletaId = table.Column<int>(type: "int", nullable: false),
                    NroOperacion = table.Column<string>(type: "varchar(10)", nullable: true),
                    FechaPago = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PagoServicio", x => x.PagoServicioId);
                    table.ForeignKey(
                        name: "FK_PagoServicio_Boleta_BoletaId",
                        column: x => x.BoletaId,
                        principalTable: "Boleta",
                        principalColumn: "BoletaId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Boleta_DepartamentoId",
                table: "Boleta",
                column: "DepartamentoId");

            migrationBuilder.CreateIndex(
                name: "IX_Incidencia_DepartamentoId",
                table: "Incidencia",
                column: "DepartamentoId");

            migrationBuilder.CreateIndex(
                name: "IX_PagoServicio_BoletaId",
                table: "PagoServicio",
                column: "BoletaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Incidencia");

            migrationBuilder.DropTable(
                name: "PagoServicio");

            //migrationBuilder.DropTable(
            //    name: "Parametros");

            migrationBuilder.DropTable(
                name: "Propietario");

            migrationBuilder.DropTable(
                name: "Boleta");

            migrationBuilder.DropTable(
                name: "Departamento");
        }
    }
}
