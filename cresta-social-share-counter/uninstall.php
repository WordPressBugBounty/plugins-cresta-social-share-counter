<?php 
// if delete/uninstall is not called from WP, then exit
if ( ! defined( 'ABSPATH' ) && ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit('Failed to uninstall.');
}

// delete plugin options
delete_option( 'selected_button' );
delete_option( 'cresta_social_shares_selected_page' );
delete_option( 'cresta_social_shares_float' );
delete_option( 'cresta_social_shares_float_buttons' );
delete_option( 'cresta_social_shares_style' );
delete_option( 'cresta_social_shares_position_top' );
delete_option( 'cresta_social_shares_position_left' );
delete_option( 'cresta_social_shares_twitter_username' );
delete_option( 'cresta_social_shares_twitter_new_logo' );
delete_option( 'cresta_social_shares_show_counter' );
delete_option( 'cresta_social_shares_show_ifmorezero' );
delete_option( 'cresta_social_shares_show_total' );
delete_option( 'cresta_social_shares_total_text' );
delete_option( 'cresta_social_shares_disable_mobile' );
delete_option( 'cresta_social_shares_enable_animation' );
delete_option( 'cresta_social_shares_enable_samecolors' );
delete_option( 'cresta_social_shares_before_content' );
delete_option( 'cresta_social_shares_after_content' );
delete_option( 'cresta_social_shares_show_floatbutton' );
delete_option( 'cresta_social_shares_show_credit' );
delete_option( 'cresta_social_shares_enable_shadow' );
delete_option( 'cresta_social_shares_enable_shadow_buttons' );
delete_option( 'cresta_social_shares_z_index' );
delete_option( 'cresta_social_shares_button_hide_show' );
delete_option( 'cresta_social_shares_custom_css' );
delete_option( 'cresta_social_shares_twitter_shares' );
delete_option( 'cresta_social_shares_facebook_appid' );
delete_option( 'cresta_social_shares_facebook_appsecret' );
delete_option( 'cresta_social_shares_pintmode' );
delete_option( 'cresta_social_shares_show_ifmorenumber' );
delete_option( 'cresta_social_shares_http_https_both' );
delete_option( 'cresta_social_shares_twitter_shares_two' );
delete_option( 'cresta_social_shares_twitter_shares_three' );
delete_option( 'cresta_social_shares_cache_period' );
delete_option( 'cresta_social_shares_store_meta' );
delete_option( 'cresta_social_shares_google_font' );
delete_post_meta_by_key( 'cresta_facebook_share_count' );
?>