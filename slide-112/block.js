import MyFontSizePicker from '../../../subcomponents/MyFontSizePicker';

const {RichText, PlainText, InnerBlocks, InspectorControls, MediaUpload} = wp.editor;
const {registerBlockType} = wp.blocks;
const {Fragment} = wp.element;
const {SelectControl, Button, Modal, ToggleControl} = wp.components;
const {withState} = wp.compose;
const {__, sprintf, _n} = wp.i18n;


import {namedAttrObj, imgUploader} from '../../../utils';
import newLine from '../../../subcomponents/newLiner';
import Select from 'react-select';
import {PopupTemplate} from '../../../subcomponents/PopupTemplate';

const valueFromId = (opts, id) => opts.find(o => o.value == id);

const popupTemplates = [
	new PopupTemplate({
		name: __('Template #1', 'np'),
		image: imgSrc('popup-templates/popup-template-21.png'),
		slug: 'template-21',
		popupAtts: {
			toggle1Image: {
                type: 'string',
                source: 'attribute',
                attribute: 'src',
                selector: '[data-toggle="1"] .ult-insights__popup-img img',
                default: imgSrc("digilife/dgl-popup-01.png"),
            },
            toggle1Title: {
                type: 'string',
                selector: '[data-toggle="1"] .ult-insights__popup-title',
                default: `<span style="font-size: 19px" class="artb-font-size">CONVENTIONAL PROGRESSIVE LENS</span>`,
                source: 'html',
            },
    
            toggle2Image: {
                type: 'string',
                source: 'attribute',
                attribute: 'src',
                selector: '[data-toggle="2"] .ult-insights__popup-img img',
                default: imgSrc("digilife/dgl-popup-02.png")
            },
            toggle2Head: {
                type: 'string',
                selector: '[data-toggle="2"] .ult-insights__popup-head',
                default: `<span style="font-size: 20px" class="artb-font-size">DIGITAL DISTANCE AREA IS MORE THAN DOUBLED</span><br><span class="np-style-font-weight-bold"><span style="font-size: 25px" class="artb-font-size">WIDTH + 114% / FIELD + 138%</span></span>`,
                source: 'html',
            },
            toggle2Icon: {
                type: 'string',
                source: 'attribute',
                attribute: 'src',
                selector: '[data-toggle="2"] .ult-insights__popup-icon img',
                default: imgSrc("digilife/icon-digilife.svg")
            },
		},
		edit: function (attributes, setAttributes) {
	
			if (!attributes)
				attributes = {};
			return <div className="ult-insights__popup--digilife">
                <div className="popup-toggler__content" data-toggle="1">
					<div className="ult-insights__popup-head"/>
                    <figure className="ult-insights__popup-img">
                        <MediaUpload
                            onSelect={media => {
                                let atts = Object.assign({}, attributes);
                                atts[`${this.slug}-toggle1Image`] = media.url;
                                setAttributes(atts);
                            }}
                            type="image"
                            value={attributes[`${this.slug}-toggle1Image`]}
                            render={({open}) => this.getImageButton(open, attributes[`${this.slug}-toggle1Image`])}
                        />
                    </figure>
                    <div className="ult-insights__popup-bottom">
						<span className="ult-insights__popup-title">
							<RichText
								onChange={content => {
									let atts = Object.assign({}, attributes);
									atts[`${this.slug}-toggle1Title`] = content;
									setAttributes(atts);
								}}
								value={attributes[`${this.slug}-toggle1Title`]}
							/>
						</span>
                    </div>
                </div>
                <div className="popup-toggler__content" data-toggle="2">
                    <div className="ult-insights__popup-head">
						<RichText
							onChange={content => {
								let atts = Object.assign({}, attributes);
								atts[`${this.slug}-toggle2Head`] = content;
								setAttributes(atts);
							}}
							value={attributes[`${this.slug}-toggle2Head`]}
						/>
                    </div>
                    <figure className="ult-insights__popup-img">
                        <MediaUpload
                            onSelect={media => {
                                let atts = Object.assign({}, attributes);
                                atts[`${this.slug}-toggle2Image`] = media.url;
                                setAttributes(atts);
                            }}
                            type="image"
                            value={attributes[`${this.slug}-toggle2Image`]}
                            render={({open}) => this.getImageButton(open, attributes[`${this.slug}-toggle2Image`])}
                        />
                    </figure>
                    <div className="ult-insights__popup-bottom">
						<figure className="ult-insights__popup-icon">
							<MediaUpload
								onSelect={media => {
									let atts = Object.assign({}, attributes);
									atts[`${this.slug}-toggle2Icon`] = media.url;
									setAttributes(atts);
								}}
								type="image"
								value={attributes[`${this.slug}-toggle2Icon`]}
								render={({open}) => this.getImageButton(open, attributes[`${this.slug}-toggle2Icon`])}
							/>
						</figure>
                    </div>
                </div>
            </div>;
			
		},
		save: function (attributes) {
			if (!attributes)
				attributes = {};
					return <div className='popup-template ' data-popup={this.slug}>
						<div className="popup popup-toggler ult-insights__popup ult-insights__popup--digilife">
							<button className="popup__close js-close-popup-btn"/>
							<div className="popup-toggler__content" data-toggle="1">
							<div className="ult-insights__popup-head"/>
							<figure className="ult-insights__popup-img">
								<img src={attributes[`${this.slug}-toggle1Image`]} alt=""/>
							</figure>
							<div className="ult-insights__popup-bottom">
								<span className="ult-insights__popup-title">
									<RichText.Content value={attributes[`${this.slug}-toggle1Title`]}/>
								</span>
							</div>
						</div>
						<div className="popup-toggler__content" data-toggle="2">
							<div className="ult-insights__popup-head">
								<RichText.Content value={attributes[`${this.slug}-toggle2Head`]}/>
							</div>
							<figure className="ult-insights__popup-img">
								<img src={attributes[`${this.slug}-toggle2Image`]} alt=""/>
							</figure>
							<div className="ult-insights__popup-bottom">
								<figure className="ult-insights__popup-icon">
									<img src={attributes[`${this.slug}-toggle2Icon`]} alt=""/>
								</figure>
							</div>
						</div>
					<div className="popup-toggler__btn js-popup-change-btn"/>
				</div>
			</div>
		}
	}),
	new PopupTemplate({
		name: __('Template #empty', 'np'),
		image: imgSrc('popup-templates/popup-template-21.png'),
		slug: 'template-empty',
		popupAtts: {
		},
		edit: function (attributes, setAttributes) {
	
			if (!attributes)
				attributes = {};
			return <div className="ult-insights__popup--empty"></div>;
			
		},
		save: function (attributes) {
			if (!attributes)
				attributes = {};
					return <div className="ult-insights__popup--empty"></div>
		}
	}),
    new PopupTemplate({
        name: __('Template #2', 'np'),
        image: imgSrc('popup-templates/popup-template-22.png'),
        slug: 'template-22',
        popupAtts: {
			toggle1Image: {
                type: 'string',
                source: 'attribute',
                attribute: 'src',
                selector: '[data-toggle="1"] .ult-insights__popup-img img',
                default: imgSrc("digilife/dgl-popup-03.png"),
            },
            toggle1Title: {
                type: 'string',
                selector: '[data-toggle="1"] .ult-insights__popup-title',
                default: `<span style="font-size: 19px" class="artb-font-size">CONVENTIONAL PROGRESSIVE LENS</span>`,
                source: 'html',
            },
    
            toggle2Image: {
                type: 'string',
                source: 'attribute',
                attribute: 'src',
                selector: '[data-toggle="2"] .ult-insights__popup-img img',
                default: imgSrc("digilife/dgl-popup-04.png")
            },
            toggle2Icon: {
                type: 'string',
                source: 'attribute',
                attribute: 'src',
                selector: '[data-toggle="2"] .ult-insights__popup-icon img',
                default: imgSrc("digilife/icon-digilife.svg")
            },
        },
        edit: function (attributes, setAttributes) {
    
            if (!attributes)
				attributes = {};
				return <div className="ult-insights__popup--digilife">
                <div className="popup-toggler__content" data-toggle="1">
					<div className="ult-insights__popup-head"/>
                    <figure className="ult-insights__popup-img">
                        <MediaUpload
                            onSelect={media => {
                                let atts = Object.assign({}, attributes);
                                atts[`${this.slug}-toggle1Image`] = media.url;
                                setAttributes(atts);
                            }}
                            type="image"
                            value={attributes[`${this.slug}-toggle1Image`]}
                            render={({open}) => this.getImageButton(open, attributes[`${this.slug}-toggle1Image`])}
                        />
                    </figure>
                    <div className="ult-insights__popup-bottom">
						<span className="ult-insights__popup-title">
							<RichText
								onChange={content => {
									let atts = Object.assign({}, attributes);
									atts[`${this.slug}-toggle1Title`] = content;
									setAttributes(atts);
								}}
								value={attributes[`${this.slug}-toggle1Title`]}
							/>
						</span>
                    </div>
                </div>
                <div className="popup-toggler__content" data-toggle="2">
                    <div className="ult-insights__popup-head"/>
                    <figure className="ult-insights__popup-img">
                        <MediaUpload
                            onSelect={media => {
                                let atts = Object.assign({}, attributes);
                                atts[`${this.slug}-toggle2Image`] = media.url;
                                setAttributes(atts);
                            }}
                            type="image"
                            value={attributes[`${this.slug}-toggle2Image`]}
                            render={({open}) => this.getImageButton(open, attributes[`${this.slug}-toggle2Image`])}
                        />
                    </figure>
                    <div className="ult-insights__popup-bottom">
						<figure className="ult-insights__popup-icon">
							<MediaUpload
								onSelect={media => {
									let atts = Object.assign({}, attributes);
									atts[`${this.slug}-toggle2Icon`] = media.url;
									setAttributes(atts);
								}}
								type="image"
								value={attributes[`${this.slug}-toggle2Icon`]}
								render={({open}) => this.getImageButton(open, attributes[`${this.slug}-toggle2Icon`])}
							/>
						</figure>
                    </div>
                </div>
            </div>;
				
    	},
        save: function (attributes) {
            if (!attributes)
				attributes = {};

			return <div className='popup-template ' data-popup={this.slug}>
				<div className="popup popup-toggler ult-insights__popup ult-insights__popup--digilife">
					<button className="popup__close js-close-popup-btn"/>
					<div className="popup-toggler__content" data-toggle="1">
					<div className="ult-insights__popup-head"/>
					<figure className="ult-insights__popup-img">
						<img src={attributes[`${this.slug}-toggle1Image`]} alt=""/>
					</figure>
					<div className="ult-insights__popup-bottom">
						<span className="ult-insights__popup-title">
							<RichText.Content value={attributes[`${this.slug}-toggle1Title`]}/>
						</span>
					</div>
				</div>
				<div className="popup-toggler__content" data-toggle="2">
					<div className="ult-insights__popup-head"/>
					<figure className="ult-insights__popup-img">
						<img src={attributes[`${this.slug}-toggle2Image`]} alt=""/>
					</figure>
					<div className="ult-insights__popup-bottom">
						<figure className="ult-insights__popup-icon">
							<img src={attributes[`${this.slug}-toggle2Icon`]} alt=""/>
						</figure>
					</div>
				</div>
			<div className="popup-toggler__btn js-popup-change-btn"/>
		</div>
	</div>
    	}
    }),
    new PopupTemplate({
        name: __('Template #3', 'np'),
        image: imgSrc('popup-templates/popup-template-23.png'),
        slug: 'template-23',
        popupAtts: {
            toggle1Image: {
                type: 'string',
                source: 'attribute',
                attribute: 'src',
                selector: '[data-toggle="1"] .ult-insights__popup-img img',
                default: imgSrc("digilife/dgl-popup-05.png"),
            },
            toggle1Head: {
                type: 'string',
                selector: '[data-toggle="1"] .ult-insights__popup-head',
                default: `<span style="font-size: 20px" class="artb-font-size">SIGNIFICANT PERIPERAL DISTORTION</span>`,
                source: 'html',
            },
            toggle1Title: {
                type: 'string',
                selector: '[data-toggle="1"] .ult-insights__popup-title',
                default: `<span style="color: #fff" class="artb-font-color"><span style="font-size: 19px" class="artb-font-size">CONVENTIONAL PROGRESSIVE LENS</span></span>`,
                source: 'html',
            },
    
            toggle2Image: {
                type: 'string',
                source: 'attribute',
                attribute: 'src',
                selector: '[data-toggle="2"] .ult-insights__popup-img img',
                default: imgSrc("digilife/dgl-popup-06.png")
            },
            toggle2Head: {
                type: 'string',
                selector: '[data-toggle="2"] .ult-insights__popup-head',
                default: `<span style="font-size: 20px" class="artb-font-size"> DIGILIFE PUTS DIGITAL DISTANCE AT THE HEART OF THE DESIGN PROCESS, OFFERING</span><br><span class="np-style-font-weight-bold"><span style="font-size: 20px" class="artb-font-size">UNPRECEDENTED COMFORT IN INTERMEDIATE VISION</span></span>`,
                source: 'html',
            },
            toggle2Icon: {
                type: 'string',
                source: 'attribute',
                attribute: 'src',
                selector: '[data-toggle="2"] .ult-insights__popup-icon img',
                default: imgSrc("digilife/icon-digilife.svg")
            },
        },
        edit: function (attributes, setAttributes) {
    
            if (!attributes)
                attributes = {};
    
            return <div className="ult-insights__popup--digilife mod">
                <div className="popup-toggler__content" data-toggle="1">
                    <div className="ult-insights__popup-head">
						<RichText
							onChange={content => {
								let atts = Object.assign({}, attributes);
								atts[`${this.slug}-toggle1Head`] = content;
								setAttributes(atts);
							}}
							value={attributes[`${this.slug}-toggle1Head`]}
						/>
					</div>
                    <figure className="ult-insights__popup-img">
                        <MediaUpload
                            onSelect={media => {
                                let atts = Object.assign({}, attributes);
                                atts[`${this.slug}-toggle1Image`] = media.url;
                                setAttributes(atts);
                            }}
                            type="image"
                            value={attributes[`${this.slug}-toggle1Image`]}
                            render={({open}) => this.getImageButton(open, attributes[`${this.slug}-toggle1Image`])}
                        />
                    </figure>
                    <div className="ult-insights__popup-bottom">
						<span className="ult-insights__popup-title">
							<RichText
								onChange={content => {
									let atts = Object.assign({}, attributes);
									atts[`${this.slug}-toggle1Title`] = content;
									setAttributes(atts);
								}}
								value={attributes[`${this.slug}-toggle1Title`]}
							/>
						</span>
                    </div>
                </div>
                <div className="popup-toggler__content" data-toggle="2">
                    <div className="ult-insights__popup-head">
						<RichText
							onChange={content => {
								let atts = Object.assign({}, attributes);
								atts[`${this.slug}-toggle2Head`] = content;
								setAttributes(atts);
							}}
							value={attributes[`${this.slug}-toggle2Head`]}
						/>
                    </div>
                    <figure className="ult-insights__popup-img">
                        <MediaUpload
                            onSelect={media => {
                                let atts = Object.assign({}, attributes);
                                atts[`${this.slug}-toggle2Image`] = media.url;
                                setAttributes(atts);
                            }}
                            type="image"
                            value={attributes[`${this.slug}-toggle2Image`]}
                            render={({open}) => this.getImageButton(open, attributes[`${this.slug}-toggle2Image`])}
                        />
                    </figure>
                    <div className="ult-insights__popup-bottom">
						<figure className="ult-insights__popup-icon">
							<MediaUpload
								onSelect={media => {
									let atts = Object.assign({}, attributes);
									atts[`${this.slug}-toggle2Icon`] = media.url;
									setAttributes(atts);
								}}
								type="image"
								value={attributes[`${this.slug}-toggle2Icon`]}
								render={({open}) => this.getImageButton(open, attributes[`${this.slug}-toggle2Icon`])}
							/>
						</figure>
                    </div>
                </div>
            </div>;
    
        },
        save: function (attributes) {
            if (!attributes)
                attributes = {};
    
            return <div className='popup-template ' data-popup={this.slug}>
						<div className="popup popup-toggler ult-insights__popup ult-insights__popup--digilife mod">
							<button className="popup__close js-close-popup-btn"/>
							<div className="popup-toggler__content" data-toggle="1">
								<div className="ult-insights__popup-head">
									<RichText.Content value={attributes[`${this.slug}-toggle1Head`]}/>
								</div>
								<figure className="ult-insights__popup-img">
									<img src={attributes[`${this.slug}-toggle1Image`]} alt=""/>
								</figure>
								<div className="ult-insights__popup-bottom">
									<span className="ult-insights__popup-title">
										<RichText.Content value={attributes[`${this.slug}-toggle1Title`]}/>
									</span>
								</div>
							</div>
							<div className="popup-toggler__content" data-toggle="2">
								<div className="ult-insights__popup-head">
									<RichText.Content value={attributes[`${this.slug}-toggle2Head`]}/>
								</div>
								<figure className="ult-insights__popup-img">
									<img src={attributes[`${this.slug}-toggle2Image`]} alt=""/>
								</figure>
								<div className="ult-insights__popup-bottom">
									<figure className="ult-insights__popup-icon">
										<img src={attributes[`${this.slug}-toggle2Icon`]} alt=""/>
									</figure>
								</div>
							</div>
                    <div className="popup-toggler__btn js-popup-change-btn"/>
                </div>
            </div>
        }
    }),
];

