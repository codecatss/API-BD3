var Alert = undefined;

(function(Alert) {
  var alert, error, trash, info, success, warning, _container;
  info = function(message, title, options) {
    return alert("info", message, title, "fa fa-info-circle", options);
  };
  warning = function(message, title, options) {
    return alert("warning", message, title, "fa-solid fa-circle-exclamation", options);
  };
  error = function(message, title, options) {
    return alert("error", message, title, "fa fa-exclamation-circle", options);
  };

  trash = function(message, title, options) {
    return alert("trash", message, title, "fa fa-trash-o", options);
  };

  success = function(message, title, options) {
    return alert("success", message, title, "fa fa-check-circle", options);
  };
  alert = function(type, message, title, icon, options) {
    var alertElem, messageElem, titleElem, iconElem, innerElem, _container;
    if (typeof options === "undefined") {
      options = {};
    }
    options = $.extend({}, Alert.defaults, options);
    if (!_container) {
      _container = $("#alerts");
      if (_container.length === 0) {
        _container = $("<ul>").attr("id", "alerts").appendTo($("body"));
      }
    }
    if (options.width) {
      _container.css({
        width: options.width
      });
    }
    alertElem = $("<li>").addClass("alert").addClass("alert-" + type);
    setTimeout(function() {
      alertElem.addClass('open');
    }, 1);
    if (icon) {
      iconElem = $("<i>").addClass(icon);
      alertElem.append(iconElem);
    }
    innerElem = $("<div>").addClass("alert-block");
    //innerElem = $("<i>").addClass("fa fa-times");
    alertElem.append(innerElem);
    if (title) {
      titleElem = $("<div>").addClass("alert-title").append(title);
      innerElem.append(titleElem);
      
    }
    if (message) {
      messageElem = $("<div>").addClass("alert-message").append(message);
      //innerElem.append("<i class="fa fa-times"></i>");
      innerElem.append(messageElem);
      //innerElem.append("<em>Click to Dismiss</em>");
//      innerElemc = $("<i>").addClass("fa fa-times");

    }
    if (options.displayDuration > 0) {
      setTimeout((function() {
        leave();
      }), options.displayDuration);
    } else {
      innerElem.append("<em>Click to Dismiss</em>");
    }
    alertElem.on("click", function() {
      leave();
    });

    function leave() {
      alertElem.removeClass('open');
      alertElem.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
        return alertElem.remove();
      });
    }
    return _container.prepend(alertElem);
  };
  Alert.defaults = {
    width: "",
    icon: "",
    displayDuration: 3000,
    pos: ""
  };
  Alert.info = info;
  Alert.warning = warning;
  Alert.error = error;
  Alert.trash = trash;
  Alert.success = success;
  return _container = void 0;

})(Alert || (Alert = {}));

this.Alert = Alert;

// $('#test').on('click', function() {
//   Alert.info('Message');
// });