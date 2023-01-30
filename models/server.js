const express = require('express');
const cors = require('cors');
const { transferRouter } = require('../routes/transfer.Router');
const { usersRouter } = require('../routes/users.router');
const { db } = require('../database/db');

// creamos una clase

class Server {
  constructor() {
    this.app = express();

    this.port = process.env.PORT || 4000;

    this.paths = {
      transfer: '/api/v1/transfer',
      user: '/api/v1/users',
    };

    this.database();

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.transfer, transferRouter);
    this.app.use(this.paths.user, usersRouter);
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(error => console.log(error));

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(err => console.log(err));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server is running on port', this.port);
    });
  }
}

// exportamos el servidor
module.exports = Server;
