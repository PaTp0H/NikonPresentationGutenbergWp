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
		default: imgSrc('wide/bg-wide.png')
	},

	slideTitle: {
		type: 'string',
		selector: '.brand_wrapper .gold',
		default: 'THE SOLUTION TO REDUCE ABERRATIONS'
	},

	slideSubTitle: {
		type: 'string',
		selector: '.brand_wrapper .white',
		default: 'The precision of optical calculation at the heart of technology'
	},

	topText: {
		type: 'string',
		source: 'html',
		selector: '.wd-calculation__text',
		default: 'Your lenses are calculated based on more than'
	},

	paramVal: {
		type: 'string',
		source: 'html',
		selector: '.wd-calculation__param-val',
		default: '12'
	},

	paramTitle: {
		type: 'string',
		source: 'html',
		selector: '.wd-calculation__param-title',
		default: 'PARAMETERS'
	},

	paramSubtitle: {
		type: 'string',
		source: 'html',
		selector: '.wd-calculation__param-subtitle',
		default: 'unique to you'
	},

	items: {
		type: 'array',
		source: 'query',
		selector: '.wd-calculation__col',
		default: [
			{
				itemIcon: imgSrc('wide/wd-calc-icon-01.svg'),
				itemName: 'Index'
			},
			{
				itemIcon: imgSrc('wide/wd-calc-icon-02.svg'),
				itemName: 'cylinder'
			},
			{
				itemIcon: imgSrc('wide/wd-calc-icon-03.svg'),
				itemName: 'sphere'
			},
			{
				itemIcon: imgSrc('wide/wd-calc-icon-04.svg'),
				itemName: 'axis'
			},
			{
				itemIcon: imgSrc('wide/wd-calc-icon-05.svg'),
				itemName: 'ACCOMMODATION'
			},
			{
				itemIcon: imgSrc('wide/wd-calc-icon-06.svg'),
				itemName: 'design'
			},
			{
				itemIcon: imgSrc('wide/wd-calc-icon-07.svg'),
				itemName: 'tilt angle'
			},
			{
				itemIcon: imgSrc('wide/wd-calc-icon-08.svg'),
				itemName: 'wrap angle'
			},
			{
				itemIcon: imgSrc('wide/wd-calc-icon-09.svg'),
				itemName: 'frame shape'
			},
			{
				itemIcon: imgSrc('wide/wd-calc-icon-10.svg'),
				itemName: 'eye-lens distance'
			},
			{
				itemIcon: imgSrc('wide/wd-calc-icon-11.svg'),
				itemName: 'reading distance'
			},
			{
				itemIcon: imgSrc('wide/wd-calc-icon-12.svg'),
				itemName: 'progression length'
			},
		],
		query: {
			itemIcon: {
				type: 'string',
				source: 'attribute',
				attribute: 'src',
				selector: '.wd-calculation__item-img img',
			},
			itemName: {
				type: 'string',
				selector: '.wd-calculation__item-name',
				source: 'html',
			},
		},
	},

	bottomText: {
		type: 'string',
		source: 'html',
		selector: '.wd-calculation__text div',
		default: 'and these measurements are transferred to the'
	},

	bottomText2: {
		type: 'string',
		source: 'html',
		selector: '.wd-calculation__text span',
		default: 'in Japan where the calculation takes place.'
	},

	bottomTitle: {
		type: 'string',
		source: 'html',
		selector: '.wd-calculation__title',
		default: 'Nikon Optical<br>Design Engine'
	},

	description: {
		type: 'string',
		source: 'html',
		selector: '.wd-calculation__descr p',
		default: 'A lens of the highest quality that has the sharpest and most comfortable vision'
	},

	imgUrl: {
		attribute: 'src',
		selector: '.wd-calculation__board-img img',
		default: imgSrc('wide/wd-calculation.png')
	},

	boardTxt: {
		type: 'string',
		source: 'html',
		selector: '.wd-calculation__board-txt',
		default: 'Your lenses have been optimized out of'
	},

	boardTxt2: {
		type: 'string',
		source: 'html',
		selector: '.wd-calculation__board-txt span',
		default: '(that’s 93 quintillion) possible combinations.'
	},

	boardVal: {
		type: 'string',
		source: 'html',
		selector: '.wd-calculation__board-value',
		default: '93,000,000,000,000,000,000'
	},
};

