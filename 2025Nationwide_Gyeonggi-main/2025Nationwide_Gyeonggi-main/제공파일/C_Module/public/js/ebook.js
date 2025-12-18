class ebook {
  constructor() {
    this.books = [];
    this.bookAlign = [];
    this.state = {
      currentBookIdx: null,  // 현재 열린 책 인덱스
      currentPage: 0,        // 현재 페이지 번호
      totalPages: 0,         // 전체 페이지 수
      chunkedText: []       // 잘라진 텍스트 페이지 배열
    }
    this.init()
  }

  async init() {
    this.books = await $fetch('./json/books.json').then((res) => res.book);
    this.bookAlign = await $fetch('./json/books.json').then((res) => res.book);
    this.render();
    this.setEvent();
    this.categoryBooks();
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
    this.setEvent();
  }


  textChunk(text) {
    const pageTextContent = [];

    for (let i = 0; i < text.length; i += 425) {
      pageTextContent.push(text.slice(i, i + 425))
    }
    return pageTextContent
  }

  categoryBooks() {
    const $cate = $('#cate')

    $cate.onchange = () => {
      const selected = $cate.value

      selected === '전체' ? this.books = this.bookAlign : this.books = this.bookAlign.filter(book => book.cate === selected)
      this.render();
      this.setEvent();
    }

  }

  render() {
    this.books = this.books.toSorted((a, b) => b.text.length - a.text.length)
    const $eBookContent = $('.eBookContent')
    $eBookContent.innerHTML = '';

    this.books.forEach((e, i) => {
      const $albumBox = newEl('div', {
        className: `albumBox albumBox${i}`,
        innerHTML: `
          <img class="albumImg" src="./library_books/${e.image}" alt="${e.name}">
          <h5 class="albumName">${e.name}</h5>
          <span class="albumCate">${e.cate}</span>
          <button class="openBook" data-idx="${i}">E-book읽기</button>
        `
      })
      $eBookContent.append($albumBox)
      // console.log($albumBox);
    });
  }

  textRender(bookText) {
    const $textContentBox = $('.textContent');
    $textContentBox.innerHTML = '';

    const pageText = this.textChunk(bookText);

    const createPage = (front, back, i) => {
      return newEl('div', {
        className: `page page-${i}`,
        innerHTML: `
        <div class="frontPage">
          <div class="content">${front}</div>
          <div class="page-num">${i * 2}</div>
        </div>
        <div class="backPage">
          <div class="content">${back}</div>
          <div class="page-num">${i * 2 + 1}</div>
        </div>
      `
      });
    }

    const totalPageN = Math.round(pageText.length / 2)

    for (let i = 0; i < totalPageN; i++) {
      const front = pageText[i * 2];
      const back = pageText[i * 2 + 1] || '';
      const $page = createPage(front, back, i);

      $textContentBox.append($page);
    }

    this.setState({
      chunkedText: pageText,
      totalPages: totalPageN,
      currentPage: 0
    })
  }

  setEvent() {
    $$('.openBook').forEach(e => {
      e.onclick = (e) => {
        const index = e.currentTarget.dataset.idx;
        const book = this.books[index];

        $('.bookTitle').textContent = book.name + " ||"
        $('.bookPage').textContent = "All page: " + this.state.totalPages

        $('.eBookModal').style.display = 'block'
        $('body').style.overflow = "hidden"

        this.textRender(book.text)

        setTimeout(() => {
          $('.nextPageBtn').click()
          $('.backPageBtn').click()
        }, 0)

      }
    })

    $('.close').onclick = () => {
      $('.eBookModal').style.display = 'none'
      $('body').style.overflow = "visible"
    };


    $('.nextPageBtn').onclick = () => {
      if (this.state.currentPage < this.state.totalPages) {
        const $pages = $$('.page');
        const currentPage = this.state.currentPage;

        $pages[currentPage]?.classList.add('flipped');
        this.setState({ currentPage: currentPage + 1 });

        $pages.forEach((pg, i) => {
          if (i <= currentPage) {
            pg.style.zIndex = -1;
          } else {
            pg.style.zIndex = $pages.length - i;
          }
        });
      }
      console.log(this.state.currentPage);
    };

    $('.backPageBtn').onclick = () => {
      if (this.state.currentPage > 0) {
        const $pages = $$('.page');
        const current = this.state.currentPage - 1;

        $pages[current]?.classList.remove('flipped');
        this.setState({ currentPage: current });

        $pages.forEach((pg, i) => {
          if (i < current) {
            pg.style.zIndex = -1;
          } else {
            pg.style.zIndex = $pages.length - i;
          }
        });
      }
      console.log(this.state.currentPage);
    };

  }

}

new ebook();