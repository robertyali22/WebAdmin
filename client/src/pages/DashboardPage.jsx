import { SideBar } from '../components/Sidebar';
import { useState, useEffect } from "react";
import { getAllProductos } from "../api/ProductoRequest";
import { Package, DollarSign, Users, CreditCard, TrendingUp } from 'lucide-react';
import { getAllClientes } from "../api/ClienteRequest";

import { VentasPorCategoria } from "../charts/VentasPorCategoria";
import { ProductosPorTienda } from "../charts/ProductosPorTienda";


export function DashboardPage() {
  const [totalProductos, setTotalProductos] = useState(0);
  const [totalPedidosPagados, setTotalPedidosPagados] = useState(0);
  const [totalClientes, setTotalClientes] = useState(0);
  const [ventas, setVentas] = useState(0);

  useEffect(() => {
    async function loadData() {
      try {
        const productosRes = await getAllProductos();
        const clientesRes = await getAllClientes(); // Obtener los clientes

        // Total de productos (suma del stock de todos los productos)
        const productos = productosRes.data;
        const total = productos.reduce((sum, producto) => {
          return sum + producto.stock; // Suma del stock
        }, 0);
        setTotalProductos(total);

        // Total de pedidos pagados (cantidad_vendida * precio por producto)
        const totalPedidos = productos.reduce((sum, producto) => {
          return sum + (producto.cantidad_vendida * producto.precio); // Suma de cantidad vendida * precio
        }, 0);
        setTotalPedidosPagados(totalPedidos);

        // Total de clientes
        const clientes = clientesRes.data;
        setTotalClientes(clientes.length);

        // Calcular ventas totales sumando la cantidad_vendida de cada producto
        const totalVentas = productos.reduce((sum, producto) => {
          return sum + producto.cantidad_vendida;
        }, 0);
        setVentas(totalVentas);

      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    }
    loadData();
  }, []);


  return (
    <>
      <SideBar />
      <div className="sm:ml-64 bg-slate-100">
        <div className="p-4 mt-16">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4">

            {/* Tarjeta 1 */}
            <div className="p-4 bg-white rounded-lg shadow-md border border-blue-100">
              <div className="flex items-center mb-4 gap-4">
                <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500">
                  <Package size={26} />
                </div>
                <p className="text-sm font-medium text-gray-800">
                  Total de productos
                </p>
              </div>
              <div className="bg-blue-100/50 p-4 rounded-lg  mx-auto">
                <p className="text-3xl font-bold text-blue-500">{totalProductos}</p>
                <span className="mt-2 flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 text-sm font-medium text-blue-500">
                  <TrendingUp size={18} />
                  25%
                </span>
              </div>

            </div>

            {/* Tarjeta 2 */}
            <div className="p-4 bg-white rounded-lg shadow-md border border-blue-100">
              <div className="flex items-center mb-4 gap-4">
                <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500">
                  <DollarSign size={26} />
                </div>
                <p className="text-sm font-medium text-gray-800">
                  Total de pedidos pagados
                </p>
              </div>
              <div className="bg-blue-100/50 p-4 rounded-lg  mx-auto">
                <p className="text-3xl font-bold text-blue-500">S/{totalPedidosPagados}</p>
                <span className="mt-2 flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 text-sm font-medium text-blue-500">
                  <TrendingUp size={18} />
                  12%
                </span>
              </div>
            </div>

            {/* Tarjeta 3 */}
            <div className="p-4 bg-white rounded-lg shadow-md border border-blue-100">
              <div className="flex items-center mb-4 gap-4">
                <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500">
                  <Users size={26} />
                </div>
                <p className="text-sm font-medium text-gray-800">
                  Total de clientes
                </p>
              </div>
              <div className="bg-blue-100/50 p-4 rounded-lg  mx-auto">
                <p className="text-3xl font-bold text-blue-500">{totalClientes}</p>
                <span className="mt-2 flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 text-sm font-medium text-blue-500">
                  <TrendingUp size={18} />
                  15%
                </span>
              </div>
            </div>

            {/* Tarjeta 4 */}
            <div className="p-4 bg-white rounded-lg shadow-md border border-blue-100">
              <div className="flex items-center mb-4 gap-4">
                <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500">
                  <CreditCard size={26} />
                </div>
                <p className="text-sm font-medium text-gray-800">
                  Ventas
                </p>
              </div>
              <div className="bg-blue-100/50 p-4 rounded-lg  mx-auto">
                <p className="text-3xl font-bold text-blue-500">{ventas}</p>
                <span className="mt-2 flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 text-sm font-medium text-blue-500">
                  <TrendingUp size={18} />
                  19%
                </span>
              </div>
            </div>
          </div>


          <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 ">

            {/* Tarjeta 1 */}
            <div className="p-4 bg-white rounded-lg shadow-md border border-blue-100">
              <div className="flex items-center justify-center gap-4 h-96">
                <VentasPorCategoria />
              </div>
            </div>

            {/* Tarjeta 2 */}
            <div className="p-4 bg-white rounded-lg shadow-md border border-blue-100">
              <div className="flex items-center justify-center mb-4 gap-4 h-96">
                <ProductosPorTienda />
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}
