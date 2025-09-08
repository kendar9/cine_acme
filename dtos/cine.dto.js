class CineResponseDTO {
  constructor(cine) {
    this._id = cine._id;
    this.codigo = cine.codigo;
    this.nombre = cine.nombre;
    this.direccion = cine.direccion;
    this.ciudad = cine.ciudad;
  }
}

class CreateCineDTO {
  constructor(cine) {
    this.codigo = cine.codigo;
    this.nombre = cine.nombre;
    this.direccion = cine.direccion;
    this.ciudad = cine.ciudad;
  }
}

export { CineResponseDTO, CreateCineDTO };
