# Timeline Express - Date - Time Add-On #
![Banner Image](wp-org-assets/banner-772x250.jpg)

**Contributors:** [codeparrots](https://profiles.wordpress.org/codeparrots), [eherman24](https://profiles.wordpress.org/eherman24)  
**Tags:** [timeline](https://wordpress.org/plugins/tags/timeline/), [express](https://wordpress.org/plugins/tags/express/), [addon](https://wordpress.org/plugins/tags/addon/), [add-on](https://wordpress.org/plugins/tags/add-on/), [date](https://wordpress.org/plugins/tags/date/), [timepicker](https://wordpress.org/plugins/tags/timepicker/), [announcement](https://wordpress.org/plugins/tags/announcement/)  
**Plugin URI:** https://www.wp-timelineexpress.com  
**Requires at least:** WP 4.0 & Timeline Express 1.2  
**Tested up to:** 4.9  
**Stable tag:** 0.0.9  
**License:** GPLv2 or later  

Assign and display times alongside the announcement dates in Timeline Express announcements.

[![Build Status](https://travis-ci.org/.svg?branch=master)](https://travis-ci.org/) [![License](https://img.shields.io/badge/license-GPL--2.0-brightgreen.svg)](https://github.com//blob/master/license.txt) [![PHP 7.0](https://img.shields.io/badge/php-7-8892bf.svg)](https://secure.php.net/supported-versions.php) [![WordPress plugin](https://img.shields.io/wordpress/plugin/v/timeline-express-date-time-add-on.svg)](https://wordpress.org/plugins/timeline-express-date-time-add-on/) [![WordPress](https://img.shields.io/wordpress/v/timeline-express-date-time-add-on.svg)](https://img.shields.io/wordpress/v/timeline-express-date-time-add-on.svg) [![WordPress](https://img.shields.io/wordpress/plugin/dt/timeline-express-date-time-add-on.svg)](https://wordpress.org/plugins/timeline-express-date-time-add-on/)  

## Description ##

When active, the Timeline Express - Date - Time Add-On will hide the default announcement date field, and generate a date and time field for you to use.

Multiple announcements that have the same date & time will fallback to use the published date to dictate order on the timeline.

## Installation ##
1. Upload the entire `timeline-express-date-time-add-on` folder to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. If you previously had announcements setup, follow the migration steps.
4. Create a new announcement set a date & time and set the date format for each announcement.

## Frequently Asked Questions ##

### What if multiple announcements have the same dates? ###
If multiple announcements use the same date and time, then the announcement 'published' date will be used to dictate the order. The published date can be adjusted just above the 'Publish' button in the right hand sidebar on the announcement creation/edit screen in the dashboard.

### Can I set the display format? I don't want to display the time on some announcements. ###
Yes! For each announcement you have the ability to choose how the dates are displayed. Out of the box you can display the dates in the following formats:

- Full Date (ie: 02/10/2018 1:00 PM)
- Year Only (ie: 2018)
- Date Only (ie: 02/10/2018)
- Time Only (ie: 1:00 PM)

## Screenshots ##
1. Announcement Date & Time Selector
2. Front End Date & Time on the Timeline

## Changelog ##

### 1.0.0 - February xx, 2018 ###
* Initial release.

## Developers ##

Filters:
`timeline_express_date_time_formats` - Add your own date formats to the announcement.

**Example:**
<pre>
/**
 * Assign a custom date format to the announcements.
 *
 * @param array $date_formats The original date formats array.
 */
function timeline_express_demo_custom_date_format( $date_formats ) {

	$date_formats['custom'] = 'Y-m-d'; // eg: 2018-10-02

}
add_filter( 'timeline_express_date_time_formats', 'timeline_express_demo_custom_date_format' );
</pre>

`timeline_express_date_time_query_args` - Filter the query run for the date time add-on.

**Example:**
<pre>
/**
 * Filter the announcement date time add-on query.
 * Fall back to post titles instead of published date when announcements contain the same date-time values.
 *
 * @param array $query_args The original date time add-on query arguments.
 */
function timeline_express_demo_filter_query_args( $query_args ) {

	unset( $query_args['orderby'] );

	$query_args['orderby'] = 'meta_value_num title';

	return $query_args;

}
add_filter( 'timeline_express_date_time_query_args', 'timeline_express_demo_filter_query_args' );
</pre>
