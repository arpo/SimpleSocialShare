# Simple social share buttons
Easy to setup social buttons. Supported networks:

Facebook, Twitter, Google+, Tumblr, Pinterest, LinkedIn, Weibo.

See index.html for more info

	<h3>Deafult</h3>
	<div class="socialButtons"></div> 

	<h3>Rounded</h3>
	<div class="socialButtons round"></div> 

	<h3>Smaller icons</h3>
	<div class="socialButtons small"></div> 

	<h3>Start color is dark grey </h3>
	<div class="socialButtons dark"></div> 

	<h3>And all together</h3>
	<div class="socialButtons round dark small"></div> 

	<style type="text/css">
		/*Set custom size*/
		/*.MOS-shareBtn:link {
			font-size: 30px !important;
		}*/
	</style>

	<script type="text/javascript" src="https://code.jquery.com/jquery-latest.min.js"></script>
	<script type="text/javascript" src="MOS.share.js"></script>
	<script type="text/javascript">

	$(document).on('ready', function() {
		MOS.social.setup({
			fn: function (that, ev) { //This runs before the share functionality is executed
				MOS.social.set({ //This data is used by all share buttons
					name: 'futurism.com',
					link: 'http://futurism.com/videos/the-top-19-artificial-intelligence-movies/',
					picture: 'https://i.ytimg.com/vi/C23Z3ANGk-U/hqdefault.jpg',
					text: 'The Top 19 Artificial Intelligence Movies - Futurism. These are our top favorite 19 artificial intelligence movies.'
				});		
			},
			insert: { //...or insert/inject links like this
				target: '.socialButtons',
				buttons: ['link, facebook, twitter, gplus', 'tumblr', 'pinterest', 'linkedin', 'weibo']
			}
		});
		
	});

	</script>

