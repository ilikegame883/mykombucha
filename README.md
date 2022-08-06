## <img src="https://res.cloudinary.com/jjo/image/upload/v1651018664/myKombucha/Logo/topbar-logo_ha3vu9.svg" alt="myKombucha" width="500">

**myKombucha** is an online community and resource for consumer-driven kombucha reviews, ratings, and brewery information. Dedicated to those who enjoy kombucha beverages.

[Website](https://mykombucha.net)

## Technologies

- **Framework**: [Next.js](https://nextjs.org)
- **Styling**: [MUI](https://mui.org)
- **Database**: [MongoDB Atlas](https://mongodb.com)
- **ORM**: [Mongoose](https://mongoosejs.com)
- **Authentication**: [NextAuth.js](https://next-auth.js.org)
- **Deployment**: [Vercel](https://vercel.com)

## Features

- Fullstack application built with Next.js, MUI, [Serverless API Routes](https://nextjs.org/blog/next-9#api-routes), MongoDB and deployed with Vercel.
- Explore top rated kombuchas and discover new breweries.
- Registered users can review and rate kombucha, create wish lists, favorite breweries and like reviews.
- Static pre-rendered kombucha and brewery profile pages with ISR ([Incremental Static Regeneration](https://vercel.com/docs/concepts/next.js/incremental-static-regeneration)) enabled.
- Kombucha and brewery correction form integrated with [Sendgrid](https://sendgrid.com) API.
- Autocomplete kombucha and brewery search bar.
- Paginated kombucha and brewery explore list.
- User dashboard page to keep track of kombucha reviews, wish list and rating stats.
- Edit user account & security settings and user profile image uploaded to [Cloudinary](https://cloudinary.com).
- Authentication via Google and credentials provider, powered by NextAuth.
- _Coming soon_ : Show local breweries by user location, user messaging, and native mobile app.

## Project Overview

- `pages/blog/*` - Static pre-rendered blog pages generated with data fetched from Notion.
- `pages/portfolio/*` - Static pre-rendered project pages generated with data fetched from Strapi.
- `pages/*` - All other static pages.
- `src/components/*` - Various components used throughout the site.
- `src/lib/*` - A collection of helpful utilities or code for external services.
- `public/*` - Static assets.
- `styles/*` - Global styles for Strapi Markdown content.

## Upcoming Features

- Search local breweries by visitor's location.
- Messaging system for registered users.
- Native mobile app.

## Screenshots

![portfolio-preview (2)](https://user-images.githubusercontent.com/57969414/183219986-4387f56d-b712-400f-97c6-0007d1007157.png)

![mykombucha-screen-1](https://user-images.githubusercontent.com/57969414/183220183-92ac5afb-6ebe-4097-88e2-50aaadfaa4da.png)
