## <img src="https://res.cloudinary.com/jjo/image/upload/v1651018664/myKombucha/Logo/topbar-logo_ha3vu9.svg" alt="myKombucha" width="500">

**myKombucha** is an online community and resource for consumer-driven kombucha reviews, ratings, and brewery information. Dedicated to those who enjoy kombucha beverages.

[Website](https://mykombucha.net)

## Technologies

- **Framework**: [Next.js](https://nextjs.org)
- **Styling**: [MUI](https://mui.org)
- **Database**: [MongoDB](https://mongodb.com)
- **ORM**: [Mongoose](https://mongoosejs.com)
- **Authentication**: [NextAuth.js](https://next-auth.js.org)
- **Deployment**: [Vercel](https://vercel.com)

## Features

- Fullstack application built with Next.js, MUI, [Serverless API Routes](https://nextjs.org/blog/next-9#api-routes), MongoDB and deployed with Vercel.
- Explore top rated kombuchas and discover new breweries.
- Registered users can review and rate kombucha, create wish lists, favorite breweries and like reviews.
- Static pre-rendered pages with ISR ([Incremental Static Regeneration](https://vercel.com/docs/concepts/next.js/incremental-static-regeneration)) enabled.
- Kombucha and brewery correction form integrated with [Sendgrid](https://sendgrid.com) API.
- Newsletter e-mail subscription.
- Autocomplete kombucha and brewery search bar on homepage.
- Paginated kombucha and brewery explore list.
- User dashboard page to keep track of kombucha reviews, wish list and rating stats.
- Edit user account & security settings and profile image uploaded to [Cloudinary](https://cloudinary.com).
- User authentication via Google and credentials provider, powered by NextAuth.

## Project Overview

- `pages/breweries/[slug]` - Static pre-rendered brewery profile pages.
- `pages/breweries/explore/*` - Static pre-rendered paginated brewery list pages from various categories.
- `pages/kombucha/[id]` - Static pre-rendered kombucha profile pages.
- `pages/kombucha/explore/*`- Static pre-rendered paginated kombucha list pages from various categories.
- `pages/search/[category]` - Kombucha and brewery search page.
- `pages/users/[name]/*` - User profile and settings page (General & Security).
- `pages/*` - All other static pages.
- `src/components/*` - Various components used throughout the site.
- `src/stores/*` - Global alert snackbar managed with React Context API.
- `src/lib/*` - Code for external services.
- `src/utils/*` - A collection of helpful utilities.
- `public/*` - Static assets.
- `styles/*` - Small amount of global styles.
- `theme.js` - MUI custom component styles for application.

## API Endpoints

**auth**

- **`GET & POST`** `/api/auth/[...nextauth]/*` - [Next-Auth REST API](https://next-auth-docs.vercel.app/getting-started/rest-api).
- **`PATCH`** `/api/auth/password` - Update password for users logged in with credentials.
- **`POST`** `/api/auth/register` - Add new user to database.

**breweries**

- **`GET`** `/api/breweries/[slug]` - Returns single brewery data by brewery slug.
- **`PATCH`** `/api/breweries/[slug]/users/favorite` - Update brewery's favorite count given by registered user.
- **`GET`** `/api/breweries/[slug]/users/top` - Returns top 3 raters for single brewery.
- **`GET`** `/api/breweries/search/[str]` - Returns a list of breweries from search bar by string.
- **`GET`** `/api/breweries/explore/[category]/[page]` - Returns a paginated list of breweries by category.

**kombucha**

- **`GET`** `/api/kombucha/[id]` - Returns single kombucha data by kombucha id.
- **`GET`** `/api/kombucha/[id]/reviews` - Returns a list of reviews by kombucha id.
- **`GET`** `/api/kombucha/[id]/reviews/[top-review]` - Returns top user review by kombucha id.
- **`GET`** `/api/kombucha/search/[str]` - Returns a list of kombucha from search bar by string.
- **`GET`** `/api/kombucha/explore/[category]/[page]`- Returns paginated list of kombucha by category.

**users**

- **`GET`** `/api/users/[name]` - Returns user data by username.
- **`PATCH`** `/api/users/[name]` - Update authenticated user info by username.
- **`PATCH`** `/api/users/[name]/reviews` - Returns a list of reviews by username.
- **`PATCH`** `/api/users/[name]/wish-list` - Returns kombucha wish list by username.

**reviews**

- **`POST`** `/api/review/` - Add user kombucha review.
- **`DELETE`** `/api/review/` - Delete user review.
- **`PATCH`** `/api/review/[id]/like` - Update user's review like count.

**other**

- **`PUT`** `/api/newsletter/` - Add newsletter subscriptions to sendgrid mailing list.

## Upcoming Features

- Search local breweries by visitor's location.
- Messaging system for registered users.
- Native mobile app.

## Screenshots

![portfolio-preview (2)](https://user-images.githubusercontent.com/57969414/183219986-4387f56d-b712-400f-97c6-0007d1007157.png)

![mykombucha-screen-1](https://user-images.githubusercontent.com/57969414/183220183-92ac5afb-6ebe-4097-88e2-50aaadfaa4da.png)
