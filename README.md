# 📧 Gmail AI Reply – Smart Email Assistant

**Gmail AI Reply** is a Chrome Extension + Full-Stack Application that helps users generate professional and context-aware email replies directly inside **Gmail** using AI.

It provides a **one-click AI Reply button** inside Gmail, connected to a **React.js frontend** and a **Spring Boot backend** powered by **Gemini AI**.

---

## ✨ Features

### 🧑‍💻 User Side
- 📩 **AI Reply Button in Gmail** – Generate email replies instantly inside the Gmail composer.  
- 🎭 **Tone & Language Selector** – Choose formal, casual, or custom tones and languages.  
- 📊 **Word Counter & Spinner** – Displays live word count with a clean loader while AI generates text.  
- 📝 **Copy, Edit, Export** – Copy replies, edit before sending, or save emails locally.  
- 🔔 **Toast Notifications** – Real-time success/error alerts with React Toastify.  

### ⚙️ Backend
- 🤖 **AI Email Generator Service** – Connects with Gemini AI API for response generation.  
- ⚡ **Reactive APIs** – Built using Spring Boot + WebFlux for fast, async handling.  
- 🔐 **Environment Configurable** – Uses `application.properties` for keys, ports, and API configs.  

---

## 💻 Tech Stack

### 🎨 Frontend
- **React.js (Vite)** – Modern frontend framework  
- **Material UI (MUI)** – Styled components for UI  
- **Axios** – REST API calls to backend  
- **React Toastify** – Toast notifications  
- **FileSaver.js** – Save and export email replies  
- **Custom Theme.js** – Centralized styling  

### 🌐 Chrome Extension
- **Chrome Extension API** – Injects button in Gmail UI  
- **Vanilla JavaScript + DOM APIs** – For Gmail interface modification  
- **Custom Components** – Spinner, tone selector, word counter  

### 🌳 Backend
- **Spring Boot** – RESTful backend service  
- **Spring WebFlux** – Non-blocking reactive API handling  
- **Lombok** – Reduces boilerplate code  
- **Maven** – Build and dependency management  
- **Gemini AI API** – Powers AI email generation  

---

## 🛠️ Setup and Installation

### ✅ Prerequisites
- Node.js & npm  
- JDK 17+  
- Maven  
- Chrome Browser  

---

### 1. ⚙️ Backend Setup

    git clone https://github.com/your-username/Gmail-AI-Reply.git
    cd Gmail-AI-Reply/backend

**Run the backend server:**

    mvn clean install
    mvn spring-boot:run

Server runs at: `http://localhost:8080`

---

### 2. 🌐 Frontend Setup

    cd Gmail-AI-Reply/frontend
    npm install

**Create a `.env` file** (in `frontend/`):

    VITE_APP_API_BASE_URL=http://localhost:8080/api

**Run the frontend:**

    npm run dev

Opens at: `http://localhost:5173`

---

### 3. 🧩 Chrome Extension Setup

1. Go to `chrome://extensions/` in your browser.  
2. Enable **Developer Mode**.  
3. Click **Load Unpacked** and select the `extension/` folder.  
4. Open **Gmail**, compose a mail → you’ll see the **AI Reply button** injected.

---

## ⚙️ Technical Implementation

### 🖥️ Frontend
- Built with **React.js + Vite** for a fast dev experience.  
- **MUI** provides a clean, modern interface.  
- **Axios** connects frontend → backend APIs.  
- **React Toastify** used for notifications.  
- **FileSaver.js** enables exporting generated replies.  
- Extension script (in `extension/`) injects the AI Reply UI into Gmail and communicates with the frontend/backend as needed.

### 🔧 Backend
- **Spring Boot + WebFlux** powers async REST APIs.  
- **Controller → Service → API client** layers: `EmailController`, `EmailService`, and a Gemini API integration module.  
- **DTOs** like `EmailRequest` / `EmailResponse` are used to structure requests & responses.  
- **application.properties** reads environment variables for keys and server ports (keep Gemini API key secret).

### 📦 Chrome Extension
- Injects **AI Reply button** into Gmail composer (content script `content.js`).  
- Button triggers API requests → backend → Gemini AI → returns reply.  
- UI includes **tone selector**, **language selector**, **character counter**, **loading spinner**, and **Accept/Reject** actions.  
- Designed to be minimally invasive and compatible with Gmail DOM changes (MutationObserver + debouncing used).

---

## 🚀 Future Enhancements
- 🔐 **Authentication** – User-specific accounts and secure history (JWT, OAuth).  
- 🗂 **Reply History** – Store and categorize AI replies per user.  
- 📤 **Direct Send** – Option to send AI replies directly via Gmail API (with user consent).  
- 📊 **Analytics Dashboard** – Track tones, word usage, and user patterns.  
- 🛡 **Rate Limiting & Cost Controls** – Prevent excessive calls to Gemini and give usage insights.

---

## 📸 Screenshots

> Replace these placeholders with real screenshots (drop files in `frontend/assets/` or `docs/assets/`).

- **AI Reply Button in Gmail**  
  ![AI Reply Button](./assets/ai-reply-button.png)

- **Generated Reply Example**  
  ![Generated Reply](./assets/generated-reply.png)

- **Dashboard / History (Frontend)**  
  ![Dashboard](./assets/dashboard.png)

---

## 🎬 Demo Video (optional)
Embed your demo video once uploaded to YouTube:

- Demo: **Gmail AI Reply — Quick demo**  
  `https://youtu.be/your-demo-video-id`  
You can replace the link above and add an embedded video in GitHub README if desired.

---

## 📁 Project Folder Structure

    📧 Gmail AI Reply Project

    ├── backend/
    │   ├── src/main/java/com/email/
    │   │   ├── EmailWriterApplication.java
    │   │   ├── controller/EmailController.java
    │   │   ├── service/EmailService.java
    │   │   └── dto/EmailRequest.java
    │   ├── src/main/resources/
    │   │   └── application.properties
    │   └── pom.xml

    ├── frontend/
    │   ├── src/
    │   │   ├── components/
    │   │   │   ├── Dashboard.jsx
    │   │   │   ├── Generator.jsx
    │   │   │   ├── History.jsx
    │   │   │   └── Theme.js
    │   │   ├── App.jsx
    │   │   ├── index.css
    │   │   └── main.jsx
    │   └── package.json

    ├── extension/
    │   ├── content.js       # Injects AI Reply button in Gmail
    │   ├── manifest.json
    │   └── styles.css

    ├── assets/             # screenshots, icons
    └── README.md

---

## 📄 License
This project is licensed under the **MIT License**.

---

## 👨‍💻 Author
Built with 💻 by **Aditya Iche** – [GitHub](https://github.com/adiTyaIcHe07)

---
