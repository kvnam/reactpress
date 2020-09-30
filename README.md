# ReactPress

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6afbe2dd37ed4c65853f718d56b72b46)](https://app.codacy.com/app/kvnam/reactpress?utm_source=github.com&utm_medium=referral&utm_content=kvnam/reactpress&utm_campaign=Badge_Grade_Dashboard)

Wordpress API delivered through a React application.

The app has the following objectives

**All Users**

- List all posts
- Search for specific posts
- Filter posts by
  - Categories
  - Tags
  - Date

**Registered Users**

- Sign Up / Sign In - Authentication added with JWT-Authentication plugin
- Create a post
- Retrieve self-authored posts
- Delete self-authored posts

## ChangeLog

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
