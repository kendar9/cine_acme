import { body, validationResult } from "express-validator";

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateCreateUser = [
  body("identificacion")
    .notEmpty()
    .withMessage("La identificación es obligatoria.")
    .isString()
    .withMessage("La identificación debe ser un texto."),
  body("nombre_completo")
    .notEmpty()
    .withMessage("El nombre completo es obligatorio."),
  body("telefono").notEmpty().withMessage("El teléfono es obligatorio."),
  body("email").isEmail().withMessage("Debe proporcionar un email válido."),
  body("cargo").notEmpty().withMessage("El cargo es obligatorio."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres."),
  handleValidationErrors,
];

export const validateLogin = [
  body("email").isEmail().withMessage("Debe proporcionar un email válido."),
  body("password").notEmpty().withMessage("La contraseña es obligatoria."),
  handleValidationErrors,
];

export const validateCreatePelicula = [
  body("codigo").isString().trim().notEmpty().withMessage("El código es obligatorio."),
  body("titulo").isString().trim().notEmpty().withMessage("El título es obligatorio."),
  body("sinopsis").isString().trim().notEmpty().withMessage("La sinopsis es obligatoria."),
  body("clasificacion")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("La clasificación es obligatoria."),
  body("director").isString().trim().notEmpty().withMessage("El director es obligatorio."),
  body("duracion")
    .isInt({ min: 1 })
    .withMessage("La duración debe ser un número entero positivo.")
    .toInt(),
  body("genero").isString().trim().notEmpty().withMessage("El género es obligatorio."),
  body("fecha_estreno")
    .isISO8601()
    .toDate()
    .withMessage("La fecha de estreno debe ser una fecha válida."),
  body("reparto").optional().isArray().withMessage("El reparto debe ser una lista de actores."),
  body("idioma").isString().trim().notEmpty().withMessage("El idioma es obligatorio."),
  body("trailer").optional().isURL().withMessage("El trailer debe ser una URL válida."),
  body("poster").optional().isURL().withMessage("El poster debe ser una URL válida."),
  handleValidationErrors,
];

export const validateCreateSala = [
  body("codigo").notEmpty().withMessage("El código es obligatorio."),
  body("numero_sillas")
    .isInt({ min: 1 })
    .withMessage("El número de sillas debe ser un entero positivo."),
  body("cine_id")
    .notEmpty()
    .withMessage("El ID del cine es obligatorio.")
    .isMongoId()
    .withMessage("El ID del cine debe ser un Mongo ID válido."),
  handleValidationErrors,
];

export const validateUpdatePelicula = [
  body("codigo").optional().isString().trim().notEmpty().withMessage("El código es obligatorio."),
  body("titulo").optional().isString().trim().notEmpty().withMessage("El título es obligatorio."),
  body("sinopsis").optional().isString().trim().notEmpty().withMessage("La sinopsis es obligatoria."),
  body("clasificacion")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("La clasificación es obligatoria."),
  body("director").optional().isString().trim().notEmpty().withMessage("El director es obligatorio."),
  body("duracion")
    .optional()
    .isInt({ min: 1 })
    .withMessage("La duración debe ser un número entero positivo.")
    .toInt(),
  body("genero").optional().isString().trim().notEmpty().withMessage("El género es obligatorio."),
  body("fecha_estreno")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("La fecha de estreno debe ser una fecha válida."),
  body("reparto").optional().isArray().withMessage("El reparto debe ser una lista de actores."),
  body("idioma").optional().isString().trim().notEmpty().withMessage("El idioma es obligatorio."),
  body("trailer").optional().isURL().withMessage("El trailer debe ser una URL válida."),
  body("poster").optional().isURL().withMessage("El poster debe ser una URL válida."),
  handleValidationErrors,
];
