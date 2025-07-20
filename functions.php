<?php
require get_theme_file_path('/inc/search-route.php');
require get_theme_file_path('/inc/page-banner.php');
require get_theme_file_path('/inc/adjust-events-query.php');
require get_theme_file_path('/inc/mapsAPI-setup.php');

if (file_exists(__DIR__ . '/.env')) {
    $lines = file(__DIR__ . '/.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($name, $value) = explode('=', $line, 2);
        putenv(trim($name) . '=' . trim($value));
     }
}

function university_files() {
    wp_enqueue_script('googleMap', '//maps.googleapis.com/maps/api/js?key='.getenv('GOOGLE_MAPS_API_KEY'), NULL, '1.0', true);
    wp_enqueue_script('main-university-js', get_theme_file_uri('/build/index.js'), array('jquery'), '1.0', true);
    wp_enqueue_style('roboto-font', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
    wp_enqueue_style('font-awesome','//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
    wp_enqueue_style('university-main-styles', get_theme_file_uri('/build/style-index.css'));
    wp_enqueue_style('university-extra-styles', get_theme_file_uri('/build/index.css'));

    wp_localize_script('main-university-js', 'universityData', array(
        'root_url' => get_site_url()
    ));
}

add_action('wp_enqueue_scripts', 'university_files');

function university_features() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_image_size('professorLandscape', 400, 260, true);
    add_image_size('professorPortrait', 480, 650, true);
    add_image_size('pageBanner', 1500, 350, true);
    add_theme_support('editor-styles');
    add_editor_style(array('https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i','build/style-index.css', 'build/index.css'));

}

add_action('after_setup_theme', 'university_features');

//customize login screen

add_filter('login_headerurl','ourHeaderUrl');

function ourHeaderUrl(){
    return esc_url(site_url());
}

add_action('login_enqueue_scripts','ourLoginCSS');

function ourLoginCSS() {
    wp_enqueue_style('roboto-font', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
    wp_enqueue_style('font-awesome','//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
    wp_enqueue_style('university-main-styles', get_theme_file_uri('/build/style-index.css'));
    wp_enqueue_style('university-extra-styles', get_theme_file_uri('/build/index.css'));
}

add_filter('login_headertitle','ourLoginTitle'); 

function ourLoginTitle(){
    return get_bloginfo('name');
}

// function bannerBlock(){
//     wp_register_script('bannerBlockScript', get_stylesheet_directory_uri(). '/build/banner.js',array('wp-blocks', 'wp-editor'));
//     register_block_type("ourblocktheme/banner", array(
//         'editor_script' => 'bannerBlockScript',
//     ));
// }
// add_action('init', 'bannerBlock');
// THIS FROM ABOVE IS THE SAME AS BELOW, BUT IN THE CLASS FORM

class PlaceholderBlock {
    function __construct($name) {
        $this->name = $name;
        add_action('init', [$this, 'onInit']);
    }

    function ourRenderCallback($attributes, $content) {
        ob_start();
        require get_theme_file_path("/our-blocks/{$this->name}.php");
        return ob_get_clean();
    }

    function onInit() {
            wp_register_script($this->name , get_stylesheet_directory_uri(). "/our-blocks/{$this->name}.js",array('wp-blocks', 'wp-editor'));

            register_block_type("ourblocktheme/{$this->name}", array(
            'editor_script' => $this->name,
            'render_callback' => [$this, 'ourRenderCallback'],
            ));           
    }
}

new PlaceholderBlock('eventsandblogs');
new PlaceholderBlock('header');
new PlaceholderBlock('footer');

class JSXBLock {
    function __construct($name, $renderCallback = null, $data = null) {
        $this->name = $name;
        $this->renderCallback = $renderCallback;
        $this->data = $data;
        add_action('init', [$this, 'onInit']);
    }

    function ourRenderCallback($attributes, $content) {
        ob_start();
        require get_theme_file_path("/our-blocks/{$this->name}.php");
        return ob_get_clean();
    }

    function onInit() {
            wp_register_script($this->name , get_stylesheet_directory_uri(). "/build/{$this->name}.js",array('wp-blocks', 'wp-editor'));
            
            if ($this->data) {
                wp_localize_script($this->name, $this->name, $this->data);
            }

            $ourArgs = array(
            'editor_script' => $this->name,
            );

            if ($this->renderCallback) {
                $ourArgs['render_callback'] = [$this, 'ourRenderCallback'];
            }
            
            register_block_type("ourblocktheme/{$this->name}", $ourArgs);           
    }
}

new JSXBLock('banner', true, ['fallbackimage' => get_theme_file_uri('/images/library-hero.jpg')]);
new JSXBLock('genericheading');
new JSXBLock('genericbutton');
new JSXBLock('slideshow', true);