# MovieDataBase
### It is a Single Page Mean  stack  application with  Rest API thoroughly  protected using the Token authentication
This application is storehouse of the movie information . It is a data driven application where user create  saves the movie information in the  database. Unit test for the rest api are also included.
## Stack

* Persistence store: [MongoDB](http://www.mongodb.org/)
* Backend: [Node.js](http://nodejs.org/)
* Awesome [AngularJS](http://www.angularjs.org/) on the client
* CSS based on [Twitter's bootstrap](http://getbootstrap.com/)
* Rest Api (TokenBasedAuthentication)

### Build

It is a complete project with a build system focused on AngularJS apps and tightly integrated with other tools commonly used in the AngularJS community:
* powered by [Gulp.js](http://gruntjs.com/)
* test written using [Mocha](http://jasmine.github.io/) syntax
* build supporting JS, CSS minification
* [Twitter's bootstrap](http://getbootstrap.com/) with LESS templates processing integrated into the build

## Installation

### Platform & tools

You need to install Node.js and then the development tools. Node.js comes with a package manager called [npm](http://npmjs.org) for installing NodeJS applications and libraries.
* [Install node.js](http://nodejs.org/download/) (requires node.js version >= 0.8.4)
* Install Gulp-CLI and Mocha as global npm modules:

    ```
    npm install -g gulp 
    npm install -g mocha
    ```
### Get the Code
Either clone this repository or fork it on GitHub and clone your fork:

```
git clone https://github.com/rajatgermany/MovieDatabase.git
cd MovieDataBase
```

### App Server

Our backend application server is a NodeJS application that relies upon some 3rd Party npm packages.  You need to install these:

* Install local dependencies (from the project root folder):

    ```
    npm install
    ```

  (This will install the dependencies declared in the package.json file)

### Client App

Our client application is a straight HTML/Javascript application but our development process uses a Node.js build tool
[Gulp.js].


## Building

### Build the client app
The app made up of a number of javascript, css and html files that need to be merged into a final distribution for running.  We use the Gulp build tool to do this.
* Build client application:(If you have made changes to the Development Folder)

    ```
    cd gulp
    ```
## Running
### Start the Server
* Run the server

    ```
    node server.js
    ```
* Browse to the application at [http://localhost:3500/MovieDataBase]


## Browser Support
We only regularly test against Chrome 29 and occasionally against Firefox and Internet Explorer.
The application should run on most modern browsers that are supported by the AngularJS framework.
Obviously, if you chose to base your application on this one, then you should ensure you do your own
testing against browsers that you need to support.

## Development

### Folders structure

At the top, level the repository divided into following folders -
- Development Folder (client Side Components) , 
- server file ( server.js)
- node_modules
- routes( express route Handlers)
- test (contains Test for RestApi as well as Authentication handlers)

    ```
* node_modules- contains build tasks for Grunt along with other, user-installed, Node packages
* Development - contains FrontEnd Components, Vendor Javascripts and built in vendor.min.js and  mainapp.min.js file
* server.js- contains express server file
* routes- contains express app route handlers
* test- contains Test for RestApi as well as for the Authentication handlers
  ```

### Default Build

The default gulp task will build the mainapp.min.js: `gulp`.  
* `gulp`

### Continuous Building
The watch gulp task will monitor the source files  in the Development Folder and run the default build task every time a file changes: `DevelopmentApp-watch`.


# Test
- cd Test
- mocha

# User Manual
1.Run the server.js  </br>
2.HomePage: url - http://localhost:3500/MovieDatabase</br>
3.Directed to the Login View</br>
4.If Registered Enter the Credentials else Register yourself first</br>
5.Fill the Registration Form </br>
6.Redirected to the Login Page </br>
7.Click on the MovieDatabase and you will be redirected to HomePage which lists all the Movies</br>
8.You can perform all the Crud operations on the DataBase</br>
9.Test for Rest API are listed in folder Test</br>





