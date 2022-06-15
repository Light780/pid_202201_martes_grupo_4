using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.Datos.Dapper.Departamento
{
    public class DepartamentoRepository : IDepartamento
    {
        private readonly IFactoryConnection factoryConnection;
        public DepartamentoRepository(IFactoryConnection _factoryConnection)
        {
            this.factoryConnection = _factoryConnection;
        }

        public async Task<IEnumerable<DepartamentoDto>> ListarDepartamento(int tipoDepaId, int eliminado)
        {
            IEnumerable<DepartamentoDto> listado = null;
            string sp = "USP_ListarDepartamentos";
            try
            {
                var connection = factoryConnection.GetConnection();
                var dp = new DynamicParameters();
                dp.Add("@TipoDepaId", tipoDepaId, DbType.Int32, ParameterDirection.Input);
                dp.Add("@Eliminado", eliminado, DbType.Int32, ParameterDirection.Input);
                listado = await connection.QueryAsync<DepartamentoDto>(sp, dp, commandType: CommandType.StoredProcedure);
            }
            catch (Exception)
            {
                throw new Exception("Error al consultar Departamentos");
            }
            finally
            {
                factoryConnection.CloseConnection();
            }
            return listado;
        }
    }
}
