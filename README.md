# spa-hero

Create production/dev ready distribution build for javascript based single page applications. spa-hero uses gulp-useref to read out the html file and copy third party dependencies to a separate library folder.

### Why I wrote this?

In this modern era of web, we extensivly use npm or bower to download dependencies to our project. These dependencies are right there in our project folder including lots of other files that came in with these packages. After looking at the size of my project one unavoidable question comes to us ,how to upload my project on server?
Do I have to pick each and every javascript/css files from node_modules/bower_component folder and maintain a new folder which can be uploaded to server? If yes, then what happen when I added or removed some dependencies and I have to repeat the same cycle? Awww.

So to overcome this problem I wrote a gulp task which automated this process for me. So I thought about converting this to a command line utility which can take 2-3 parameters and do the job for us. We dont even need to write any gulp task file. Its all being written by this utility.

### Version
1.0.0

### Dependencies
spa depends on some very cool nodejs modules available which help spa to generate build files.

Major modules are as follows:
 * gulp
 * gulp-useref

### Features

  - Support files minification for prod and left file untouched for dev.
  - maintain a separate directory for our distribution.
  - Can choose source and destination folders.

### Installation

```sh
npm install spa-hero
```
### Options

**Commands**:
* build-dev (we choose this command when we dont want spa to concat and minify our files.)
* build-prod (for production use)

**Parameters**

* -h or --html (relative path for the directory of your index.html file)
* -a or --app (relative path for the directory of your JS/CSS code)
* -d or --dest (relative path for the directory of your distribution folder)

try
```sh
spa --help
```

### Usages

**Step 1.** Open your index.html file.

**Step 2.** Modify your html with blocks as shown below
```html
<!-- build:<type>(alternate search path) <path> <parameters> -->
... HTML Markup, list of script / link tags.
<!-- endbuild -->
```
* **type** either js, css or remove; remove will remove the build block entirely without generating a file
* **alternate search path** (optional) By default the input files are relative to the treated file. Alternate search path allows one to change that
* **path** the file path of the optimized file, the target output
* **parameters** extra parameters that should be added to the tag

An example of this in completed form can be seen below:

```html
<html>
<head>
    <!-- build:css libs/css/combined.css -->
    <link href="css/one.css" rel="stylesheet">
    <link href="css/two.css" rel="stylesheet">
    <!-- endbuild -->
</head>
<body>
    <!-- build:js libs/js/angular.min.js-->
  <script src="../node_modules/angular/angular.js"></script>
  <!-- endbuild -->
  <!-- build:js libs/js/angular-route.min.js-->
  <script src="../node_modules/angular-route/angular-route.js"></script>
  <!-- endbuild -->

  <!-- for production, you can combine above third party files by putting all of them in single block -->

  <script src="app.js"></script>
  <script src="view1/view1.js"></script>
  <script src="view2/view2.js"></script>
  <script src="components/version/version.js"></script>
  <script src="components/version/version-directive.js"></script>
  <script src="components/version/interpolate-filter.js"></script>
</body>
</html>
```
The resulting HTML would be:
```html
<html>
<head>
    <link rel="stylesheet" href="libs/css/combined.css"/>
</head>
<body>
    <script src="libs/js/angular.min.js"></script>
    <script src="libs/js/angular-route.min.js"></script>

    <script src="app.js"></script>
    <script src="view1/view1.js"></script>
    <script src="view2/view2.js"></script>
    <script src="components/version/version.js"></script>
    <script src="components/version/version-directive.js"></script>
    <script src="components/version/interpolate-filter.js"></script>
</body>
</html>
```
See [gulp-useref](https://www.npmjs.com/package/gulp-useref) for more information.

**Step 3:** Open command prompt or terminal and go to the directry of your project and run
```sh
spa build-dev -h app -a app -d dist
```
OR
```sh
spa build-prod -h app -a app -d dist
```
### Command Demo


![alt text](https://bytebucket.org/sgoyalnet/assets/raw/f407afc4c025a4f2a93952489a8835704e10ae35/spa-hero-demo1.png "Demo folder structure")

### Sample project structure.

![alt text](https://bytebucket.org/sgoyalnet/assets/raw/0829c8d63cb758e97567961994b2dbaa051c76cb/spa-hero-demo.png "Demo folder structure")

### And this is what we got after spa-hero take charge:

![alt text](https://bytebucket.org/sgoyalnet/assets/raw/f407afc4c025a4f2a93952489a8835704e10ae35/spa-hero-demo2.png "Demo folder structure")

You will see a new directry called ***dist*** with all of your files which are server ready. Enjoy!!

### Contribute

Do you want to improve it? Sounds cool. Please drop me a line at <mail.goyalshubham@gmail.com>
