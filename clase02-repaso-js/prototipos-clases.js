class LikesService {
  constructor() {
    this.likes = 0;
    this.dislikes = 0;
  }

  like() {
    this.likes++;
  }

  dislike() {
    this.dislikes++;
  }

  getLikes() {
    return this.likes;
  }

  getDislikes() {
    return this.dislikes;
  }
}

class Comment extends LikesService {
  constructor(msg) {
    super();
    this.message = msg;
  }
}

class CommentsService {
  constructor() {
    this.comments = [];
    this.commentsQty = 0;
  }

  addComment(comment) {
    this.commentsQty++;

    this.comments.push({ id: this.commentsQty, comment });
  }

  getComments() {
    return this.comments;
  }
}


console.log('\n')

console.log("Creamos una nueva instancia de nuestro servicio de comentarios")
const thread = new CommentsService();
console.log(thread)
console.log('\n')

console.log("Si llamamos a la funcion getComments vemos que viene vacia porque todavia no agregamos nada")
console.log(thread.getComments())
console.log('\n')

console.log("Creamos una nueva instancia de un comentario con un mensaje que querramos")
const firstComment = new Comment("this is a test")
console.log(firstComment)
console.log('\n')

console.log("Agregamos nuestro comentario a nuestro thread")
thread.addComment(firstComment)
console.log(thread)
console.log('\n')

console.log("Ahora nuestro thread tiene un comentario")
console.log(thread.getComments())
console.log('\n')

console.log("Le damos like a nuestro comentario")
firstComment.like();
console.log(firstComment)
console.log('\n')

console.log("Vemos que nuestro comentario tiene un like dentro de nuestro thread")
console.log(thread.getComments())

