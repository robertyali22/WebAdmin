import { useState, useEffect } from "react";
import { SideBar } from "../components/Sidebar";
import { getProductosPorCategoria } from "../api/ProductoRequest";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function ProductosPorCategoria() {
    const [productosPorCategoria, setProductosPorCategoria] = useState([]);

    // Cargar los datos de productos por categoría
    useEffect(() => {
        async function loadProductosPorCategoria() {
            try {
                const res = await getProductosPorCategoria();
                setProductosPorCategoria(res.data);
            } catch (error) {
                console.error("Error al cargar productos por categoría:", error);
            }
        }
        loadProductosPorCategoria();
    }, []);

    return (
        <>
            <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                    Productos por Categoría
                </h2>

                {/* Gráfico de líneas */}
                <ResponsiveContainer width={400} height={300}>
                    <LineChart data={productosPorCategoria}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="_id" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="cantidad" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}
