import { useState, useEffect } from "react";
import { getProductosPorTienda } from "../api/ProductoRequest";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function ProductosPorTienda() {
    const [productosPorTienda, setProductosPorTienda] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await getProductosPorTienda();
            setProductosPorTienda(res.data);
        }
        fetchData();
    }, []);

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">Cantidad de Productos por Tienda</h2>
            <ResponsiveContainer width={500} height={300}>
                <BarChart data={productosPorTienda}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tienda" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="totalProductos" fill="#8884d8" name="Productos" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
