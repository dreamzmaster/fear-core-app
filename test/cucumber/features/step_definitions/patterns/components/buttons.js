module.exports = function() {

    this.Then(/^the ([^"]*) background colour should be defined as “\#(.+)”$/, function (arg1, arg2, callback) {
        var utils = this.utils,
            expect = this.expect,
            element = this.channel.default.buttons[arg1],
            condition = 'getCssValue',
            property = 'background-color',
            value = {
                arg: arg2,
                argUnit: null,
                argUtil: utils.hexToRgb,
                argUtilParam: null
            }

        utils.matchCondition(element, expect, condition, property, value, callback);
    });

    this.Then(/^the ([^"]*) border colour should be defined as “\#(.+)”$/, function (arg1, arg2, callback) {
        var utils = this.utils,
            expect = this.expect,
            element = this.channel.default.buttons[arg1],
            condition = 'getCssValue',
            property = 'border-color',
            value = {
                arg: arg2,
                argUnit: null,
                argUtil: utils.hexToRgb,
                argUtilParam: 1
            }

        utils.matchCondition(element, expect, condition, property, value, callback);
    });

    this.Then(/^the font colour should be defined as “\#(.+)”$/, function (arg1, callback) {
        var utils = this.utils,
            expect = this.expect,
            element = this.channel.default.buttons.all,
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

    this.Then(/^the font size should be defined as “(\d+)px”$/, function (arg1, callback) {
        var utils = this.utils,
            expect = this.expect,
            element = this.channel.default.buttons.all,
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

    this.Then(/^the font family should be defined as “([^"]*)”$/, function (arg1, callback) {
        var utils = this.utils,
            expect = this.expect,
            element = this.channel.default.buttons.all,
            condition = 'getCssValue',
            property = 'font-family',
            value = {
                arg: arg1,
                argUnit: null,
                argUtil: null,
                argUtilParam: null
            }

        utils.matchCondition(element, expect, condition, property, value, callback);
    });

    this.Then(/^the padding should be defined as “(\d+)px” “(\d+)px”$/, function (arg1, arg2, callback) {

        var expect = this.expect,
            utils = this.utils,
            element = this.channel.default.buttons.all,
            argument = arg1 + 'px ' + arg2 + 'px';

        element.then(function (elements) {
            for (var i = 0; i < elements.length; i++) {
                expect(elements[i].getCssValue('padding')).to.eventually.equal(argument);

                if (i === elements.length - 1) {
                    callback();
                }
            }
        });

    });

    this.Then(/^the bottom margin should be defined as “(\d+)px”$/, function (arg1, callback) {
        var utils = this.utils,
            expect = this.expect,
            element = this.channel.default.buttons.all,
            condition = 'getCssValue',
            property = 'margin-bottom',
            value = {
                arg: arg1,
                argUnit: 'px',
                argUtil: null,
                argUtilParam: null
            }

        utils.matchCondition(element, expect, condition, property, value, callback);
    });

    this.Then(/^the hover over background colour should be defined as “\#(.+)”$/, function (arg1, callback) {
        /*var utils = this.utils,
         expect = this.expect,
         element = this.channel.default.buttons.all;

         element.then(function (buttons) {
         for (var i = 0, j = buttons.length - 1; i < j; i++) {
         browser.actions().mouseMove(buttons[i]).perform();
         buttons[i].getCssValue('background-color').then(function(colour) {
         console.log(colour);
         expect(colour).to.equal(utils.hexToRgb(arg1));
         });
         if (i === j) {
         callback();
         }
         }
         });
         */
        callback.pending();
    });

    this.Then(/^the hover over border colour should be defined as “\#(.+)”$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the mobile width should be defined as “(\d+)%”$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the mobile maximum width should be defined as “(\d+)px”$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

}