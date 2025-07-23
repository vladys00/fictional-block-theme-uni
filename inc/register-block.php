<?php

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
//new PlaceholderBlock('footer');
new PlaceholderBlock('singlepost');
new PlaceholderBlock('page');
new PlaceholderBlock('blogindex');
new PlaceholderBlock('programarchive');
new PlaceholderBlock('singleprogram');
new PlaceholderBlock('singleprofessor');
new PlaceholderBlock('archiveevent');
new PlaceholderBlock('singleevent');
new PlaceholderBlock('archivecampus');
new PlaceholderBlock('singlecampus');
new PlaceholderBlock('archive');
new PlaceholderBlock('pastevents');
new PlaceholderBlock('mynotes');
new PlaceholderBlock('search');
new PlaceholderBlock('searchresults');



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
new JSXBLock('slide', true);

?>