# Lead Management System

## Introduction
The Lead Management System streamlines the process of capturing, storing, and viewing potential customer leads.  
It serves as a centralized platform for sales and marketing teams to manage incoming leads efficiently, facilitating better follow-up and conversion rates.

---

## Goal of the System
- Capture new leads through a structured form.  
- Store validated lead data in a database.  
- View all leads in a dynamic list sorted by creation date.  
- Support efficient sales and marketing workflows.

---

## Core Functionality

### Lead Capture
Users can add new leads through a dedicated form that collects:
- **Full Name** – The prospective customer's name.  
- **Email Address** – The customer’s primary email.  
- **Phone Number** – The customer’s contact number (10 digits).  

**Validation Rules:**
- Name: Must not be empty.  
- Email: Must be a valid format.  
- Phone: Must be exactly 10 digits (whitespace ignored).  

On successful submission:  
- The new lead is saved in the backend database.  
- The lead list is automatically refreshed.

---

### Lead Display
All captured leads are displayed in a list format showing:  
- **Name** – Full name of the lead.  
- **Email** – Lead’s email address.  
- **Phone** – Lead’s phone number.  
- **Status** – Lead status (`New`, `Contacted`, `Qualified`, `Lost`). Default is `New`.  
- **Capture Date** – Date and time the lead was added.  

The list is ordered with the **most recent leads at the top**.  
It includes **loading indicators** and **error messages** for better user experience.

---

## Architecture Overview
The Lead Management System follows a **client-server architecture**.

### Client-Side (React)
- **App.jsx** – Root component. Manages leads, loading status, errors. Fetches leads on mount and refreshes list on new lead addition.  
- **LeadForm.jsx** – Input form for new leads. Handles validation and sends POST requests to backend. Calls `onLeadAdded` to refresh list.  
- **LeadList.jsx** – Displays fetched leads, loading states, errors. Includes `StatusBadge` for lead status visualization.  
- **index.html** – Entry HTML file for React app.  
- **main.jsx** – Renders the `App` component into the DOM.  
- **index.css** – Global CSS (Tailwind CSS setup).  
- **tailwind.config.js** – Tailwind configuration file.  

### Server-Side (Node.js/Express)
- **server.js** – Initializes Express app, sets middleware (CORS, JSON parsing), connects to MongoDB, defines API routes.  
- **routes/leadRoutes.js** – Defines API endpoints:  
  - `POST /api/leads` – Create new lead.  
  - `GET /api/leads` – Retrieve all leads.  
- **controllers/leadController.js** – Business logic:  
  - `createLead` – Validates data, checks duplicates, saves lead.  
  - `getLeads` – Fetches all leads sorted by creation date.  
- **models/Lead.js** – Mongoose schema for Lead document: `name`, `email`, `phone`, `status`, `createdAt`.

---

## Integration Points
- **Client-Server Communication** – React frontend communicates with Node.js backend via HTTP requests.  
  - `LeadForm` → `POST /api/leads`  
  - `LeadList` → `GET /api/leads`  
  - API base URL: `http://localhost:5001/api/leads` (defined in `App.jsx`).  

- **Database Interaction** – Backend uses MongoDB with Mongoose.  
  - `Lead` model defines structure and validation of lead documents.  

---

## Tech Stack
- **Frontend** – React, Tailwind CSS  
- **Backend** – Node.js, Express  
- **Database** – MongoDB (Mongoose ODM)  

---

## Future Enhancements
- Authentication for secure access.  
- Lead editing and deletion.  
- Advanced filtering and search.  
- Integration with CRM systems.  
