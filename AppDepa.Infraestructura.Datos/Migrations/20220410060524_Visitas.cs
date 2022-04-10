using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AppDepa.Infraestructura.Datos.Migrations
{
    public partial class Visitas : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Parametros");

            migrationBuilder.AlterColumn<string>(
                name: "NroDepartamento",
                table: "Departamento",
                type: "varchar(3)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(15)",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "Parametro",
                columns: table => new
                {
                    ParametroId = table.Column<string>(type: "varchar(30)", nullable: true),
                    ParamId = table.Column<int>(type: "int", nullable: false),
                    Descripcion = table.Column<string>(type: "varchar(300)", nullable: true),
                    Estado = table.Column<int>(type: "int", nullable: false),
                    FechaRegistro = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "Visita",
                columns: table => new
                {
                    VisitaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PersonaId = table.Column<int>(type: "int", nullable: false),
                    FechaEntrada = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FechaSalida = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Visita", x => x.VisitaId);
                    table.ForeignKey(
                        name: "FK_Visita_Persona_PersonaId",
                        column: x => x.PersonaId,
                        principalTable: "Persona",
                        principalColumn: "PersonaId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Visita_PersonaId",
                table: "Visita",
                column: "PersonaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Parametro");

            migrationBuilder.DropTable(
                name: "Visita");

            migrationBuilder.AlterColumn<string>(
                name: "NroDepartamento",
                table: "Departamento",
                type: "varchar(15)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(3)",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "Parametros",
                columns: table => new
                {
                    Descripcion = table.Column<string>(type: "varchar(300)", nullable: true),
                    Estado = table.Column<int>(type: "int", nullable: false),
                    FechaRegistro = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ParamId = table.Column<int>(type: "int", nullable: false),
                    ParametroId = table.Column<string>(type: "varchar(30)", nullable: true)
                },
                constraints: table =>
                {
                });
        }
    }
}
