using Microsoft.EntityFrameworkCore.Migrations;

namespace AppDepa.Infraestructura.Datos.Migrations
{
    public partial class MascotaCambioTipoRaza : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Raza",
                table: "Mascota");

            migrationBuilder.AddColumn<int>(
                name: "RazaId",
                table: "Mascota",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RazaId",
                table: "Mascota");

            migrationBuilder.AddColumn<string>(
                name: "Raza",
                table: "Mascota",
                type: "varchar(45)",
                nullable: true);
        }
    }
}
