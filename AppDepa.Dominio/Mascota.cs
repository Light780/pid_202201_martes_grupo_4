using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Dominio
{
    public class Mascota
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MascotaId { get; set; }
        [Column(TypeName = "varchar(45)")]
        public string NombreMascota { get; set; }
        [Column(TypeName = "char(1)")]
        public string Sexo { get; set; }
        [Column(TypeName = "varchar(45)")]
        public string Raza { get; set; }
        public DateTime FechaRegistro { get; set; }

        // Relación con Departamentos
        public int DepartamentoId { get; set; }
        public Departamento Departamento { get; set; }
    }
}
