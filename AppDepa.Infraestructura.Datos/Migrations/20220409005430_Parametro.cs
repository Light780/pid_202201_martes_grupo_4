using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AppDepa.Infraestructura.Datos.Migrations
{
    public partial class Parametro : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Parametros",
                columns: table => new
                {
                    ParametroId = table.Column<string>(type: "varchar(30)", nullable: true),
                    ParamId = table.Column<string>(type: "varchar(30)", nullable: true),
                    Descripcion = table.Column<string>(type: "varchar(300)", nullable: true),
                    Estado = table.Column<int>(type: "int", nullable: false),
                    FechaRegistro = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValue: "GETDATE()")
                },
                constraints: table =>
                {
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Parametros");
        }
    }
}
