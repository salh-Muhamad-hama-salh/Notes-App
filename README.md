Backend Overview
The backend is built with Node.js and Express, providing a RESTful API for managing notes. It connects to a MongoDB database and includes middleware for rate limiting and configuration for Upstash (likely for caching or rate limiting).

Main Components
server.js: Entry point of the backend application. Sets up Express, connects to MongoDB, applies middleware, and mounts routes.

config/db.js: Handles MongoDB connection setup using environment variables.

config/upstash.js: Configuration for Upstash, which may be used for caching or rate limiting.

Controller/notes.controller.js: Contains logic for handling note-related requests (CRUD operations).

middleware/rateLimiter.js: Middleware to limit the rate of incoming requests, protecting the API from abuse.

models/Notes.model.js: Mongoose schema and model definition for notes stored in MongoDB.

Route/notes.route.js: Defines API endpoints for notes (e.g., create, read, update, delete), and connects them to the controller functions.

How It Works
Initialization: The server starts and connects to MongoDB using the configuration in config/db.js.
Middleware: Rate limiting is applied to incoming requests via middleware/rateLimiter.js.
Routing: Requests to /notes are handled by the routes defined in Route/notes.route.js, which call functions in Controller/notes.controller.js.
Data Handling: Notes are stored and retrieved from MongoDB using the schema in models/Notes.model.js.
Environment Variables: Sensitive information (like database URI) is stored in a .env file and loaded at runtime.
Typical API Endpoints
GET /notes: Retrieve all notes
POST /notes: Create a new note
PUT /notes/:id: Update a note
DELETE /notes/:id: Delete a note
