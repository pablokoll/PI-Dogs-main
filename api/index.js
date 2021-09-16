const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const axios = require("axios");
const { Temperament } = require("./src/db.js");
const { PORT } = process.env;
const { BASE_URL } = require("./src/utils/constants");

conn.sync().then(async () => {
  const temperDB = await Temperament.findAll()
  if (temperDB.length === 0) {
    let temps = new Set();
    const apiBreedTemperamentRes = await axios.get(BASE_URL);

    apiBreedTemperamentRes.data?.forEach((breed) => {
      let temperaments = breed.temperament?.split(", ");
      temperaments?.forEach((temperament) => temps.add(temperament));
    });

    Temperament.bulkCreate([...temps].map((temperament) => ({ name: temperament })));
    console.log("Base de datos de temperamentos creada");
  }

  server.listen(PORT, () => {
    console.log("%s listening at 3001");
  });
});
