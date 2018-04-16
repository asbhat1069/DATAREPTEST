



var HtmlScreenshotReporter  = require('protractor-jasmine2-screenshot-reporter');
var d                       = new Date();
var month                   = d.getMonth() + 1;
var dt                      = d.getDate() + "-" + month + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();


var url                     = (typeof process.env.BASEURL !== 'undefined') ? process.env.BASEURL : "https://www.ebay.com.au/";
var DEFAULT_TIMEOUT_INTERVAL = 60000;

var reporter = new HtmlScreenshotReporter({
    dest: './report',
    filename: 'report.html',
    cleanDestination: true,
    showSummary: true,
    showConfiguration: true,
    reportTitle: "UI Automation Report :" + dt,
    ignoreSkippedSpecs: true,
    reportOnlyFailedSpecs: false,
    captureOnlyFailedSpecs: false,
    showQuickLinks: true,
    reportFailedUrl: true,
    inlineImages: false
});

exports.config = {

    seleniumServerJar:  process.env.SELENIUMSTANDALONESERVERJAR,
    multiCapabilities: [
        // {
        //     browserName: 'internet explorer',
        //     shardTestFiles: true,
        //     maxInstances: 1,
        //     // 'ie.ensureCleanSession': true,
        //     // version : 11,
        //     specs: [ "./tests/test.js" ]
        
        //     // nativeEvents: false, 
        //     // ignoreZoomSetting: true
        // }
        , 
        {
            browserName: 'chrome',
            shardTestFiles: true,
            maxInstances: 3,
            specs: [ "./tests/test.js" ],
            // chromeOptions: {
                // prefs: {
                //     'download': {
                //         'prompt_for_download': false,
                //         'directory_upgrade': true,
                //         'default_directory': path.join(__dirname,'\\download') //downloadloc
                //     },
                // },
                // args : ["--headless", "--disabled-gpu", "--window-size=1920,1080"]
            // }
        }
       
    ],

    beforeLaunch: function() {
        console.log("Launch Date and Time :"+dt);
        return new Promise(function(resolve) {
            reporter.beforeLaunch(resolve);
        });
    },

    afterLaunch: function(exitCode) {
        d = new Date();
        var end_dt = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        console.log("Date-Time After Test Finished : "+end_dt);
        return new Promise(function(resolve) {
            exitCode = 0;
            reporter.afterLaunch(resolve.bind(this, exitCode));
        });
    },

    onPrepare: function() {
        jasmine.getEnv().addReporter(reporter);
        jasmine.DEFAULT_TIMEOUT_INTERVAL = DEFAULT_TIMEOUT_INTERVAL;
        browser.manage().timeouts().implicitlyWait(DEFAULT_TIMEOUT_INTERVAL);
        browser.manage().timeouts().pageLoadTimeout(DEFAULT_TIMEOUT_INTERVAL);

        var testURL = url;

        browser.ignoreSynchronization = true;
        browser.get(url);
        browser.manage().window().maximize();
        browser.manage().deleteAllCookies();
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
        // browser.getCapabilities().then((cap) => {
        //     mpdata.currentBrowser = cap.get('browserName')
        //     if(mpdata.currentBrowser.toLowerCase().includes('internet exp') ){
        //         browser.executeScript("document.body.style.zoom='105%';");
        //     }
        //     else{
        //         browser.executeScript("document.body.style.zoom='100%';");
        //     }
        // });        
    },

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: DEFAULT_TIMEOUT_INTERVAL,
        isVerbose: true,
        includeStackTrace: true,
    },
};

