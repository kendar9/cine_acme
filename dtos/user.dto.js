class UserResponseDTO {
  constructor(user) {
    this._id = user._id;
    this.identificacion = user.identificacion;
    this.nombre_completo = user.nombre_completo;
    this.telefono = user.telefono;
    this.email = user.email;
    this.cargo = user.cargo;
  }
}

class CreateUserDTO {
  constructor(user) {
    this.identificacion = user.identificacion;
    this.nombre_completo = user.nombre_completo;
    this.telefono = user.telefono;
    this.email = user.email;
    this.cargo = user.cargo;
    this.password = user.password;
  }
}

class LoginResponseDTO {
  constructor(token) {
    this.token = token;
  }
}

export { UserResponseDTO, CreateUserDTO, LoginResponseDTO };
