const Markers = require("./markers");

class Sockets {
  constructor(io) {
    this.io = io;
    this.markers = new Markers();
    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      this.socket.on("marker-online");
    });
  }
}

module.exports = Sockets;
