using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.Datos.Dapper.Boleta
{
    public class BoletaRepository : IBoleta
    {
        private readonly IFactoryConnection factoryConnection;
        public BoletaRepository(IFactoryConnection _factoryConnection)
        {
            this.factoryConnection = _factoryConnection;
        }
        public async Task<IEnumerable<BoletaDto>> ListarBoleta(string anio, int departamentoId, int estadoId)
        {
            IEnumerable<BoletaDto> listado = null;
            string sp = "USP_ListarBoletas";
            try
            {
                var connection = factoryConnection.GetConnection();
                var dp = new DynamicParameters();
                dp.Add("@Anio", anio == "1" ? "" : anio, DbType.String, ParameterDirection.Input, 4);
                dp.Add("@DepartamentoId", departamentoId, DbType.Int32, ParameterDirection.Input);
                dp.Add("@EstadoId", estadoId, DbType.Int32, ParameterDirection.Input);
                listado = await connection.QueryAsync<BoletaDto>(sp, dp, commandType: CommandType.StoredProcedure);
            }
            catch (Exception)
            {
                throw new Exception("Error al consultar Boletas");
            }
            finally
            {
                factoryConnection.CloseConnection();
            }
            return listado;
        }
    }
}
