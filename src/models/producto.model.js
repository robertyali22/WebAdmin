import mongoose from "mongoose";

// Esquema del producto
const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true, 
    },
    marca: {
        type: String,
        required: true, 
    },
    precio: {
        type: Number,
        required: true, 
        min: 0, 
    },
    stock: {
        type: Number,
        required: true, 
        min: 0, 
    },
    stock_minimo: {
        type: Number,
        required: true,
        min: 0, 
    },
    categoria: {
        type: String,
        required: true, 
    },
    cantidad_vendida: {
        type: Number,
        default: 0,
        min: 0,
        required: true, 
    },
    img: {
        type: String, 
        validate: {
            validator: function (v) {
                return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/.test(v); // Validación de URL de imagen
            },
            message: props => `${props.value} no es una URL válida para una imagen.`,
        },
        required: true, 
    },
    tienda_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tienda", // Relación con la colección Tienda
        required: true, // Relación obligatoria
    },
}, {
    timestamps: true 
});

// Exportar el modelo Producto
export default mongoose.model("Producto", productoSchema);
