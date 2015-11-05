module.exports = function () {

    this.Then(/^I should be advised to check my delivery and payment details before placing my order$/, function (callback) {
        var expect = this.expect;

        this.channel.default.orderReview.greetingMsgEl.then(function (element) {
            expect(element.getCssValue('display')).to.eventually.equal('block').notify(callback);
            callback();
        });
    });

    this.Then(/^I should not be advised to check my delivery and payment details before placing my order$/, function (callback) {
        var expect = this.expect;

        this.channel.default.orderReview.greetingMsgEl.then(function (element) {
            expect(element.getCssValue('display')).to.eventually.equal('none');
            callback();
        });
    });
};
