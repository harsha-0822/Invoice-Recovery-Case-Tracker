# 📌 Invoice Recovery Case Tracker

A full-stack internal CRM tool for managing clients, unpaid invoices, and recovery follow-up cases.  
Built as part of the **PayAssured internship assignment** and extended for real project use.

---

## 🔥 Features  
The system allows internal teams to:

- Add and manage clients  
- Create and track recovery cases  
- Record follow-up actions  
- Filter & sort cases  
- Update case status  
- Receive email notifications (SMTP-based)

---

## 🚀 Tech Stack

### **Frontend (React + Node.js)**
- React.js  
- Axios  
- React Router  
- CSS  

### **Backend (Python + Flask)**
- Flask  
- MySQL Connector  
- Flask-CORS  
- Python smtplib (Email notifications)

### **Database**
- MySQL  

---

## 📂 Project Folder Structure

json ```
invoice-recovery-case-tracker/
│
├── backend/
│ ├── app.py
│ ├── db.py
│ ├── mail.py
│ ├── requirements.txt
│ ├── .env
│ └── routes/
│ ├── clients.py
│ └── cases.py
│
├── frontend/
│ ├── public/
│ ├── node_modules/
│ ├── package.json
│ ├── package-lock.json
│ └── src/
│ ├── api.js
│ ├── App.js
│ ├── App.css
│ ├── index.js
│ ├── index.css
│ ├── components/
│ │ └── Navbar.jsx
│ └── pages/
│ ├── CaseList.jsx
│ ├── CaseDetail.jsx
│ ├── CreateCase.jsx
│ └── CreateClient.jsx
│
├── screenshots/
│ ├── case-list.png
│ ├── case-detail.png
│ ├── create-client.png
│ ├── create-case.png
│ ├── client-created.png
│ ├── case-created.png
│ ├── db-schema.png
│
└── README.md


---

## 🗄️ Database Schema

### **Table: clients**

| Field          | Type           | Key | Extra           |
|----------------|----------------|-----|-----------------|
| id             | int            | PK  | auto_increment  |
| client_name    | varchar(100)   |     |                 |
| company_name   | varchar(100)   |     |                 |
| city           | varchar(100)   |     |                 |
| contact_person | varchar(100)   |     |                 |
| phone          | varchar(20)    |     |                 |
| email          | varchar(100)   |     |                 |

### **Table: cases**

| Field               | Type            | Key | Extra          |
|--------------------|-----------------|-----|----------------|
| id                 | int             | PK  | auto_increment |
| client_id          | int             | FK -> clients.id |
| invoice_number     | varchar(100)    |     |                |
| invoice_amount     | decimal(10,2)   |     |                |
| invoice_date       | date            |     |                |
| due_date           | date            |     |                |
| status             | varchar(50)     |     |                |
| last_follow_up_notes | text          |     |                |

---

## 🔌 API Endpoints

### **Clients**
| Method | Endpoint   | Description        |
|--------|------------|--------------------|
| POST   | /clients   | Create new client  |
| GET    | /clients   | Get all clients    |

### **Cases**
| Method | Endpoint          | Description               |
|--------|-------------------|---------------------------|
| POST   | /cases            | Create recovery case      |
| GET    | /cases            | List all cases            |
| GET    | /cases/<id>       | Case details              |
| PATCH  | /cases/<id>       | Update status/notes       |

---

## 📧 Email Notifications (SMTP)

Notifications are sent when:

- A **new client** is created  
- A **new case** is created  

Uses Python `smtplib`.

### **.env Configuration**

EMAIL=your_gmail@gmail.com

EMAIL_PASSWORD=your_app_password


Generate Gmail App Password:  
**Google Account → Security → App Passwords**

---

## 🛠️ Backend Setup


cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py


Backend runs at:

👉 **http://localhost:5000**

---

## 🖥️ Frontend Setup

cd frontend
npm install
npm start


Frontend runs at:

👉 **http://localhost:3000**

---

## 🖼️ Screenshots

Include these inside `/screenshots` folder:

- ✔ Case List Page  
- ✔ Case Detail Page  
- ✔ Create Client Page  
- ✔ Create Case Page  
- ✔ Client Created Popup  
- ✔ Case Created Popup  
- ✔ Database schema / Sample rows  

---

## 🚀 How to Run Full Project


### **Start Backend**
cd backend
venv\Scripts\activate
python app.py


### **Start Frontend**
cd frontend
npm start


### **Open in browser**
👉 **http://localhost:3000**

---

## Create Client
![Create Client](/screenshots/create_client_form.png)

## Client Created Successfully
![Client Created](/screenshots/client_created_successfully.png)

## Create Case
![Create Case](/screenshots/create_case_form.png)

## Case Created Successfully
![Case Created](/screenshots/case_created_successfully.png)

## Case List View
![Case List](/screenshots/case_list_view.png)

## Case Details
![Case Details](/screenshots/case_details_update_view.png)

## MySQL Tables
![MySQL Tables](/screenshots/mysql_tables_structure.png)

## Clients Table Data
![Clients Table](/screenshots/mysql_clients_table_data.png)

## Frontend Running Successfully
![Frontend Compilation](/screenshots/frontend_server_running.png)

## Backend Running Successfully
![Backend Compilation](/screenshots/backend_server_running.png)
