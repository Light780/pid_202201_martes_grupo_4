using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Dominio
{
    public class Propietario_Deta
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PropietarioId { get; set; }
        public int CantFamiliares { get; set; }
        public int CantMascotas { get; set; }
        public int CantPosibleVisita { get; set; }
        public DateTime FechaRegistro { get; set; }
    }
}
