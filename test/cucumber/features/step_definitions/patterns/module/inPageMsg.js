module.exports = function() {

    this.Then(/^I should see a (.*) box with the background hex colour (.*) and the border as hex colour (.*)$/, function(box, background, border, callback) {
        var expect = this.expect;
        var utils = this.utils;
        this.channel.default.inPageMsg.messageBody(box).then(function(elements) {
            for (var e = 0; e < elements.length; e++) {
                expect(elements[e].getCssValue('background-color')).to.eventually.equal(utils.hexToRgb(background));
                expect(elements[e].getCssValue('border-color')).to.eventually.equal(utils.hexToRgb(border, 1));

                if (e === elements.length - 1) {
                    callback();
                }
            }
        });
    });

    this.Then(/^I should see a (.*) box with an icon as hex colour (.*)$/, function(arg1, arg2, callback) {
        var utils = this.utils,
            expect = this.expect,
            element = this.channel.default.inPageMsg.messageIcon(arg1),
            condition = 'getCssValue',
            property = 'color',
            value = {
              arg: arg2,
              argUnit: null,
              argUtil: utils.hexToRgb,
              argUtilParam: null
            }

        utils.matchCondition(element, expect, condition, property, value, callback);
    });

    this.Then(/^I should see a (.*) box with the body text of the box with the font as hex colour (.*)$/, function(arg1, arg2, callback) {
        var utils = this.utils,
            expect = this.expect,
            element = this.channel.default.inPageMsg.messageContentText(arg1),
            condition = 'getCssValue',
            property = 'color',
            value = {
              arg: arg2,
              argUnit: null,
              argUtil: utils.hexToRgb,
              argUtilParam: null
            }

        utils.matchCondition(element, expect, condition, property, value, callback);
    });

    this.Then(/^I should see a (.*) box with an icon that has font size (\d+)px$/, function(arg1, arg2, callback) {
        var utils = this.utils,
            expect = this.expect,
            element = this.channel.default.inPageMsg.messageIcon(arg1),
            condition = 'getCssValue',
            property = 'font-size',
            value = {
              arg: arg2,
              argUnit: 'px',
              argUtil: null,
              argUtilParam: null
            }

        utils.matchCondition(element, expect, condition, property, value, callback);
    });


    this.Then(/^I should see a (.*) box with the body font size (\d+)pt and the font "([^"]*)"$/, function(box, arg1, arg2, callback) {
        var expect = this.expect;

        this.channel.default.inPageMsg.messageContentText(box).then(function(elements) {
            for (var e = 0; e < elements.length; e++) {
                expect(elements[e].getCssValue('font-family')).to.eventually.equal(arg2);
                expect(elements[e].getCssValue('font-size')).to.eventually.equal(arg1+'px');

                if (e === elements.length - 1) {
                    callback();
                }
            }
        });
    });

    this.Then(/^I should see a (.*) box with the title of the box with font "([^"]*)", font size (\d+)px$/, function(box, arg1, arg2, callback) {
        var expect = this.expect;

        this.channel.default.inPageMsg.messageContentHead(box).then(function(elements) {
            for (var e = 0; e < elements.length; e++) {
                expect(elements[e].getCssValue('font-family')).to.eventually.equal(arg1);
                expect(elements[e].getCssValue('font-size')).to.eventually.equal(arg2+'px');

                if (e === elements.length - 1) {
                    callback();
                }
            }
        });
    });
};
