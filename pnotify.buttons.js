// Buttons
(function($){
	PNotify.prototype.options.buttons = {
		// Provide a button for the user to manually close the notice.
		closer: true,
		// Only show the closer button on hover.
		closer_hover: true,
		// Provide a button for the user to manually stick the notice.
		sticker: true,
		// Only show the sticker button on hover.
		sticker_hover: true,
		// The various displayed text, helps facilitating internationalization.
		buttons_text: {
			close: "Close",
			stick: "Stick"
		}
	};
	PNotify.prototype.modules.buttons = {
		closer: null,
		sticker: null,
		init: function(notice, options){
			var that = this;
			notice.elem.on({
				"mouseenter": function(e){
					// Show the buttons.
					if (options.sticker && !(notice.options.nonblock && notice.options.nonblock.nonblock)) that.sticker.trigger("pnotify_icon").css("visibility", "visible");
					if (options.closer && !(notice.options.nonblock && notice.options.nonblock.nonblock)) that.closer.css("visibility", "visible");
				},
				"mouseleave": function(e){
					// Hide the buttons.
					if (options.sticker_hover)
						that.sticker.css("visibility", "hidden");
					if (options.closer_hover)
						that.closer.css("visibility", "hidden");
				}
			});

			// Provide a button to stick the notice.
			this.sticker = $("<div />", {
				"class": "ui-pnotify-sticker",
				"css": {"cursor": "pointer", "visibility": options.sticker_hover ? "hidden" : "visible"},
				"click": function(){
					notice.options.hide = !notice.options.hide;
					if (notice.options.hide)
						notice.queueRemove();
					else
						notice.cancelRemove();
					$(this).trigger("pnotify_icon");
				}
			})
			.bind("pnotify_icon", function(){
				$(this).children().removeClass(notice.styles.pin_up+" "+notice.styles.pin_down).addClass(notice.options.hide ? notice.styles.pin_up : notice.styles.pin_down);
			})
			.append($("<span />", {"class": notice.styles.pin_up, "title": options.buttons_text.stick}))
			.prependTo(notice.container);
			if (!options.sticker || (notice.options.nonblock && notice.options.nonblock.nonblock))
				this.sticker.css("display", "none");

			// Provide a button to close the notice.
			this.closer = $("<div />", {
				"class": "ui-pnotify-closer",
				"css": {"cursor": "pointer", "visibility": options.closer_hover ? "hidden" : "visible"},
				"click": function(){
					notice.remove(false);
					that.sticker.css("visibility", "hidden");
					that.closer.css("visibility", "hidden");
				}
			})
			.append($("<span />", {"class": notice.styles.closer, "title": options.buttons_text.close}))
			.prependTo(notice.container);
			if (!options.closer || (notice.options.nonblock && notice.options.nonblock.nonblock))
				this.closer.css("display", "none");
		},
		update: function(notice, options, oldOpts){
			// Update the sticker and closer buttons.
			if (!options.closer || (notice.options.nonblock && notice.options.nonblock.nonblock))
				this.closer.css("display", "none");
			else
				this.closer.css("display", "block");
			if (!options.sticker || (notice.options.nonblock && notice.options.nonblock.nonblock))
				this.sticker.css("display", "none");
			else
				this.sticker.css("display", "block");
			// Update the sticker icon.
			this.sticker.trigger("pnotify_icon");
			// Update the hover status of the buttons.
			if (options.sticker_hover)
				this.sticker.css("visibility", "hidden");
			else if (!options.nonblock)
				this.sticker.css("visibility", "visible");
			if (options.closer_hover)
				this.closer.css("visibility", "hidden");
			else if (!options.nonblock)
				this.closer.css("visibility", "visible");
		},
		beforeOpen: function(notice, options){

		},
		afterOpen: function(notice, options){

		},
		beforeClose: function(notice, options){

		},
		afterClose: function(notice, options){

		},
		beforeDestroy: function(notice, options){

		},
		afterDestroy: function(notice, options){

		}
	};
	$.extend(PNotify.styling.jqueryui, {
		closer: "ui-icon ui-icon-close",
		pin_up: "ui-icon ui-icon-pin-w",
		pin_down: "ui-icon ui-icon-pin-s"
	});
	$.extend(PNotify.styling.bootstrap, {
		closer: "icon-remove",
		pin_up: "icon-pause",
		pin_down: "icon-play"
	});
	$.extend(PNotify.styling.bootstrap3, {
		closer: "glyphicon glyphicon-remove",
		pin_up: "glyphicon glyphicon-pause",
		pin_down: "glyphicon glyphicon-play"
	});
	$.extend(PNotify.styling.fontawesome, {
		closer: "fa fa-times",
		pin_up: "fa fa-pause",
		pin_down: "fa fa-play"
	});
})(jQuery);