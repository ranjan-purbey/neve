import Range from '../../inc/customizer/controls/react/src/range/Range';
import { useState } from '@wordpress/element';
import {
	WhiteBackgroundDecorator,
	CustomizerDecorator,
} from '../components/decorators';

export default {
	title: 'Customizer/Controls/Range',
	component: Range,
	args: {
		label: 'Range Control',
		defaultVal: 50,
		min: 0,
		max: 100,
	},
	argTypes: {
		onChange: { table: { disable: true } },
		value: { table: { disable: true } },
	},
	decorators: [WhiteBackgroundDecorator, CustomizerDecorator],
};

const Template = (args) => {
	const [value, setValue] = useState(args.defaultVal);
	return (
		<>
			<Range
				{...args}
				onChange={setValue}
				defaultVal={args.defaultVal}
				value={value}
			/>
			<br />
			<hr />
			<strong>Value:</strong>
			<pre>{value}</pre>
		</>
	);
};

export const Default = Template.bind({});
export const WithNegativeValues = Template.bind({});
WithNegativeValues.args = {
	min: -100,
	defaultVal: -50,
	max: 0,
};
export const NoDefault = Template.bind({});
NoDefault.args = {
	defaultVal: null,
};
