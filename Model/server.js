const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");



class Server {
  constructor() {
    //servidor express
    this.app = express();
    this.port = process.env.PORT;
    // servidor de socket
    this.server = http.createServer(this.app);
    //configuracion de socket
    this.io = socketio(this.server, {
      /* Configuracion */
    });
  }

  midelwares() {
    //desplegar directorio public
    this.app.use(express.static(path.resolve(__dirname, "../public")));
  }

  socketsConfig() {
    new Sockets(this.io);
  }

  execute() {
    //inicializar middlewares
    this.midelwares();

    //configure sockets
    this.socketsConfig();

    //inicializar socket
    this.server.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`);
    });
  }
}

module.exports = Server;
