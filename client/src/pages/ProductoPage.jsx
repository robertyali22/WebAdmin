import { useState, useEffect } from "react";
import { SideBar } from "../components/Sidebar";
import { getAllProductos, createProducto, deleteProducto, updateProducto } from "../api/ProductoRequest";
import { getAllTiendas } from "../api/TiendaRequest";
import { useForm } from "react-hook-form";

export function ProductoPage() {
    const [productos, setProductos] = useState([]);
    const [tiendas, setTiendas] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editProductoId, setEditProductoId] = useState(null);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    // Cargar productos y tiendas al montar el componente
    useEffect(() => {
        async function loadData() {
            const productosRes = await getAllProductos();
            const tiendasRes = await getAllTiendas();
            setProductos(productosRes.data);
            setTiendas(tiendasRes.data);
        }
        loadData();
    }, []);

    // Abrir y cerrar modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditMode(false);
        reset();
    };

    // Agregar o actualizar un producto
    const onSubmit = async (data) => {
        try {
            if (editMode) {
                await updateProducto(editProductoId, data);
            } else {
                await createProducto(data);
            }
            const productosRes = await getAllProductos();
            setProductos(productosRes.data);
            closeModal();
        } catch (error) {
            console.error("Error al guardar producto:", error.response?.data || error.message);
        }
    };

    // Preparar el formulario para editar
    const handleEdit = (producto) => {
        setEditMode(true);
        setEditProductoId(producto._id);
        Object.keys(producto).forEach((key) => setValue(key, producto[key]));
        openModal();
    };

    // Eliminar producto
    const handleDelete = async (id) => {
        await deleteProducto(id);
        const productosRes = await getAllProductos();
        setProductos(productosRes.data);
    };

    return (
        <>
            <SideBar />
            <div className="sm:ml-64 bg-slate-100">
                <div className="p-4 mt-16">
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-700">Productos</h2>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={openModal}
                            >
                                Agregar Producto
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="bg-gray-100 text-gray-700 uppercase">
                                    <tr>
                                        <th className="px-4 py-3">#</th>
                                        <th className="px-4 py-3">Nombre</th>
                                        <th className="px-4 py-3">Marca</th>
                                        <th className="px-4 py-3">Precio</th>
                                        <th className="px-4 py-3">Stock</th>
                                        <th className="px-4 py-3">Stock Mínimo</th>
                                        <th className="px-4 py-3">Cantidad Vendida</th>
                                        <th className="px-4 py-3">Tienda</th>
                                        <th className="px-4 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos.map((producto, index) => (
                                        <tr key={producto._id} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-3">{index + 1}</td>
                                            <td className="px-4 py-3 flex items-center">
                                                <img
                                                    src={producto.img}
                                                    alt="Product"
                                                    className="w-10 h-10 rounded mr-3"
                                                />
                                                <div>
                                                    <p className="font-medium text-gray-900">{producto.categoria}</p>
                                                    <p className="text-xs text-gray-500">{producto.nombre}</p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">{producto.marca}</td>
                                            <td className="px-4 py-3">S/{producto.precio}</td>
                                            <td className="px-4 py-3 text-green-500">{producto.stock}</td>
                                            <td className="px-4 py-3 text-red-500">{producto.stock_minimo}</td>
                                            <td className="px-4 py-3">{producto.cantidad_vendida}</td>
                                            <td className="px-4 py-3">{producto.tienda_id?.nombre || "Sin tienda"}</td>
                                            <td className="px-4 py-3 space-x-3">
                                                <button
                                                    className="text-blue-500 hover:text-blue-700"
                                                    onClick={() => handleEdit(producto)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={() => handleDelete(producto._id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal dinámico */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            {editMode ? "Editar Producto" : "Agregar Producto"}
                        </h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {[
                                { name: "nombre", label: "Nombre" },
                                { name: "categoria", label: "Categoría" },
                                { name: "img", label: "Imagen (URL)" },
                                { name: "marca", label: "Marca" },
                                { name: "precio", label: "Precio", type: "number" },
                                { name: "stock", label: "Stock", type: "number" },
                                { name: "stock_minimo", label: "Stock Mínimo", type: "number" },
                                { name: "cantidad_vendida", label: "Cantidad Vendida", type: "number" },
                            ].map(({ name, label, type }) => (
                                <div key={name} className="mb-4">
                                    <label htmlFor={name} className="block text-gray-600 text-sm font-medium">
                                        {label}
                                    </label>
                                    <input
                                        type={type || "text"}
                                        id={name}
                                        className="w-full border border-gray-300 rounded p-2 mt-1"
                                        {...register(name, { required: `${label} es obligatorio` })}
                                    />
                                    {errors[name] && (
                                        <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>
                                    )}
                                </div>
                            ))}
                            <div className="mb-4">
                                <label htmlFor="tienda_id" className="block text-gray-600 text-sm font-medium">
                                    Tienda
                                </label>
                                <select
                                    id="tienda_id"
                                    className="w-full border border-gray-300 rounded p-2 mt-1"
                                    {...register("tienda_id", { required: "Seleccionar una tienda es obligatorio" })}
                                >
                                    <option value="">Seleccione una tienda</option>
                                    {tiendas.map((tienda) => (
                                        <option key={tienda._id} value={tienda._id}>
                                            {tienda.nombre}
                                        </option>
                                    ))}
                                </select>
                                {errors.tienda_id && (
                                    <p className="text-red-500 text-xs mt-1">{errors.tienda_id.message}</p>
                                )}
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                    onClick={closeModal}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
