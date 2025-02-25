# AI-Powered Job Application Tracker

## Overview
The **AI-Powered Job Application Tracker** is a full-stack application designed to help users track their job applications efficiently. It includes features such as job application management, AI-driven resume feedback, and job recommendations.

## Features
- **User Authentication:** Secure user authentication using JWT tokens.
- **Job Application Tracking:** Users can create, update, and delete job applications.
- **AI Resume Feedback:** Provides automated resume improvement suggestions.
- **Job Recommendations:** Fetches job listings from a third-party API based on user skill queries.
- **Responsive UI:** Built with modern frontend technologies for an intuitive user experience.

## Tech Stack
### Frontend
- **React (Vite) + Tailwind CSS**: For fast, responsive UI development.
- **React Router**: For navigation between pages.
- **Axios**: For handling API requests.

### Backend
- **Django + Django REST Framework**: For building a robust API.
- **PostgreSQL**: For storing user and job application data.
- **Simple JWT**: For authentication and token management.
- **Third-Party API (RapidAPI - JSearch)**: For job recommendations.
- **django-cors-headers**: For CORS.

## Installation
### Prerequisites
Ensure you have the following installed:
- **Node.js** (for frontend)
- **Python 3 & pip** (for backend)
- **PostgreSQL** (for database management)

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-url.git
   cd backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source <virtual-environment-name>/bin/activate  # On Windows: <virtual-environment-name>\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Apply migrations and start the server:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   python manage.py runserver
   ```
5. Create a superuser (optional):
   ```bash
   python manage.py createsuperuser
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend application:
   ```bash
   cd job-tracker-frontend
   npm run dev
   ```

## API Endpoints
### Authentication
- `POST /api/register/` - User registration
- `POST /api/token/` - Obtain JWT token
- `POST /api/token/refresh/` - Refresh JWT token

### Job Applications
- `GET /api/job-applications/` - List user job applications
- `POST /api/job-applications/` - Creates a new job application
- `GET /api/job-applications/{id}/` - Retrieves job application details
- `PUT /api/job-applications/{id}/` - Updates a job application
- `DELETE /api/job-applications/{id}/` - Deletes a job application

### AI-Powered Features
- `POST /api/resume-feedback/` - Gets resume improvement suggestions
- `GET /api/job-recommendations/?query={query}` - Fetches job recommendations based on user's skill

## Usage
1. **Register/Login** to the application.
2. **Add Job Applications** with relevant details.
3. **Track Application Status** and update as needed.
4. **Use Resume Feedback** to improve your job applications.
5. **Get Job Recommendations** tailored to your profile.

## Environment Variables
Create a `.env` file in the backend directory with the following:
```env
DB_NAME=<your-database-name>
DB_PASSWORD=<your-database-password>
DB_PORT=<your-database-port>
DB_HOST=<your-database-host>
DB_USER=<your-database-user>
RAPIDAPI_KEY=<your_rapidapi_key>
```

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## Author
Abiona Samuel Olawuyi(samuelo.abiona@gmail.com)

## License
This project is licensed.

