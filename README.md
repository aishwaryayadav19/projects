# Student Portal ⭐

## Project Setup 💻

You need yarn, react, node, and mysql installed in your machine.

```
Clone the project and
$ cd student-portal-server

Checkout to the crait-dev branch
$ git checkout crait-dev

Always pull the latest code
$ git pull origin crait-dev

Install package dependencies
$ yarn

Run application in DEV mode
$ yarn dev
```

You should see

```
ready - started server on 0.0.0.0:8181, url: http://localhost:8181
```

Now you can visit http://localhost:8181

<br />

## Project Structure 📁

- components: All react components
- pages: All pages / templates. This directory is also routing system of the application.
- state: Redux state management
- public: Public Assets
- libs: Helper & Utils code
- storybook-stories: Storybook's Stories
- .storybook: Storybook configs
- .ci & scripts: Infra related scripts.
- \_\_tests\_\_: Unit Test cases

For application feature development you will spend most of your time in `components, pages and state` directories.

<br />

## Branch naming convention 👍

`crait-<ticket-num>-[feat, bugfix]-<ticket-info-in-short>`

Ex: `crait-100-feat-header-comp`

<br />

## TODO 📋

- Unit Test setup
- SonarLint setup
- Monorepo setup
- UAT ENV setup

<br />

Finally 👀, If you get a chance to go through our codebase and if you have any questions or if you think there is something which can be improved please reach out to us or create a PR.
