module.exports = function () {

    this.Then(/^I should see close button in top right corner of the lightbox$/, function (callback) {

        var expect = this.expect,
            lightbox = this.channel.default.lightbox;

        expect(lightbox.close().getCssValue('top')).to.eventually.equal('0px')
            .then(function () {
                expect(lightbox.close().getCssValue('right')).to.eventually.equal('0px').and.notify(callback);
            });
    });

    this.Then(/^Close button is (\d+)px by (\d+)px$/, function (arg1, arg2, callback) {

        var expect = this.expect,
            lightbox = this.channel.default.lightbox;

        // get padding value of close button
        lightbox.close().getCssValue('padding').then(function (paddingValue) {

            // test if close button width (as specified in feature file) + padding equals ...
            expect(lightbox.close().getCssValue('width')).to.eventually.equal((parseInt(arg1, 10) + (parseInt(paddingValue, 10) * 2) ) + 'px')
                .then(function () {
                    expect(lightbox.close().getCssValue('height')).to.eventually.equal((parseInt(arg2, 10) + (parseInt(paddingValue, 10) * 2) ) + 'px').and.notify(callback);
                });
        });
    });

    this.Then(/^Padding around close button is (\d+)px$/, function (arg1, callback) {

        var expect = this.expect,
            lightbox = this.channel.default.lightbox;

        expect(lightbox.close().getCssValue('padding')).to.eventually.equal(arg1 + 'px').and.notify(callback);
    });

    this.Then(/^I should see (top|right|bottom|left) padding is (\d+px)$/, function (arg1, arg2, callback) {

        var expect = this.expect,
            lightbox = this.channel.default.lightbox;

        expect(lightbox.container().getCssValue('padding-' + arg1)).to.eventually.equal(arg2).and.notify(callback);
    });

    this.Then(/^I should see lightbox fit to width of the screen$/, function (callback) {

        var expect = this.expect,
            windowSize = browser.driver.manage().window().getSize(),
            elementSize = this.channel.default.lightbox.container().getSize();

        windowSize.then(function (wSize) {
            var windowWidth = wSize.width;
            elementSize.then(function (eSize) {
                var elementWidth = eSize.width;
                expect(elementWidth).to.equal(windowWidth);
                callback();
            });
        });
    });

    this.Then(/^I should be able to scroll the content up and down$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^I should see lightbox background is \#(.+)$/, function (arg1, callback) {

        var expect = this.expect,
            overlay = this.channel.default.overlay,
            utils = this.utils;

        expect(overlay.container().getCssValue('background-color')).to.eventually.equal(utils.hexToRgb(arg1)).and.notify(callback);
    });

    this.Then(/^(\d+)% opacity is shown underneath$/, function (arg1, callback) {

        var step = this,
            expect = this.expect,
            overlay = this.channel.default.overlay;

        overlay.container().getCssValue('opacity').then(function (opacity){
            var currentValue = parseFloat(opacity),
                expectedValue = step.utils.percentageToDecimal(arg1);

            expect(currentValue).to.be.closeTo(expectedValue, 0.001);
            callback();
        });
    });

    this.When(/^I hover over the close button$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^I should see lightbox colour is changed to \#(\d+)$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I tap\/click on close button$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^I should see lightbox colour is changed to stronger \#(\d+)$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });
}