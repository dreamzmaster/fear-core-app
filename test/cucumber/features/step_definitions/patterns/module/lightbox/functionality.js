module.exports = function () {

    var data;

    this.Before('@ajax-lightbox', function (callback) {
        data = this.xhrDataSource("/command/MSHelloWorldLightbox", 'ajaxLightbox');
        callback();
    });

    this.When(/^I open a (.*) lightbox$/, function (buttonId, callback) {

        var lightbox = this.channel.default.lightbox;

        lightbox.initialize(buttonId);

        lightbox.open().click().then(function () {

            lightbox.setActive(true);

            lightbox.open().getAttribute('mns-lightbox-open').then(function () {
                callback();
            });
        });
    });

    this.Then(/^the lightbox should be open$/, function (callback) {

        var lightbox = this.channel.default.lightbox;

        this.expect(lightbox.modal().getAttribute('class'))
            .to.eventually.have.string('lightbox--active').and.notify(callback);

        this.expect(lightbox.modal().getAttribute('data-original-id'))
            .to.eventually.equal(lightbox.contentId)
            .and.notify(callback);
    });

    this.When(/^I click the close button$/, function (callback) {

        var lightbox = this.channel.default.lightbox;

        lightbox.close().click().then(function () {
            lightbox.setActive(false);
            callback();
        });
    });

    this.Then(/^the lightbox should be closed$/, function (callback) {

        var lightbox = this.channel.default.lightbox;

        this.expect(lightbox.modal().getAttribute('class'))
            .to.not.eventually.have.string('lightbox--active')
            .and.notify(callback);
    });

    this.Then(/^I should see ajax data in content area$/, function (callback) {

        var expect = this.expect;

        this.channel.default.lightbox.content().getText().then(function (text) {
            expect(text).to.equal(data.content);
            callback();
        });
    });
};
