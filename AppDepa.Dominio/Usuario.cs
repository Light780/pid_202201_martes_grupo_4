using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppDepa.Dominio
{
    public class Usuario
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UsuarioId { get; set; }
        [Column(TypeName = "varchar(35)")]
        public string UserName { get; set; }
        [Column(TypeName = "varchar(80)")]
        public string NombreCompleto { get; set; }
        [Column(TypeName = "varchar(45)")]
        public string Email { get; set; }
        [Column(TypeName = "varchar(35)")]
        public string Password { get; set; }
        public byte[] FotoPerfil { get; set; }
        public DateTime FechaRegistro { get; set; }
        public ICollection<Visita> Visitas { get; set; }
        public ICollection<Incidencia> Incidencias { get; set; }
        public ICollection<HistorialIncidencia> HistorialIncidencias { get; set; }
        public ICollection<Departamento> Departamentos { get; set; }
        public ICollection<Mascota> Mascotas { get; set; }
        public ICollection<Persona> Persona { get; set; }
        public ICollection<PagoServicio> PagoServicios { get; set; }
        public ICollection<Boleta> Boletas { get; set; }
    }
}
