<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          '>8d5v6V5Yf^U,5oYEgm~_D %H%=n&7MH@c{f$_-&>HRs^Qyq?y|xgAHO*hf%M&>c' );
define( 'SECURE_AUTH_KEY',   '@qqwb_QnM^A:3Bawua@@r!S*/8@G-0IJ<A(FR:?1wvzFL7Nwl*iO@XTVrtJE4.RY' );
define( 'LOGGED_IN_KEY',     ':{BdL)l0gkV@k*c:EgyiL/c_[.V?;F7v7XQC_+]vTNyM#uAC_GOo3#!eAeQfmVZ$' );
define( 'NONCE_KEY',         '!qWLagwNd8`k)Z,KRqj^Z<X`cpIa]]&2NGYl`j@Xz!UUoLOfgCne:*!.s5&(Q,<Y' );
define( 'AUTH_SALT',         'ii1p#bl8.S$w=u?-={KigGR.a5A*GSJN8+Z/I@5M2,?7YM5+x}Suc-x8~[6&12 f' );
define( 'SECURE_AUTH_SALT',  '9^k.id++5_ApUR2o*#CQC&G0E_W-8+5lbYFg12oiF<Oj{(vi Dd3OqRzP syChlV' );
define( 'LOGGED_IN_SALT',    'V=}WkEU]yVw BFq46io7Fl[445OL3EL-nY};peKbR*~ve+tunqZ.-PTN!-:Av%8n' );
define( 'NONCE_SALT',        'G49/[x!4=Rn%j%r&Rv*0E|_-|Zc=WV7VApSnGb.a+D4U=e,?U5%G#5.,f;i^4b#[' );
define( 'WP_CACHE_KEY_SALT', '{5u6rVHE)]zb9AynC> [hf<1SGuK>0^}*I~62o;D^5wvV,+{PB<(tLRIfJ$KwnT[' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'WP_ENVIRONMENT_TYPE', 'local' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
