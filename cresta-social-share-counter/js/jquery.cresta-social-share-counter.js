(function($) {
	"use strict";
	$(document).ready(function() {
		/*-----------------------------------------------------------------------------------*/
		/*  Social Counter JS
		/*-----------------------------------------------------------------------------------*/ 		
		var $URL = crestaPermalink.thePermalink;
		var $ismorezero = crestaPermalink.themorezero;
		var $ismorenumber = crestaPermalink.themorenumber;
		totalShares($URL);
			function ReplaceNumberWithCommas(shareNumber) {
				 if (shareNumber >= 1000000000) {
					return (shareNumber / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
				 }
				 if (shareNumber >= 1000000) {
					return (shareNumber / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
				 }
				 if (shareNumber >= 1000) {
					return (shareNumber / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
				 }
				 return shareNumber;
			}
			// Facebook Shares Count
			function facebookShares($URL) {
				if ( $('#facebook-cresta').hasClass('facebook-cresta-share') ) {
					var token = crestaShareSSS.FacebookCount;
					if ( token !== 'nope' ) {
						// Facebook Shares Count via PHP
						var facebookvar = $('<span class="cresta-the-count" id="facebook-count"></span>').text(ReplaceNumberWithCommas(token));
						
						if ($ismorezero === 'yesmore') {
							if (token > $ismorenumber) {
								$('.facebook-cresta-share.float a').after(facebookvar);
							}
						} else {
							$('.facebook-cresta-share.float a').after(facebookvar);
						}
						$('#total-shares').attr('data-facebookShares', token);
					} else {
						$.ajax( {
							url: '//graph.facebook.com/?id=' + $URL + '&fields=og_object{engagement}',
							dataType : 'jsonp',
							timeout: 5000,
							success : function( obj ) {
								if (obj.og_object === undefined ) {
									var facebookvar = $('<span class="cresta-the-count" id="facebook-count"></span>').text(0);
								} else {
									var facebookvar = $('<span class="cresta-the-count" id="facebook-count"></span>').text(ReplaceNumberWithCommas(obj.og_object.engagement.count || 0));
								}
								if ($ismorezero === 'yesmore') {
									if (obj.og_object !== undefined && obj.og_object.engagement.count > $ismorenumber) {
										$('.facebook-cresta-share.float a').after(facebookvar);
									}
								} else {
									$('.facebook-cresta-share.float a').after(facebookvar);
								}
								if (obj.og_object === undefined ) {
									$('#total-shares').attr('data-facebookShares', 0);
								} else {
									$('#total-shares').attr('data-facebookShares', obj.og_object.engagement.count || 0);
								}
							},
							error : function(jqXHR, status, errorThrown) {
								if ($ismorezero === 'nomore') {
									$('.facebook-cresta-share.float a').after('<span class="cresta-the-count" id="facebook-count">0</span>');
								}
								$('#total-shares').attr('data-facebookShares', 0);
							}
						} );
					}
				} else {
					$('#total-shares').attr('data-facebookShares', 0);
				}
			}
			// Twitter Shares Count with newsharecount
			function twitterShares($URL) {
				if ( $('#twitter-cresta').hasClass('twitter-cresta-share') && $('#twitter-cresta').hasClass('withCountTwo') ) {
					$.ajax({
						url: '//opensharecount.com/count.json?url=' + $URL,
						type: 'GET',
						dataType: 'json',
						timeout: 2500,
						error: function(jqXHR, status, errorThrown){  
							if ($ismorezero === 'nomore') {
								$('.twitter-cresta-share.float a').after('<span class="cresta-the-count" id="twitter-count">0</span>');
							}
							$('#total-shares').attr('data-twitterShares', 0);
						},
						success: function (twitterdata) {
							var twittervar = $('<span class="cresta-the-count" id="twitter-count"></span>').text(ReplaceNumberWithCommas(twitterdata.count));
							if ($ismorezero === 'yesmore') {
								if (twitterdata.count > $ismorenumber) {
									$('.twitter-cresta-share.float a').after(twittervar);
								}
							} else {
								$('.twitter-cresta-share.float a').after(twittervar);
							}
							$('#total-shares').attr('data-twitterShares', twitterdata.count);
						}
					});
				} else if ( $('#twitter-cresta').hasClass('twitter-cresta-share') && $('#twitter-cresta').hasClass('withCountThree') ) {
					$.ajax({
						url: 'https://counts.twitcount.com/counts.php?url=' + $URL,
						type: 'GET',
						dataType: 'json',
						timeout: 2500,
						error: function(jqXHR, status, errorThrown){  
							if ($ismorezero === 'nomore') {
								$('.twitter-cresta-share.float a').after('<span class="cresta-the-count" id="twitter-count">0</span>');
							}
							$('#total-shares').attr('data-twitterShares', 0);
						},
						success: function (twitterdata) {
							var twittervar = $('<span class="cresta-the-count" id="twitter-count"></span>').text(ReplaceNumberWithCommas(twitterdata.count));
							if ($ismorezero === 'yesmore') {
								if (twitterdata.count > $ismorenumber) {
									$('.twitter-cresta-share.float a').after(twittervar);
								}
							} else {
								$('.twitter-cresta-share.float a').after(twittervar);
							}
							$('#total-shares').attr('data-twitterShares', twitterdata.count);
						}
					});
				} else {
					$('#total-shares').attr('data-twitterShares', 0);
				}
			}
			// Pinterest Shares Count
			function pinterestShares($URL) {
				if ( $('#pinterest-cresta').hasClass('pinterest-cresta-share') ) {
					$.getJSON('https://api.pinterest.com/v1/urls/count.json?url=' + $URL + '&callback=?', function (pindata) {
						var pinterestvar = $('<span class="cresta-the-count" id="pinterest-count"></span>').text(ReplaceNumberWithCommas(pindata.count));
						if ($ismorezero === 'yesmore') {
							if (pindata.count > $ismorenumber) {
								$('.pinterest-cresta-share.float a').after(pinterestvar);
							}
						} else {
							$('.pinterest-cresta-share.float a').after(pinterestvar);
						}
						$('#total-shares').attr('data-pinterestShares', pindata.count);
					});
				} else {
					$('#total-shares').attr('data-pinterestShares', 0);
				}
			}
			// Check if all JSON calls are finished or not
			function checkJSON_getSum() {
				if ($('#total-shares, #total-shares-content').attr('data-facebookShares') !== undefined &&
				$('#total-shares, #total-shares-content').attr('data-pinterestShares') !== undefined &&
				$('#total-shares, #total-shares-content').attr('data-twitterShares') !== undefined) {

					if ( $('#facebook-cresta').hasClass('facebook-cresta-share')) {
						var fbShares = parseInt($('#total-shares').attr('data-facebookShares'));
					} else {
						var fbShares = 0;
					}
					if ( $('#twitter-cresta').hasClass('twitter-cresta-share') && $('#twitter-cresta').attr('class').match(/withCount/)) {
						var twitShares = parseInt($('#total-shares').attr('data-twitterShares'));
					} else {
						var twitShares = 0;
					}
					if ( $('#pinterest-cresta').hasClass('pinterest-cresta-share')) {
						var pinterestShares = parseInt($('#total-shares').attr('data-pinterestShares'));
					} else {
						var pinterestShares = 0;
					}
					
				} else {
					setTimeout(function () {
						checkJSON_getSum();
					}, 400);
				}
					var totalShares = fbShares + pinterestShares + twitShares;
					$('#total-count').text( ReplaceNumberWithCommas(totalShares) || 0 );
			}
			function totalShares($URL) {
				twitterShares($URL);
				facebookShares($URL);
				pinterestShares($URL);
				checkJSON_getSum();
			}
	});
})(jQuery);