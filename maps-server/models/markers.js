class Markers {
  constructor() {
    this.onlines = {};
  }

  addMarker(marker) {
    this.onlines[marker.id] = marker;
    return marker;
  }

  removeMarker(marker) {
    delete this.onlines[marker.id];
  }

  updateMarker(marker) {
    this.onlines[marker.id] = marker;
  }
}

module.exports = Markers;
