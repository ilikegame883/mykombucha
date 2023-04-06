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

- Full stack application built with Typescript, Next.js, MUI, [API Routes](https://nextjs.org/blog/next-9#api-routes) as Serverless functions, MongoDB and deployed with Vercel.
- Search over 400 different kombucha beverages. Explore top rated kombuchas and discover new breweries.
- User authentication via Google and credentials provider, powered by NextAuth.
- Registered users can review and rate kombucha, create wish lists, favorite breweries and like reviews.
- Static pre-rendered pages with ISR ([Incremental Static Regeneration](https://vercel.com/docs/concepts/next.js/incremental-static-regeneration)) enabled.
- Kombucha and brewery correction form integrated with [Sendgrid](https://sendgrid.com) API.
- Newsletter e-mail subscription.
- Autocomplete kombucha and brewery search bar on homepage.
- Paginated kombucha and brewery explore list.
- User dashboard page to keep track of kombucha reviews, wish list and rating stats.
- User account & security settings.
- Utilized Cloudinary APIs APIs to streamline image uploads and optimization.

## Project Overview

- `pages/breweries/[slug]` - Static pre-rendered brewery profile pages.
- `pages/breweries/explore/*` - Static pre-rendered paginated brewery list from various categories.
- `pages/kombucha/[id]` - Static pre-rendered kombucha profile pages.
- `pages/kombucha/explore/*`- Static pre-rendered paginated kombucha list from various categories.
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

## Screenshots

![portfolio-preview (2)](https://user-images.githubusercontent.com/57969414/183219986-4387f56d-b712-400f-97c6-0007d1007157.png)

![mykombucha-screen-1](https://user-images.githubusercontent.com/57969414/183220183-92ac5afb-6ebe-4097-88e2-50aaadfaa4da.png)
