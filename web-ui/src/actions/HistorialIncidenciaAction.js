import HttpClient from "../services/HttpClient";

export const listarHistorialIncidencia = (incidencia) => {
  return new Promise((resolve, reject) => {
    HttpClient.get(`HistorialIncidencia/consulta`, {
      params: {
        incidenciaId: incidencia,
      },
    })
      .then((response) => {
        resolve(response);
      })
      .catch((e) => resolve(e, reject));
  });
};
