import { Router } from "express";
import { createProducto, readProducto, readProductos, updateProducto, deleteProducto, getProductosPorTienda, getEstadoInventario, getProductosPorCategoria } from "../controllers/producto.controller.js";
import { authRequired } from '../middlewares/ValidateToken.js'
import { validateProducto } from "../middlewares/validateProducto.js";

const router = Router();

// Rutas para la entidad Producto
// authRequired,
router.post('/productos', validateProducto, createProducto);
router.get('/productos', readProductos);
router.get('/productos/:id', readProducto);
router.put('/productos/:id', validateProducto, updateProducto);
router.delete('/productos/:id', deleteProducto);
router.get("/productos-por-tienda", getProductosPorTienda);
router.get("/estado-inventario", getEstadoInventario);
router.get("/productos-por-categoria", getProductosPorCategoria);


export default router;
