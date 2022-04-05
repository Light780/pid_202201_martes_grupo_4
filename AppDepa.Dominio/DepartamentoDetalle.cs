using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Dominio
{
    public class DepartamentoDetalle
    {
        public int PropietarioId { get; set; }
        public int DepartamentoId { get; set; }
        public int CantidadHabitaciones { get; set; }
        public string IndCocina { get; set; }
        public string IndBano { get; set; }
        public string IndBalcon { get; set; }
        public string IndLavanderia { get; set; }
        public string IndPiscina { get; set; }
        public string IndPatio { get; set; }
        [Column(TypeName = "varchar(40)")]
        public string ParametroId { get; set; }
        // declarar public virtual Parametro Parametro { get; set; }
        public string FechaRegistro { get; set; }
    }
}
