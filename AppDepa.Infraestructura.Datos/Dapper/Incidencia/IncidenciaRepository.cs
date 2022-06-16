using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.Datos.Dapper.Incidencia
{
    public class IncidenciaRepository : IIncidencia
    {
        private readonly IFactoryConnection factoryConnection;
        public IncidenciaRepository(IFactoryConnection _factoryConnection)
        {
            this.factoryConnection = _factoryConnection;
        }
        public async Task<IEnumerable<IncidenciaDto>> ListarIncidencia(int departamentoId, int tipoIncidenciaId, int estadoIncidenciaId)
        {
            IEnumerable<IncidenciaDto> listado = null;
            string sp = "USP_ListarIncidencias";
            try
            {
                var connection = factoryConnection.GetConnection();
                var dp = new DynamicParameters();
                dp.Add("@DepartamentoId", departamentoId, DbType.Int32, ParameterDirection.Input);
                dp.Add("@TipoIncidenciaId", tipoIncidenciaId, DbType.Int32, ParameterDirection.Input);
                dp.Add("@EstadoIncidenciaId", estadoIncidenciaId, DbType.Int32, ParameterDirection.Input);
                listado = await connection.QueryAsync<IncidenciaDto>(sp, dp, commandType: CommandType.StoredProcedure);
            }
            catch (Exception)
            {
                throw new Exception("Error al consultar Incidencias");
            }
            finally
            {
                factoryConnection.CloseConnection();
            }
            return listado;
        }
    }
}
