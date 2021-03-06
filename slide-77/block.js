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

	cardTxt: {
		type: 'string',
		source: 'html',
		selector: '.pl-superior__card',
		default: 'Do you experience <br> your lens to be <br> scratched <br> and smudged easily?'
	},

  infoTxt :{
    type: 'string',
    selector: '.pl-superior__info-txt',
    default: 'Are you looking',
    source: 'html',
  },

  infoFor :{
    type: 'string',
    selector: '.pl-superior__info-decor-txt',
    default: 'for',
    source: 'html',
  },

	title: {
		type: 'string',
		source: 'html',
		selector: '.pl-superior__info-title',
		default: 'superior<br>protection'
	},

  description :{
    type: 'string',
    selector: '.pl-superior__info-descr',
    default: 'and a longer lasting lens?',
    source: 'html',
  },
};

registerBlockType('presentation/slide77', {
	title: __('Slide: #77', 'np'),
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

      <div className="screen_body_wrapper start bottom bottom--mod no_relative">
        <div class="pl-superior">
          <figure class="pl-superior__bg">
            <img src={imgSrc("plus-uv/pl-superior.png")} alt="img"/>
          </figure>
          <div class="pl-superior__holder">
            <div class="pl-superior__card">
              <RichText
                onChange={content => setAttributes({cardTxt: content})}
                value={attributes.cardTxt}
                placeholder={slideAttributes.cardTxt.default.replace(/(<([^>]+)>)/ig,"")}
              />
            </div>
            <div class="pl-superior__info">
              <span class="pl-superior__info-txt">
                <RichText
                  onChange={content => setAttributes({infoTxt: content})}
                  value={attributes.infoTxt}
                  placeholder={slideAttributes.infoTxt.default.replace(/(<([^>]+)>)/ig,"")}
                />
              </span>
              <span class="pl-superior__info-decor-txt">
                <RichText
                  onChange={content => setAttributes({infoFor: content})}
                  value={attributes.infoFor}
                  placeholder={slideAttributes.infoFor.default.replace(/(<([^>]+)>)/ig,"")}
                />
              </span>
							<div className="pl-superior__info-inner">
                <span className="pl-superior__info-title">
                  <RichText
					  onChange={content => setAttributes({title: content})}
					  value={attributes.title}
					  placeholder={slideAttributes.title.default.replace(/(<([^>]+)>)/ig,"")}
				  />
                </span>
                <span class="pl-superior__info-descr">
                  <RichText
                    onChange={content => setAttributes({description: content})}
                    value={attributes.description}
                    placeholder={slideAttributes.description.default.replace(/(<([^>]+)>)/ig,"")}
                  />
                </span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>;
	},
	save({attributes}) {

		return <div className="screen_section screen_section--not-padding" data-section="#_SLIDE_NUMBER" style={{backgroundImage: `url(${attributes.background})`}}>

      <div className="screen_body_wrapper start bottom bottom--mod no_relative">
        <div class="pl-superior opacity_animate">
          <figure class="pl-superior__bg">
            <img src={imgSrc("plus-uv/pl-superior.png")} alt="img"/>
          </figure>
          <div class="pl-superior__holder">
            <div class="pl-superior__card">
              <RichText.Content value={attributes.cardTxt}/>
            </div>
            <div class="pl-superior__info">
              <span class="pl-superior__info-txt">
                <RichText.Content value={attributes.infoTxt}/>
              </span>
              <span class="pl-superior__info-decor-txt">
                <RichText.Content value={attributes.infoFor}/>
              </span>
							<div className="pl-superior__info-inner">
                <span className="pl-superior__info-title">
                  <RichText.Content value={attributes.title}/>
                </span>
                <span class="pl-superior__info-descr">
                  <RichText.Content value={attributes.description}/>
                </span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>;
	},
});
