using AppDepa.Aplicaciones.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
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
            object errores = null;
            switch (ex)
            {
                case ExceptionHandler me:
                    logger.LogError(ex, "Clase ExceptionHandler");
                    errores = me.Errores;
                    context.Response.StatusCode = (int)me.Codigo;
                    break;
                case Exception e:
                    logger.LogError(ex, "Error de servidor");
                    errores = string.IsNullOrWhiteSpace(e.Message) ? "Error" : e.Message;
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    break;
            }
            context.Response.ContentType = "application/json";
            if (errores != null)
            {
                var result = JsonConvert.SerializeObject(new { errores });
                await context.Response.WriteAsync(result);
            }
        }
    }
}
