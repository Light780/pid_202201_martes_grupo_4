using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Dominio
{
    public class Departamento
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]        
        public int DepartamentoId { get; set; }
        [Column(TypeName = "varchar(15)")]
        public string NroDepartamento { get; set; }        
        public decimal Tamano { get; set; }
        [Column(TypeName = "varchar(500)")]
        public string Direccion { get; set; }
        public int TipoDepaId { get; set; }
        public int EstadoDepaId { get; set; }

        public int CantidadHabitaciones { get; set; }
        [Column(TypeName = "bit")]
        public bool IndCocina { get; set; }
        [Column(TypeName = "bit")]
        public bool IndBano { get; set; }
        [Column(TypeName = "bit")]
        public bool IndBalcon { get; set; }
        [Column(TypeName = "bit")]
        public bool IndLavanderia { get; set; }
        [Column(TypeName = "bit")]
        public bool IndPiscina { get; set; }
        [Column(TypeName = "bit")]
        public bool IndPatio { get; set; }

        public DateTime FechaRegistro { get; set; }
        public ICollection<Boleta> Boletas { get; set; }
        public ICollection<Incidencia> Incidencias { get; set; }
    }
}
