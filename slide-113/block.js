import BrandWrapper from "../../../subcomponents/brand-wrapper";
import newLiner from "../../../subcomponents/newLiner";

const {RichText, PlainText, InnerBlocks, InspectorControls, MediaUpload} = wp.editor;
const {registerBlockType} = wp.blocks;
const {Fragment} = wp.element;
const {SelectControl, Button, Modal, ToggleControl} = wp.components;
const {withState} = wp.compose;
const {__} = wp.i18n;


const slideAttributes = {
	background: {
		attribute: 'style',
		selector: '.screen_section',
		default: imgSrc('power/bg-power.png')
	},
	slideTitle: {
		type: 'string',
		selector: '.brand_wrapper .gold',
		default: 'THE SOLUTION TO REDUCE ABERRATIONS',
	},
	slideSubTitle: {
		type: 'string',
		selector: '.brand_wrapper .white',
		default: 'Technology 2: viewfit technology',
	},
	leftText1: {
		type: 'string',
		selector: '.ms-deformation__text.yellow p',
		source: 'html',
		default: `YOUR CHOICE OF FRAME AND HOW IT UNIQUELY FITS ON YOUR FACE, <span class="np-style-font-weight-extra-bold">CAN IMPACT THE PERFORMANCE OF A LENS.</span><br><br><span style="color: #9c9c9c" class="artb-font-color">BY CONSIDERING YOUR FITTING PARAMETERS, WE HAVE THE ABILITY TO KEEP THE ORIGINAL, INTENDED PERFORMANCE INTACT.</span>`
	},
	items: {
		type: 'array',
		source: 'query',
		selector: '.ms-deformation__content',
		default: [
			{
				image: imgSrc('power/pwr-view-tech-01.png'),
				useImage: false,
				navTitle: 'WRAP<br>ANGLE',
			},
			{
				image: imgSrc('power/pwr-view-tech-02.png'),
				useImage: false,
				navTitle: 'TILT<br>ANGLE',
			},
			{
				image: imgSrc('power/pwr-view-tech-03.png'),
				useImage: false,
				navTitle: 'VERTEX<br>DISTANCE'
			},
		],
		query: {
			image: {
				type: 'string',
				source: 'attribute',
				attribute: 'src',
				selector: '.ms-deformation__view-img img',
			},
			useImage: {
				type: 'boolean',
				source: 'attribute',
				selector: '.meta',
				attribute: 'data-use-image',
				default: false,
			},
			navTitle: {
				type: 'string',
				selector: '.meta .nav-title',
				source: 'html',
			},
			navImage: {
				type: 'string',
				source: 'attribute',
				attribute: 'src',
				selector: '.meta img.nav-image',
			},

		}
	},
};


try {
	var icon = require('./icon').default; //Icon is generated by bash script in the theme root. Use "bash convert-thumbnails-to-svg.bash"
} catch (ex) {
	var icon = 'editor-code';
}

