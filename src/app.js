import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import taskRoutes from './routes/task.routes.js'
import authRoutes from './routes/auth.routes.js'
import productoRoutes from './routes/producto.routes.js'
import tiendaRoutes from './routes/tienda.routes.js'
import clienteRoutes from './routes/cliente.routes.js'

const app = express()

// Configuración de middlewares
app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

// Configuración de rutas
app.use('/api/tasks',taskRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/productos', productoRoutes)
app.use('/api/tiendas', tiendaRoutes)
app.use('/api/clientes', clienteRoutes)

app.get('/', (req, res) => {
    res.send('<h1> Hola Mundo en UTP 2024 </h1>')
})

export default app