const allPopupDefaults = Object.assign(...popupTemplates.map(template => template.getPopupDefaults()));

const slideAttributes = {
	background: {
		attribute: 'style',
		selector: '.screen_section',
		default: imgSrc('digilife/bg-digilife.png')
	},

	insights: {
		type: 'array',
		source: 'query',
		selector: '.insight-item',
		default: [
			{
				tabType: 'inner',
				tabTitle: '',
				number: '4',
				text: `<span style="color: #000" class="artb-font-color"><span style="font-size: 131px" class="artb-font-size"><span class="np-style-font-weight-bold"><span class="np-style-font-weight-extra-bold"><span class="np-style-stroke-accent-bold">benefits</span></span></span></span></span><br> <span style="color: #fff" class="artb-font-color"><span style="font-size: 60px" class="artb-font-size"><span class="np-style-font-weight-bold">of Digilife</span> </span></span><br><span style="color: #fff" class="artb-font-color"><span style="font-size: 44px" class="artb-font-size"> <span class="np-style-font-weight-bold">for a better digital view</span> </span></span>`,
			},
			{
				tabType: 'clickable',
				mainImage: imgSrc('digilife/dgl-benefits-01.jpg'),
				tabTitle: '<span style="font-size: 13px" class="artb-font-size">SMOOTH ACCESS TO MOBILE DEVICES</span>',
				tabImage: imgSrc('digilife/dgl-icon-phone.svg'),
				popupTemplates: [
					{
						template: 'template-21',
						useExtended: false,
					}
				],
				text: `<span style="font-size: 66px" class="artb-font-size"><span class="np-style-font-weight-bold"><span class="np-style-highlight-white">Easy<br>access</span></span></span><br><span style="font-size: 42px" class="artb-font-size"><span class="np-style-font-weight-bold">to small<br>texts</span></span>`
			},
			{
				tabType: 'clickable',
				mainImage: imgSrc('digilife/dgl-benefits-02.jpg'),
				tabTitle: '<span style="font-size: 13px" class="artb-font-size">SEAMLESS FAR TO NEAR VISION ALL DAY LONG</span>',
				tabImage: imgSrc('digilife/dgl-icon-mountain.svg'),
				popupTemplates: [
					{
						template: 'template-empty',
						useExtended: false,
					}
				],
				text: `<span style="font-size: 66px" class="artb-font-size"><span class="np-style-highlight-white"><span class="np-style-font-weight-bold">No need<br>to switch</span></span></span><br><span class="np-style-font-weight-bold"><span style="font-size: 42px" class="artb-font-size">eyeglasses<br>for driving</span></span>`,
			},
			{
				tabType: 'clickable',
				mainImage: imgSrc('digilife/dgl-benefits-03.jpg'),
				tabTitle: '<span style="font-size: 13px" class="artb-font-size">AT YOUR COMPUTER BETTER VISION SCREEN</span>',
				tabImage: imgSrc('digilife/dgl-icon-computer.svg'),
				popupTemplates: [
					{
						template: 'template-22',
						useExtended: false,
					}
				],
				text: `<span style="font-size: 51px" class="artb-font-size"><span class="np-style-font-weight-bold"><span class="np-style-highlight-white">Provide a natural<br>viewing angle</span></span></span><br><span style="font-size: 42px" class="artb-font-size"><span class="np-style-font-weight-bold">for near<br>distance work</span></span>`,
			},
			{
				tabType: 'clickable',
				mainImage: imgSrc('digilife/dgl-benefits-04.jpg'),
				tabTitle: '<span style="font-size: 13px" class="artb-font-size">EASY<br>ADAPTATION</span>',
				tabImage: imgSrc('power/icon-pwr-adaptation.svg'),
				popupTemplates: [
					{
						template: 'template-23',
						useExtended: false,
					}
				],
				text: `<span class="np-style-font-weight-bold"><span style="font-size: 66px" class="artb-font-size"><span class="np-style-highlight-white">No<br>distortion</span></span></span><br><span style="font-size: 42px" class="artb-font-size"><span class="np-style-font-weight-bold">related<br>dizziness</span></span>`,
			},
		],
		query: {
			tabType: {
				type: 'string',
				source: 'attribute',
				attribute: 'data-tab-type',
				selector: '.tab-type',
			},
			tabImage: {
				type: 'string',
				source: 'attribute',
				attribute: 'src',
				selector: '.meta .ult-insights__item-icon img',
			},
			mainImage: {
				type: 'string',
				source: 'attribute',
				attribute: 'src',
				selector: '.ult-insights__info-img img',
			},
			tabTitle: {
				type: 'string',
				selector: '.meta .ult-insights__item-name',
				source: 'html',
			},
			popupTemplates: {
				type: 'array',
				source: 'query',
				selector: '.popup-buttons-wrapper > *',
				query: {
					template: {
						type: 'string',
						source: 'attribute',
						attribute: 'data-popup-template',
						selector: '.meta',
					},
					image: {
						type: 'string',
						source: 'attribute',
						attribute: 'src',
						selector: '.ult-insights__btn-icon img',
					},
					text: {
						type: 'string',
						source: 'html',
						selector: '.ult-insights__btn-name',
					},
					useExtended: {
						type: 'boolean',
						source: 'attribute',
						selector: '.meta',
						attribute: 'data-use-extended',
						default: false,
					}
				}
			},
			text: {
				type: 'string',
				selector: '.insight-text,.ult-insights__inner-content',
				source: 'html',
			},
			number: {
				type: 'string',
				selector: '.ult-insights__inner-num',
				source: 'html',
			},
		}
	},
};

