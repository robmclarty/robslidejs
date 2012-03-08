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
    width: 500,
    height: 300,
    delay: 5000,
    transition: 2000,
    slides: [
      {
        title: 'Test Slide #1',
        body: 'Example body text',
        bg_color: '#333',
        image_url: '',
        link_label: 'Test Button',
        link_url: 'http://testlocation.com'
      },
      {
        title: 'Test Slide #2',
        body: 'More body text',
        bg_color: '#999',
        image_url: '',
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
    $(this.element).append('<div id="robslide-background"/>');
    $(this.element).append('<div id="robslide-foreground"/>');
    this.background_element = $(this.element).find('#robslide-background');
    this.foreground_element = $(this.element).find('#robslide-foreground');
    this.init();
  }

  RobSlide.prototype.init = function () {
    this.create_containers();
    // load_data();
    // load_images();
    this.configure_containers();
    //start_slideshow();
    //this.setInterval(switch_slides, this.options.delay);
    console.log("robslide initialized");
  };

  // <div id='homepage-slideshow-foreground' style="background: url('/system/images/something.png') center 0 no-repeat;">
  //   <h2 class='homepage-slideshow-title'>Another Slide</h2>
  //   <div class='homepage-slideshow-content'>
  //     <p>Some text as an example of a description.</p>
  //   </div>
  //   <a href="" class="homepage-slideshow-button button secondary">Test Button</a>
  // </div>
  RobSlide.prototype.create_containers = function () {
    this.background_element.append('<h2 class="robslide-title"/>');
    this.background_element.append('<div class="robslide-body"/>');
    this.background_element.append('<a class="robslide-link"/>');
    this.foreground_element.append('<h2 class="robslide-title"/>');
    this.foreground_element.append('<div class="robslide-body"/>');
    this.foreground_element.append('<a class="robslide-link"/>');
    console.log("robslide containers created");
  };

  RobSlide.prototype.load_data = function () {
    console.log("robslide data loaded");
  };

  RobSlide.prototype.load_images = function () {
    var stuff = "";
    for (var i = 0; i < this.slide_count; i += 1) {
      stuff += ", " + this.options.slides[i].image_url;
    }
    console.log("robslide images loaded");
  };

  RobSlide.prototype.configure_containers = function () {
    this.background_element.css('width', this.options.width);
    this.background_element.css('height', this.options.height);
    this.foreground_element.css('width', this.options.width);
    this.foreground_element.css('height', this.options.height);
    this.load_slide(this.background_element, this.options.slides[0]);
    this.load_slide(this.foreground_element, this.options.slides[1]);
    console.log("robslide containers configured");
  };

  RobSlide.prototype.load_slide = function (element, data) {
    // Title
    element.find('h2.robslide-title').html(data.title);

    // Body
    element.find('div.robslide-body').html(data.body);

    // Link / Button
    if (data.link_label !== '' && data.link_url !== '') { // Only show the link/button if data is available for it.
      element.find('a.robslide-link').html(data.link_label);
      element.find('a.robslide-link').attr('href', data.link_url);
    } else { // Hide the link/button if there's no data for it.
      element.find('a.robslide-link').hide();
    }

    // Background Color
    if (data.bg_color !== '') {
      element.css('background-color', data.bg_color);
    }

    // Background Image
    if (data.image_url !== '') {
      element.css('background-image', "url('" + data.image_url + "')");
      element.css('background-repeat', 'no-repeat');
      element.css('background-position', '0 0');
    }
  };

  // var start_slideshow = function () {
  //   this.setInterval(switch_slides, this._defaults.delay);
  //   console.log("robslide started");
  // };

  RobSlide.prototype.switch_slides = function () {

  };

  // A really lightweight plugin wrapper around the constructor, preventing against multiple instantiations.
  $.fn[plugin_name] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + plugin_name)) {
        $.data(this, 'plugin_' + plugin_name, new RobSlide(this, options));
      }
    });
  }

})(jQuery, window, document);
