/* jshint esversion: 6 */
/* global NeveReactCustomize */
import PropTypes from 'prop-types';

import { lazy, Suspense, useEffect, useState } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import React from 'react';

const FontFamilySelector = lazy(() =>
	import(/* webpackChunkName: "ff-selector" */ './FontFamilySelector')
);

const TypefaceComponent = ({ control }) => {
	const [fontFamily, setFontFamily] = useState(control.setting.get());
	const [visible, setVisible] = useState(false);
	const { section } = control.params;

	const defaultParams = {
		default_is_inherit: false,
	};

	const controlParams = control.params.input_attrs
		? {
				...defaultParams,
				...control.params.input_attrs,
		  }
		: defaultParams;

	useEffect(() => {
		window.wp.customize.bind('ready', () => {
			window.wp.customize
				.state('expandedSection')
				.bind((expandedSection) => {
					if (!expandedSection) {
						return;
					}

					if (!expandedSection.id) {
						return;
					}

					if (expandedSection.id === section) {
						setVisible(true);
					}
				});
		});
	}, []);

	const maybeGetTypekitFont = (font) => {
		const { typekitSlugs } = NeveReactCustomize;

		if (!typekitSlugs) {
			return font;
		}

		if (!typekitSlugs[font]) {
			return font;
		}

		return typekitSlugs[font];
	};

	const wrapFonts = (font) => {
		const list = font.split(',');
		const formatList = list.map((fontName) => {
			if (fontName.includes('serif')) {
				return fontName.trim();
			}
			return '"' + fontName.trim() + '"';
		});
		const newFont = formatList.join(', ');
		return newFont;
	};

	const onChoseFont = (fontSource, font) => {
		setFontFamily(font);
		font = wrapFonts(font);
		updateControl(font, fontSource);
	};

	const updateControl = (font, fontSource) => {
		control.setting.set(maybeGetTypekitFont(font));
		if (control.id !== 'neve_fallback_font_family') {
			wp.customize.previewer.send('font-selection', {
				value: maybeGetTypekitFont(font),
				source: fontSource,
				controlId: control.id,
				type: '\\Neve\\Customizer\\Controls\\React\\Font_Family',
				inherit: controlParams.default_is_inherit,
			});
		}
	};

	return (
		<>
			{control.params.label && (
				<span className="customize-control-title">
					{control.params.label}
				</span>
			)}
			<div className="neve-typeface-control neve-white-background-control">
				<Suspense fallback={<Spinner />}>
					{visible && (
						<FontFamilySelector
							fonts={NeveReactCustomize.fonts}
							selected={fontFamily}
							onFontChoice={(fontSource, font) => {
								onChoseFont(fontSource, font);
							}}
							inheritDefault={controlParams.default_is_inherit}
							systemFonts={controlParams.system}
							maybeGetTypekit={maybeGetTypekitFont}
						/>
					)}
				</Suspense>
			</div>
		</>
	);
};

TypefaceComponent.propTypes = {
	control: PropTypes.object.isRequired,
};

export default TypefaceComponent;
