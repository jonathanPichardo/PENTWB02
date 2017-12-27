const url = 'https://jsonplaceholder.typicode.com';


$(function () {

    let posts = []

    $.get(`${url}/posts`)
        .then(res => {
            posts = res;
            posts.map(buildPostArticle).forEach(card => $('#posts').append(card));
        })
        .then(_ =>
            $('.showPostModal').click((e) => {

                const id = e.target.id;
                const post = posts.find(post => post.id == id);

                $.get(`${url}/posts/${id}/comments`)
                .then(res => post.comments = res)
                .then(() => $('.fullPostModal>div').html(buildFullPostModal(post)))
                .then(() => $('.fullPostModal').modal());

            })
        )
        .catch(err => console.log(err));
        
        $('#fullPostModal').on('hidden.bs.modal', e => e.target.children.replace() );

});

function buildPostArticle(post) {

    return `<div id=${post.id} class="card">
        <img class="card-img-top" src="http://lorempixel.com/400/400/technics/${(post.id % 10) || 10}" alt="${post.id}">
        <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" id=${post.id} class="btn btn-dark showPostModal">See Full Post</a>
        </div>
    </div>`;

}

function buildFullPostModal(post) {
    return `<div class="modal-content">
            <div class="modal-header">
                <h5 id="post-title" class="modal-title">${post.title} | ${post.id}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p id="post-body" class="modal-text">${post.body}</p>
                <article id="post-comments" class="card-columns">
                    ${post.comments.map(buildCommentCard).reduce((x,y) => x + y, '')}
                </article>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>`
}

function buildCommentCard(comment) {
    return `<div id=${comment.id} class="card">
        <div class="card-body">
            <h6 class="card-title">${comment.email}</h6>
            <p class="card-text">${comment.body}</p>
        </div>
    </div>`;
}

function closeCurrentDetails(post) {
    $('#post-details').replaceWith(buildPostArticle(post));
}