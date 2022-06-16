using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.Datos.Dapper.Visita
{
    public class VisitaRepository : IVisita
    {
        private readonly IFactoryConnection factoryConnection;
        public VisitaRepository(IFactoryConnection _factoryConnection)
        {
            this.factoryConnection = _factoryConnection;
        }
        public async Task<IEnumerable<VisitaDto>> ListarVisita(string nombreCompleto, string documento, int estadoId)
        {
            IEnumerable<VisitaDto> listado = null;
            string sp = "USP_ListarVisitas";
            try
            {
                var connection = factoryConnection.GetConnection();
                var dp = new DynamicParameters();
                dp.Add("@NombreCompleto", nombreCompleto ?? "", DbType.String, ParameterDirection.Input);
                dp.Add("@Documento", documento ?? "", DbType.String, ParameterDirection.Input);
                dp.Add("@EstadoId", estadoId, DbType.Int32, ParameterDirection.Input);
                listado = await connection.QueryAsync<VisitaDto>(sp, dp, commandType: CommandType.StoredProcedure);
            }
            catch (Exception)
            {
                throw new Exception("Error al consultar Visitas");
            }
            finally
            {
                factoryConnection.CloseConnection();
            }
            return listado;
        }
    }
}
