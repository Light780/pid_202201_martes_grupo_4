using System;
using System.Collections.Generic;

using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Dominio
{
    public class Parametro
    {
        [Column(TypeName = "varchar(30)")]
        public string ParametroId { get; set; }
        public int ParamId { get; set; }
        [Column(TypeName = "varchar(300)")]
        public string Descripcion { get; set; }
        public int Estado { get; set; }
        public DateTime FechaRegistro { get; set; }
    }
}
