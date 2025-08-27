# Job Application Portal

A Node.js + Express + MySQL based application for managing job applications.

---

## Setup & Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/amar2610/job-application-portel.git
    cd job-application-portel
    ```
2. Install dependencies:
   npm install

3. Setup environment variables:
   Copy .env.example to .env
   Update values as per your setup

4. Run database migrations (if using Sequelize):
   cd app
   npx sequelize db:migrate
   npx sequelize db:seed:all

5. Start the application:
   cd..
   npm start

## API Documentation

For Registration
**POST** `/api/v1/register`  
 Request:

```json
    {
    "name": "Amar",
    "email": "amar@example.com",
    "password": "123456"
    }

Response:
    {
    "message": "User registered successfully",
    }
```

For Login
**POST** `api/v1/login`
Request:

```json
{
"email": "amar@example.com",
"password": "123456"
}

Response:
{
  "status": true,
  "message": "Login Success",
  "data": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRmMzA5ZTY5LWZiMTEtNDgxMS1hYWVjLTBkMjE3YzQyNDhmZCIsImVtYWlsIjoiYW1hckBnbWFpbC5jb20iLCJpYXQiOjE3NTYyNzY3MDMsImV4cCI6MTc1NjM2MzEwM30.wpHi3Xp4a-e6dvzVPlUhQk_W1u5atcastQB_OhmKu0Q",
      "userData": {
          "name": "amar",
          "email": "amar@gmail.com"
      }
  }
}
```

For Upoload Resume
**POST** `/api/v1/resume/upload`  
Request Headers:

Authorization: <accessToken>
Content-Type: multipart/form-data
Request:
file: image.pdf

Response:

```json
{
    "message": "Resume uploaded successfully!",
    "file": "1756277821447-44830840.pdf",
    "path": "uploads\\resumes\\1756277821447-44830840.pdf"
}
```

Response (Unauthorized – Missing/Invalid Token):

```json
{
    "message": "Unauthorized access."
}
```

For Get List Of A Jobs
**GET** `/api/v1/jobs`  
Request Headers:

Authorization: <accessToken>

Response:

```json
{
    "data": [
        {
            "id": "a3e7e5a2-5cc3-42b0-a7f5-2df0cb2b9b7f",
            "title": "Full Stack Developer",
            "companyName": "google",
            "email": "support@google.com",
            "createdAt": "2025-08-20T10:01:00.000Z",
            "updatedAt": "2025-08-20T10:01:00.000Z",
            "deletedAt": null
        },
        {
            "id": "ad314590-d16a-4b32-91e3-7f81c23a871a",
            "title": "Android Developer",
            "companyName": "Meta",
            "email": "meta@support.com",
            "createdAt": "2025-08-20T10:04:00.000Z",
            "updatedAt": "2025-08-20T10:04:00.000Z",
            "deletedAt": null
        },
        {
            "id": "b6e1f943-6a89-4cb7-a032-0f539be6f94f",
            "title": "ReactJs Developer",
            "companyName": "Amazon",
            "email": "aws-support@amazon.com",
            "createdAt": "2025-08-20T10:03:00.000Z",
            "updatedAt": "2025-08-20T10:03:00.000Z",
            "deletedAt": null
        },
        {
            "id": "c9f3c4e7-bf3e-4b71-a9c3-ec839e637c8b",
            "title": "NodeJs Developer",
            "companyName": "Microsoft",
            "email": "info@microsoft.com",
            "createdAt": "2025-08-20T10:02:00.000Z",
            "updatedAt": "2025-08-20T10:02:00.000Z",
            "deletedAt": null
        },
        {
            "id": "f1c8b2a1-9ef1-4c9e-8101-4db614cc1c91",
            "title": "Backend Developer",
            "companyName": "openAi",
            "email": "contact@openai.com",
            "createdAt": "2025-08-20T10:00:00.000Z",
            "updatedAt": "2025-08-20T10:00:00.000Z",
            "deletedAt": null
        }
    ]
}
```

Response (Unauthorized – Missing/Invalid Token):

```json
{
    "message": "Unauthorized access."
}
```

For Get Resumes
**GET** `/api/v1/resume`  
Request Headers:

Authorization: <accessToken>
Response:

```json
{
    "message": "Resume found",
    "resumes": [
        {
            "resumeId": "b6a54d1b-93db-417d-8ef9-51ca7ceb6c95",
            "url": "http://localhost:5001/uploads/resumes/1756277821447-44830840.pdf"
        }
    ]
}
```

Response (Unauthorized – Missing/Invalid Token):

```json
{
    "message": "Unauthorized access."
}
```

For Apply For Job
**POST** `/api/v1/apply`  
Request Headers:

Authorization: <accessToken>
Request:

```json
{
    "jobId": "c9f3c4e7-bf3e-4b71-a9c3-ec839e637c8b",
    "resumeId": "d87a8e19-cebd-4521-abe4-7cd51e693a00"
}
```

Response:

```json
{
    "message": "Apply Successfully",
    "data": {
        "ApplicationNumber": "ac7a955e-f830-4167-9a1e-3aee4547bf92"
    }
}
```

Response (Unauthorized – Missing/Invalid Token):

```json
{
    "message": "Unauthorized access."
}
```

For Get All Application list
**GET** `/api/v1/applications`  
Request Headers:

Authorization: <accessToken>

Response:

```json
{
    "message": "succes!",
    "data": [
        {
            "applicationId": "ac7a955e-f830-4167-9a1e-3aee4547bf92",
            "applicantName": "amar",
            "jobName": "NodeJs Developer",
            "resumePath": "http://localhost:5001/uploads/resumes/1756279470546-106668073.pdf"
        }
    ]
}
```

Response (Unauthorized – Missing/Invalid Token):

```json
{
    "message": "Unauthorized access."
}
```
