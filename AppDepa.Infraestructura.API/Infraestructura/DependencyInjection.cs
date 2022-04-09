using AppDepa.Aplicaciones.User;
using AppDepa.Infraestructura.Datos.Context;
using AppDepa.Infraestructura.Datos.Dapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection.Extensions;
using AppDepa.Aplicaciones.Utils;

namespace AppDepa.Infraestructura.API.Infraestructura
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfraestructure(this IServiceCollection services, IConfiguration configuracion)
        {                        
            services.AddMediatR(typeof(Registrar.Handler).Assembly);
            services.AddDbContext<GestionDepartamentosContext>(options =>
                options.UseSqlServer(configuracion.GetConnectionString("DefaultConnection"))
            );            
            services.Configure<ConexionConfiguracion>(configuracion.GetSection("ConnectionStrings"));
            services.AddTransient<IFactoryConnection, FactoryConnection>();
            services.AddScoped<IUtils, Utils>();
            services.AddOptions();
            services.AddCors(opt => opt.AddPolicy("corsApp", builder => {
                builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
            }));

            return services;
        }
    }
}
