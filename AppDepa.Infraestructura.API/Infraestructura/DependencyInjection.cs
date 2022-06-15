using AppDepa.Aplicaciones.User;
using AppDepa.Aplicaciones.Utils;
using AppDepa.Infraestructura.Datos.Context;
using AppDepa.Infraestructura.Datos.Dapper;
using AppDepa.Infraestructura.Datos.Dapper.Boleta;
using AppDepa.Infraestructura.Datos.Dapper.Departamento;
using AppDepa.Infraestructura.Datos.Dapper.Mascota;
using AppDepa.Infraestructura.Datos.Dapper.Persona;
using AppDepa.Infraestructura.Datos.Dapper.Visita;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AppDepa.Infraestructura.API.Infraestructura
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfraestructure(this IServiceCollection services, IConfiguration configuracion)
        {
            services.AddCors(opt => opt.AddPolicy("corsApp", builder =>
            {
                builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200").AllowCredentials();
            }));
            services.AddDistributedMemoryCache();
            services.AddSession(options =>
            {
                options.Cookie.SameSite = SameSiteMode.None;
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            });
            services.AddMediatR(typeof(Registrar.Handler).Assembly);
            services.AddDbContext<GestionDepartamentosContext>(options =>
                options.UseSqlServer(configuracion.GetConnectionString("DefaultConnection"))
            );
            services.Configure<ConexionConfiguracion>(configuracion.GetSection("ConnectionStrings"));
            services.AddTransient<IFactoryConnection, FactoryConnection>();
            services.AddScoped<IUtils, Utils>();
            services.AddOptions();

            //Dapper
            services.AddScoped<IBoleta, BoletaRepository>();
            services.AddScoped<IPersona, PersonaRepository>();
            services.AddScoped<IDepartamento, DepartamentoRepository>();
            services.AddScoped<IMascota, MascotaRepository>();
            services.AddScoped<IVisita, VisitaRepository>();
            return services;
        }
    }
}
