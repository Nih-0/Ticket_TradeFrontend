# Ticket Trade Frontend 🎟️

This is the **React-based frontend** for **Ticket Trade**, a platform where users can buy, list, and exchange tickets for trains, movies, buses, and events. This project is built with **React**, **Tailwind CSS**, and **React Router**, and integrates with a Spring Boot backend.

## 🚀 Features

- 🔐 JWT Authentication (via Spring Security in backend)
- 🧾 Buy and List tickets across different categories
- 🎫 Conditional form fields based on ticket type
- 🧭 Smooth routing using React Router
- 📬 Contact & Report system using EmailJS
- 💡 Responsive design using Tailwind CSS

## 📁 Pages

- `HomePage`: Landing page for users
- `LoginPage`: Secure login page
- `AboutUs`: Info about the platform
- `ContactUs`: Reach out to the team or report misuse
- `BuyTickets`: Browse and buy available tickets
- `ListTickets`: List your ticket for sale or swap

## 📦 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, React Router
- **Backend**: Spring Boot (see [Ticket_Trade Backend](https://github.com/Nih-0/Ticket_Trade))
- **Authentication**: JWT
- **Email Integration**: EmailJS

## 🧠 Ticket Categories & Form Logic

Forms dynamically update based on the selected category:

### 🎟️ Ticket Categories:
1. **Train**
   - Train Name
   - Train Number
   - Coach No.
   - Seat No.
   - Passenger Name
   - Quota

2. **Event**
   - Event Type (Concert, Show, etc.)
   - People Capacity
   - Ticket Code

3. **Movie**
   - Seat No.
   - Screen No.
   - Booking ID

4. **Bus**
   - Pickup Location
   - Drop Location
   - Booking ID
   - Bus Name

## 🛠️ How to Run Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/Nih-0/Ticket_TradeFrontend.git
   cd Ticket_TradeFrontend
