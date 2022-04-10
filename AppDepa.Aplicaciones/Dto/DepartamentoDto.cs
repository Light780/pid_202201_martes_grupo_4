using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Aplicaciones.Dto
{
    public class DepartamentoDto
    {
        public int DepartamentoId { get; set; }

        public string NroDepartamento { get; set; }
 
        public decimal Tamano { get; set; }
  
        // Primer parametro
        public string TipoDepa { get; set; }
        // Segundo parametro
        public string Estado { get; set; }

        public int CantidadHabitaciones { get; set; }

        public bool IndCocina { get; set; }
 
        public bool IndBalcon { get; set; }
 
        public bool IndLavanderia { get; set; }

        public bool IndPiscina { get; set; }
  
        public bool IndPatio { get; set; }
    }
}
