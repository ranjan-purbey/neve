import { compose } from '@wordpress/compose';
import { withDispatch, withSelect } from '@wordpress/data';
import { ReactSortable } from 'react-sortablejs';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import React from 'react';

const SortableItems = (props) => {
	const { updateElement, metaFieldValue, toggle } = props;
	const elements = props.data.elements;
	return (
		<div>
			<ReactSortable
				className="neve-meta-control neve-meta-sortable-items"
				list={metaFieldValue}
				setList={updateElement}
				handle=".ti-sortable-handle"
				animation="300"
			>
				{metaFieldValue.map((item) => {
					return (
						<div
							className={`ti-sortable-item-area ti-sortable-item-area-${item.id}`}
							key={item.id}
						>
							<div className="ti-sortable-item">
								<Button
									isTertiary
									icon="visibility"
									label={__('Toggle', 'neve')}
									showTooltip={true}
									className="ti-sortable-item-toggle"
									onClick={() => {
										toggle(item.id);
									}}
								/>
								<div className="ti-sortable-item-label">
									{item.value}
								</div>
								<div className="ti-sortable-handle">
									<Button isTertiary icon="menu" />
								</div>
							</div>
						</div>
					);
				})}
			</ReactSortable>
			<div className="disabled-items neve-meta-control">
				{Object.keys(elements).map((value, index) => {
					if (metaFieldValue.find((item) => item.id === value)) {
						return false;
					}

					return (
						<div className="ti-sortable-item-area" key={index}>
							<div className="ti-sortable-item hidden">
								<Button
									isTertiary
									icon="hidden"
									label={__('Toggle', 'neve')}
									showTooltip={true}
									className="ti-sortable-item-toggle"
									onClick={() => {
										toggle(value);
									}}
								/>
								<div className="ti-sortable-item-label">
									{elements[value]}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default compose(
	withDispatch((dispatch, props, { select }) => {
		return {
			updateElement(value) {
				const val = value.map((item) => {
					return item.id;
				});
				props.stateUpdate(props.id, JSON.stringify(val));
				dispatch('core/editor').editPost({
					meta: { [props.id]: JSON.stringify(val) },
				});
			},
			toggle(value) {
				let metaValue = JSON.parse(
					select('core/editor').getEditedPostAttribute('meta')[
						props.id
					] || props.data.default
				);
				if (metaValue.includes(value)) {
					metaValue = metaValue.filter((e) => e !== value);
				} else {
					metaValue.push(value);
				}
				props.stateUpdate(props.id, JSON.stringify(metaValue));
				dispatch('core/editor').editPost({
					meta: { [props.id]: JSON.stringify(metaValue) },
				});
			},
		};
	}),
	withSelect((select, props) => {
		const metaValue = select('core/editor').getEditedPostAttribute('meta')[
			props.id
		];
		const elements = props.data.elements;
		const metaFieldValue = metaValue || props.data.default;
		const values = JSON.parse(metaFieldValue);

		return {
			metaFieldValue: values.map((value) => {
				return { id: value, value: elements[value] };
			}),
		};
	})
)(SortableItems);