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
    width: 500,  // pixels
    height: 300, // pixels
    delay: 5000, // milliseconds before the next slide will be loaded
    speed: 2000, // milliseconds transitioning from one slide to the next
    slides: [
      {
        title: 'Test Slide #1',
        body: 'Example body text',
        bg_color: '#ccc',
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
    this.init();
  }

  RobSlide.prototype.init = function () {
    var that = this;
    $(this.element).append('<div id="robslide-foreground"/>'); // TODO: is there a way of doing the following 4 lines (inclusive) in 2?
    $(this.element).append('<div id="robslide-background"/>');
    var background_element = $(this.element).find('#robslide-background');
    var foreground_element = $(this.element).find('#robslide-foreground');
    var interval_id = -1; // initialized to something invalid
    var current_slide_id = 0; // initialized to the first slide in the list
    var next_slide_id = 1;
    var slide_count = this.options.slides.length;

    create_containers();
    // load_data();
    // load_images();
    configure_containers();
    start();

    console.log("robslide initialized");


    // Helper methods
    // --------------

    function stop () {
      clearInterval(interval_id);
      console.log("robslide stopped");
    };

    function start () {
      interval_id = setInterval(switch_slides, that.options.delay); // TODO: is there a better alternative than setInterval?
      console.log("robslide started");
    };

    function create_containers () {
      background_element.append('<h2 class="robslide-title"/>');
      background_element.append('<div class="robslide-body"/>');
      background_element.append('<a class="robslide-link"/>');
      foreground_element.append('<h2 class="robslide-title"/>');
      foreground_element.append('<div class="robslide-body"/>');
      foreground_element.append('<a class="robslide-link"/>');

      console.log("robslide containers created");
    };

    function configure_containers () {
      // Attach main slideshow class to main container.
      $(that.element).addClass('robslide');

      // Set CSS positioning so background and foreground overlap
      $(that.element).css('position', 'relative');
      background_element.css('position', 'absolute');
      background_element.css('top', 0);
      background_element.css('left', 0);
      background_element.css('z-index', 1);
      foreground_element.css('position', 'absolute');
      foreground_element.css('top', 0);
      foreground_element.css('left', 0);
      foreground_element.css('z-index', 2);

      // Set slideshow height and width
      background_element.css('width',  that.options.width);
      background_element.css('height', that.options.height);
      foreground_element.css('width',  that.options.width);
      foreground_element.css('height', that.options.height);
      load_slide(foreground_element, that.options.slides[0]);
      load_slide(background_element, that.options.slides[1]); // the background is set to slide #2 (so the foreground slide #1 will fade into the background, switching to the 'next' slide)

      console.log("robslide containers configured");
    };

    function load_data () {
      console.log("robslide data loaded");
    };

    function load_images () {
      var stuff = "";
      for (var i = 0; i < that.slide_count; i += 1) {
        stuff += ", " + that.options.slides[i].image_url;
      }
      console.log("robslide images loaded");
    };

    function load_slide (el, data) {
      // Title
      el.find('h2.robslide-title').html(data.title);

      // Body
      el.find('div.robslide-body').html(data.body);

      // Link / Button
      if (data.link_label !== '' && data.link_url !== '') { // Only show the link/button if data is available for it.
        el.find('a.robslide-link').html(data.link_label);
        el.find('a.robslide-link').attr('href', data.link_url);
      } else { // Hide the link/button if there's no data for it.
        el.find('a.robslide-link').hide();
      }

      // Background Color
      if (data.bg_color !== '') {
        el.css('background-color', data.bg_color);
      }

      // Background Image
      if (data.image_url !== '') {
        el.css('background-image', "url('" + data.image_url + "')");
        el.css('background-repeat', 'no-repeat');
        el.css('background-position', '0 0');
      }
    };

    // Change foreground revealing background, move bg to fg, turn fg back on, and load next slide into bg (then repeat)
    function switch_slides () {
      // Animate to next slide by facing opacity of foreground from 100% to 0%
      foreground_element.animate({ opacity: 0 }, that.options.speed, function () {
        load_slide(foreground_element, that.options.slides[current_slide_id]);
        foreground_element.css('opacity', 1); // turn foreground on full opacity
        load_slide(background_element, that.options.slides[next_slide_id]); // load next slide into background
      });

      // Update slide_id's
      current_slide_id += 1; //next_slide_id - 1;
      if (current_slide_id >= slide_count) {
        current_slide_id = 0;
      }
      next_slide_id = current_slide_id + 1;
      if (next_slide_id >= slide_count) {
        next_slide_id = 0;
      }
    };

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
