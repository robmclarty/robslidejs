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
    var that = this;
    create_containers();
    // load_data();
    // load_images();
    configure_containers();
    console.log("robslide initialized");

    function create_containers () {
      that.background_element.append('<h2 class="robslide-title"/>');
      that.background_element.append('<div class="robslide-body"/>');
      that.background_element.append('<a class="robslide-link"/>');
      that.foreground_element.append('<h2 class="robslide-title"/>');
      that.foreground_element.append('<div class="robslide-body"/>');
      that.foreground_element.append('<a class="robslide-link"/>');

      console.log("robslide containers created");
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

    function configure_containers () {
      // Set CSS positioning so background and foreground overlap
      $(that.element).css('position', 'relative');
      that.background_element.css('position', 'absolute');
      that.background_element.css('top', 0);
      that.background_element.css('left', 0);
      that.foreground_element.css('position', 'absolute');
      that.foreground_element.css('top', 0);
      that.foreground_element.css('left', 0);

      // Set slideshow height and width
      that.background_element.css('width', that.options.width);
      that.background_element.css('height', that.options.height);
      that.foreground_element.css('width', that.options.width);
      that.foreground_element.css('height', that.options.height);
      load_slide(that.background_element, that.options.slides[0]);
      load_slide(that.foreground_element, that.options.slides[1]);

      console.log("robslide containers configured");
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

    // var start_slideshow = function () {
    //   this.setInterval(switch_slides, this._defaults.delay);
    //   console.log("robslide started");
    // };

    function switch_slides () {

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
