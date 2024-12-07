import { useState, useEffect } from "react";
import { getEstadoInventario } from "../api/ProductoRequest";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function EstadoInventario() {
    const [estadoInventario, setEstadoInventario] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await getEstadoInventario();
            const data = [
                { name: "En Stock", value: res.data.enStock },
                { name: "Bajo Stock", value: res.data.bajoStock },
                { name: "Agotado", value: res.data.agotado },
            ];
            setEstadoInventario(data);
        }
        fetchData();
    }, []);

    const COLORS = ["#00C49F", "#FFBB28", "#FF8042"]; // Colores para cada estado

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">Estado del Inventario</h2>
            <ResponsiveContainer width={400} height={300}>
                <PieChart>
                    <Pie
                        data={estadoInventario}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                    >
                        {estadoInventario.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
