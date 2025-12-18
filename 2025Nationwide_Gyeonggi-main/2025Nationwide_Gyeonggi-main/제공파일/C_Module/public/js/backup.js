const $ = document.querySelector.bind(document)
const $$ = (sel) => [...document.querySelectorAll(sel)]
const newEl = (tag, attrs) => Object.assign(document.createElement(tag), attrs);

class LibraryMap {
  constructor() {
    this.$Licanvas = $('#library');
    this.C = this.$Licanvas.getContext('2d');
    this.$Cmodal1 = $('.Cmodal1');
    this.$Cmodal2 = $('.Cmodal2');
    this.map = [];
    this.libraries = [];
    this.arr = [];
    this.hoveredIdx = -1;

    this.init();
  }

  async init() {
    const data = await fetch('./json/find_library.json').then((r) => r.json());
    this.map = data.map;
    this.libraries = data.libraries;

    this.longitudes = this.map.flatMap(([lon]) => lon);
    this.latitudes = this.map.flatMap(([_, lat]) => lat);
    this.minLon = Math.min(...this.longitudes);
    this.maxLon = Math.max(...this.longitudes);
    this.minLat = Math.min(...this.latitudes);
    this.maxLat = Math.max(...this.latitudes);
    this.lonRange = this.maxLon - this.minLon;
    this.latRange = this.maxLat - this.minLat;

    this.setEvents();
    this.render();
  }

  lonLatToCanvas(lon, lat) {
    const x = ((lon - this.minLon) / this.lonRange) * this.$Licanvas.width;
    const y = ((this.maxLat - lat) / this.latRange) * this.$Licanvas.height;
    return [x, y];
  }

  render() {
    const C = this.C;
    const $canvas = this.$Licanvas;
    this.arr = [];

    C.clearRect(0, 0, $canvas.width, $canvas.height);

    // 지도 경계선
    C.beginPath();
    this.map.forEach(([lon, lat], idx) => {
      const [x, y] = this.lonLatToCanvas(lon, lat);
      C[idx ? 'lineTo' : 'moveTo'](x, y);
    });
    C.strokeStyle = '#333';
    C.stroke();

    // 도서관 점
    this.libraries.forEach(({ longitude, latitude }, idx) => {
      const [x, y] = this.lonLatToCanvas(longitude, latitude);
      const path = new Path2D();
      path.arc(x, y, 10, 0, Math.PI * 2);
      C.fillStyle = this.hoveredIdx === idx ? '#f00' : '#000';
      C.fill(path);
      this.arr.push({ x, y, path });
    });
  }

  setEvents() {
    const rect = this.$Licanvas.getBoundingClientRect();

    this.$Licanvas.onmousemove = (e) => {
      const [offsetX, offsetY] = [e.clientX - rect.left, e.clientY - rect.top];
      const hoveredIdx = this.arr.findIndex(({ path }) => this.C.isPointInPath(path, offsetX, offsetY));

      if (hoveredIdx !== this.hoveredIdx) {
        this.hoveredIdx = hoveredIdx;
        this.render();
        this.updateModal(rect);
      }
    };
  }

  updateModal(rect) {
    this.$Cmodal1.classList.remove('shows');
    this.$Cmodal2.classList.remove('shows');

    if (this.hoveredIdx === -1) return;

    const { x, y } = this.arr[this.hoveredIdx];
    if (this.hoveredIdx === 0) {
      this.$Cmodal1.style.left = `${rect.left + x + 15}px`;
      this.$Cmodal1.style.top = `${rect.top + y - 25}px`;
      this.$Cmodal1.classList.add('shows');
    }

    if (this.hoveredIdx === 1) {
      this.$Cmodal2.style.left = `${rect.left + x + 15}px`;
      this.$Cmodal2.style.top = `${rect.top + y - 30}px`;
      this.$Cmodal2.classList.add('shows');
    }
  }
}

new LibraryMap();
