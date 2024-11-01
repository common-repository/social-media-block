jQuery(document).ready(function($){
	$('.smbp-social-media-block-share-button').click(function(){
		// console.log($(this));
		var slug_img=$(this).children('img');
		// console.log(slug_img);
		var slug_class=slug_img.attr('class');
		// console.log(slug_class);
		var slug = slug_class.replace('smbp-social-media-block-share-img-','');
		var url = "";
		switch(slug){
			case 'facebook': url="https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(window.location.href);break;
			case 'twitter': url="https://twitter.com/intent/tweet?url="+encodeURIComponent(window.location.href)+"&text="+encodeURIComponent(document.title);break;
			case 'google-plus': url="https://plus.google.com/share?url="+encodeURIComponent(window.location.href)+"&text="+encodeURIComponent(document.title);break;
			case 'pinterest': url="https://pinterest.com/pin/create/link/?url="+encodeURIComponent(window.location.href)+"&title="+encodeURIComponent(document.title);break;
			case 'linkedin': url="https://www.linkedin.com/shareArticle?url="+encodeURIComponent(window.location.href)+"&title="+encodeURIComponent(document.title)+"&mini=true&source=LinkedIn"+($('meta[name="description"]').length>0?"&summary="+$('meta[name="description"]').attr('content'):'');break;
			case 'tumblr': url="https://www.tumblr.com/share/?v=3&u="+encodeURIComponent(window.location.href)+'&t='+encodeURIComponent(document.title);break;
			case 'vk': url="https://vk.com/share.php?url="+encodeURIComponent(window.location.href);break;
			case 'reddit': url="https://www.reddit.com/submit?url="+encodeURIComponent(window.location.href);break;
			case 'ok': url="https://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl="+encodeURIComponent(window.location.href);break;
			case 'stumbleupon': url="https://www.stumbleupon.com/submit?url="+encodeURIComponent(window.location.href);break;
			case 'telegram': url="https://telegram.me/share/url?url="+encodeURIComponent(window.location.href);break;
			case 'yummly': url="https://www.yummly.com/urb/verify?url="+encodeURIComponent(window.location.href)+"&title="+encodeURIComponent(document.title)+"&yumtype=button";break;
			case 'vine': url="https://www.newsvine.com/_tools/seed&save?u="+encodeURIComponent(window.location.href);break;
		}
		if(url!==""){
			window.open(url,'share','width='+(window.innerWidth/2)+',height='+(window.innerHeight/2)+',left='+(window.innerWidth/4)+',top='+(window.innerHeight/4));
		}
	})
})