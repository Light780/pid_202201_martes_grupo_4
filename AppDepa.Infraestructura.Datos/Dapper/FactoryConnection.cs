using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.Datos.Dapper
{
    public class FactoryConnection : IFactoryConnection
    {
        private IDbConnection connection;
        private readonly IOptions<ConexionConfiguracion> options;
        public FactoryConnection(IOptions<ConexionConfiguracion> _options)
        {
            this.options = _options;
        }
        public void CloseConnection()
        {
            if (connection != null && connection.State == ConnectionState.Open)
                connection.Close();
        }

        public IDbConnection GetConnection()
        {
            if (connection == null)
                connection = new SqlConnection(options.Value.DefaultConnection);
            if(connection.State != ConnectionState.Open)
                connection.Open();
            return connection;
        }
    }
}
