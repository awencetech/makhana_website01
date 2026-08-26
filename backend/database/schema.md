# Database Schema

## Overview

MongoDB stores the commerce and communication data for the makhana website. Mongoose schemas live in `backend/server/models`, and connection management lives in `backend/server/dbUtils.ts`.

## Collections

### `products`

The makhana catalog shown to customers.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `name` | string | yes | Product or grade name |
| `grade` | string | no | Quality label |
| `description` | string | yes | Customer-facing description |
| `image` | string | yes | Image URL |
| `price` | number | yes | Current unit price |
| `tags` | string[] | no | Search and display tags |
| `createdAt`, `updatedAt` | date | automatic | Mongoose timestamps |

Products are seeded with the three initial quality grades when the collection is empty.

### `carts`

Cart line items submitted through the cart API.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `name` | string | yes | Product name snapshot |
| `grade` | string | yes | Grade snapshot |
| `size` | string | yes | Selected pack size |
| `price` | number | yes | Unit price snapshot |
| `quantity` | number | yes | Minimum value is 1 |
| `totalPrice` | number | yes | Line total |
| `createdAt`, `updatedAt` | date | automatic | Mongoose timestamps |

The current cart model has no user or session identifier, so cart records are not yet linked to an authenticated customer.

### `orders`

Customer purchases and fulfillment status.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `customerName` | string | yes | Customer contact name |
| `email` | string | yes | Customer email |
| `phone` | string | yes | Customer phone |
| `address` | string | yes | Delivery address |
| `items` | embedded documents[] | no | Purchased item snapshots |
| `totalPrice` | number | yes | Order total |
| `status` | string | yes | `pending`, `processing`, `shipped`, `delivered`, or `cancelled` |
| `createdAt`, `updatedAt` | date | automatic | Mongoose timestamps |

Each embedded item stores `name`, `grade`, `size`, `price`, and `quantity`. There is currently no reference to a product document or payment provider record.

### `reviews`

Customer feedback displayed by the site.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `name` | string | yes | Reviewer name, 2-100 characters |
| `rating` | number | yes | Integer conceptually ranging from 1 to 5 |
| `feedback` | string | yes | Feedback, 10-500 characters |
| `createdAt`, `updatedAt` | date | automatic | Mongoose timestamps |

Reviews are currently site-wide. They are not linked to a product or order.

### `contactsubmissions`

Messages submitted through the contact form.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `name` | string | yes | Sender name |
| `email` | string | yes | Sender email |
| `message` | string | yes | Submitted message |
| `createdAt`, `updatedAt` | date | automatic | Mongoose timestamps |

### `newslettersignups`

Email addresses subscribed to marketing updates.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `email` | string | yes | Unique subscriber email |
| `createdAt`, `updatedAt` | date | automatic | Mongoose timestamps |

`email` has a unique index through Mongoose.

## Relationships

```text
Product  --catalog source for-->  Cart item snapshot
Product  --catalog source for-->  Order item snapshot
Order    --may be associated with-->  Cart items
Customer --not modeled yet-->  Order, Cart, Review, ContactSubmission, NewsletterSignup
```

The current implementation intentionally uses snapshots in carts and orders. This protects historical order data from later catalog edits, but it also means product updates do not automatically update existing records.

## Recommended Next Database Steps

1. Add a `customerId` or secure `sessionId` to carts and orders.
2. Add a `productId` to cart and order items while retaining snapshot fields.
3. Add indexes for product tags, order status, order email, and review creation date.
4. Add payment and fulfillment fields only when the payment workflow is defined.
5. Move seed data into a dedicated seed script if catalog data grows beyond the initial products.
