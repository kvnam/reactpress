# ReactPress

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/926e0227b23a428d86a2b22afce124cf)](https://www.codacy.com/gh/kvnam/reactpress/dashboard?utm_source=github.com&utm_medium=referral&utm_content=kvnam/reactpress&utm_campaign=Badge_Grade)

Wordpress API delivered through a React application.

The app has the following objectives

**All Users**

- List all posts
- Search for specific posts
- Filter posts by
  - Categories
  - Tags
  - Date
- Display pages from Wordpress

**Registered Users**

- Sign Up / Sign In - Authentication added with JWT-Authentication plugin
- Create a post
- Retrieve self-authored posts
- Delete self-authored posts

## ChangeLog

Date: 04/08/2021

- Project under active development, please pull code and run at your own risk.
- Started move to Redux hooks
- Added Feature to pull pages from Wordpress API and display in ReactPress (pending)

Date: 09/2020

- Working on moving to Typescript, adding tests, upgrading UI to allow more customization

Date: 27/11/2018

- Changed to [simple-jwt-authentication by Jonathan](https://github.com/jonathan-dejong/simple-jwt-authentication/wiki/Documentation)
- Added Login and Log out for existing user

Date: 25/11/2018

- Added login with [jwt-authentication-plugin by Tmeister](https://github.com/Tmeister/wp-api-jwt-auth)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

License
This project is licensed under the MIT License - see the LICENSE.md file for details
