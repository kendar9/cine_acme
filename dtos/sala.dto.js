class SalaResponseDTO {
  constructor(sala) {
    this._id = sala._id;
    this.codigo = sala.codigo;
    this.numero_sillas = sala.numero_sillas;
    this.cine_id = sala.cine_id;
    // Frontend expects a nested object
    if (sala.cineInfo && sala.cineInfo.nombre) {
      this.cineInfo = { nombre: sala.cineInfo.nombre };
    }
  }
}

class CreateSalaDTO {
  constructor(sala) {
    this.codigo = sala.codigo;
    this.numero_sillas = sala.numero_sillas;
    this.cine_id = sala.cine_id;
  }
}

export { SalaResponseDTO, CreateSalaDTO };
