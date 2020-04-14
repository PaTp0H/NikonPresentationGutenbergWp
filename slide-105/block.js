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
		default: imgSrc('blue-uv/bg-blue-uv.png')
	},

	slideTitle: {
		type: 'string',
		selector: '.brand_wrapper .gold',
		default: 'Benefits',
		source: 'html',
	},

	insights: {
		type: 'array',
		source: 'query',
		selector: '.insight-item',
		default: [
			{
				tabType: 'inner',
				tabTitle: '',
				number: '5',
				text: `<span style="font-size: 130px" class="artb-font-size"><span class="np-style-stroke-accent-bold"><span class="np-style-font-weight-extra-bold">benefits</span></span></span><span style="color: #fff" class="artb-font-color"><span class="np-style-font-weight-extra-bold"><span style="font-size: 50px" class="artb-font-size"><p class="np-style-align-left">of SeeCoat Plus UV<br>for better protection</p></span></span></span>`,
			},
			{
				tabType: 'clickable',
				mainImage: imgSrc('blue-uv/buv-benefits-03.png'),
				icon: imgSrc('plus-uv/icon-plus-uv.svg'),
				tabTitle: 'TOUGHER',
				tabImage: imgSrc('blue-uv/buv-benefits-icon-03.svg'),
				text: `2 times more scratch resistant<br>Longer lens durability`,
				info: `Conventional AR Coating`,
				items: [],
				subtitle: 'Tougher',
				listItems: [
					<li>2 times more scratch resistant</li>,
					<li>Longer lens durability</li>
				],
				useAdditionalIcon: false,
			},
			{
				tabType: 'clickable',
				mainImage: imgSrc('blue-uv/buv-benefits-05.png'),
				icon: imgSrc('plus-uv/icon-plus-uv.svg'),
				tabTitle: 'DUST FREE',
				tabImage: imgSrc('blue-uv/buv-benefits-icon-05.svg'),
				text: `Reduces the glare caused<br>by oncoming headlights,<br>streetlights and other light sources.`,
				info: `Conventional AR Coating`,
				subtitle: 'Dust Free',
				items: [],
				listItems: [
					<li>Avoids dust accumulation<br/>on the lens</li>,
					<li>Reduces the frequency<br/>of lens cleaning</li>,
				],
				useAdditionalIcon: false,
			},
			{
				tabType: 'clickable',
				mainImage: imgSrc('blue-uv/buv-benefits-04.png'),
				icon: imgSrc('plus-uv/icon-plus-uv.svg'),
				tabTitle: 'CLEANER',
				tabImage: imgSrc('blue-uv/buv-benefits-icon-04.svg'),
				text: `Reduces the glare caused<br>by oncoming headlights,<br>streetlights and other light sources.`,
				info: `Conventional AR Coating`,
				subtitle: 'Cleaner',
				items: [],
				listItems: [
					<li>Easier to clean and keep clean</li>,
					<li>Smudge-resistant</li>
				],
				useAdditionalIcon: false,
			},
			{
				tabType: 'clickable',
				mainImage: imgSrc('plus-uv/pl-benefits.png'),
				icon: imgSrc('plus-uv/icon-plus-uv.svg'),
				tabTitle: 'CLEARER',
				tabImage: imgSrc('plus-uv/pl-benefits-icon.svg'),
				text: `Reduces the glare caused<br>by oncoming headlights,<br>streetlights and other light sources.`,
				info: `Conventional AR Coating`,
				subtitle: 'Clearer',
				items: [],
				listItems: [
					<li>Optimized transparency</li>,
					<li>More natural look</li>
				],
				useAdditionalIcon: false,
			},
			{
				tabType: 'clickable',
				mainImage: imgSrc('blue-uv/buv-benefits-02.png'),
				icon: imgSrc('plus-uv/icon-plus-uv.svg'),
				tabTitle: 'UV PROTECTION',
				tabImage: imgSrc('blue-uv/buv-benefits-icon-02.svg'),
				text: `Reduces the glare caused<br>by oncoming headlights,<br>streetlights and other light sources.`,
				info: `Conventional AR Coating`,
				subtitle: 'Safer',
				listItems: [
					<li>Front and backside<br/>protection from UV</li>,
				],
				useAdditionalIcon: true,
				additionalIcon: imgSrc('blue-uv/buv-benefits-icon-02.svg'),
				footText: 'E-SPF<sup class="artb-7703">®</sup> 25 for all SeeCoat Plus UV clear lenses except with 1.5 index lenses E-SPF<sup class="artb-7703">®</sup> index = 10. E-SPF<sup class="artb-7703">®</sup> is a global index rating the overall UV protection of a lens. E-SPF<sup class="artb-7703">®</sup> was developed by Essilor International and endorsed by 3rd<br>party experts. Lens performance only. The E-SPF<sup class="artb-7703">®</sup> index excludes direct eye exposure that depends on external factors (wearer’s morphology, frame shape, position of wear).',
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
			additionalIcon: {
				type: 'string',
				source: 'attribute',
				attribute: 'src',
				selector: '.ult-insights__board-decor img',
			},
			footText: {
				type: 'string',
				source: 'html',
				selector: '.meta .pl-summary__foot',
			},
		}
	},
};


