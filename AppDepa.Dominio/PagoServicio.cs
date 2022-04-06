using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Dominio
{
    public class PagoServicio
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PagoServicioId { get; set; }
        public int BoletaId { get; set; }
        public Boleta Boleta { get; set; }
        [Column(TypeName = "varchar(10)")]
        public string NroOperacion { get; set; }
        public DateTime FechaPago { get; set; }

    }
}
