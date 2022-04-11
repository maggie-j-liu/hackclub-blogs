<img src="/public/docs-banner.png" align="center" />

Hack Club Blogs is a platform to check out blog posts written by [Hack Clubbers](https://hackclub.com). Through importing what you already have or creating a new custom blog on-site, this app platform lets you make and read blog posts with others!

1. Sign into your account.

    <img src="/public/a.gif" />

2. Create a new post or link your existing blog.

    <img src="/public/b.gif" />

3. View your posts and others' posts on the platform.

    <img src="/public/c.gif" />

## Using Supabase

We used several Supabase features including authentication, databases, and edge functions. We used authentication to handle signing in and retrieving information (for example, the profile picture) of a particular user using the Slack OAuth provider. We also used databases to store blog post sources, blog posts made on the platform, and some profile information. Lastly, we used edge functions to handle the creation of posts on the platform.

## Motivations

Many Hack Clubbers have their own blogs where they share interesting details about their lives — whether it's an experience they've gone through, some tips and tricks to share, or reflective pieces of writing, we feel that many of these blogs should have a wider reach. Hack Clubbers can then share and view the writings of others much more easily by aggregating multiple sources into one feed for all to read.

## Develop

First, install dependencies:

```bash
yarn dev
```

Add environment variables:

in `.env.local`

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Built by

|                                                            |        | GitHub                                           | Twitter                                      |
| :--------------------------------------------------------- | :----- | :----------------------------------------------- | :------------------------------------------- |
| <img src="https://github.com/maggie-j-liu.png" width="50"> | Maggie | [@maggie-j-liu](https://github.com/maggie-j-liu) |                                              |
| <img src="https://github.com/exu3.png" width="50">         | Ella   | [@exu3](https://github.com/exu3)                 | [@eiilla11](https://twitter.com/eiilla11)    |
| <img src="https://github.com/neelr.png" width="50">        | Neel   | [@neelr](https://github.com/neelr)               | [@neel_redkar](https://twitter.com/neel_redkar)    |