try {
	var icon = require('./icon').default; //Icon is generated by bash script in the theme root. Use "bash convert-thumbnails-to-svg.bash"
} catch (ex) {
	var icon = 'editor-code';
}

registerBlockType('presentation/slide105', {
	title: __('Slide: 105', 'np'),
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
				return <div className="ult-insights__inner js-main-content" data-for-content={i}>
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
				className={"ult-insights__holder ult-insights__info " + (1 === i ? 'ult-insights__info--buv ' : 'ult-insights__info--drive')}
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
							{
								attributes.insights[i].useAdditionalIcon && <figure className="ult-insights__board-decor">
									<MediaUpload
										onSelect={media => {
											let insights = attributes.insights.slice();
											insights[i].additionalIcon = media.url;
											setAttributes({insights: insights});
										}}
										type="image"
										value={attributes.imageID}
										render={({open}) => getImageButton(open, attributes.insights[i].additionalIcon)}
									/>
								</figure>
							}
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
				<div className="ult-insights js-tile-wrap" data-tab-content={activeTab}>
					<div className="ult-insights__content ult-insights__content--buv">

						<div className="brand_wrapper">
					<span className="gold">
						<RichText
							onChange={content => setAttributes({slideTitle: content})}
							value={attributes.slideTitle}
							placeholder="SLIDE TITLE"
							className="slide-title-input"
						/>
						 </span>

							{attributes.insights.map((item, i) => i === activeTab && 'clickable' === attributes.insights[i].tabType &&
								<span className="white">
									<RichText
										onChange={content => {
											let insights = attributes.insights.slice();
											insights[i].subtitle = content;
											setAttributes({insights: insights});
										}}
										value={attributes.insights[i].subtitle}
										placeholder="Slide subtitle"
										className="slide-subtitle-input"
									/>

							</span>)}
						</div>


						{attributes.insights.map((item, i) => insight(i))}
					</div>
					<div className="ult-insights__nav ult-insights__nav--drive" data-length={attributes.insights.filter(insight => 'clickable' === insight.tabType).length}>
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

					<div className="ult-insights__board-inner bottom-text ">
						{attributes.insights.map((item, i) => {
							return i === activeTab && <div data-for-content={i}>
								<RichText
									onChange={content => {
										let insights = attributes.insights.slice();
										insights[i].footText = content;
										setAttributes({insights: insights});
									}}
									value={attributes.insights[i].footText}
								/>
							</div>
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
						<div className=" ult-insights__inner ult-insights__inner--infinite" data-for-content={i}>
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
							className={"ult-insights__holder ult-insights__info " + 'ult-insights__info--buv '}
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
								<span className="pl-summary__foot">
									<RichText.Content value={attributes.insights[i].footText}/>
								</span>
							</div>


								<div className="ult-insights__board">
									<div className="ult-insights__board-holder">
										<figure className="ult-insights__board-img">
											<img src={attributes.insights[i].mainImage} alt=""/>
										</figure>
										{
											attributes.insights[i].useAdditionalIcon && <figure className="ult-insights__board-decor">
												<img src={attributes.insights[i].additionalIcon} alt=""/>
											</figure>
										}
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
								</div>


						</div>
					)}
				</div>
			</div>;
		};


		return <div className="screen_section screen_section--not-padding" data-section="#_SLIDE_NUMBER"
					style={{backgroundImage: `url(${attributes.background})`}}>
			<div className="screen_body_wrapper bottom bottom--mod no_relative">
				<div className="ult-insights opacity_animate js-tile-wrap" data-tab-content="0"
					 data-max-content={Math.max(0, attributes.insights.length - 1)}>
					<div className="ult-insights__content ult-insights__content--buv">
						<div className="brand_wrapper" data-head-for-content="0">
							{attributes.slideTitle &&
							<span className="gold">
								<RichText.Content value={attributes.slideTitle}/>
							</span>
							}
							{attributes.insights.map((item, i) =>attributes.insights[i].subtitle && attributes.insights[i].subtitle.length &&
								<span className="white" data-for-content={i}>
									<RichText.Content value={attributes.insights[i].subtitle}/>
							</span>)}
						</div>



						{attributes.insights.map((item, i) => {
							return insight(i)
						})}
					</div>
					<div className="ult-insights__nav ult-insights__nav--drive" data-length={attributes.insights.filter(insight => 'clickable' === insight.tabType).length}>
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

					<div className="ult-insights__board-inner bottom-text ">
						{attributes.insights.map((item, i) => {
							return <div data-for-content={i}>
								<RichText.Content value={item.footText}/>
							</div>
						})}
					</div>
				</div>
			</div>

		</div>
			;
	},
});
