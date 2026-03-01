# TESTING_GUIDE.md: Digital PROJET POS

This guide assumes you have `Node.js`/`npm` and `Java 17` installed.

## 1. Running the Backend (Spring Boot)

The Backend relies on MySQL on port `3306`. Make sure you have XAMPP/WAMP/MySQL server running and a database named `spring_db` created.

1. Open a terminal in `mini_projet spring\produits_backend`.
2. Run the application:
   ```bash
   .\mvnw spring-boot:run
   ```
3. The application will start on `http://localhost:8080`.
4. **Data Initialization**: The `DataInitializer` will run on startup and automatically create:
   - **Roles**: `ROLE_ADMIN`, `ROLE_USER`
   - **Admin User**: Username: `admin`, Password: `admin123`
   - **Products**: 3 default products with their image URLs.

## 2. Running the Frontend (Angular)

1. Open a second terminal context in `mini_projet spring\Produit_frontend`.
2. Start the Angular Dev Server:
   ```bash
   npm start
   # Or using CLI:
   ng serve -o
   ```
3. A browser should open automatically on `http://localhost:4200`.

## 3. Testing the Application

### Authentication / Login

- Open `http://localhost:4200/login`.
- Input the pre-initialized admin credentials:
  - **Username**: `admin`
  - **Password**: `admin123`
- If successful, you will be redirected to the Storefront/POS (`/pos`).

### Storefront & POS Checkout (`/pos`)

- The page shows a beautiful Grid of products.
- Click **"Add to Cart"** or the `+` icons to inject items into your virtual cash register panel on the right.
- You can change quantities or click the trash bin to drop them.
- Click **"Print Receipt"**. Notice how it triggers the browser's PDF/Print sheet. Only the black thermal receipt format is printed, while the normal app is hidden out of frame. This is driven by CSS `@media print`.

### Admin Dashboard (`/admin/inventory`)

- Open the application drawer or navigate manually to `/admin`.
- You will see the Administration Dashboard table.
- Here you can manage your inventory visually:
  - Add New Product.
  - See real-time picture previews based on the `Image URL` input field you paste.
  - Delete and Update prices.

### API Security Re-Validation (Manual)

If you try to log out (`AuthService` destroys tokens) and manually type the `/admin` URL, the `AuthGuard` will bounce you back to `/login`. Same goes for testing without `Bearer ...` inside Postman.

Enjoy your finalized POS implementation!
