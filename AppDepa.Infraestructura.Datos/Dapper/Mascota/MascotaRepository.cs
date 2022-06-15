using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.Datos.Dapper.Mascota
{
    public class MascotaRepository : IMascota
    {
        private readonly IFactoryConnection factoryConnection;
        public MascotaRepository(IFactoryConnection _factoryConnection)
        {
            this.factoryConnection = _factoryConnection;
        }

        public async Task<IEnumerable<MascotaDto>> ListarMascota(int departamentoId, int especieId, int eliminado)
        {
            IEnumerable<MascotaDto> listado = null;
            string sp = "USP_ListarMascotas";
            try
            {
                var connection = factoryConnection.GetConnection();
                var dp = new DynamicParameters();
                dp.Add("@DepartamentoId", departamentoId, DbType.Int32, ParameterDirection.Input);
                dp.Add("@EspecieId", especieId, DbType.Int32, ParameterDirection.Input);
                dp.Add("@Eliminado", eliminado, DbType.Int32, ParameterDirection.Input);
                listado = await connection.QueryAsync<MascotaDto>(sp, dp, commandType: CommandType.StoredProcedure);
            }
            catch (Exception)
            {
                throw new Exception("Error al consultar Mascotas");
            }
            finally
            {
                factoryConnection.CloseConnection();
            }
            return listado;
        }
    }
}
