var el = wp.element.createElement;
var BlockControls = wp.blocks.BlockControls;
var AlignmentToolbar = wp.blocks.AlignmentToolbar;
var InspectorControls = wp.components;
var TextControl = wp.blocks.InspectorControls.TextControl;
var SelectControl = wp.components.SelectControl;
var blocks = wp.blocks;
var element = wp.element;
var i18n = wp.i18n;

// console.log(plugin_url);


var PlatformList = [
					{name:"Facebook",slug:'facebook',attribute:'showFacebook'},
					{name:"Twitter",slug:'twitter',attribute:'showTwitter'},
					{name:"Google +",slug:'google-plus',attribute:'showGooglePlus'},
					{name:"Pinterest",slug: 'pinterest',attribute:'showPinterest'},
					{name:"LinkedIn",slug:'linkedin',attribute:'showLinkedin'},
					{name:"Tumblr",slug:'tumblr',attribute:'showTumblr'},
					{name:"VK",slug:'vk',attribute:'showVk'},
					{name:"Reddit",slug:'reddit',attribute:'showReddit'},
					{name:"OK",slug:'ok','attribute':'showOk'},
					{name:"StumbleUpon",slug:'stumbleupon',attribute:'showStumbleUpon'},
					{name:"Telegram",slug:'telegram',attribute:'showTelegram'},
					// {name:"Yummly",slug:'yummly',attribute:'showYummly'},
					// {name:"Vine",slug:'vine',attribute:'showVine'},
					
				];
var renderButtons= function(attributes){
	var platforms=PlatformList;
	var buttons=platforms.map(function(platform){
				if(attributes[platform.attribute]){
					var designClass="rectangle";
					if(attributes.shareButtonStyle==='cube'){
						designClass='cube';
					}else if(attributes.shareButtonStyle==='round'){
						designClass='round';
					}else{
						designClass='rectangle';
					}
					var abc= el(
						'span',
						{
							'className':' btn-form-'+attributes.shareButtonStyle+' smbp-social-media-block-share-button',
							onclick: "smbp_social_media_block_share('"+platform.slug+"')",
						},
						el(
							'img',
							{
								src:attributes.iconPath+'/'+designClass+'/'+platform.slug+'.png',
								style: { 'height': (attributes.shareButtonStyle!=="rectangle"?(attributes.shareButtonSize/16):'1.25')+'rem' },
								// onclick: "smbp_social_media_block_share('"+platform.slug+"')",
								className: "smbp-social-media-block-share-img-"+platform.slug
							}
						)
					);
					return abc;
				}
			});
	// console.log(platforms,PlatformList,buttons);
	var abc=el(
		'div',
		{
			'className': 'smbp_social_media_block_share_wrapper'
		},
		el(
		'div',
			{
				'className': 'smbp_social_media_block_share_pretext'
			},
			attributes.textBeforeShare
		),
		el(
		'div',
			{
				'className': 'smbp_social_media_block_share_button_wrapper'
			},
			buttons
		)
	);
	return abc;
	
}

