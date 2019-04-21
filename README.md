# School Markbook

School Markbook is a simple app, which purpose is checking user marks.

# Installation

Use the package manager [npm](https://www.npmjs.com/) to install the School Markbook project.

```bash
npm install
```

# Running
```bash
npm start
```
The app will start on [localhost:3000](http://localhost:4200) if you don't change the port.
# Built With
* Client
     * [Angular CLI](https://cli.angular.io/)
     * [NGRX - Redux](https://ngrx.io/)
     * [Angular Material-UI](https://material.angular.io/)
* Server
     * [Express - Node.js web application framework](https://expressjs.com/)
     * [Sequelize - SQL ORM](http://docs.sequelizejs.com/)
     * [Database - MySQL](https://www.mysql.com/)
     * [JWT](https://jwt.io/)
# Authors
* **[Slavko Hristov Hinkin](https://github.com/slavihh)**

## License
[MIT](https://choosealicense.com/licenses/mit/)

# Architecture
```bash
.
├── README.md
├── client
│   ├── README.md
│   ├── angular.json
│   ├── dist
│   ├── e2e
│   │   ├── protractor.conf.js
│   │   ├── src
│   │   │   ├── app.e2e-spec.ts
│   │   │   └── app.po.ts
│   │   └── tsconfig.e2e.json
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── app
│   │   │   ├── +store
│   │   │   │   ├── actions
│   │   │   │   │   └── auth.action.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── reducers
│   │   │   │   │   └── auth.reducer.ts
│   │   │   │   └── selectors
│   │   │   │       └── auth.selector.ts
│   │   │   ├── app-routing.module.ts
│   │   │   ├── app.component.css
│   │   │   ├── app.component.html
│   │   │   ├── app.component.ts
│   │   │   ├── app.module.ts
│   │   │   ├── auth
│   │   │   │   ├── auth.module.ts
│   │   │   │   ├── login
│   │   │   │   │   ├── login.component.css
│   │   │   │   │   ├── login.component.html
│   │   │   │   │   └── login.component.ts
│   │   │   │   └── register
│   │   │   │       ├── register.component.css
│   │   │   │       ├── register.component.html
│   │   │   │       └── register.component.ts
│   │   │   ├── core
│   │   │   │   ├── core.module.ts
│   │   │   │   ├── home
│   │   │   │   │   ├── home.component.css
│   │   │   │   │   ├── home.component.html
│   │   │   │   │   └── home.component.ts
│   │   │   │   ├── local-storage.ts
│   │   │   │   ├── navigation
│   │   │   │   │   ├── navigation.component.css
│   │   │   │   │   ├── navigation.component.html
│   │   │   │   │   └── navigation.component.ts
│   │   │   │   └── services
│   │   │   │       ├── auth.info.service.ts
│   │   │   │       ├── auth.service.ts
│   │   │   │       ├── guards
│   │   │   │       │   ├── auth.guard.ts
│   │   │   │       │   ├── is-logged-out.guard.ts
│   │   │   │       │   ├── jwt.guard.ts
│   │   │   │       │   ├── role.guard.ts
│   │   │   │       │   └── user.guard.ts
│   │   │   │       ├── http.service.ts
│   │   │   │       ├── models
│   │   │   │       │   ├── IAuth.ts
│   │   │   │       │   ├── IResponse.ts
│   │   │   │       │   └── IState.ts
│   │   │   │       ├── resolvers
│   │   │   │       │   ├── subject.resolver.ts
│   │   │   │       │   ├── user-marks.resolver.ts
│   │   │   │       │   ├── user.resolver.ts
│   │   │   │       │   └── user.subject.resolver.ts
│   │   │   │       ├── subject.service.ts
│   │   │   │       └── user.service.ts
│   │   │   ├── feature
│   │   │   │   ├── admin
│   │   │   │   │   ├── admin-subject
│   │   │   │   │   │   ├── admin-subject.component.css
│   │   │   │   │   │   ├── admin-subject.component.html
│   │   │   │   │   │   ├── admin-subject.component.ts
│   │   │   │   │   │   ├── create-subject
│   │   │   │   │   │   │   ├── create-subject.component.css
│   │   │   │   │   │   │   ├── create-subject.component.html
│   │   │   │   │   │   │   └── create-subject.component.ts
│   │   │   │   │   │   └── edit-subject
│   │   │   │   │   │       ├── edit-subject.component.css
│   │   │   │   │   │       ├── edit-subject.component.html
│   │   │   │   │   │       └── edit-subject.component.ts
│   │   │   │   │   └── admin-user
│   │   │   │   │       ├── admin-user-marks
│   │   │   │   │       │   ├── admin-user-marks.component.css
│   │   │   │   │       │   ├── admin-user-marks.component.html
│   │   │   │   │       │   ├── admin-user-marks.component.ts
│   │   │   │   │       │   └── create-user-mark
│   │   │   │   │       │       ├── create-user-mark.component.css
│   │   │   │   │       │       ├── create-user-mark.component.html
│   │   │   │   │       │       └── create-user-mark.component.ts
│   │   │   │   │       ├── admin-user-subjects
│   │   │   │   │       │   ├── admin-user-subjects.component.css
│   │   │   │   │       │   ├── admin-user-subjects.component.html
│   │   │   │   │       │   ├── admin-user-subjects.component.ts
│   │   │   │   │       │   └── create-user-subject
│   │   │   │   │       │       ├── create-user-subject.component.css
│   │   │   │   │       │       ├── create-user-subject.component.html
│   │   │   │   │       │       └── create-user-subject.component.ts
│   │   │   │   │       ├── admin-user.component.css
│   │   │   │   │       ├── admin-user.component.html
│   │   │   │   │       └── admin-user.component.ts
│   │   │   │   ├── feature.module.ts
│   │   │   │   └── user
│   │   │   │       └── user-marks
│   │   │   │           ├── user-marks.component.css
│   │   │   │           ├── user-marks.component.html
│   │   │   │           └── user-marks.component.ts
│   │   │   └── shared
│   │   │       ├── material.module.ts
│   │   │       └── shared.module.ts
│   │   ├── assets
│   │   ├── browserslist
│   │   ├── environments
│   │   │   ├── environment.prod.ts
│   │   │   └── environment.ts
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── karma.conf.js
│   │   ├── main.ts
│   │   ├── polyfills.ts
│   │   ├── styles.css
│   │   ├── test.ts
│   │   ├── tsconfig.app.json
│   │   ├── tsconfig.spec.json
│   │   └── tslint.json
│   ├── tsconfig.json
│   └── tslint.json
└── server
    ├── app
    │   ├── mark
    │   │   ├── routes
    │   │   │   └── marks.js
    │   │   └── services
    │   │       └── mark.js
    │   ├── subject
    │   │   ├── models
    │   │   │   └── subject.js
    │   │   ├── routes
    │   │   │   └── subject.js
    │   │   └── services
    │   │       └── subject.js
    │   └── user
    │       ├── middleware
    │       │   ├── authorization.js
    │       │   ├── jwt.js
    │       │   ├── login.js
    │       │   ├── refresh.js
    │       │   └── register.js
    │       ├── models
    │       │   ├── tokenblacklist.js
    │       │   ├── user.js
    │       │   ├── usersubject.js
    │       │   └── usersubjectmark.js
    │       ├── routes
    │       │   ├── authentication.js
    │       │   └── user.js
    │       └── services
    │           ├── authentication.js
    │           ├── user.js
    │           ├── userSubject.js
    │           └── userSubjectMarks.js
    ├── app.js
    ├── bin
    │   └── www
    ├── config
    │   ├── database.js
    │   └── jwtConfig.js
    ├── docs
    │   └── user
    │       └── swagger.json
    ├── env.dist
    ├── locales
    │   ├── bg.json
    │   └── en.json
    ├── migrations
    │   ├── 20190224112038-create-token-blacklist.js
    │   ├── 20190301140528-create-user.js
    │   ├── 20190301140605-create-subject.js
    │   ├── 20190302130531-create-user-subject.js
    │   └── 20190302151258-create-user-subject-mark.js
    ├── models
    │   └── models.js
    ├── package-lock.json
    ├── package.json
    ├── routes
    │   └── index.js
    ├── seeders
    │   └── 20190202224141-demo-user.js
    └── yarn.lock
            

```