const slugify = require('slugify');
describe('Visual Regression Testing - https://qa-neve.themeisle.com/neve-child-theme/2012/01/04/template-password-protected/#comment-32', () => {
	let url = "https://qa-neve.themeisle.com/neve-child-theme/2012/01/04/template-password-protected/#comment-32";

	let maskElement = 'label[for="vscf_captcha"],.elementor-widget-google_maps,.pikaday__display,.elementor-video-iframe';
	let clipElement = '.eaw-typed-text,.product .related.products,.captcha_img,.elementor-element-38f7ff1e,.elementor-widget-container[style*="will-change"], .particles-js-canvas-el,.product_list_widget li + li, .exclusive.products';

	it('Should not add any visual change', function () {
		cy.visit(url);
		cy.maskAndClip(maskElement, clipElement);
		cy.captureDocument(slugify(url));
	});
});