using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;


namespace AppDepa.Dominio
{
    public class Persona
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PersonaId { get; set; }
        [Column(TypeName = "varchar(200)")]
        public string NombreCompleto { get; set; }
        [Column(TypeName = "varchar(20)")]
        public string Documento { get; set; }
        public int TipoDocumentoId { get; set; }
        [Column(TypeName = "varchar(15)")]
        public string Telefono { get; set; }
        public int EstadoId { get; set; }
        [Column(TypeName = "varchar(100)")]
        public string Correo { get; set; }
        [Column(TypeName = "char(1)")]
        public string Sexo { get; set; }
        public int TipoPersonaId { get; set; }
        public DateTime FechaRegistro { get; set; }
        [Column(TypeName = "bit")]
        public bool Eliminado { get; set; }
        // Relación con Departamentos
        public int DepartamentoId { get; set; }
        public Departamento Departamento { get; set; }
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }

        public ICollection<Visita> Visitas { get; set; }
    }
}

