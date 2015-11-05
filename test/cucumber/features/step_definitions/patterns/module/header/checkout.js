module.exports = function () {

    //images
    this.Then(/^I should see a logo with dimensions of (\d+)px by (\d+)px$/, function (arg1, arg2, callback) {

        var expect = this.expect,
            element = this.channel.default.headerCheckout.headerCheckoutLogo;

        expect(element.getCssValue('width')).to.eventually.equal(arg1 + 'px')
            .then(function () {
                expect(element.getCssValue('height')).to.eventually.equal(arg2 + 'px').and.notify(callback);
            });
    });

    this.Then(/^I should see a logo aligned to center with a negative margin\-left of \-(\d+)px$/, function (arg1, callback) {

        var expect = this.expect,
            utils = this.utils,
            element = this.channel.default.headerCheckout.headerCheckoutLogo,
            percentageOfEl = this.channel.default.header.innerHeader.getSize(),
            percentage = 50;

        percentageOfEl.then(function (elSize) {
          expect(element.getCssValue('left')).to.eventually.equal(utils.percentageOf(elSize, percentage))
            .then(function () {
                expect(element.getCssValue('margin-left')).to.eventually.equal('-' + arg1 + 'px').and.notify(callback);
            });
        });

    });

    this.Then(/^I should see a logo aligned to the left$/, function (callback) {

        var expect = this.expect,
            element = this.channel.default.headerCheckout.headerCheckoutLogo;

        expect(element.getCssValue('left')).to.eventually.equal('10px')
          .then(function () {
              expect(element.getCssValue('margin-left')).to.eventually.equal('0px').and.notify(callback);
          });
    });

    //layout
    this.Then(/^I should see the progress steps items as ([A-Za-z-]+) on the checkout header$/, function (arg1, callback) {

        var utils = this.utils,
            expect = this.expect,
            element = this.channel.default.headerCheckout.progressStepItem,
            condition = 'getCssValue',
            property = 'display',
            value = {
              arg: arg1,
              argUnit: null,
              argUtil: null,
              argUtilParam: null
            };

        utils.matchCondition(element, expect, condition, property, value, callback);
    });

    this.Then(/^I should see the progress steps items aligned ([A-Za-z]+) on the checkout header$/, function (arg1, callback) {

        var utils = this.utils,
            expect = this.expect,
            element = this.channel.default.headerCheckout.progressStepList,
            condition = 'getCssValue',
            property = 'text-align',
            value = {
              arg: arg1,
              argUnit: null,
              argUtil: null,
              argUtilParam: null
            };

        utils.matchCondition(element, expect, condition, property, value, callback);
    });

    //typography
    this.Then(/^I should see a (\d+)px step number in the progress steps module$/, function (arg1, callback) {

        var utils = this.utils,
            expect = this.expect,
            element = this.channel.default.headerCheckout.progressStepNumber,
            condition = 'getCssValue',
            property = 'font-size',
            value = {
              arg: arg1,
              argUnit: 'px',
              argUtil: null,
              argUtilParam: null
            };

        utils.matchCondition(element, expect, condition, property, value, callback);
    });

    this.Then(/^I should see a (\d+)px text in the progress steps module$/, function (arg1, callback) {

        var utils = this.utils,
            expect = this.expect,
            element = this.channel.default.headerCheckout.progressStepItem,
            condition = 'getCssValue',
            property = 'font-size',
            value = {
              arg: arg1,
              argUnit: 'px',
              argUtil: null,
              argUtilParam: null
            };

        utils.matchCondition(element, expect, condition, property, value, callback);
    });

    this.Then(/^I should see the completed link as hex colour \#(.+) in the progress steps module$/, function (arg1, callback) {

        var utils = this.utils,
            expect = this.expect,
            element = this.channel.default.headerCheckout.progressStepCompleted,
            condition = 'getCssValue',
            property = 'color',
            value = {
              arg: arg1,
              argUnit: null,
              argUtil: utils.hexToRgb,
              argUtilParam: null
            };

        utils.matchCondition(element, expect, condition, property, value, callback);
    });

    this.Then(/^I should see the active text as hex colour \#(.+) in the progress steps module$/, function (arg1, callback) {

        var utils = this.utils,
            expect = this.expect,
            element = this.channel.default.headerCheckout.progressStepActive,
            condition = 'getCssValue',
            property = 'color',
            value = {
              arg: arg1,
              argUnit: null,
              argUtil: utils.hexToRgb,
              argUtilParam: null
            };

        utils.matchCondition(element, expect, condition, property, value, callback);

    });

    this.Then(/^I should see the incomplete text as hex colour \#(.+) in the progress steps module$/, function (arg1, callback) {

        var utils = this.utils,
            expect = this.expect,
            element = this.channel.default.headerCheckout.progressStepIncomplete,
            condition = 'getCssValue',
            property = 'color',
            value = {
              arg: arg1,
              argUnit: null,
              argUtil: utils.hexToRgb,
              argUtilParam: null
            };

        utils.matchCondition(element, expect, condition, property, value, callback);
    });
};
