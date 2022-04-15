using Microsoft.EntityFrameworkCore.Migrations;

namespace AppDepa.Infraestructura.Datos.Migrations
{
    public partial class QuitarRedundanciaEstado : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "EstadoPersonaId",
                table: "Persona",
                newName: "EstadoId");

            migrationBuilder.RenameColumn(
                name: "EstadoDepaId",
                table: "Departamento",
                newName: "EstadoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "EstadoId",
                table: "Persona",
                newName: "EstadoPersonaId");

            migrationBuilder.RenameColumn(
                name: "EstadoId",
                table: "Departamento",
                newName: "EstadoDepaId");
        }
    }
}
