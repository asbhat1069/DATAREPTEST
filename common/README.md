Getting Started:

* Install node.js and npm from ->  https://nodejs.org/en/

* Install protractor globally using npm ->  npm install -g protractor
    * This will install two command line tools, protractor and webdriver-manager 
   
* Update webdriver-manager to download the necessary binaries using ->  webdriver-manager update
    * Webdriver-manager is a helper tool to easily get an instance of a Selenium Server running

* Navigate to project folder and install all the required packages using ->  npm install



Running Tests:

* set the selenium standalone server jar path to the env variable  

* Run using the command > protractor protractor.conf.js