slideAttributes.insights.default = slideAttributes.insights.default.map((item) => {
	return Object.assign(item, allPopupDefaults);
});

slideAttributes.insights.query = Object.assign(slideAttributes.insights.query, Object.assign(...popupTemplates.map(template => template.getPopupAtts())));


try {
	var icon = require('./icon').default; //Icon is generated by bash script in the theme root. Use "bash convert-thumbnails-to-svg.bash"
} catch (ex) {
	var icon = 'editor-code';
}

registerBlockType('presentation/slide112', {
	title: __('Slide: 112', 'np'),
	icon: icon,
	category: 'nikon-catalog',
	attributes: slideAttributes,
	edit: withState({
		activeTab: 0,
		showModal: false,
		insightsStates: []
	})
	(({insightsStates, showModal, activeTab, setState, className, attributes, setAttributes}) => {


		console.log("atts:", attributes);

		if (attributes.insights.length && attributes.insights.length !== insightsStates.length)
			setState({
				insightsStates: attributes.insights.map((insight, i) => {
					console.log(insight);
					return {popupToggle: Array(insight.popupTemplates ? insight.popupTemplates.length : 1).fill(1)};
				})
			});


		const options = popupTemplates.length ? popupTemplates.map(function (template, i) {
			return {
				label: template.image ? <div className="innher-holder">
						<img src={template.image} className="option-preview"/>
					</div> :
					<div className="innher-holder"><span className="slide-title-holder">{template.name}</span></div>,
				value: template.slug,
			};
		}) : false;


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

		const insight = i => {
			if ('inner' === attributes.insights[i].tabType)
				return <div className="ult-insights__inner ult-insights__inner--digilife" data-for-content={i}>
					<div className="ult-insights__inner-info">
						<span className="ult-insights__inner-num"><RichText
							onChange={content => {
								let insights = attributes.insights.slice();
								insights[i].number = content;
								setAttributes({insights: insights});
							}}
							value={attributes.insights[i].number}
						/></span>
						<div className="ult-insights__inner-content">
							<RichText
								onChange={content => {
									let insights = attributes.insights.slice();
									insights[i].text = content;
									setAttributes({insights: insights});
								}}
								value={attributes.insights[i].text}
							/>
						</div>
					</div>
				</div>;

			const doublePopup = 2 === attributes.insights[i].popupTemplates.length;

			return <div className="ult-insights__holder ult-insights__info ult-insights__info--mod"
						data-for-content={i}>

				{i === activeTab && <InspectorControls>


					<h3>{__('Use double popups', 'np')}</h3>
					<ToggleControl
						label={__("Use double popups?", 'np')}
						help={doublePopup ? __('Double', 'np') : __('Single', 'np')}
						checked={doublePopup}
						onChange={() => {
							let insights = attributes.insights.slice();
							if (1 === insights[i].popupTemplates.length)
								insights[i].popupTemplates.push([]);
							else {
								insights[i].popupTemplates.pop();
							}
							setAttributes({insights: insights});
						}}
					/>
					<br/><br/>

					{attributes.insights[i].popupTemplates.map((template, j) => {
						return <Fragment>
							<h3>{sprintf(_n('Select popup template', 'Select popup template #%s', attributes.insights[i].popupTemplates.length, 'np'), j + 1)}</h3>
							<div className="hyperlink-wrapper">
								<Select
									value={valueFromId(options, attributes.insights[i].popupTemplates[j].template)}
									onChange={value => {
										let insights = attributes.insights.slice();
										insights[i].popupTemplates[j].template = value.value;
										setAttributes({insights: insights});
									}}
									options={options}
								/>
							</div>
							<br/>
							<br/>
							<h3>{sprintf(_n('Use extended button with image', 'Use extended button with image for popup #%s', attributes.insights[i].popupTemplates.length, 'np'), j + 1)}</h3>
							<div className="hyperlink-wrapper">
								<ToggleControl
									label={__("Use extended?", 'np')}
									help={attributes.insights[i].popupTemplates[j].useExtended ? __('Extended', 'np') : __('Simple', 'np')}
									checked={attributes.insights[i].popupTemplates[j].useExtended}
									onChange={() => {
										let insights = attributes.insights.slice();
										insights[i].popupTemplates[j].useExtended = !insights[i].popupTemplates[j].useExtended;
										setAttributes({insights: insights});
									}}
								/>
							</div>

							<br/><br/><br/>
						</Fragment>
					})}
				</InspectorControls>
				}

				<div className="ult-insights__info-item">
					<div className="ult-insights__info-inner">
					<div className="popup-buttons-wrapper">
							{attributes.insights[i].popupTemplates.map((template, j) => {
								let metaAtts = {
									'data-popup-template': attributes.insights[i].popupTemplates[j].template,
								};
								if (attributes.insights[i].popupTemplates[j].useExtended)
									metaAtts['data-use-extended'] = 'true';

								let modal = i === showModal.tab && j === showModal.popup && (
									<Modal title={__("Card popup content", 'np')}
										   className={"insight-slide np-popup all-empty " + template.template}
										   onRequestClose={() => {
											   return false;
										   }}>
										<button className="popup__close js-close-popup-btn"
												onClick={() => {
													console.log('SET STATE SHOW MODAL FALSE');
													setState({showModal: false});
												}}/>

										<div className={(2 == insightsStates[i].popupToggle[j] ? 'change-content ' : '') + "popup popup-toggler ult-insights__popup"}>

											{popupTemplates.filter(template => template.slug === attributes.insights[i].popupTemplates[j].template)[0].edit(Object.assign({}, attributes.insights[i]),
												(obj) => {
													let insights = attributes.insights.slice();
													insights[i] = Object.assign(insights[i], obj);
													setAttributes({insights: insights});
												})}

											<div className="popup-toggler__btn js-popup-change-btn" onClick={() => {
												let insights = insightsStates.slice();
												insights[i].popupToggle[j] = 1 == insights[i].popupToggle[j] ? 2 : 1;
												setState({insightsStates: insights});
											}}/>
										</div>

									</Modal>

								);

								return (
									<Fragment>
									<span
										className={"ult-insights__btn " + (!attributes.insights[i].popupTemplates[j].useExtended ? 'js-expand-btn ' : 'icon ')}
										onClick={
											(e) => {
												e.preventDefault();
												if('ult-insights__btn js-expand-btn' === e.target.className) {
													console.log('cancel open');
													return false;
												}

												if (attributes.insights[i].popupTemplates[j].useExtended)
													return false;

												setState({
													showModal: {
														tab: i,
														popup: j,
													}
												})
											}
										}>

										{attributes.insights[i].popupTemplates[j].useExtended && (
											<Fragment>
												<span className="ult-insights__btn js-expand-btn" onClick={
													(e) => {
														e.preventDefault();

														console.log('SET STATE SHOW MODAL #2', i, j);
														setState({
															showModal: {
																tab: i,
																popup: j,
															}
														})
													}
												}/>

												<figure className="ult-insights__btn-icon">
													<MediaUpload
														onSelect={media => {
															let insights = attributes.insights.slice();
															insights[i].popupTemplates[j].image = media.url;
															setAttributes({insights: insights});
														}}
														type="image"
														value={attributes.imageID}
														render={({open}) => getImageButton(open, attributes.insights[i].popupTemplates[j].image)}
													/>
												</figure>
												<span className="ult-insights__btn-name">
												<RichText
													onChange={content => {
														let insights = attributes.insights.slice();
														insights[i].popupTemplates[j].text = content;
														setAttributes({insights: insights});
													}}
													value={attributes.insights[i].popupTemplates[j].text}
												/>
											</span>
											</Fragment>
										) }

										<div className="meta" {...metaAtts}/>
									</span>
										{modal}
									</Fragment>
								)
							})}
						</div>
						<div className='insight-text'>
							<RichText
								onChange={content => {
									let insights = attributes.insights.slice();
									insights[i].text = content;
									setAttributes({insights: insights});
								}}
								value={attributes.insights[i].text}
							/>
						</div>
					</div>
				</div>

				<figure className="ult-insights__info-img">
					<MediaUpload
						onSelect={media => {
							let insights = attributes.insights.slice();
							insights[i].mainImage = media.url;
							setAttributes({insights: insights});
						}}
						type="image"
						value={attributes.imageID}
						render={({open}) => getImageButton(open, attributes.insights[i].mainImage)}
					/>
				</figure>


			</div>;
		};


		return <div className={className + " block-presentation-slide all-empty"} style={{backgroundImage: `url(${attributes.background})`}}>

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

			<div className="screen_body_wrapper bottom bottom--mod no_relative">
				<div className="ult-insights ult-insights--high opacity_animate js-tile-wrap animated" data-tab-content={activeTab}>
					<div className="ult-insights__content ult-insights__content--digilife">
						{attributes.insights.map((item, i) => insight(i))}
					</div>
					<div className="ult-insights__nav" data-length='4'>
						{attributes.insights.map((item, i) => {
							return 0 === i ? null : <div className="ult-insights__item">
								<a data-href={i} onClick={() => {
									setState({activeTab: i === activeTab ? 0 : i});
								}} className="ult-insights__item-inner js-tile-item">
									<figure className="ult-insights__item-icon">
										<MediaUpload
											onSelect={media => {
												let insights = attributes.insights.slice();
												insights[i].tabImage = media.url;
												setAttributes({insights: insights});
											}}
											type="image"
											value={attributes.imageID}
											render={({open}) => getImageButton(open, attributes.insights[i].tabImage)}
										/>
									</figure>
									<span className="ult-insights__item-name">
										<RichText
											onChange={content => {
												let insights = attributes.insights.slice();
												insights[i].tabTitle = content;
												setAttributes({insights: insights});
											}}
											value={attributes.insights[i].tabTitle}
											placeholder={slideAttributes.insights.default[i].tabTitle}
										/>
									</span>
								</a>
							</div>;
						})}


					</div>
				</div>
			</div>

		</div>
			;
	}),
	save: ({attributes}) => {

		const insight = i => {
			return <div className="insight-item">
				<div className="tab-type" data-tab-type={attributes.insights[i].tabType}>
					{'inner' === attributes.insights[i].tabType && (
						<div className="ult-insights__inner ult-insights__inner--digilife" data-for-content={i}>
							<div className="ult-insights__inner-info">
						<span className="ult-insights__inner-num">
							<RichText.Content value={attributes.insights[i].number}/></span>
								<div className="ult-insights__inner-content">
									<RichText.Content value={attributes.insights[i].text}/>
								</div>
							</div>
						</div>)}

					{'clickable' === attributes.insights[i].tabType && (
						<div className="ult-insights__holder ult-insights__info ult-insights__info--infinite "
							 data-for-content={i}>
							<div className="ult-insights__info-item">
								<div className="ult-insights__info-inner">
								<div className="popup-buttons-wrapper">
										{attributes.insights[i].popupTemplates.map((template, j) => {
											let metaAtts = {
												'data-popup-template': attributes.insights[i].popupTemplates[j].template,
											};
											if (attributes.insights[i].popupTemplates[j].useExtended)
												metaAtts['data-use-extended'] = 'true';

											let modal = <div className="slide-popup" data-id="popup-id">
												{attributes.insights[i].popupTemplates.length && popupTemplates.filter(template => template.slug === attributes.insights[i].popupTemplates[j].template)[0].save(Object.assign({}, attributes.insights[i]))}
											</div>;

											let popupButton = <span
												className={"js-expand-btn " + (!attributes.insights[i].popupTemplates[j].useExtended ? ' ult-insights__btn ' : ' icon ')}>

										{attributes.insights[i].popupTemplates[j].useExtended && (
											<Fragment>
												<figure className="ult-insights__btn-icon">
													<img src={attributes.insights[i].popupTemplates[j].image} alt=""/>
												</figure>
												<span className="ult-insights__btn-name">
													<RichText.Content value={attributes.insights[i].popupTemplates[j].text}/>
												</span>
											</Fragment>
										)}
										{modal}

										<div className="meta" {...metaAtts}>
											<span className="ult-insights__item-name">
												<RichText.Content value={attributes.insights[i].tabTitle}/>
											</span>
											<figure className="ult-insights__item-icon">
												<img src={attributes.insights[i].tabImage} alt=""/>
											</figure>
										</div>
									</span>;
											return (attributes.insights[i].popupTemplates[j].useExtended ? <div className="ult-insights__btn icon">{popupButton}</div> : popupButton);
									})}

									</div>

									<div className='insight-text'>
										<RichText.Content value={attributes.insights[i].text}/>
									</div>
								</div>
							</div>

							<figure className="ult-insights__info-img">
								<img src={attributes.insights[i].mainImage} alt=""/>
							</figure>

						</div>
					)}
				</div>
			</div>
		};


		return <div className="screen_section screen_section--not-padding" data-section="#_SLIDE_NUMBER"
					style={{backgroundImage: `url(${attributes.background})`}}>
			<div className="screen_body_wrapper bottom bottom--mod no_relative">
				<div className="ult-insights ult-insights--high opacity_animate js-tile-wrap animated" data-tab-content="0"
					 data-max-content={Math.max(0, attributes.insights.length - 1)}>
					<div className="ult-insights__content ult-insights__content--digilife">
						{attributes.insights.map((item, i) => {
							return insight(i)
						})}
					</div>
					<div className="ult-insights__nav" data-length='4'>
						{attributes.insights.map((item, i) => {
							return 0 === i ? null : <div className={"ult-insights__item"}>
								<a data-href={i} className="ult-insights__item-inner js-tile-item">
									<figure className="ult-insights__item-icon">
										<img src={attributes.insights[i].tabImage} alt=""/>
									</figure>
									<span className="ult-insights__item-name">
										<RichText.Content value={attributes.insights[i].tabTitle}/>
									</span>
								</a>
							</div>;
						})}
					</div>
				</div>
			</div>

		</div>
			;
	},
});
