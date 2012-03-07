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

  var pluginName = 'robslide';
  var defaults = {
    delay: 5000,
    transition_delay: 2000,
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
    this.options = $.extend({}, defaults, options) ;

    this._defaults = defaults;
    this._name = pluginName;
    this._background = this.element.append('<div id="' + pluginName + 'background"/>');
    this._foreground = this.element.append('<div id="' + pluginName + 'foreground"/>');
    this._slide_count = this._defaults.slides.length;
    
    // <div id='homepage-slideshow-foreground' style="background: url('/system/images/something.png') center 0 no-repeat;">
    //   <h2 class='homepage-slideshow-title'>Another Slide</h2>
    //   <div class='homepage-slideshow-content'>
    //     <p>Some text as an example of a description.</p>
    //   </div>
    //   <a href="" class="homepage-slideshow-button button secondary">Test Button</a>
    // </div>

    this.init();
  }

  RobSlide.prototype.init = function () {

  };

  // A really lightweight plugin wrapper around the constructor, 
  // preventing against multiple instantiations
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new RobSlide(this, options));
      }
    });
  }

})(jQuery, window, document);