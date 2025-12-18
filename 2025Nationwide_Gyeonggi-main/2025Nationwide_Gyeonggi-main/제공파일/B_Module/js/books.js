class books {
    constructor() {
        this.books = [];
        this.$booksContainer = $('.booksContainer');

        this.init()
    }

    async init() {
        this.books = await $fetch("./json/books.json").then((res) => res.book);

        this.render();
        this.setEvent();
    }

    render() {
        this.books.forEach(e => {
            this.$booksContainer.innerHTML += `
                <ul class="booksBox">
                    <li><img src="./library_books/${e.image}" alt="${e.name}" style="width: 150px;"></li>
                    <li>${e.name}</li>
                    <li>${e.author}</li>
                    <li>${e.date}</li>
                </ul>
            `
        })
    }
    
    setEvent() {
        const $booksUl = $$('.booksBox')
        console.log($booksUl);

    }

}

new books();