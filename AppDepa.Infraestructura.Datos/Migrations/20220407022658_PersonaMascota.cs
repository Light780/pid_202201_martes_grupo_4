using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AppDepa.Infraestructura.Datos.Migrations
{
    public partial class PersonaMascota : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Propietario");

            migrationBuilder.DropColumn(
                name: "Direccion",
                table: "Departamento");

            migrationBuilder.DropColumn(
                name: "IndBano",
                table: "Departamento");

            migrationBuilder.CreateTable(
                name: "Mascota",
                columns: table => new
                {
                    MascotaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NombreMascota = table.Column<string>(type: "varchar(45)", nullable: true),
                    Sexo = table.Column<string>(type: "char(1)", nullable: true),
                    Raza = table.Column<string>(type: "varchar(45)", nullable: true),
                    FechaRegistro = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DepartamentoId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mascota", x => x.MascotaId);
                    table.ForeignKey(
                        name: "FK_Mascota_Departamento_DepartamentoId",
                        column: x => x.DepartamentoId,
                        principalTable: "Departamento",
                        principalColumn: "DepartamentoId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Persona",
                columns: table => new
                {
                    PersonaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NombreCompleto = table.Column<string>(type: "varchar(200)", nullable: true),
                    Documento = table.Column<string>(type: "varchar(20)", nullable: true),
                    TipoDocumentoId = table.Column<int>(type: "int", nullable: false),
                    Telefono = table.Column<string>(type: "varchar(15)", nullable: true),
                    EstadoPersonaId = table.Column<int>(type: "int", nullable: false),
                    Correo = table.Column<string>(type: "varchar(100)", nullable: true),
                    Sexo = table.Column<string>(type: "char(1)", nullable: true),
                    TipoPersonaId = table.Column<int>(type: "int", nullable: false),
                    FechaRegistro = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DepartamentoId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Persona", x => x.PersonaId);
                    table.ForeignKey(
                        name: "FK_Persona_Departamento_DepartamentoId",
                        column: x => x.DepartamentoId,
                        principalTable: "Departamento",
                        principalColumn: "DepartamentoId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Mascota_DepartamentoId",
                table: "Mascota",
                column: "DepartamentoId");

            migrationBuilder.CreateIndex(
                name: "IX_Persona_DepartamentoId",
                table: "Persona",
                column: "DepartamentoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Mascota");

            migrationBuilder.DropTable(
                name: "Persona");

            migrationBuilder.AddColumn<string>(
                name: "Direccion",
                table: "Departamento",
                type: "varchar(500)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IndBano",
                table: "Departamento",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "Propietario",
                columns: table => new
                {
                    PropietarioId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Correo = table.Column<string>(type: "varchar(100)", nullable: true),
                    Documento = table.Column<string>(type: "varchar(20)", nullable: true),
                    EstadoPropietarioId = table.Column<int>(type: "int", nullable: false),
                    FechaRegistro = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Telefono = table.Column<string>(type: "varchar(15)", nullable: true),
                    TipoDocumentoId = table.Column<int>(type: "int", nullable: false),
                    Titular = table.Column<string>(type: "varchar(200)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Propietario", x => x.PropietarioId);
                });
        }
    }
}
