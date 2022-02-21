const path = require('path');
/*const fs = require('fs');*/
require('dotenv').config({ path: 'variables.env' });
const express = require('express');
/*const multer = require('multer');*/
const routes = require('./routes');
/*const { v4: uuidv4 } = require('uuid');*/

const cors = require('cors');

//const { PORT } = process.env;

const staticPath = path.resolve(__dirname, 'static');

const app = express();
app.use(express.json());
app.use(express.static(staticPath));

const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
  // Revisar si la petición viene de un servidor en la lista blanca
  origin: (origin, callback) => {
    //console.log(origin);
    const existe = whitelist.some((dominio) => dominio === origin);
    if (existe) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.use('/', routes());

app.use(express.static('uploads'));

// Definir un dominio(s) para recibir las peticiones

/*const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const { userId } = req.params;
      const folder = path.join(__dirname, `images/${userId}/`);
      fs.mkdirSync(folder, { recursive: true });

      cb(null, folder);
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4() + path.extname(file.originalname));
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});*/

app.use(async (err, req, res, next) => {
  const status = err.isJoi ? 400 : err.status || 500;
  res.status(status);
  res.send({ resultado: 'ERROR', error: err.message });
});

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

app.listen(port, host, () => console.log(`Escuchando en el puerto ${port}`));

//Probando
