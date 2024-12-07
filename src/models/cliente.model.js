import mongoose from "mongoose";

// Esquema del cliente
const clienteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    correo: {
        type: String,
        required: true, 
        unique: true, 
    },
    telefono: {
        type: String,
        required: true, 
    },
    direccion: {
        type: String,
        required: true, 
    }
}, {
    timestamps: true 
});

// Exportar el modelo Cliente
export default mongoose.model("Cliente", clienteSchema);
