using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.Datos.Dapper.PagoServicio
{
    public class PagoServicioRepository : IPagoServicio
    {
        private readonly IFactoryConnection factoryConnection;
        public PagoServicioRepository(IFactoryConnection _factoryConnection)
        {
            this.factoryConnection = _factoryConnection;
        }
        public async Task<IEnumerable<PagoServicioDto>> ListarPagos(int boletaId)
        {
            IEnumerable<PagoServicioDto> listado = null;
            string sp = "USP_ListarPagos";
            try
            {
                var connection = factoryConnection.GetConnection();
                var dp = new DynamicParameters();
                dp.Add("@BoletaId", boletaId, DbType.Int32, ParameterDirection.Input);
                listado = await connection.QueryAsync<PagoServicioDto>(sp, dp, commandType: CommandType.StoredProcedure);
            }
            catch (Exception)
            {
                throw new Exception("Error al consultar Pagos");
            }
            finally
            {
                factoryConnection.CloseConnection();
            }
            return listado;
        }
    }
}
