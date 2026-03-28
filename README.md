# Mission12_Madruga

This project continues the Mission 11 bookstore and adds the Mission 12 requirements.

## What it includes
- Book category filtering
- Pagination that updates when filtering
- Shopping cart with quantity, subtotal, and total
- Cart stored in sessionStorage for the browser session
- Continue Shopping button that returns to the bookstore
- Cart summary on the main page
- Bootstrap Grid layout
- Two Bootstrap features not covered in class:
  1. Accordion for the category filter
  2. Badge for cart item count

## Folder structure
- `Backend` = ASP.NET Core API with SQLite database
- `Frontend` = React + TypeScript + Bootstrap app

## Run the backend
```bash
cd Backend
dotnet restore
dotnet run
```

## Run the frontend
```bash
cd Frontend
npm install
npm run dev
```

## Learning Suite comment
Bootstrap features used beyond class examples:
1. Accordion component for the category filter section on the main page.
2. Badge component for showing total cart item count in the cart summary.
Also used Bootstrap Grid with row and col-lg-* to organize the page layout.
