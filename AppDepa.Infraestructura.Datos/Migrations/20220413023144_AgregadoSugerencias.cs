using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AppDepa.Infraestructura.Datos.Migrations
{
    public partial class AgregadoSugerencias : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RazaId",
                table: "Mascota",
                newName: "EspecieId");

            migrationBuilder.RenameColumn(
                name: "EstadoId",
                table: "Incidencia",
                newName: "UsuarioId");

            migrationBuilder.AddColumn<DateTime>(
                name: "FechaRegistro",
                table: "Visita",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "UsuarioId",
                table: "Visita",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EstadoIncidenciaId",
                table: "Incidencia",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "FechaRegistro",
                table: "Incidencia",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "TipoIncidenciaId",
                table: "Incidencia",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "HistorialIncidencia",
                columns: table => new
                {
                    HistorialIncidenciaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IncidenciaId = table.Column<int>(type: "int", nullable: false),
                    DepartamentoId = table.Column<int>(type: "int", nullable: false),
                    TipoIncidenciaId = table.Column<int>(type: "int", nullable: false),
                    DescripcionIncidencia = table.Column<string>(type: "varchar(300)", nullable: true),
                    EstadoIncidenciaId = table.Column<int>(type: "int", nullable: false),
                    FechaIncidencia = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FechaRegistro = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UsuarioId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HistorialIncidencia", x => x.HistorialIncidenciaId);
                    table.ForeignKey(
                        name: "FK_HistorialIncidencia_Departamento_DepartamentoId",
                        column: x => x.DepartamentoId,
                        principalTable: "Departamento",
                        principalColumn: "DepartamentoId",
                        onDelete: ReferentialAction.NoAction,
                        onUpdate: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_HistorialIncidencia_Incidencia_IncidenciaId",
                        column: x => x.IncidenciaId,
                        principalTable: "Incidencia",
                        principalColumn: "IncidenciaId",
                        onDelete: ReferentialAction.NoAction,
                        onUpdate: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_HistorialIncidencia_Usuario_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuario",
                        principalColumn: "UsuarioId",
                        onDelete: ReferentialAction.NoAction,
                        onUpdate: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Visita_UsuarioId",
                table: "Visita",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Incidencia_UsuarioId",
                table: "Incidencia",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_HistorialIncidencia_DepartamentoId",
                table: "HistorialIncidencia",
                column: "DepartamentoId");

            migrationBuilder.CreateIndex(
                name: "IX_HistorialIncidencia_IncidenciaId",
                table: "HistorialIncidencia",
                column: "IncidenciaId");

            migrationBuilder.CreateIndex(
                name: "IX_HistorialIncidencia_UsuarioId",
                table: "HistorialIncidencia",
                column: "UsuarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Incidencia_Usuario_UsuarioId",
                table: "Incidencia",
                column: "UsuarioId",
                principalTable: "Usuario",
                principalColumn: "UsuarioId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Visita_Usuario_UsuarioId",
                table: "Visita",
                column: "UsuarioId",
                principalTable: "Usuario",
                principalColumn: "UsuarioId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Incidencia_Usuario_UsuarioId",
                table: "Incidencia");

            migrationBuilder.DropForeignKey(
                name: "FK_Visita_Usuario_UsuarioId",
                table: "Visita");

            migrationBuilder.DropTable(
                name: "HistorialIncidencia");

            migrationBuilder.DropIndex(
                name: "IX_Visita_UsuarioId",
                table: "Visita");

            migrationBuilder.DropIndex(
                name: "IX_Incidencia_UsuarioId",
                table: "Incidencia");

            migrationBuilder.DropColumn(
                name: "FechaRegistro",
                table: "Visita");

            migrationBuilder.DropColumn(
                name: "UsuarioId",
                table: "Visita");

            migrationBuilder.DropColumn(
                name: "EstadoIncidenciaId",
                table: "Incidencia");

            migrationBuilder.DropColumn(
                name: "FechaRegistro",
                table: "Incidencia");

            migrationBuilder.DropColumn(
                name: "TipoIncidenciaId",
                table: "Incidencia");

            migrationBuilder.RenameColumn(
                name: "EspecieId",
                table: "Mascota",
                newName: "RazaId");

            migrationBuilder.RenameColumn(
                name: "UsuarioId",
                table: "Incidencia",
                newName: "EstadoId");
        }
    }
}