wp.blocks.registerBlockType( 'ultimately-social/socail-media-share', {
    title: i18n.__('Social Media Share'),
    // title: 'Social Media Share',

    icon: 'networking',

    category: 'common',

    attributes: {
    	textBeforeShare: {
    		default: 'Please share us!',
    		type: 'string',
    		// source: 'meta',
    		// meta: 'smbp_social_textBeforeShare'
    	},
    	iconPath: {
    		default: plugin_url,
    		type: 'string',
    		// source: 'meta',
    		// meta: 'smbp_social_media_block_plugin_url'
    	},
        showCounts: {
            default: false,
            type: 'boolean',
            // source: 'meta',
            // meta: 'smbp_social_showCounts'
        },
        shareButtonStyle: {
        	default: 'rectangle',
        	type: 'string',
        	// source: 'meta',
        	// meta: 'smbp_social_shareButtonStyle'
        },
        shareButtonSize: {
        	default: 50,
        	type: 'integer',
        	// source: 'meta',
        	// meta: 'smbp_social_shareButonSize'
        },
        showFacebook: {
            default: true,
            type: 'boolean',
            // source: 'meta',
            // meta: 'smbp_social_showFacebook'
        },
        showTwitter: {
            default: true,
            type: 'boolean',
            // source: 'meta',
            // meta: 'smbp_social_showTwitter'
        },
        showGooglePlus: {
            default: true,
            type: 'boolean',
            // source: 'meta',
            // meta: 'smbp_social_showWhatsapp'
        },
        showPinterest: {
            default: true,
            type: 'boolean',
            // source: 'meta',
            // meta: 'smbp_social_showPinterest'
        },
        showLinkedin: {
            default: true,
            type: 'boolean',
            // source: 'meta',
            // meta: 'smbp_social_showLinkedin'
        },
        showReddit: {
            default: true,
            type: 'boolean',
            // source: 'meta',
            // meta: 'smbp_social_showReditt'
        },
        showTumblr: {
            default: true,
            type: 'boolean',
            // source: 'meta',
            // meta: 'smbp_social_showTumblr'
        },
        showVk: {
            default: true,
            type: 'boolean',
            // source: 'meta',
            // meta: 'smbp_social_showEmail'
        },
        showOk: {
            default: true,
            type: 'boolean',
            // source: 'meta',
            // meta: 'smbp_social_showEmail'
        },
        showStumbleUpon: {
            default: true,
            type: 'boolean',
            // source: 'meta',
            // meta: 'smbp_social_showEmail'
        },
        showTelegram: {
            default: true,
            type: 'boolean',
            // source: 'meta',
            // meta: 'smbp_social_showEmail'
        },
        showYummy: {
            default: true,
            type: 'boolean',
            // source: 'meta',
            // meta: 'smbp_social_showEmail'
        },
		showVine: {
            default: true,
            type: 'boolean',
            // source: 'meta',
            // meta: 'smbp_social_showEmail'
        },
    },
    edit: function(props) {
        var focus = props.focus;
		var alignment = props.attributes.alignment;
		var attributes = props.attributes;
        var setAttributes = props.setAttributes;
        window.testSetAttributes = props.setAttributes;
        var createChangeHandler = function createChangeHandler(attr) {
            return function (event) {
                var newValue = {};
                newValue[attr] = !attributes[attr];
                // console.log(newValue);
                setAttributes(newValue);
            };
        };
		var platformchoserRender = function(list){
			return list.map(function(platform, index) {
				if(index%2==0){
					if(list[index+1]){
						var plateform2= list[index+1];
					}
					var abc= 					
					el(
						'div',
						{
							className:'row platform',
							key:index

						},
						platformchoserRenderSingle(platform),
						platformchoserRenderSingle(plateform2)
						 
					);
					// console.log(abc);
					return abc
				}
			});
		}
		var platformchoserRenderSingle = function(platform){
			if(platform && platform.name){
				// console.log(platform.name,attributes['show'+platform.name]);
				var platform_name=platform.attribute;
				var platform_attb=attributes[platform_name];
				// console.log(platform_name,platform_attb,attributes,platform);
				var temp= el( 
							'div',
							{
								className:'col-md-6'
							},
							el(
								'input',
								{
									type: 'checkbox',
									name: 'smbp-social-media-block-show-'+platform.slug,
									value: platform_attb,
									checked: platform_attb,
									onChange:createChangeHandler(platform.attribute),
								}
							),
							el(
								'lable',
								{
									for: 'smbp-social-media-block-show-'+platform.name,
								},
								platform.name
							)
						);
				// console.log(temp);
				return temp;
			}
		}
		// console.log(attributes);
		return [	el(
					blocks.InspectorControls,
					{ key: 'inspector'},
					el('div',{ className:"smbp-block-social-media-share-inspector" },
						el( 'div', { className: 'components-block-description' }, // A brief description of our block in the inspector.
							el( 'p', {}, i18n.__( 'Social Media block options.' ) ),
						),
						el( 'h3', {}, i18n.__( 'Platform' ) ), 
						platformchoserRender(PlatformList),
						el( 'h3', { className:'design header' }, i18n.__( 'Design' ) ),
						el( 'div',
							{className:'row design'},
							el(
								'label',
								{
									'for':'design-style'
								},
								'Style : '
							),
							el(
								'select',
								{
									className:'form-control',
									value: attributes.shareButtonStyle,
									onChange: function(event){setAttributes({shareButtonStyle:event.target.value})},
								},
								el(
									'option',
									{
										'value':'rectangle'
									},
									'Rectangle'
								),
								el(
									'option',
									{
										'value':'cube'
									},
									'Cube'
								),
								el(
									'option',
									{
										'value':'round'
									},
									'Round'
								)
							),
							attributes.shareButtonStyle && attributes.shareButtonStyle!=='rectangle' && el( 'div',
								{className:'row design'},
								el(
									'label',
									{
										'for':'design-style'
									},
									'Size : '
								),
								el(
									'input',
									{
										className:'form-control size',
										type:'number',
										value: attributes.shareButtonSize,
										onChange:function(event){setAttributes({'shareButtonSize':event.target.value});}
									}
								),
							)
						),
						
						false && el( 'h3', {}, i18n.__( 'Counts' ) ),
						false && el( 'div',
							{className:'row count'},
							el(
								'label',
								{
									'for':'count-no'
								},
								el(
									'input',
									{
										className:"form-control",
										checked:!attributes.showCounts,
										name:'show-count',
										id:'count-no',
										type:'radio',
										onClick:createChangeHandler('showCounts'),
									}
								),
								'No'
							),
							el(
								'label',
								{
									'for':'count-yes'
								},
								el(
									'input',
									{
										className:"form-control",
										name:'show-count',
										id:'count-yes',
										type:'radio',
										checked:attributes.showCounts,
										onClick:createChangeHandler('showCounts'),
									}
								),
								'Yes'
							),
						),
						el( 'h3', {}, i18n.__( 'Text before icons' ) ),
						el( 'div',
							{className:'row pretext'},
							el(
								'input',
								{
									'type':'text',
									className:'form-control',
									value: attributes.textBeforeShare,
									onChange:function(event){setAttributes({'textBeforeShare':event.target.value});}
								},
							),
						),
					),
				),
				renderButtons(props.attributes)
		]
    },

    save: function(props) {
        return renderButtons(props.attributes);
    },
} );