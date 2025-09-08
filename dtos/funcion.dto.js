class FuncionResponseDTO {
  constructor(funcion) {
    this._id = funcion._id;
    this.fecha_hora = funcion.fecha_hora;
    this.cine_id = funcion.cine_id;
    this.sala_id = funcion.sala_id;
    this.pelicula_id = funcion.pelicula_id;

    if (funcion.cine && funcion.cine.nombre) {
      this.cine = { nombre: funcion.cine.nombre };
    }
    if (funcion.sala && funcion.sala.codigo) {
      this.sala = { codigo: funcion.sala.codigo };
    }
    if (funcion.pelicula && funcion.pelicula.titulo) {
      this.pelicula = { titulo: funcion.pelicula.titulo };
    }
  }
}

class CreateFuncionDTO {
  constructor(funcion) {
    this.cine_id = funcion.cine_id;
    this.sala_id = funcion.sala_id;
    this.pelicula_id = funcion.pelicula_id;
    this.fecha_hora = funcion.fecha_hora;
  }
}

export { FuncionResponseDTO, CreateFuncionDTO };
