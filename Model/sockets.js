class Sockets {
  constructor(io) {
    this.io = io;
    this.SocketsEvents();
  }

  SocketsEvents() {
    this.io.on("connection", (socket) => {
      socket.emit("mensaje-bienvenida", "Bienvenido al chat");
      socket.on("messages-from-client", (data) => {
        console.log( 'data en el socket', data);
        this.io.emit("messages-from-server", data);
      });
    });
  }
}

module.exports = Sockets;
