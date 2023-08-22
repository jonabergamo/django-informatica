## API Documentation

### Custom User Management

#### Registration
- **Endpoint**: `/register/`
- **Method**: `POST`
- **Request Body**: 
  - `email`: Email address of the user
  - `name`: Full name of the user
  - `password`: Password of the user
- **Response**: `201 Created` if successful

#### Login
- **Endpoint**: `/login/`
- **Method**: `POST`
- **Request Body**: 
  - `email`: Email address of the user
  - `password`: Password of the user
- **Response**: `200 OK` with `user_id` if successful

### Categories

#### List Categories
- **Endpoint**: `/categories/`
- **Method**: `GET`

### Products

#### List Products
- **Endpoint**: `/products/`
- **Method**: `GET`

#### Get Products by Category
- **Endpoint**: `/products/category/<category_id>/`
- **Method**: `GET`
- **Response**: List of products under the specified category

#### Add Stock
- **Endpoint**: `/products/<product_id>/add_stock/`
- **Method**: `POST`
- **Request Body**: 
  - `quantity`: Quantity to add
- **Response**: `200 OK` if successful

#### Sell Products
- **Endpoint**: `/products/<product_id>/sell/`
- **Method**: `POST`
- **Request Body**: 
  - `quantity`: Quantity to sell
- **Response**: `200 OK` if successful

### Cart Management

#### Add Product to Cart
- **Endpoint**: `/cart/<cart_id>/add_product/`
- **Method**: `POST`
- **Request Body**: 
  - `product_id`: ID of the product
  - `quantity`: Quantity to add (default is 1)
- **Response**: Updated cart data

#### Remove Product from Cart
- **Endpoint**: `/cart/<cart_id>/remove_product/`
- **Method**: `POST`
- **Request Body**: 
  - `product_id`: ID of the product to remove
- **Response**: Updated cart data or `404 Not Found` if the product is not in the cart

#### Checkout
- **Endpoint**: `/cart/<cart_id>/checkout/`
- **Method**: `POST`
- **Response**: Updated cart data and `200 OK` if successful
