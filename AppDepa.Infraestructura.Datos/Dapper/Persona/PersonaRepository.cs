using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppDepa.Infraestructura.Datos.Dapper.Persona
{
    public class PersonaRepository : IPersona
    {
        private readonly IFactoryConnection factoryConnection;
        public PersonaRepository(IFactoryConnection _factoryConnection)
        {
            this.factoryConnection = _factoryConnection;
        }
        public async Task<IEnumerable<PersonaDto>> ListarPersona(int departamentoId, int tipoPersonaId, int eliminado)
        {
            IEnumerable<PersonaDto> listado = null;
            string sp = "USP_ListarPersonas";
            try
            {
                var connection = factoryConnection.GetConnection();
                var dp = new DynamicParameters();
                dp.Add("@DepartamentoId", departamentoId, DbType.Int32, ParameterDirection.Input);
                dp.Add("@TipoPersonaId", tipoPersonaId, DbType.Int32, ParameterDirection.Input);
                dp.Add("@Eliminado", eliminado, DbType.Int32, ParameterDirection.Input);
                listado = await connection.QueryAsync<PersonaDto>(sp, dp, commandType: CommandType.StoredProcedure);
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
