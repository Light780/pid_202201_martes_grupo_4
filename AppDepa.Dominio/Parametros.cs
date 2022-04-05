using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Dominio
{
    public class Parametros
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Param { get; set; }
        [Column(TypeName = "varchar(200)")]
        public int codParametros { get; set; }
        public string Descripcion { get; set; }
        [Column(TypeName = "varchar(200)")]
        public int Estado { get; set; }
        [Column(TypeName = "char(1)")]
        public DateTime FechaRegistro { get; set; }
    }
}
