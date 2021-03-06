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
		default: imgSrc('office/bg-office-01.png')
	},
	items: {
		type: 'array',
		source: 'query',
		selector: '.of-info__left-inner',
		default: [
			{
				contentInnerTop: `YOUR CURRENT EQUIPMENT IS GENERALLY NOT THE PERFECT SOLUTION.`,
				contentInnerBot: '<span style="color: #9c9c9c" class="artb-font-color">THE ZONE FOR DOING YOUR INDOOR ACTIVITIES IS LIMITED OR CAN CREATE AN UNCOMFORTABLE POSITION.</span>',
				infoIcon: imgSrc('office/of-info-icon-01.jpg'),
				viewTitle: `Near to far`,
				viewImage: imgSrc('office/of-info-view-01.svg'),
				rateFar: '6',
				rateIndoor: '3',
				rateNear: '2',
				image: imgSrc('office/of-info-board-01.jpg'),
				useImage: false,
				navTitle: 'CONVENTIONAL PROGRESSIVE LENS',
			},
			{				
				contentInnerTop: 'YOUR CURRENT EQUIPMENT IS GENERALLY NOT THE PERFECT SOLUTION.',
				contentInnerBot: '<span style="color: #9c9c9c" class="artb-font-color">THE ZONE FOR DOING YOUR INDOOR ACTIVITIES IS LIMITED OR CAN CREATE AN UNCOMFORTABLE POSITION.</span>',
				infoIcon: imgSrc('office/of-info-icon-02.jpg'),
				viewTitle: `Near only`,
				viewImage: imgSrc('office/of-info-view-02.svg'),
				rateFar: '0',
				rateIndoor: '0',
				rateNear: '6',
				image: imgSrc('office/of-info-board-02.jpg'),
				useImage: false,
				navTitle: 'READING<br>GLASSES'
			},
			{
				contentInnerTop: `<span style="color: #9c9c9c" class="artb-font-color">NIKON’S MOST ADVANCED SOLUTION FOR</span>`,
				contentInnerCenter: '<span style="color: #fff" class="artb-font-color"><span style="font-size: 25px" class="artb-font-size"><span class="np-style-highlight-white"><span class="np-style-font-weight-extra-bold">INDOOR VISION NEEDS.</span></span></span></span>',
				contentInnerBot: '<span style="color: #9c9c9c" class="artb-font-color">THE PERFECT SOLUTION DELIVERING SHARP AND COMFORTABLE NEAR AND INTERMEDIATE VISION.</span>',
				infoIcon: imgSrc('office/icon-office.svg'),
				viewTitle: `<span style="color: #c09800" class="artb-font-color"><span style="font-size: 20px" class="artb-font-size">NEAR TO INDOOR DISTANCE</span></span>`,
				viewImage: imgSrc('office/of-info-view-03.svg'),
				rateFar: '2',
				rateIndoor: '6',
				rateNear: '4',
				image: imgSrc('office/of-info-board-03.jpg'),
				useImage: true,
				navImage: imgSrc('office/icon-office.svg'),
			},
		],
		query: {
			rateFar: {
				type: 'string',
				selector: '.meta-rateFar',
				source: 'html',
			},
			rateIndoor: {
				type: 'string',
				selector: '.meta-rateIndoor',
				source: 'html',
			},
			rateNear: {
				type: 'string',
				selector: '.meta-rateNear',
				source: 'html',
			},
			viewTitle: {
				type: 'string',
				selector: '.meta-viewTitle',
				source: 'html',
			},
			viewImage: {
				type: 'string',
				source: 'attribute',
				attribute: 'src',
				selector: '.meta-viewImage img',
			},
			contentInnerCenter: {
				type: 'string',
				selector: '.meta-content.center',
				source: 'html',
			},
			contentInnerTop: {
				type: 'string',
				selector: '.meta-content.top',
				source: 'html',
			},
			contentInnerBot: {
				type: 'string',
				selector: '.meta-content.bot',
				source: 'html',
			},
			
			infoIcon: {
				type: 'string',
				source: 'attribute',
				attribute: 'src',
				selector: '.meta-infoIcon',
			},
			image: {
				type: 'string',
				source: 'attribute',
				attribute: 'src',
				selector: '.meta-image',
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
				selector: '.meta-title',
				source: 'html',
			},
			navImage: {
				type: 'string',
				source: 'attribute',
				attribute: 'src',
				selector: '.meta-navImage',
			},
		}
	},
};


try {
	var icon = require('./icon').default; //Icon is generated by bash script in the theme root. Use "bash convert-thumbnails-to-svg.bash"
} catch (ex) {
	var icon = 'editor-code';
}

