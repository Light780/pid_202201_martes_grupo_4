using System;
using AppDepa.Infraestructura.Datos.Contextos;

namespace AppDepa.Infraestructura.Datos
{
    class Program
    {
        static void Main(string[] args)
        {
            /* Crear la DB */
            Console.WriteLine("Creando la DB si no existe...");
            VentaContexto db = new VentaContexto();
            db.Database.EnsureCreated();
            Console.WriteLine("Creado!!!");
            Console.ReadKey();
        }
    }
}
