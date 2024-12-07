import yup from "yup";

export const productoSchema = yup.object({
    nombre: yup
        .string()
        .required("El nombre del producto es obligatorio"),
    marca: yup
        .string()
        .required("La marca es obligatoria"),
    precio: yup
        .number()
        .required("El precio es obligatorio")
        .positive("El precio debe ser un valor positivo"),
    stock: yup
        .number()
        .required("El stock es obligatorio")
        .integer("El stock debe ser un número entero")
        .min(0, "El stock no puede ser negativo"),
    stock_minimo: yup
        .number()
        .required("El stock mínimo es obligatorio")
        .integer("El stock mínimo debe ser un número entero")
        .min(0, "El stock mínimo no puede ser negativo"),
    categoria: yup
        .string()
        .required("La categoría es obligatoria"),
    img: yup
        .string()
        .required("La img es obligatoria"),
    cantidad_vendida: yup
        .number()
        .required("La cantidad vendida es obligatoria"),
    tienda_id: yup
        .string()
        .required("El identificador de la tienda es obligatorio")
});
