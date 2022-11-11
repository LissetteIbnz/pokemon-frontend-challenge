## System requirements

To run this code in your system, it must satisfy the next minimum requirements:

- NodeJS 16.14.0
- npm 8.3.1

## Install modules

`npm install`

## Commands guide

to run application:

`npm start`

To tun test:

`npm test`

## Used technologies

### Production libraries

- [Create React App](https://create-react-app.dev/) as boilerplate for React. This version works with React 18.
- [React Router](https://reactrouter.com/en/main) is a client side routing.
- [classnames](https://github.com/JedWatson/classnames) A simple JavaScript utility for conditionally joining classNames together.
- [React Query](https://tanstack.com/query/v4) is a powerful tool to manage asynchronous state (Server State). This library haves auto refetching, auto caching, render-as-you-fetch and other useful helpers.
- [react-intersection-observer](https://react-intersection-observer.vercel.app/?path=/story/introduction--page), is an implementation of the Intersection Observer API for React. I use it for the infinite scrolling.
- [React Select](https://react-select.com/home) as a select input control.

### Development libraries

- [Storybook](https://storybook.js.org/) is a tool for building UI components in isolation.
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for testing components.
- [React Select Event](https://github.com/romgain/react-select-event) for testing select components.

## Formatting code

- `husky` makes it possible to use git hooks as if they are npm scripts.
- `lint-staged` allows us to run scripts on staged files in git.
- `eslint` is the JavaScript linter we will run before commits.
- `prettier` is the JavaScript formatter we will run before commits.

## Features implemented

- View all the Pokemon on a list and grid view with an infinite scroll.
- Search for Pokemon by text through the use of a search bar.
- Filter Pokemon by type using a dropdown.
- Add and remove a Pokemon to and from your Favorites by clicking the heart icon.
- Switch between All Pokemon and Favorite Pokemon views.
- View Pokemon details including their evolutions.

Other implementations:

- Lazy routes.
- Optimistic UI with React Query (only in Pokemon Details page). Pending to implement it in Pokemon List page.
- Create a catalogue of components with Storybook.