registerBlockType('presentation/slide97', {
	title: __('Slide: #97', 'np'),
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

    const item = (i) => {
      return <div class="wd-calculation__col">
        <div class="wd-calculation__item">
          <figure class="wd-calculation__item-img">
            <MediaUpload
              onSelect={media => {
                let items = attributes.items.slice();
                items[i].itemIcon = media.url;
                setAttributes({items: items});
              }}
              type="image"
              value={attributes.imageID}
              render={({open}) => getImageButton(open, attributes.items[i].itemIcon)}
            />
          </figure>
          <span class="wd-calculation__item-name">
            <RichText
              onChange={content => {
                let items = attributes.items.slice();
                items[i].itemName = content;
                setAttributes({items: items});
              }}
              value={attributes.items[i].itemName}
            />
          </span>
				</div>
			</div>
		}


		return <div className={className + " block-presentation-slide all-empty"}
					style={{backgroundImage: `url(${attributes.background})`}}>

			<InspectorControls>
				<h3>{__('Pick background image:', 'np')}</h3>
				<MediaUpload
					onSelect={media => {
						setAttributes({background: media.url});
					}}
					type="image"
					value={attributes.imageID}
					render={({open}) => getImageButton(open, attributes.background)}
				/>
				<br/>
				<br/>
			</InspectorControls>

			<div className="brand_wrapper">
        <span className="gold">
          <RichText
            onChange={content => setAttributes({slideTitle: content})}
            value={attributes.slideTitle}
            className="slide-title-input"
          />
        </span>
        <span className="white">
          <RichText
            onChange={content => setAttributes({slideSubTitle: content})}
            value={attributes.slideSubTitle}
            className="slide-subtitle-input"
          />
        </span>
			</div>

			<div className="screen_body_wrapper start bottom bottom--mod no_relative">
				<div className="wd-calculation">
					<div className="wd-calculation__wrap">
						<div className="wd-calculation__left">
							<div className="wd-calculation__top">
                <span className="wd-calculation__text">
                  <RichText
					  onChange={content => setAttributes({topText: content})}
					  value={attributes.topText}
				  />
                </span>
								<div className="wd-calculation__param">
                  <span className="wd-calculation__param-val">
                    <RichText
						onChange={content => setAttributes({paramVal: content})}
						value={attributes.paramVal}
					/>
                  </span>
									<div className="wd-calculation__param-info">
                    <span className="wd-calculation__param-title">
                      <RichText
						  onChange={content => setAttributes({paramTitle: content})}
						  value={attributes.paramTitle}
					  />
                    </span>
										<span className="wd-calculation__param-subtitle">
                      <RichText
						  onChange={content => setAttributes({paramSubtitle: content})}
						  value={attributes.paramSubtitle}
					  />
                    </span>
									</div>
								</div>
							</div>

							<div className="wd-calculation__middle">
								<div className="wd-calculation__row">
									{attributes.items.map((el, i) => {
										return item(i);
									})}
								</div>
							</div>

							<div className="wd-calculation__bottom">
                <span className="wd-calculation__text">
                  <div>
                    <RichText
						onChange={content => setAttributes({bottomText: content})}
						value={attributes.bottomText}
					/>
                  </div>
                </span>
								<span className="wd-calculation__title">
                  <RichText
					  onChange={content => setAttributes({bottomTitle: content})}
					  value={attributes.bottomTitle}
				  />
                </span>
								<span className="wd-calculation__text">
                  <span>
                    <RichText
						onChange={content => setAttributes({bottomText2: content})}
						value={attributes.bottomText2}
					/>
                  </span>
                </span>
							</div>
						</div>
						<div className="wd-calculation__right">
							<div className="wd-calculation__descr">
								<p>
									<RichText
										onChange={content => setAttributes({description: content})}
										value={attributes.description}
									/>
								</p>
							</div>
							<div className="wd-calculation__board">
								<figure className="wd-calculation__board-img">
									<MediaUpload
										onSelect={media => setAttributes({imgUrl: media.url})}
										type="image"
										value={attributes.imageID}
										render={({open}) => getImageButton(open, attributes.imgUrl)}
									/>
								</figure>
								<div className="wd-calculation__board-content">
                  <span className="wd-calculation__board-txt">
                    <RichText
						onChange={content => setAttributes({boardTxt: content})}
						value={attributes.boardTxt}
					/>
                  </span>
									<span className="wd-calculation__board-value">
                    <RichText
						onChange={content => setAttributes({boardVal: content})}
						value={attributes.boardVal}
					/>
                  </span>
									<span className="wd-calculation__board-txt gray">
                    <span>
                      <RichText
						  onChange={content => setAttributes({boardTxt2: content})}
						  value={attributes.boardTxt2}
					  />
                    </span>
                  </span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>;
	},
	save({attributes}) {

    const item = (i) => {
      return <div class="wd-calculation__col">
        <div class="wd-calculation__item">
          <figure class="wd-calculation__item-img">
            <img src={attributes.items[i].itemIcon}/>
          </figure>
          <span class="wd-calculation__item-name">
            <RichText.Content value={attributes.items[i].itemName}/>
          </span>
				</div>
			</div>
		}

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
				<div className="wd-calculation opacity_animate">
					<div className="wd-calculation__wrap">
						<div className="wd-calculation__left">
							<div className="wd-calculation__top">
                <span className="wd-calculation__text">
                  <RichText.Content value={attributes.topText}/>
                </span>
								<div className="wd-calculation__param">
                  <span className="wd-calculation__param-val">
                    <RichText.Content value={attributes.paramVal}/>
                  </span>
									<div className="wd-calculation__param-info">
                    <span className="wd-calculation__param-title">
                      <RichText.Content value={attributes.paramTitle}/>
                    </span>
										<span className="wd-calculation__param-subtitle">
                      <RichText.Content value={attributes.paramSubtitle}/>
                    </span>
									</div>
								</div>
							</div>

							<div className="wd-calculation__middle">
								<div className="wd-calculation__row">
									{attributes.items.map((el, i) => {
										return item(i);
									})}
								</div>
							</div>

							<div className="wd-calculation__bottom">
                <span className="wd-calculation__text">
                  <div>
                    <RichText.Content value={attributes.bottomText}/>
                  </div>
                </span>
								<span className="wd-calculation__title">
                  <RichText.Content value={attributes.bottomTitle}/>
                </span>
								<span className="wd-calculation__text">
                  <span>
                    <RichText.Content value={attributes.bottomText2}/>
                  </span>
                </span>
							</div>
						</div>
						<div className="wd-calculation__right">
							<div className="wd-calculation__descr">
								<p>
									<RichText.Content value={attributes.description}/>
								</p>
							</div>
							<div className="wd-calculation__board">
								<figure className="wd-calculation__board-img">
									<img src={attributes.imgUrl}/>
								</figure>
								<div className="wd-calculation__board-content">
                  <span className="wd-calculation__board-txt">
                    <RichText.Content value={attributes.boardTxt}/>
                  </span>
									<span className="wd-calculation__board-value">
                    <RichText.Content value={attributes.boardVal}/>
                  </span>
									<span className="wd-calculation__board-txt gray">
                    <span>
                      <RichText.Content value={attributes.boardTxt2}/>
                    </span>
                  </span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>;
	},
});
