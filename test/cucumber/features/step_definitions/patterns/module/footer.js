module.exports = function () {

    this.Then(/^Only (\d+) page footer should be on the page$/, function (arg1, callback) {

        var expect = this.expect;

        this.channel.default.footer.pageFooter.then(function (elements) {
            expect(parseInt(elements.length, 10)).to.equal(parseInt(arg1, 10));
            callback();
        });
    });

    this.Then(/^I should see a (\d+)px anchor link in the footer module$/, function (arg1, callback) {

        var utils = this.utils,
            expect = this.expect,
            element = this.channel.default.footer.footerLink,
            condition = 'getCssValue',
            property = 'font-size',
            value = {
              arg: arg1,
              argUnit: 'px',
              argUtil: null,
              argUtilParam: null
            }

        utils.matchCondition(element, expect, condition, property, value, callback);
    });

    this.Then(/^I should see the anchor link as colour (\#.*) in the footer module$/, function (arg1, callback) {

        var utils = this.utils,
            expect = this.expect,
            element = this.channel.default.footer.footerLink,
            condition = 'getCssValue',
            property = 'color',
            value = {
              arg: arg1,
              argUnit: null,
              argUtil: utils.hexToRgb,
              argUtilParam: null
            }

        utils.matchCondition(element, expect, condition, property, value, callback);
    });

    this.Then(/^The padding (.*) of the footer module should be (\d+)px$/, function (arg1, arg2, callback) {

        var expect = this.expect,
            element = this.channel.default.footer.footerLinks,
            cssProperties = this.utils.getArrayOfCssProperties(arg1);

        element.then(function (elements) {
            for (var i = 0; i < cssProperties.length; i++) {
                var prop = cssProperties[i];
                expect(elements[0].getCssValue('padding-'+prop)).to.eventually.equal(arg2+'px');

                if (i === cssProperties.length - 1) {
                    callback();
                }
            }
        });
    });

    this.Then(/^The margin (.*) of the footer module should be (\d+)px$/, function (arg1, arg2, callback) {
        var expect = this.expect,
            element = this.channel.default.footer.footerLinks,
            cssProperties = this.utils.getArrayOfCssProperties(arg1);

        element.then(function (elements) {
            for (var i = 0; i < cssProperties.length; i++) {
                var prop = cssProperties[i];
                expect(elements[0].getCssValue('margin-'+prop)).to.eventually.equal(arg2+'px');

                if (i === cssProperties.length - 1) {
                    callback();
                }
            }
        });
    });
};
