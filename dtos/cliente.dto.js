export const createClienteDto = (cliente) => ({
    identificacion: cliente.identificacion,
    nombreCompleto: cliente.nombreCompleto,
    email: cliente.email,
    telefono: cliente.telefono
});
