using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Dominio
{
    public class Usuario
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]        
        public int UsuarioId { get; set; }
        [Column(TypeName ="varchar(35)")]
        public string UserName { get; set; }
        [Column(TypeName = "varchar(80)")]
        public string NombreCompleto { get; set; }
        [Column(TypeName = "varchar(45)")]
        public string Email { get; set; }
        [Column(TypeName = "varchar(35)")]
        public string Password { get; set; }
        public byte[] FotoPerfil { get; set; }
<<<<<<< HEAD
<<<<<<< HEAD
        public DateTime FechaRegistro { get; set; }   
=======
        public DateTime FechaRegistro { get; set; }
>>>>>>> origin/master
=======
        public DateTime FechaRegistro { get; set; }   
>>>>>>> 5558805ee5404d9bfe7cccb5fd05f525c27292be
    }
}
