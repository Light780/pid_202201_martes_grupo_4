using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.Datos.Dapper.HistorialIncidencia
{
    public class HistorialIncidenciaRepository : IHistorialIncidencias
    {
        private readonly IFactoryConnection factoryConnection;
        public HistorialIncidenciaRepository(IFactoryConnection _factoryConnection)
        {
            this.factoryConnection = _factoryConnection;
        }
        public async Task<IEnumerable<HistorialIncidenciaDto>> ListarHistorialIndicencia(int departamentoId)
        {
            IEnumerable<HistorialIncidenciaDto> listado = null;
            string sp = "USP_ListarHistorialIncidencias";
            try
            {
                var connection = factoryConnection.GetConnection();
                var dp = new DynamicParameters();
                dp.Add("@DepartamentoId", departamentoId, DbType.Int32, ParameterDirection.Input);
                listado = await connection.QueryAsync<HistorialIncidenciaDto>(sp, dp, commandType: CommandType.StoredProcedure);
            }
            catch (Exception)
            {
                throw new Exception("Error al consultar Historial Incidencia");
            }
            finally
            {
                factoryConnection.CloseConnection();
            }
            return listado;
        }
    }
}
