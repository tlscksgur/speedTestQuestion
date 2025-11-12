const $card = document.querySelectorAll('.card');

const api = async () => {
    return await fetch('/videos.json', {
        headers : {'Content-Type' : 'application/json'},
        method : 'get'
    })
        .then(res => res.json())
        .then(data => data)
}

const view = async () => {
    const data = await api();

    data.forEach((e,idx) => {

        let videoHtml = `<div class="card-header py-3">
                    <span class="h6 fw-bold">${e.title}</span>
                </div>
                <div class="gif gif${idx + 1}" style="background-image: url('../gif/${e.preview}.png')"></div>
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <i class="icon icon-clock me-2"></i>
                        <span class="me-3">${e.duration}</span>
                        <i class="icon icon-eye me-2"></i>
                        <span>${e.views.toLocaleString()}</span>
                    </div>
                </div>`;

        $card[idx].innerHTML = videoHtml;
    });
}

view();