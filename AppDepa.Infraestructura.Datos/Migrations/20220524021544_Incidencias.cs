using Microsoft.EntityFrameworkCore.Migrations;

namespace AppDepa.Infraestructura.Datos.Migrations
{
    public partial class Incidencias : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_HistorialIncidencia",
                table: "HistorialIncidencia");

            migrationBuilder.AddColumn<int>(
                name: "PersonaId",
                table: "Incidencia",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PersonaId",
                table: "HistorialIncidencia",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_HistorialIncidencia",
                table: "HistorialIncidencia",
                columns: new[] { "HistorialIncidenciaId", "IncidenciaId" });

            migrationBuilder.CreateIndex(
                name: "IX_Incidencia_PersonaId",
                table: "Incidencia",
                column: "PersonaId");

            migrationBuilder.CreateIndex(
                name: "IX_HistorialIncidencia_PersonaId",
                table: "HistorialIncidencia",
                column: "PersonaId");

            migrationBuilder.AddForeignKey(
                name: "FK_HistorialIncidencia_Persona_PersonaId",
                table: "HistorialIncidencia",
                column: "PersonaId",
                principalTable: "Persona",
                principalColumn: "PersonaId",
                onDelete: ReferentialAction.Restrict,
                onUpdate: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Incidencia_Persona_PersonaId",
                table: "Incidencia",
                column: "PersonaId",
                principalTable: "Persona",
                principalColumn: "PersonaId",
                onDelete: ReferentialAction.Restrict,
                onUpdate: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HistorialIncidencia_Persona_PersonaId",
                table: "HistorialIncidencia");

            migrationBuilder.DropForeignKey(
                name: "FK_Incidencia_Persona_PersonaId",
                table: "Incidencia");

            migrationBuilder.DropIndex(
                name: "IX_Incidencia_PersonaId",
                table: "Incidencia");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HistorialIncidencia",
                table: "HistorialIncidencia");

            migrationBuilder.DropIndex(
                name: "IX_HistorialIncidencia_PersonaId",
                table: "HistorialIncidencia");

            migrationBuilder.DropColumn(
                name: "PersonaId",
                table: "Incidencia");

            migrationBuilder.DropColumn(
                name: "PersonaId",
                table: "HistorialIncidencia");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HistorialIncidencia",
                table: "HistorialIncidencia",
                column: "HistorialIncidenciaId");
        }
    }
}
