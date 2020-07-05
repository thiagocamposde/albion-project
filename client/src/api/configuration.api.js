import request from "../util/request";

export const getTmdbApiConfiguration = async () => {
  try {
    return await request.get("/tmbd/configuration");
  } catch (err) {
    console.log(err.message);
  }
};
