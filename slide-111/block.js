import MyFontSizePicker from '../../../subcomponents/MyFontSizePicker';

const {RichText, PlainText, InnerBlocks, InspectorControls, MediaUpload} = wp.editor;
const {registerBlockType} = wp.blocks;
const {Fragment} = wp.element;
const {SelectControl, Button, ToggleControl} = wp.components;
const {withState} = wp.compose;
const {__} = wp.i18n;


const slideAttributes = {
	background: {
		attribute: 'style',
		selector: '.screen_section',
		default: imgSrc('bright/bg-bright.png')
	},

	insights: {
		type: 'array',
		source: 'query',
		selector: '.insight-item',
		default: [
			{
				tabType: 'inner',
				tabTitle: '',
				number: '3',
				text: `<span style="font-size: 130px" class="artb-font-size"><span class="np-style-stroke-accent-bold"><span class="np-style-font-weight-extra-bold">benefits</span></span></span><span style="color: #fff" class="artb-font-color"><span class="np-style-font-weight-extra-bold"><span style="font-size: 55px" class="artb-font-size"><p class="np-style-align-left">of SeeCoat Bright</p></span></span></span><span style="color: #fff" class="artb-font-color"><span class="np-style-font-weight-extra-bold"><p class="np-style-align-left"><span style="font-size: 38px" class="artb-font-size">to see well in dim light conditions</span></p></span></span>`,
			},
			{
				tabType: 'clickable',
				mainImage: imgSrc('bright/br-benefits-01.png'),
				icon: imgSrc('bright/icon-bright.svg'),
				tabTitle: 'BRIGHTER VISION',
				tabImage: imgSrc('bright/br-benefits-icon-01.svg'),
				info: `Conventional lens`,
				items: [],
				subtitle: 'BRIGHTER VISION',
				listItems: [
					<li>Enjoy every detail and color <br/>as they were meant to be seen,<br/>even in low light.</li>,
				],
				useAdditionalIcon: true,
			},
			{
				tabType: 'clickable',
				mainImage: imgSrc('bright/br-benefits-02.png'),
				icon: imgSrc('bright/icon-bright.svg'),
				tabTitle: 'SUPERIOR CONTRAST',
				tabImage: imgSrc('bright/br-benefits-icon-02.svg'),
				info: `Conventional lens`,
				subtitle: 'SUPERIOR CONTRAST',
				items: [],
				listItems: [
					<li>Contrast levels are enhanced <br/>such that you see dark areas <br/>darker and bright areas brighter.</li>,
				],
				useAdditionalIcon: true,
			},
			{
				tabType: 'clickable',
				mainImage: imgSrc('bright/br-benefits-03.png'),
				icon: imgSrc('plus-uv/icon-plus-uv.svg'),
				tabTitle: 'FINER DETAIL',
				tabImage: imgSrc('bright/br-benefits-icon-03.svg'),
				subtitle: 'FINER DETAIL',
				items: [],
				listItems: [
					<li>At near, the improvement in acuity translates <br/> <span style="font-weight: 700;">to easier reading and color distiction</span><br/>under low light conditions.</li>
				],
				useAdditionalIcon: false,
				aboutText1: `Almost`,
				aboutText2: `of wearers enjoy easier reading under dim light conditions<sup class="artb-7703"><span style="font-size: 18px" class="artb-font-size">*</span></sup>.`,
				aboutVal1: `2`,
				aboutVal2: `3`,
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
			subtitle: {
				type: 'string',
				source: 'html',
				selector: '.meta .ult-insights__item-subtitle',
			},
			mainImage: {
				type: 'string',
				source: 'attribute',
				attribute: 'src',
				selector: '.ult-insights__info-img img, .ult-insights__board-img img',
			},
			icon: {
				type: 'string',
				source: 'attribute',
				attribute: 'src',
				selector: '.ult-insights__board-icon img',
			},
			tabTitle: {
				type: 'string',
				selector: '.meta .ult-insights__item-name',
				source: 'html',
			},
			text: {
				type: 'string',
				selector: '.insight-text,.ult-insights__inner-content',
				source: 'html',
			},
			listItems: {
				type: 'array',
				source: 'children',
				selector: '.ult-insights__board-descr'
			},
			info: {
				type: 'string',
				selector: '.ult-insights__board-txt',
				source: 'html',
			},
			number: {
				type: 'string',
				selector: '.ult-insights__inner-num',
				source: 'html',
			},
			useAdditionalIcon: {
				source: 'attribute',
				attribute: 'data-use-additional-icon',
				type: 'boolean',
				selector: '.meta',
			},
			aboutText1: {
				type: 'string',
				selector: '.ult-insights__board-about-txt--1',
				source: 'html'
			},
			aboutText2: {
				type: 'string',
				selector: '.ult-insights__board-about-txt--2',
				source: 'html'
			},
			aboutVal1: {
				type: 'string',
				selector: '.ult-insights__board-about-val--1',
				source: 'html'
			},
			aboutVal2: {
				type: 'string',
				selector: '.ult-insights__board-about-val--2',
				source: 'html'
			}
		}
	},
};


try {
	var icon = require('./icon').default; //Icon is generated by bash script in the theme root. Use "bash convert-thumbnails-to-svg.bash"
} catch (ex) {
	var icon = 'editor-code';
}

registerBlockType('presentation/slide111', {
	title: __('Slide: 111', 'np'),
	icon: icon,
	category: 'nikon-catalog',
	attributes: slideAttributes,
	edit: withState({
		activeTab: 0,
	})
	(({activeTab, setState, className, attributes, setAttributes}) => {


		console.log('ATTS: ', attributes);

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
				return <div className="ult-insights__inner ult-insights__inner--bright" data-for-content={i}>
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



			return <div
				className={"ult-insights__holder ult-insights__info " + (3 === i ? 'ult-insights__info--bright-mod' : 'ult-insights__info--bright')}
				data-for-content={i}>


				{activeTab === i&& <InspectorControls>
				<ToggleControl
					label={__("Use additional icon?", 'np')}
					help={attributes.insights[i].useAdditionalIcon ? __('Use', 'np') : __("Don't use", 'np')}
					checked={attributes.insights[i].useAdditionalIcon}
					onChange={() => {
						let insights = attributes.insights.slice();
						insights[i].useAdditionalIcon = !insights[i].useAdditionalIcon;
						setAttributes({insights: insights});
					}}
				/>
				</InspectorControls>}

					<div className="ult-insights__board">

					{attributes.insights[i].useAdditionalIcon && 
						<div className="ult-insights__board-holder">
							<figure className="ult-insights__board-img">
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
							<div className="ult-insights__board-inner">
								<div className="ult-insights__board-item">
									<span className="ult-insights__board-txt">
										<RichText
											onChange={content => {
												let insights = attributes.insights.slice();
												insights[i].info = content;
												setAttributes({insights: insights});
											}}
											value={attributes.insights[i].info}
										/>
									</span>
								</div>
								<div className="ult-insights__board-item">
									<div className="ult-insights__board-info">
										<ul className="ult-insights__board-descr">
											<RichText
												onChange={content => {
													let insights = attributes.insights.slice();
													insights[i].listItems = content;
													setAttributes({insights: insights});
												}}
												value={attributes.insights[i].listItems}
												multiline="li"
											/>
										</ul>
										<figure className="ult-insights__board-icon">
											<MediaUpload
												onSelect={media => {
													let insights = attributes.insights.slice();
													insights[i].icon = media.url;
													setAttributes({insights: insights});
												}}
												type="image"
												value={attributes.imageID}
												render={({open}) => getImageButton(open, attributes.insights[i].icon)}
											/>
										</figure>
									</div>
								</div>
							</div>
						</div>
						}
						{ !attributes.insights[i].useAdditionalIcon && 
						<div className="ult-insights__board-holder">
							<div className="ult-insights__board-wrap">
								<div className="ult-insights__board-item mod">
									<div className="ult-insights__board-about">
										<span className="ult-insights__board-about-txt ult-insights__board-about-txt--1">
											<RichText
												onChange={content => {
													let insights = attributes.insights.slice();
													insights[i].aboutText1 = content;
													setAttributes({insights: insights});
												}}
												value={attributes.insights[i].aboutText1}
											/>
										</span>
										<div className="ult-insights__board-about-info">
											<span className="ult-insights__board-about-val ult-insights__board-about-val--1">
												<RichText
													onChange={content => {
														let insights = attributes.insights.slice();
														insights[i].aboutVal1 = content;
														setAttributes({insights: insights});
													}}
													value={attributes.insights[i].aboutVal1}
												/>
											</span>
											<span className="ult-insights__board-about-val ult-insights__board-about-val--2">
												<RichText
													onChange={content => {
														let insights = attributes.insights.slice();
														insights[i].aboutVal2 = content;
														setAttributes({insights: insights});
													}}
													value={attributes.insights[i].aboutVal2}
												/>
											</span>
										</div>
										<span className="ult-insights__board-about-txt ult-insights__board-about-txt--2">
											<RichText
												onChange={content => {
													let insights = attributes.insights.slice();
													insights[i].aboutText2 = content;
													setAttributes({insights: insights});
												}}
												value={attributes.insights[i].aboutText2}
											/>
										</span>
									</div>
								</div>
								<div className="ult-insights__board-item">
									<figure className="ult-insights__board-img">
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
									<div className="ult-insights__board-info">
										<ul className="ult-insights__board-descr">
											<RichText
												onChange={content => {
													let insights = attributes.insights.slice();
													insights[i].listItems = content;
													setAttributes({insights: insights});
												}}
												value={attributes.insights[i].listItems}
												multiline="li"
											/>
										</ul>
									</div>
								</div>
							</div>
						</div>
						}
					</div>
			</div>;
		};


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

			<div className="screen_body_wrapper bottom bottom--mod no_relative">
				<div className="ult-insights opacity_animate js-tile-wrap animated" data-tab-content={activeTab}>
					<div className="ult-insights__content ult-insights__content--buv">
						{attributes.insights.map((item, i) => insight(i))}
					</div>
					<div className="ult-insights__nav ult-insights__nav--bright" data-length={attributes.insights.filter(insight => 'clickable' === insight.tabType).length}>
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

			let metaAtts = {};
			if (attributes.insights[i].useAdditionalIcon)
				metaAtts['data-use-additional-icon'] = 'true';

			return <div className="insight-item">
				<div className="tab-type" data-tab-type={attributes.insights[i].tabType}>

					{'inner' === attributes.insights[i].tabType && (
						<div className="ult-insights__inner ult-insights__inner--bright" data-for-content={i}>
							<div className="ult-insights__inner-info">
							<span className="ult-insights__inner-num">
								<RichText.Content value={attributes.insights[i].number}/>
							</span>
								<div className="ult-insights__inner-content">
									<RichText.Content value={attributes.insights[i].text}/>
								</div>
							</div>
						</div>
					)}	 
					{'clickable' === attributes.insights[i].tabType && (
						<div
							className={"ult-insights__holder ult-insights__info " + (3 === i ? 'ult-insights__info--bright-mod' : 'ult-insights__info--bright')}
							data-for-content={i}>

							<div className="meta" {...metaAtts} style={{display: 'none'}}>
								<span className="ult-insights__item-name">
									<RichText.Content value={attributes.insights[i].tabTitle}/>
								</span>
								<figure className="ult-insights__item-icon">
									<img src={attributes.insights[i].tabImage} alt=""/>
								</figure>
								<span className="ult-insights__item-subtitle">
									<RichText.Content value={attributes.insights[i].subtitle}/>
								</span>
							</div>
								<div className="ult-insights__board">
								{attributes.insights[i].useAdditionalIcon &&
									<div className="ult-insights__board-holder">
										<figure className="ult-insights__board-img">
											<img src={attributes.insights[i].mainImage} alt=""/>
										</figure>
										<div className="ult-insights__board-inner">
											<div className="ult-insights__board-item">
											<span className="ult-insights__board-txt">
												<RichText.Content value={attributes.insights[i].info}/>
											</span>
											</div>
											<div className="ult-insights__board-item">
												<div className="ult-insights__board-info">
													<ul className="ult-insights__board-descr">
														<RichText.Content value={attributes.insights[i].listItems}/>
													</ul>
													<figure className="ult-insights__board-icon">
														<img src={attributes.insights[i].icon} alt=""/>
													</figure>
												</div>
											</div>
										</div>
									</div>
								}
								{!attributes.insights[i].useAdditionalIcon &&
									<div className="ult-insights__board-holder">
										<div className="ult-insights__board-wrap">
											<div className="ult-insights__board-item mod">
												<div className="ult-insights__board-about">
													<span className="ult-insights__board-about-txt ult-insights__board-about-txt--1">
														<RichText.Content value={attributes.insights[i].aboutText1}/>
													</span>
													<div className="ult-insights__board-about-info">
														<span className="ult-insights__board-about-val ult-insights__board-about-val--1">
															<RichText.Content value={attributes.insights[i].aboutVal1}/>
														</span>
														<span className="ult-insights__board-about-val ult-insights__board-about-val--2">
															<RichText.Content value={attributes.insights[i].aboutVal2}/>
														</span>
													</div>
													<span className="ult-insights__board-about-txt ult-insights__board-about-txt--2">
														<RichText.Content value={attributes.insights[i].aboutText2}/>
													</span>
												</div>
											</div>
											<div className="ult-insights__board-item">
												<figure className="ult-insights__board-img">
													<img src={attributes.insights[i].mainImage} alt=""/>
												</figure>
												<div className="ult-insights__board-info">
													<ul className="ult-insights__board-descr">
														<RichText.Content value={attributes.insights[i].listItems}/>
													</ul>
												</div>
											</div>
										</div>
									</div>
								}
								</div>
						</div>
					)}
				</div>
			</div>;
		};


		return <div className="screen_section screen_section--not-padding" data-section="#_SLIDE_NUMBER"
					style={{backgroundImage: `url(${attributes.background})`}}>
			<div className="screen_body_wrapper bottom bottom--mod no_relative">
				<div className="ult-insights opacity_animate js-tile-wrap animated" data-tab-content="0"
					 data-max-content={Math.max(0, attributes.insights.length - 1)}>
					<div className="ult-insights__content ult-insights__content--buv">
						{attributes.insights.map((item, i) => {
							return insight(i)
						})}
					</div>
					<div className="ult-insights__nav ult-insights__nav--bright" data-length={attributes.insights.filter(insight => 'clickable' === insight.tabType).length}>
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
