using Microsoft.EntityFrameworkCore.Migrations;

namespace AppDepa.Infraestructura.Datos.Migrations
{
    public partial class EdicionEntidades : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropPrimaryKey(
            //    name: "PK_Parametros",
            //    table: "Parametros");

            //migrationBuilder.DropColumn(
            //    name: "Nombre",
            //    table: "Parametros");

            //migrationBuilder.AlterColumn<int>(
            //    name: "ParamId",
            //    table: "Parametros",
            //    type: "int",
            //    nullable: false,
            //    defaultValue: 0,
            //    oldClrType: typeof(string),
            //    oldType: "varchar(200)",
            //    oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.AlterColumn<string>(
            //    name: "ParamId",
            //    table: "Parametros",
            //    type: "varchar(200)",
            //    nullable: true,
            //    oldClrType: typeof(int),
            //    oldType: "int");

            //migrationBuilder.AddColumn<string>(
            //    name: "Nombre",
            //    table: "Parametros",
            //    type: "varchar(100)",
            //    nullable: false,
            //    defaultValue: "");

            //migrationBuilder.AddPrimaryKey(
            //    name: "PK_Parametros",
            //    table: "Parametros",
            //    column: "ParametroId");
        }
    }
}
