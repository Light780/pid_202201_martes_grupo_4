using Microsoft.EntityFrameworkCore.Migrations;

namespace AppDepa.Infraestructura.Datos.Migrations
{
    public partial class RelacionesUsuario : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UsuarioId",
                table: "Persona",
                type: "int",
                nullable: true,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UsuarioId",
                table: "PagoServicio",
                type: "int",
                nullable: true,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UsuarioId",
                table: "Mascota",
                type: "int",
                nullable: true,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UsuarioId",
                table: "Departamento",
                type: "int",
                nullable: true,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UsuarioId",
                table: "Boleta",
                type: "int",
                nullable: true,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Persona_UsuarioId",
                table: "Persona",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_PagoServicio_UsuarioId",
                table: "PagoServicio",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Mascota_UsuarioId",
                table: "Mascota",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Departamento_UsuarioId",
                table: "Departamento",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Boleta_UsuarioId",
                table: "Boleta",
                column: "UsuarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Boleta_Usuario_UsuarioId",
                table: "Boleta",
                column: "UsuarioId",
                principalTable: "Usuario",
                principalColumn: "UsuarioId",
                onDelete: ReferentialAction.Restrict,
                onUpdate: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Departamento_Usuario_UsuarioId",
                table: "Departamento",
                column: "UsuarioId",
                principalTable: "Usuario",
                principalColumn: "UsuarioId",
                onDelete: ReferentialAction.Restrict,
                onUpdate: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Mascota_Usuario_UsuarioId",
                table: "Mascota",
                column: "UsuarioId",
                principalTable: "Usuario",
                principalColumn: "UsuarioId",
                onDelete: ReferentialAction.Restrict,
                onUpdate: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PagoServicio_Usuario_UsuarioId",
                table: "PagoServicio",
                column: "UsuarioId",
                principalTable: "Usuario",
                principalColumn: "UsuarioId",
                onDelete: ReferentialAction.Restrict,
                onUpdate: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Persona_Usuario_UsuarioId",
                table: "Persona",
                column: "UsuarioId",
                principalTable: "Usuario",
                principalColumn: "UsuarioId",
                onDelete: ReferentialAction.Restrict,
                onUpdate: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Boleta_Usuario_UsuarioId",
                table: "Boleta");

            migrationBuilder.DropForeignKey(
                name: "FK_Departamento_Usuario_UsuarioId",
                table: "Departamento");

            migrationBuilder.DropForeignKey(
                name: "FK_Mascota_Usuario_UsuarioId",
                table: "Mascota");

            migrationBuilder.DropForeignKey(
                name: "FK_PagoServicio_Usuario_UsuarioId",
                table: "PagoServicio");

            migrationBuilder.DropForeignKey(
                name: "FK_Persona_Usuario_UsuarioId",
                table: "Persona");

            migrationBuilder.DropIndex(
                name: "IX_Persona_UsuarioId",
                table: "Persona");

            migrationBuilder.DropIndex(
                name: "IX_PagoServicio_UsuarioId",
                table: "PagoServicio");

            migrationBuilder.DropIndex(
                name: "IX_Mascota_UsuarioId",
                table: "Mascota");

            migrationBuilder.DropIndex(
                name: "IX_Departamento_UsuarioId",
                table: "Departamento");

            migrationBuilder.DropIndex(
                name: "IX_Boleta_UsuarioId",
                table: "Boleta");

            migrationBuilder.DropColumn(
                name: "UsuarioId",
                table: "Persona");

            migrationBuilder.DropColumn(
                name: "UsuarioId",
                table: "PagoServicio");

            migrationBuilder.DropColumn(
                name: "UsuarioId",
                table: "Mascota");

            migrationBuilder.DropColumn(
                name: "UsuarioId",
                table: "Departamento");

            migrationBuilder.DropColumn(
                name: "UsuarioId",
                table: "Boleta");
        }
    }
}
