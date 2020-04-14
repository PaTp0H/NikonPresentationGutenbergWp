const {RichText, PlainText, InnerBlocks, InspectorControls, MediaUpload} = wp.editor;
const {registerBlockType} = wp.blocks;
const {Fragment} = wp.element;
const {SelectControl, Button, ToggleControl} = wp.components;
const {__} = wp.i18n;

try {
	var icon = require('./icon').default; //Icon is generated by bash script in the theme root. Use "bash convert-thumbnails-to-svg.bash"
} catch (ex) {
	var icon = 'editor-code';
}

const slideAttributes = {
	background: {
		attribute: 'style',
		selector: '.screen_section',
		default: imgSrc('blue-uv/bg-blue-uv.png')
	},

	slideTitle: {
		type: 'string',
		selector: '.brand_wrapper .gold',
		default: 'SUMMARY OF THE BENEFITS',
		source: 'html',
	},

	iconSrc1: {
		attribute: 'src',
		selector: '.pl-summary__item-icon img',
		default: imgSrc('blue-uv/buv-benefits-icon-04.svg')
	},

	itemText1: {
		type: 'string',
		selector: '.pl-summary__item-name.first',
		default: 'CLEANER',
		source: 'html',
	},

	iconSrc2: {
		attribute: 'src',
		selector: '.pl-summary__item-icon img',
		default: imgSrc('blue-uv/buv-benefits-icon-03.svg')
	},

	itemText2: {
		type: 'string',
		selector: '.pl-summary__item-name.second',
		default: 'TOUGHER',
		source: 'html',
	},

	iconSrc3: {
		attribute: 'src',
		selector: '.pl-summary__item-icon img',
		default: imgSrc('blue-uv/buv-benefits-icon-05.svg')
	},

	itemText3: {
		type: 'string',
		selector: '.pl-summary__item-name.third',
		default: 'DUST<br>FREE',
		source: 'html',
	},

	iconSrc4: {
		attribute: 'src',
		selector: '.pl-summary__item-icon img',
		default: imgSrc('blue-uv/buv-benefits-icon-02.svg')
	},

	itemText4: {
		type: 'string',
		selector: '.pl-summary__item-name.four',
		default: 'UV PROTECTION',
		source: 'html',
	},

	iconSrc5: {
		attribute: 'src',
		selector: '.pl-summary__item-icon img',
		default: imgSrc('plus-uv/pl-benefits-icon.svg')
	},

	itemText5: {
		type: 'string',
		selector: '.pl-summary__item-name.five',
		default: 'CLEARER',
		source: 'html',
	},

	footText: {
		type: 'string',
		source: 'html',
		selector: '.pl-summary__foot',
		default: '<span style="font-size: 13px" class="artb-font-size">E-SPF</span><sup class="artb-7703"><span style="font-size: 13px" class="artb-font-size">®</span></sup><span style="font-size: 13px" class="artb-font-size"> 25 for all SeeCoat Plus UV clear lenses except with 1.5 index lenses E-SPF</span><sup class="artb-7703"><span style="font-size: 13px" class="artb-font-size">®</span></sup><span style="font-size: 13px" class="artb-font-size"> index = 10. E-SPF</span><sup class="artb-7703"><span style="font-size: 13px" class="artb-font-size">®</span></sup><span style="font-size: 13px" class="artb-font-size"> is a global index rating the overall UV protection of a lens. E-SPF</span><sup class="artb-7703"><span style="font-size: 13px" class="artb-font-size">®</span></sup><span style="font-size: 13px" class="artb-font-size"> was developed by Essilor International and endorsed by 3rd party experts. Lens performance only. The E-SPF</span><sup class="artb-7703"><span style="font-size: 13px" class="artb-font-size">®</span></sup><span style="font-size: 13px" class="artb-font-size"> index excludes direct eye exposure that depends on external factors (wearer’s morphology, frame shape, position of wear).</span>'
	},
};

