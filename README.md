# E-commerce Shopping Cart Application

This is an e-commerce shopping cart application built using ReactJS for the frontend, Tailwind CSS for styling, NodeJS and ExpressJS for the backend, and MongoDB for the database. The application allows users to browse products, add items to their cart, manage the cart, and apply discounts.

## Table of Contents
1. [Features](#features)
2. [Demo](#demo)
3. [Setup and Installation](#setup-and-installation)
4. [Technology Stack](#technology-stack)
5. [File Structure](#file-structure)
6. [Usage](#usage)

## Features

- **Product Listing Page**: 
  - Displaying products in a grid layout.
  - Each product card have image, name, price, and an "Add to Cart" button.

- **Add to Cart Functionality**:
  - Add products to the cart.
  - The cart item count updates in the navbar.

- **Cart Page**:
  - Displays the added products with images, names, prices, and quantity selectors.
  - Allows users to adjust quantities and remove items.
  - Shows a summary with subtotal, discount options, and total price.

- **Discounts**:
  - Supports fixed and percentage-based discounts.

## Demo

You can view a live demo of the application [here](https://ecommerce-application-swart.vercel.app/).

## Setup and Installation

### Prerequisites
- NodeJS (v14 or higher)
- MongoDB

### Installation Steps

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/Etika8445/Ecommerce_Application.git
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Set Up Environment Variables**:
    - Create a `.env` file in the root directory.
    - Add the following variables:
      ```plaintext
      MONGO_URI=your_mongodb_connection_string
      PORT=5000
      ```

4. **Run the Backend Server**:
    ```bash
    npm start
    ```

5. **Run the Frontend**:
    ```bash
    npm run dev
    ```

6. **Access the Application**:
    - The application will be available at `http://localhost:5173`.


## Technology Stack

- **Frontend**: 
  - **ReactJS**: JavaScript library for building user interfaces.
  - **Tailwind CSS**: Utility-first CSS framework for styling.

- **Backend**: 
  - **NodeJS**: JavaScript runtime for server-side development.
  - **ExpressJS**: Web application framework for NodeJS.

- **Database**:
  - **MongoDB**: NoSQL database for storing product and cart data.

- **Build Tool**:
  - **Vite**: Fast development build tool for modern web projects.

## Usage

### Product Listing:

- Browse products on the homepage.
- Click on "Add to Cart" to add items to the cart.

### Cart Management:

- Go to the Cart page to view all added items.
- Adjust quantities or remove items as needed.
- Apply discount codes if available.





