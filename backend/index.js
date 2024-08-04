require('dotenv').config()
const express = require('express')
const { Pool } = require('pg');
const app = express()
const cors = require('cors')
const port = process.env.BACK_PORT || 4444

app.use(cors({
  origin: process.env.NGINX_PORT ?
    [`http://localhost:${process.env.FRONT_PORT}`, `http://localhost:${process.env.NGINX_PORT}`] : 
    [`http://localhost:${process.env.FRONT_PORT}`],
  exposedHeaders: ['Content-Type', 'API-Key', 'Authentication'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  // maxAge: 86400
  credentials: true,
}));

app.use(express.json())

app.get('/', (req, res) => {
    res.send('It works')
})

app.post('/api', (req, res) => {
    console.log(req.body)
    res.json({msg: 'works lol'})
})

// Конфигурация базы данных PostgreSQL
const pool = new Pool({
    user: process.env.POSTGRES_USER, // Пользователь базы данных
    host: process.env.POSTGRES_HOST, // Хост базы данных (обычно localhost)
    database: process.env.POSTGRES_DB, // Название базы данных, которую мы создали
    password: process.env.POSTGRES_PASSWORD, // Пароль пользователя postgres
    port: process.env.POSTGRES_PORT, // Порт PostgreSQL
  });
  
// Простой запрос к базе данных для проверки
pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'", (err, result) => {
    if (err) {
        console.error('Ошибка выполнения запроса:', err);
    } else {
        console.log('(Работает) Результат запроса:', result.rows);
    }
});

app.listen(port, () => {
    console.log(`server in running on port: ${port}`)
})