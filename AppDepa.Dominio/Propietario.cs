﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Dominio
{
    public class Propietario
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PropietarioId { get; set; }
        [Column(TypeName = "varchar(200)")]
        public string Titular { get; set; }
        [Column(TypeName = "varchar(20)")]
        public string Documento { get; set; }
        public int TipoDocumentoId { get; set; }
        [Column(TypeName = "varchar(15)")]
        public string Telefono { get; set; }
        public int EstadoPropietarioId { get; set; }
        [Column(TypeName = "varchar(100)")]
        public string Correo { get; set; }

        public int CantidadFamiliares { get; set; }
        public int CantidadMascotas { get; set; }
        public int CantidadPosibleVisita { get; set; }
        public DateTime FechaRegistro { get; set; }
    }
}
