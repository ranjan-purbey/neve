/* jshint esversion: 6 */
import Repeater from './Repeater';
import { maybeParseJson } from '../common/common';
import PropTypes from 'prop-types';
import { useState } from '@wordpress/element';

const RepeaterComponent = ({ control }) => {
	const [value, setValue] = useState(maybeParseJson(control.setting.get()));
	const fields = control.params.fields;

	const updateValue = (newVal) => {
		setValue(newVal);
		control.setting.set(JSON.stringify(newVal));
	};

	return <Repeater fields={fields} value={value} onUpdate={updateValue} />;
};

RepeaterComponent.propTypes = {
	control: PropTypes.object.isRequired,
};

export default RepeaterComponent;
