using System;
using System.ComponentModel.DataAnnotations.Schema;

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
        public int EspecieId { get; set; }
        public DateTime FechaRegistro { get; set; }
        [Column(TypeName = "bit")]
        public bool Eliminado { get; set; }
        // Relación con Departamentos
        public int DepartamentoId { get; set; }
        public Departamento Departamento { get; set; }
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }
    }
}

