// // server/server.js
// const express = require('express');
// const cors = require('cors');
// const taskRoutes = require('./routes/taskRoutes');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api', taskRoutes);

// const mongoose = require('mongoose');

// mongoose.set('strictQuery', true); // Or false, depending on your preference

// mongoose.connect('mongodb+srv://kunalrawal:kunalrawal@cluster0.7szni.mongodb.net/logintesting', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Could not connect to MongoDB...', err));


// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// // server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const Task = require('./models/Task'); // Import the Task model

// const app = express();
// app.use(express.json()); // To parse JSON bodies
// app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// // MongoDB connection (using your hardcoded connection string)
// mongoose.connect('mongodb+srv://kunalrawal:kunalrawal@cluster0.7szni.mongodb.net/logintesting', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch((err) => {
//   console.error('Failed to connect to MongoDB:', err);
// });


// app.post('/api/tasks', async (req, res) => {
//     try {
//         const newTask = new Task(req.body);
//         await newTask.save();
//         res.status(201).json(newTask);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to add task' });
//     }
// });

// // Route to handle form submission
// app.post('/add-task', async (req, res) => {
//   try {
//     const { title, description } = req.body;

//     // Create a new task
//     const newTask = new Task({
//       title,
//       description
//     });

//     // Save the task to MongoDB
//     await newTask.save();

//     // Log the task data to the terminal
//     console.log('New Task:', newTask);

//     // Send a response back to the client
//     res.status(201).send('Task added successfully');
//   } catch (err) {
//     console.error('Error adding task:', err);
//     res.status(500).send('Server error');
//   }
// });

// // Server setup
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// server.js run success

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors'); // Import CORS
// const Task = require('./models/Task'); // Ensure the correct path to your Task model

// const app = express();
// const PORT = 3001;

// // Middleware
// app.use(cors()); // Enable CORS
// app.use(bodyParser.json());

// // Connect to MongoDB (replace with your connection string)
// mongoose.connect('mongodb+srv://kunalrawal:kunalrawal@cluster0.7szni.mongodb.net/logintesting', { 
//     useNewUrlParser: true, 
//     useUnifiedTopology: true 
// })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

// // Define the POST route for tasks
// app.post('/api/tasks', async (req, res) => {
//     try {
//         const newTask = new Task(req.body); // Create new task instance with request body
//         await newTask.save(); // Save task to MongoDB
//         console.log('New task added:', newTask); // Log the task to the server terminal
//         res.status(201).json(newTask); // Send the saved task back as JSON response
//     } catch (error) {
//         console.error('Error adding task:', error);
//         res.status(500).json({ error: 'Failed to add task' });
//     }
// });

// // Add this endpoint after your existing POST endpoint
// app.get('/api/tasks', async (req, res) => {
//     try {
//         const tasks = await Task.find(); // Fetch all tasks from the database
//         res.status(200).json(tasks); // Return tasks as JSON
//     } catch (error) {
//         console.error('Error fetching tasks:', error);
//         res.status(500).json({ error: 'Failed to fetch tasks' });
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });



// src/server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Ensure CORS is imported
const Task = require("./models/Task"); // Adjust the path as needed

const app = express();
const PORT = process.env.PORT || 3001; // Make sure you're using the right port

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// MongoDB connection
mongoose.connect("mongodb+srv://kunalrawal:kunalrawal@cluster0.7szni.mongodb.net/logintesting", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch(err => {
    console.error("Could not connect to MongoDB:", err);
});

// Define the POST route for adding tasks
app.post("/api/tasks", async (req, res) => {
    const newTask = new Task(req.body);
    try {
        await newTask.save();
        console.log("Task added:", newTask);
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(400).json({ message: "Error adding task", error });
    }
});

app.put('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const updatedTask = req.body;
    try {
      const task = await Task.findByIdAndUpdate(id, updatedTask, { new: true });
      res.json(task);
    } catch (error) {
      res.status(500).send("Error updating task");
    }
  });

// Define the POST route for adding tasks
app.post("/api/tasks", async (req, res) => {
    const newTask = new Task(req.body);
    try {
        await newTask.save();
        console.log("Task added:", newTask);
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(400).json({ message: "Error adding task", error });
    }
});

// Define a GET route to fetch tasks
app.get("/api/tasks", async (req, res) => {
    try {
        const tasks = await Task.find(); // Fetch all tasks
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Failed to fetch tasks" });
    }
});

// Define a DELETE route to delete a task by ID
app.delete("/api/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Failed to delete task" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
