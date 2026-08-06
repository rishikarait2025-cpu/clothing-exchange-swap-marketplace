# Clothing Swap

A full-stack clothing exchange marketplace built with Django and React.

## Project Overview

Clothing Swap is a community platform for listing, browsing, and swapping clothing items. Users can register, log in, list clothing for swap, browse available items, send and manage swap requests, chat with other users, and view their profile.

## Tech Stack

- Backend: Django 6.0.6
- Database: SQLite (`db.sqlite3`)
- Frontend: React 19.2.7
- Styling: Bootstrap 5.3.8
- HTTP client: Axios
- Routing: React Router DOM 7.17.0
- CORS: `django-cors-headers`

## Key Features

- User registration and login
- Add clothing listings with image upload
- Browse available clothing from other users
- Location-based listing search
- Send and manage swap requests
- Accept or reject incoming swap requests
- Real-time negotiation chat between users
- User profile showing listing and swap statistics
- Item detail view with request action
- Edit and delete own listings

## Project Structure

```
clothing_swap/
├── backend/
│   ├── backend/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── manage.py
│   └── env/   # local Python virtual environment
├── frontend/
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── App.js
│       ├── components/
│       │   └── Navbar.jsx
│       └── pages/
│           ├── AddListing.jsx
│           ├── BrowseListings.jsx
│           ├── Chat.jsx
│           ├── Dashboard.jsx
│           ├── ItemDetail.jsx
│           ├── Login.jsx
│           ├── MyListings.jsx
│           ├── OutgoingSwaps.jsx
│           ├── Profile.jsx
│           ├── Register.jsx
│           └── SwapRequests.jsx
├── marketplace/
│   ├── models.py
│   ├── views.py
│   └── urls.py
├── db.sqlite3
└── media/
    └── clothes/
```

## Backend Details

### Django App
- App name: `marketplace`
- Models:
  - `ClothingItem`: owner, title, brand, category, size, condition, description, value, location, image, status
  - `SwapRequest`: sender, receiver, requested_item, status, created_at
  - `ChatMessage`: sender, receiver, message, created_at

### Backend endpoints
Base API URL: `http://127.0.0.1:8000/api/`

- `register/` — create a new user
- `login/` — authenticate an existing user
- `add-item/` — add a new clothing listing
- `my-listings/` — fetch listings owned by the logged-in user
- `all-listings/` — fetch available items from other users
- `send-swap-request/` — request a swap for an item
- `incoming-swaps/` — fetch incoming swap requests
- `update-swap/` — accept or reject a swap request
- `calculate-value/` — estimate a swap value based on brand/category/condition
- `outgoing-swaps/` — fetch swap requests sent by the user
- `item/<int:item_id>/` — fetch item details
- `send-message/` — send chat messages
- `get-messages/` — load chat messages between two users
- `delete-item/<int:item_id>/` — delete a user listing
- `update-item/<int:item_id>/` — update an existing listing
- `profile/` — fetch user profile stats

## Frontend Pages

- `/` — Login
- `/register` — Register
- `/dashboard` — Dashboard navigation
- `/browse` — Marketplace browsing
- `/add-listing` — Add a clothing listing
- `/my-listings` — Manage own listings
- `/swap-requests` — Incoming swap requests
- `/outgoing-swaps` — Sent swap requests
- `/item/:id` — Item detail and swap request page
- `/chat` — Chat with another user
- `/profile` — Profile summary

## Setup Instructions

### Backend

1. Open a terminal in `c:\Users\RISHU\Desktop\clothing_swap`
2. Activate the Python virtual environment:
   - PowerShell: `env\Scripts\Activate.ps1`
   - Command Prompt: `env\Scripts\activate.bat`
3. Install dependencies if needed:
   - `pip install django django-cors-headers pillow`
4. Run migrations:
   - `python manage.py migrate`
5. Start the development server:
   - `python manage.py runserver`

### Frontend

1. Open a terminal in `c:\Users\RISHU\Desktop\clothing_swap\frontend`
2. Install dependencies if needed:
   - `npm install`
3. Start the React app:
   - `npm start`

## Notes

- The backend is configured for development: `DEBUG = True`, `ALLOWED_HOSTS = []`, and CORS allows all origins.
- Image uploads are stored under `media/clothes/`.
- The frontend stores the authenticated username in `localStorage` for session handling.
- The app currently uses SQLite for local development.

## Recommended Improvements

- Add production-ready authentication (JWT/session cookies)
- Add input validation and better error handling on frontend forms
- Secure `SECRET_KEY` and production `ALLOWED_HOSTS`
- Add automated tests for backend and frontend
- Document required Python package versions in `requirements.txt`
