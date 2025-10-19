const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const dbConfig = {
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password123',
  database: process.env.DB_NAME || 'todoapp',
};

let connection;

async function initDb() {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');
  } catch (error) {
    console.error('Error connecting to database:', error);
    // Retry after 5 seconds
    setTimeout(initDb, 5000);
  }
}

// Routes
app.get('/tasks', async (req, res) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

app.post('/tasks', async (req, res) => {
  console.log('Received POST request to /tasks', req.body);
  const { title } = req.body;
  if (!title) {
    console.log('Title is missing in the request');
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const [result] = await connection.execute(
      'INSERT INTO tasks (title) VALUES (?)',
      [title]
    );
    console.log('Task created with ID:', result.insertId);
    res.status(201).json({ id: result.insertId, title, completed: false });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Error creating task', details: error.message });
  }
});

app.patch('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  
  console.log(`Received PATCH request for task ${id}:`, req.body);

  if (completed === undefined) {
    return res.status(400).json({ error: 'completed field is required' });
  }

  try {
    const [result] = await connection.execute(
      'UPDATE tasks SET completed = ? WHERE id = ?',
      [completed ? 1 : 0, id] 
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    console.log(`Task ${id} updated successfully`);
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Error updating task', details: error.message });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  
  console.log(`Received DELETE request for task ${id}`);

  try {
    const [result] = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    console.log(`Task ${id} deleted successfully`);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Error deleting task', details: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  initDb();
});