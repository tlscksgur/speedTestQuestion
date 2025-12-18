class LibraryCanvas {
  constructor() {
    this.$library = $('#library');
    this.C = this.$library.getContext('2d');

    this.state = {
      hoveredIdx: -1,  // 마우스 올린 도서관 인덱스
      libraryIdx: -1,  // 선택된 도서관 인덱스
      bookIdx: -1,     // 선택된 도서 인덱스
      hoverRoundIndex: -1
    };

    this.bigModalState = {
      clickedLib: null,  // 도서관
      clickedCate: null, //카테고리
      clickedIdx: null   // 도서
    };

    // 데이터 및 참조 배열
    this.arr = [];          // 각 도서관의 좌표와 path 저장
    this.map = [];          // 지도 외곽 데이터
    this.libraries = [];    // 도서관 데이터
    this.path2DArr = [];    // Path2D 배열

    this.searchText = "";

    this.$modal = $('.modal1');

    this.init();
  }

  async init() {
    const data = await $fetch("./json/find_library.json");
    this.map = data.map;
    this.libraries = data.libraries;

    const lon = this.map.flatMap(([val]) => val);
    const lat = this.map.flatMap(([_, val]) => val);
    this.minLon = Math.min(...lon);
    this.maxLon = Math.max(...lon);
    this.minLat = Math.min(...lat);
    this.maxLat = Math.max(...lat);

    this.lonRange = this.maxLon - this.minLon;
    this.latRange = this.maxLat - this.minLat;

    this.render();
    this.setEvent();
    this.sideBar();
  }

  lonLatToCanvas(lon, lat) {
    const x = ((lon - this.minLon) / this.lonRange) * this.$library.width;
    const y = ((this.maxLat - lat) / this.latRange) * this.$library.height;
    return [x, y];
  }

  render() {
    const C = this.C;
    C.clearRect(0, 0, this.$library.width, this.$library.height);
    this.arr = [];

    if (this.map.length) {
      C.beginPath();
      this.map.forEach(([lon, lat], idx) => {
        const [x, y] = this.lonLatToCanvas(lon, lat);
        C[idx ? 'lineTo' : 'moveTo'](x, y);
      });
      C.closePath();
      C.strokeStyle = "skyblue";
      C.lineWidth = 2;
      C.stroke();
    }

    this.libraries.forEach(({ longitude, latitude }, idx) => {
      const [x, y] = this.lonLatToCanvas(longitude, latitude);
      const path = new Path2D();
      path.arc(x, y, 8, 0, Math.PI * 2);
      C.fillStyle = idx === this.state.hoveredIdx ? 'hotpink' : 'pink';
      C.fill(path);
      this.arr.push({ x, y, path });
    });

    this.modal();

  }

  modal() {
    this.$modal.classList.toggle('shows', this.state.hoveredIdx !== -1);
    if (this.state.hoveredIdx === -1) return;

    const { x, y } = this.arr[this.state.hoveredIdx];
    const lib = this.libraries[this.state.hoveredIdx];
    const books = Array.isArray(lib.books) ? lib.books : [];
    const topBooks = books.toSorted((a, b) => b.rating - a.rating).slice(0, 3);

    const topBooksHTML = topBooks.map((book, i) => `
      <li class="booksItem${i}">
        <img class="bookImg" src="./도서관 찾기/${book.image}" alt="${book.name}" title="${book.name}">
      </li>`).join('');

    this.$modal.innerHTML = `
      <div class="libraryBox">
        <h4 class="libraryName">${lib.name}</h4>
        <img class="libraryImg" src="./도서관 찾기/${lib.image}" alt="${lib.name}">
        <p class="libraryContent">${lib.introduction}</p>
        <div class="famousBook">
          <ul class="topBooksBox">${topBooksHTML}</ul>
        </div>
      </div>
    `;

    Object.assign(this.$modal.style, {
      position: 'absolute',
      left: `${x + 400}px`,
      top: `${y + 195}px`
    });
  }

  bigModal() {
    const $big = $(".bigModal");
    if (!$big || this.bigModalState.clickedLib == null) return;

    const { clickedCate, clickedIdx, clickedLib } = this.bigModalState;

    $big.innerHTML = '';
    $big.style.display = "grid";

    const books = this.libraries[clickedLib]?.books ?? [];
    
    const $bigModal = $('.bigModal')
    const clickLib = this.libraries[clickedLib]
    let libraryUIhtml = `
      <h5 class="libraryUIName">${clickLib.name}</h5>
      <img class="libraryUIImg" src="./도서관 찾기/${clickLib.image}" alt="${clickLib.name}">
      <span class="libraryUIContent">${clickLib.introduction}</span>
      `

    $bigModal.innerHTML = libraryUIhtml

    const $booksBox = newEl('div', { className: 'booksBox' });
    


    books.forEach(book => {
      const { idx, cate, image } = book;

      // 카테고리 필터
      if (clickedCate && cate !== clickedCate) return;

      const $img = newEl("img", { src: `./도서관 찾기/${image}` });

      // idx랑 내가 클릭한 도서관 번호랑 맞는지 확인
      const isSelected = idx == clickedIdx;
      $img.classList.toggle('first', isSelected);

      $img.addEventListener("click", () => {
        if (isSelected) {
          this.bigModalState.clickedCate = null;
          this.bigModalState.clickedIdx = null;
        } else {
          this.bigModalState.clickedCate = cate;
          this.bigModalState.clickedIdx = idx;
        }
        this.bigModal();
      });

      $booksBox.append($img);
      // if (isSelected) {
      //   $booksBox.prepend($img);
      // } else {
      //   $booksBox.append($img);
      // }
    });

    $big.append($booksBox);
  }

  sideBar() {
    this.renderSideBarUI(this.libraries)
  }

  renderSearch() {
    const librarySearchList = this.searchLib

    if (!librarySearchList.length) {
      this.renderSideBarUI(this.libraries)
      return
    }

    this.renderSideBarUI(librarySearchList)
  }


  setEvent() {
    const $search = $(".search");
    $search.onkeydown = ({ target, key }) => {
      if (key === "Enter") {
        this.searchText = target.value;
        this.renderSearch();
      }
    };

    this.$library.onmousemove = (e) => {
      const { offsetX, offsetY } = e;
      const idx = this.arr.findIndex(({ path }) => this.C.isPointInPath(path, offsetX, offsetY));
      this.state.hoveredIdx = idx > -1 ? idx : -1;
      this.render();
      // console.log(this.state.hoveredIdx = idx);
    };

    this.$library.onclick = (e) => {
      const { offsetX, offsetY } = e;
      const clickIdx = this.arr.findIndex(({ path }) => this.C.isPointInPath(path, offsetX, offsetY));

      if (clickIdx === -1) return;

      this.bigModalState.clickedLib = clickIdx;
      this.bigModal();
    };

    $('.hiddenBtn').onclick = () => $('.searchSideBar').classList.toggle('w310')

  }

  get searchLib() {
    return this.libraries
      .map(lib => ({ ...lib, books: lib.books.filter((item) => item.name.includes(this.searchText)) }))
      .filter(lib => lib.books.length)
  }

  modalChain() {
    $$(".sideLibraryBox").forEach(box => {
      const idx = Number(box.dataset.idx);

      box.onmouseenter = () => {
        this.state.hoveredIdx = idx - 1;
        this.render();
        this.modal();
        // console.log(this.state.hoveredIdx = idx);
      };

      box.onmouseleave = () => {
        this.state.hoveredIdx = -1;
        this.render();
      };

      box.onclick = () => {
        this.bigModalState.clickedLib = idx;
        this.bigModal();
      };

    })
  }

  renderSideBarUI(libraryList) {
    const box = $(".sideLibrary");
    box.innerHTML = "";

    libraryList.forEach(({ name, image, idx }) => {
      box.innerHTML += `
      <div class="sideLibraryBox" data-idx="${idx}">
        <h4 class="sideLibraryName">${name}</h4>
        <img class="sideLibraryImg" src="./도서관 찾기/${image}">
      </div>`
    });

    this.modalChain();
  }

}

new LibraryCanvas();