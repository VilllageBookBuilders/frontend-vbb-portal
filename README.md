# Village Portal (VBB)

Village Portal is a open-sourced `school-based mentoring managment platform`. Development is lead by Village Book Builders volunteers. Village Book Builders accelerates learners globally through virtual mentoring, learning libraries, and special educational community-wide interventions. Village Portal helps schedule hundreds of virtual volunteer mentors in global time zones. Other Features are in development.

This project is broken up into a separate backend and frontend repository. The backend contains the Django project which uses the Django Rest Framework to host a simple API and can be found at [backend-vbb-portal](https://github.com/VilllageBookBuilders/backend-vbb-portal). The frontend uses React and queries data from the API.

Install node.js and get the backend server running beforehand!

Run the following commands inside of the repository folder to get started:
npm:

```bash
npm start
```

yarn:

```bash
yarn start
```

These commands (respectively)
( You will need to add an a `.env` file. An example of this file can be found in `/examples/exampleENV`)

1. yarn (install the node_js modules) (node js needs to be installed on your computer first)
2. npm/yarn start (this will create a temporary local server which reloads on detecting newly-saved changes to the codebase)
3. ctrl + c (when pressed in the terminal window running the node server will close the server)

For the Youtube tutorials associated with this code (and preparing it for production), click here https://youtu.be/uZgRbnIsgrA

*Note: run server on local Host : http://localhost:8000/signin
*Note: to access, django admin, go to http://localhost:8000/admin/
Username and Password: \$\$;
Note: Discard any database changes on your local server (**DON'T PUSH**)

## Docs and valuable links

- [Swagger docs for standalone python backend ](https://vbb-backend.herokuapp.com/swagger/)

## Terminology

- Users:

  - Mentor
  - Mentee
  - Admin

- Session: Represents the template of a slot ( think of this as the cookie cutter you make the cookies (slots) from )

- Slot: Represents an individual meeting created from the session slot

## Coding

Examples of component patterns can be found under examples as can redux folder structure.
