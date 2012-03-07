/*!
 * robslidejs
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
    propertyName: "value"
  };

  function Plugin(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options) ;

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  Plugin.prototype.init = function () {

  };

  // A really lightweight plugin wrapper around the constructor, 
  // preventing against multiple instantiations
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
  }

})(jQuery, window, document);