registerBlockType('presentation/slide78', {
	title: __('Slide: #78', 'np'),
	icon: icon,
	category: 'nikon-catalog',
	attributes: slideAttributes,
	edit({className, attributes, setAttributes}) {

		console.log(attributes);
		const getImageButton = (openEvent, value) => {

			if (value)
				return (
					<img
						src={value}
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
					style={{backgroundImage: `url(${attributes.background})`}}>

			<InspectorControls>
				<h3>{__('Pick background image', 'np')}:</h3>
				<MediaUpload
					onSelect={media => {
						setAttributes({background: media.url});
					}}
					type="image"
					value={attributes.imageID}
					render={({open}) => getImageButton(open, attributes.background)}
				/>
			</InspectorControls>

			<div className="brand_wrapper">
					<span className="gold">
						<RichText
							onChange={content => setAttributes({slideTitle: content})}
							value={attributes.slideTitle}
							placeholder="SLIDE TITLE"
							className="slide-title-input"
						/>
						 </span>
			</div>

			<div className="screen_body_wrapper start bottom bottom--mod no_relative">
				<div className="pl-summary">
					<div className="pl-summary__holder">
						<div className="pl-summary__col left">
							<div className="pl-summary__item">
								<figure className="pl-summary__item-icon">
									<MediaUpload
										onSelect={media => setAttributes({iconSrc1: media.url})}
										type="image"
										value={attributes.imageID}
										render={({open}) => getImageButton(open, attributes.iconSrc1)}
									/>
								</figure>
								<span className="pl-summary__item-name first">
                  <RichText
					  onChange={content => setAttributes({itemText1: content})}
					  value={attributes.itemText1}

				  />
                </span>
							</div>
							<div className="pl-summary__item">
								<figure className="pl-summary__item-icon">
									<MediaUpload
										onSelect={media => setAttributes({iconSrc2: media.url})}
										type="image"
										value={attributes.imageID}
										render={({open}) => getImageButton(open, attributes.iconSrc2)}
									/>
								</figure>
								<span className="pl-summary__item-name second">
                  <RichText
					  onChange={content => setAttributes({itemText2: content})}
					  value={attributes.itemText2}

				  />
                </span>
							</div>
							<div className="pl-summary__item">
								<figure className="pl-summary__item-icon">
									<MediaUpload
										onSelect={media => setAttributes({iconSrc3: media.url})}
										type="image"
										value={attributes.imageID}
										render={({open}) => getImageButton(open, attributes.iconSrc3)}
									/>
								</figure>
								<span className="pl-summary__item-name third">
                  <RichText
					  onChange={content => setAttributes({itemText3: content})}
					  value={attributes.itemText3}

				  />
                </span>
							</div>
						</div>
						<div className="pl-summary__center">
							<figure className="pl-summary__img">
								<img src={imgSrc("plus-uv/pl-summary.png")} alt="img"/>
							</figure>
						</div>
						<div className="pl-summary__col right">
							<div className="pl-summary__item">
								<figure className="pl-summary__item-icon mod">
									<MediaUpload
										onSelect={media => setAttributes({iconSrc4: media.url})}
										type="image"
										value={attributes.imageID}
										render={({open}) => getImageButton(open, attributes.iconSrc4)}
									/>
								</figure>
								<span className="pl-summary__item-name four">
                  <RichText
					  onChange={content => setAttributes({itemText4: content})}
					  value={attributes.itemText4}

				  />
                </span>
							</div>
							<div className="pl-summary__item">
								<figure className="pl-summary__item-icon">
									<MediaUpload
										onSelect={media => setAttributes({iconSrc5: media.url})}
										type="image"
										value={attributes.imageID}
										render={({open}) => getImageButton(open, attributes.iconSrc5)}
									/>
								</figure>
								<span className="pl-summary__item-name five">
                  <RichText
					  onChange={content => setAttributes({itemText5: content})}
					  value={attributes.itemText5}

				  />
                </span>
							</div>
						</div>
					</div>
					<div className="pl-summary__foot">
						<RichText
							onChange={content => setAttributes({footText: content})}
							value={attributes.footText}
						/>
					</div>
				</div>
			</div>
		</div>;
	},
	save({attributes}) {

		return <div className="screen_section screen_section--not-padding" data-section="#_SLIDE_NUMBER"
					style={{backgroundImage: `url(${attributes.background})`}}>

			{(attributes.slideTitle) &&
			<div className="brand_wrapper">
				{attributes.slideTitle &&
				<span className="gold">
						<RichText.Content value={attributes.slideTitle}/>
					</span>
				}
			</div>
			}

			<div className="screen_body_wrapper start bottom bottom--mod no_relative">
				<div className="pl-summary opacity_animate">
					<div className="pl-summary__holder">
						<div className="pl-summary__col left">
							<div className="pl-summary__item">
								<figure className="pl-summary__item-icon">
									<img src={attributes.iconSrc1}/>
								</figure>
								<span className="pl-summary__item-name first">
                  <RichText.Content value={attributes.itemText1}/>
                </span>
							</div>
							<div className="pl-summary__item">
								<figure className="pl-summary__item-icon">
									<img src={attributes.iconSrc2}/>
								</figure>
								<span className="pl-summary__item-name second">
                  <RichText.Content value={attributes.itemText2}/>
                </span>
							</div>
							<div className="pl-summary__item">
								<figure className="pl-summary__item-icon">
									<img src={attributes.iconSrc3}/>
								</figure>
								<span className="pl-summary__item-name third">
                  <RichText.Content value={attributes.itemText3}/>
                </span>
							</div>
						</div>
						<div className="pl-summary__center">
							<figure className="pl-summary__img">
								<img src={imgSrc("plus-uv/pl-summary.png")} alt="img"/>
							</figure>
						</div>
						<div className="pl-summary__col right">
							<div className="pl-summary__item">
								<figure className="pl-summary__item-icon mod">
									<img src={attributes.iconSrc4}/>
								</figure>
								<span className="pl-summary__item-name four">
                  <RichText.Content value={attributes.itemText4}/>
                </span>
							</div>
							<div className="pl-summary__item">
								<figure className="pl-summary__item-icon">
									<img src={attributes.iconSrc5}/>
								</figure>
								<span className="pl-summary__item-name five">
                  <RichText.Content value={attributes.itemText5}/>
                </span>
							</div>
						</div>
					</div>
					<div className="pl-summary__foot">
						<RichText.Content value={attributes.footText}/>
					</div>
				</div>
			</div>
		</div>;
	},
});
