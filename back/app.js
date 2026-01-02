const express = require ('express');
const axios = require ('axios');
const app = express();
const cors = require ('cors');
const PORT = 3000;
const apiKey = `https://rickandmortyapi.com/api/character`;

app.use(cors());

app.get('/characters', async (req, res) => {
    const { page = 1, name } = req.query;
    let url = `${apiKey}`;

    if (name) {
      url = `${apiKey}/?name=${name}`;
    }

    try {
      const response = await axios.get(url);

      const character = response.data.results.map(({ name, status, species, gender, origin, image }) => {
        return {
        name,
        status,
        species,
        gender,
        origin: origin.name,
        image
      };
    });       
      res.json(character);
    }catch(error) {
      res.status(404).json({Error: 'Personaje no Encontrado'})
    }
});


app.listen(PORT, () => {
  console.log(`El servidor esta escuchando en el puerto ${PORT}`);
});