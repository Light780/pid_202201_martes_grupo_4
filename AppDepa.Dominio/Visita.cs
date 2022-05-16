using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Dominio
{
    public class Visita
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VisitaId { get; set; }
        public int PersonaVisitaId { get; set; }
        public Persona PersonaVisita { get; set; }
        public int PersonaId { get; set; }
        public Persona Persona { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime FechaEntrada { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime? FechaSalida { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime FechaRegistro { get; set; }
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }
        [Column(TypeName = "varchar(300)")]
        public string Comentario { get; set; }
    }
}
