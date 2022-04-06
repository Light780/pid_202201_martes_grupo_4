using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Dominio
{
    public class Incidencia
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]        
        public int IncidenciaId { get; set; }
        public int DepartamentoId { get; set; }
        public Departamento Departamento { get; set; }
        [Column(TypeName = "varchar(300)")]
        public string DescripcionIncidencia { get; set; }
        public int EstadoId { get; set; }
        public DateTime FechaIncidencia { get; set; }
    }
}
