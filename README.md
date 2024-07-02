# task_managementThis code snippet sets up an Express server with MongoDB integration using Mongoose and sends emails using Nodemailer. The main functionalities include:

Serving a Static HTML File: Serves an HTML file task.html when the root URL is accessed.
Adding Tasks: Allows users to add tasks via a POST request to the /add_task endpoint. The task details are saved in a MongoDB database, and a confirmation email is sent to the specified email address.
Fetching Tasks: Retrieves and displays all tasks stored in the MongoDB database when the /getTask endpoint is accessed.
Defines a schema taskSchema for the tasks with date, tasks, and email_id fields.
Creates a model Employee from the schema to interact with the employees collection in MongoDB.
Serves the task.html file when the root URL (/) is accessed.
Handles POST requests to /add_task.
Creates a new Employee document from the request body and saves it to the database.
Sends a confirmation email using Nodemailer with the provided email ID and task details.
Handles and logs any errors during the process.
Handles GET requests to /getTask.
Fetches all documents from the employees collection and returns them as JSON.
Starts the server and listens on the specified port (8015).
Logs a message indicating that the server is running.
This code sets up a basic server to manage tasks, save them to a database, and send confirmation emails upon task addition.





