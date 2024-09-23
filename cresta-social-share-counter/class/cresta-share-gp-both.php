<?php
/**
 * Facebook Get share both http and https
 */
class crestaShareSocialCount {
	function get_facebook() {
		global $wp_query; 
		$post = $wp_query->post;
		$oldurl = preg_replace("/^https:/i", "http:", get_permalink( $post->ID ));
		$fbappid = get_option('cresta_social_shares_facebook_appid');
		$fbappsecret = get_option('cresta_social_shares_facebook_appsecret');
		$fbcacheperiod = get_option('cresta_social_shares_cache_period') ? get_option('cresta_social_shares_cache_period') : 24;
		$storeInMeta = get_option('cresta_social_shares_store_meta');
		$theToken = $fbappid.'|'.$fbappsecret;
		$cache_key = 'cresta_facebook_share_' . $post->ID;
		$count_total = get_transient( $cache_key );
		if ($storeInMeta == 1) {
			$getPost = get_post_meta( $post->ID, 'cresta_facebook_share_count', true ) ? get_post_meta( $post->ID, 'cresta_facebook_share_count', true ) : 0;
			if ( $count_total === false ) {
				$response = wp_remote_get( add_query_arg( array( 
					'id' => rawurlencode(get_permalink( $post->ID )),
					'access_token' => esc_attr($theToken),
					'fields' => 'og_object{engagement}'
				), 'https://graph.facebook.com/' ) );
				if ( is_array( $response ) && ! is_wp_error( $response ) ) {
					$body = json_decode( $response['body'],true );
					if (array_key_exists('og_object', $body)) {
						$count = intval($body['og_object']['engagement']['count']);
					} else {
						$count = 0;
					}
				} else {
					$count = 0;
				}
				
				$response_old = wp_remote_get( add_query_arg( array( 
					'id' => rawurlencode($oldurl),
					'access_token' => esc_attr($theToken),
					'fields' => 'og_object{engagement}'
				), 'https://graph.facebook.com/' ) );
				if ( is_array( $response_old ) && ! is_wp_error( $response_old ) ) {
					$body_old = json_decode( $response_old['body'],true );
					if (array_key_exists('og_object', $body_old)) {
						$count_old = intval($body_old['og_object']['engagement']['count']);
					} else {
						$count_old = 0;
					}
				} else {
					$count_old = 0;
				}
				
				$total = $count + $count_old;
				if ($total > $getPost) {
					update_post_meta( $post->ID, 'cresta_facebook_share_count', $total );
				}
				set_transient( $cache_key, $total, $fbcacheperiod * HOUR_IN_SECONDS );
			}
			return $getPost;
		} else {
			if ( $count_total === false ) {
				$response = wp_remote_get( add_query_arg( array( 
					'id' => rawurlencode(get_permalink( $post->ID )),
					'access_token' => esc_attr($theToken),
					'fields' => 'og_object{engagement}'
				), 'https://graph.facebook.com/' ) );
				if ( is_array( $response ) && ! is_wp_error( $response ) ) {
					$body = json_decode( $response['body'],true );
					if (array_key_exists('og_object', $body)) {
						$count = intval($body['og_object']['engagement']['count']);
					} else {
						$count = 0;
					}
				} else {
					$count = 0;
				}
				
				$response_old = wp_remote_get( add_query_arg( array( 
					'id' => rawurlencode($oldurl),
					'access_token' => esc_attr($theToken),
					'fields' => 'og_object{engagement}'
				), 'https://graph.facebook.com/' ) );
				if ( is_array( $response_old ) && ! is_wp_error( $response_old ) ) {
					$body_old = json_decode( $response_old['body'],true );
					if (array_key_exists('og_object', $body_old)) {
						$count_old = intval($body_old['og_object']['engagement']['count']);
					} else {
						$count_old = 0;
					}
				} else {
					$count_old = 0;
				}
				
				$total = $count + $count_old;
				set_transient( $cache_key, $total, $fbcacheperiod * HOUR_IN_SECONDS );
				return $total;
			} else {
				return $count_total ? $count_total : '0';
			}
		}
	}
}

?>