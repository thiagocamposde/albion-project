# Albion Project

# Author: Thiago de Campos - thiagocamposde@gmail.com

A website made with React.js and Node.js to help with crafting on albion onlinen

# Architecture

The application architecture was decided around two concerns: be simple because of the scope and short time and yet be flexible to future scale and improvements.

For this challenge, to make things easy for deployment and presentation I decided to put both frontend and backend together at the same repository. The frontend application are inside the /client folder and can be easily separeted if wanted.

## Frontend:

To bootstrap the application I used create-react-app.

The components are separated in two subfolder: screens, wich are the components correspondents to each different route, and base, the components that don't do any side effects and can be reused in diferent screens.

Each entitie or group of subject has it's own api file at /api, wich is responsible for fetching data.

## Backend:

I tried to use the most basic structure I could, using express to handle the API. In the future this structure would probably change, with entities, services and controllers beens introduced.

# Third-party libraries

## Material-ui

Used in frontend for basic style and couple of components, grid system and responsive concerns

## React paginate

Used in frontend for pagination. I tried to minimize the effords using those components

## React select

I have beens using this component for a while and I think would be usefull in the search solution for autocomplete.

## React select

Axios is a great tool to use with react and node, providing easy ways to handle and manipulate requests

Other libraries and tools worth to mention are:

- Standard: for linting purposes
- React Router: Essential for routing components in react
- Nodemon: Usefull for auto refresh the server
- Moment: Usefull to manipulate and format dates

# scripts

To run this app you can type 'npm run dev'. It will run both back and frontend at the same time.