registerBlockType('presentation/slide104', {
	title: __('Slide: 104', 'np'),
	icon: icon,
	category: 'nikon-catalog',
	attributes: slideAttributes,
	edit: withState({
		activeTab: 0,
	})
	(({activeTab, setState, className, attributes, setAttributes}) => {

		console.log("atts:", attributes);

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
			return i === activeTab &&
				<figure className="of-info__board-img" data-for-content={i+1}>
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
		};

		const itemInfo = i => {
			let metaAtts = {};
			if (attributes.items[i].useImage)
				metaAtts['data-use-image'] = 'true';
			return i === activeTab &&
				<div className="of-info__left-inner" data-for-content={i+1}>
					<div className="of-info__content">
						<figure className="of-info__content-icon">
							<MediaUpload
								onSelect={media => {
									let items = attributes.items.slice();
									items[i].infoIcon = media.url;
									setAttributes({items: items});
								}}
								type="image"
								value={attributes.imageID}
								render={({open}) => getImageButton(open, attributes.items[i].infoIcon)}
							/>
						</figure>
						<div className="of-info__content-inner">
							<span>
								<RichText
									onChange={content => {
										let items = attributes.items.slice();
										items[i].contentInnerTop = content;
										setAttributes({items: items});
									}}
									value={attributes.items[i].contentInnerTop}
								/>
							</span>
							{attributes.items[i].contentInnerCenter &&
							<span>
								<RichText
									onChange={content => {
										let items = attributes.items.slice();
										items[i].contentInnerCenter = content;
										setAttributes({items: items});
									}}
									value={attributes.items[i].contentInnerCenter}
								/>
							</span>
							}
							<span>
								<RichText
									onChange={content => {
										let items = attributes.items.slice();
										items[i].contentInnerBot = content;
										setAttributes({items: items});
									}}
									value={attributes.items[i].contentInnerBot}
								/>
							</span>
						</div>
					</div>
					<div className="of-info__view">
						<span className="of-info__view-title">
							<RichText
								onChange={content => {
									let items = attributes.items.slice();
									items[i].viewTitle = content;
									setAttributes({items: items});
								}}
								value={attributes.items[i].viewTitle}
							/>
						</span>
						<figure className="of-info__view-img">
							<MediaUpload
								onSelect={media => {
									let items = attributes.items.slice();
									items[i].viewImage = media.url;
									setAttributes({items: items});
								}}
								type="image"
								value={attributes.imageID}
								render={({open}) => getImageButton(open, attributes.items[i].viewImage)}
							/>
						</figure>
						<div className="of-info__view-row">
							<div className="of-info__view-col">
								<div className="of-info__view-item" data-rate={attributes.items[i].rateFar}
									data-color="1">
									<span className="of-info__view-item-txt">Far
										<span>
											<RichText
												onChange={content => {
													let items = attributes.items.slice();
													items[i].rateFar = content;
													setAttributes({items: items});
												}}
												value={attributes.items[i].rateFar}
											/>
										</span>
									</span>
									<div className="of-info__view-item-rate">
										<figure className="of-info__view-item-img">
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 57 13">
												<g>
													<g>
													<path d="M49.89.222l1.512 4.647h4.878l-3.948 2.866 1.507 4.643L49.89 9.51l-3.95 2.868 1.509-4.643-3.951-2.866h4.882z"></path>
													</g>
													<g>
													<path d="M6.325.222L7.837 4.87h4.88L8.764 7.735l1.511 4.643-3.95-2.868-3.95 2.868 1.511-4.643-3.95-2.866h4.88z"></path>
													</g>
													<g>
													<path d="M28.107.222l1.508 4.647h4.882l-3.949 2.866 1.51 4.643-3.95-2.868-3.95 2.868 1.51-4.643-3.95-2.866h4.878z"></path>
													</g>
												</g>
											</svg>
										</figure>
									</div>
								</div>
							</div>
							<div className="of-info__view-col">
								<div className="of-info__view-item" data-rate={attributes.items[i].rateIndoor}
									data-color="2">
									<span className="of-info__view-item-txt">INDOOR
										<span>
											<RichText
												onChange={content => {
													let items = attributes.items.slice();
													items[i].rateIndoor = content;
													setAttributes({items: items});
												}}
												value={attributes.items[i].rateIndoor}
											/>
										</span>
									</span>
									<div className="of-info__view-item-rate">
										<figure className="of-info__view-item-img">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 57 13">
											<g>
												<g>
												<path d="M49.89.222l1.512 4.647h4.878l-3.948 2.866 1.507 4.643L49.89 9.51l-3.95 2.868 1.509-4.643-3.951-2.866h4.882z"></path>
												</g>
												<g>
												<path d="M6.325.222L7.837 4.87h4.88L8.764 7.735l1.511 4.643-3.95-2.868-3.95 2.868 1.511-4.643-3.95-2.866h4.88z"></path>
												</g>
												<g>
												<path d="M28.107.222l1.508 4.647h4.882l-3.949 2.866 1.51 4.643-3.95-2.868-3.95 2.868 1.51-4.643-3.95-2.866h4.878z"></path>
												</g>
											</g>
											</svg>
										</figure>
									</div>
								</div>
							</div>
							<div className="of-info__view-col">
								<div className="of-info__view-item" data-rate={attributes.items[i].rateNear}
									data-color="3">
									<span className="of-info__view-item-txt">NEAR
										<span>
											<RichText
												onChange={content => {
													let items = attributes.items.slice();
													items[i].rateNear = content;
													setAttributes({items: items});
												}}
												value={attributes.items[i].rateNear}
											/>
										</span>
									</span>
									<div className="of-info__view-item-rate">
										<figure className="of-info__view-item-img">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 57 13">
											<g>
												<g>
												<path d="M49.89.222l1.512 4.647h4.878l-3.948 2.866 1.507 4.643L49.89 9.51l-3.95 2.868 1.509-4.643-3.951-2.866h4.882z"></path>
												</g>
												<g>
												<path d="M6.325.222L7.837 4.87h4.88L8.764 7.735l1.511 4.643-3.95-2.868-3.95 2.868 1.511-4.643-3.95-2.866h4.88z"></path>
												</g>
												<g>
												<path d="M28.107.222l1.508 4.647h4.882l-3.949 2.866 1.51 4.643-3.95-2.868-3.95 2.868 1.51-4.643-3.95-2.866h4.878z"></path>
												</g>
											</g>
											</svg>
										</figure>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
		};

		const tabItem = i => <div
			href={`#of-info__nav-item-${i+1}`}
			data-href={i+1}
			className={(i+1 === activeTab ? 'active ' : '') + "of-info__nav-item js-tile-item"}
			onClick={(e) => {
				e.preventDefault();
				setState({activeTab: i});
			}}>
			<div className="of-info__nav-inner">
				{attributes.items[i].useImage && <figure className="of-info__nav-icon">
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

			<div className="screen_body_wrapper start bottom no_relative">
				<div className="of-info opacity_animate js-tile-wrap animated" data-tab-content={activeTab+1}>
					<div className="of-info__left">
						{attributes.items.map((el, i) => itemInfo(i))}
					</div>
					<div className="of-info__right">
						<div className="of-info__board">
							{attributes.items.map((el, i) => item(i))}
							<div className="of-info__nav">
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
			return <figure className={"of-info__board-img"} data-for-content={i+1}>
					<img src={attributes.items[i].image} alt=""/>
				</figure>
		};

		const itemInfo = i => {
			let metaAtts = {};
			if (attributes.items[i].useImage)
				metaAtts['data-use-image'] = 'true';
			return <div className="of-info__left-inner" data-for-content={i+1}>
					<div className="meta" {...metaAtts}>
						<div className="meta-title"><RichText.Content value={attributes.items[i].navTitle}/></div>
						<div className="meta-content top"><RichText.Content value={attributes.items[i].contentInnerTop}/></div>
						<div className="meta-content center"><RichText.Content value={attributes.items[i].contentInnerCenter}/></div>
						<div className="meta-content bot"><RichText.Content value={attributes.items[i].contentInnerBot}/></div>
						<div className="meta-viewTitle"><RichText.Content value={attributes.items[i].viewTitle}/></div>
						<div className="meta-viewImage"><img src={attributes.items[i].viewImage}/></div>
						<div className="meta-rateFar"><RichText.Content value={attributes.items[i].rateFar}/></div>
						<div className="meta-rateIndoor"><RichText.Content value={attributes.items[i].rateIndoor}/></div>
						<div className="meta-rateNear"><RichText.Content value={attributes.items[i].rateNear}/></div>
						<img src={attributes.items[i].image} alt="" className="meta-image"/>
						<img src={attributes.items[i].infoIcon} alt="" className="meta-infoIcon"/>
						<img src={attributes.items[i].navImage} alt="" className="meta-navImage"/>
					</div>
					<div className="of-info__content">
						<figure className="of-info__content-icon">
							<img src={attributes.items[i].infoIcon} alt=""/>
						</figure>
						<div className="of-info__content-inner">
							<span><RichText.Content value={attributes.items[i].contentInnerTop}/></span>
							{attributes.items[i].contentInnerCenter && <span><RichText.Content value={attributes.items[i].contentInnerCenter}/></span>}
							<span><RichText.Content value={attributes.items[i].contentInnerBot}/></span>
						</div>
					</div>
					<div className="of-info__view">
						<span className="of-info__view-title">
							<RichText.Content value={attributes.items[i].viewTitle}/>
						</span>
						<figure className="of-info__view-img">
							<img src={attributes.items[i].viewImage} alt=""/>
						</figure>
						<div className="of-info__view-row">
							<div className="of-info__view-col">
								<div className="of-info__view-item" data-rate={attributes.items[i].rateFar}
									data-color="1">
									<span className="of-info__view-item-txt">Far</span>
									<div className="of-info__view-item-rate">
										<figure className="of-info__view-item-img">
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 57 13">
												<g>
													<g>
													<path d="M49.89.222l1.512 4.647h4.878l-3.948 2.866 1.507 4.643L49.89 9.51l-3.95 2.868 1.509-4.643-3.951-2.866h4.882z"></path>
													</g>
													<g>
													<path d="M6.325.222L7.837 4.87h4.88L8.764 7.735l1.511 4.643-3.95-2.868-3.95 2.868 1.511-4.643-3.95-2.866h4.88z"></path>
													</g>
													<g>
													<path d="M28.107.222l1.508 4.647h4.882l-3.949 2.866 1.51 4.643-3.95-2.868-3.95 2.868 1.51-4.643-3.95-2.866h4.878z"></path>
													</g>
												</g>
											</svg>
										</figure>
									</div>
								</div>
							</div>
							<div className="of-info__view-col">
								<div className="of-info__view-item" data-rate={attributes.items[i].rateIndoor}
									data-color="2">
									<span className="of-info__view-item-txt">INDOOR</span>
									<div className="of-info__view-item-rate">
										<figure className="of-info__view-item-img">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 57 13">
											<g>
												<g>
												<path d="M49.89.222l1.512 4.647h4.878l-3.948 2.866 1.507 4.643L49.89 9.51l-3.95 2.868 1.509-4.643-3.951-2.866h4.882z"></path>
												</g>
												<g>
												<path d="M6.325.222L7.837 4.87h4.88L8.764 7.735l1.511 4.643-3.95-2.868-3.95 2.868 1.511-4.643-3.95-2.866h4.88z"></path>
												</g>
												<g>
												<path d="M28.107.222l1.508 4.647h4.882l-3.949 2.866 1.51 4.643-3.95-2.868-3.95 2.868 1.51-4.643-3.95-2.866h4.878z"></path>
												</g>
											</g>
											</svg>
										</figure>
									</div>
								</div>
							</div>
							<div className="of-info__view-col">
								<div className="of-info__view-item" data-rate={attributes.items[i].rateNear}
									data-color="3">
									<span className="of-info__view-item-txt">NEAR</span>
									<div className="of-info__view-item-rate">
										<figure className="of-info__view-item-img">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 57 13">
											<g>
												<g>
												<path d="M49.89.222l1.512 4.647h4.878l-3.948 2.866 1.507 4.643L49.89 9.51l-3.95 2.868 1.509-4.643-3.951-2.866h4.882z"></path>
												</g>
												<g>
												<path d="M6.325.222L7.837 4.87h4.88L8.764 7.735l1.511 4.643-3.95-2.868-3.95 2.868 1.511-4.643-3.95-2.866h4.88z"></path>
												</g>
												<g>
												<path d="M28.107.222l1.508 4.647h4.882l-3.949 2.866 1.51 4.643-3.95-2.868-3.95 2.868 1.51-4.643-3.95-2.866h4.878z"></path>
												</g>
											</g>
											</svg>
										</figure>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
		};

		const tabItem = i => <a
			href={`#of-info__nav-item-${i+1}`}
			data-href={i+1}
			className={(i+1 === activeTab ? 'active ' : '') + "of-info__nav-item js-tile-item"}>

			<div className="of-info__nav-inner">
				{attributes.items[i].useImage && <figure className="of-info__nav-icon">
					<img src={attributes.items[i].navImage} alt=""/>
				</figure>}
				{!attributes.items[i].useImage && <RichText.Content value={attributes.items[i].navTitle}/>}
			</div>
		</a>;

		return <div className="screen_section screen_section--not-padding" data-section="#_SLIDE_NUMBER"
					style={{backgroundImage: `url(${attributes.background})`}}>

			<div className="screen_body_wrapper start bottom no_relative">
				<div className="of-info opacity_animate js-tile-wrap animated" data-tab-content={activeTab+1}>
					<div className="of-info__left">
						{attributes.items.map((el, i) => itemInfo(i))}
					</div>
					<div className="of-info__right">
						<div className="of-info__board">
							{attributes.items.map((el, i) => item(i))}
							<div className="of-info__nav">
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
