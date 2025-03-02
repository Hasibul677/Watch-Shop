# Watch Shop

Welcome to the Watch Shop project! This application allows users to browse and shop for watches, with full authentication features including sign-in and sign-up.

## Features
- User authentication (sign in and sign up)
- User registration with form validation
- Responsive design using Tailwind CSS

## Installation

Follow these steps to get the project up and running locally.

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v20)
- [npm](https://www.npmjs.com/)

### Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/Hasibul677/Watch-Shop.git


### Navigate to the project directory
cd Watch-Shop

### Install dependencie
npm install \
  @heroicons/react@^2.1.5 \
  @radix-ui/react-avatar@^1.1.0 \
  @radix-ui/react-checkbox@^1.1.1 \
  @radix-ui/react-icons@^1.3.0 \
  @radix-ui/react-label@^2.1.0 \
  @radix-ui/react-slider@^1.2.0 \
  @radix-ui/react-slot@^1.0.2 \
  @radix-ui/react-switch@^1.1.0 \
  @radix-ui/react-tabs@^1.1.0 \
  @stripe/stripe-js@^4.1.0 \
  axios@^1.7.2 \
  bcryptjs@^2.4.3 \
  cloudinary@^2.2.0 \
  dotenv@^16.4.5 \
  formidable@^3.5.1 \
  framer-motion@^11.3.19 \
  lucide-react@^0.364.0 \
  mongodb@^6.8.0 \
  mongoose@^8.2.4 \
  multer@^1.4.5-lts.1 \
  multer-storage-cloudinary@^4.0.0 \
  next-auth@^4.24.7 \
  next-cloudinary@^6.6.2 \
  react-dropzone@^14.2.3 \
  react-hot-toast@^2.4.1 \
  react-icons@^5.2.1 \
  react-swipeable@^7.0.1 \
  stripe@^16.2.

### Start the development server
npm run dev

### Navigate to the project directory
cd Watch-Shop

### Project Structure
Watch-Shop/
├── /pages               # Contains route components for Next.js
├── /api                 # API routes for backend logic
├── /auth                # User authentication pages (sign-in, sign-up)
├── /components          # Reusable UI components
├── /utils               # Utility functions and helpers
├── /styles              # Global and component-level styles (Tailwind CSS)
├── /public              # Static files (images, fonts, etc.)
├── .env.local           # Environment variables (create this file)
├── next.config.js       # Next.js configuration
├── package.json         # Project dependencies
└── README.md            # Project documentation
