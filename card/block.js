const {RichText, PlainText, InnerBlocks, InspectorControls, MediaUpload} = wp.editor;
const {registerBlockType} = wp.blocks;
const {Fragment} = wp.element;
const {SelectControl, Modal, Button} = wp.components;
const {withState} = wp.compose;

registerBlockType('presentation/card', {
	title: 'Card',
	icon: icon,
	category: 'nikon-presentations',
	attributes: {
		preTitle: {type: 'string'},
		title: {type: 'string'},
		description: {type: 'string'},
		style: {type: 'string', default: 'left'}
	},
	edit({className, attributes, setAttributes}) {
		let advClassName = `card_${attributes.style}`, image = `card-${attributes.style}`;
		return <Fragment>
			<InspectorControls>
				<SelectControl
					label="Card Style" value={attributes.style} onChange={style => setAttributes({style: style})}
					options={[
						{label: 'Left', value: 'left'},
						{label: 'Right', value: 'right'},
						{label: 'Top', value: 'top'},
						{label: 'Bottom', value: 'bottom'},
					]}/>
			</InspectorControls>
			<div className={advClassName} style={img(image)}>
				<div className="card_inner">
					<PlainText value={attributes.preTitle} placeholder="Subtitle" className="title title--prev"
							   onChange={content => setAttributes({preTitle: content})}/>
					<PlainText value={attributes.title} placeholder="Title" className="title"
							   onChange={content => setAttributes({title: content})}/>

					<PlainText value={attributes.description} placeholder="Description" className="descr"
							   onChange={content => setAttributes({description: content})}/>
				</div>
			</div>
		</Fragment>;
	},
	save({attributes}) {
		let advClassName = `card_${attributes.style}`, image = `card-${attributes.style}`;
		return <div className={advClassName} style={img(image)}>
			<div className="card_inner">
				<h4 className="title">
					{attributes.preTitle && <span>{attributes.preTitle}</span>}
					{attributes.title}
				</h4>
				<p className="descr">{attributes.description}</p>
			</div>
		</div>;
	},
});