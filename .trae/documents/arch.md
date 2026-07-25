
## 1. Architecture Design
```mermaid
graph TD
    Frontend[Next.js 15 Frontend] --> Backend[Node.js/Express Backend]
    Backend --> MongoDB[(MongoDB Atlas)]
    Frontend --> Cloudinary[Cloudinary (Image Storage)]
    Backend --> Stripe[Stripe Payment]
    Backend --> Razorpay[Razorpay Payment]
    Backend --> Nodemailer[Nodemailer]
```

## 2. Technology Description
- Frontend: Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion + GSAP + Lenis + React Hook Form + Zod + Axios + React Icons + Lucide React + Swiper.js + Shadcn UI + Radix UI + Zustand + TanStack Query
- Backend: Node.js + Express.js + TypeScript + Mongoose + JWT + Bcrypt + Multer + Cloudinary + Nodemailer + Stripe + Razorpay
- Database: MongoDB Atlas
- Deployment: Vercel (Frontend), Render/Railway (Backend)

## 3. Route Definitions
| Route | Purpose |
|-------|---------|
| / | Homepage |
| /shop | Shop page with filters |
| /product/[id] | Product details page |
| /auth/login | Login page |
| /auth/signup | Signup page |
| /user/dashboard | User dashboard |
| /admin | Admin dashboard |

## 4. API Definitions
### Auth
- POST /api/auth/signup
- POST /api/auth/login
- POST /api/auth/forgot-password
- POST /api/auth/verify-otp

### Products
- GET /api/products
- GET /api/products/:id
- POST /api/products (admin)
- PUT /api/products/:id (admin)
- DELETE /api/products/:id (admin)

### Orders
- GET /api/orders (user/admin)
- POST /api/orders (user)
- PUT /api/orders/:id/status (admin)

## 5. Server Architecture Diagram
```mermaid
graph TD
    Client[Client] --> Routes[Express Routes]
    Routes --> Controllers[Controllers]
    Controllers --> Services[Services]
    Services --> Models[Mongoose Models]
    Models --> MongoDB[(MongoDB)]
    Controllers --> Middleware[JWT Middleware]
```

## 6. Data Model
### 6.1 Data Model Definition
```mermaid
erDiagram
    USER ||--o{ ORDER : places
    USER ||--o{ WISHLIST : has
    USER ||--o{ CART : has
    USER ||--o{ ADDRESS : has
    PRODUCT ||--o{ ORDER_ITEM : includes
    PRODUCT ||--o{ WISHLIST : in
    PRODUCT ||--o{ CART_ITEM : in
    PRODUCT ||--o{ REVIEW : has
    CATEGORY ||--o{ PRODUCT : contains
    COUPON ||--o{ ORDER : applied_to
    ORDER ||--|{ ORDER_ITEM : has
    CART ||--|{ CART_ITEM : has
    USER {
        string id
        string name
        string email
        string password
        string role
        boolean isVerified
        date createdAt
    }
    PRODUCT {
        string id
        string name
        string description
        number price
        number discountPrice
        array images
        string category
        array variants
        number stock
        number ratings
        number numReviews
        boolean isFeatured
        date createdAt
    }
    CATEGORY {
        string id
        string name
        string slug
        string image
    }
    ORDER {
        string id
        string userId
        array items
        number totalAmount
        string status
        string paymentMethod
        string paymentStatus
        object shippingAddress
        date createdAt
    }
    REVIEW {
        string id
        string userId
        string productId
        number rating
        string comment
        date createdAt
    }
```
