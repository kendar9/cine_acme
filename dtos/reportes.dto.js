class OcupacionSalasDTO {
  constructor(reporte) {
    this.sala_id = reporte._id.sala_id;
    this.sala_codigo = reporte._id.sala_codigo;
    this.totalFunciones = reporte.totalFunciones;
  }
}

class PeliculasMasVistasDTO {
  constructor(reporte) {
    this.pelicula_id = reporte._id.pelicula_id;
    this.pelicula_titulo = reporte._id.pelicula_titulo;
    this.vistas = reporte.vistas;
  }
}

class HorariosPicoDTO {
  constructor(reporte) {
    this.hora = reporte._id;
    this.cantidad = reporte.cantidad;
  }
}

class FuncionesDisponiblesDTO {
  constructor(funcion) {
    this.funcion_id = funcion._id;
    this.pelicula = funcion.pelicula_titulo;
    this.cine = funcion.cine_nombre;
    this.sala = funcion.sala_codigo;
    this.fecha_hora = funcion.fecha_hora;
  }
}

class PeliculasVigentesDTO {
  constructor(pelicula) {
    this.pelicula_id = pelicula._id;
    this.titulo = pelicula.titulo;
    this.genero = pelicula.genero;
    this.duracion = pelicula.duracion;
    this.en_cartelera = pelicula.en_cartelera;
  }
}

export {
  OcupacionSalasDTO,
  PeliculasMasVistasDTO,
  HorariosPicoDTO,
  FuncionesDisponiblesDTO,
  PeliculasVigentesDTO,
};
