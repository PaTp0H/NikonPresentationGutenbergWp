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
		default: imgSrc('advance/bg-advance.png')
	},
	slideTitle: {
		type: 'string',
		selector: '.brand_wrapper .gold',
    default: 'BENEFITS',
    source: 'html',
  },
  slideSubTitle: {
		type: 'string',
		selector: '.brand_wrapper .white',
    default: 'Optimal vision width for far, intermediate and near for all round usage',
    source: 'html',
	},
	items: {
		type: 'array',
		source: 'query',
		selector: '.wd-sharper__content',
		default: [
			{
				title: '',
				image: imgSrc('advance/adv-optimal-01.jpg'),
				navTitle: 'CONVENTIONAL PROGRESSIVE LENS',
				useImage: false,
			},
			{
				title: 'SHARPER & WIDER DESIGN',
				image: imgSrc('advance/adv-optimal-02.jpg'),
				useImage: true,
				navImage: imgSrc('advance/icon-advance.svg'),
			},
		],
		query: {
			title: {
				type: 'string',
				selector: '.wd-sharper__head p',
				source: 'html',
			},
			image: {
				type: 'string',
				source: 'attribute',
				attribute: 'src',
				selector: '.wd-sharper__img img',
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

registerBlockType('presentation/slide98', {
	title: __('Slide: 98', 'np'),
	icon: icon,
	category: 'nikon-catalog',
	attributes: slideAttributes,
	edit: withState({
		activeTab: 0,
	})
	(({activeTab, setState, className, attributes, setAttributes}) => {

		console.log("ATTS: ", attributes);


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
				<div className="wd-sharper__content active js-tab-content" id={`adv-optimal-item-${i}`}>
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


					<div className={(0 === i ? 'white ' : '') + "wd-sharper__head"}>
						<p>
							<RichText
								onChange={content => {
									let items = attributes.items.slice();
									items[i].title = content;
									setAttributes({items: items});
								}}
								value={attributes.items[i].title}
							/>
						</p>
					</div>
					<figure className="wd-sharper__img">
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
			href={`#adv-optimal-item-${i}`}
			className={(i === activeTab ? 'active ' : '') + "wd-sharper__nav-item js-tab-link"}
			onClick={(e) => {
				e.preventDefault();
				setState({activeTab: i});
			}}>
			<div className="wd-sharper__nav-inner">
				{attributes.items[i].useImage && <figure className="wd-sharper__nav-icon">
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
            placeholder="BENEFITS"
            className="slide-title-input"
          />
        </span>
        <span className="white">
          <RichText
            onChange={content => setAttributes({slideSubTitle: content})}
            value={attributes.slideSubTitle}
            placeholder="Optimal vision width for far, intermediate and near for all round usage"
            className="slide-subtitle-input"
          />
        </span>
			</div>

			<div className="screen_body_wrapper start bottom no_relative">
				<div className="wd-sharper wd-sharper--advance">
					<div className="wd-sharper__board js-tab-wrap">


						{attributes.items.map((el, i) => item(i))}

						<div className="wd-sharper__nav">
							{attributes.items.map((el, i) => tabItem(i))}
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
			return <div className={(i === activeTab ? 'active ' : ' ') +"wd-sharper__content js-tab-content"} id={`adv-optimal-item-${i}`}>
				<div className="meta" {...metaAtts}>
					<div className="nav-title">{attributes.items[i].navTitle}</div>
					<img src={attributes.items[i].navImage} alt="" className="nav-image"/>
				</div>

				<div className={(0 === i ? 'white ' : '') + "wd-sharper__head"}>
					<p>
						<RichText.Content value={attributes.items[i].title}/>
					</p>
				</div>
				<figure className="wd-sharper__img">
					<img src={attributes.items[i].image} alt=""/>
				</figure>

			</div>
		};

		const tabItem = i => <a
			href={`#adv-optimal-item-${i}`}
			className={(i === activeTab ? 'active ' : '') + "wd-sharper__nav-item js-tab-link"}>
			<div className="wd-sharper__nav-inner">
				{attributes.items[i].useImage && <figure className="wd-sharper__nav-icon">
					<img src={attributes.items[i].navImage} alt=""/>
				</figure>}

				{!attributes.items[i].useImage && <RichText.Content value={attributes.items[i].navTitle}/>}

			</div>
		</a>;

		return <div className="screen_section screen_section--not-padding" data-section="#_SLIDE_NUMBER" style={{backgroundImage: `url(${attributes.background})`}}>

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

			<div className="screen_body_wrapper start bottom bottom--mod no_relative">
				<div className="wd-sharper wd-sharper--advance opacity_animate">
					<div className="wd-sharper__board js-tab-wrap">

						{attributes.items.map((el, i) => item(i))}

						<div className="wd-sharper__nav">
							{attributes.items.map((el, i) => tabItem(i))}
						</div>
					</div>
				</div>
			</div>

		</div>
			;
	},
});
