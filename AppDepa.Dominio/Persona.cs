using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace AppDepa.Dominio
{
    public class Persona
    {
<<<<<<< HEAD:AppDepa.Dominio/Persona.cs
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PersonaId { get; set; }
=======
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]        
        public int PropietarioId { get; set; }
>>>>>>> origin/master:AppDepa.Dominio/Propietario.cs
        [Column(TypeName = "varchar(200)")]
        public string NombreCompleto { get; set; }
        [Column(TypeName = "varchar(20)")]
        public string Documento { get; set; }
        public int TipoDocumentoId { get; set; }
        [Column(TypeName = "varchar(15)")]
        public string Telefono { get; set; }
        public int EstadoPersonaId { get; set; }
        [Column(TypeName = "varchar(100)")]
        public string Correo { get; set; }
<<<<<<< HEAD:AppDepa.Dominio/Persona.cs
        [Column(TypeName = "char(1)")]
        public string Sexo { get; set; }
        public int TipoPersonaId { get; set; }
=======
       
>>>>>>> origin/master:AppDepa.Dominio/Propietario.cs
        public DateTime FechaRegistro { get; set; }

        // Relación con Departamentos
        public int DepartamentoId { get; set; }
        public Departamento Departamento { get; set; }
    }
}
