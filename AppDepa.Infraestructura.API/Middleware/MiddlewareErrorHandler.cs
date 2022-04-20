using AppDepa.Aplicaciones.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Net;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.API.Middleware
{
    public class MiddlewareErrorHandler
    {
        private readonly RequestDelegate next;
        private readonly ILogger<MiddlewareErrorHandler> logger;
        public MiddlewareErrorHandler(RequestDelegate _next, ILogger<MiddlewareErrorHandler> _logger)
        {
            this.next = _next;
            this.logger = _logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await AsyncErrorHandler(context, ex, logger);
            }
        }
        private async Task AsyncErrorHandler(HttpContext context, Exception ex, ILogger<MiddlewareErrorHandler> logger)
        {
            object errors = null;
            switch (ex)
            {
                case ExceptionHandler me:
                    logger.LogError(ex, "Clase ExceptionHandler");
                    errors = me.Errores;
                    context.Response.StatusCode = (int)me.Codigo;
                    break;
                case Exception e:
                    logger.LogError(ex, "Error de servidor");
                    errors = string.IsNullOrWhiteSpace(e.Message) ? "Error" : e.Message;
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    break;
            }
            context.Response.ContentType = "application/json";
            if (errors != null)
            {
                var result = JsonConvert.SerializeObject(new { errors });
                await context.Response.WriteAsync(result);
            }
        }
    }
}
