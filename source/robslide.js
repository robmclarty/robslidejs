/*!
 * robslidejs
 *
 * A not-so-advanced jQuery slider.
 *
 * Original author: @robmclarty
 * Further changes, comments: @robmclarty
 * Licensed under the MIT license
 *
 * Started with "jquery.basic.plugin-boilerplate.js"
 * from https://github.com/zenorocha/jquery-plugin-patterns
 */

;(function ($, window, document, undefined) {

  var plugin_name = 'robslide';
  var defaults = {
    delay: 5000,
    transition_delay: 2000,
    slides: [
      {
        title: 'Test Slide #1',
        body: 'Example body text',
        bg_color: '#333',
        image_url: 'aaaaaaaaa',
        link_label: 'Test Button',
        link_url: 'http://testlocation.com'
      },
      {
        title: 'Test Slide #2',
        body: 'More body text',
        bg_color: '#999',
        image_url: 'bbbbbbbbb',
        link_label: 'Test Button',
        link_url: 'http://testlocation.com'
      }
    ]
  };

  function RobSlide(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this.defaults = defaults;
    this.name = plugin_name;
    this.slide_count = this.options.slides.length;
    this.init();
  }

  RobSlide.prototype.init = function () {
    console.log("robslide initialized");
    // create_containers();
    // load_data();
    // load_images();
    // init_containers();
    //start_slideshow();
    //this.setInterval(switch_slides, this.options.delay);
  };

  // <div id='homepage-slideshow-foreground' style="background: url('/system/images/something.png') center 0 no-repeat;">
  //   <h2 class='homepage-slideshow-title'>Another Slide</h2>
  //   <div class='homepage-slideshow-content'>
  //     <p>Some text as an example of a description.</p>
  //   </div>
  //   <a href="" class="homepage-slideshow-button button secondary">Test Button</a>
  // </div>
  var create_containers = function () {
    var background_slide = this.element.append('<div id="robslide-background"/>');
    var foreground_slide = this.element.append('<div id="robslide-foreground"/>');
    background_slide.append('<h2 class="robslide-title"/>');
    background_slide.append('<div class="robslide-body"/>');
    background_slide.append('<a class="robslide-link"/>');
    foreground_slide.append('<h2 class="robslide-title"/>');
    foreground_slide.append('<div class="robslide-body"/>');
    foreground_slide.append('<a class="robslide-link"/>');
  };

  var load_data = function () {

  };

  var load_images = function () {
    var stuff = "";
    for (var i = 0; i < this.slide_count; i += 1) {
      stuff += ", " + this.options.slides[i].image_url;
    }
    alert(stuff);
  };

  var init_containers = function () {

  };

  // var start_slideshow = function () {
  //   this.setInterval(switch_slides, this._defaults.delay);
  // };

  var switch_slides = function () {

  };

  // A really lightweight plugin wrapper around the constructor, 
  // preventing against multiple instantiations
  $.fn[plugin_name] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + plugin_name)) {
        $.data(this, 'plugin_' + plugin_name, new RobSlide(this, options));
      }
    });
  }

})(jQuery, window, document);