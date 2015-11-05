module.exports = function () {

    this.After(function (callback) {
        browser.clearMockModules();
        callback();
    });

    this.Given(/^I run Cucumber with Protractor$/, function (next) {
        next();
    });

    this.Then(/^it should still do normal tests$/, function (next) {
        this.expect(true).to.equal(true);
        next();
    });

    this.Then(/^it should expose the correct global variables$/, function (next) {
        this.expect(protractor).to.exist;
        this.expect(browser).to.exist;
        this.expect(by).to.exist;
        this.expect(element).to.exist;
        this.expect($).to.exist;
        next();
    });
};
