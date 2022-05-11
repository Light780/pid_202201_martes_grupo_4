using Microsoft.EntityFrameworkCore.Migrations;

namespace AppDepa.Infraestructura.Datos.Migrations
{
    public partial class VisitasUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Comentario",
                table: "Visita",
                type: "varchar(300)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PersonaVisitaId",
                table: "Visita",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Visita_PersonaVisitaId",
                table: "Visita",
                column: "PersonaVisitaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Visita_Persona_PersonaVisitaId",
                table: "Visita",
                column: "PersonaVisitaId",
                principalTable: "Persona",
                principalColumn: "PersonaId",
                onDelete: ReferentialAction.Restrict,
                onUpdate: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Visita_Persona_PersonaVisitaId",
                table: "Visita");

            migrationBuilder.DropIndex(
                name: "IX_Visita_PersonaVisitaId",
                table: "Visita");

            migrationBuilder.DropColumn(
                name: "Comentario",
                table: "Visita");

            migrationBuilder.DropColumn(
                name: "PersonaVisitaId",
                table: "Visita");
        }
    }
}
