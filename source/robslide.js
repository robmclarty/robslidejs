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
    //this.configure_containers();
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
    var first_slide = this.options.slides[0];
    var second_slide = this.options.slides[1]; // TODO: This is assuming there actually are two slides; make this more generic with sensible fallbacks.

    // First Slide
    $('#robslide-background').find('h2.robslide-title').html(first_slide.title);
    $('#robslide-background').find('div.robslide-body').html(first_slide.body);
    if (first_slide.link_label !== '' && first_slide.link_url !== '') { // Link / Button
      // Only show the link/button if data is available for it.
      $('#robslide-background').find('a.robslide-link').html(first_slide.link_label);
      $('#robslide-background').find('a.robslide-link').attr('href', first_slide.link_url);
    } else {
      // Hide the link/button if there's no data for it.
      $('#robslide-background').find('a.robslide-link').hide();
    }
    if (first_slide.bg_color !== '') { // Background Color
      $('#robslide-background').css('background-color', first_slide.bg_color);
    }
    if (first_slide.image_url !== '') { // Background Image
      $('#robslide-background').css('background-image', "url('" + first_slide.image_url + "')");
      $('#robslide-background').css('background-repeat', 'no-repeat');
      $('#robslide-background').css('background-position', '0 0');
    }

    // Second Slide
    $('#robslide-foreground').find('h2.robslide-title').html(first_slide.title);
    $('#robslide-foreground').find('div.robslide-body').html(first_slide.body);
    if (first_slide.link_label !== '' && first_slide.link_url !== '') { // Link / Button
      // Only show the link/button if data is available for it.
      $('#robslide-foreground').find('a.robslide-link').html(first_slide.link_label);
      $('#robslide-foreground').find('a.robslide-link').attr('href', first_slide.link_url);
    } else {
      // Hide the link/button if there's no data for it.
      $('#robslide-foreground').find('a.robslide-link').hide();
    }
    if (first_slide.bg_color !== '') { // Background Color
      $('#robslide-foreground').css('background-color', first_slide.bg_color);
    }
    if (first_slide.image_url !== '') { // Background Image
      $('#robslide-foreground').css('background-image', "url('" + first_slide.image_url + "')");
      $('#robslide-foreground').css('background-repeat', 'no-repeat');
      $('#robslide-foreground').css('background-position', '0 0');
    }
    
    // TODO: A lot of these elements are being called through jQuery's selector syntax over and over; find a more efficient way of doing this.
    console.log("robslide containers configured");
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
