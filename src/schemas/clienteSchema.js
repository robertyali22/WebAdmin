import yup from "yup";

export const clienteSchema = yup.object({
    nombre: yup
        .string()
        .required("El nombre del cliente es obligatorio"),
    correo: yup
        .string()
        .email("Debe ser un correo electrónico válido")
        .required("El correo electrónico es obligatorio"),
    telefono: yup
        .string()
        .required("El número de contacto es obligatorio")
        .matches(/^\d+$/, "El número de contacto debe contener solo dígitos"),
    direccion: yup
        .string()
        .required("La dirección es obligatoria"),
});
