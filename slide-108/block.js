const {RichText, PlainText, InnerBlocks, InspectorControls, MediaUpload} = wp.editor;
const {registerBlockType} = wp.blocks;
const {Fragment} = wp.element;
const {SelectControl, Button} = wp.components;
const {__} = wp.i18n;

window.imgSrc = function img(src) {
	return window.hasOwnProperty('presentationScriptLocalizedData') ? `${window.presentationScriptLocalizedData.themeUrl}/src/img/${src}` : `/wp-content/themes/nikon/src/img/${src}`;
};

try {
	var icon = require('./icon').default; //Icon is generated by bash script in the theme root. Use "bash convert-thumbnails-to-svg.bash"
} catch (ex) {
	var icon = 'editor-code';
}

registerBlockType('presentation/slide108', {
	title: __('Slide: #108 Benefits (4 items)', 'np'),
	icon: icon,
	category: 'nikon-presentations',
	attributes: {
		slideTitle: {
			type: 'string',
			selector: '.brand_wrapper .gold',
			source: 'html',
			default: 'CONSUMER EXPERIENCE',
		},
		slideSubTitle: {
			type: 'string',
			selector: '.brand_wrapper .white',
			source: 'html',
			default: 'Benefits of choosing Nikon',
		},


		cardWhiteTitle_top: {
			type: 'string',
			selector: '.card_top .title',
			source: 'html',
			default: '<span style="font-size: 29px" class="artb-font-size">CONSUMER</span><br><span style="color: #c09800" class="artb-font-color">LOYALTY</span>',
		},
		cardDescription_top: {
			type: 'string',
			selector: '.card_top .descr',
			source: 'html',
			default: 'People who receive excellent customer service are more likely to repurchase from the store.',
		},


		cardWhiteTitle_bottom: {
			type: 'string',
			selector: '.card_bottom .title',
			source: 'html',
			default: '<span style="font-size: 29px" class="artb-font-size">ATTENTION-</span><br><span style="color: #c09800" class="artb-font-color">GRABBING</span>',
		},
		cardDescription_bottom: {
			type: 'string',
			selector: '.card_bottom .descr',
			source: 'html',
			default: 'The in-store technology lets potential customers use window displays to interact with your store, which grabs their attention and convinces them to continue the experience inside',
		},


		cardWhiteTitle_left: {
			type: 'string',
			selector: '.card_left .title',
			source: 'html',
			default: '<span style="font-size: 29px" class="artb-font-size">POSITIVE</span><br><span style="color: #c09800" class="artb-font-color">WORD-OF-MOUTH</span>',
		},
		cardDescription_left: {
			type: 'string',
			selector: '.card_left .descr',
			source: 'html',
			default: 'Those who have a good experience in-store are more likely to recommend your store.',
		},


		cardWhiteTitle_right: {
			type: 'string',
			selector: '.card_right .title',
			source: 'html',
			default: '<span style="font-size: 29px" class="artb-font-size">REVENUE</span><br><span style="color: #c09800" class="artb-font-color">BOOSTER</span>',
		},
		cardDescription_right: {
			type: 'string',
			selector: '.card_right .descr',
			source: 'html',
			default: 'Because of the increasing customer loyalty and positive word-of-mouth, revenue grows faster.',
		},


		imageUrl1: {
			default: imgSrc('bg/shop-bg.jpg')
		}
	}

	,
	edit({className, attributes, setAttributes}) {

		console.log(attributes);

		const card = (cardClass, whiteTitlePlaceholder, goldTitlePlaceholder, descriptionPlaceholder) => {
			return <div className={`card card_${cardClass}`} style={img(`card-${cardClass}.png`)}>
				<div className="card_inner">
					<h4 className="title">
						<RichText
							onChange={content => setAttributes({[`cardWhiteTitle_${cardClass}`]: content})}
							value={attributes[`cardWhiteTitle_${cardClass}`]}
							placeholder={whiteTitlePlaceholder}
						/>
					</h4>
					<p className="descr">
						<RichText
							onChange={content => setAttributes({[`cardDescription_${cardClass}`]: content})}
							value={attributes[`cardDescription_${cardClass}`]}
							placeholder={descriptionPlaceholder}
						/>
					</p>
				</div>
			</div>
		};

		const getImageButton = (openEvent, i) => {

			//	console.log(attributes);

			if (attributes[`imageUrl${i}`])
				return (
					<img
						src={attributes[`imageUrl${i}`]}
						onClick={openEvent}
						className="image"
					/>
				);

			return (
				<div className="button-container">
					<Button
						onClick={openEvent}
						className="button button-large"
					>
						{__('Pick an image', 'np')}
					</Button>
				</div>
			);

		};

		return <div className={className + " block-presentation-slide all-empty"}
					style={{backgroundImage: `url(${attributes.imageUrl1})`}}>

			<InspectorControls>
				<h3>{__('Set the background')}</h3>
				<MediaUpload
					onSelect={media => {
						setAttributes({imageAlt: media.alt, imageUrl1: media.url});
					}}
					type="image"
					value={attributes.imageID}
					render={({open}) => getImageButton(open, 1)}
				/>
			</InspectorControls>


			<div className="brand_wrapper">
					<span className="gold">
						<RichText
							onChange={content => setAttributes({slideTitle: content})}
							value={attributes.slideTitle}
							placeholder="ICONIC BRAND"
							className="slide-title-input"
						/>
						 </span>
				<span className="white opacity_animate">
							<RichText
								onChange={content => setAttributes({slideSubTitle: content})}
								value={attributes.slideSubTitle}
								placeholder="Benefits of choosing Nikon"
								className="slide-subtitle-input"
							/>
					</span>
			</div>

			<div className="screen_body_wrapper no_relative">
				<div className="four_cards four_cards--benefits opacity_animate">
					{card('top', 'CONSUMER', 'LOYALTY', 'People who receive excellent customer service are more likely to repurchase from the store.')}
					{card('right', 'REVENUE', 'BOOSTER', 'Because of the increasing customer loyalty and positive word-of-mouth, revenue grows faster.')}
					{card('bottom', 'ATTENTION-', 'GRABBING', 'The in-store technology lets potential customers use window displays to interact with your store, which grabs their attention and convinces them to continue the experience inside.')}
					{card('left', 'POSITIVE', 'WORD-OF-MOUTH', 'Those who have a good experience in-store are more likely to recommend your store. ')}
				</div>
			</div>


		</div>;
	},
	save({attributes}) {

		const card = (cardClass) => {

			return (attributes[`cardWhiteTitle_${cardClass}`] || attributes[`cardGoldTitle_${cardClass}`] || attributes[`cardDescription_${cardClass}`]) &&
				<div className={`card card_${cardClass}`} style={img(`card-${cardClass}.png`)}>
					<div className="card_inner">
						{attributes[`cardWhiteTitle_${cardClass}`] &&
						<h4 className="title">
							{attributes[`cardWhiteTitle_${cardClass}`] &&
							<RichText.Content value={attributes[`cardWhiteTitle_${cardClass}`]}/>
							}
						</h4>
						}
						{attributes[`cardDescription_${cardClass}`] &&
						<p className="descr">
							<RichText.Content value={attributes[`cardDescription_${cardClass}`]}/>
						</p>
						}
					</div>
				</div>
		};


		return <div className="screen_section " data-section="#_SLIDE_NUMBER"
					style={attributes.imageUrl1 ? {backgroundImage: `url(${attributes.imageUrl1})`} : img('bg1@2x.jpg')}>

			{(attributes.slideTitle || attributes.slideSubTitle) &&
				<div className="brand_wrapper">
					{attributes.slideTitle &&
					<span className="gold">
						<RichText.Content value={attributes.slideTitle}/>
					</span>
					}
					{attributes.slideSubTitle &&
					<span className="white opacity_animate">
						<RichText.Content value={attributes.slideSubTitle}/>
					</span>
					}
				</div>
			}

			<div className="screen_body_wrapper no_relative">
				<div className="four_cards four_cards--benefits opacity_animate">
					{card('top')}
					{card('right')}
					{card('bottom')}
					{card('left')}
				</div>
			</div>


		</div>;
	},
})
;
