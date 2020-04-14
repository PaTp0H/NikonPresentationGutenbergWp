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
		default: imgSrc('soltes/bg-soltes.png')
	},

	slideTitle: {
		type: 'string',
		selector: '.brand_wrapper .gold',
		default: 'THE SOLUTION FOR OPTIMAL NEAR VISION'
  },
  slideSubTitle: {
		type: 'string',
		selector: '.brand_wrapper .white',
		default: 'Lens Optimized For Desk-distance Vision'
	},

  title :{
    type: 'string',
    source: 'html',
    selector: '.sw-optimized__board-title',
    default: 'Typical progressive <br> lenses'
  },

  iconUrl: {
		attribute: 'src',
		selector: '.sw-optimized__board-icon img',
		default: imgSrc("soltes/icon-soltes.svg")
  },

  imgUrl1: {
    attribute: 'src',
		selector: '.sw-optimized__board-img img',
		default: imgSrc('soltes/sw-optimized-01.svg')
  },

  imgUrl2: {
    attribute: 'src',
		selector: '.sw-optimized__board-img img',
		default: imgSrc('soltes/sw-optimized-02.svg')
  },

  itemText1 :{
    type: 'string',
    source: 'html',
    selector: '.sw-optimized__board-txt p',
    default: 'Mid <br> distance'
  },

  itemText2 :{
    type: 'string',
    source: 'html',
    selector: '.sw-optimized__board-txt span',
    default: 'At hand'
  },


};

registerBlockType('presentation/slide84', {
	title: __('Slide: #84', 'np'),
	icon: icon,
	category: 'nikon-catalog',
	attributes: slideAttributes,
	edit({className, attributes, setAttributes}) {

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
							placeholder="SLIDE TITLE"
							className="slide-title-input"
						/>
						 </span>
				<span className="white opacity_animate">
							<RichText
								onChange={content => setAttributes({slideSubTitle: content})}
								value={attributes.slideSubTitle}
								placeholder="Slide subtitle"
								className="slide-subtitle-input"
							/>
					</span>
			</div>

      <div className="screen_body_wrapper start bottom bottom--mod no_relative">
        <div className="sw-optimized">
          <div className="sw-optimized__board">
            <div className="sw-optimized__board-head">
              <div className="sw-optimized__board-col">
                <span className="sw-optimized__board-title">
                  <RichText
                    onChange={content => setAttributes({title: content})}
                    value={attributes.title}
                    
                  />
                </span>
              </div>
              <div className="sw-optimized__board-col">
                <figure className="sw-optimized__board-icon">
                  <MediaUpload
                    onSelect={media => setAttributes({iconUrl: media.url})}
                    type="image"
                    value={attributes.imageID}
                    render={({open}) => getImageButton(open, attributes.iconUrl)}
                  />
                </figure>
              </div>
            </div>
            <div className="sw-optimized__board-body">
              <figure className="sw-optimized__board-img">
                <MediaUpload
                  onSelect={media => setAttributes({imgUrl1: media.url})}
                  type="image"
                  value={attributes.imageID}
                  render={({open}) => getImageButton(open, attributes.imgUrl1)}
                />
              </figure>
              <div className="sw-optimized__board-center">
                <div className="sw-optimized__board-txt">
                  <p>
                    <RichText
                      onChange={content => setAttributes({itemText1: content})}
                      value={attributes.itemText1}
                      
                    />
                  </p>
                </div>
                <div className="sw-optimized__board-txt">
                  <span>
                    <RichText
                      onChange={content => setAttributes({itemText2: content})}
                      value={attributes.itemText2}
                      
                    />
                  </span>
                </div>
              </div>
              <figure className="sw-optimized__board-img">
                <MediaUpload
                  onSelect={media => setAttributes({imgUrl2: media.url})}
                  type="image"
                  value={attributes.imageID}
                  render={({open}) => getImageButton(open, attributes.imgUrl2)}
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>;
	},
	save({attributes}) {

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
        <div className="sw-optimized opacity_animate">
          <div className="sw-optimized__board">
            <div className="sw-optimized__board-head">
              <div className="sw-optimized__board-col">
                <span className="sw-optimized__board-title">
                  <RichText.Content value={attributes.title}/>
                </span>
              </div>
              <div className="sw-optimized__board-col">
                <figure className="sw-optimized__board-icon">
                  <img src={attributes.iconUrl}/>
                </figure>
              </div>
            </div>
            <div className="sw-optimized__board-body">
              <figure className="sw-optimized__board-img">
                <img src={attributes.imgUrl1}/>
              </figure>
              <div className="sw-optimized__board-center">
                <div className="sw-optimized__board-txt">
                  <p>
                    <RichText.Content value={attributes.itemText1}/>
                  </p>
                </div>
                <div className="sw-optimized__board-txt">
                  <span>
                    <RichText.Content value={attributes.itemText2}/>
                  </span>
                </div>
              </div>
              <figure className="sw-optimized__board-img">
                <img src={attributes.imgUrl2}/>
              </figure>
            </div>
          </div>
        </div>
      </div>
		</div>;
	},
});
