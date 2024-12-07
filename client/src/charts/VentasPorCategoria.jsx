import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { getAllProductos } from "../api/ProductoRequest";

export function VentasPorCategoria() {
    const [data, setData] = useState([]);

    // Colores para las categorías
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    // Cargar datos de productos
    useEffect(() => {
        async function fetchData() {
            const res = await getAllProductos();
            const productos = res.data;

            // Agrupar ventas por categoría
            const categoriaMap = {};
            productos.forEach((producto) => {
                const totalVentas = producto.cantidad_vendida * producto.precio;
                if (categoriaMap[producto.categoria]) {
                    categoriaMap[producto.categoria] += totalVentas;
                } else {
                    categoriaMap[producto.categoria] = totalVentas;
                }
            });

            // Convertir el mapa a un array para Recharts
            const formattedData = Object.keys(categoriaMap).map((key) => ({
                name: key,
                value: categoriaMap[key],
            }));

            setData(formattedData);
        }
        fetchData();
    }, []);

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                Distribución de Ventas por Categoría
            </h2>

            <PieChart width={400} height={300}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
}
