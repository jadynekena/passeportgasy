# Malagasy Passport

You can check the final app [here](https://malagasypassport.ml).

# How to run it locally

Make sure you have :

- a **linux terminal** such as [git CLI](https://git-scm.com/downloads) for example
- [**node**](https://nodejs.org/en/download/) and [**serve**](https://www.npmjs.com/package/serve) library

## Step 1 : clone the repo

```
git clone https://github.com/jadynekena/passeportgasy
```

## Step 2 : run the server

```
cd passeportgasy
serve
```

**As for now, this project is in Vanilla JS. Later on, we might use react server.**

## Step 3 : preview the app

Just go to `localhost:3000` and the app must be available.

# Dependencies

- `jquery`, `threeJS`, `gioJS` : for globe animations
- `supabase` : for datas collection on user actions

# Useful files

- `index.html` : the skeleton of the app
- `loadData.js` : the main JS file where everything is handled on first rendering
- `style.css` : it customizes the app to make it look better

# How to contribute

You can :

- send a Pull Request
- ping me on [Twitter](https://twitter.com/JadyRama)
- send me a [mail](mailto:contact@jadynekena.com)

And I'll be happy to get you involved !

# Current Roadmap

- [x] Add a valid Readme file
- [ ] Switch the project to ReactJS
- [ ] Find a cool table viewing solution (in ReactJS)
- [ ] Mention all contributors in the website
- [ ] Fill up all missing back-end datas

---

## React version of the app

### Tech stack

- [Next.js](https://nextjs.org/) : meta framework based on react
- [Typescript](https://www.typescriptlang.org/) : javascript superset that brings static types
- [Chakra UI](https://chakra-ui.com/) : react UI library
- [Tanstack Table](https://tanstack.com/table/v8) : headless table library

### Development

#### Requirements

- [`node`](https://nodejs.org/en/download/) (16)
- [`npm`](https://docs.npmjs.com/about-npm) (8)

#### How to run development server

Install the project dependencies

```shell
npm install
```

Copy the `.env.example` and rename to `.env.local`

```shell
cp .env.example .env.local
```

Complete the environment variables in `.env.local`

```txt
NEXT_PUBLIC_API_KEY=
NEXT_PUBLIC_IDSHEET=
```

Run server and open `http://localhost:3000/`

```shell
npm run dev
```