registerBlockType('presentation/slide113', {
	title: __('Slide: 113', 'np'),
	icon: icon,
	category: 'nikon-catalog',
	attributes: slideAttributes,
	edit: withState({
		activeTab: 0,
	})
	(({activeTab, setState, className, attributes, setAttributes}) => {

		console.log('atrs:', attributes);

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

		const item = i => {
			let metaAtts = {};
			if (attributes.items[i].useImage)
				metaAtts['data-use-image'] = 'true';
			return i === activeTab &&
				<div className="ms-deformation__content js-tab-content active" id={`ms-deformation__nav-item-${i}`}>
					<div className="meta" {...metaAtts}>
						<div className="nav-title">{attributes.items[i].navTitle}</div>
						<img src={attributes.items[i].navImage} alt="" className="nav-image"/>
					</div>
					<InspectorControls>
						<h3>{__('Use image instead of text', 'np')}</h3>
						<ToggleControl
							label={__("Use image instead of text for current navigation button?", 'np')}
							help={attributes.items[i].useImage ? __('Image', 'np') : __('Text', 'np')}
							checked={attributes.items[i].useImage}
							onChange={() => {
								let items = attributes.items.slice();
								items[i].useImage = !items[i].useImage;
								setAttributes({items: items});
							}}
						/>
						<br/>
					</InspectorControls>


					<figure className="ms-deformation__view-img">
						<MediaUpload
							onSelect={media => {
								let items = attributes.items.slice();
								items[i].image = media.url;
								setAttributes({items: items});
							}}
							type="image"
							value={attributes.imageID}
							render={({open}) => getImageButton(open, attributes.items[i].image)}
						/>
					</figure>

				</div>
		};

		const tabItem = i => <div
			href={`#ms-deformation__nav-item-${i}`}
			className={(i === activeTab ? 'active ' : '') + "ms-deformation__nav-item js-tab-link"}
			onClick={(e) => {
				e.preventDefault();
				setState({activeTab: i});
			}}>
			<div className="ms-deformation__nav-inner">
				{attributes.items[i].useImage && <figure className="ms-deformation__nav-icon">
					<MediaUpload
						onSelect={media => {
							let items = attributes.items.slice();
							items[i].navImage = media.url;
							setAttributes({items: items});
						}}
						type="image"
						value={attributes.imageID}
						render={({open}) => getImageButton(i === activeTab ? open : () => false, attributes.items[i].navImage)}
					/>
				</figure>}

				{!attributes.items[i].useImage && <RichText
					onChange={content => {
						let items = attributes.items.slice();
						items[i].navTitle = content;
						setAttributes({items: items});
					}}
					value={attributes.items[i].navTitle}
				/>}

			</div>
		</div>;


		return <div className={className + " block-presentation-slide all-empty"} style={{backgroundImage: `url(${attributes.background})`}}>

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
							className="slide-title-input"
						/>
					</span>
					<span className="white opacity_animate">
							<RichText
								onChange={content => setAttributes({slideSubTitle: content})}
								value={attributes.slideSubTitle}
								className="slide-subtitle-input"
							/>
					</span>
			</div>
			<div className="screen_body_wrapper no_relative">
				<div className="ms-deformation opacity_animate ms-deformation--power">
					<div className="ms-deformation__left stress">
						<div className="ms-deformation__descr">
							<div className="ms-deformation__text yellow">
								<p>
									<RichText
										onChange={content => setAttributes({leftText1: content})}
										value={attributes.leftText1}
									/>
								</p>
							</div>
						</div>
					</div>
					<div className="ms-deformation__right stress">
						<div className="ms-deformation__view js-tab-wrap">
							{attributes.items.map((el, i) => item(i))}
							<div className="ms-deformation__nav">
								{attributes.items.map((el, i) => tabItem(i))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
			;
	}),
	save: ({attributes}) => {

		const activeTab = 0;

		const item = i => {
			let metaAtts = {};
			if (attributes.items[i].useImage)
				metaAtts['data-use-image'] = 'true';
			return <div className={"ms-deformation__content js-tab-content"} data-for-content={i+1}>
				<div className="meta" {...metaAtts}>
					<div className="nav-title"><RichText.Content value={attributes.items[i].navTitle}/></div>
					<img src={attributes.items[i].navImage} alt="" className="nav-image"/>
				</div>

				<figure className="ms-deformation__view-img">
					<img src={attributes.items[i].image} alt=""/>
				</figure>

			</div>
		};

		const tabItem = i =>  <a
			data-href={i+1}
			className={(i === activeTab ? 'active ' : '') + "ms-deformation__nav-item js-tile-item"}>
			<div className="ms-deformation__nav-inner">
				{attributes.items[i].useImage && <figure className="ms-deformation__nav-icon">
					<img src={attributes.items[i].navImage} alt=""/>
				</figure>}

				{!attributes.items[i].useImage && <RichText.Content value={attributes.items[i].navTitle}/>}

			</div>
		</a>;

		return <div className="screen_section screen_section--not-padding" data-section="#_SLIDE_NUMBER"
					style={{backgroundImage: `url(${attributes.background})`}}>

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
				<div className="ms-deformation opacity_animate ms-deformation--power">
					<div className="ms-deformation__left stress">
						<div className="ms-deformation__descr">
							<div className="ms-deformation__text yellow">
								<p>
									<RichText.Content value={attributes.leftText1}/>
								</p>
							</div>
						</div>
					</div>
					<div className="ms-deformation__right stress">
						<div className="ms-deformation__view js-tile-wrap" data-tab-content="1">
							{attributes.items.map((el, i) => item(i))}
							<div className="ms-deformation__nav">
								{attributes.items.map((el, i) => tabItem(i))}
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
			;
	},
});
