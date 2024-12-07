import { SideBar } from '../components/Sidebar'
import { Package, DollarSign, Users, CreditCard, TrendingUp } from 'lucide-react';

import { EstadoInventario } from "../charts/EstadoInventario";

import { ProductosPorCategoria } from "../charts/ProductosPorCategoria";


export function AnaliticaPage() {

  
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
                  Total de tiendas
                </p>
              </div>
              <div className="bg-blue-100/50 p-4 rounded-lg  mx-auto">
                <p className="text-3xl font-bold text-blue-500">25</p>
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
                  
                </p>
              </div>
              <div className="bg-blue-100/50 p-4 rounded-lg  mx-auto">
                <p className="text-3xl font-bold text-blue-500">$16,000</p>
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
                  Total de categorias
                </p>
              </div>
              <div className="bg-blue-100/50 p-4 rounded-lg  mx-auto">
                <p className="text-3xl font-bold text-blue-500">15,400k</p>
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
                <p className="text-3xl font-bold text-blue-500">12,340</p>
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
                <EstadoInventario />

              </div>

            </div>

            {/* Tarjeta 2 */}
            <div className="p-4 bg-white rounded-lg shadow-md border border-blue-100">
              <div className="flex items-center justify-center mb-4 gap-4 h-96">
                <ProductosPorCategoria />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

