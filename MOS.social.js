var MOS = window.MOS || {};
MOS.social = (function() {

	var _shareData = {},
		_isMobile = false,
		_runBeforFn,
		_phrases = {};

	//Phrases used can be translated by overrunning this like this:
	//MOS.social.phrases.copy = 'Kopiera länk'; //Sv
	_phrases.copy_link = 'Copy link';

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		_isMobile = true;
	}

	function _sendStat(category, action, opt_label) {
		var evArr = ['_trackEvent', category, action, opt_label];
		//c.l(evArr);
		if (window._gaq) {
			window._gaq.push(evArr);
		}
	}

	function _getShareDataFromMetaTags() {
		
		var getOG = function (prop) {

			var tag = document.head.querySelector('[property="og:' + prop + '"]'),
				val = '';
			if (tag) {
				val = tag.content;
			}

			return val;

		};

		var picture = getOG('image');
		
		if (picture.substr(0, 4) !== 'http') {
			picture = location.origin + picture ;
			picture.split('//').join('/');
		}

		var data = {
			name: getOG('title'),
			link: location.href,
			picture: picture,
			text: getOG('description')
		};

		return data;
		
	}

	_runBeforFn = function () {};

	function _setup(obj) {

		obj = obj || {};

		if (obj.fn) {
			_runBeforFn = obj.fn;
		}

		_getShareDataFromMetaTags();

		if (obj.insert && obj.insert.target && obj.insert.buttons) {

			var len = obj.insert.buttons.length, i, curr, $cont;
			$cont = $(obj.insert.target)
			for (i = 0; i < len; i += 1) {
				curr = obj.insert.buttons[i].toLowerCase();

				if (curr === 'link') {
					$cont.append($('<a title="' + _phrases.copy_link + '" class="MOS-shareBtn link" data-type="link" href="javascript:"><i class="fa fa-link"></i></a>'));
				}
				if (curr === 'facebook') {
					$cont.append($('<a title="Facebook" class="MOS-shareBtn facebook" data-type="facebook" href="javascript:"><i class="fa fa-facebook"></i></a>'));
				}
				if (curr === 'twitter') {
					$cont.append($('<a title="Twitter" class="MOS-shareBtn twitter" data-type="twitter" href="javascript:"><i class="fa fa-twitter"></i></a>'));
				}
				if (curr === 'gplus') {
					$cont.append($('<a title="Google+" class="MOS-shareBtn gplus" data-type="gplus" href="javascript:"><i class="fa fa-google-plus"></i></a>'));
				}
				if (curr === 'tumblr') {
					$cont.append($('<a title="Tumblr" class="MOS-shareBtn tumblr" data-type="tumblr" href="javascript:"><i class="fa fa-tumblr"></i></a>'));
				}
				if (curr === 'pinterest') {
					$cont.append($('<a title="Pinterest" class="MOS-shareBtn pinterest" data-type="pinterest" href="javascript:"><i class="fa fa-pinterest"></i></a>'));
				}
				if (curr === 'linkedin') {
					$cont.append($('<a title="LinkedIn" class="MOS-shareBtn linkedin" data-type="linkedin" href="javascript:"><i class="fa fa-linkedin"></i></a>'));
				}
				if (curr === 'reddit') {
					$cont.append($('<a title="Reddit" class="MOS-shareBtn reddit" data-type="reddit" href="javascript:"><i class="fa fa-reddit"></i></a>'));
				}
				if (curr === 'weibo') {
					$cont.append($('<a title="Sina Weibo 新浪微博" class="MOS-shareBtn weibo" data-type="weibo" href="javascript:"><i class="fa fa-weibo"></i></a>'));
				}
			}

		}

		$(document.body).on('click', '.MOS-shareBtn', function (e) {
			e.preventDefault();
			_share($(this).data('type').toLowerCase());

		});

	}

	function _share(type) {

		_runBeforFn();

		if (type === 'link') {
			_link(_shareData);
		}

		if (type === 'facebook') {
			_facebook(_shareData);
		}

		if (type === 'weibo') {
			_weibo(_shareData);
		}

		if (type === 'twitter') {
			_twitter(_shareData.text, _shareData.link);
		}

		if (type === 'gplus') {
			_gplus(_shareData.link);
		}

		if (type === 'tumblr') {
			_tumblr(_shareData.text, _shareData.link);
		}

		if (type === 'pinterest') {
			_pinterest(_shareData);
		}

		if (type === 'linkedin') {
			_linkedin(_shareData);
		}

		if (type === 'reddit') {
			_reddit(_shareData.link);
		}

	}

	function _set(data) {

		if (data) {
			_shareData = data;
		} else {
			_shareData = _getShareDataFromMetaTags();
		}

		console.log(_shareData);
		
	}

	function _newWin(w, h, input) {

		var left = (screen.width - w) / 2,
			top = (screen.height - h) / 2,
			win,
			winStr = 'left=' + left + ', top=' + top + ',  height=' + h + ', width=' + w + ', menubar=yes, toolbar=no, location=no, directories=no, fullscreen=no, titlebar=no, hotkeys=yes, status=no, scrollbars=yes, resizable=no';

		if (input.indexOf('http://') === 0 || input.indexOf('https://') === 0 ) {
			window.open(input, '_blank', winStr);
		} else {
			win = window.open('', '_blank', winStr);
			$(win.document.body).html(input);
		}

	}

	function _link (data) {

		data = data || _shareData;

		var link = data.link || document.location.href,
			picture = data.picture || '',
			html;

		_sendStat('Share', 'Copy link', link);

		html = 	'<html>' +
				'<head>' +
				'	<title>' + _phrases.copy_link + '</title>' +
				'	<style>' +
				'		body {' +
				'			background-color: #777;' +
				'		}' +
				'		textarea {' +
				'			font-size: 15px; padding: 5px; width: 100%; height: 100%;' +
				'		}' +
				'	</style>' +
				'</head>' +
				'<body>' +
				'	<textarea id="ta" onfocus="var that = this; setTimeout(function () {that.select();}, 10)">' + link + '</textarea>' +
				'</body>' +
				'</html>';


		_newWin(500, 50, html);

	}

	function _facebook (data) {

		data = data || _shareData;

		var shareInfo = {
				name: data.name || '',
				link: data.link || document.location.href,
				picture: data.picture || '',
				caption: data.caption || '',
				description: data.text || '',
				message: data.text || ''
			},
			shareUrl = 'https://www.facebook.com/sharer/sharer.php',
			url= shareUrl + '?s=100&p[title]=' + encodeURIComponent(shareInfo.caption) + '&p[url]=' + encodeURIComponent(shareInfo.link) + '&p[summary]=' + encodeURIComponent(shareInfo.message) + '&p[images][0]=' + encodeURIComponent(shareInfo.picture);

		if (_isMobile) {
			url = 'https://m.facebook.com/sharer.php?u=' + shareInfo.link;
		}

		_sendStat('Share', 'Facebook', shareInfo.link);
		_newWin(560, 500, url);


	}

	function _weibo (data) {

		data = data || {};

		var shareInfo = {
			name: data.name || '',
			link: data.link || document.location.href,
			picture: data.picture || '',
			description: data.text || ''
		},
		shareUrl = 'http://service.weibo.com/share/share.php',
		url = shareUrl + '?url='+encodeURIComponent(shareInfo.link)+'&appkey=&title='+encodeURIComponent(shareInfo.name)+encodeURIComponent(' - ')+encodeURIComponent(shareInfo.description)+'&pic='+shareInfo.picture+'&ralateUid=&language=zh_cn';

		_sendStat('Share', 'Weibo', shareInfo.link);
		_newWin(400, 350, url);

	}

	function _twitter (text, link) {

		link = link || document.location.href;
		_sendStat('Share', 'Twitter', link);
		_newWin(550, 250, 'http://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + ' ' + encodeURIComponent(link) + '&amp;source=clicktotweet');

	}

	function _gplus (link) {

		link = link || document.location.href;
		_sendStat('Share', 'GPlus', link);
		_newWin(400, 500, 'https://plus.google.com/share?url=' + encodeURIComponent(link));

	}

	function _tumblr (text, link) {

		link = link || document.location.href;
		_sendStat('Share', 'Tumblr', link);
		_newWin(450, 500, 'http://www.tumblr.com/share?s=&v=3&t=' + encodeURIComponent(text) + '&u=' + encodeURIComponent(link));

	}

	function _pinterest (data) {

		data = data || {};

		var shareInfo = {
			name: data.name || '',
			link: data.link || document.location.href,
			picture: data.picture || '',
			description: data.text || ''
		},
		shareUrl = 'https://pinterest.com/pin/create/button/',
		url = shareUrl + 	'?url=' + encodeURIComponent(shareInfo.link) + '&title=' + encodeURIComponent(shareInfo.description) + '&media='+ shareInfo.picture;

		_sendStat('Share', 'Pinterest', shareInfo.link);
		_newWin(760, 560, url);

	}

	function _linkedin (data) {

		data = data || {};

		var shareInfo = {
			name: data.name || '',
			link: data.link || document.location.href,
			picture: data.picture || '',
			description: data.text || ''
		},
		shareUrl = 'https://www.linkedin.com/shareArticle',
		url = shareUrl + 	'?mini=true&url=' + encodeURIComponent(shareInfo.link) + '&title=' + encodeURIComponent(shareInfo.name) + '&summary=' + encodeURIComponent(shareInfo.description) + '&source='+ encodeURIComponent(shareInfo.link);

		_sendStat('Share', 'Linkedin', shareInfo.link);
		_newWin(500, 400, url);

	}

	function _reddit (link) {

		link = link || document.location.href;
		_sendStat('Share', 'Reddit', link);
		_newWin(550, 550, 'https://www.reddit.com/submit?url=' + encodeURIComponent(link) + '&amp;source=clicktotweet');

	}


	return {
		setup: _setup,
		set: _set,
		facebook: _facebook,
		weibo: _weibo,
		twitter: _twitter,
		gplus: _gplus,
		tumblr: _tumblr,
		pinterest: _pinterest,
		linkedin: _linkedin,
		phrases: _phrases,
		share: _share
	};
}());
