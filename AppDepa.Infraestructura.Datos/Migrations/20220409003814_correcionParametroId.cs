using Microsoft.EntityFrameworkCore.Migrations;

namespace AppDepa.Infraestructura.Datos.Migrations
{
    public partial class correcionParametroId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.AlterColumn<string>(
            //    name: "ParametroId",
            //    table: "Parametros",
            //    type: "varchar(30)",
            //    nullable: false,
            //    oldClrType: typeof(int),
            //    oldType: "int")
            //    .OldAnnotation("SqlServer:Identity", "1, 1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.AlterColumn<int>(
            //    name: "ParametroId",
            //    table: "Parametros",
            //    type: "int",
            //    nullable: false,
            //    oldClrType: typeof(string),
            //    oldType: "varchar(30)")
            //    .Annotation("SqlServer:Identity", "1, 1");
        }
    }
}
