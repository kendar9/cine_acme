class PeliculaResponseDTO {
  constructor(pelicula) {
    this._id = pelicula._id;
    this.codigo = pelicula.codigo;
    this.titulo = pelicula.titulo;
    this.genero = pelicula.genero;
    this.duracion = pelicula.duracion;
    this.clasificacion = pelicula.clasificacion;
    this.director = pelicula.director;
    this.reparto = pelicula.reparto;
    this.sinopsis = pelicula.sinopsis;
    this.fecha_estreno = pelicula.fecha_estreno;
    this.idioma = pelicula.idioma;
    this.poster = pelicula.poster;
    this.trailer = pelicula.trailer;
  }
}

class CreatePeliculaDTO {
  constructor(pelicula) {
    this.codigo = pelicula.codigo;
    this.titulo = pelicula.titulo;
    this.genero = pelicula.genero;
    this.duracion = pelicula.duracion;
    this.clasificacion = pelicula.clasificacion;
    this.director = pelicula.director;
    this.reparto = pelicula.reparto;
    this.sinopsis = pelicula.sinopsis;
    this.fecha_estreno = pelicula.fecha_estreno;
    this.idioma = pelicula.idioma;
    this.poster = pelicula.poster;
    this.trailer = pelicula.trailer;
  }
}

export { PeliculaResponseDTO, CreatePeliculaDTO };
