using AppDepa.Dominio;
using AppDepa.Infraestructura.Datos.Context;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AppDepa.Aplicaciones.Utils
{
    public class Utils : IUtils
    {
        public DateTime ObtenerFecha()
        {
            var fecha = DateTime.Now;
            return new DateTime(fecha.Year, fecha.Month, fecha.Day,
                        fecha.Hour, fecha.Minute, fecha.Second);
        }

        public string GenerarCodigoAleatorio(int longitud)
        {
            Random random = new Random();
            const string characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(characters, longitud)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        public DateTime ObtenerUltimoDiaFecha(DateTime fechaInicial)
        {
            return new DateTime(fechaInicial.Year, fechaInicial.Month, DateTime.DaysInMonth(fechaInicial.Year, fechaInicial.Month));
        }
    }
}
