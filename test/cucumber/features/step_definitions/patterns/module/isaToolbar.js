module.exports = function () {

    this.Given(/^Store user is logged in$/, function (callback) {
        browser.executeScript('window.document.cookie="STORE_USER=Y"').then(function() {
            browser.getCurrentUrl().then(function(url){
                browser.get(url).then(function() {
                    callback();
                });
            });
        });
    });

    this.When(/^I enacted customer$/, function (callback) {
        var isaToolbar = this.channel.default.isaToolbar;

        isaToolbar.showSearchFormLink.click().then(function(){
            browser.executeScript('window.location.hash="isaToolbarLayer"').then(function(){
                browser.sleep(2000);
                isaToolbar.submitIsaSearchForm.click().then(function(){
                    callback();
                });
            });
        });
    });


    this.Then(/^I don't see the docked bar$/, function (callback) {
        var expect = this.expect;

        this.channel.default.isaToolbar.elements.then(function (elements) {
            expect(0).to.equal(elements.length);
            callback();
        });
    });

    this.Then(/^I see the docked bar$/, function (callback) {
        var expect = this.expect;

        this.channel.default.isaToolbar.elements.then(function (elements) {
            expect(elements.length).to.equal(1);
            callback();
        });
    });


    this.Then(/^The colour of the bar is (#\d+)$/, function (arg1, callback) {
        var expect = this.expect,
            utils = this.utils;

        this.channel.default.isaToolbar.layer.then(function (element) {
            expect(element.getCssValue('background-color')).to.eventually.equal(utils.hexToRgb(arg1));
            callback();
        });
    });

    this.Then(/^The darker Bg colour underneath the Seller, Customer and Account links is \#(\d+)$/, function (arg1, callback) {
        var expect = this.expect,
            utils = this.utils;

        this.channel.default.isaToolbar.blocks.then(function (elements) {

            for (var e = 0; e < elements.length; e++) {
                expect(elements[e].getCssValue('background-color')).to.eventually.equal(utils.hexToRgb(arg1));
            }
            callback();
        });
    });

    this.Then(/^The height of the bar is (\d\dpx)$/, function (arg1, callback) {
        var expect = this.expect;

        this.channel.default.isaToolbar.layer.then(function (element) {
            expect(element.getCssValue('height')).to.eventually.equal(arg1);
            callback();
        });
    });


    this.Then(/^The left and right padding is (\d+px)$/, function (arg1, callback) {
        var expect = this.expect;

        this.channel.default.isaToolbar.leftRightBlocks.then(function (elements) {
            expect(elements[0].getCssValue('padding-left')).to.eventually.equal(arg1);
            expect(elements[1].getCssValue('padding-right')).to.eventually.equal(arg1);

            callback();
        });
    });


    this.Then(/^The text links are in ([^\,]+), Size (\d+px), Colour (#[A-Za-z]+)$/, function (arg1, arg2, arg3, callback) {

        var expect = this.expect,
            utils = this.utils;

        this.channel.default.isaToolbar.textLinks.then(function (elements) {


            for (var e = 0; e < elements.length; e++) {
                // TBD: FONT-FAMILY
                expect(elements[e].getCssValue('font-size')).to.eventually.equal(arg2);
                expect(elements[e].getCssValue('color')).to.eventually.equal(utils.hexToRgb(arg3));
            }

            callback();
        });
    });

    this.Then(/^The off state of the number indicator is ([^\s]+) ([^\s]+) ([^\s]+), Size ([^\s]+), Colour ([^\s]+)$/, function (arg1, arg2, arg3, arg4, arg5, callback) {
        // Write code here that turns the phrase above into concrete actions
        var expect = this.expect,
            utils = this.utils;

        this.channel.default.isaToolbar.viewBagCount0.then(function (element) {
            // TBD font family
            expect(element.getCssValue('font-weight')).to.eventually.equal(arg2);
            expect(element.getCssValue('font-style')).to.eventually.equal(arg3);
            expect(element.getCssValue('font-size')).to.eventually.equal(arg4);
            expect(element.getCssValue('color')).to.eventually.equal(utils.hexToRgb(arg5));

            callback();
        });
    });

    this.Then(/^The dropshadow is colour \#(\d+)$/, function (arg1, callback) {
        var expect = this.expect,
            utils = this.utils;

        this.channel.default.isaToolbar.layer.then(function(element){
            expect(element.getCssValue('box-shadow')).to.eventually.contain(utils.hexToRgb(arg1, true));
            callback();
        });
    });

    this.Then(/^The 'Customer' word is in ([^\,]+), Size ([^\,]+), Colour ([^\,]+)$/, function (arg1, arg2, arg3, callback) {
        var expect = this.expect,
            utils = this.utils;

        this.channel.default.isaToolbar.customerLabel.then(function(element) {
            // TBD: Font-family check
            expect(element.getCssValue('font-size')).to.eventually.equal(arg2);
            expect(element.getCssValue('color')).to.eventually.equal(utils.hexToRgb(arg3));
            callback();
        });
    });

    this.Then(/^The names of the seller and customer are in ([^\,]+), Size ([^\,]+), Colour ([^\,]+)$/, function (arg1, arg2, arg3, callback) {
        var expect = this.expect,
            utils = this.utils;

        this.channel.default.isaToolbar.custSellerName.then(function(elements) {
            for (var e = 0; e < elements.length; e++) {
                // TBD: Font-family check
                expect(elements[e].getCssValue('font-size')).to.eventually.equal(arg2);
                expect(elements[e].getCssValue('color')).to.eventually.equal(utils.hexToRgb(arg3));
            }
            callback();
        });
    });


    this.Then(/^The \'Sign out\' and \'Wrap up\' links are in ([^\,]+), Size ([^\,]+), Colour ([^\,]+), Style: ([^\,]+)$/, function (arg1, arg2, arg3, arg4, callback) {
        var expect = this.expect,
            utils = this.utils;

        this.channel.default.isaToolbar.linkHover.then(function(elements) {
            for (var e = 0; e < elements.length; e++) {
                // TBD: Font-family check
                expect(elements[e].getCssValue('font-size')).to.eventually.equal(arg2);
                expect(elements[e].getCssValue('color')).to.eventually.equal(utils.hexToRgb(arg3));
                expect(elements[e].getCssValue('text-decoration')).to.eventually.equal(arg4);
            }
            callback();
        });
    });

    this.Then(/The divider line is ([^\s]+) ([^\s]+) ([^\s]+)$/, function (arg1, arg2, arg3, callback) {
        var expect = this.expect,
            utils = this.utils;

        this.channel.default.isaToolbar.basketBlockLinks.then(function(elements) {
            for (var e = 0; e < elements.length; e++) {
                // TBD: Font-family check
                expect(elements[e].getCssValue('border-right-width')).to.eventually.equal(arg1);
                expect(elements[e].getCssValue('border-right-style')).to.eventually.equal(arg2);
                expect(elements[e].getCssValue('border-right-color')).to.eventually.equal(utils.hexToRgb(arg3));
            }

            callback();
        });
    });

    this.Then(/^The number indicator is ([^\,]+), Size ([^\,]+), Colour ([^\,]+)$/, function (arg1, arg2, arg3, callback) {
        var expect = this.expect,
            utils = this.utils;

        this.channel.default.isaToolbar.viewBagCount.then(function (element) {
            // TBD font family
            expect(element.getCssValue('font-size')).to.eventually.equal(arg2);
            expect(element.getCssValue('color')).to.eventually.equal(utils.hexToRgb(arg3));

            callback();
        });
    });

    this.After('@isaToolbarModule', function(callback) {
        this.ptor.manage().deleteAllCookies();
        callback();
    });

};
