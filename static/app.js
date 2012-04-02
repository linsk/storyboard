// @PLUGIN Captures touch events on mobile devices to reduce delay.
jQuery.event.special.tap = {
    setup: function (a, b) {
        var c = this,
            d = jQuery(c);
        if (window.Touch) {
            d.bind("touchstart", jQuery.event.special.tap.onTouchStart);
            d.bind("touchmove", jQuery.event.special.tap.onTouchMove);
            d.bind("touchend", jQuery.event.special.tap.onTouchEnd)
        } else {
            d.bind("click", jQuery.event.special.tap.click)
        }
    },
    click: function (a) {
        a.type = "tap";
        jQuery.event.handle.apply(this, arguments)
    },
    teardown: function (a) {
        if (window.Touch) {
            $elem.unbind("touchstart", jQuery.event.special.tap.onTouchStart);
            $elem.unbind("touchmove", jQuery.event.special.tap.onTouchMove);
            $elem.unbind("touchend", jQuery.event.special.tap.onTouchEnd)
        } else {
            $elem.unbind("click", jQuery.event.special.tap.click)
        }
    },
    onTouchStart: function (a) {
        this.moved = false
    },
    onTouchMove: function (a) {
        this.moved = true
    },
    onTouchEnd: function (a) {
        if (!this.moved) {
            a.type = "tap";
            jQuery.event.handle.apply(this, arguments)
        }
    }
};

// @PLUGIN Owl Notifications | http://std.li/07 | Made by me | You are only allowed to use the script in this project
(function ($) {
    $.notification = function (settings) {
       	var con, notification, hide, image, right, left, inner;
        
        settings = $.extend({
        	title: undefined,
        	content: undefined,
            timeout: 0,
            img: undefined,
            border: true,
            fill: false,
            showTime: false,
            click: undefined,
            icon: undefined,
            color: undefined,
            error: false
        }, settings);
        
        con = $("#notifications");
        if (!con.length) {
            con = $("<div>", { id: "notifications" }).appendTo($("#overlays"))
        };
        
		notification = $("<div>");
        notification.addClass("notification animated fadeInLeftMiddle fast");
        
        if(settings.error == true) {
        	notification.addClass("error");
        }
        
        if( $("#notifications .notification").length > 0 ) {
        	notification.addClass("more");
        } else {
        	con.addClass("animated flipInX").delay(1000).queue(function(){ 
        	    con.removeClass("animated flipInX");
        			con.clearQueue();
        	});
        }
        
        hide = $("<div>", {
			click: function () {
				 
				
				if($(this).parent().is(':last-child')) {
				    $(this).parent().remove();
				    $('#notifications .notification:last-child').removeClass("more");
				} else {
					$(this).parent().remove();
				}
			}
		});
		
		hide.addClass("hide");

		left = $("<div class='left'>");
		right = $("<div class='right'>");
		
		if(settings.title != undefined) {
			var htmlTitle = "<h2>" + settings.title + "</h2>";
		} else {
			var htmlTitle = "";
		}
		
		if(settings.content != undefined) {
			var htmlContent = settings.content;
		} else {
			var htmlContent = "";
		}
		
		inner = $("<div>", { html: htmlTitle + htmlContent });
		inner.addClass("inner");
		
		inner.appendTo(right);
		
		if (settings.img != undefined) {
			image = $("<div>", {
				style: "background-image: url('"+settings.img+"')"
			});
		
			image.addClass("img");
			image.appendTo(left);
			
			if(settings.border==false) {
				image.addClass("border")
			}
			
			if(settings.fill==true) {
				image.addClass("fill");
			}
			
		} else {
			if (settings.icon != undefined) {
				var iconType = settings.icon;
			} else {
				if(settings.error!=true) {
					var iconType = '"';
				} else {
					var iconType = '!';
				}
			}	
			icon = $('<div class="icon">').html(iconType);
			
			if (settings.color != undefined) {
				icon.css("color", settings.color);
			}
			
			icon.appendTo(left);
		}

        left.appendTo(notification);
        right.appendTo(notification);
        
        hide.appendTo(notification);
        
        function timeSince(time){
        	var time_formats = [
        	  [2, "One second", "1 second from now"], // 60*2
        	  [60, "seconds", 1], // 60
        	  [120, "One minute", "1 minute from now"], // 60*2
        	  [3600, "minutes", 60], // 60*60, 60
        	  [7200, "One hour", "1 hour from now"], // 60*60*2
        	  [86400, "hours", 3600], // 60*60*24, 60*60
        	  [172800, "One day", "tomorrow"], // 60*60*24*2
        	  [604800, "days", 86400], // 60*60*24*7, 60*60*24
        	  [1209600, "One week", "next week"], // 60*60*24*7*4*2
        	  [2419200, "weeks", 604800], // 60*60*24*7*4, 60*60*24*7
        	  [4838400, "One month", "next month"], // 60*60*24*7*4*2
        	  [29030400, "months", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
        	  [58060800, "One year", "next year"], // 60*60*24*7*4*12*2
        	  [2903040000, "years", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
        	  [5806080000, "One century", "next century"], // 60*60*24*7*4*12*100*2
        	  [58060800000, "centuries", 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
        	];
        	
        	var seconds = (new Date - time) / 1000;
        	var token = "ago", list_choice = 1;
        	if (seconds < 0) {
        		seconds = Math.abs(seconds);
        		token = "from now";
        		list_choice = 1;
        	}
        	var i = 0, format;
        	
        	while (format = time_formats[i++]) if (seconds < format[0]) {
        		if (typeof format[2] == "string")
        			return format[list_choice];
        	    else
        			return Math.floor(seconds / format[2]) + " " + format[1];
        	}
        	return time;
        };
        
        if(settings.showTime != false) {
        	var timestamp = Number(new Date());
        	
        	timeHTML = $("<div>", { html: "<strong>" + timeSince(timestamp) + "</strong> ago" });
        	timeHTML.addClass("time").attr("title", timestamp);
        	timeHTML.appendTo(right);
        	
        	setInterval(
	        	function() {
	        		$(".time").each(function () {
	        			var timing = $(this).attr("title");
	        			$(this).html("<strong>" + timeSince(timing) + "</strong> ago");
	        		});
	        	}, 4000)
        	
        }

        notification.hover(
        	function () {
            	hide.show();
        	}, 
        	function () {
        		hide.hide();
        	}
        );
        
        notification.prependTo(con);
		notification.show();

        if (settings.timeout) {
            setTimeout(function () {
            	var prev = notification.prev();
            	if(prev.hasClass("more")) {
            		if(prev.is(":first-child") || notification.is(":last-child")) {
            			prev.removeClass("more");
            		}
            	}
	        	notification.remove();
            }, settings.timeout)
        }
        
        if (settings.click != undefined) {
        	notification.addClass("click");
            notification.bind("click", function (event) {
            	var target = $(event.target);
                if(!target.is(".hide") ) {
                    settings.click.call(this)
                }
            })
        }
        return this
    }
})(jQuery);

// @PLUGIN Date picker by Gautam Lad - http://std.li/mD
(function($)
{
	var defaults =
	{
		calId: 0,
		cssName: "default",
		startDate: -1,
		endDate: -1,
		selectedDate: -1,
		showPrevNext: true,
		allowOld: true,
		showAlways: false,
		position: "absolute"
	};

	var methods =
	{
		init: function(options)
		{
			return this.each(function()
			{
				var self = $(this);
				var settings = $.extend({}, defaults);

				// Save the settings and id
				settings.calId = self[0].id+"-gldp";
				if(options) { settings = $.extend(settings, options); }
				self.data("settings", settings);

				// Bind click and focus event to show
				self
					.click(methods.show)
					.focus(methods.show);

				// If always showing, trigger click causing it to show
				if(settings.showAlways)
				{
					setTimeout(function() { self.trigger("focus"); }, 50);
				}

				// Bind click elsewhere to hide
				$(document).bind("click", function(e)
				{
					methods.hide.apply(self);
				});
			});
		},

		// Show the calendar
		show: function(e)
		{
			e.stopPropagation();

			// Instead of catching blur we'll find anything that's made visible
			methods.hide.apply($("._gldp").not($(this)));

			methods.update.apply($(this));
		},

		// Hide the calendar
		hide: function()
		{
			if($(this).length)
			{
				var s = $(this).data("settings");

				// Hide if not showing always
				if(!s.showAlways)
				{
					// Hide the calendar and remove class from target
					$("#"+s.calId).hide();
					$(this).removeClass("_gldp");
				}
			}
		},

		// Set a new start date
		setStartDate: function(e)
		{
			$(this).data("settings").startDate = e;
		},

		// Set a new end date
		setEndDate: function(e)
		{
			$(this).data("settings").endDate = e;
		},

		// Set a new selected date
		setSelectedDate: function(e)
		{
			$(this).data("settings").selectedDate = e;
		},

		// Render the calendar
		update:function()
		{
			var target = $(this);
			var settings = target.data("settings");

			// Get the calendar id
			var calId = settings.calId;

			// Get the starting date
			var startDate = settings.startDate;
			if(settings.startDate == -1)
			{
				startDate = new Date();
				startDate.setDate(1);
			}
			startDate.setHours(0,0,0,0);
			var startTime = startDate.getTime();

			// Get the end date
			var endDate = new Date(0);
			if(settings.endDate != -1)
			{
				endDate = new Date(settings.endDate);
				if((/^\d+$/).test(settings.endDate))
				{
					endDate = new Date(startDate);
					endDate.setDate(endDate.getDate()+settings.endDate);
				}
			}
			endDate.setHours(0,0,0,0);
			var endTime = endDate.getTime();

			// Get the selected date
			var selectedDate = new Date(0);
			if(settings.selectedDate != -1)
			{
				selectedDate = new Date(settings.selectedDate);
				if((/^\d+$/).test(settings.selectedDate))
				{
					selectedDate = new Date(startDate);
					selectedDate.setDate(selectedDate.getDate()+settings.selectedDate);
				}
			}
			selectedDate.setHours(0,0,0,0);
			var selectedTime = selectedDate.getTime();

			// Get the current date to render
			var theDate = target.data("theDate");
				theDate = (theDate == -1 || typeof theDate == "undefined") ? startDate : theDate;

			// Calculate the first and last date in month being rendered.
			// Also calculate the weekday to start rendering on
			var firstDate = new Date(theDate); firstDate.setDate(1);
			var firstTime = firstDate.getTime();
			var lastDate = new Date(firstDate); lastDate.setMonth(lastDate.getMonth()+1); lastDate.setDate(0);
			var lastTime = lastDate.getTime();
			var lastDay = lastDate.getDate();

			// Calculate the last day in previous month
			var prevDateLastDay = new Date(firstDate);
				prevDateLastDay.setDate(0);
				prevDateLastDay = prevDateLastDay.getDate();

			// The month names to show in toolbar
			var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

			// Save current date
			target.data("theDate", theDate);

			// Render the cells as <TD>
			var days = "";
			for(var y = 0, i = 0; y < 6; y++)
			{
				var row = "";

				for(var x = 0; x < 7; x++, i++)
				{
					var p = ((prevDateLastDay - firstDate.getDay()) + i + 1);
					var n = p - prevDateLastDay;
					var c = (x == 0) ? "sun" : ((x == 6) ? "sat" : "day");

					// If value is outside of bounds its likely previous and next months
					if(n >= 1 && n <= lastDay)
					{
						var today = new Date(); today.setHours(0,0,0,0);
						var date = new Date(theDate); date.setHours(0,0,0,0); date.setDate(n);
						var dateTime = date.getTime();

						// Test to see if it's today
						c = (today.getTime() == dateTime) ? "today":c;

						// Test to see if we allow old dates
						if(!settings.allowOld)
						{
							c = (dateTime < startTime) ? "noday":c;
						}

						// Test against end date
						if(settings.endDate != -1)
						{
							c = (dateTime > endTime) ? "noday":c;
						}

						// Test against selected date
						if(settings.selectedDate != -1)
						{
							c = (dateTime == selectedTime) ? "selected":c;
						}
					}
					else
					{
						c = "noday"; // Prev/Next month dates are non-selectable by default
						n = (n <= 0) ? p : ((p - lastDay) - prevDateLastDay);
					}

					// Create the cell
					row += "<td class='gldp-days "+c+" **-"+c+"'><div class='"+c+"'>"+n+"</div></td>";
				}

				// Create the row
				days += "<tr class='days'>"+row+"</tr>";
			}

			// Determine whether to show Previous arrow
			var showP = ((startTime < firstTime) || settings.allowOld);
			var showN = ((lastTime < endTime) || (endTime < startTime));

			// Force override to showPrevNext on false
			if(!settings.showPrevNext) { showP = showN = false; }

			// Build the html for the control
			var titleMonthYear = monthNames[theDate.getMonth()]+" "+theDate.getFullYear();
			var html =
				"<div class='**'>"+
					"<table>"+
						"<tr>"+ /* Prev Month/Year Next*/
							("<td class='**-prevnext prev'>"+(showP ? "◄":"")+"</td>")+
							"<td class='**-monyear' colspan='5'>{MY}</td>"+
							("<td class='**-prevnext next'>"+(showN ? "►":"")+"</td>")+
						"</tr>"+
						"<tr class='**-dow'>"+ /* Day of Week */
							"<td>Sun</td><td>Mon</td><td>Tue</td><td>Wed</td><td>Thu</td><td>Fri</td><td>Sat</td>"+
						"</tr>"+days+
					"</table>"+
				"</div>";

			// Replace css, month-year title
			html = (html.replace(/\*{2}/gi, "gldp-"+settings.cssName)).replace(/\{MY\}/gi, titleMonthYear);

			// If calendar doesn't exist, make one
			if($("#"+calId).length == 0)
			{
				target.after
				(
					$('<div class="date" id="'+calId+'"></div>')
				);
			}

			// Show calendar
			var calendar = $("#"+calId);
			calendar.html(html);
			calendar.show();

			// Add a class to make it easier to find when hiding
			target.addClass("_gldp");

			// Handle previous/next clicks
			$("[class*=-prevnext]", calendar).click(function(e)
			{
				e.stopPropagation();

				if($(this).html() != "")
				{
					// Determine offset and set new date
					var offset = $(this).hasClass("prev") ? -1 : 1;
					var newDate = new Date(firstDate);
						newDate.setMonth(theDate.getMonth()+offset);

					// Save the new date and render the change
					target.data("theDate", newDate);
					methods.update.apply(target);
				}
			});

			// Highlight day cell on hover
			$("tr.days td:not(.noday, .selected)", calendar)
				.mouseenter(function(e)
				{
					var css = "gldp-"+settings.cssName+"-"+$(this).children("div").attr("class");
					$(this).removeClass(css).addClass(css+"-hover");
				})
				.mouseleave(function(e)
				{
					if(!$(this).hasClass("selected"))
					{
						var css = "gldp-"+settings.cssName+"-"+$(this).children("div").attr("class");
						$(this).removeClass(css+"-hover").addClass(css);
					}
				})
				.click(function(e)
				{
					e.stopPropagation();
					var day = $(this).children("div").html();
					var settings = target.data("settings");
					var newDate = new Date(theDate); newDate.setDate(day);

					// Save the new date and update the target control
					target.data("theDate", newDate);
					target.val((newDate.getMonth()+1)+"/"+newDate.getDate()+"/"+newDate.getFullYear());

					// Run callback to user-defined date change method
					if(settings.onChange != null && typeof settings.onChange != "undefined")
					{
						settings.onChange(target, newDate);
					}

					// Save selected
					settings.selectedDate = newDate;

					// Hide calendar
					methods.hide.apply(target);
				});
		}
	};

	// Plugin entry
	$.fn.date = function(method)
	{
		if(methods[method]) { return methods[method].apply(this, Array.prototype.slice.call(arguments, 1)); }
		else if(typeof method === "object" || !method) { return methods.init.apply(this, arguments); }
		else { $.error("Method "+ method + " does not exist on jQuery.date"); }
	};
})(jQuery);

// @PLUGIN Montage by Codrops
(function(window,$,undefined){Array.max=function(array){return Math.max.apply(Math,array)};Array.min=function(array){return Math.min.apply(Math,array)};var $event=$.event,resizeTimeout;$event.special.smartresize={setup:function(){$(this).bind("resize",$event.special.smartresize.handler)},teardown:function(){$(this).unbind("resize",$event.special.smartresize.handler)},handler:function(event,execAsap){var context=this,args=arguments;event.type="smartresize";if(resizeTimeout){clearTimeout(resizeTimeout)}resizeTimeout=setTimeout(function(){jQuery.event.handle.apply(context,args)},execAsap==="execAsap"?0:50)}};$.fn.smartresize=function(fn){return fn?this.bind("smartresize",fn):this.trigger("smartresize",["execAsap"])};$.fn.imagesLoaded=function(callback){var $images=this.find('img'),len=$images.length,_this=this,blank='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';function triggerCallback(){callback.call(_this,$images)}function imgLoaded(){if(--len<=0&&this.src!==blank){setTimeout(triggerCallback);$images.unbind('load error',imgLoaded)}}if(!len){triggerCallback()}$images.bind('load error',imgLoaded).each(function(){if(this.complete||this.complete===undefined){var src=this.src;this.src=blank;this.src=src}});return this};$.Montage=function(options,element){this.element=$(element).show();this.cache={};this.heights=new Array();this._create(options)};$.Montage.defaults={liquid:true,margin:1,minw:70,minh:20,maxh:250,alternateHeight:false,alternateHeightRange:{min:100,max:300},fixedHeight:null,minsize:false,fillLastRow:false};$.Montage.prototype={_getImageWidth:function($img,h){var i_w=$img.width(),i_h=$img.height(),r_i=i_h/i_w;return Math.ceil(h/r_i)},_getImageHeight:function($img,w){var i_w=$img.width(),i_h=$img.height(),r_i=i_h/i_w;return Math.ceil(r_i*w)},_chooseHeight:function(){if(this.options.minsize){return Array.min(this.heights)}var result={},max=0,res,val,min;for(var i=0,total=this.heights.length;i<total;++i){var val=this.heights[i],inc=(result[val]||0)+1;if(val<this.options.minh||val>this.options.maxh)continue;result[val]=inc;if(inc>=max){max=inc;res=val}}for(var i in result){if(result[i]===max){val=i;min=min||val;if(min<this.options.minh)min=null;else if(min>val)min=val;if(min===null)min=val}}if(min===undefined)min=this.heights[0];res=min;return res},_stretchImage:function($img){var prevWrapper_w=$img.parent().width(),new_w=prevWrapper_w+this.cache.space_w_left,crop={x:new_w,y:this.theHeight};var new_image_w=$img.width()+this.cache.space_w_left,new_image_h=this._getImageHeight($img,new_image_w);this._cropImage($img,new_image_w,new_image_h,crop);this.cache.space_w_left=this.cache.container_w;if(this.options.alternateHeight)this.theHeight=Math.floor(Math.random()*(this.options.alternateHeightRange.max-this.options.alternateHeightRange.min+1)+this.options.alternateHeightRange.min)},_updatePrevImage:function($nextimg){var $prevImage=this.element.find('img.montage:last');this._stretchImage($prevImage);this._insertImage($nextimg)},_insertImage:function($img){var new_w=this._getImageWidth($img,this.theHeight);if(this.options.minsize&&!this.options.alternateHeight){if(this.cache.space_w_left<=this.options.margin*2){this._updatePrevImage($img)}else{if(new_w>this.cache.space_w_left){var crop={x:this.cache.space_w_left,y:this.theHeight};this._cropImage($img,new_w,this.theHeight,crop);this.cache.space_w_left=this.cache.container_w;$img.addClass('montage')}else{var crop={x:new_w,y:this.theHeight};this._cropImage($img,new_w,this.theHeight,crop);this.cache.space_w_left-=new_w;$img.addClass('montage')}}}else{if(new_w<this.options.minw){if(this.options.minw>this.cache.space_w_left){this._updatePrevImage($img)}else{var new_w=this.options.minw,new_h=this._getImageHeight($img,new_w),crop={x:new_w,y:this.theHeight};this._cropImage($img,new_w,new_h,crop);this.cache.space_w_left-=new_w;$img.addClass('montage')}}else{if(new_w>this.cache.space_w_left&&this.cache.space_w_left<this.options.minw){this._updatePrevImage($img)}else if(new_w>this.cache.space_w_left&&this.cache.space_w_left>=this.options.minw){var crop={x:this.cache.space_w_left,y:this.theHeight};this._cropImage($img,new_w,this.theHeight,crop);this.cache.space_w_left=this.cache.container_w;if(this.options.alternateHeight)this.theHeight=Math.floor(Math.random()*(this.options.alternateHeightRange.max-this.options.alternateHeightRange.min+1)+this.options.alternateHeightRange.min);$img.addClass('montage')}else{var crop={x:new_w,y:this.theHeight};this._cropImage($img,new_w,this.theHeight,crop);this.cache.space_w_left-=new_w;$img.addClass('montage')}}}},_cropImage:function($img,w,h,cropParam){var dec=this.options.margin*2;var $wrapper=$img.parent('a');this._resizeImage($img,w,h);$img.css({left:-(w-cropParam.x)/2+'px',top:-(h-cropParam.y)/2+'px'});$wrapper.addClass('mon').css({width:cropParam.x-dec+'px',height:cropParam.y+'px',margin:this.options.margin})},_resizeImage:function($img,w,h){$img.css({width:w+'px',height:h+'px'})},_reload:function(){var new_el_w=this.element.width();if(new_el_w!==this.cache.container_w){this.element.hide();this.cache.container_w=new_el_w;this.cache.space_w_left=new_el_w;var instance=this;instance.$imgs.removeClass('montage').each(function(i){instance._insertImage($(this))});if(instance.options.fillLastRow&&instance.cache.space_w_left!==instance.cache.container_w){instance._stretchImage(instance.$imgs.eq(instance.totalImages-1))}instance.element.show()}},_create:function(options){this.options=$.extend(true,{},$.Montage.defaults,options);var instance=this,el_w=instance.element.width();instance.$imgs=instance.element.find('img');instance.totalImages=instance.$imgs.length;if(instance.options.liquid)$('html').css('overflow-y','scroll');if(!instance.options.fixedHeight){instance.$imgs.each(function(i){var $img=$(this),img_w=$img.width();if(img_w<instance.options.minw&&!instance.options.minsize){var new_h=instance._getImageHeight($img,instance.options.minw);instance.heights.push(new_h)}else{instance.heights.push($img.height())}})}instance.theHeight=(!instance.options.fixedHeight&&!instance.options.alternateHeight)?instance._chooseHeight():instance.options.fixedHeight;if(instance.options.alternateHeight)instance.theHeight=Math.floor(Math.random()*(instance.options.alternateHeightRange.max-instance.options.alternateHeightRange.min+1)+instance.options.alternateHeightRange.min);instance.cache.container_w=el_w;instance.cache.space_w_left=el_w;instance.$imgs.each(function(i){instance._insertImage($(this))});if(instance.options.fillLastRow&&instance.cache.space_w_left!==instance.cache.container_w){instance._stretchImage(instance.$imgs.eq(instance.totalImages-1))}$(window).bind('smartresize.montage',function(){instance._reload()})},add:function($images,callback){var $images_stripped=$images.find('img');this.$imgs=this.$imgs.add($images_stripped);this.totalImages=this.$imgs.length;this._add($images,callback)},_add:function($images,callback){var instance=this;$images.find('img').each(function(i){instance._insertImage($(this))});if(instance.options.fillLastRow&&instance.cache.space_w_left!==instance.cache.container_w)instance._stretchImage(instance.$imgs.eq(instance.totalImages-1));if(callback)callback.call($images)},destroy:function(callback){this._destroy(callback)},_destroy:function(callback){this.$imgs.removeClass('montage').css({position:'',width:'',height:'',left:'',top:''}).unwrap();if(this.options.liquid)$('html').css('overflow','');this.element.unbind('.montage').removeData('montage');$(window).unbind('.montage');if(callback)callback.call()},option:function(key,value){if($.isPlainObject(key)){this.options=$.extend(true,this.options,key)}}};var logError=function(message){if(this.console){console.error(message)}};$.fn.montage=function(options){if(typeof options==='string'){var args=Array.prototype.slice.call(arguments,1);this.each(function(){var instance=$.data(this,'montage');if(!instance){logError("cannot call methods on montage prior to initialization; "+"attempted to call method '"+options+"'");return}if(!$.isFunction(instance[options])||options.charAt(0)==="_"){logError("no such method '"+options+"' for montage instance");return}instance[options].apply(instance,args)})}else{this.each(function(){var instance=$.data(this,'montage');if(instance){instance.option(options||{});instance._reload()}else{$.data(this,'montage',new $.Montage(options,this))}})}return this}})(window,jQuery);

// PLUGIN Flot.js by Ole Laursen
// Flot.js
(function(a){a.color={};a.color.make=function(b,c,d,e){var f={};f.r=b||0;f.g=c||0;f.b=d||0;f.a=e!=null?e:1;f.add=function(a,b){for(var c=0;c<a.length;++c){f[a.charAt(c)]+=b}return f.normalize()};f.scale=function(a,b){for(var c=0;c<a.length;++c){f[a.charAt(c)]*=b}return f.normalize()};f.toString=function(){if(f.a>=1){return"rgb("+[f.r,f.g,f.b].join(",")+")"}else{return"rgba("+[f.r,f.g,f.b,f.a].join(",")+")"}};f.normalize=function(){function a(a,b,c){return b<a?a:b>c?c:b}f.r=a(0,parseInt(f.r),255);f.g=a(0,parseInt(f.g),255);f.b=a(0,parseInt(f.b),255);f.a=a(0,f.a,1);return f};f.clone=function(){return a.color.make(f.r,f.b,f.g,f.a)};return f.normalize()};a.color.extract=function(b,c){var d;do{d=b.css(c).toLowerCase();if(d!=""&&d!="transparent"){break}b=b.parent()}while(!a.nodeName(b.get(0),"body"));if(d=="rgba(0, 0, 0, 0)"){d="transparent"}return a.color.parse(d)};a.color.parse=function(c){var d,e=a.color.make;if(d=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(c)){return e(parseInt(d[1],10),parseInt(d[2],10),parseInt(d[3],10))}if(d=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(c)){return e(parseInt(d[1],10),parseInt(d[2],10),parseInt(d[3],10),parseFloat(d[4]))}if(d=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(c)){return e(parseFloat(d[1])*2.55,parseFloat(d[2])*2.55,parseFloat(d[3])*2.55)}if(d=/rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(c)){return e(parseFloat(d[1])*2.55,parseFloat(d[2])*2.55,parseFloat(d[3])*2.55,parseFloat(d[4]))}if(d=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(c)){return e(parseInt(d[1],16),parseInt(d[2],16),parseInt(d[3],16))}if(d=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(c)){return e(parseInt(d[1]+d[1],16),parseInt(d[2]+d[2],16),parseInt(d[3]+d[3],16))}var f=a.trim(c).toLowerCase();if(f=="transparent"){return e(255,255,255,0)}else{d=b[f]||[0,0,0];return e(d[0],d[1],d[2])}};var b={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0]}})(jQuery);(function(a){function c(a,b){return b*Math.floor(a/b)}function b(b,d,e,f){function bx(b,c,d,e){if(typeof b=="string")return b;else{var f=m.createLinearGradient(0,d,0,c);for(var g=0,h=b.colors.length;g<h;++g){var i=b.colors[g];if(typeof i!="string"){var j=a.color.parse(e);if(i.brightness!=null)j=j.scale("rgb",i.brightness);if(i.opacity!=null)j.a*=i.opacity;i=j.toString()}f.addColorStop(g/(h-1),i)}return f}}function bw(b,c){n.lineWidth=b.bars.lineWidth;n.strokeStyle=a.color.parse(b.color).scale("a",.5).toString();var d=a.color.parse(b.color).scale("a",.5).toString();var e=b.bars.align=="left"?0:-b.bars.barWidth/2;bf(c[0],c[1],c[2]||0,e,e+b.bars.barWidth,0,function(){return d},b.xaxis,b.yaxis,n,b.bars.horizontal,b.bars.lineWidth)}function bv(b,c){var d=c[0],e=c[1],f=b.xaxis,g=b.yaxis;if(d<f.min||d>f.max||e<g.min||e>g.max)return;var h=b.points.radius+b.points.lineWidth/2;n.lineWidth=h;n.strokeStyle=a.color.parse(b.color).scale("a",.5).toString();var i=1.5*h,d=f.p2c(d),e=g.p2c(e);n.beginPath();if(b.points.symbol=="circle")n.arc(d,e,i,0,2*Math.PI,false);else b.points.symbol(n,d,e,i,false);n.closePath();n.stroke()}function bu(a,b){for(var c=0;c<bj.length;++c){var d=bj[c];if(d.series==a&&d.point[0]==b[0]&&d.point[1]==b[1])return c}return-1}function bt(a,b){if(a==null&&b==null){bj=[];bq()}if(typeof a=="number")a=g[a];if(typeof b=="number")b=a.data[b];var c=bu(a,b);if(c!=-1){bj.splice(c,1);bq()}}function bs(a,b,c){if(typeof a=="number")a=g[a];if(typeof b=="number"){var d=a.datapoints.pointsize;b=a.datapoints.points.slice(d*b,d*(b+1))}var e=bu(a,b);if(e==-1){bj.push({series:a,point:b,auto:c});bq()}else if(!c)bj[e].auto=false}function br(){bk=null;n.save();n.clearRect(0,0,r,s);n.translate(q.left,q.top);var a,b;for(a=0;a<bj.length;++a){b=bj[a];if(b.series.bars.show)bw(b.series,b.point);else bv(b.series,b.point)}n.restore();x(v.drawOverlay,[n])}function bq(){if(!bk)bk=setTimeout(br,30)}function bp(a,c,d){var e=l.offset(),f=c.pageX-e.left-q.left,g=c.pageY-e.top-q.top,i=E({left:f,top:g});i.pageX=c.pageX;i.pageY=c.pageY;var j=bl(f,g,d);if(j){j.pageX=parseInt(j.series.xaxis.p2c(j.datapoint[0])+e.left+q.left);j.pageY=parseInt(j.series.yaxis.p2c(j.datapoint[1])+e.top+q.top)}if(h.grid.autoHighlight){for(var k=0;k<bj.length;++k){var m=bj[k];if(m.auto==a&&!(j&&m.series==j.series&&m.point[0]==j.datapoint[0]&&m.point[1]==j.datapoint[1]))bt(m.series,m.point)}if(j)bs(j.series,j.datapoint,a)}b.trigger(a,[i,j])}function bo(a){bp("plotclick",a,function(a){return a["clickable"]!=false})}function bn(a){if(h.grid.hoverable)bp("plothover",a,function(a){return false})}function bm(a){if(h.grid.hoverable)bp("plothover",a,function(a){return a["hoverable"]!=false})}function bl(a,b,c){var d=h.grid.mouseActiveRadius,e=d*d+1,f=null,i=false,j,k;for(j=g.length-1;j>=0;--j){if(!c(g[j]))continue;var l=g[j],m=l.xaxis,n=l.yaxis,o=l.datapoints.points,p=l.datapoints.pointsize,q=m.c2p(a),r=n.c2p(b),s=d/m.scale,t=d/n.scale;if(m.options.inverseTransform)s=Number.MAX_VALUE;if(n.options.inverseTransform)t=Number.MAX_VALUE;if(l.lines.show||l.points.show){for(k=0;k<o.length;k+=p){var u=o[k],v=o[k+1];if(u==null)continue;if(u-q>s||u-q<-s||v-r>t||v-r<-t)continue;var w=Math.abs(m.p2c(u)-a),x=Math.abs(n.p2c(v)-b),y=w*w+x*x;if(y<e){e=y;f=[j,k/p]}}}if(l.bars.show&&!f){var z=l.bars.align=="left"?0:-l.bars.barWidth/2,A=z+l.bars.barWidth;for(k=0;k<o.length;k+=p){var u=o[k],v=o[k+1],B=o[k+2];if(u==null)continue;if(g[j].bars.horizontal?q<=Math.max(B,u)&&q>=Math.min(B,u)&&r>=v+z&&r<=v+A:q>=u+z&&q<=u+A&&r>=Math.min(B,v)&&r<=Math.max(B,v))f=[j,k/p]}}}if(f){j=f[0];k=f[1];p=g[j].datapoints.pointsize;return{datapoint:g[j].datapoints.points.slice(k*p,(k+1)*p),dataIndex:k,series:g[j],seriesIndex:j}}return null}function bi(){b.find(".legend").remove();if(!h.legend.show)return;var c=[],d=false,e=h.legend.labelFormatter,f,i;for(var j=0;j<g.length;++j){f=g[j];i=f.label;if(!i)continue;if(j%h.legend.noColumns==0){if(d)c.push("</tr>");c.push("<tr>");d=true}if(e)i=e(i,f);c.push('<td class="legendColorBox"><div style="border:1px solid '+h.legend.labelBoxBorderColor+';padding:1px"><div style="width:4px;height:0;border:5px solid '+f.color+';overflow:hidden"></div></div></td>'+'<td class="legendLabel">'+i+"</td>")}if(d)c.push("</tr>");if(c.length==0)return;var k='<table style="font-size:smaller;color:'+h.grid.color+'">'+c.join("")+"</table>";if(h.legend.container!=null)a(h.legend.container).html(k);else{var l="",m=h.legend.position,n=h.legend.margin;if(n[0]==null)n=[n,n];if(m.charAt(0)=="n")l+="top:"+(n[1]+q.top)+"px;";else if(m.charAt(0)=="s")l+="bottom:"+(n[1]+q.bottom)+"px;";if(m.charAt(1)=="e")l+="right:"+(n[0]+q.right)+"px;";else if(m.charAt(1)=="w")l+="left:"+(n[0]+q.left)+"px;";var o=a('<div class="legend">'+k.replace('style="','style="position:absolute;'+l+";")+"</div>").appendTo(b);if(h.legend.backgroundOpacity!=0){var p=h.legend.backgroundColor;if(p==null){p=h.grid.backgroundColor;if(p&&typeof p=="string")p=a.color.parse(p);else p=a.color.extract(o,"background-color");p.a=1;p=p.toString()}var r=o.children();a('<div style="position:absolute;width:'+r.width()+"px;height:"+r.height()+"px;"+l+"background-color:"+p+';"> </div>').prependTo(o).css("opacity",h.legend.backgroundOpacity)}}}function bh(b,c,d,e){var f=b.fill;if(!f)return null;if(b.fillColor)return bx(b.fillColor,d,e,c);var g=a.color.parse(c);g.a=typeof f=="number"?f:.4;g.normalize();return g.toString()}function bg(a){function b(b,c,d,e,f,g,h){var i=b.points,j=b.pointsize;for(var k=0;k<i.length;k+=j){if(i[k]==null)continue;bf(i[k],i[k+1],i[k+2],c,d,e,f,g,h,m,a.bars.horizontal,a.bars.lineWidth)}}m.save();m.translate(q.left,q.top);m.lineWidth=a.bars.lineWidth;m.strokeStyle=a.color;var c=a.bars.align=="left"?0:-a.bars.barWidth/2;var d=a.bars.fill?function(b,c){return bh(a.bars,a.color,b,c)}:null;b(a.datapoints,c,c+a.bars.barWidth,0,d,a.xaxis,a.yaxis);m.restore()}function bf(a,b,c,d,e,f,g,h,i,j,k,l){var m,n,o,p,q,r,s,t,u;if(k){t=r=s=true;q=false;m=c;n=a;p=b+d;o=b+e;if(n<m){u=n;n=m;m=u;q=true;r=false}}else{q=r=s=true;t=false;m=a+d;n=a+e;o=c;p=b;if(p<o){u=p;p=o;o=u;t=true;s=false}}if(n<h.min||m>h.max||p<i.min||o>i.max)return;if(m<h.min){m=h.min;q=false}if(n>h.max){n=h.max;r=false}if(o<i.min){o=i.min;t=false}if(p>i.max){p=i.max;s=false}m=h.p2c(m);o=i.p2c(o);n=h.p2c(n);p=i.p2c(p);if(g){j.beginPath();j.moveTo(m,o);j.lineTo(m,p);j.lineTo(n,p);j.lineTo(n,o);j.fillStyle=g(o,p);j.fill()}if(l>0&&(q||r||s||t)){j.beginPath();j.moveTo(m,o+f);if(q)j.lineTo(m,p+f);else j.moveTo(m,p+f);if(s)j.lineTo(n,p+f);else j.moveTo(n,p+f);if(r)j.lineTo(n,o+f);else j.moveTo(n,o+f);if(t)j.lineTo(m,o+f);else j.moveTo(m,o+f);j.stroke()}}function be(a){function b(a,b,c,d,e,f,g,h){var i=a.points,j=a.pointsize;for(var k=0;k<i.length;k+=j){var l=i[k],n=i[k+1];if(l==null||l<f.min||l>f.max||n<g.min||n>g.max)continue;m.beginPath();l=f.p2c(l);n=g.p2c(n)+d;if(h=="circle")m.arc(l,n,b,0,e?Math.PI:Math.PI*2,false);else h(m,l,n,b,e);m.closePath();if(c){m.fillStyle=c;m.fill()}m.stroke()}}m.save();m.translate(q.left,q.top);var c=a.points.lineWidth,d=a.shadowSize,e=a.points.radius,f=a.points.symbol;if(c>0&&d>0){var g=d/2;m.lineWidth=g;m.strokeStyle="rgba(0,0,0,0.1)";b(a.datapoints,e,null,g+g/2,true,a.xaxis,a.yaxis,f);m.strokeStyle="rgba(0,0,0,0.2)";b(a.datapoints,e,null,g/2,true,a.xaxis,a.yaxis,f)}m.lineWidth=c;m.strokeStyle=a.color;b(a.datapoints,e,bh(a.points,a.color),0,false,a.xaxis,a.yaxis,f);m.restore()}function bd(a){function c(a,b,c){var d=a.points,e=a.pointsize,f=Math.min(Math.max(0,c.min),c.max),g=0,h,i=false,j=1,k=0,l=0;while(true){if(e>0&&g>d.length+e)break;g+=e;var n=d[g-e],o=d[g-e+j],p=d[g],q=d[g+j];if(i){if(e>0&&n!=null&&p==null){l=g;e=-e;j=2;continue}if(e<0&&g==k+e){m.fill();i=false;e=-e;j=1;g=k=l+e;continue}}if(n==null||p==null)continue;if(n<=p&&n<b.min){if(p<b.min)continue;o=(b.min-n)/(p-n)*(q-o)+o;n=b.min}else if(p<=n&&p<b.min){if(n<b.min)continue;q=(b.min-n)/(p-n)*(q-o)+o;p=b.min}if(n>=p&&n>b.max){if(p>b.max)continue;o=(b.max-n)/(p-n)*(q-o)+o;n=b.max}else if(p>=n&&p>b.max){if(n>b.max)continue;q=(b.max-n)/(p-n)*(q-o)+o;p=b.max}if(!i){m.beginPath();m.moveTo(b.p2c(n),c.p2c(f));i=true}if(o>=c.max&&q>=c.max){m.lineTo(b.p2c(n),c.p2c(c.max));m.lineTo(b.p2c(p),c.p2c(c.max));continue}else if(o<=c.min&&q<=c.min){m.lineTo(b.p2c(n),c.p2c(c.min));m.lineTo(b.p2c(p),c.p2c(c.min));continue}var r=n,s=p;if(o<=q&&o<c.min&&q>=c.min){n=(c.min-o)/(q-o)*(p-n)+n;o=c.min}else if(q<=o&&q<c.min&&o>=c.min){p=(c.min-o)/(q-o)*(p-n)+n;q=c.min}if(o>=q&&o>c.max&&q<=c.max){n=(c.max-o)/(q-o)*(p-n)+n;o=c.max}else if(q>=o&&q>c.max&&o<=c.max){p=(c.max-o)/(q-o)*(p-n)+n;q=c.max}if(n!=r){m.lineTo(b.p2c(r),c.p2c(o))}m.lineTo(b.p2c(n),c.p2c(o));m.lineTo(b.p2c(p),c.p2c(q));if(p!=s){m.lineTo(b.p2c(p),c.p2c(q));m.lineTo(b.p2c(s),c.p2c(q))}}}function b(a,b,c,d,e){var f=a.points,g=a.pointsize,h=null,i=null;m.beginPath();for(var j=g;j<f.length;j+=g){var k=f[j-g],l=f[j-g+1],n=f[j],o=f[j+1];if(k==null||n==null)continue;if(l<=o&&l<e.min){if(o<e.min)continue;k=(e.min-l)/(o-l)*(n-k)+k;l=e.min}else if(o<=l&&o<e.min){if(l<e.min)continue;n=(e.min-l)/(o-l)*(n-k)+k;o=e.min}if(l>=o&&l>e.max){if(o>e.max)continue;k=(e.max-l)/(o-l)*(n-k)+k;l=e.max}else if(o>=l&&o>e.max){if(l>e.max)continue;n=(e.max-l)/(o-l)*(n-k)+k;o=e.max}if(k<=n&&k<d.min){if(n<d.min)continue;l=(d.min-k)/(n-k)*(o-l)+l;k=d.min}else if(n<=k&&n<d.min){if(k<d.min)continue;o=(d.min-k)/(n-k)*(o-l)+l;n=d.min}if(k>=n&&k>d.max){if(n>d.max)continue;l=(d.max-k)/(n-k)*(o-l)+l;k=d.max}else if(n>=k&&n>d.max){if(k>d.max)continue;o=(d.max-k)/(n-k)*(o-l)+l;n=d.max}if(k!=h||l!=i)m.moveTo(d.p2c(k)+b,e.p2c(l)+c);h=n;i=o;m.lineTo(d.p2c(n)+b,e.p2c(o)+c)}m.stroke()}m.save();m.translate(q.left,q.top);m.lineJoin="round";var d=a.lines.lineWidth,e=a.shadowSize;if(d>0&&e>0){m.lineWidth=e;m.strokeStyle="rgba(0,0,0,0.1)";var f=Math.PI/18;b(a.datapoints,Math.sin(f)*(d/2+e/2),Math.cos(f)*(d/2+e/2),a.xaxis,a.yaxis);m.lineWidth=e/2;b(a.datapoints,Math.sin(f)*(d/2+e/4),Math.cos(f)*(d/2+e/4),a.xaxis,a.yaxis)}m.lineWidth=d;m.strokeStyle=a.color;var g=bh(a.lines,a.color,0,u);if(g){m.fillStyle=g;c(a.datapoints,a.xaxis,a.yaxis)}if(d>0)b(a.datapoints,0,0,a.xaxis,a.yaxis);m.restore()}function bc(a){if(a.lines.show)bd(a);if(a.bars.show)bg(a);if(a.points.show)be(a)}function bb(){b.find(".tickLabels").remove();var a=['<div class="tickLabels" style="font-size:smaller">'];var c=D();for(var d=0;d<c.length;++d){var e=c[d],f=e.box;if(!e.show)continue;a.push('<div class="'+e.direction+"Axis "+e.direction+e.n+'Axis" style="color:'+e.options.color+'">');for(var g=0;g<e.ticks.length;++g){var h=e.ticks[g];if(!h.label||h.v<e.min||h.v>e.max)continue;var i={},j;if(e.direction=="x"){j="center";i.left=Math.round(q.left+e.p2c(h.v)-e.labelWidth/2);if(e.position=="bottom")i.top=f.top+f.padding;else i.bottom=s-(f.top+f.height-f.padding)}else{i.top=Math.round(q.top+e.p2c(h.v)-e.labelHeight/2);if(e.position=="left"){i.right=r-(f.left+f.width-f.padding);j="right"}else{i.left=f.left+f.padding;j="left"}}i.width=e.labelWidth;var k=["position:absolute","text-align:"+j];for(var l in i)k.push(l+":"+i[l]+"px");a.push('<div class="tickLabel" style="'+k.join(";")+'">'+h.label+"</div>")}a.push("</div>")}a.push("</div>");b.append(a.join(""))}function ba(){var b;m.save();m.translate(q.left,q.top);var c=h.grid.markings;if(c){if(a.isFunction(c)){var d=w.getAxes();d.xmin=d.xaxis.min;d.xmax=d.xaxis.max;d.ymin=d.yaxis.min;d.ymax=d.yaxis.max;c=c(d)}for(b=0;b<c.length;++b){var e=c[b],f=Z(e,"x"),g=Z(e,"y");if(f.from==null)f.from=f.axis.min;if(f.to==null)f.to=f.axis.max;if(g.from==null)g.from=g.axis.min;if(g.to==null)g.to=g.axis.max;if(f.to<f.axis.min||f.from>f.axis.max||g.to<g.axis.min||g.from>g.axis.max)continue;f.from=Math.max(f.from,f.axis.min);f.to=Math.min(f.to,f.axis.max);g.from=Math.max(g.from,g.axis.min);g.to=Math.min(g.to,g.axis.max);if(f.from==f.to&&g.from==g.to)continue;f.from=f.axis.p2c(f.from);f.to=f.axis.p2c(f.to);g.from=g.axis.p2c(g.from);g.to=g.axis.p2c(g.to);if(f.from==f.to||g.from==g.to){m.beginPath();m.strokeStyle=e.color||h.grid.markingsColor;m.lineWidth=e.lineWidth||h.grid.markingsLineWidth;m.moveTo(f.from,g.from);m.lineTo(f.to,g.to);m.stroke()}else{m.fillStyle=e.color||h.grid.markingsColor;m.fillRect(f.from,g.to,f.to-f.from,g.from-g.to)}}}var d=D(),i=h.grid.borderWidth;for(var j=0;j<d.length;++j){var k=d[j],l=k.box,n=k.tickLength,o,p,r,s;if(!k.show||k.ticks.length==0)continue;m.strokeStyle=k.options.tickColor||a.color.parse(k.options.color).scale("a",.22).toString();m.lineWidth=1;if(k.direction=="x"){o=0;if(n=="full")p=k.position=="top"?0:u;else p=l.top-q.top+(k.position=="top"?l.height:0)}else{p=0;if(n=="full")o=k.position=="left"?0:t;else o=l.left-q.left+(k.position=="left"?l.width:0)}if(!k.innermost){m.beginPath();r=s=0;if(k.direction=="x")r=t;else s=u;if(m.lineWidth==1){o=Math.floor(o)+.5;p=Math.floor(p)+.5}m.moveTo(o,p);m.lineTo(o+r,p+s);m.stroke()}m.beginPath();for(b=0;b<k.ticks.length;++b){var v=k.ticks[b].v;r=s=0;if(v<k.min||v>k.max||n=="full"&&i>0&&(v==k.min||v==k.max))continue;if(k.direction=="x"){o=k.p2c(v);s=n=="full"?-u:n;if(k.position=="top")s=-s}else{p=k.p2c(v);r=n=="full"?-t:n;if(k.position=="left")r=-r}if(m.lineWidth==1){if(k.direction=="x")o=Math.floor(o)+.5;else p=Math.floor(p)+.5}m.moveTo(o,p);m.lineTo(o+r,p+s)}m.stroke()}if(i){m.lineWidth=i;m.strokeStyle=h.grid.borderColor;m.strokeRect(-i/2,-i/2,t+i,u+i)}m.restore()}function _(){m.save();m.translate(q.left,q.top);m.fillStyle=bx(h.grid.backgroundColor,u,0,"rgba(255, 255, 255, 0)");m.fillRect(0,0,t,u);m.restore()}function Z(a,b){var c,d,e,f,g=D();for(i=0;i<g.length;++i){c=g[i];if(c.direction==b){f=b+c.n+"axis";if(!a[f]&&c.n==1)f=b+"axis";if(a[f]){d=a[f].from;e=a[f].to;break}}}if(!a[f]){c=b=="x"?o[0]:p[0];d=a[b+"1"];e=a[b+"2"]}if(d!=null&&e!=null&&d>e){var h=d;d=e;e=h}return{from:d,to:e,axis:c}}function Y(){m.clearRect(0,0,r,s);var a=h.grid;if(a.show&&a.backgroundColor)_();if(a.show&&!a.aboveData)ba();for(var b=0;b<g.length;++b){x(v.drawSeries,[m,g[b]]);bc(g[b])}x(v.draw,[m]);if(a.show&&a.aboveData)ba()}function X(a,b){if(a.options.autoscaleMargin&&b.length>0){if(a.options.min==null)a.min=Math.min(a.min,b[0].v);if(a.options.max==null&&b.length>1)a.max=Math.max(a.max,b[b.length-1].v)}}function W(b){var c=b.options.ticks,d=[];if(c==null||typeof c=="number"&&c>0)d=b.tickGenerator(b);else if(c){if(a.isFunction(c))d=c({min:b.min,max:b.max});else d=c}var e,f;b.ticks=[];for(e=0;e<d.length;++e){var g=null;var h=d[e];if(typeof h=="object"){f=+h[0];if(h.length>1)g=h[1]}else f=+h;if(g==null)g=b.tickFormatter(f,b);if(!isNaN(f))b.ticks.push({v:f,label:g})}}function V(b){var d=b.options;var e;if(typeof d.ticks=="number"&&d.ticks>0)e=d.ticks;else e=.3*Math.sqrt(b.direction=="x"?r:s);var f=(b.max-b.min)/e,g,h,i,j,k,l,m;if(d.mode=="time"){var n={second:1e3,minute:60*1e3,hour:60*60*1e3,day:24*60*60*1e3,month:30*24*60*60*1e3,year:365.2425*24*60*60*1e3};var q=[[1,"second"],[2,"second"],[5,"second"],[10,"second"],[30,"second"],[1,"minute"],[2,"minute"],[5,"minute"],[10,"minute"],[30,"minute"],[1,"hour"],[2,"hour"],[4,"hour"],[8,"hour"],[12,"hour"],[1,"day"],[2,"day"],[3,"day"],[.25,"month"],[.5,"month"],[1,"month"],[2,"month"],[3,"month"],[6,"month"],[1,"year"]];var t=0;if(d.minTickSize!=null){if(typeof d.tickSize=="number")t=d.tickSize;else t=d.minTickSize[0]*n[d.minTickSize[1]]}for(var k=0;k<q.length-1;++k)if(f<(q[k][0]*n[q[k][1]]+q[k+1][0]*n[q[k+1][1]])/2&&q[k][0]*n[q[k][1]]>=t)break;g=q[k][0];i=q[k][1];if(i=="year"){l=Math.pow(10,Math.floor(Math.log(f/n.year)/Math.LN10));m=f/n.year/l;if(m<1.5)g=1;else if(m<3)g=2;else if(m<7.5)g=5;else g=10;g*=l}b.tickSize=d.tickSize||[g,i];h=function(a){var b=[],d=a.tickSize[0],e=a.tickSize[1],f=new Date(a.min);var g=d*n[e];if(e=="second")f.setUTCSeconds(c(f.getUTCSeconds(),d));if(e=="minute")f.setUTCMinutes(c(f.getUTCMinutes(),d));if(e=="hour")f.setUTCHours(c(f.getUTCHours(),d));if(e=="month")f.setUTCMonth(c(f.getUTCMonth(),d));if(e=="year")f.setUTCFullYear(c(f.getUTCFullYear(),d));f.setUTCMilliseconds(0);if(g>=n.minute)f.setUTCSeconds(0);if(g>=n.hour)f.setUTCMinutes(0);if(g>=n.day)f.setUTCHours(0);if(g>=n.day*4)f.setUTCDate(1);if(g>=n.year)f.setUTCMonth(0);var h=0,i=Number.NaN,j;do{j=i;i=f.getTime();b.push(i);if(e=="month"){if(d<1){f.setUTCDate(1);var k=f.getTime();f.setUTCMonth(f.getUTCMonth()+1);var l=f.getTime();f.setTime(i+h*n.hour+(l-k)*d);h=f.getUTCHours();f.setUTCHours(0)}else f.setUTCMonth(f.getUTCMonth()+d)}else if(e=="year"){f.setUTCFullYear(f.getUTCFullYear()+d)}else f.setTime(i+g)}while(i<a.max&&i!=j);return b};j=function(b,c){var e=new Date(b);if(d.timeformat!=null)return a.plot.formatDate(e,d.timeformat,d.monthNames);var f=c.tickSize[0]*n[c.tickSize[1]];var g=c.max-c.min;var h=d.twelveHourClock?" %p":"";if(f<n.minute)fmt="%h:%M:%S"+h;else if(f<n.day){if(g<2*n.day)fmt="%h:%M"+h;else fmt="%b %d %h:%M"+h}else if(f<n.month)fmt="%b %d";else if(f<n.year){if(g<n.year)fmt="%b";else fmt="%b %y"}else fmt="%y";return a.plot.formatDate(e,fmt,d.monthNames)}}else{var u=d.tickDecimals;var v=-Math.floor(Math.log(f)/Math.LN10);if(u!=null&&v>u)v=u;l=Math.pow(10,-v);m=f/l;if(m<1.5)g=1;else if(m<3){g=2;if(m>2.25&&(u==null||v+1<=u)){g=2.5;++v}}else if(m<7.5)g=5;else g=10;g*=l;if(d.minTickSize!=null&&g<d.minTickSize)g=d.minTickSize;b.tickDecimals=Math.max(0,u!=null?u:v);b.tickSize=d.tickSize||g;h=function(a){var b=[];var d=c(a.min,a.tickSize),e=0,f=Number.NaN,g;do{g=f;f=d+e*a.tickSize;b.push(f);++e}while(f<a.max&&f!=g);return b};j=function(a,b){return a.toFixed(b.tickDecimals)}}if(d.alignTicksWithAxis!=null){var w=(b.direction=="x"?o:p)[d.alignTicksWithAxis-1];if(w&&w.used&&w!=b){var x=h(b);if(x.length>0){if(d.min==null)b.min=Math.min(b.min,x[0]);if(d.max==null&&x.length>1)b.max=Math.max(b.max,x[x.length-1])}h=function(a){var b=[],c,d;for(d=0;d<w.ticks.length;++d){c=(w.ticks[d].v-w.min)/(w.max-w.min);c=a.min+c*(a.max-a.min);b.push(c)}return b};if(b.mode!="time"&&d.tickDecimals==null){var y=Math.max(0,-Math.floor(Math.log(f)/Math.LN10)+1),z=h(b);if(!(z.length>1&&/\..*0$/.test((z[1]-z[0]).toFixed(y))))b.tickDecimals=y}}}b.tickGenerator=h;if(a.isFunction(d.tickFormatter))b.tickFormatter=function(a,b){return""+d.tickFormatter(a,b)};else b.tickFormatter=j}function U(a){var b=a.options,c=+(b.min!=null?b.min:a.datamin),d=+(b.max!=null?b.max:a.datamax),e=d-c;if(e==0){var f=d==0?1:.01;if(b.min==null)c-=f;if(b.max==null||b.min!=null)d+=f}else{var g=b.autoscaleMargin;if(g!=null){if(b.min==null){c-=e*g;if(c<0&&a.datamin!=null&&a.datamin>=0)c=0}if(b.max==null){d+=e*g;if(d>0&&a.datamax!=null&&a.datamax<=0)d=0}}}a.min=c;a.max=d}function T(){var b,c=D();a.each(c,function(a,b){b.show=b.options.show;if(b.show==null)b.show=b.used;b.reserveSpace=b.show||b.options.reserveSpace;U(b)});allocatedAxes=a.grep(c,function(a){return a.reserveSpace});q.left=q.right=q.top=q.bottom=0;if(h.grid.show){a.each(allocatedAxes,function(a,b){V(b);W(b);X(b,b.ticks);Q(b)});for(b=allocatedAxes.length-1;b>=0;--b)R(allocatedAxes[b]);var d=h.grid.minBorderMargin;if(d==null){d=0;for(b=0;b<g.length;++b)d=Math.max(d,g[b].points.radius+g[b].points.lineWidth/2)}for(var e in q){q[e]+=h.grid.borderWidth;q[e]=Math.max(d,q[e])}}t=r-q.left-q.right;u=s-q.bottom-q.top;a.each(c,function(a,b){P(b)});if(h.grid.show){a.each(allocatedAxes,function(a,b){S(b)});bb()}bi()}function S(a){if(a.direction=="x"){a.box.left=q.left;a.box.width=t}else{a.box.top=q.top;a.box.height=u}}function R(b){var c=b.labelWidth,d=b.labelHeight,e=b.options.position,f=b.options.tickLength,g=h.grid.axisMargin,i=h.grid.labelMargin,j=b.direction=="x"?o:p,k;var l=a.grep(j,function(a){return a&&a.options.position==e&&a.reserveSpace});if(a.inArray(b,l)==l.length-1)g=0;if(f==null)f="full";var m=a.grep(j,function(a){return a&&a.reserveSpace});var n=a.inArray(b,m)==0;if(!n&&f=="full")f=5;if(!isNaN(+f))i+=+f;if(b.direction=="x"){d+=i;if(e=="bottom"){q.bottom+=d+g;b.box={top:s-q.bottom,height:d}}else{b.box={top:q.top+g,height:d};q.top+=d+g}}else{c+=i;if(e=="left"){b.box={left:q.left+g,width:c};q.left+=c+g}else{q.right+=c+g;b.box={left:r-q.right,width:c}}}b.position=e;b.tickLength=f;b.box.padding=i;b.innermost=n}function Q(c){function l(d,e){return a('<div style="position:absolute;top:-10000px;'+e+'font-size:smaller">'+'<div class="'+c.direction+"Axis "+c.direction+c.n+'Axis">'+d.join("")+"</div></div>").appendTo(b)}var d=c.options,e,f=c.ticks||[],g=[],h,i=d.labelWidth,j=d.labelHeight,k;if(c.direction=="x"){if(i==null)i=Math.floor(r/(f.length>0?f.length:1));if(j==null){g=[];for(e=0;e<f.length;++e){h=f[e].label;if(h)g.push('<div class="tickLabel" style="float:left;width:'+i+'px">'+h+"</div>")}if(g.length>0){g.push('<div style="clear:left"></div>');k=l(g,"width:10000px;");j=k.height();k.remove()}}}else if(i==null||j==null){for(e=0;e<f.length;++e){h=f[e].label;if(h)g.push('<div class="tickLabel">'+h+"</div>")}if(g.length>0){k=l(g,"");if(i==null)i=k.children().width();if(j==null)j=k.find("div.tickLabel").height();k.remove()}}if(i==null)i=0;if(j==null)j=0;c.labelWidth=i;c.labelHeight=j}function P(a){function b(a){return a}var c,d,e=a.options.transform||b,f=a.options.inverseTransform;if(a.direction=="x"){c=a.scale=t/Math.abs(e(a.max)-e(a.min));d=Math.min(e(a.max),e(a.min))}else{c=a.scale=u/Math.abs(e(a.max)-e(a.min));c=-c;d=Math.max(e(a.max),e(a.min))}if(e==b)a.p2c=function(a){return(a-d)*c};else a.p2c=function(a){return(e(a)-d)*c};if(!f)a.c2p=function(a){return d+a/c};else a.c2p=function(a){return f(d+a/c)}}function O(){if(bk)clearTimeout(bk);l.unbind("mousemove",bm);l.unbind("mouseleave",bn);l.unbind("click",bo);x(v.shutdown,[l])}function N(){if(h.grid.hoverable){l.mousemove(bm);l.mouseleave(bn)}if(h.grid.clickable)l.click(bo);x(v.bindEvents,[l])}function M(){var c,d=b.children("canvas.base"),e=b.children("canvas.overlay");if(d.length==0||e==0){b.html("");b.css({padding:0});if(b.css("position")=="static")b.css("position","relative");K();j=J(true,"base");k=J(false,"overlay");c=false}else{j=d.get(0);k=e.get(0);c=true}m=j.getContext("2d");n=k.getContext("2d");l=a([k,j]);if(c){b.data("plot").shutdown();w.resize();n.clearRect(0,0,r,s);l.unbind();b.children().not([j,k]).remove()}b.data("plot",w)}function L(a){if(a.width!=r)a.width=r;if(a.height!=s)a.height=s;var b=a.getContext("2d");b.restore();b.save()}function K(){r=b.width();s=b.height();if(r<=0||s<=0)throw"Invalid dimensions for plot, width = "+r+", height = "+s}function J(c,d){var e=document.createElement("canvas");e.className=d;e.width=r;e.height=s;if(!c)a(e).css({position:"absolute",left:0,top:0});a(e).appendTo(b);if(!e.getContext)e=window.G_vmlCanvasManager.initElement(e);e.getContext("2d").save();return e}function I(){function t(a,b,c){if(b<a.datamin&&b!=-d)a.datamin=b;if(c>a.datamax&&c!=d)a.datamax=c}var b=Number.POSITIVE_INFINITY,c=Number.NEGATIVE_INFINITY,d=Number.MAX_VALUE,e,f,h,i,j,k,l,m,n,o,p,q,r,s;a.each(D(),function(a,d){d.datamin=b;d.datamax=c;d.used=false});for(e=0;e<g.length;++e){k=g[e];k.datapoints={points:[]};x(v.processRawData,[k,k.data,k.datapoints])}for(e=0;e<g.length;++e){k=g[e];var u=k.data,w=k.datapoints.format;if(!w){w=[];w.push({x:true,number:true,required:true});w.push({y:true,number:true,required:true});if(k.bars.show||k.lines.show&&k.lines.fill){w.push({y:true,number:true,required:false,defaultValue:0});if(k.bars.horizontal){delete w[w.length-1].y;w[w.length-1].x=true}}k.datapoints.format=w}if(k.datapoints.pointsize!=null)continue;k.datapoints.pointsize=w.length;m=k.datapoints.pointsize;l=k.datapoints.points;insertSteps=k.lines.show&&k.lines.steps;k.xaxis.used=k.yaxis.used=true;for(f=h=0;f<u.length;++f,h+=m){s=u[f];var y=s==null;if(!y){for(i=0;i<m;++i){q=s[i];r=w[i];if(r){if(r.number&&q!=null){q=+q;if(isNaN(q))q=null;else if(q==Infinity)q=d;else if(q==-Infinity)q=-d}if(q==null){if(r.required)y=true;if(r.defaultValue!=null)q=r.defaultValue}}l[h+i]=q}}if(y){for(i=0;i<m;++i){q=l[h+i];if(q!=null){r=w[i];if(r.x)t(k.xaxis,q,q);if(r.y)t(k.yaxis,q,q)}l[h+i]=null}}else{if(insertSteps&&h>0&&l[h-m]!=null&&l[h-m]!=l[h]&&l[h-m+1]!=l[h+1]){for(i=0;i<m;++i)l[h+m+i]=l[h+i];l[h+1]=l[h-m+1];h+=m}}}}for(e=0;e<g.length;++e){k=g[e];x(v.processDatapoints,[k,k.datapoints])}for(e=0;e<g.length;++e){k=g[e];l=k.datapoints.points,m=k.datapoints.pointsize;var z=b,A=b,B=c,C=c;for(f=0;f<l.length;f+=m){if(l[f]==null)continue;for(i=0;i<m;++i){q=l[f+i];r=w[i];if(!r||q==d||q==-d)continue;if(r.x){if(q<z)z=q;if(q>B)B=q}if(r.y){if(q<A)A=q;if(q>C)C=q}}}if(k.bars.show){var E=k.bars.align=="left"?0:-k.bars.barWidth/2;if(k.bars.horizontal){A+=E;C+=E+k.bars.barWidth}else{z+=E;B+=E+k.bars.barWidth}}t(k.xaxis,z,B);t(k.yaxis,A,C)}a.each(D(),function(a,d){if(d.datamin==b)d.datamin=null;if(d.datamax==c)d.datamax=null})}function H(){var b;var c=g.length,d=[],e=[];for(b=0;b<g.length;++b){var f=g[b].color;if(f!=null){--c;if(typeof f=="number")e.push(f);else d.push(a.color.parse(g[b].color))}}for(b=0;b<e.length;++b){c=Math.max(c,e[b]+1)}var i=[],j=0;b=0;while(i.length<c){var k;if(h.colors.length==b)k=a.color.make(100,100,100);else k=a.color.parse(h.colors[b]);var l=j%2==1?-1:1;k.scale("rgb",1+l*Math.ceil(j/2)*.2);i.push(k);++b;if(b>=h.colors.length){b=0;++j}}var m=0,n;for(b=0;b<g.length;++b){n=g[b];if(n.color==null){n.color=i[m].toString();++m}else if(typeof n.color=="number")n.color=i[n.color].toString();if(n.lines.show==null){var q,r=true;for(q in n)if(n[q]&&n[q].show){r=false;break}if(r)n.lines.show=true}n.xaxis=G(o,C(n,"x"));n.yaxis=G(p,C(n,"y"))}}function G(b,c){if(!b[c-1])b[c-1]={n:c,direction:b==o?"x":"y",options:a.extend(true,{},b==o?h.xaxis:h.yaxis)};return b[c-1]}function F(a){var b={},c,d,e;for(c=0;c<o.length;++c){d=o[c];if(d&&d.used){e="x"+d.n;if(a[e]==null&&d.n==1)e="x";if(a[e]!=null){b.left=d.p2c(a[e]);break}}}for(c=0;c<p.length;++c){d=p[c];if(d&&d.used){e="y"+d.n;if(a[e]==null&&d.n==1)e="y";if(a[e]!=null){b.top=d.p2c(a[e]);break}}}return b}function E(a){var b={},c,d;for(c=0;c<o.length;++c){d=o[c];if(d&&d.used)b["x"+d.n]=d.c2p(a.left)}for(c=0;c<p.length;++c){d=p[c];if(d&&d.used)b["y"+d.n]=d.c2p(a.top)}if(b.x1!==undefined)b.x=b.x1;if(b.y1!==undefined)b.y=b.y1;return b}function D(){return a.grep(o.concat(p),function(a){return a})}function C(a,b){var c=a[b+"axis"];if(typeof c=="object")c=c.n;if(typeof c!="number")c=1;return c}function B(b){var c=[];for(var d=0;d<b.length;++d){var e=a.extend(true,{},h.series);if(b[d].data!=null){e.data=b[d].data;delete b[d].data;a.extend(true,e,b[d]);b[d].data=e.data}else e.data=b[d];c.push(e)}return c}function A(a){g=B(a);H();I()}function z(b){var c;a.extend(true,h,b);if(h.xaxis.color==null)h.xaxis.color=h.grid.color;if(h.yaxis.color==null)h.yaxis.color=h.grid.color;if(h.xaxis.tickColor==null)h.xaxis.tickColor=h.grid.tickColor;if(h.yaxis.tickColor==null)h.yaxis.tickColor=h.grid.tickColor;if(h.grid.borderColor==null)h.grid.borderColor=h.grid.color;if(h.grid.tickColor==null)h.grid.tickColor=a.color.parse(h.grid.color).scale("a",.22).toString();for(c=0;c<Math.max(1,h.xaxes.length);++c)h.xaxes[c]=a.extend(true,{},h.xaxis,h.xaxes[c]);for(c=0;c<Math.max(1,h.yaxes.length);++c)h.yaxes[c]=a.extend(true,{},h.yaxis,h.yaxes[c]);if(h.xaxis.noTicks&&h.xaxis.ticks==null)h.xaxis.ticks=h.xaxis.noTicks;if(h.yaxis.noTicks&&h.yaxis.ticks==null)h.yaxis.ticks=h.yaxis.noTicks;if(h.x2axis){h.xaxes[1]=a.extend(true,{},h.xaxis,h.x2axis);h.xaxes[1].position="top"}if(h.y2axis){h.yaxes[1]=a.extend(true,{},h.yaxis,h.y2axis);h.yaxes[1].position="right"}if(h.grid.coloredAreas)h.grid.markings=h.grid.coloredAreas;if(h.grid.coloredAreasColor)h.grid.markingsColor=h.grid.coloredAreasColor;if(h.lines)a.extend(true,h.series.lines,h.lines);if(h.points)a.extend(true,h.series.points,h.points);if(h.bars)a.extend(true,h.series.bars,h.bars);if(h.shadowSize!=null)h.series.shadowSize=h.shadowSize;for(c=0;c<h.xaxes.length;++c)G(o,c+1).options=h.xaxes[c];for(c=0;c<h.yaxes.length;++c)G(p,c+1).options=h.yaxes[c];for(var d in v)if(h.hooks[d]&&h.hooks[d].length)v[d]=v[d].concat(h.hooks[d]);x(v.processOptions,[h])}function y(){for(var b=0;b<f.length;++b){var c=f[b];c.init(w);if(c.options)a.extend(true,h,c.options)}}function x(a,b){b=[w].concat(b);for(var c=0;c<a.length;++c)a[c].apply(this,b)}var g=[],h={colors:["#4D585A","#90C3B2","#D64F49","#3B8686","#0B486B"],legend:{show:true,noColumns:1,labelFormatter:null,labelBoxBorderColor:"#ccc",container:null,position:"ne",margin:5,backgroundColor:null,backgroundOpacity:.85},xaxis:{show:null,position:"bottom",mode:null,color:null,tickColor:null,transform:null,inverseTransform:null,min:null,max:null,autoscaleMargin:null,ticks:null,tickFormatter:null,labelWidth:null,labelHeight:null,reserveSpace:null,tickLength:null,alignTicksWithAxis:null,tickDecimals:null,tickSize:null,minTickSize:null,monthNames:null,timeformat:null,twelveHourClock:false},yaxis:{autoscaleMargin:.02,position:"left"},xaxes:[],yaxes:[],series:{points:{show:false,radius:3,lineWidth:2,fill:true,fillColor:"#ffffff",symbol:"circle"},lines:{lineWidth:1,fill:false,fillColor:null,steps:false},bars:{show:false,lineWidth:2,barWidth:1,fill:true,fillColor:null,align:"left",horizontal:false},shadowSize:0},grid:{show:true,aboveData:false,color:"#999",backgroundColor:null,borderColor:null,tickColor:null,labelMargin:5,axisMargin:8,borderWidth:1,minBorderMargin:null,markings:null,markingsColor:"#f4f4f4",markingsLineWidth:2,clickable:false,hoverable:false,autoHighlight:true,mouseActiveRadius:10},hooks:{}},j=null,k=null,l=null,m=null,n=null,o=[],p=[],q={left:0,right:0,top:0,bottom:0},r=0,s=0,t=0,u=0,v={processOptions:[],processRawData:[],processDatapoints:[],drawSeries:[],draw:[],bindEvents:[],drawOverlay:[],shutdown:[]},w=this;w.setData=A;w.setupGrid=T;w.draw=Y;w.getPlaceholder=function(){return b};w.getCanvas=function(){return j};w.getPlotOffset=function(){return q};w.width=function(){return t};w.height=function(){return u};w.offset=function(){var a=l.offset();a.left+=q.left;a.top+=q.top;return a};w.getData=function(){return g};w.getAxes=function(){var b={},c;a.each(o.concat(p),function(a,c){if(c)b[c.direction+(c.n!=1?c.n:"")+"axis"]=c});return b};w.getXAxes=function(){return o};w.getYAxes=function(){return p};w.c2p=E;w.p2c=F;w.getOptions=function(){return h};w.highlight=bs;w.unhighlight=bt;w.triggerRedrawOverlay=bq;w.pointOffset=function(a){return{left:parseInt(o[C(a,"x")-1].p2c(+a.x)+q.left),top:parseInt(p[C(a,"y")-1].p2c(+a.y)+q.top)}};w.shutdown=O;w.resize=function(){K();L(j);L(k)};w.hooks=v;y(w);z(e);M();A(d);T();Y();N();var bj=[],bk=null}a.plot=function(c,d,e){var f=new b(a(c),d,e,a.plot.plugins);return f};a.plot.version="0.7";a.plot.plugins=[];a.plot.formatDate=function(a,b,c){var d=function(a){a=""+a;return a.length==1?"0"+a:a};var e=[];var f=false,g=false;var h=a.getUTCHours();var i=h<12;if(c==null)c=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];if(b.search(/%p|%P/)!=-1){if(h>12){h=h-12}else if(h==0){h=12}}for(var j=0;j<b.length;++j){var k=b.charAt(j);if(f){switch(k){case"h":k=""+h;break;case"H":k=d(h);break;case"M":k=d(a.getUTCMinutes());break;case"S":k=d(a.getUTCSeconds());break;case"d":k=""+a.getUTCDate();break;case"m":k=""+(a.getUTCMonth()+1);break;case"y":k=""+a.getUTCFullYear();break;case"b":k=""+c[a.getUTCMonth()];break;case"p":k=i?""+"am":""+"pm";break;case"P":k=i?""+"AM":""+"PM";break;case"0":k="";g=true;break}if(k&&g){k=d(k);g=false}e.push(k);if(!g)f=false}else{if(k=="%")f=true;else e.push(k)}}return e.join("")}})(jQuery);

// Curved lines
(function(a){function c(b){function f(a,b){var c=b.curvePointFactor*a.length;var d=new Array;var e=new Array;if(b.fit){var f=b.fitPointDist;var g=0;for(var h=0;h<a.length;h++){d[g]=a[h][0]-.1;if(h>0){e[g]=a[h-1][1]*f+a[h][1]*(1-f)}else{e[g]=a[h][1]}g++;d[g]=a[h][0];e[g]=a[h][1];g++;d[g]=a[h][0]+.1;if(h+1<a.length){e[g]=a[h+1][1]*f+a[h][1]*(1-f)}else{e[g]=a[h][1]}g++}}else{for(var h=0;h<a.length;h++){d[h]=a[h][0];e[h]=a[h][1]}}var i=d.length;var j=new Array;var k=new Array;j[0]=0;j[i-1]=0;k[0]=0;for(var h=1;h<i-1;++h){var l=d[h+1]-d[h-1];if(l==0){return null}var m=(d[h]-d[h-1])/l;var n=m*j[h-1]+2;j[h]=(m-1)/n;k[h]=(e[h+1]-e[h])/(d[h+1]-d[h])-(e[h]-e[h-1])/(d[h]-d[h-1]);k[h]=(6*k[h]/(d[h+1]-d[h-1])-m*k[h-1])/n}for(var g=i-2;g>=0;--g){j[g]=j[g]*j[g+1]+k[g]}var o=(d[i-1]-d[0])/(c-1);var p=new Array;var q=new Array;var r=new Array;p[0]=d[0];q[0]=e[0];for(g=1;g<c;++g){p[g]=p[0]+g*o;var s=i-1;var t=0;while(s-t>1){var u=Math.round((s+t)/2);if(d[u]>p[g]){s=u}else{t=u}}var v=d[s]-d[t];if(v==0){return null}var w=(d[s]-p[g])/v;var x=(p[g]-d[t])/v;q[g]=w*e[t]+x*e[s]+((w*w*w-w)*j[t]+(x*x*x-x)*j[s])*v*v/6;r.push(p[g]);r.push(q[g])}return r}function e(a,b,c,d,e){var f=2;var g=null;var h=null;var i=0;a.beginPath();for(var j=f;j<b.length;j+=f){var k=b[j-f],l=b[j-f+1];var m=b[j],n=b[j+1];if(k==null||m==null)continue;if(l<=n&&l<d.min){if(n<d.min)continue;k=(d.min-l)/(n-l)*(m-k)+k;l=d.min}else if(n<=l&&n<d.min){if(l<d.min)continue;m=(d.min-l)/(n-l)*(m-k)+k;n=d.min}if(l>=n&&l>d.max){if(n>d.max)continue;k=(d.max-l)/(n-l)*(m-k)+k;l=d.max}else if(n>=l&&n>d.max){if(l>d.max)continue;m=(d.max-l)/(n-l)*(m-k)+k;n=d.max}if(k<=m&&k<c.min){if(m<c.min)continue;l=(c.min-k)/(m-k)*(n-l)+l;k=c.min}else if(m<=k&&m<c.min){if(k<c.min)continue;n=(c.min-k)/(m-k)*(n-l)+l;m=c.min}if(k>=m&&k>c.max){if(m>c.max)continue;l=(c.max-k)/(m-k)*(n-l)+l;k=c.max}else if(m>=k&&m>c.max){if(k>c.max)continue;n=(c.max-k)/(m-k)*(n-l)+l;m=c.max}if(k!=g||l!=h)a.lineTo(c.p2c(k),d.p2c(l));if(g==null){i=n}g=m;h=n;a.lineTo(c.p2c(m),d.p2c(n))}if(e){a.lineTo(c.p2c(c.max),d.p2c(d.min));a.lineTo(c.p2c(c.min),d.p2c(d.min));a.lineTo(c.p2c(c.min),d.p2c(i));a.fill()}a.stroke()}function d(b,c){var d;var g=b.getData();var h=b.getPlotOffset();for(var i=0;i<g.length;i++){d=g[i];if(d.curvedLines.show&&d.curvedLines.lineWidth>0){axisx=d.xaxis;axisy=d.yaxis;c.save();c.translate(h.left,h.top);c.lineJoin="round";c.strokeStyle=d.color;if(d.curvedLines.fill){var j=d.curvedLines.fillColor==null?d.color:d.curvedLines.fillColor;var k=a.color.parse(j);k.a=typeof fill=="number"?fill:.4;k.normalize();c.fillStyle=k.toString()}c.lineWidth=d.curvedLines.lineWidth;var l=f(d.data,d.curvedLines);e(c,l,axisx,axisy,d.curvedLines.fill);c.restore()}}}function c(a,b){if(b.series.curvedLines.active){a.hooks.draw.push(d)}}b.hooks.processOptions.push(c)}var b={series:{curvedLines:{active:false,show:false,fit:false,fill:false,fillColor:null,lineWidth:2,curvePointFactor:20,fitPointDist:1e-4}}};a.plot.plugins.push({init:c,options:b,name:"curvedLines",version:"0.2"})})(jQuery);

// Cross hair
(function(b){var a={crosshair:{mode:null,color:"rgba(170, 0, 0, 0.80)",lineWidth:1}};function c(h){var j={x:-1,y:-1,locked:false};h.setCrosshair=function e(l){if(!l){j.x=-1}else{var k=h.p2c(l);j.x=Math.max(0,Math.min(k.left,h.width()));j.y=Math.max(0,Math.min(k.top,h.height()))}h.triggerRedrawOverlay()};h.clearCrosshair=h.setCrosshair;h.lockCrosshair=function f(k){if(k){h.setCrosshair(k)}j.locked=true};h.unlockCrosshair=function g(){j.locked=false};function d(k){if(j.locked){return}if(j.x!=-1){j.x=-1;h.triggerRedrawOverlay()}}function i(k){if(j.locked){return}if(h.getSelection&&h.getSelection()){j.x=-1;return}var l=h.offset();j.x=Math.max(0,Math.min(k.pageX-l.left,h.width()));j.y=Math.max(0,Math.min(k.pageY-l.top,h.height()));h.triggerRedrawOverlay()}h.hooks.bindEvents.push(function(l,k){if(!l.getOptions().crosshair.mode){return}k.mouseout(d);k.mousemove(i)});h.hooks.drawOverlay.push(function(m,k){var n=m.getOptions().crosshair;if(!n.mode){return}var l=m.getPlotOffset();k.save();k.translate(l.left,l.top);if(j.x!=-1){k.strokeStyle=n.color;k.lineWidth=n.lineWidth;k.lineJoin="round";k.beginPath();if(n.mode.indexOf("x")!=-1){k.moveTo(j.x,0);k.lineTo(j.x,m.height())}if(n.mode.indexOf("y")!=-1){k.moveTo(0,j.y);k.lineTo(m.width(),j.y)}k.stroke()}k.restore()});h.hooks.shutdown.push(function(l,k){k.unbind("mouseout",d);k.unbind("mousemove",i)})}b.plot.plugins.push({init:c,options:a,name:"crosshair",version:"1.0"})})(jQuery);

// Fill between
(function(b){var a={series:{fillBetween:null}};function c(f){function d(j,h){var g;for(g=0;g<h.length;++g){if(h[g].id==j.fillBetween){return h[g]}}if(typeof j.fillBetween=="number"){g=j.fillBetween;if(g<0||g>=h.length){return null}return h[g]}return null}function e(B,u,g){if(u.fillBetween==null){return}var p=d(u,B.getData());if(!p){return}var y=g.pointsize,E=g.points,h=p.datapoints.pointsize,x=p.datapoints.points,r=[],w,v,k,G,F,q,t=u.lines.show,o=y>2&&g.format[2].y,n=t&&u.lines.steps,D=true,C=0,A=0,z;while(true){if(C>=E.length){break}z=r.length;if(E[C]==null){for(m=0;m<y;++m){r.push(E[C+m])}C+=y}else{if(A>=x.length){if(!t){for(m=0;m<y;++m){r.push(E[C+m])}}C+=y}else{if(x[A]==null){for(m=0;m<y;++m){r.push(null)}D=true;A+=h}else{w=E[C];v=E[C+1];G=x[A];F=x[A+1];q=0;if(w==G){for(m=0;m<y;++m){r.push(E[C+m])}q=F;C+=y;A+=h}else{if(w>G){if(t&&C>0&&E[C-y]!=null){k=v+(E[C-y+1]-v)*(G-w)/(E[C-y]-w);r.push(G);r.push(k);for(m=2;m<y;++m){r.push(E[C+m])}q=F}A+=h}else{if(D&&t){C+=y;continue}for(m=0;m<y;++m){r.push(E[C+m])}if(t&&A>0&&x[A-h]!=null){q=F+(x[A-h+1]-F)*(w-G)/(x[A-h]-G)}C+=y}}D=false;if(z!=r.length&&o){r[z+2]=q}}}}if(n&&z!=r.length&&z>0&&r[z]!=null&&r[z]!=r[z-y]&&r[z+1]!=r[z-y+1]){for(m=0;m<y;++m){r[z+y+m]=r[z+m]}r[z+1]=r[z-y+1]}}g.points=r}f.hooks.processDatapoints.push(e)}b.plot.plugins.push({init:c,options:a,name:"fillbetween",version:"1.0"})})(jQuery);

// Navigate

(function(i){i.fn.drag=function(j,k,l){if(k){this.bind("dragstart",j)}if(l){this.bind("dragend",l)}return !j?this.trigger("drag"):this.bind("drag",k?k:j)};var d=i.event,c=d.special,h=c.drag={not:":input",distance:0,which:1,dragging:false,setup:function(j){j=i.extend({distance:h.distance,which:h.which,not:h.not},j||{});j.distance=e(j.distance);d.add(this,"mousedown",f,j);if(this.attachEvent){this.attachEvent("ondragstart",a)}},teardown:function(){d.remove(this,"mousedown",f);if(this===h.dragging){h.dragging=h.proxy=false}g(this,true);if(this.detachEvent){this.detachEvent("ondragstart",a)}}};c.dragstart=c.dragend={setup:function(){},teardown:function(){}};function f(j){var k=this,l,m=j.data||{};if(m.elem){k=j.dragTarget=m.elem;j.dragProxy=h.proxy||k;j.cursorOffsetX=m.pageX-m.left;j.cursorOffsetY=m.pageY-m.top;j.offsetX=j.pageX-j.cursorOffsetX;j.offsetY=j.pageY-j.cursorOffsetY}else{if(h.dragging||(m.which>0&&j.which!=m.which)||i(j.target).is(m.not)){return}}switch(j.type){case"mousedown":i.extend(m,i(k).offset(),{elem:k,target:j.target,pageX:j.pageX,pageY:j.pageY});d.add(document,"mousemove mouseup",f,m);g(k,false);h.dragging=null;return false;case !h.dragging&&"mousemove":if(e(j.pageX-m.pageX)+e(j.pageY-m.pageY)<m.distance){break}j.target=m.target;l=b(j,"dragstart",k);if(l!==false){h.dragging=k;h.proxy=j.dragProxy=i(l||k)[0]}case"mousemove":if(h.dragging){l=b(j,"drag",k);if(c.drop){c.drop.allowed=(l!==false);c.drop.handler(j)}if(l!==false){break}j.type="mouseup"}case"mouseup":d.remove(document,"mousemove mouseup",f);if(h.dragging){if(c.drop){c.drop.handler(j)}b(j,"dragend",k)}g(k,true);h.dragging=h.proxy=m.elem=false;break}return true}function b(m,k,j){m.type=k;var l=i.event.handle.call(j,m);return l===false?false:l||m.result}function e(j){return Math.pow(j,2)}function a(){return(h.dragging===false)}function g(j,k){if(!j){return}j.unselectable=k?"off":"on";j.onselectstart=function(){return k};if(j.style){j.style.MozUserSelect=k?"":"none"}}})(jQuery);(function(f){var e=["DOMMouseScroll","mousewheel"];f.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var a=e.length;a;){this.addEventListener(e[--a],d,false)}}else{this.onmousewheel=d}},teardown:function(){if(this.removeEventListener){for(var a=e.length;a;){this.removeEventListener(e[--a],d,false)}}else{this.onmousewheel=null}}};f.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}});function d(b){var h=[].slice.call(arguments,1),a=0,c=true;b=f.event.fix(b||window.event);b.type="mousewheel";if(b.wheelDelta){a=b.wheelDelta/120}if(b.detail){a=-b.detail/3}h.unshift(b,a);return f.event.handle.apply(this,h)}})(jQuery);(function(b){var a={xaxis:{zoomRange:null,panRange:null},zoom:{interactive:false,trigger:"dblclick",amount:1.5},pan:{interactive:false,cursor:"move",frameRate:20}};function c(o){function m(q,p){var r=o.offset();r.left=q.pageX-r.left;r.top=q.pageY-r.top;if(p){o.zoomOut({center:r})}else{o.zoom({center:r})}}function d(p,q){m(p,q<0);return false}var i="default",g=0,e=0,n=null;function f(p){if(p.which!=1){return false}var q=o.getPlaceholder().css("cursor");if(q){i=q}o.getPlaceholder().css("cursor",o.getOptions().pan.cursor);g=p.pageX;e=p.pageY}function j(q){var p=o.getOptions().pan.frameRate;if(n||!p){return}n=setTimeout(function(){o.pan({left:g-q.pageX,top:e-q.pageY});g=q.pageX;e=q.pageY;n=null},1/p*1000)}function h(p){if(n){clearTimeout(n);n=null}o.getPlaceholder().css("cursor",i);o.pan({left:g-p.pageX,top:e-p.pageY})}function l(q,p){var r=q.getOptions();if(r.zoom.interactive){p[r.zoom.trigger](m);p.mousewheel(d)}if(r.pan.interactive){p.bind("dragstart",{distance:10},f);p.bind("drag",j);p.bind("dragend",h)}}o.zoomOut=function(p){if(!p){p={}}if(!p.amount){p.amount=o.getOptions().zoom.amount}p.amount=1/p.amount;o.zoom(p)};o.zoom=function(q){if(!q){q={}}var x=q.center,r=q.amount||o.getOptions().zoom.amount,p=o.width(),t=o.height();if(!x){x={left:p/2,top:t/2}}var s=x.left/p,v=x.top/t,u={x:{min:x.left-s*p/r,max:x.left+(1-s)*p/r},y:{min:x.top-v*t/r,max:x.top+(1-v)*t/r}};b.each(o.getAxes(),function(z,C){var D=C.options,B=u[C.direction].min,w=u[C.direction].max,E=D.zoomRange;if(E===false){return}B=C.c2p(B);w=C.c2p(w);if(B>w){var A=B;B=w;w=A}var y=w-B;if(E&&((E[0]!=null&&y<E[0])||(E[1]!=null&&y>E[1]))){return}D.min=B;D.max=w});o.setupGrid();o.draw();if(!q.preventEvent){o.getPlaceholder().trigger("plotzoom",[o])}};o.pan=function(p){var q={x:+p.left,y:+p.top};if(isNaN(q.x)){q.x=0}if(isNaN(q.y)){q.y=0}b.each(o.getAxes(),function(s,u){var v=u.options,t,r,w=q[u.direction];t=u.c2p(u.p2c(u.min)+w),r=u.c2p(u.p2c(u.max)+w);var x=v.panRange;if(x===false){return}if(x){if(x[0]!=null&&x[0]>t){w=x[0]-t;t+=w;r+=w}if(x[1]!=null&&x[1]<r){w=x[1]-r;t+=w;r+=w}}v.min=t;v.max=r});o.setupGrid();o.draw();if(!p.preventEvent){o.getPlaceholder().trigger("plotpan",[o])}};function k(q,p){p.unbind(q.getOptions().zoom.trigger,m);p.unbind("mousewheel",d);p.unbind("dragstart",f);p.unbind("drag",j);p.unbind("dragend",h);if(n){clearTimeout(n)}}o.hooks.bindEvents.push(l);o.hooks.shutdown.push(k)}b.plot.plugins.push({init:c,options:a,name:"navigate",version:"1.3"})})(jQuery);

// Pie

(function(b){function c(D){var h=null;var L=null;var n=null;var B=null;var p=null;var M=0;var F=true;var o=10;var w=0.95;var A=0;var d=false;var z=false;var j=[];D.hooks.processOptions.push(g);D.hooks.bindEvents.push(e);function g(O,N){if(N.series.pie.show){N.grid.show=false;if(N.series.pie.label.show=="auto"){if(N.legend.show){N.series.pie.label.show=false}else{N.series.pie.label.show=true}}if(N.series.pie.radius=="auto"){if(N.series.pie.label.show){N.series.pie.radius=3/4}else{N.series.pie.radius=1}}if(N.series.pie.tilt>1){N.series.pie.tilt=1}if(N.series.pie.tilt<0){N.series.pie.tilt=0}O.hooks.processDatapoints.push(E);O.hooks.drawOverlay.push(H);O.hooks.draw.push(r)}}function e(P,N){var O=P.getOptions();if(O.series.pie.show&&O.grid.hoverable){N.unbind("mousemove").mousemove(t)}if(O.series.pie.show&&O.grid.clickable){N.unbind("click").click(l)}}function G(O){var P="";function N(S,T){if(!T){T=0}for(var R=0;R<S.length;++R){for(var Q=0;Q<T;Q++){P+="\t"}if(typeof S[R]=="object"){P+=""+R+":\n";N(S[R],T+1)}else{P+=""+R+": "+S[R]+"\n"}}}N(O);alert(P)}function q(P){for(var N=0;N<P.length;++N){var O=parseFloat(P[N].data[0][1]);if(O){M+=O}}}function E(Q,N,O,P){if(!d){d=true;h=Q.getCanvas();L=b(h).parent();a=Q.getOptions();Q.setData(K(Q.getData()))}}function I(){A=L.children().filter(".legend").children().width();n=Math.min(h.width,(h.height/a.series.pie.tilt))/2;p=(h.height/2)+a.series.pie.offset.top;B=(h.width/2);if(a.series.pie.offset.left=="auto"){if(a.legend.position.match("w")){B+=A/2}else{B-=A/2}}else{B+=a.series.pie.offset.left}if(B<n){B=n}else{if(B>h.width-n){B=h.width-n}}}function v(O){for(var N=0;N<O.length;++N){if(typeof(O[N].data)=="number"){O[N].data=[[1,O[N].data]]}else{if(typeof(O[N].data)=="undefined"||typeof(O[N].data[0])=="undefined"){if(typeof(O[N].data)!="undefined"&&typeof(O[N].data.label)!="undefined"){O[N].label=O[N].data.label}O[N].data=[[1,0]]}}}return O}function K(Q){Q=v(Q);q(Q);var P=0;var S=0;var N=a.series.pie.combine.color;var R=[];for(var O=0;O<Q.length;++O){Q[O].data[0][1]=parseFloat(Q[O].data[0][1]);if(!Q[O].data[0][1]){Q[O].data[0][1]=0}if(Q[O].data[0][1]/M<=a.series.pie.combine.threshold){P+=Q[O].data[0][1];S++;if(!N){N=Q[O].color}}else{R.push({data:[[1,Q[O].data[0][1]]],color:Q[O].color,label:Q[O].label,angle:(Q[O].data[0][1]*(Math.PI*2))/M,percent:(Q[O].data[0][1]/M*100)})}}if(S>0){R.push({data:[[1,P]],color:N,label:a.series.pie.combine.label,angle:(P*(Math.PI*2))/M,percent:(P/M*100)})}return R}function r(S,Q){if(!L){return}ctx=Q;I();var T=S.getData();var P=0;while(F&&P<o){F=false;if(P>0){n*=w}P+=1;N();if(a.series.pie.tilt<=0.8){O()}R()}if(P>=o){N();L.prepend('<div class="error">Could not draw pie with labels contained inside canvas</div>')}if(S.setSeries&&S.insertLegend){S.setSeries(T);S.insertLegend()}function N(){ctx.clearRect(0,0,h.width,h.height);L.children().filter(".pieLabel, .pieLabelBackground").remove()}function O(){var Z=5;var Y=15;var W=10;var X=0.02;if(a.series.pie.radius>1){var U=a.series.pie.radius}else{var U=n*a.series.pie.radius}if(U>=(h.width/2)-Z||U*a.series.pie.tilt>=(h.height/2)-Y||U<=W){return}ctx.save();ctx.translate(Z,Y);ctx.globalAlpha=X;ctx.fillStyle="#000";ctx.translate(B,p);ctx.scale(1,a.series.pie.tilt);for(var V=1;V<=W;V++){ctx.beginPath();ctx.arc(0,0,U,0,Math.PI*2,false);ctx.fill();U-=V}ctx.restore()}function R(){startAngle=Math.PI*a.series.pie.startAngle;if(a.series.pie.radius>1){var U=a.series.pie.radius}else{var U=n*a.series.pie.radius}ctx.save();ctx.translate(B,p);ctx.scale(1,a.series.pie.tilt);ctx.save();var Y=startAngle;for(var W=0;W<T.length;++W){T[W].startAngle=Y;X(T[W].angle,T[W].color,true)}ctx.restore();ctx.save();ctx.lineWidth=a.series.pie.stroke.width;Y=startAngle;for(var W=0;W<T.length;++W){X(T[W].angle,a.series.pie.stroke.color,false)}ctx.restore();J(ctx);if(a.series.pie.label.show){V()}ctx.restore();function X(ab,Z,aa){if(ab<=0){return}if(aa){ctx.fillStyle=Z}else{ctx.strokeStyle=Z;ctx.lineJoin="round"}ctx.beginPath();if(Math.abs(ab-Math.PI*2)>1e-9){ctx.moveTo(0,0)}else{if(b.browser.msie){ab-=0.0001}}ctx.arc(0,0,U,Y,Y+ab,false);ctx.closePath();Y+=ab;if(aa){ctx.fill()}else{ctx.stroke()}}function V(){var ac=startAngle;if(a.series.pie.label.radius>1){var Z=a.series.pie.label.radius}else{var Z=n*a.series.pie.label.radius}for(var ab=0;ab<T.length;++ab){if(T[ab].percent>=a.series.pie.label.threshold*100){aa(T[ab],ac,ab)}ac+=T[ab].angle}function aa(ap,ai,ag){if(ap.data[0][1]==0){return}var ar=a.legend.labelFormatter,aq,ae=a.series.pie.label.formatter;if(ar){aq=ar(ap.label,ap)}else{aq=ap.label}if(ae){aq=ae(aq,ap)}var aj=((ai+ap.angle)+ai)/2;var ao=B+Math.round(Math.cos(aj)*Z);var am=p+Math.round(Math.sin(aj)*Z)*a.series.pie.tilt;var af='<span class="pieLabel" id="pieLabel'+ag+'" style="position:absolute;top:'+am+"px;left:"+ao+'px;">'+aq+"</span>";L.append(af);var an=L.children("#pieLabel"+ag);var ad=(am-an.height()/2);var ah=(ao-an.width()/2);an.css("top",ad);an.css("left",ah);if(0-ad>0||0-ah>0||h.height-(ad+an.height())<0||h.width-(ah+an.width())<0){F=true}if(a.series.pie.label.background.opacity!=0){var ak=a.series.pie.label.background.color;if(ak==null){ak=ap.color}var al="top:"+ad+"px;left:"+ah+"px;";b('<div class="pieLabelBackground" style="position:absolute;width:'+an.width()+"px;height:"+an.height()+"px;"+al+"background-color:"+ak+';"> </div>').insertBefore(an).css("opacity",a.series.pie.label.background.opacity)}}}}}function J(N){if(a.series.pie.innerRadius>0){N.save();innerRadius=a.series.pie.innerRadius>1?a.series.pie.innerRadius:n*a.series.pie.innerRadius;N.globalCompositeOperation="destination-out";N.beginPath();N.fillStyle=a.series.pie.stroke.color;N.arc(0,0,innerRadius,0,Math.PI*2,false);N.fill();N.closePath();N.restore();N.save();N.beginPath();N.strokeStyle=a.series.pie.stroke.color;N.arc(0,0,innerRadius,0,Math.PI*2,false);N.stroke();N.closePath();N.restore()}}function s(Q,R){for(var S=false,P=-1,N=Q.length,O=N-1;++P<N;O=P){((Q[P][1]<=R[1]&&R[1]<Q[O][1])||(Q[O][1]<=R[1]&&R[1]<Q[P][1]))&&(R[0]<(Q[O][0]-Q[P][0])*(R[1]-Q[P][1])/(Q[O][1]-Q[P][1])+Q[P][0])&&(S=!S)}return S}function u(R,P){var T=D.getData(),O=D.getOptions(),N=O.series.pie.radius>1?O.series.pie.radius:n*O.series.pie.radius;for(var Q=0;Q<T.length;++Q){var S=T[Q];if(S.pie.show){ctx.save();ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,N,S.startAngle,S.startAngle+S.angle,false);ctx.closePath();x=R-B;y=P-p;if(ctx.isPointInPath){if(ctx.isPointInPath(R-B,P-p)){ctx.restore();return{datapoint:[S.percent,S.data],dataIndex:0,series:S,seriesIndex:Q}}}else{p1X=(N*Math.cos(S.startAngle));p1Y=(N*Math.sin(S.startAngle));p2X=(N*Math.cos(S.startAngle+(S.angle/4)));p2Y=(N*Math.sin(S.startAngle+(S.angle/4)));p3X=(N*Math.cos(S.startAngle+(S.angle/2)));p3Y=(N*Math.sin(S.startAngle+(S.angle/2)));p4X=(N*Math.cos(S.startAngle+(S.angle/1.5)));p4Y=(N*Math.sin(S.startAngle+(S.angle/1.5)));p5X=(N*Math.cos(S.startAngle+S.angle));p5Y=(N*Math.sin(S.startAngle+S.angle));arrPoly=[[0,0],[p1X,p1Y],[p2X,p2Y],[p3X,p3Y],[p4X,p4Y],[p5X,p5Y]];arrPoint=[x,y];if(s(arrPoly,arrPoint)){ctx.restore();return{datapoint:[S.percent,S.data],dataIndex:0,series:S,seriesIndex:Q}}}ctx.restore()}}return null}function t(N){m("plothover",N)}function l(N){m("plotclick",N)}function m(N,T){var O=D.offset(),R=parseInt(T.pageX-O.left),P=parseInt(T.pageY-O.top),V=u(R,P);if(a.grid.autoHighlight){for(var Q=0;Q<j.length;++Q){var S=j[Q];if(S.auto==N&&!(V&&S.series==V.series)){f(S.series)}}}if(V){k(V.series,N)}var U={pageX:T.pageX,pageY:T.pageY};L.trigger(N,[U,V])}function k(O,P){if(typeof O=="number"){O=series[O]}var N=C(O);if(N==-1){j.push({series:O,auto:P});D.triggerRedrawOverlay()}else{if(!P){j[N].auto=false}}}function f(O){if(O==null){j=[];D.triggerRedrawOverlay()}if(typeof O=="number"){O=series[O]}var N=C(O);if(N!=-1){j.splice(N,1);D.triggerRedrawOverlay()}}function C(P){for(var N=0;N<j.length;++N){var O=j[N];if(O.series==P){return N}}return -1}function H(Q,R){var P=Q.getOptions();var N=P.series.pie.radius>1?P.series.pie.radius:n*P.series.pie.radius;R.save();R.translate(B,p);R.scale(1,P.series.pie.tilt);for(i=0;i<j.length;++i){O(j[i].series)}J(R);R.restore();function O(S){if(S.angle<0){return}R.fillStyle="rgba(255, 255, 255, "+P.series.pie.highlight.opacity+")";R.beginPath();if(Math.abs(S.angle-Math.PI*2)>1e-9){R.moveTo(0,0)}R.arc(0,0,N,S.startAngle,S.startAngle+S.angle,false);R.closePath();R.fill()}}}var a={series:{pie:{show:false,radius:"auto",innerRadius:0,startAngle:3/2,tilt:1,offset:{top:0,left:"auto"},stroke:{color:"#FFF",width:1},label:{show:"auto",formatter:function(d,e){return'<div style="font-size:x-small;text-align:center;padding:2px;color:'+e.color+';">'+d+"<br/>"+Math.round(e.percent)+"%</div>"},radius:1,background:{color:null,opacity:0},threshold:0},combine:{threshold:-1,color:null,label:"Other"},highlight:{opacity:0.5}}}};b.plot.plugins.push({init:c,options:a,name:"pie",version:"1.0"})})(jQuery);

// Resize
(function(n,p,u){var w=n([]),s=n.resize=n.extend(n.resize,{}),o,l="setTimeout",m="resize",t=m+"-special-event",v="delay",r="throttleWindow";s[v]=250;s[r]=true;n.event.special[m]={setup:function(){if(!s[r]&&this[l]){return false}var a=n(this);w=w.add(a);n.data(this,t,{w:a.width(),h:a.height()});if(w.length===1){q()}},teardown:function(){if(!s[r]&&this[l]){return false}var a=n(this);w=w.not(a);a.removeData(t);if(!w.length){clearTimeout(o)}},add:function(b){if(!s[r]&&this[l]){return false}var c;function a(d,h,g){var f=n(this),e=n.data(this,t);e.w=h!==u?h:f.width();e.h=g!==u?g:f.height();c.apply(this,arguments)}if(n.isFunction(b)){c=b;return a}else{c=b.handler;b.handler=a}}};function q(){o=p[l](function(){w.each(function(){var d=n(this),a=d.width(),b=d.height(),c=n.data(this,t);if(a!==c.w||b!==c.h){d.trigger(m,[c.w=a,c.h=b])}});q()},s[v])}})(jQuery,this);(function(b){var a={};function c(f){function e(){var h=f.getPlaceholder();if(h.width()==0||h.height()==0){return}f.resize();f.setupGrid();f.draw()}function g(i,h){i.getPlaceholder().resize(e)}function d(i,h){i.getPlaceholder().unbind("resize",e)}f.hooks.bindEvents.push(g);f.hooks.shutdown.push(d)}b.plot.plugins.push({init:c,options:a,name:"resize",version:"1.0"})})(jQuery);

// Selection
(function(a){function b(k){var p={first:{x:-1,y:-1},second:{x:-1,y:-1},show:false,active:false};var m={};var r=null;function e(s){if(p.active){l(s);k.getPlaceholder().trigger("plotselecting",[g()])}}function n(s){if(s.which!=1){return}document.body.focus();if(document.onselectstart!==undefined&&m.onselectstart==null){m.onselectstart=document.onselectstart;document.onselectstart=function(){return false}}if(document.ondrag!==undefined&&m.ondrag==null){m.ondrag=document.ondrag;document.ondrag=function(){return false}}d(p.first,s);p.active=true;r=function(t){j(t)};a(document).one("mouseup",r)}function j(s){r=null;if(document.onselectstart!==undefined){document.onselectstart=m.onselectstart}if(document.ondrag!==undefined){document.ondrag=m.ondrag}p.active=false;l(s);if(f()){i()}else{k.getPlaceholder().trigger("plotunselected",[]);k.getPlaceholder().trigger("plotselecting",[null])}return false}function g(){if(!f()){return null}var u={},t=p.first,s=p.second;a.each(k.getAxes(),function(v,w){if(w.used){var y=w.c2p(t[w.direction]),x=w.c2p(s[w.direction]);u[v]={from:Math.min(y,x),to:Math.max(y,x)}}});return u}function i(){var s=g();k.getPlaceholder().trigger("plotselected",[s]);if(s.xaxis&&s.yaxis){k.getPlaceholder().trigger("selected",[{x1:s.xaxis.from,y1:s.yaxis.from,x2:s.xaxis.to,y2:s.yaxis.to}])}}function h(t,u,s){return u<t?t:(u>s?s:u)}function d(w,t){var v=k.getOptions();var u=k.getPlaceholder().offset();var s=k.getPlotOffset();w.x=h(0,t.pageX-u.left-s.left,k.width());w.y=h(0,t.pageY-u.top-s.top,k.height());if(v.selection.mode=="y"){w.x=w==p.first?0:k.width()}if(v.selection.mode=="x"){w.y=w==p.first?0:k.height()}}function l(s){if(s.pageX==null){return}d(p.second,s);if(f()){p.show=true;k.triggerRedrawOverlay()}else{q(true)}}function q(s){if(p.show){p.show=false;k.triggerRedrawOverlay();if(!s){k.getPlaceholder().trigger("plotunselected",[])}}}function c(s,w){var t,y,z,A,x=k.getAxes();for(var u in x){t=x[u];if(t.direction==w){A=w+t.n+"axis";if(!s[A]&&t.n==1){A=w+"axis"}if(s[A]){y=s[A].from;z=s[A].to;break}}}if(!s[A]){t=w=="x"?k.getXAxes()[0]:k.getYAxes()[0];y=s[w+"1"];z=s[w+"2"]}if(y!=null&&z!=null&&y>z){var v=y;y=z;z=v}return{from:y,to:z,axis:t}}function o(t,s){var v,u,w=k.getOptions();if(w.selection.mode=="y"){p.first.x=0;p.second.x=k.width()}else{u=c(t,"x");p.first.x=u.axis.p2c(u.from);p.second.x=u.axis.p2c(u.to)}if(w.selection.mode=="x"){p.first.y=0;p.second.y=k.height()}else{u=c(t,"y");p.first.y=u.axis.p2c(u.from);p.second.y=u.axis.p2c(u.to)}p.show=true;k.triggerRedrawOverlay();if(!s&&f()){i()}}function f(){var s=5;return Math.abs(p.second.x-p.first.x)>=s&&Math.abs(p.second.y-p.first.y)>=s}k.clearSelection=q;k.setSelection=o;k.getSelection=g;k.hooks.bindEvents.push(function(t,s){var u=t.getOptions();if(u.selection.mode!=null){s.mousemove(e);s.mousedown(n)}});k.hooks.drawOverlay.push(function(v,D){if(p.show&&f()){var t=v.getPlotOffset();var s=v.getOptions();D.save();D.translate(t.left,t.top);var z=a.color.parse(s.selection.color);D.strokeStyle=z.scale("a",0.8).toString();D.lineWidth=1;D.lineJoin="round";D.fillStyle=z.scale("a",0.4).toString();var B=Math.min(p.first.x,p.second.x),A=Math.min(p.first.y,p.second.y),C=Math.abs(p.second.x-p.first.x),u=Math.abs(p.second.y-p.first.y);D.fillRect(B,A,C,u);D.strokeRect(B,A,C,u);D.restore()}});k.hooks.shutdown.push(function(t,s){s.unbind("mousemove",e);s.unbind("mousedown",n);if(r){a(document).unbind("mouseup",r)}})}a.plot.plugins.push({init:b,options:{selection:{mode:null,color:"#e8cfac"}},name:"selection",version:"1.1"})})(jQuery);

// Stack
(function(b){var a={series:{stack:null}};function c(f){function d(k,j){var h=null;for(var g=0;g<j.length;++g){if(k==j[g]){break}if(j[g].stack==k.stack){h=j[g]}}return h}function e(C,v,g){if(v.stack==null){return}var p=d(v,C.getData());if(!p){return}var z=g.pointsize,F=g.points,h=p.datapoints.pointsize,y=p.datapoints.points,t=[],x,w,k,J,I,r,u=v.lines.show,G=v.bars.horizontal,o=z>2&&(G?g.format[2].x:g.format[2].y),n=u&&v.lines.steps,E=true,q=G?1:0,H=G?0:1,D=0,B=0,A;while(true){if(D>=F.length){break}A=t.length;if(F[D]==null){for(m=0;m<z;++m){t.push(F[D+m])}D+=z}else{if(B>=y.length){if(!u){for(m=0;m<z;++m){t.push(F[D+m])}}D+=z}else{if(y[B]==null){for(m=0;m<z;++m){t.push(null)}E=true;B+=h}else{x=F[D+q];w=F[D+H];J=y[B+q];I=y[B+H];r=0;if(x==J){for(m=0;m<z;++m){t.push(F[D+m])}t[A+H]+=I;r=I;D+=z;B+=h}else{if(x>J){if(u&&D>0&&F[D-z]!=null){k=w+(F[D-z+H]-w)*(J-x)/(F[D-z+q]-x);t.push(J);t.push(k+I);for(m=2;m<z;++m){t.push(F[D+m])}r=I}B+=h}else{if(E&&u){D+=z;continue}for(m=0;m<z;++m){t.push(F[D+m])}if(u&&B>0&&y[B-h]!=null){r=I+(y[B-h+H]-I)*(x-J)/(y[B-h+q]-J)}t[A+H]+=r;D+=z}}E=false;if(A!=t.length&&o){t[A+2]+=r}}}}if(n&&A!=t.length&&A>0&&t[A]!=null&&t[A]!=t[A-z]&&t[A+1]!=t[A-z+1]){for(m=0;m<z;++m){t[A+z+m]=t[A+m]}t[A+1]=t[A-z+1]}}g.points=t}f.hooks.processDatapoints.push(e)}b.plot.plugins.push({init:c,options:a,name:"stack",version:"1.2"})})(jQuery);


// @PLUGIN Tags plugin by XOXCO - http://std.li/nD
(function($) {

	var delimiter = new Array();
	var tags_callbacks = new Array();
	$.fn.doAutosize = function(o){
	    var minWidth = $(this).data('minwidth'),
	        maxWidth = $(this).data('maxwidth'),
	        val = '',
	        input = $(this),
	        testSubject = $('#'+$(this).data('tester_id'));

	    if (val === (val = input.val())) {return;}

	    // Enter new content into testSubject
	    var escaped = val.replace(/&/g, '&amp;').replace(/\s/g,' ').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	    testSubject.html(escaped);
	    // Calculate new width + whether to change
	    var testerWidth = testSubject.width(),
	        newWidth = (testerWidth + o.comfortZone) >= minWidth ? testerWidth + o.comfortZone : minWidth,
	        currentWidth = input.width(),
	        isValidWidthChange = (newWidth < currentWidth && newWidth >= minWidth)
	                             || (newWidth > minWidth && newWidth < maxWidth);

	    // Animate width
	    if (isValidWidthChange) {
	        input.width(newWidth);
	    }


  };
  $.fn.resetAutosize = function(options){
    // alert(JSON.stringify(options));
    var minWidth =  $(this).data('minwidth') || options.minInputWidth || $(this).width(),
        maxWidth = $(this).data('maxwidth') || options.maxInputWidth || ($(this).closest('.tagsinput').width() - options.inputPadding),
        val = '',
        input = $(this),
        testSubject = $('<tester/>').css({
            position: 'absolute',
            top: -9999,
            left: -9999,
            width: 'auto',
            fontSize: input.css('fontSize'),
            fontFamily: input.css('fontFamily'),
            fontWeight: input.css('fontWeight'),
            letterSpacing: input.css('letterSpacing'),
            whiteSpace: 'nowrap'
        }),
        testerId = $(this).attr('id')+'_autosize_tester';
    if(! $('#'+testerId).length > 0){
      testSubject.attr('id', testerId);
      //testSubject.appendTo('body');
    }

    input.data('minwidth', minWidth);
    input.data('maxwidth', maxWidth);
    input.data('tester_id', testerId);
    input.css('width', minWidth);
  };
  
	$.fn.addTag = function(value,options) {
			options = jQuery.extend({focus:false,callback:true},options);
			this.each(function() { 
				var id = $(this).attr('id');

				var tagslist = $(this).val().split(delimiter[id]);
				if (tagslist[0] == '') { 
					tagslist = new Array();
				}

				value = jQuery.trim(value);

				if (options.unique) {
					var skipTag = $(tagslist).tagExist(value);
					if(skipTag == true) {
					    //Marks fake input as not_valid to let styling it
    				    $('#'+id+'_tag').addClass('not_valid');
    				}
				} else {
					var skipTag = false; 
				}

				if (value !='' && skipTag != true) { 
                    $('<span>').addClass('tag').append(
                        $('<span>').text(value).append('&nbsp;&nbsp;'),
                        $('<a>', {
                            href  : '#',
                            title : 'Removing tag',
                            text  : 'x'
                        }).click(function () {
                            return $('#' + id).removeTag(escape(value));
                        })
                    ).insertBefore('#' + id + '_addTag');

					tagslist.push(value);

					$('#'+id+'_tag').val('');
					if (options.focus) {
						$('#'+id+'_tag').focus();
					} else {		
						$('#'+id+'_tag').blur();
					}

					$.fn.tags.updateTagsField(this,tagslist);

					if (options.callback && tags_callbacks[id] && tags_callbacks[id]['onAddTag']) {
						var f = tags_callbacks[id]['onAddTag'];
						f.call(this, value);
					}
					if(tags_callbacks[id] && tags_callbacks[id]['onChange'])
					{
						var i = tagslist.length;
						var f = tags_callbacks[id]['onChange'];
						f.call(this, $(this), tagslist[i-1]);
					}					
				}

			});		

			return false;
		};

	$.fn.removeTag = function(value) { 
			value = unescape(value);
			this.each(function() { 
				var id = $(this).attr('id');

				var old = $(this).val().split(delimiter[id]);

				$('#'+id+'_tagsinput .tag').remove();
				str = '';
				for (i=0; i< old.length; i++) { 
					if (old[i]!=value) { 
						str = str + delimiter[id] +old[i];
					}
				}

				$.fn.tags.importTags(this,str);

				if (tags_callbacks[id] && tags_callbacks[id]['onRemoveTag']) {
					var f = tags_callbacks[id]['onRemoveTag'];
					f.call(this, value);
				}
			});

			return false;
		};

	$.fn.tagExist = function(val) {
		return (jQuery.inArray(val, $(this)) >= 0); //true when tag exists, false when not
	};

	// clear all existing tags and import new ones from a string
	$.fn.importTags = function(str) {
                id = $(this).attr('id');
		$('#'+id+'_tagsinput .tag').remove();
		$.fn.tags.importTags(this,str);
	}

	$.fn.tags = function(options) { 
    var settings = jQuery.extend({
      interactive:true,
      defaultText:'add a tag',
      minChars:0,
      width:'auto',
      height:'auto',
      autocomplete: {selectFirst: false },
      'hide':true,
      'delimiter':',',
      'unique':true,
      removeWithBackspace:true,
      placeholderColor:'#666666',
      autosize: true,
      comfortZone: 20,
      inputPadding: 6*2
    },options);

		this.each(function() { 
			if (settings.hide) { 
				$(this).hide();				
			}

			var id = $(this).attr('id')

			var data = jQuery.extend({
				pid:id,
				real_input: '#'+id,
				holder: '#'+id+'_tagsinput',
				input_wrapper: '#'+id+'_addTag',
				fake_input: '#'+id+'_tag'
			},settings);

			delimiter[id] = data.delimiter;

			if (settings.onAddTag || settings.onRemoveTag || settings.onChange) {
				tags_callbacks[id] = new Array();
				tags_callbacks[id]['onAddTag'] = settings.onAddTag;
				tags_callbacks[id]['onRemoveTag'] = settings.onRemoveTag;
				tags_callbacks[id]['onChange'] = settings.onChange;
			}

			var markup = '<div id="'+id+'_tagsinput" class="tagsinput"><div id="'+id+'_addTag">';

			if (settings.interactive) {
				markup = markup + '<input id="'+id+'_tag" value="" data-default="'+settings.defaultText+'" />';
			}

			markup = markup + '</div><div class="tags_clear"></div></div>';

			$(markup).insertAfter(this);

			$(data.holder).css('width',settings.width);
			$(data.holder).css('height',settings.height);

			if ($(data.real_input).val()!='') { 
				$.fn.tags.importTags($(data.real_input),$(data.real_input).val());
			}		
			if (settings.interactive) { 
				$(data.fake_input).val($(data.fake_input).attr('data-default'));
				$(data.fake_input).css('color',settings.placeholderColor);
		        $(data.fake_input).resetAutosize(settings);

				$(data.holder).bind('click',data,function(event) {
					$(event.data.fake_input).focus();
				});

				$(data.fake_input).bind('focus',data,function(event) {
					if ($(event.data.fake_input).val()==$(event.data.fake_input).attr('data-default')) { 
						$(event.data.fake_input).val('');
					}
					$(event.data.fake_input).css('color','#000000');		
				});

				if (settings.autocomplete_url != undefined) {
					autocomplete_options = {source: settings.autocomplete_url};
					for (attrname in settings.autocomplete) { 
						autocomplete_options[attrname] = settings.autocomplete[attrname]; 
					}

					if (jQuery.Autocompleter !== undefined) {
						$(data.fake_input).autocomplete(settings.autocomplete_url, settings.autocomplete);
						$(data.fake_input).bind('result',data,function(event,data,formatted) {
							if (data) {
								$('#'+id).addTag(data[0] + "",{focus:true,unique:(settings.unique)});
							}
					  	});
					} else if (jQuery.ui.autocomplete !== undefined) {
						$(data.fake_input).autocomplete(autocomplete_options);
						$(data.fake_input).bind('autocompleteselect',data,function(event,ui) {
							$(event.data.real_input).addTag(ui.item.value,{focus:true,unique:(settings.unique)});
							return false;
						});
					}


				} else {
						// if a user tabs out of the field, create a new tag
						// this is only available if autocomplete is not used.
						$(data.fake_input).bind('blur',data,function(event) { 
							var d = $(this).attr('data-default');
							if ($(event.data.fake_input).val()!='' && $(event.data.fake_input).val()!=d) { 
								if( (event.data.minChars <= $(event.data.fake_input).val().length) && (!event.data.maxChars || (event.data.maxChars >= $(event.data.fake_input).val().length)) )
									$(event.data.real_input).addTag($(event.data.fake_input).val(),{focus:true,unique:(settings.unique)});
							} else {
								$(event.data.fake_input).val($(event.data.fake_input).attr('data-default'));
								$(event.data.fake_input).css('color',settings.placeholderColor);
							}
							return false;
						});

				}
				// if user types a comma, create a new tag
				$(data.fake_input).bind('keypress',data,function(event) {
					if (event.which==event.data.delimiter.charCodeAt(0) || event.which==13 ) {
					    event.preventDefault();
						if( (event.data.minChars <= $(event.data.fake_input).val().length) && (!event.data.maxChars || (event.data.maxChars >= $(event.data.fake_input).val().length)) )
							$(event.data.real_input).addTag($(event.data.fake_input).val(),{focus:true,unique:(settings.unique)});
					  	$(event.data.fake_input).resetAutosize(settings);
						return false;
					} else if (event.data.autosize) {
			            $(event.data.fake_input).doAutosize(settings);
            
          			}
				});
				//Delete last tag on backspace
				data.removeWithBackspace && $(data.fake_input).bind('keydown', function(event)
				{
					if(event.keyCode == 8 && $(this).val() == '')
					{
						 event.preventDefault();
						 var last_tag = $(this).closest('.tagsinput').find('.tag:last').text();
						 var id = $(this).attr('id').replace(/_tag$/, '');
						 last_tag = last_tag.replace(/[\s]+x$/, '');
						 $('#' + id).removeTag(escape(last_tag));
						 $(this).trigger('focus');
					}
				});
				$(data.fake_input).blur();

				//Removes the not_valid class when user changes the value of the fake input
				if(data.unique) {
				    $(data.fake_input).keydown(function(event){
				        if(event.keyCode == 8 || String.fromCharCode(event.which).match(/\w+|[áéíóúÁÉÍÓÚñÑ,/]+/)) {
				            $(this).removeClass('not_valid');
				        }
				    });
				}
			} // if settings.interactive
			return false;
		});

		return this;

	};

	$.fn.tags.updateTagsField = function(obj,tagslist) { 
		var id = $(obj).attr('id');
		$(obj).val(tagslist.join(delimiter[id]));
	};

	$.fn.tags.importTags = function(obj,val) {			
		$(obj).val('');
		var id = $(obj).attr('id');
		var tags = val.split(delimiter[id]);
		for (i=0; i<tags.length; i++) { 
			$(obj).addTag(tags[i],{focus:false,callback:false});
		}
		if(tags_callbacks[id] && tags_callbacks[id]['onChange'])
		{
			var f = tags_callbacks[id]['onChange'];
			f.call(obj, obj, tags[i]);
		}
	};

})(jQuery);

// @PLUGIN Chosen by Harvest - MIT license
(function() {
  var SelectParser;

  SelectParser = (function() {

    function SelectParser() {
      this.options_index = 0;
      this.parsed = [];
    }

    SelectParser.prototype.add_node = function(child) {
      if (child.nodeName === "OPTGROUP") {
        return this.add_group(child);
      } else {
        return this.add_option(child);
      }
    };

    SelectParser.prototype.add_group = function(group) {
      var group_position, option, _i, _len, _ref, _results;
      group_position = this.parsed.length;
      this.parsed.push({
        array_index: group_position,
        group: true,
        label: group.label,
        children: 0,
        disabled: group.disabled
      });
      _ref = group.childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        option = _ref[_i];
        _results.push(this.add_option(option, group_position, group.disabled));
      }
      return _results;
    };

    SelectParser.prototype.add_option = function(option, group_position, group_disabled) {
      if (option.nodeName === "OPTION") {
        if (option.text !== "") {
          if (group_position != null) this.parsed[group_position].children += 1;
          this.parsed.push({
            array_index: this.parsed.length,
            options_index: this.options_index,
            value: option.value,
            text: option.text,
            html: option.innerHTML,
            selected: option.selected,
            disabled: group_disabled === true ? group_disabled : option.disabled,
            group_array_index: group_position,
            classes: option.className,
            style: option.style.cssText
          });
        } else {
          this.parsed.push({
            array_index: this.parsed.length,
            options_index: this.options_index,
            empty: true
          });
        }
        return this.options_index += 1;
      }
    };

    return SelectParser;

  })();

  SelectParser.select_to_array = function(select) {
    var child, parser, _i, _len, _ref;
    parser = new SelectParser();
    _ref = select.childNodes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      parser.add_node(child);
    }
    return parser.parsed;
  };

  this.SelectParser = SelectParser;

}).call(this);
(function() {
  var AbstractChosen, root;

  root = this;

  AbstractChosen = (function() {

    function AbstractChosen(form_field, options) {
      this.form_field = form_field;
      this.options = options != null ? options : {};
      this.set_default_values();
      this.is_multiple = this.form_field.multiple;
      this.default_text_default = this.is_multiple ? "Select Some Options" : "Select an Option";
      this.setup();
      this.set_up_html();
      this.register_observers();
      this.finish_setup();
    }

    AbstractChosen.prototype.set_default_values = function() {
      var _this = this;
      this.click_test_action = function(evt) {
        return _this.test_active_click(evt);
      };
      this.activate_action = function(evt) {
        return _this.activate_field(evt);
      };
      this.active_field = false;
      this.mouse_on_container = false;
      this.results_showing = false;
      this.result_highlighted = null;
      this.result_single_selected = null;
      this.allow_single_deselect = (this.options.allow_single_deselect != null) && (this.form_field.options[0] != null) && this.form_field.options[0].text === "" ? this.options.allow_single_deselect : false;
      this.disable_search_threshold = this.options.disable_search_threshold || 0;
      this.choices = 0;
      return this.results_none_found = this.options.no_results_text || "No results match";
    };

    AbstractChosen.prototype.mouse_enter = function() {
      return this.mouse_on_container = true;
    };

    AbstractChosen.prototype.mouse_leave = function() {
      return this.mouse_on_container = false;
    };

    AbstractChosen.prototype.input_focus = function(evt) {
      var _this = this;
      if (!this.active_field) {
        return setTimeout((function() {
          return _this.container_mousedown();
        }), 50);
      }
    };

    AbstractChosen.prototype.input_blur = function(evt) {
      var _this = this;
      if (!this.mouse_on_container) {
        this.active_field = false;
        return setTimeout((function() {
          return _this.blur_test();
        }), 100);
      }
    };

    AbstractChosen.prototype.result_add_option = function(option) {
      var classes, style;
      if (!option.disabled) {
        option.dom_id = this.container_id + "_o_" + option.array_index;
        classes = option.selected && this.is_multiple ? [] : ["active-result"];
        if (option.selected) classes.push("result-selected");
        if (option.group_array_index != null) classes.push("group-option");
        if (option.classes !== "") classes.push(option.classes);
        style = option.style.cssText !== "" ? " style=\"" + option.style + "\"" : "";
        return '<li id="' + option.dom_id + '" class="' + classes.join(' ') + '"' + style + '>' + option.html + '</li>';
      } else {
        return "";
      }
    };

    AbstractChosen.prototype.results_update_field = function() {
      this.result_clear_highlight();
      this.result_single_selected = null;
      return this.results_build();
    };

    AbstractChosen.prototype.results_toggle = function() {
      if (this.results_showing) {
        return this.results_hide();
      } else {
        return this.results_show();
      }
    };

    AbstractChosen.prototype.results_search = function(evt) {
      if (this.results_showing) {
        return this.winnow_results();
      } else {
        return this.results_show();
      }
    };

    AbstractChosen.prototype.keyup_checker = function(evt) {
      var stroke, _ref;
      stroke = (_ref = evt.which) != null ? _ref : evt.keyCode;
      this.search_field_scale();
      switch (stroke) {
        case 8:
          if (this.is_multiple && this.backstroke_length < 1 && this.choices > 0) {
            return this.keydown_backstroke();
          } else if (!this.pending_backstroke) {
            this.result_clear_highlight();
            return this.results_search();
          }
          break;
        case 13:
          evt.preventDefault();
          if (this.results_showing) return this.result_select(evt);
          break;
        case 27:
          if (this.results_showing) this.results_hide();
          return true;
        case 9:
        case 38:
        case 40:
        case 16:
        case 91:
        case 17:
          break;
        default:
          return this.results_search();
      }
    };

    AbstractChosen.prototype.generate_field_id = function() {
      var new_id;
      new_id = this.generate_random_id();
      this.form_field.id = new_id;
      return new_id;
    };

    AbstractChosen.prototype.generate_random_char = function() {
      var chars, newchar, rand;
      chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";
      rand = Math.floor(Math.random() * chars.length);
      return newchar = chars.substring(rand, rand + 1);
    };

    return AbstractChosen;

  })();

  root.AbstractChosen = AbstractChosen;

}).call(this);
(function() {
  var $, Chosen, get_side_border_padding, root,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  root = this;

  $ = jQuery;

  $.fn.extend({
    chosen: function(options) {
      if ($.browser.msie && ($.browser.version === "6.0" || $.browser.version === "7.0")) {
        return this;
      }
      return $(this).each(function(input_field) {
        if (!($(this)).hasClass("chosen-done")) return new Chosen(this, options);
      });
    }
  });

  Chosen = (function(_super) {

    __extends(Chosen, _super);

    function Chosen() {
      Chosen.__super__.constructor.apply(this, arguments);
    }

    Chosen.prototype.setup = function() {
      this.form_field_jq = $(this.form_field);
      return this.is_rtl = this.form_field_jq.hasClass("chosen-rtl");
    };

    Chosen.prototype.finish_setup = function() {
      return this.form_field_jq.addClass("chosen-done");
    };

    Chosen.prototype.set_up_html = function() {
      var container_div, dd_top, dd_width, sf_width;
      this.container_id = this.form_field.id.length ? this.form_field.id.replace(/(:|\.)/g, '_') : this.generate_field_id();
      this.container_id += "_chzn";
      this.f_width = this.form_field_jq.outerWidth();
      this.default_text = this.form_field_jq.data('placeholder') ? this.form_field_jq.data('placeholder') : this.default_text_default;
      container_div = $("<div />", {
        id: this.container_id,
        "class": "chosen-container" + (this.is_rtl ? ' chosen-rtl' : '')
      });
      if (this.is_multiple) {
        container_div.html('<ul class="chosen-choices"><li class="search-field"><input type="text" value="' + this.default_text + '" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop" style="left:-9000px;"><ul class="chosen-results"></ul></div>');
      } else {
        container_div.html('<a href="javascript:void(0)" class="chosen-single"><span>' + this.default_text + '</span><div><b></b></div></a><div class="chosen-drop" style="left:-9000px;"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>');
      }
      this.form_field_jq.hide().after(container_div);
      this.container = $('#' + this.container_id);
      this.container.addClass("chosen-container-" + (this.is_multiple ? "multi" : "single"));
      this.dropdown = this.container.find('div.chosen-drop').first();
      dd_top = this.container.height();
      dd_width = this.f_width - get_side_border_padding(this.dropdown);
      this.dropdown.css({
        "top": dd_top + "px"
      });
      this.search_field = this.container.find('input').first();
      this.search_results = this.container.find('ul.chosen-results').first();
      this.search_field_scale();
      this.search_no_results = this.container.find('li.no-results').first();
      if (this.is_multiple) {
        this.search_choices = this.container.find('ul.chosen-choices').first();
        this.search_container = this.container.find('li.search-field').first();
      } else {
        this.search_container = this.container.find('div.chosen-search').first();
        this.selected_item = this.container.find('.chosen-single').first();
        sf_width = dd_width - get_side_border_padding(this.search_container) - get_side_border_padding(this.search_field);
      }
      this.results_build();
      this.set_tab_index();
      return this.form_field_jq.trigger("liszt:ready", {
        chosen: this
      });
    };

    Chosen.prototype.register_observers = function() {
      var _this = this;
      this.container.mousedown(function(evt) {
        return _this.container_mousedown(evt);
      });
      this.container.mouseup(function(evt) {
        return _this.container_mouseup(evt);
      });
      this.container.mouseenter(function(evt) {
        return _this.mouse_enter(evt);
      });
      this.container.mouseleave(function(evt) {
        return _this.mouse_leave(evt);
      });
      this.search_results.mouseup(function(evt) {
        return _this.search_results_mouseup(evt);
      });
      this.search_results.mouseover(function(evt) {
        return _this.search_results_mouseover(evt);
      });
      this.search_results.mouseout(function(evt) {
        return _this.search_results_mouseout(evt);
      });
      this.form_field_jq.bind("liszt:updated", function(evt) {
        return _this.results_update_field(evt);
      });
      this.search_field.blur(function(evt) {
        return _this.input_blur(evt);
      });
      this.search_field.keyup(function(evt) {
        return _this.keyup_checker(evt);
      });
      this.search_field.keydown(function(evt) {
        return _this.keydown_checker(evt);
      });
      if (this.is_multiple) {
        this.search_choices.click(function(evt) {
          return _this.choices_click(evt);
        });
        return this.search_field.focus(function(evt) {
          return _this.input_focus(evt);
        });
      } else {
        return this.container.click(function(evt) {
          return evt.preventDefault();
        });
      }
    };

    Chosen.prototype.search_field_disabled = function() {
      this.is_disabled = this.form_field_jq[0].disabled;
      if (this.is_disabled) {
        this.container.addClass('chosen-disabled');
        this.search_field[0].disabled = true;
        if (!this.is_multiple) {
          this.selected_item.unbind("focus", this.activate_action);
        }
        return this.close_field();
      } else {
        this.container.removeClass('chosen-disabled');
        this.search_field[0].disabled = false;
        if (!this.is_multiple) {
          return this.selected_item.bind("focus", this.activate_action);
        }
      }
    };

    Chosen.prototype.container_mousedown = function(evt) {
      var target_closelink;
      if (!this.is_disabled) {
        target_closelink = evt != null ? ($(evt.target)).hasClass("search-choice-close") : false;
        if (evt && evt.type === "mousedown") evt.stopPropagation();
        if (!this.pending_destroy_click && !target_closelink) {
          if (!this.active_field) {
            if (this.is_multiple) this.search_field.val("");
            $(document).click(this.click_test_action);
            this.results_show();
          } else if (!this.is_multiple && evt && (($(evt.target)[0] === this.selected_item[0]) || $(evt.target).parents("a.chosen-single").length)) {
            evt.preventDefault();
            this.results_toggle();
          }
          return this.activate_field();
        } else {
          return this.pending_destroy_click = false;
        }
      }
    };

    Chosen.prototype.container_mouseup = function(evt) {
      if (evt.target.nodeName === "ABBR") return this.results_reset(evt);
    };

    Chosen.prototype.blur_test = function(evt) {
      if (!this.active_field && this.container.hasClass("chosen-container-active")) {
        return this.close_field();
      }
    };

    Chosen.prototype.close_field = function() {
      $(document).unbind("click", this.click_test_action);
      if (!this.is_multiple) {
        this.selected_item.attr("tabindex", this.search_field.attr("tabindex"));
        this.search_field.attr("tabindex", -1);
      }
      this.active_field = false;
      this.results_hide();
      this.container.removeClass("chosen-container-active");
      this.winnow_results_clear();
      this.clear_backstroke();
      this.show_search_field_default();
      return this.search_field_scale();
    };

    Chosen.prototype.activate_field = function() {
      if (!this.is_multiple && !this.active_field) {
        this.search_field.attr("tabindex", this.selected_item.attr("tabindex"));
        this.selected_item.attr("tabindex", -1);
      }
      this.container.addClass("chosen-container-active");
      this.active_field = true;
      this.search_field.val(this.search_field.val());
      return this.search_field.focus();
    };

    Chosen.prototype.test_active_click = function(evt) {
      if ($(evt.target).parents('#' + this.container_id).length) {
        return this.active_field = true;
      } else {
        return this.close_field();
      }
    };

    Chosen.prototype.results_build = function() {
      var content, data, _i, _len, _ref;
      this.parsing = true;
      this.results_data = root.SelectParser.select_to_array(this.form_field);
      if (this.is_multiple && this.choices > 0) {
        this.search_choices.find("li.search-choice").remove();
        this.choices = 0;
      } else if (!this.is_multiple) {
        this.selected_item.find("span").text(this.default_text);
        if (this.form_field.options.length <= this.disable_search_threshold) {
          this.container.addClass("chosen-container-single-nosearch");
        } else {
          this.container.removeClass("chosen-container-single-nosearch");
        }
      }
      content = '';
      _ref = this.results_data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        data = _ref[_i];
        if (data.group) {
          content += this.result_add_group(data);
        } else if (!data.empty) {
          content += this.result_add_option(data);
          if (data.selected && this.is_multiple) {
            this.choice_build(data);
          } else if (data.selected && !this.is_multiple) {
            this.selected_item.find("span").text(data.text);
            if (this.allow_single_deselect) this.single_deselect_control_build();
          }
        }
      }
      this.search_field_disabled();
      this.show_search_field_default();
      this.search_field_scale();
      this.search_results.html(content);
      return this.parsing = false;
    };

    Chosen.prototype.result_add_group = function(group) {
      if (!group.disabled) {
        group.dom_id = this.container_id + "_g_" + group.array_index;
        return '<li id="' + group.dom_id + '" class="group-result">' + $("<div />").text(group.label).html() + '</li>';
      } else {
        return "";
      }
    };

    Chosen.prototype.result_do_highlight = function(el) {
      var high_bottom, high_top, maxHeight, visible_bottom, visible_top;
      if (el.length) {
        this.result_clear_highlight();
        this.result_highlight = el;
        this.result_highlight.addClass("highlighted");
        maxHeight = parseInt(this.search_results.css("maxHeight"), 10);
        visible_top = this.search_results.scrollTop();
        visible_bottom = maxHeight + visible_top;
        high_top = this.result_highlight.position().top + this.search_results.scrollTop();
        high_bottom = high_top + this.result_highlight.outerHeight();
        if (high_bottom >= visible_bottom) {
          return this.search_results.scrollTop((high_bottom - maxHeight) > 0 ? high_bottom - maxHeight : 0);
        } else if (high_top < visible_top) {
          return this.search_results.scrollTop(high_top);
        }
      }
    };

    Chosen.prototype.result_clear_highlight = function() {
      if (this.result_highlight) this.result_highlight.removeClass("highlighted");
      return this.result_highlight = null;
    };

    Chosen.prototype.results_show = function() {
      var dd_top;
      if (!this.is_multiple) {
        this.selected_item.addClass("chosen-single-with-drop");
        if (this.result_single_selected) {
          this.result_do_highlight(this.result_single_selected);
        }
      }
      dd_top = this.is_multiple ? this.container.height() : this.container.height() - 1;
      this.dropdown.css({
        "top": dd_top + "px",
        "left": 0
      });
      this.results_showing = true;
      this.search_field.focus();
      this.search_field.val(this.search_field.val());
      return this.winnow_results();
    };

    Chosen.prototype.results_hide = function() {
      if (!this.is_multiple) {
        this.selected_item.removeClass("chosen-single-with-drop");
      }
      this.result_clear_highlight();
      this.dropdown.css({
        "left": "-9000px"
      });
      return this.results_showing = false;
    };

    Chosen.prototype.set_tab_index = function(el) {
      var ti;
      if (this.form_field_jq.attr("tabindex")) {
        ti = this.form_field_jq.attr("tabindex");
        this.form_field_jq.attr("tabindex", -1);
        if (this.is_multiple) {
          return this.search_field.attr("tabindex", ti);
        } else {
          this.selected_item.attr("tabindex", ti);
          return this.search_field.attr("tabindex", -1);
        }
      }
    };

    Chosen.prototype.show_search_field_default = function() {
      if (this.is_multiple && this.choices < 1 && !this.active_field) {
        this.search_field.val(this.default_text);
        return this.search_field.addClass("default");
      } else {
        this.search_field.val("");
        return this.search_field.removeClass("default");
      }
    };

    Chosen.prototype.search_results_mouseup = function(evt) {
      var target;
      target = $(evt.target).hasClass("active-result") ? $(evt.target) : $(evt.target).parents(".active-result").first();
      if (target.length) {
        this.result_highlight = target;
        return this.result_select(evt);
      }
    };

    Chosen.prototype.search_results_mouseover = function(evt) {
      var target;
      target = $(evt.target).hasClass("active-result") ? $(evt.target) : $(evt.target).parents(".active-result").first();
      if (target) return this.result_do_highlight(target);
    };

    Chosen.prototype.search_results_mouseout = function(evt) {
      if ($(evt.target).hasClass("active-result" || $(evt.target).parents('.active-result').first())) {
        return this.result_clear_highlight();
      }
    };

    Chosen.prototype.choices_click = function(evt) {
      evt.preventDefault();
      if (this.active_field && !($(evt.target).hasClass("search-choice" || $(evt.target).parents('.search-choice').first)) && !this.results_showing) {
        return this.results_show();
      }
    };

    Chosen.prototype.choice_build = function(item) {
      var choice_id, link,
        _this = this;
      choice_id = this.container_id + "_c_" + item.array_index;
      this.choices += 1;
      this.search_container.before('<li class="search-choice" id="' + choice_id + '"><span>' + item.html + '</span><a href="javascript:void(0)" class="search-choice-close" rel="' + item.array_index + '"></a></li>');
      link = $('#' + choice_id).find("a").first();
      return link.click(function(e) {
        return _this.choice_destroy_link_click(e);
      });
    };

    Chosen.prototype.choice_destroy_link_click = function(e) {
      e.preventDefault();
      if (!this.is_disabled) {
        this.pending_destroy_click = true;
        return this.choice_destroy($(e.target));
      } else {
        return e.stopPropagation;
      }
    };

    Chosen.prototype.choice_destroy = function(link) {
      this.choices -= 1;
      this.show_search_field_default();
      if (this.is_multiple && this.choices > 0 && this.search_field.val().length < 1) {
        this.results_hide();
      }
      this.result_deselect(link.attr("rel"));
      return link.parents('li').first().remove();
    };

    Chosen.prototype.results_reset = function(evt) {
      this.form_field.options[0].selected = true;
      this.selected_item.find("span").text(this.default_text);
      this.show_search_field_default();
      $(evt.target).remove();
      this.form_field_jq.trigger("change");
      if (this.active_field) return this.results_hide();
    };

    Chosen.prototype.result_select = function(evt) {
      var high, high_id, item, position;
      if (this.result_highlight) {
        high = this.result_highlight;
        high_id = high.attr("id");
        this.result_clear_highlight();
        if (this.is_multiple) {
          this.result_deactivate(high);
        } else {
          this.search_results.find(".result-selected").removeClass("result-selected");
          this.result_single_selected = high;
        }
        high.addClass("result-selected");
        position = high_id.substr(high_id.lastIndexOf("_") + 1);
        item = this.results_data[position];
        item.selected = true;
        this.form_field.options[item.options_index].selected = true;
        if (this.is_multiple) {
          this.choice_build(item);
        } else {
          this.selected_item.find("span").first().text(item.text);
          if (this.allow_single_deselect) this.single_deselect_control_build();
        }
        if (!(evt.metaKey && this.is_multiple)) this.results_hide();
        this.search_field.val("");
        this.form_field_jq.trigger("change");
        return this.search_field_scale();
      }
    };

    Chosen.prototype.result_activate = function(el) {
      return el.addClass("active-result");
    };

    Chosen.prototype.result_deactivate = function(el) {
      return el.removeClass("active-result");
    };

    Chosen.prototype.result_deselect = function(pos) {
      var result, result_data;
      result_data = this.results_data[pos];
      result_data.selected = false;
      this.form_field.options[result_data.options_index].selected = false;
      result = $("#" + this.container_id + "_o_" + pos);
      result.removeClass("result-selected").addClass("active-result").show();
      this.result_clear_highlight();
      this.winnow_results();
      this.form_field_jq.trigger("change");
      return this.search_field_scale();
    };

    Chosen.prototype.single_deselect_control_build = function() {
      if (this.allow_single_deselect && this.selected_item.find("abbr").length < 1) {
        return this.selected_item.find("span").first().after("<abbr class=\"search-choice-close\"></abbr>");
      }
    };

    Chosen.prototype.winnow_results = function() {
      var found, option, part, parts, regex, result, result_id, results, searchText, startpos, text, zregex, _i, _j, _len, _len2, _ref;
      this.no_results_clear();
      results = 0;
      searchText = this.search_field.val() === this.default_text ? "" : $('<div/>').text($.trim(this.search_field.val())).html();
      regex = new RegExp('^' + searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'i');
      zregex = new RegExp(searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'i');
      _ref = this.results_data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        option = _ref[_i];
        if (!option.disabled && !option.empty) {
          if (option.group) {
            $('#' + option.dom_id).css('display', 'none');
          } else if (!(this.is_multiple && option.selected)) {
            found = false;
            result_id = option.dom_id;
            result = $("#" + result_id);
            if (regex.test(option.html)) {
              found = true;
              results += 1;
            } else if (option.html.indexOf(" ") >= 0 || option.html.indexOf("[") === 0) {
              parts = option.html.replace(/\[|\]/g, "").split(" ");
              if (parts.length) {
                for (_j = 0, _len2 = parts.length; _j < _len2; _j++) {
                  part = parts[_j];
                  if (regex.test(part)) {
                    found = true;
                    results += 1;
                  }
                }
              }
            }
            if (found) {
              if (searchText.length) {
                startpos = option.html.search(zregex);
                text = option.html.substr(0, startpos + searchText.length) + '</em>' + option.html.substr(startpos + searchText.length);
                text = text.substr(0, startpos) + '<em>' + text.substr(startpos);
              } else {
                text = option.html;
              }
              result.html(text);
              this.result_activate(result);
              if (option.group_array_index != null) {
                $("#" + this.results_data[option.group_array_index].dom_id).css('display', 'list-item');
              }
            } else {
              if (this.result_highlight && result_id === this.result_highlight.attr('id')) {
                this.result_clear_highlight();
              }
              this.result_deactivate(result);
            }
          }
        }
      }
      if (results < 1 && searchText.length) {
        return this.no_results(searchText);
      } else {
        return this.winnow_results_set_highlight();
      }
    };

    Chosen.prototype.winnow_results_clear = function() {
      var li, lis, _i, _len, _results;
      this.search_field.val("");
      lis = this.search_results.find("li");
      _results = [];
      for (_i = 0, _len = lis.length; _i < _len; _i++) {
        li = lis[_i];
        li = $(li);
        if (li.hasClass("group-result")) {
          _results.push(li.css('display', 'auto'));
        } else if (!this.is_multiple || !li.hasClass("result-selected")) {
          _results.push(this.result_activate(li));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Chosen.prototype.winnow_results_set_highlight = function() {
      var do_high, selected_results;
      if (!this.result_highlight) {
        selected_results = !this.is_multiple ? this.search_results.find(".result-selected.active-result") : [];
        do_high = selected_results.length ? selected_results.first() : this.search_results.find(".active-result").first();
        if (do_high != null) return this.result_do_highlight(do_high);
      }
    };

    Chosen.prototype.no_results = function(terms) {
      var no_results_html;
      no_results_html = $('<li class="no-results">' + this.results_none_found + ' "<span></span>"</li>');
      no_results_html.find("span").first().html(terms);
      return this.search_results.append(no_results_html);
    };

    Chosen.prototype.no_results_clear = function() {
      return this.search_results.find(".no-results").remove();
    };

    Chosen.prototype.keydown_arrow = function() {
      var first_active, next_sib;
      if (!this.result_highlight) {
        first_active = this.search_results.find("li.active-result").first();
        if (first_active) this.result_do_highlight($(first_active));
      } else if (this.results_showing) {
        next_sib = this.result_highlight.nextAll("li.active-result").first();
        if (next_sib) this.result_do_highlight(next_sib);
      }
      if (!this.results_showing) return this.results_show();
    };

    Chosen.prototype.keyup_arrow = function() {
      var prev_sibs;
      if (!this.results_showing && !this.is_multiple) {
        return this.results_show();
      } else if (this.result_highlight) {
        prev_sibs = this.result_highlight.prevAll("li.active-result");
        if (prev_sibs.length) {
          return this.result_do_highlight(prev_sibs.first());
        } else {
          if (this.choices > 0) this.results_hide();
          return this.result_clear_highlight();
        }
      }
    };

    Chosen.prototype.keydown_backstroke = function() {
      if (this.pending_backstroke) {
        this.choice_destroy(this.pending_backstroke.find("a").first());
        return this.clear_backstroke();
      } else {
        this.pending_backstroke = this.search_container.siblings("li.search-choice").last();
        return this.pending_backstroke.addClass("search-choice-focus");
      }
    };

    Chosen.prototype.clear_backstroke = function() {
      if (this.pending_backstroke) {
        this.pending_backstroke.removeClass("search-choice-focus");
      }
      return this.pending_backstroke = null;
    };

    Chosen.prototype.keydown_checker = function(evt) {
      var stroke, _ref;
      stroke = (_ref = evt.which) != null ? _ref : evt.keyCode;
      this.search_field_scale();
      if (stroke !== 8 && this.pending_backstroke) this.clear_backstroke();
      switch (stroke) {
        case 8:
          this.backstroke_length = this.search_field.val().length;
          break;
        case 9:
          if (this.results_showing && !this.is_multiple) this.result_select(evt);
          this.mouse_on_container = false;
          break;
        case 13:
          evt.preventDefault();
          break;
        case 38:
          evt.preventDefault();
          this.keyup_arrow();
          break;
        case 40:
          this.keydown_arrow();
          break;
      }
    };

    Chosen.prototype.search_field_scale = function() {
      var dd_top, div, h, style, style_block, styles, w, _i, _len;
      if (this.is_multiple) {
        h = 0;
        w = 0;
        style_block = "position:absolute; left: -1000px; top: -1000px; display:none;";
        styles = ['font-size', 'font-style', 'font-weight', 'font-family', 'line-height', 'text-transform', 'letter-spacing'];
        for (_i = 0, _len = styles.length; _i < _len; _i++) {
          style = styles[_i];
          style_block += style + ":" + this.search_field.css(style) + ";";
        }
        div = $('<div />', {
          'style': style_block
        });
        div.text(this.search_field.val());
        $('body').append(div);
        w = div.width() + 25;
        div.remove();
        if (w > this.f_width - 10) w = this.f_width - 10;
        dd_top = this.container.height();
        return this.dropdown.css({
          "top": dd_top + "px"
        });
      }
    };

    Chosen.prototype.generate_random_id = function() {
      var string;
      string = "sel" + this.generate_random_char() + this.generate_random_char() + this.generate_random_char();
      while ($("#" + string).length > 0) {
        string += this.generate_random_char();
      }
      return string;
    };

    return Chosen;

  })(AbstractChosen);

  get_side_border_padding = function(elmt) {
    var side_border_padding;
    return side_border_padding = elmt.outerWidth() - elmt.width();
  };

  root.get_side_border_padding = get_side_border_padding;

}).call(this);

// @PLUGIN Validator
(function($){
  function trim(el) {
    return (''.trim) ? el.val().trim() : $.trim(el.val());
  }
  $.fn.isHappy = function (config) {
    var fields = [], item;
    
    function getError(error) {
      return $('<span id="'+error.id+'" class="unhappyMessage">'+error.message+'</span>');
    }
    function handleSubmit() {
      var errors = false, i, l;
      for (i = 0, l = fields.length; i < l; i += 1) {
        if (!fields[i].testValid(true)) {
          errors = true;
        }
      }
      if (errors) {
        if (isFunction(config.unHappy)) config.unHappy();
        return false;
      } else if (config.testMode) {
        if (window.console) console.warn('would have submitted');
        return false;
      }
    }
    function isFunction (obj) {
      return !!(obj && obj.constructor && obj.call && obj.apply);
    }
    function processField(opts, selector) {
      var field = $(selector),
        error = {
          message: opts.message,
          id: selector.slice(1) + '_unhappy'
        },
        errorEl = $(error.id).length > 0 ? $(error.id) : getError(error);
        
      fields.push(field);
      field.testValid = function (submit) {
        var val,
          el = $(this),
          gotFunc,
          error = false,
          temp, 
          required = !!el.get(0).attributes.getNamedItem('required') || opts.required,
          password = (field.attr('type') === 'password'),
          arg = isFunction(opts.arg) ? opts.arg() : opts.arg;
        
        // clean it or trim it
        if (isFunction(opts.clean)) {
          val = opts.clean(el.val());
        } else if (!opts.trim && !password) {
          val = trim(el);
        } else {
          val = el.val();
        }
        
        // write it back to the field
        el.val(val);
        
        // get the value
        gotFunc = ((val.length > 0 || required === 'sometimes') && isFunction(opts.test));
        
        // check if we've got an error on our hands
        if (submit === true && required === true && val.length === 0) {
          error = true;
        } else if (gotFunc) {
          error = !opts.test(val, arg);
        }
        
        if (error) {
          el.addClass('unhappy').before(errorEl);
          return false;
        } else {
          temp = errorEl.get(0);
          // this is for zepto
          if (temp.parentNode) {
            temp.parentNode.removeChild(temp);
          }
          el.removeClass('unhappy');
          return true;
        }
      };
      field.bind(config.when || 'blur', field.testValid);
    }
    
    for (item in config.fields) {
      processField(config.fields[item], item);
    }
    
    if (config.submitButton) {
      $(config.submitButton).click(handleSubmit);
    } else {
      this.bind('submit', handleSubmit);
    }
    return this;
  };
})(this.jQuery || this.Zepto);

// @PLUGIN Editor
var BLANKLINE = '';
var Wysiwym = {};
$.fn.wysiwym = function(markupSet, options) {
    this.EDITORCLASS = 'editor';           // Class to use for the wysiwym editor
    this.BUTTONCLASS = 'buttons';          // Class to use for the wysiwym buttons
    this.HELPCLASS = 'help';               // Class to use for the wysiwym help
    this.HELPTOGGLECLASS = 'help-toggle';  // Class to use for the wysiwym help
    this.textelem = this;                          // Javascript textarea element
    this.textarea = $(this);                       // jQuery textarea object
    this.editor = undefined;                       // jQuery div wrapper around this editor
    this.markup = new markupSet(this);             // Wysiwym Markup set to use
    this.defaults = {                              // Default option values
        containerButtons: undefined,               // jQuery elem to place buttons (makes one by default)
        containerHelp: undefined,                  // jQuery elem to place help (makes one by default)
        helpEnabled: true,                         // Set true to display the help dropdown
        helpToggle: true,                          // Set true to use a toggle link for help
        helpToggleElem: undefined,                 // jQuery elem to toggle help (makes <a> by default)
        helpTextShow: 'show markup syntax',        // Toggle text to display when help is not visible
        helpTextHide: 'hide markup syntax'         // Toggle text to display when help is visible
    };
    this.options = $.extend(this.defaults, options ? options : {});

    // Add the button container and all buttons
    this.initializeButtons = function() {
        var markup = this.markup;
        if (this.options.containerButtons == undefined)
            this.options.containerButtons = $("<div></div>").insertBefore(this.textarea);
        this.options.containerButtons.addClass(this.BUTTONCLASS);
        for (var i=0; i<markup.buttons.length; i++) {
            // Create the button and apply first / last classes
            var button = markup.buttons[i];
            var jqbutton = button.create();
            if (i == 0) { jqbutton.addClass('first'); }
            if (i == markup.buttons.length-1) { jqbutton.addClass('last'); }
            // Bind the button data and click event callback
            var data = $.extend({markup:this.markup}, button.data);
            jqbutton.bind('click', data, button.callback);
            this.options.containerButtons.append(jqbutton);
        }
    };

    // Initialize the AutoIndent trigger
    this.initializeAutoIndent = function() {
        if (this.markup.autoindents) {
            var data = {markup:this.markup};
            this.textarea.bind('keydown', data, Wysiwym.autoIndent);
        }
    };

    // Initialize the help syntax dropdown
    this.initializeHelp = function() {
        if (this.options.helpEnabled) {
            if (this.options.containerHelp == undefined)
                this.options.containerHelp = $("<div></div>").insertAfter(this.textarea);
            this.options.containerHelp.addClass(this.HELPCLASS);
            // Add the help table and items
            var helpBody = $('<tbody></tbody>');
            var helpTable = $('<table cellpadding="0" cellspacing="0" border="0"></table>').append(helpBody);
            for (var i=0; i<this.markup.help.length; i++) {
                var item = this.markup.help[i];
                helpBody.append('<tr><th>'+ item.label +'</th><td>'+ item.syntax +'</td></tr>');
            };
            this.options.containerHelp.append(helpTable);
        }
    };

    // Initialize the Help Toggle Button
    this.initializeHelpToggle = function() {
        if (this.options.helpToggle && this.options.helpEnabled) {
            var self = this;  // Required for use inside click callback
            if (this.options.helpToggleElem == undefined)
                this.options.helpToggleElem = $("<a href='#'>"+ this.options.helpTextShow +"</a>");
            this.options.helpToggleElem.addClass(this.HELPTOGGLECLASS);
            this.options.helpToggleElem.bind('click', function() {
                if (self.options.containerHelp.is(':visible')) {
                    self.options.containerHelp.slideUp('fast');
                    $(this).text(self.options.helpTextShow);
                } else {
                    self.options.containerHelp.slideDown('fast');
                    $(this).text(self.options.helpTextHide);
                }
                return false;
            });
            this.options.containerHelp.before(this.options.helpToggleElem).hide();
        }
    };

    // Initialize the Wysiwym Editor
    this.editor = $('<div class="'+ this.EDITORCLASS +'"></div>');
    this.textarea.wrap(this.editor);
    this.initializeButtons();
    this.initializeAutoIndent();
    this.initializeHelp();
    this.initializeHelpToggle();
};
Wysiwym.Selection = function(wysiwym) {
    this.lines = wysiwym.lines;                 // Reference to wysiwym.lines
    this.start = { line:0, position:0 },        // Current cursor start positon
    this.end = { line:0, position:0 },          // Current cursor end position

    // Return a string representation of this object.
    this.toString = function() {
        var str = 'SELECTION: '+ this.length() +' chars\n';
        str += 'START LINE: '+ this.start.line +'; POSITION: '+ this.start.position +'\n';
        str += 'END LINE: '+ this.end.line +'; POSITION: '+ this.end.position +'\n';
        return str;
    };

    // Add a line prefix, reguardless if it's already set or not.
    this.addLinePrefixes = function(prefix) {
        for (var i=this.start.line; i <= this.end.line; i++) {
            this.lines[i] = prefix + this.lines[i];
        }
        this.start.position += prefix.length;
        this.end.position += prefix.length;
    };

    // Add the specified prefix to the selection
    this.addPrefix = function(prefix) {
        var numlines = this.lines.length;
        var line = this.lines[this.start.line];
        var newline = line.substring(0, this.start.position) +
            prefix + line.substring(this.start.position, line.length);
        this.lines[this.start.line] = newline;
        this.start.position += prefix.length;
        if (this.start.line == this.end.line)
            this.end.position += prefix.length;
        // Check we need to update the scroll height;  This is very slightly
        // off because height != scrollHeight. A fix would be nice.
        if (prefix.indexOf('\n') != -1) {
            var scrollHeight = wysiwym.textelem.scrollHeight;
            var lineheight = parseInt(scrollHeight / numlines);
            wysiwym.scroll += lineheight;
        }

    };

    // Add the specified suffix to the selection
    this.addSuffix = function(suffix) {
        var line = this.lines[this.end.line];
        var newline = line.substring(0, this.end.position) +
            suffix + line.substring(this.end.position, line.length);
        this.lines[this.end.line] = newline;
    };

    // Append the specified text to the selection
    this.append = function(text) {
        var line = this.lines[this.end.line];
        var newline = line.substring(0, this.end.position) +
            text + line.substring(this.end.position, line.length);
        this.lines[this.end.line] = newline;
        this.end.position += text.length;
    };

    // Return an array of lines in the selection
    this.getLines = function() {
        var selectedlines = [];
        for (var i=this.start.line; i <= this.end.line; i++)
            selectedlines[selectedlines.length] = this.lines[i];
        return selectedlines;
    };

    // Return true if selected text contains has the specified prefix
    this.hasPrefix = function(prefix) {
        var line = this.lines[this.start.line];
        var start = this.start.position - prefix.length;
        if ((start < 0) || (line.substring(start, this.start.position) != prefix))
            return false;
        return true;
    };

    // Return true if selected text contains has the specified suffix
    this.hasSuffix = function(suffix) {
        var line = this.lines[this.end.line];
        var end = this.end.position + suffix.length;
        if ((end > line.length) || (line.substring(this.end.position, end) != suffix))
            return false;
        return true;
    };

    // Insert the line before the selection to the specified text. If force is
    // set to false and the line is already set, it will be left alone.
    this.insertPreviousLine = function(newline, force) {
        force = force !== undefined ? force : true;
        var prevnum = this.start.line - 1;
        if ((force) || ((prevnum >= 0) && (this.lines[prevnum] != newline))) {
            this.lines.splice(this.start.line, 0, newline);
            this.start.line += 1;
            this.end.line += 1;
        }
    };

    // Insert the line after the selection to the specified text. If force is
    // set to false and the line is already set, it will be left alone.
    this.insertNextLine = function(newline, force) {
        force = force !== undefined ? force : true;
        var nextnum = this.end.line + 1;
        if ((force) || ((nextnum < this.lines.length) && (this.lines[nextnum] != newline)))
            this.lines.splice(nextnum, 0, newline);
    };

    // Return true if selected text is wrapped with prefix & suffix
    this.isWrapped = function(prefix, suffix) {
        return ((this.hasPrefix(prefix)) && (this.hasSuffix(suffix)));
    };

    // Return the selection length
    this.length = function() {
        return this.val().length;
    };

    // Return true if all lines have the specified prefix. Optionally
    // specify prefix as a regular expression.
    this.linesHavePrefix = function(prefix) {
        for (var i=this.start.line; i <= this.end.line; i++) {
            var line = this.lines[i];
            if ((typeof(prefix) == 'string') && (!line.startswith(prefix))) {
                return false;
            } else if ((typeof(prefix) != 'string') && (!line.match(prefix))) {
                return false;
            }
        }
        return true;
    };

    // Prepend the specified text to the selection
    this.prepend = function(text) {
        var line = this.lines[this.start.line];
        var newline = line.substring(0, this.start.position) +
            text + line.substring(this.start.position, line.length);
        this.lines[this.start.line] = newline;
        // Update Class Variables
        if (this.start.line == this.end.line)
            this.end.position += text.length;
    };

    // Remove the prefix from each line in the selection. If the line
    // does not contain the specified prefix, it will be left alone.
    // Optionally specify prefix as a regular expression.
    this.removeLinePrefixes = function(prefix) {
        for (var i=this.start.line; i <= this.end.line; i++) {
            var line = this.lines[i];
            var match = prefix;
            // Check prefix is a regex
            if (typeof(prefix) != 'string')
                match = line.match(prefix)[0];
            // Do the replace
            if (line.startswith(match)) {
                this.lines[i] = line.substring(match.length, line.length);
                if (i == this.start.line)
                    this.start.position -= match.length;
                if (i == this.end.line)
                    this.end.position -= match.length;
            }

        }
    };

    // Remove the previous line. If regex is specified, it will
    // only be removed if there is a match.
    this.removeNextLine = function(regex) {
        var nextnum = this.end.line + 1;
        var removeit = false;
        if ((nextnum < this.lines.length) && (regex) && (this.lines[nextnum].match(regex)))
            removeit = true;
        if ((nextnum < this.lines.length) && (!regex))
            removeit = true;
        if (removeit)
            this.lines.splice(nextnum, 1);
    };

    // Remove the specified prefix from the selection
    this.removePrefix = function(prefix) {
        if (this.hasPrefix(prefix)) {
            var line = this.lines[this.start.line];
            var start = this.start.position - prefix.length;
            var newline = line.substring(0, start) +
                line.substring(this.start.position, line.length);
            this.lines[this.start.line] = newline;
            this.start.position -= prefix.length;
            if (this.start.line == this.end.line)
                this.end.position -= prefix.length;
        }
    };

    // Remove the previous line. If regex is specified, it will
    // only be removed if there is a match.
    this.removePreviousLine = function(regex) {
        var prevnum = this.start.line - 1;
        var removeit = false;
        if ((prevnum >= 0) && (regex) && (this.lines[prevnum].match(regex)))
            removeit = true;
        if ((prevnum >= 0) && (!regex))
            removeit = true;
        if (removeit) {
            this.lines.splice(prevnum, 1);
            this.start.line -= 1;
            this.end.line -= 1;
        }
    };

    // Remove the specified suffix from the selection
    this.removeSuffix = function(suffix) {
        if (this.hasSuffix(suffix)) {
            var line = this.lines[this.end.line];
            var end = this.end.position + suffix.length;
            var newline = line.substring(0, this.end.position) +
                line.substring(end, line.length);
            this.lines[this.end.line] = newline;
        }
    };

    // Set the prefix of each selected line. If the prefix is already and
    // set, the line willl be left alone.
    this.setLinePrefixes = function(prefix, increment) {
        increment = increment ? increment : false;
        for (var i=this.start.line; i <= this.end.line; i++) {
            if (!this.lines[i].startswith(prefix)) {
                // Check if prefix is incrementing
                if (increment) {
                    var num = parseInt(prefix.match(/\d+/)[0]);
                    prefix = prefix.replace(num, num+1);
                }
                // Add the prefix to the line
                var numspaces = this.lines[i].match(/^\s*/)[0].length;
                this.lines[i] = this.lines[i].lstrip();
                this.lines[i] = prefix + this.lines[i];
                if (i == this.start.line)
                    this.start.position += prefix.length - numspaces;
                if (i == this.end.line)
                    this.end.position += prefix.length - numspaces;
            }
        }
    };

    // Unwrap the selection prefix & suffix
    this.unwrap = function(prefix, suffix) {
        this.removePrefix(prefix);
        this.removeSuffix(suffix);
    };

    // Remove blank lines from before and after the selection.  If the
    // previous or next line is not blank, it will be left alone.
    this.unwrapBlankLines = function() {
        wysiwym.selection.removePreviousLine(/^\s*$/);
        wysiwym.selection.removeNextLine(/^\s*$/);
    };

    // Return the selection value
    this.val = function() {
        var value = '';
        for (var i=0; i < this.lines.length; i++) {
            var line = this.lines[i];
            if ((i == this.start.line) && (i == this.end.line)) {
                return line.substring(this.start.position, this.end.position);
            } else if (i == this.start.line) {
                value += line.substring(this.start.position, line.length) +'\n';
            } else if ((i > this.start.line) && (i < this.end.line)) {
                value += line +'\n';
            } else if (i == this.end.line) {
                value += line.substring(0, this.end.position)
            }
        }
        return value;
    };

    // Wrap the selection with the specified prefix & suffix
    this.wrap = function(prefix, suffix) {
        this.addPrefix(prefix);
        this.addSuffix(suffix);
    };

    // Wrap the selected lines with blank lines.  If there is already
    // a blank line in place, another one will not be added.
    this.wrapBlankLines = function() {
        if (wysiwym.selection.start.line > 0)
            wysiwym.selection.insertPreviousLine(BLANKLINE, false);
        if (wysiwym.selection.end.line < wysiwym.lines.length - 1)
            wysiwym.selection.insertNextLine(BLANKLINE, false);
    };

}
Wysiwym.Textarea = function(textarea) {
    this.textelem = textarea.get(0)                 // Javascript textarea element
    this.textarea = textarea;                       // jQuery textarea object
    this.lines = [];                                // Current textarea lines
    this.selection = new Wysiwym.Selection(this);   // Selection properties & manipulation
    this.scroll = this.textelem.scrollTop;          // Current cursor scroll position

    // Return a string representation of this object.
    this.toString = function() {
        var str = 'TEXTAREA: #'+ this.textarea.attr('id') +'\n';
        str += this.selection.toString();
        str += 'SCROLL: '+ this.scroll +'px\n';
        str += '---\n';
        for (var i=0; i<this.lines.length; i++)
            str += 'LINE '+ i +': '+ this.lines[i] +'\n';
        return str;
    };

    // Return the current text value of this textarea object
    this.getProperties = function() {
        var newtext = '';           // New textarea value
        var selectionStart = 0;     // Absolute cursor start position
        var selectionEnd = 0;       // Absolute cursor end position
        for (var i=0; i < this.lines.length; i++) {
            if (i == this.selection.start.line)
                selectionStart = newtext.length + this.selection.start.position;
            if (i == this.selection.end.line)
                selectionEnd = newtext.length + this.selection.end.position;
            newtext += this.lines[i];
            if (i != this.lines.length - 1)
                newtext += '\n';
        }
        return [newtext, selectionStart, selectionEnd];
    };

    // Return the absolute start and end selection postions
    // StackOverflow #1: http://goo.gl/2vSnF
    // StackOverflow #2: http://goo.gl/KHm0d
    this.getSelectionStartEnd = function() {
        if (typeof(this.textelem.selectionStart) == 'number') {
            var startpos = this.textelem.selectionStart;
            var endpos = this.textelem.selectionEnd;
        } else {
            this.textelem.focus();
            var text = this.textelem.value.replace(/\r\n/g, '\n');
            var textlen = text.length;
            var range = document.selection.createRange();
            var textrange = this.textelem.createTextRange();
            textrange.moveToBookmark(range.getBookmark());
            var endrange = this.textelem.createTextRange();
            endrange.collapse(false);
            if (textrange.compareEndPoints('StartToEnd', endrange) > -1) {
                var startpos = textlen;
                var endpos = textlen;
            } else {
                var startpos = -textrange.moveStart('character', -textlen);
                //startpos += text.slice(0, startpos).split('\n').length - 1;
                if (textrange.compareEndPoints('EndToEnd', endrange) > -1) {
                    var endpos = textlen;
                } else {
                    var endpos = -textrange.moveEnd('character', -textlen);
                    //endpos += text.slice(0, endpos).split('\n').length - 1;
                }
            }
        }
        return [startpos, endpos];
    };

    // Update the textarea with the current lines and cursor settings
    this.update = function() {
        var properties = this.getProperties();
        var newtext = properties[0];
        var selectionStart = properties[1];
        var selectionEnd = properties[2];
        this.textarea.val(newtext);
        if (this.textelem.setSelectionRange) {
            this.textelem.setSelectionRange(selectionStart, selectionEnd);
        } else if (this.textelem.createTextRange) {
            var range = this.textelem.createTextRange();
            range.collapse(true);
            range.moveStart('character', selectionStart);
            range.moveEnd('character', selectionEnd - selectionStart);
            range.select();
        }
        console.log('Set scroll: '+ this.scroll)
        this.textelem.scrollTop = this.scroll;
        this.textarea.focus();
    };

    // Initialize the Wysiwym.Textarea
    this.init = function() {
        var text = textarea.val().replace(/\r\n/g, '\n');
        var selectionInfo = this.getSelectionStartEnd(this.textelem);
        var selectionStart = selectionInfo[0];
        var selectionEnd = selectionInfo[1];
        var endline = 0;
        while (endline >= 0) {
            var endline = text.indexOf('\n');
            var line = text.substring(0, endline >= 0 ? endline : text.length);
            if ((selectionStart <= line.length) && (selectionEnd >= 0)) {
                if (selectionStart >= 0) {
                    this.selection.start.line = this.lines.length;
                    this.selection.start.position = selectionStart;
                }
                if (selectionEnd <= line.length) {
                    this.selection.end.line = this.lines.length;
                    this.selection.end.position = selectionEnd;
                }
            }
            this.lines[this.lines.length] = line;
            text = endline >= 0 ? text.substring(endline + 1, text.length) : '';
            selectionStart -= endline + 1;
            selectionEnd -= endline + 1;
        }
        // Tweak the selection end position if its on the edge
        if ((this.selection.end.position == 0) && (this.selection.end.line != this.selection.start.line)) {
            this.selection.end.line -= 1;
            this.selection.end.position = this.lines[this.selection.end.line].length;
        }
    };
    this.init();
};
Wysiwym.Button = function(name, callback, data, cssclass) {
    this.name = name;                  // Button Name
    this.callback = callback;          // Callback function for this button
    this.data = data ? data : {};      // Callback arguments
    this.cssclass = cssclass;          // CSS Class to apply to button

    // Return the CSS Class for this button
    this.getCssClass = function() {
        if (!this.cssclass)
            return this.name.toLowerCase().replace(' ', '');
        return this.cssclass;
    };

    // Create and return a new Button jQuery element
    this.create = function() {
        var text = $('<span class="text">'+ this.name +'</span>');
        var wrap = $('<span class="wrap"></span>').append(text);
        var button = $('<div class="button"></div>').append(wrap);
        // Apply the title, css, and click bind.
        button.attr('title', this.name);
        button.addClass(this.getCssClass());
        // Make everything 'unselectable' so IE doesn't freak out
        text.attr('unselectable', 'on');
        wrap.attr('unselectable', 'on');
        button.attr('unselectable', 'on');
        return button;
    };
}
Wysiwym.span = function(event) {
    var markup = event.data.markup;    // (required) Markup Language
    var prefix = event.data.prefix;    // (required) Text wrap prefix
    var suffix = event.data.suffix;    // (required) Text wrap suffix
    var text = event.data.text;        // (required) Default wrap text (if nothing selected)
    var wysiwym = new Wysiwym.Textarea(markup.textarea);
    if (wysiwym.selection.isWrapped(prefix, suffix)) {
        wysiwym.selection.unwrap(prefix, suffix);
    } else if (wysiwym.selection.length() == 0) {
        wysiwym.selection.append(text);
        wysiwym.selection.wrap(prefix, suffix);
    } else {
        wysiwym.selection.wrap(prefix, suffix);
    }
    wysiwym.update();
};
Wysiwym.list = function(event) {
    var markup = event.data.markup;    // (required) Markup Language
    var prefix = event.data.prefix;    // (required) Line prefix text
    var wrap = event.data.wrap;        // (optional) If true, wrap list with blank lines
    var regex = event.data.regex;      // (optional) Set to regex matching prefix to increment num
    var wysiwym = new Wysiwym.Textarea(markup.textarea);
    if (wysiwym.selection.linesHavePrefix(regex?regex:prefix)) {
        wysiwym.selection.removeLinePrefixes(regex?regex:prefix);
        if (wrap) { wysiwym.selection.unwrapBlankLines(); }
    } else {
        wysiwym.selection.setLinePrefixes(prefix, regex);
        if (wrap) { wysiwym.selection.wrapBlankLines(); }
    }
    wysiwym.update();
};
Wysiwym.block = function(event) {
    var markup = event.data.markup;    // (required) Markup Language
    var prefix = event.data.prefix;    // (required) Line prefix text
    var wrap = event.data.wrap;        // (optional) If true, wrap list with blank lines
    var wysiwym = new Wysiwym.Textarea(markup.textarea);
    var firstline = wysiwym.selection.getLines()[0];
    if (firstline.startswith(prefix)) {
        wysiwym.selection.removeLinePrefixes(prefix);
        if (wrap) { wysiwym.selection.unwrapBlankLines(); }
    } else {
        wysiwym.selection.addLinePrefixes(prefix);
        if (wrap) { wysiwym.selection.wrapBlankLines(); }
    }
    wysiwym.update();
};
Wysiwym.autoIndent = function(event) {
    // Only continue if keyCode == 13
    if (event.keyCode != 13)
        return true;
    // ReturnKey pressed, lets indent!
    var markup = event.data.markup;    // Markup Language
    var wysiwym = new Wysiwym.Textarea(markup.textarea);
    var linenum = wysiwym.selection.start.line;
    var line = wysiwym.lines[linenum];
    var postcursor = line.substring(wysiwym.selection.start.position, line.length);
    // Make sure nothing is selected & there is no text after the cursor
    if ((wysiwym.selection.length() != 0) || (postcursor))
        return true;
    // So far so good; check for a matching indent regex
    for (var i=0; i < markup.autoindents.length; i++) {
        var regex = markup.autoindents[i];
        var matches = line.match(regex);
        if (matches) {
            var prefix = matches[0];
            var suffix = line.substring(prefix.length, line.length);
            // NOTE: If a selection is made in the regex, it's assumed that the
            // matching text is a number should be auto-incremented (ie: #. lists).
            if (matches.length == 2) {
                var num = parseInt(matches[1]);
                prefix = prefix.replace(matches[1], num+1);
            }
            if (suffix) {
                // Regular auto-indent; Repeat the prefix
                wysiwym.selection.addPrefix('\n'+ prefix);
                wysiwym.update();
                return false;
            } else {
                // Return on blank indented line (clear prefix)
                wysiwym.lines[linenum] = BLANKLINE;
                wysiwym.selection.start.position = 0;
                wysiwym.selection.end.position = wysiwym.selection.start.position;
                if (markup.exitindentblankline) {
                    wysiwym.selection.addPrefix('\n');
                }
                wysiwym.update();
                return false;
            }
        }
    }
    return true;
}
Wysiwym.Markdown = function(textarea) {
    this.textarea = textarea;    // jQuery textarea object

    // Initialize the Markdown Buttons
    this.buttons = [
        new Wysiwym.Button('Bold',   Wysiwym.span,  {prefix:'**', suffix:'**', text:'strong text'}),
        new Wysiwym.Button('Italic', Wysiwym.span,  {prefix:'_',  suffix:'_',  text:'italic text'}),
        new Wysiwym.Button('Link',   Wysiwym.span,  {prefix:'[',  suffix:'](http://example.com)', text:'link text'}),
        new Wysiwym.Button('Bullet List', Wysiwym.list, {prefix:'* ', wrap:true}),
        new Wysiwym.Button('Number List', Wysiwym.list, {prefix:'0. ', wrap:true, regex:/^\s*\d+\.\s/}),
        new Wysiwym.Button('Quote',  Wysiwym.list,  {prefix:'> ',   wrap:true}),
        new Wysiwym.Button('Code',   Wysiwym.block, {prefix:'    ', wrap:true})
    ];

    // Configure auto-indenting
    this.exitindentblankline = true;    // True to insert blank line when exiting auto-indent ;)
    this.autoindents = [                // Regex lookups for auto-indent
        /^\s*\*\s/,                     // Bullet list
        /^\s*(\d+)\.\s/,                // Number list (number selected for auto-increment)
        /^\s*\>\s/,                     // Quote list
        /^\s{4}\s*/                     // Code block
    ];

    // Syntax items to display in the help box
    this.help = [
        { label: 'Header', syntax: '## Header ##' },
        { label: 'Bold',   syntax: '**bold**' },
        { label: 'Italic', syntax: '_italics_' },
        { label: 'Link',   syntax: '[pk!](http://google.com)' },
        { label: 'Bullet List', syntax: '* list item' },
        { label: 'Number List', syntax: '1. list item' },
        { label: 'Blockquote', syntax: '&gt; quoted text' },
        { label: 'Large Code Block', syntax: '(Begin lines with 4 spaces)' },
        { label: 'Inline Code Block', syntax: '&lt;code&gt;inline code&lt;/code&gt;' }
    ];
};
Wysiwym.Mediawiki = function(textarea) {
    this.textarea = textarea;    // jQuery textarea object

    // Initialize the Markdown Buttons
    this.buttons = [
        new Wysiwym.Button('Bold',   Wysiwym.span,  {prefix:"'''", suffix:"'''", text:'strong text'}),
        new Wysiwym.Button('Italic', Wysiwym.span,  {prefix:"''",  suffix:"''",  text:'italic text'}),
        new Wysiwym.Button('Link',   Wysiwym.span,  {prefix:'[http://example.com ',  suffix:']', text:'link text'}),
        new Wysiwym.Button('Bullet List', Wysiwym.list, {prefix:'* ', wrap:true}),
        new Wysiwym.Button('Number List', Wysiwym.list, {prefix:'# ', wrap:true}),
        new Wysiwym.Button('Quote',  Wysiwym.span,  {prefix:'<blockquote>', suffix:'</blockquote>', text:'quote text'}),
        new Wysiwym.Button('Code', Wysiwym.span,  {prefix:'<pre>', suffix:'</pre>', text:'code text'})
    ];

    // Configure auto-indenting
    this.exitindentblankline = true;    // True to insert blank line when exiting auto-indent ;)
    this.autoindents = [                // Regex lookups for auto-indent
        /^\s*\*\s/,                     // Bullet list
        /^\s*\#\s/                      // Number list
    ];

    // Syntax items to display in the help box
    this.help = [
        { label: 'Header', syntax: '== Header ==' },
        { label: 'Bold',   syntax: "'''bold'''" },
        { label: 'Italic', syntax: "''italics''" },
        { label: 'Link',   syntax: '[http://google.com pk!]' },
        { label: 'Bullet List', syntax: '* list item' },
        { label: 'Number List', syntax: '# list item' },
        { label: 'Blockquote', syntax: '&lt;blockquote&gt;quote&lt;/blockquote&gt;' },
        { label: 'Large Code Block', syntax: '&lt;pre&gt;Code block&lt;/pre&gt;' }
    ];
};
Wysiwym.BBCode = function(textarea) {
    this.textarea = textarea;    // jQuery textarea object

    // Initialize the Markdown Buttons
    this.buttons = [
        new Wysiwym.Button('Bold',   Wysiwym.span,  {prefix:"[b]", suffix:"[/b]", text:'strong text'}),
        new Wysiwym.Button('Italic', Wysiwym.span,  {prefix:"[i]",  suffix:"[/i]",  text:'italic text'}),
        new Wysiwym.Button('Link',   Wysiwym.span,  {prefix:'[url="http://example.com"]',  suffix:'[/url]', text:'link text'}),
        new Wysiwym.Button('Quote',  Wysiwym.span,  {prefix:'[quote]',  suffix:'[/quote]', text:'quote text'}),
        new Wysiwym.Button('Code',   Wysiwym.span,  {prefix:'[code]',  suffix:'[/code]', text:'code text'})
    ];

    // Syntax items to display in the help box
    this.help = [
        { label: 'Bold',   syntax: "[b]bold[/b]" },
        { label: 'Italic', syntax: "[i]italics[/i]" },
        { label: 'Link',   syntax: '[url="http://example.com"]pk![/url]' },
        { label: 'Blockquote', syntax: '[quote]quote text[/quote]' },
        { label: 'Large Code Block', syntax: '[code]code text[/code]' }
    ];
};
String.prototype.strip = function() { return this.replace(/^\s+|\s+$/g, ''); };
String.prototype.lstrip = function() { return this.replace(/^\s+/, ''); };
String.prototype.rstrip = function() { return this.replace(/\s+$/, ''); };
String.prototype.startswith = function(str) { return this.substring(0, str.length) == str; };
String.prototype.endswith = function(str) { return this.substring(str.length, this.length) == str; };


// @PLUGIN By Google Inc.
window['PR_SHOULD_USE_CONTINUATION'] = true;
window['PR_TAB_WIDTH'] = 8;
window['PR_normalizedHtml']
  = window['PR']
  = window['prettyPrintOne']
  = window['prettyPrint'] = void 0;
window['_pr_isIE6'] = function () {
  var ieVersion = navigator && navigator.userAgent &&
      navigator.userAgent.match(/\bMSIE ([678])\./);
  ieVersion = ieVersion ? +ieVersion[1] : false;
  window['_pr_isIE6'] = function () { return ieVersion; };
  return ieVersion;
};


(function () {
  // Keyword lists for various languages.
  var FLOW_CONTROL_KEYWORDS =
      "break continue do else for if return while ";
  var C_KEYWORDS = FLOW_CONTROL_KEYWORDS + "auto case char const default " +
      "double enum extern float goto int long register short signed sizeof " +
      "static struct switch typedef union unsigned void volatile ";
  var COMMON_KEYWORDS = C_KEYWORDS + "catch class delete false import " +
      "new operator private protected public this throw true try typeof ";
  var CPP_KEYWORDS = COMMON_KEYWORDS + "alignof align_union asm axiom bool " +
      "concept concept_map const_cast constexpr decltype " +
      "dynamic_cast explicit export friend inline late_check " +
      "mutable namespace nullptr reinterpret_cast static_assert static_cast " +
      "template typeid typename using virtual wchar_t where ";
  var JAVA_KEYWORDS = COMMON_KEYWORDS +
      "abstract boolean byte extends final finally implements import " +
      "instanceof null native package strictfp super synchronized throws " +
      "transient ";
  var CSHARP_KEYWORDS = JAVA_KEYWORDS +
      "as base by checked decimal delegate descending event " +
      "fixed foreach from group implicit in interface internal into is lock " +
      "object out override orderby params partial readonly ref sbyte sealed " +
      "stackalloc string select uint ulong unchecked unsafe ushort var ";
  var JSCRIPT_KEYWORDS = COMMON_KEYWORDS +
      "debugger eval export function get null set undefined var with " +
      "Infinity NaN ";
  var PERL_KEYWORDS = "caller delete die do dump elsif eval exit foreach for " +
      "goto if import last local my next no our print package redo require " +
      "sub undef unless until use wantarray while BEGIN END ";
  var PYTHON_KEYWORDS = FLOW_CONTROL_KEYWORDS + "and as assert class def del " +
      "elif except exec finally from global import in is lambda " +
      "nonlocal not or pass print raise try with yield " +
      "False True None ";
  var RUBY_KEYWORDS = FLOW_CONTROL_KEYWORDS + "alias and begin case class def" +
      " defined elsif end ensure false in module next nil not or redo rescue " +
      "retry self super then true undef unless until when yield BEGIN END ";
  var SH_KEYWORDS = FLOW_CONTROL_KEYWORDS + "case done elif esac eval fi " +
      "function in local set then until ";
  var ALL_KEYWORDS = (
      CPP_KEYWORDS + CSHARP_KEYWORDS + JSCRIPT_KEYWORDS + PERL_KEYWORDS +
      PYTHON_KEYWORDS + RUBY_KEYWORDS + SH_KEYWORDS);

  // token style names.  correspond to css classes
  /** token style for a string literal */
  var PR_STRING = 'str';
  /** token style for a keyword */
  var PR_KEYWORD = 'kwd';
  /** token style for a comment */
  var PR_COMMENT = 'com';
  /** token style for a type */
  var PR_TYPE = 'typ';
  /** token style for a literal value.  e.g. 1, null, true. */
  var PR_LITERAL = 'lit';
  /** token style for a punctuation string. */
  var PR_PUNCTUATION = 'pun';
  /** token style for a punctuation string. */
  var PR_PLAIN = 'pln';

  /** token style for an sgml tag. */
  var PR_TAG = 'tag';
  /** token style for a markup declaration such as a DOCTYPE. */
  var PR_DECLARATION = 'dec';
  /** token style for embedded source. */
  var PR_SOURCE = 'src';
  /** token style for an sgml attribute name. */
  var PR_ATTRIB_NAME = 'atn';
  /** token style for an sgml attribute value. */
  var PR_ATTRIB_VALUE = 'atv';
  
  var PR_NOCODE = 'nocode';
  var REGEXP_PRECEDER_PATTERN = function () {
      var preceders = [
          "!", "!=", "!==", "#", "%", "%=", "&", "&&", "&&=",
          "&=", "(", "*", "*=", /* "+", */ "+=", ",", /* "-", */ "-=",
          "->", /*".", "..", "...", handled below */ "/", "/=", ":", "::", ";",
          "<", "<<", "<<=", "<=", "=", "==", "===", ">",
          ">=", ">>", ">>=", ">>>", ">>>=", "?", "@", "[",
          "^", "^=", "^^", "^^=", "{", "|", "|=", "||",
          "||=", "~" /* handles =~ and !~ */,
          "break", "case", "continue", "delete",
          "do", "else", "finally", "instanceof",
          "return", "throw", "try", "typeof"
          ];
      var pattern = '(?:^^|[+-]';
      for (var i = 0; i < preceders.length; ++i) {
        pattern += '|' + preceders[i].replace(/([^=<>:&a-z])/g, '\\$1');
      }
      pattern += ')\\s*';  // matches at end, and matches empty string
      return pattern;
      // CAVEAT: this does not properly handle the case where a regular
      // expression immediately follows another since a regular expression may
      // have flags for case-sensitivity and the like.  Having regexp tokens
      // adjacent is not valid in any language I'm aware of, so I'm punting.
      // TODO: maybe style special characters inside a regexp as punctuation.
    }();

  // Define regexps here so that the interpreter doesn't have to create an
  // object each time the function containing them is called.
  // The language spec requires a new object created even if you don't access
  // the $1 members.
  var pr_amp = /&/g;
  var pr_lt = /</g;
  var pr_gt = />/g;
  var pr_quot = /\"/g;
  /** like textToHtml but escapes double quotes to be attribute safe. */
  function attribToHtml(str) {
    return str.replace(pr_amp, '&amp;')
        .replace(pr_lt, '&lt;')
        .replace(pr_gt, '&gt;')
        .replace(pr_quot, '&quot;');
  }

  /** escapest html special characters to html. */
  function textToHtml(str) {
    return str.replace(pr_amp, '&amp;')
        .replace(pr_lt, '&lt;')
        .replace(pr_gt, '&gt;');
  }


  var pr_ltEnt = /&lt;/g;
  var pr_gtEnt = /&gt;/g;
  var pr_aposEnt = /&apos;/g;
  var pr_quotEnt = /&quot;/g;
  var pr_ampEnt = /&amp;/g;
  var pr_nbspEnt = /&nbsp;/g;
  /** unescapes html to plain text. */
  function htmlToText(html) {
    var pos = html.indexOf('&');
    if (pos < 0) { return html; }
    // Handle numeric entities specially.  We can't use functional substitution
    // since that doesn't work in older versions of Safari.
    // These should be rare since most browsers convert them to normal chars.
    for (--pos; (pos = html.indexOf('&#', pos + 1)) >= 0;) {
      var end = html.indexOf(';', pos);
      if (end >= 0) {
        var num = html.substring(pos + 3, end);
        var radix = 10;
        if (num && num.charAt(0) === 'x') {
          num = num.substring(1);
          radix = 16;
        }
        var codePoint = parseInt(num, radix);
        if (!isNaN(codePoint)) {
          html = (html.substring(0, pos) + String.fromCharCode(codePoint) +
                  html.substring(end + 1));
        }
      }
    }

    return html.replace(pr_ltEnt, '<')
        .replace(pr_gtEnt, '>')
        .replace(pr_aposEnt, "'")
        .replace(pr_quotEnt, '"')
        .replace(pr_nbspEnt, ' ')
        .replace(pr_ampEnt, '&');
  }

  /** is the given node's innerHTML normally unescaped? */
  function isRawContent(node) {
    return 'XMP' === node.tagName;
  }

  var newlineRe = /[\r\n]/g;
  /**
   * Are newlines and adjacent spaces significant in the given node's innerHTML?
   */
  function isPreformatted(node, content) {
    // PRE means preformatted, and is a very common case, so don't create
    // unnecessary computed style objects.
    if ('PRE' === node.tagName) { return true; }
    if (!newlineRe.test(content)) { return true; }  // Don't care
    var whitespace = '';
    // For disconnected nodes, IE has no currentStyle.
    if (node.currentStyle) {
      whitespace = node.currentStyle.whiteSpace;
    } else if (window.getComputedStyle) {
      // Firefox makes a best guess if node is disconnected whereas Safari
      // returns the empty string.
      whitespace = window.getComputedStyle(node, null).whiteSpace;
    }
    return !whitespace || whitespace === 'pre';
  }

  function normalizedHtml(node, out) {
    switch (node.nodeType) {
      case 1:  // an element
        var name = node.tagName.toLowerCase();
        out.push('<', name);
        for (var i = 0; i < node.attributes.length; ++i) {
          var attr = node.attributes[i];
          if (!attr.specified) { continue; }
          out.push(' ');
          normalizedHtml(attr, out);
        }
        out.push('>');
        for (var child = node.firstChild; child; child = child.nextSibling) {
          normalizedHtml(child, out);
        }
        if (node.firstChild || !/^(?:br|link|img)$/.test(name)) {
          out.push('<\/', name, '>');
        }
        break;
      case 2: // an attribute
        out.push(node.name.toLowerCase(), '="', attribToHtml(node.value), '"');
        break;
      case 3: case 4: // text
        out.push(textToHtml(node.nodeValue));
        break;
    }
  }

  /**
   * Given a group of {@link RegExp}s, returns a {@code RegExp} that globally
   * matches the union o the sets o strings matched d by the input RegExp.
   * Since it matches globally, if the input strings have a start-of-input
   * anchor (/^.../), it is ignored for the purposes of unioning.
   * @param {Array.<RegExp>} regexs non multiline, non-global regexs.
   * @return {RegExp} a global regex.
   */
  function combinePrefixPatterns(regexs) {
    var capturedGroupIndex = 0;

    var needToFoldCase = false;
    var ignoreCase = false;
    for (var i = 0, n = regexs.length; i < n; ++i) {
      var regex = regexs[i];
      if (regex.ignoreCase) {
        ignoreCase = true;
      } else if (/[a-z]/i.test(regex.source.replace(
                     /\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi, ''))) {
        needToFoldCase = true;
        ignoreCase = false;
        break;
      }
    }

    function decodeEscape(charsetPart) {
      if (charsetPart.charAt(0) !== '\\') { return charsetPart.charCodeAt(0); }
      switch (charsetPart.charAt(1)) {
        case 'b': return 8;
        case 't': return 9;
        case 'n': return 0xa;
        case 'v': return 0xb;
        case 'f': return 0xc;
        case 'r': return 0xd;
        case 'u': case 'x':
          return parseInt(charsetPart.substring(2), 16)
              || charsetPart.charCodeAt(1);
        case '0': case '1': case '2': case '3': case '4':
        case '5': case '6': case '7':
          return parseInt(charsetPart.substring(1), 8);
        default: return charsetPart.charCodeAt(1);
      }
    }

    function encodeEscape(charCode) {
      if (charCode < 0x20) {
        return (charCode < 0x10 ? '\\x0' : '\\x') + charCode.toString(16);
      }
      var ch = String.fromCharCode(charCode);
      if (ch === '\\' || ch === '-' || ch === '[' || ch === ']') {
        ch = '\\' + ch;
      }
      return ch;
    }

    function caseFoldCharset(charSet) {
      var charsetParts = charSet.substring(1, charSet.length - 1).match(
          new RegExp(
              '\\\\u[0-9A-Fa-f]{4}'
              + '|\\\\x[0-9A-Fa-f]{2}'
              + '|\\\\[0-3][0-7]{0,2}'
              + '|\\\\[0-7]{1,2}'
              + '|\\\\[\\s\\S]'
              + '|-'
              + '|[^-\\\\]',
              'g'));
      var groups = [];
      var ranges = [];
      var inverse = charsetParts[0] === '^';
      for (var i = inverse ? 1 : 0, n = charsetParts.length; i < n; ++i) {
        var p = charsetParts[i];
        switch (p) {
          case '\\B': case '\\b':
          case '\\D': case '\\d':
          case '\\S': case '\\s':
          case '\\W': case '\\w':
            groups.push(p);
            continue;
        }
        var start = decodeEscape(p);
        var end;
        if (i + 2 < n && '-' === charsetParts[i + 1]) {
          end = decodeEscape(charsetParts[i + 2]);
          i += 2;
        } else {
          end = start;
        }
        ranges.push([start, end]);
        // If the range might intersect letters, then expand it.
        if (!(end < 65 || start > 122)) {
          if (!(end < 65 || start > 90)) {
            ranges.push([Math.max(65, start) | 32, Math.min(end, 90) | 32]);
          }
          if (!(end < 97 || start > 122)) {
            ranges.push([Math.max(97, start) & ~32, Math.min(end, 122) & ~32]);
          }
        }
      }

      // [[1, 10], [3, 4], [8, 12], [14, 14], [16, 16], [17, 17]]
      // -> [[1, 12], [14, 14], [16, 17]]
      ranges.sort(function (a, b) { return (a[0] - b[0]) || (b[1]  - a[1]); });
      var consolidatedRanges = [];
      var lastRange = [NaN, NaN];
      for (var i = 0; i < ranges.length; ++i) {
        var range = ranges[i];
        if (range[0] <= lastRange[1] + 1) {
          lastRange[1] = Math.max(lastRange[1], range[1]);
        } else {
          consolidatedRanges.push(lastRange = range);
        }
      }

      var out = ['['];
      if (inverse) { out.push('^'); }
      out.push.apply(out, groups);
      for (var i = 0; i < consolidatedRanges.length; ++i) {
        var range = consolidatedRanges[i];
        out.push(encodeEscape(range[0]));
        if (range[1] > range[0]) {
          if (range[1] + 1 > range[0]) { out.push('-'); }
          out.push(encodeEscape(range[1]));
        }
      }
      out.push(']');
      return out.join('');
    }

    function allowAnywhereFoldCaseAndRenumberGroups(regex) {
      // Split into character sets, escape sequences, punctuation strings
      // like ('(', '(?:', ')', '^'), and runs of characters that do not
      // include any of the above.
      var parts = regex.source.match(
          new RegExp(
              '(?:'
              + '\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]'  // a character set
              + '|\\\\u[A-Fa-f0-9]{4}'  // a unicode escape
              + '|\\\\x[A-Fa-f0-9]{2}'  // a hex escape
              + '|\\\\[0-9]+'  // a back-reference or octal escape
              + '|\\\\[^ux0-9]'  // other escape sequence
              + '|\\(\\?[:!=]'  // start of a non-capturing group
              + '|[\\(\\)\\^]'  // start/emd of a group, or line start
              + '|[^\\x5B\\x5C\\(\\)\\^]+'  // run of other characters
              + ')',
              'g'));
      var n = parts.length;

      // Maps captured group numbers to the number they will occupy in
      // the output or to -1 if that has not been determined, or to
      // undefined if they need not be capturing in the output.
      var capturedGroups = [];

      // Walk over and identify back references to build the capturedGroups
      // mapping.
      for (var i = 0, groupIndex = 0; i < n; ++i) {
        var p = parts[i];
        if (p === '(') {
          // groups are 1-indexed, so max group index is count of '('
          ++groupIndex;
        } else if ('\\' === p.charAt(0)) {
          var decimalValue = +p.substring(1);
          if (decimalValue && decimalValue <= groupIndex) {
            capturedGroups[decimalValue] = -1;
          }
        }
      }

      // Renumber groups and reduce capturing groups to non-capturing groups
      // where possible.
      for (var i = 1; i < capturedGroups.length; ++i) {
        if (-1 === capturedGroups[i]) {
          capturedGroups[i] = ++capturedGroupIndex;
        }
      }
      for (var i = 0, groupIndex = 0; i < n; ++i) {
        var p = parts[i];
        if (p === '(') {
          ++groupIndex;
          if (capturedGroups[groupIndex] === undefined) {
            parts[i] = '(?:';
          }
        } else if ('\\' === p.charAt(0)) {
          var decimalValue = +p.substring(1);
          if (decimalValue && decimalValue <= groupIndex) {
            parts[i] = '\\' + capturedGroups[groupIndex];
          }
        }
      }

      // Remove any prefix anchors so that the output will match anywhere.
      // ^^ really does mean an anchored match though.
      for (var i = 0, groupIndex = 0; i < n; ++i) {
        if ('^' === parts[i] && '^' !== parts[i + 1]) { parts[i] = ''; }
      }

      // Expand letters to groupts to handle mixing of case-sensitive and
      // case-insensitive patterns if necessary.
      if (regex.ignoreCase && needToFoldCase) {
        for (var i = 0; i < n; ++i) {
          var p = parts[i];
          var ch0 = p.charAt(0);
          if (p.length >= 2 && ch0 === '[') {
            parts[i] = caseFoldCharset(p);
          } else if (ch0 !== '\\') {
            // TODO: handle letters in numeric escapes.
            parts[i] = p.replace(
                /[a-zA-Z]/g,
                function (ch) {
                  var cc = ch.charCodeAt(0);
                  return '[' + String.fromCharCode(cc & ~32, cc | 32) + ']';
                });
          }
        }
      }

      return parts.join('');
    }

    var rewritten = [];
    for (var i = 0, n = regexs.length; i < n; ++i) {
      var regex = regexs[i];
      if (regex.global || regex.multiline) { throw new Error('' + regex); }
      rewritten.push(
          '(?:' + allowAnywhereFoldCaseAndRenumberGroups(regex) + ')');
    }

    return new RegExp(rewritten.join('|'), ignoreCase ? 'gi' : 'g');
  }

  var PR_innerHtmlWorks = null;
  function getInnerHtml(node) {
    // inner html is hopelessly broken in Safari 2.0.4 when the content is
    // an html description of well formed XML and the containing tag is a PRE
    // tag, so we detect that case and emulate innerHTML.
    if (null === PR_innerHtmlWorks) {
      var testNode = document.createElement('PRE');
      testNode.appendChild(
          document.createTextNode('<!DOCTYPE foo PUBLIC "foo bar">\n<foo />'));
      PR_innerHtmlWorks = !/</.test(testNode.innerHTML);
    }

    if (PR_innerHtmlWorks) {
      var content = node.innerHTML;
      // XMP tags contain unescaped entities so require special handling.
      if (isRawContent(node)) {
        content = textToHtml(content);
      } else if (!isPreformatted(node, content)) {
        content = content.replace(/(<br\s*\/?>)[\r\n]+/g, '$1')
            .replace(/(?:[\r\n]+[ \t]*)+/g, ' ');
      }
      return content;
    }

    var out = [];
    for (var child = node.firstChild; child; child = child.nextSibling) {
      normalizedHtml(child, out);
    }
    return out.join('');
  }

  /** returns a function that expand tabs to spaces.  This function can be fed
    * successive chunks of text, and will maintain its own internal state to
    * keep track of how tabs are expanded.
    * @return {function (string) : string} a function that takes
    *   plain text and return the text with tabs expanded.
    * @private
    */
  function makeTabExpander(tabWidth) {
    var SPACES = '                ';
    var charInLine = 0;

    return function (plainText) {
      // walk over each character looking for tabs and newlines.
      // On tabs, expand them.  On newlines, reset charInLine.
      // Otherwise increment charInLine
      var out = null;
      var pos = 0;
      for (var i = 0, n = plainText.length; i < n; ++i) {
        var ch = plainText.charAt(i);

        switch (ch) {
          case '\t':
            if (!out) { out = []; }
            out.push(plainText.substring(pos, i));
            // calculate how much space we need in front of this part
            // nSpaces is the amount of padding -- the number of spaces needed
            // to move us to the next column, where columns occur at factors of
            // tabWidth.
            var nSpaces = tabWidth - (charInLine % tabWidth);
            charInLine += nSpaces;
            for (; nSpaces >= 0; nSpaces -= SPACES.length) {
              out.push(SPACES.substring(0, nSpaces));
            }
            pos = i + 1;
            break;
          case '\n':
            charInLine = 0;
            break;
          default:
            ++charInLine;
        }
      }
      if (!out) { return plainText; }
      out.push(plainText.substring(pos));
      return out.join('');
    };
  }

  var pr_chunkPattern = new RegExp(
      '[^<]+'  // A run of characters other than '<'
      + '|<\!--[\\s\\S]*?--\>'  // an HTML comment
      + '|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>'  // a CDATA section
      // a probable tag that should not be highlighted
      + '|<\/?[a-zA-Z](?:[^>\"\']|\'[^\']*\'|\"[^\"]*\")*>'
      + '|<',  // A '<' that does not begin a larger chunk
      'g');
  var pr_commentPrefix = /^<\!--/;
  var pr_cdataPrefix = /^<!\[CDATA\[/;
  var pr_brPrefix = /^<br\b/i;
  var pr_tagNameRe = /^<(\/?)([a-zA-Z][a-zA-Z0-9]*)/;

  /** split markup into chunks of html tags (style null) and
    * plain text (style {@link #PR_PLAIN}), converting tags which are
    * significant for tokenization (<br>) into their textual equivalent.
    *
    * @param {string} s html where whitespace is considered significant.
    * @return {Object} source code and extracted tags.
    * @private
    */
  function extractTags(s) {
    // since the pattern has the 'g' modifier and defines no capturing groups,
    // this will return a list of all chunks which we then classify and wrap as
    // PR_Tokens
    var matches = s.match(pr_chunkPattern);
    var sourceBuf = [];
    var sourceBufLen = 0;
    var extractedTags = [];
    if (matches) {
      for (var i = 0, n = matches.length; i < n; ++i) {
        var match = matches[i];
        if (match.length > 1 && match.charAt(0) === '<') {
          if (pr_commentPrefix.test(match)) { continue; }
          if (pr_cdataPrefix.test(match)) {
            // strip CDATA prefix and suffix.  Don't unescape since it's CDATA
            sourceBuf.push(match.substring(9, match.length - 3));
            sourceBufLen += match.length - 12;
          } else if (pr_brPrefix.test(match)) {
            // <br> tags are lexically significant so convert them to text.
            // This is undone later.
            sourceBuf.push('\n');
            ++sourceBufLen;
          } else {
            if (match.indexOf(PR_NOCODE) >= 0 && isNoCodeTag(match)) {
              // A <span class="nocode"> will start a section that should be
              // ignored.  Continue walking the list until we see a matching end
              // tag.
              var name = match.match(pr_tagNameRe)[2];
              var depth = 1;
              var j;
              end_tag_loop:
              for (j = i + 1; j < n; ++j) {
                var name2 = matches[j].match(pr_tagNameRe);
                if (name2 && name2[2] === name) {
                  if (name2[1] === '/') {
                    if (--depth === 0) { break end_tag_loop; }
                  } else {
                    ++depth;
                  }
                }
              }
              if (j < n) {
                extractedTags.push(
                    sourceBufLen, matches.slice(i, j + 1).join(''));
                i = j;
              } else {  // Ignore unclosed sections.
                extractedTags.push(sourceBufLen, match);
              }
            } else {
              extractedTags.push(sourceBufLen, match);
            }
          }
        } else {
          var literalText = htmlToText(match);
          sourceBuf.push(literalText);
          sourceBufLen += literalText.length;
        }
      }
    }
    return { source: sourceBuf.join(''), tags: extractedTags };
  }

  /** True if the given tag contains a class attribute with the nocode class. */
  function isNoCodeTag(tag) {
    return !!tag
        // First canonicalize the representation of attributes
        .replace(/\s(\w+)\s*=\s*(?:\"([^\"]*)\"|'([^\']*)'|(\S+))/g,
                 ' $1="$2$3$4"')
        // Then look for the attribute we want.
        .match(/[cC][lL][aA][sS][sS]=\"[^\"]*\bnocode\b/);
  }

  /**
   * Apply the given language handler to sourceCode and add the resulting
   * decorations to out.
   * @param {number} basePos the index of sourceCode within the chunk of source
   *    whose decorations are already present on out.
   */
  function appendDecorations(basePos, sourceCode, langHandler, out) {
    if (!sourceCode) { return; }
    var job = {
      source: sourceCode,
      basePos: basePos
    };
    langHandler(job);
    out.push.apply(out, job.decorations);
  }

  /** Given triples of [style, pattern, context] returns a lexing function,
    * The lexing function interprets the patterns to find token boundaries and
    * returns a decoration list of the form
    * [index_0, style_0, index_1, style_1, ..., index_n, style_n]
    * where index_n is an index into the sourceCode, and style_n is a style
    * constant like PR_PLAIN.  index_n-1 <= index_n, and style_n-1 applies to
    * all characters in sourceCode[index_n-1:index_n].
    *
    * The stylePatterns is a list whose elements have the form
    * [style : string, pattern : RegExp, DEPRECATED, shortcut : string].
    *
    * Style is a style constant like PR_PLAIN, or can be a string of the
    * form 'lang-FOO', where FOO is a language extension describing the
    * language of the portion of the token in $1 after pattern executes.
    * E.g., if style is 'lang-lisp', and group 1 contains the text
    * '(hello (world))', then that portion of the token will be passed to the
    * registered lisp handler for formatting.
    * The text before and after group 1 will be restyled using this decorator
    * so decorators should take care that this doesn't result in infinite
    * recursion.  For example, the HTML lexer rule for SCRIPT elements looks
    * something like ['lang-js', /<[s]cript>(.+?)<\/script>/].  This may match
    * '<script>foo()<\/script>', which would cause the current decorator to
    * be called with '<script>' which would not match the same rule since
    * group 1 must not be empty, so it would be instead styled as PR_TAG by
    * the generic tag rule.  The handler registered for the 'js' extension would
    * then be called with 'foo()', and finally, the current decorator would
    * be called with '<\/script>' which would not match the original rule and
    * so the generic tag rule would identify it as a tag.
    *
    * Pattern must only match prefixes, and if it matches a prefix, then that
    * match is considered a token with the same style.
    *
    * Context is applied to the last non-whitespace, non-comment token
    * recognized.
    *
    * Shortcut is an optional string of characters, any of which, if the first
    * character, gurantee that this pattern and only this pattern matches.
    *
    * @param {Array} shortcutStylePatterns patterns that always start with
    *   a known character.  Must have a shortcut string.
    * @param {Array} fallthroughStylePatterns patterns that will be tried in
    *   order if the shortcut ones fail.  May have shortcuts.
    *
    * @return {function (Object)} a
    *   function that takes source code and returns a list of decorations.
    */
  function createSimpleLexer(shortcutStylePatterns, fallthroughStylePatterns) {
    var shortcuts = {};
    var tokenizer;
    (function () {
      var allPatterns = shortcutStylePatterns.concat(fallthroughStylePatterns);
      var allRegexs = [];
      var regexKeys = {};
      for (var i = 0, n = allPatterns.length; i < n; ++i) {
        var patternParts = allPatterns[i];
        var shortcutChars = patternParts[3];
        if (shortcutChars) {
          for (var c = shortcutChars.length; --c >= 0;) {
            shortcuts[shortcutChars.charAt(c)] = patternParts;
          }
        }
        var regex = patternParts[1];
        var k = '' + regex;
        if (!regexKeys.hasOwnProperty(k)) {
          allRegexs.push(regex);
          regexKeys[k] = null;
        }
      }
      allRegexs.push(/[\0-\uffff]/);
      tokenizer = combinePrefixPatterns(allRegexs);
    })();

    var nPatterns = fallthroughStylePatterns.length;
    var notWs = /\S/;

    /**
     * Lexes job.source and produces an output array job.decorations of style
     * classes preceded by the position at which they start in job.source in
     * order.
     *
     * @param {Object} job an object like {@code
     *    source: {string} sourceText plain text,
     *    basePos: {int} position of job.source in the larger chunk of
     *        sourceCode.
     * }
     */
    var decorate = function (job) {
      var sourceCode = job.source, basePos = job.basePos;
      /** Even entries are positions in source in ascending order.  Odd enties
        * are style markers (e.g., PR_COMMENT) that run from that position until
        * the end.
        * @type {Array.<number|string>}
        */
      var decorations = [basePos, PR_PLAIN];
      var pos = 0;  // index into sourceCode
      var tokens = sourceCode.match(tokenizer) || [];
      var styleCache = {};

      for (var ti = 0, nTokens = tokens.length; ti < nTokens; ++ti) {
        var token = tokens[ti];
        var style = styleCache[token];
        var match = void 0;

        var isEmbedded;
        if (typeof style === 'string') {
          isEmbedded = false;
        } else {
          var patternParts = shortcuts[token.charAt(0)];
          if (patternParts) {
            match = token.match(patternParts[1]);
            style = patternParts[0];
          } else {
            for (var i = 0; i < nPatterns; ++i) {
              patternParts = fallthroughStylePatterns[i];
              match = token.match(patternParts[1]);
              if (match) {
                style = patternParts[0];
                break;
              }
            }

            if (!match) {  // make sure that we make progress
              style = PR_PLAIN;
            }
          }

          isEmbedded = style.length >= 5 && 'lang-' === style.substring(0, 5);
          if (isEmbedded && !(match && typeof match[1] === 'string')) {
            isEmbedded = false;
            style = PR_SOURCE;
          }

          if (!isEmbedded) { styleCache[token] = style; }
        }

        var tokenStart = pos;
        pos += token.length;

        if (!isEmbedded) {
          decorations.push(basePos + tokenStart, style);
        } else {  // Treat group 1 as an embedded block of source code.
          var embeddedSource = match[1];
          var embeddedSourceStart = token.indexOf(embeddedSource);
          var embeddedSourceEnd = embeddedSourceStart + embeddedSource.length;
          if (match[2]) {
            // If embeddedSource can be blank, then it would match at the
            // beginning which would cause us to infinitely recurse on the
            // entire token, so we catch the right context in match[2].
            embeddedSourceEnd = token.length - match[2].length;
            embeddedSourceStart = embeddedSourceEnd - embeddedSource.length;
          }
          var lang = style.substring(5);
          // Decorate the left of the embedded source
          appendDecorations(
              basePos + tokenStart,
              token.substring(0, embeddedSourceStart),
              decorate, decorations);
          // Decorate the embedded source
          appendDecorations(
              basePos + tokenStart + embeddedSourceStart,
              embeddedSource,
              langHandlerForExtension(lang, embeddedSource),
              decorations);
          // Decorate the right of the embedded section
          appendDecorations(
              basePos + tokenStart + embeddedSourceEnd,
              token.substring(embeddedSourceEnd),
              decorate, decorations);
        }
      }
      job.decorations = decorations;
    };
    return decorate;
  }

  /** returns a function that produces a list of decorations from source text.
    *
    * This code treats ", ', and ` as string delimiters, and \ as a string
    * escape.  It does not recognize perl's qq() style strings.
    * It has no special handling for double delimiter escapes as in basic, or
    * the tripled delimiters used in python, but should work on those regardless
    * although in those cases a single string literal may be broken up into
    * multiple adjacent string literals.
    *
    * It recognizes C, C++, and shell style comments.
    *
    * @param {Object} options a set of optional parameters.
    * @return {function (Object)} a function that examines the source code
    *     in the input job and builds the decoration list.
    */
  function sourceDecorator(options) {
    var shortcutStylePatterns = [], fallthroughStylePatterns = [];
    if (options['tripleQuotedStrings']) {
      // '''multi-line-string''', 'single-line-string', and double-quoted
      shortcutStylePatterns.push(
          [PR_STRING,  /^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,
           null, '\'"']);
    } else if (options['multiLineStrings']) {
      // 'multi-line-string', "multi-line-string"
      shortcutStylePatterns.push(
          [PR_STRING,  /^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/,
           null, '\'"`']);
    } else {
      // 'single-line-string', "single-line-string"
      shortcutStylePatterns.push(
          [PR_STRING,
           /^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/,
           null, '"\'']);
    }
    if (options['verbatimStrings']) {
      // verbatim-string-literal production from the C# grammar.  See issue 93.
      fallthroughStylePatterns.push(
          [PR_STRING, /^@\"(?:[^\"]|\"\")*(?:\"|$)/, null]);
    }
    if (options['hashComments']) {
      if (options['cStyleComments']) {
        // Stop C preprocessor declarations at an unclosed open comment
        shortcutStylePatterns.push(
            [PR_COMMENT, /^#(?:(?:define|elif|else|endif|error|ifdef|include|ifndef|line|pragma|undef|warning)\b|[^\r\n]*)/,
             null, '#']);
        fallthroughStylePatterns.push(
            [PR_STRING,
             /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h|[a-z]\w*)>/,
             null]);
      } else {
        shortcutStylePatterns.push([PR_COMMENT, /^#[^\r\n]*/, null, '#']);
      }
    }
    if (options['cStyleComments']) {
      fallthroughStylePatterns.push([PR_COMMENT, /^\/\/[^\r\n]*/, null]);
      fallthroughStylePatterns.push(
          [PR_COMMENT, /^\/\*[\s\S]*?(?:\*\/|$)/, null]);
    }
    if (options['regexLiterals']) {
      var REGEX_LITERAL = (
          // A regular expression literal starts with a slash that is
          // not followed by * or / so that it is not confused with
          // comments.
          '/(?=[^/*])'
          // and then contains any number of raw characters,
          + '(?:[^/\\x5B\\x5C]'
          // escape sequences (\x5C),
          +    '|\\x5C[\\s\\S]'
          // or non-nesting character sets (\x5B\x5D);
          +    '|\\x5B(?:[^\\x5C\\x5D]|\\x5C[\\s\\S])*(?:\\x5D|$))+'
          // finally closed by a /.
          + '/');
      fallthroughStylePatterns.push(
          ['lang-regex',
           new RegExp('^' + REGEXP_PRECEDER_PATTERN + '(' + REGEX_LITERAL + ')')
           ]);
    }

    var keywords = options['keywords'].replace(/^\s+|\s+$/g, '');
    if (keywords.length) {
      fallthroughStylePatterns.push(
          [PR_KEYWORD,
           new RegExp('^(?:' + keywords.replace(/\s+/g, '|') + ')\\b'), null]);
    }

    shortcutStylePatterns.push([PR_PLAIN,       /^\s+/, null, ' \r\n\t\xA0']);
    fallthroughStylePatterns.push(
        // TODO(mikesamuel): recognize non-latin letters and numerals in idents
        [PR_LITERAL,     /^@[a-z_$][a-z_$@0-9]*/i, null],
        [PR_TYPE,        /^@?[A-Z]+[a-z][A-Za-z_$@0-9]*/, null],
        [PR_PLAIN,       /^[a-z_$][a-z_$@0-9]*/i, null],
        [PR_LITERAL,
         new RegExp(
             '^(?:'
             // A hex number
             + '0x[a-f0-9]+'
             // or an octal or decimal number,
             + '|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)'
             // possibly in scientific notation
             + '(?:e[+\\-]?\\d+)?'
             + ')'
             // with an optional modifier like UL for unsigned long
             + '[a-z]*', 'i'),
         null, '0123456789'],
        [PR_PUNCTUATION, /^.[^\s\w\.$@\'\"\`\/\#]*/, null]);

    return createSimpleLexer(shortcutStylePatterns, fallthroughStylePatterns);
  }

  var decorateSource = sourceDecorator({
        'keywords': ALL_KEYWORDS,
        'hashComments': true,
        'cStyleComments': true,
        'multiLineStrings': true,
        'regexLiterals': true
      });

  /** Breaks {@code job.source} around style boundaries in
    * {@code job.decorations} while re-interleaving {@code job.extractedTags},
    * and leaves the result in {@code job.prettyPrintedHtml}.
    * @param {Object} job like {
    *    source: {string} source as plain text,
    *    extractedTags: {Array.<number|string>} extractedTags chunks of raw
    *                   html preceded by their position in {@code job.source}
    *                   in order
    *    decorations: {Array.<number|string} an array of style classes preceded
    *                 by the position at which they start in job.source in order
    * }
    * @private
    */
  function recombineTagsAndDecorations(job) {
    var sourceText = job.source;
    var extractedTags = job.extractedTags;
    var decorations = job.decorations;

    var html = [];
    // index past the last char in sourceText written to html
    var outputIdx = 0;

    var openDecoration = null;
    var currentDecoration = null;
    var tagPos = 0;  // index into extractedTags
    var decPos = 0;  // index into decorations
    var tabExpander = makeTabExpander(window['PR_TAB_WIDTH']);

    var adjacentSpaceRe = /([\r\n ]) /g;
    var startOrSpaceRe = /(^| ) /gm;
    var newlineRe = /\r\n?|\n/g;
    var trailingSpaceRe = /[ \r\n]$/;
    var lastWasSpace = true;  // the last text chunk emitted ended with a space.

    // A helper function that is responsible for opening sections of decoration
    // and outputing properly escaped chunks of source
    function emitTextUpTo(sourceIdx) {
      if (sourceIdx > outputIdx) {
        if (openDecoration && openDecoration !== currentDecoration) {
          // Close the current decoration
          html.push('</span>');
          openDecoration = null;
        }
        if (!openDecoration && currentDecoration) {
          openDecoration = currentDecoration;
          html.push('<span class="', openDecoration, '">');
        }
        // This interacts badly with some wikis which introduces paragraph tags
        // into pre blocks for some strange reason.
        // It's necessary for IE though which seems to lose the preformattedness
        // of <pre> tags when their innerHTML is assigned.
        // http://stud3.tuwien.ac.at/~e0226430/innerHtmlQuirk.html
        // and it serves to undo the conversion of <br>s to newlines done in
        // chunkify.
        var htmlChunk = textToHtml(
            tabExpander(sourceText.substring(outputIdx, sourceIdx)))
            .replace(lastWasSpace
                     ? startOrSpaceRe
                     : adjacentSpaceRe, '$1&nbsp;');
        // Keep track of whether we need to escape space at the beginning of the
        // next chunk.
        lastWasSpace = trailingSpaceRe.test(htmlChunk);
        // IE collapses multiple adjacient <br>s into 1 line break.
        // Prefix every <br> with '&nbsp;' can prevent such IE's behavior.
        var lineBreakHtml = window['_pr_isIE6']() ? '&nbsp;<br />' : '<br />';
        html.push(htmlChunk.replace(newlineRe, lineBreakHtml));
        outputIdx = sourceIdx;
      }
    }

    while (true) {
      // Determine if we're going to consume a tag this time around.  Otherwise
      // we consume a decoration or exit.
      var outputTag;
      if (tagPos < extractedTags.length) {
        if (decPos < decorations.length) {
          // Pick one giving preference to extractedTags since we shouldn't open
          // a new style that we're going to have to immediately close in order
          // to output a tag.
          outputTag = extractedTags[tagPos] <= decorations[decPos];
        } else {
          outputTag = true;
        }
      } else {
        outputTag = false;
      }
      // Consume either a decoration or a tag or exit.
      if (outputTag) {
        emitTextUpTo(extractedTags[tagPos]);
        if (openDecoration) {
          // Close the current decoration
          html.push('</span>');
          openDecoration = null;
        }
        html.push(extractedTags[tagPos + 1]);
        tagPos += 2;
      } else if (decPos < decorations.length) {
        emitTextUpTo(decorations[decPos]);
        currentDecoration = decorations[decPos + 1];
        decPos += 2;
      } else {
        break;
      }
    }
    emitTextUpTo(sourceText.length);
    if (openDecoration) {
      html.push('</span>');
    }
    job.prettyPrintedHtml = html.join('');
  }

  /** Maps language-specific file extensions to handlers. */
  var langHandlerRegistry = {};
  /** Register a language handler for the given file extensions.
    * @param {function (Object)} handler a function from source code to a list
    *      of decorations.  Takes a single argument job which describes the
    *      state of the computation.   The single parameter has the form
    *      {@code {
    *        source: {string} as plain text.
    *        decorations: {Array.<number|string>} an array of style classes
    *                     preceded by the position at which they start in
    *                     job.source in order.
    *                     The language handler should assigned this field.
    *        basePos: {int} the position of source in the larger source chunk.
    *                 All positions in the output decorations array are relative
    *                 to the larger source chunk.
    *      } }
    * @param {Array.<string>} fileExtensions
    */
  function registerLangHandler(handler, fileExtensions) {
    for (var i = fileExtensions.length; --i >= 0;) {
      var ext = fileExtensions[i];
      if (!langHandlerRegistry.hasOwnProperty(ext)) {
        langHandlerRegistry[ext] = handler;
      } else if ('console' in window) {
        console.warn('cannot override language handler %s', ext);
      }
    }
  }
  function langHandlerForExtension(extension, source) {
    if (!(extension && langHandlerRegistry.hasOwnProperty(extension))) {
      // Treat it as markup if the first non whitespace character is a < and
      // the last non-whitespace character is a >.
      extension = /^\s*</.test(source)
          ? 'default-markup'
          : 'default-code';
    }
    return langHandlerRegistry[extension];
  }
  registerLangHandler(decorateSource, ['default-code']);
  registerLangHandler(
      createSimpleLexer(
          [],
          [
           [PR_PLAIN,       /^[^<?]+/],
           [PR_DECLARATION, /^<!\w[^>]*(?:>|$)/],
           [PR_COMMENT,     /^<\!--[\s\S]*?(?:-\->|$)/],
           // Unescaped content in an unknown language
           ['lang-',        /^<\?([\s\S]+?)(?:\?>|$)/],
           ['lang-',        /^<%([\s\S]+?)(?:%>|$)/],
           [PR_PUNCTUATION, /^(?:<[%?]|[%?]>)/],
           ['lang-',        /^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],
           // Unescaped content in javascript.  (Or possibly vbscript).
           ['lang-js',      /^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],
           // Contains unescaped stylesheet content
           ['lang-css',     /^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],
           ['lang-in.tag',  /^(<\/?[a-z][^<>]*>)/i]
          ]),
      ['default-markup', 'htm', 'html', 'mxml', 'xhtml', 'xml', 'xsl']);
  registerLangHandler(
      createSimpleLexer(
          [
           [PR_PLAIN,        /^[\s]+/, null, ' \t\r\n'],
           [PR_ATTRIB_VALUE, /^(?:\"[^\"]*\"?|\'[^\']*\'?)/, null, '\"\'']
           ],
          [
           [PR_TAG,          /^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i],
           [PR_ATTRIB_NAME,  /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],
           ['lang-uq.val',   /^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/],
           [PR_PUNCTUATION,  /^[=<>\/]+/],
           ['lang-js',       /^on\w+\s*=\s*\"([^\"]+)\"/i],
           ['lang-js',       /^on\w+\s*=\s*\'([^\']+)\'/i],
           ['lang-js',       /^on\w+\s*=\s*([^\"\'>\s]+)/i],
           ['lang-css',      /^style\s*=\s*\"([^\"]+)\"/i],
           ['lang-css',      /^style\s*=\s*\'([^\']+)\'/i],
           ['lang-css',      /^style\s*=\s*([^\"\'>\s]+)/i]
           ]),
      ['in.tag']);
  registerLangHandler(
      createSimpleLexer([], [[PR_ATTRIB_VALUE, /^[\s\S]+/]]), ['uq.val']);
  registerLangHandler(sourceDecorator({
          'keywords': CPP_KEYWORDS,
          'hashComments': true,
          'cStyleComments': true
        }), ['c', 'cc', 'cpp', 'cxx', 'cyc', 'm']);
  registerLangHandler(sourceDecorator({
          'keywords': 'null true false'
        }), ['json']);
  registerLangHandler(sourceDecorator({
          'keywords': CSHARP_KEYWORDS,
          'hashComments': true,
          'cStyleComments': true,
          'verbatimStrings': true
        }), ['cs']);
  registerLangHandler(sourceDecorator({
          'keywords': JAVA_KEYWORDS,
          'cStyleComments': true
        }), ['java']);
  registerLangHandler(sourceDecorator({
          'keywords': SH_KEYWORDS,
          'hashComments': true,
          'multiLineStrings': true
        }), ['bsh', 'csh', 'sh']);
  registerLangHandler(sourceDecorator({
          'keywords': PYTHON_KEYWORDS,
          'hashComments': true,
          'multiLineStrings': true,
          'tripleQuotedStrings': true
        }), ['cv', 'py']);
  registerLangHandler(sourceDecorator({
          'keywords': PERL_KEYWORDS,
          'hashComments': true,
          'multiLineStrings': true,
          'regexLiterals': true
        }), ['perl', 'pl', 'pm']);
  registerLangHandler(sourceDecorator({
          'keywords': RUBY_KEYWORDS,
          'hashComments': true,
          'multiLineStrings': true,
          'regexLiterals': true
        }), ['rb']);
  registerLangHandler(sourceDecorator({
          'keywords': JSCRIPT_KEYWORDS,
          'cStyleComments': true,
          'regexLiterals': true
        }), ['js']);
  registerLangHandler(
      createSimpleLexer([], [[PR_STRING, /^[\s\S]+/]]), ['regex']);

  function applyDecorator(job) {
    var sourceCodeHtml = job.sourceCodeHtml;
    var opt_langExtension = job.langExtension;

    // Prepopulate output in case processing fails with an exception.
    job.prettyPrintedHtml = sourceCodeHtml;

    try {
      // Extract tags, and convert the source code to plain text.
      var sourceAndExtractedTags = extractTags(sourceCodeHtml);
      /** Plain text. @type {string} */
      var source = sourceAndExtractedTags.source;
      job.source = source;
      job.basePos = 0;

      /** Even entries are positions in source in ascending order.  Odd entries
        * are tags that were extracted at that position.
        * @type {Array.<number|string>}
        */
      job.extractedTags = sourceAndExtractedTags.tags;

      // Apply the appropriate language handler
      langHandlerForExtension(opt_langExtension, source)(job);
      // Integrate the decorations and tags back into the source code to produce
      // a decorated html string which is left in job.prettyPrintedHtml.
      recombineTagsAndDecorations(job);
    } catch (e) {
      if ('console' in window) {
        console.log(e);
        console.trace();
      }
    }
  }

  function prettyPrintOne(sourceCodeHtml, opt_langExtension) {
    var job = {
      sourceCodeHtml: sourceCodeHtml,
      langExtension: opt_langExtension
    };
    applyDecorator(job);
    return job.prettyPrintedHtml;
  }

  function prettyPrint(opt_whenDone) {
    var isIE678 = window['_pr_isIE6']();
    var ieNewline = isIE678 === 6 ? '\r\n' : '\r';
    // See bug 71 and http://stackoverflow.com/questions/136443/why-doesnt-ie7-

    // fetch a list of nodes to rewrite
    var codeSegments = [
        document.getElementsByTagName('pre'),
        document.getElementsByTagName('code'),
        document.getElementsByTagName('xmp') ];
    var elements = [];
    for (var i = 0; i < codeSegments.length; ++i) {
      for (var j = 0, n = codeSegments[i].length; j < n; ++j) {
        elements.push(codeSegments[i][j]);
      }
    }
    codeSegments = null;

    var clock = Date;
    if (!clock['now']) {
      clock = { 'now': function () { return (new Date).getTime(); } };
    }

    // The loop is broken into a series of continuations to make sure that we
    // don't make the browser unresponsive when rewriting a large page.
    var k = 0;
    var prettyPrintingJob;

    function doWork() {
      var endTime = (window['PR_SHOULD_USE_CONTINUATION'] ?
                     clock.now() + 250 /* ms */ :
                     Infinity);
      for (; k < elements.length && clock.now() < endTime; k++) {
        var cs = elements[k];
        if (cs.className && cs.className.indexOf('prettyprint') >= 0) {
          // If the classes includes a language extensions, use it.
          // Language extensions can be specified like
          //     <pre class="prettyprint lang-cpp">
          // the language extension "cpp" is used to find a language handler as
          // passed to PR_registerLangHandler.
          var langExtension = cs.className.match(/\blang-(\w+)\b/);
          if (langExtension) { langExtension = langExtension[1]; }

          // make sure this is not nested in an already prettified element
          var nested = false;
          for (var p = cs.parentNode; p; p = p.parentNode) {
            if ((p.tagName === 'pre' || p.tagName === 'code' ||
                 p.tagName === 'xmp') &&
                p.className && p.className.indexOf('prettyprint') >= 0) {
              nested = true;
              break;
            }
          }
          if (!nested) {
            // fetch the content as a snippet of properly escaped HTML.
            // Firefox adds newlines at the end.
            var content = getInnerHtml(cs);
            content = content.replace(/(?:\r\n?|\n)$/, '');

            // do the pretty printing
            prettyPrintingJob = {
              sourceCodeHtml: content,
              langExtension: langExtension,
              sourceNode: cs
            };
            applyDecorator(prettyPrintingJob);
            replaceWithPrettyPrintedHtml();
          }
        }
      }
      if (k < elements.length) {
        // finish up in a continuation
        setTimeout(doWork, 250);
      } else if (opt_whenDone) {
        opt_whenDone();
      }
    }

    function replaceWithPrettyPrintedHtml() {
      var newContent = prettyPrintingJob.prettyPrintedHtml;
      if (!newContent) { return; }
      var cs = prettyPrintingJob.sourceNode;

      // push the prettified html back into the tag.
      if (!isRawContent(cs)) {
        // just replace the old html with the new
        cs.innerHTML = newContent;
      } else {
        // we need to change the tag to a <pre> since <xmp>s do not allow
        // embedded tags such as the span tags used to attach styles to
        // sections of source code.
        var pre = document.createElement('PRE');
        for (var i = 0; i < cs.attributes.length; ++i) {
          var a = cs.attributes[i];
          if (a.specified) {
            var aname = a.name.toLowerCase();
            if (aname === 'class') {
              pre.className = a.value;  // For IE 6
            } else {
              pre.setAttribute(a.name, a.value);
            }
          }
        }
        pre.innerHTML = newContent;

        // remove the old
        cs.parentNode.replaceChild(pre, cs);
        cs = pre;
      }

      // Replace <br>s with line-feeds so that copying and pasting works
      // on IE 6.
      // Doing this on other browsers breaks lots of stuff since \r\n is
      // treated as two newlines on Firefox, and doing this also slows
      // down rendering.
      if (isIE678 && cs.tagName === 'PRE') {
        var lineBreaks = cs.getElementsByTagName('br');
        for (var j = lineBreaks.length; --j >= 0;) {
          var lineBreak = lineBreaks[j];
          lineBreak.parentNode.replaceChild(
              document.createTextNode(ieNewline), lineBreak);
        }
      }
    }

    doWork();
  }

  window['PR_normalizedHtml'] = normalizedHtml;
  window['prettyPrintOne'] = prettyPrintOne;
  window['prettyPrint'] = prettyPrint;
  window['PR'] = {
        'combinePrefixPatterns': combinePrefixPatterns,
        'createSimpleLexer': createSimpleLexer,
        'registerLangHandler': registerLangHandler,
        'sourceDecorator': sourceDecorator,
        'PR_ATTRIB_NAME': PR_ATTRIB_NAME,
        'PR_ATTRIB_VALUE': PR_ATTRIB_VALUE,
        'PR_COMMENT': PR_COMMENT,
        'PR_DECLARATION': PR_DECLARATION,
        'PR_KEYWORD': PR_KEYWORD,
        'PR_LITERAL': PR_LITERAL,
        'PR_NOCODE': PR_NOCODE,
        'PR_PLAIN': PR_PLAIN,
        'PR_PUNCTUATION': PR_PUNCTUATION,
        'PR_SOURCE': PR_SOURCE,
        'PR_STRING': PR_STRING,
        'PR_TAG': PR_TAG,
        'PR_TYPE': PR_TYPE
      };
})();

// @PLUGIN Hashchange - http://benalman.com/projects/jquery-hashchange-plugin/ | Copyright (c) 2010 "Cowboy" Ben Alman | MIT & GPL license
(function ($, e, b) {
    var c = "hashchange",
        h = document,
        f, g = $.event.special,
        i = h.documentMode,
        d = "on" + c in e && (i === b || i > 7);

    function a(j) {
        j = j || location.href;
        return "#" + j.replace(/^[^#]*#?(.*)$/, "$1")
    }
    $.fn[c] = function (j) {
        return j ? this.bind(c, j) : this.trigger(c)
    };
    $.fn[c].delay = 50;
    g[c] = $.extend(g[c], {
        setup: function () {
            if (d) {
                return false
            }
            $(f.start)
        },
        teardown: function () {
            if (d) {
                return false
            }
            $(f.stop)
        }
    });
    f = (function () {
        var j = {},
            p, m = a(),
            k = function (q) {
                return q
            },
            l = k,
            o = k;
        j.start = function () {
            p || n()
        };
        j.stop = function () {
            p && clearTimeout(p);
            p = b
        };

        function n() {
            var r = a(),
                q = o(m);
            if (r !== m) {
                l(m = r, q);
                $(e).trigger(c)
            } else {
                if (q !== m) {
                    location.href = location.href.replace(/#.*/, "") + q
                }
            }
            p = setTimeout(n, $.fn[c].delay)
        }
        $.browser.msie && !d && (function () {
            var q, r;
            j.start = function () {
                if (!q) {
                    r = $.fn[c].src;
                    r = r && r + a();
                    q = $('<iframe tabindex="-1" title="empty"/>').hide().one("load", function () {
                        r || l(a());
                        n()
                    }).attr("src", r || "javascript:0").insertAfter("body")[0].contentWindow;
                    h.onpropertychange = function () {
                        try {
                            if (event.propertyName === "title") {
                                q.document.title = h.title
                            }
                        } catch (s) {}
                    }
                }
            };
            j.stop = k;
            o = function () {
                return a(q.location.href)
            };
            l = function (v, s) {
                var u = q.document,
                    t = $.fn[c].domain;
                if (v !== s) {
                    u.title = h.title;
                    u.open();
                    t && u.write('<script>document.domain="' + t + '"<\/script>');
                    u.close();
                    q.location.hash = v
                }
            }
        })();
        return j
    })()
})(jQuery, this);

// @PLUGIN Showdown - Markup generation
var Showdown = {};
Showdown.converter = function () {
    var _1;
    var _2;
    var _3;
    var _4 = 0;
    this.makeHtml = function (_5) {
        _1 = new Array();
        _2 = new Array();
        _3 = new Array();
        _5 = _5.replace(/~/g, "~T");
        _5 = _5.replace(/\$/g, "~D");
        _5 = _5.replace(/\r\n/g, "\n");
        _5 = _5.replace(/\r/g, "\n");
        _5 = "\n\n" + _5 + "\n\n";
        _5 = _6(_5);
        _5 = _5.replace(/^[ \t]+$/mg, "");
        _5 = _7(_5);
        _5 = _8(_5);
        _5 = _9(_5);
        _5 = _a(_5);
        _5 = _5.replace(/~D/g, "$$");
        _5 = _5.replace(/~T/g, "~");
        return _5;
    };
    var _8 = function (_b) {
            var _b = _b.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|\Z)/gm, function (_c, m1, m2, m3, m4) {
                m1 = m1.toLowerCase();
                _1[m1] = _11(m2);
                if (m3) {
                    return m3 + m4;
                } else {
                    if (m4) {
                        _2[m1] = m4.replace(/"/g, "&quot;");
                    }
                }
                return "";
            });
            return _b;
        };
    var _7 = function (_12) {
            _12 = _12.replace(/\n/g, "\n\n");
            var _13 = "p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del";
            var _14 = "p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math";
            _12 = _12.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm, _15);
            _12 = _12.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm, _15);
            _12 = _12.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, _15);
            _12 = _12.replace(/(\n\n[ ]{0,3}<!(--[^\r]*?--\s*)+>[ \t]*(?=\n{2,}))/g, _15);
            _12 = _12.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, _15);
            _12 = _12.replace(/\n\n/g, "\n");
            return _12;
        };
    var _15 = function (_16, m1) {
            var _18 = m1;
            _18 = _18.replace(/\n\n/g, "\n");
            _18 = _18.replace(/^\n/, "");
            _18 = _18.replace(/\n+$/g, "");
            _18 = "\n\n~K" + (_3.push(_18) - 1) + "K\n\n";
            return _18;
        };
    var _9 = function (_19) {
            _19 = _1a(_19);
            var key = _1c("<hr />");
            _19 = _19.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, key);
            _19 = _19.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm, key);
            _19 = _19.replace(/^[ ]{0,2}([ ]?\_[ ]?){3,}[ \t]*$/gm, key);
            _19 = _1d(_19);
            _19 = _1e(_19);
            _19 = _1f(_19);
            _19 = _7(_19);
            _19 = _20(_19);
            return _19;
        };
    var _21 = function (_22) {
            _22 = _23(_22);
            _22 = _24(_22);
            _22 = _25(_22);
            _22 = _26(_22);
            _22 = _27(_22);
            _22 = _28(_22);
            _22 = _11(_22);
            _22 = _29(_22);
            _22 = _22.replace(/  +\n/g, " <br />\n");
            return _22;
        };
    var _24 = function (_2a) {
            var _2b = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;
            _2a = _2a.replace(_2b, function (_2c) {
                var tag = _2c.replace(/(.)<\/?code>(?=.)/g, "$1`");
                tag = _2e(tag, "\\`*_");
                return tag;
            });
            return _2a;
        };
    var _27 = function (_2f) {
            _2f = _2f.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, _30);
            _2f = _2f.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?(.*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, _30);
            _2f = _2f.replace(/(\[([^\[\]]+)\])()()()()()/g, _30);
            return _2f;
        };
    var _30 = function (_31, m1, m2, m3, m4, m5, m6, m7) {
            if (m7 == undefined) {
                m7 = "";
            }
            var _39 = m1;
            var _3a = m2;
            var _3b = m3.toLowerCase();
            var url = m4;
            var _3d = m7;
            if (url == "") {
                if (_3b == "") {
                    _3b = _3a.toLowerCase().replace(/ ?\n/g, " ");
                }
                url = "#" + _3b;
                if (_1[_3b] != undefined) {
                    url = _1[_3b];
                    if (_2[_3b] != undefined) {
                        _3d = _2[_3b];
                    }
                } else {
                    if (_39.search(/\(\s*\)$/m) > -1) {
                        url = "";
                    } else {
                        return _39;
                    }
                }
            }
            url = _2e(url, "*_");
            var _3e = "<a href=\"" + url + "\"";
            if (_3d != "") {
                _3d = _3d.replace(/"/g, "&quot;");
                _3d = _2e(_3d, "*_");
                _3e += " title=\"" + _3d + "\"";
            }
            _3e += ">" + _3a + "</a>";
            return _3e;
        };
    var _26 = function (_3f) {
            _3f = _3f.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, _40);
            _3f = _3f.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, _40);
            return _3f;
        };
    var _40 = function (_41, m1, m2, m3, m4, m5, m6, m7) {
            var _49 = m1;
            var _4a = m2;
            var _4b = m3.toLowerCase();
            var url = m4;
            var _4d = m7;
            if (!_4d) {
                _4d = "";
            }
            if (url == "") {
                if (_4b == "") {
                    _4b = _4a.toLowerCase().replace(/ ?\n/g, " ");
                }
                url = "#" + _4b;
                if (_1[_4b] != undefined) {
                    url = _1[_4b];
                    if (_2[_4b] != undefined) {
                        _4d = _2[_4b];
                    }
                } else {
                    return _49;
                }
            }
            _4a = _4a.replace(/"/g, "&quot;");
            url = _2e(url, "*_");
            var _4e = "<img src=\"" + url + "\" alt=\"" + _4a + "\"";
            _4d = _4d.replace(/"/g, "&quot;");
            _4d = _2e(_4d, "*_");
            _4e += " title=\"" + _4d + "\"";
            _4e += " />";
            return _4e;
        };
    var _1a = function (_4f) {
            _4f = _4f.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm, function (_50, m1) {
                return _1c("<h1>" + _21(m1) + "</h1>");
            });
            _4f = _4f.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm, function (_52, m1) {
                return _1c("<h2>" + _21(m1) + "</h2>");
            });
            _4f = _4f.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm, function (_54, m1, m2) {
                var _57 = m1.length;
                return _1c("<h" + _57 + ">" + _21(m2) + "</h" + _57 + ">");
            });
            return _4f;
        };
    var _58;
    var _1d = function (_59) {
            _59 += "~0";
            var _5a = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
            if (_4) {
                _59 = _59.replace(_5a, function (_5b, m1, m2) {
                    var _5e = m1;
                    var _5f = (m2.search(/[*+-]/g) > -1) ? "ul" : "ol";
                    _5e = _5e.replace(/\n{2,}/g, "\n\n\n");
                    var _60 = _58(_5e);
                    _60 = _60.replace(/\s+$/, "");
                    _60 = "<" + _5f + ">" + _60 + "</" + _5f + ">\n";
                    return _60;
                });
            } else {
                _5a = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g;
                _59 = _59.replace(_5a, function (_61, m1, m2, m3) {
                    var _65 = m1;
                    var _66 = m2;
                    var _67 = (m3.search(/[*+-]/g) > -1) ? "ul" : "ol";
                    var _66 = _66.replace(/\n{2,}/g, "\n\n\n");
                    var _68 = _58(_66);
                    _68 = _65 + "<" + _67 + ">\n" + _68 + "</" + _67 + ">\n";
                    return _68;
                });
            }
            _59 = _59.replace(/~0/, "");
            return _59;
        };
    _58 = function (_69) {
        _4++;
        _69 = _69.replace(/\n{2,}$/, "\n");
        _69 += "~0";
        _69 = _69.replace(/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+([^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm, function (_6a, m1, m2, m3, m4) {
            var _6f = m4;
            var _70 = m1;
            var _71 = m2;
            if (_70 || (_6f.search(/\n{2,}/) > -1)) {
                _6f = _9(_72(_6f));
            } else {
                _6f = _1d(_72(_6f));
                _6f = _6f.replace(/\n$/, "");
                _6f = _21(_6f);
            }
            return "<li>" + _6f + "</li>\n";
        });
        _69 = _69.replace(/~0/g, "");
        _4--;
        return _69;
    };
    var _1e = function (_73) {
            _73 += "~0";
            _73 = _73.replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g, function (_74, m1, m2) {
                var _77 = m1;
                var _78 = m2;
                _77 = _79(_72(_77));
                _77 = _6(_77);
                _77 = _77.replace(/^\n+/g, "");
                _77 = _77.replace(/\n+$/g, "");
                _77 = "<pre><code>" + _77 + "\n</code></pre>";
                return _1c(_77) + _78;
            });
            _73 = _73.replace(/~0/, "");
            return _73;
        };
    var _1c = function (_7a) {
            _7a = _7a.replace(/(^\n+|\n+$)/g, "");
            return "\n\n~K" + (_3.push(_7a) - 1) + "K\n\n";
        };
    var _23 = function (_7b) {
            _7b = _7b.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function (_7c, m1, m2, m3, m4) {
                var c = m3;
                c = c.replace(/^([ \t]*)/g, "");
                c = c.replace(/[ \t]*$/g, "");
                c = _79(c);
                return m1 + "<code>" + c + "</code>";
            });
            return _7b;
        };
    var _79 = function (_82) {
            _82 = _82.replace(/&/g, "&amp;");
            _82 = _82.replace(/</g, "&lt;");
            _82 = _82.replace(/>/g, "&gt;");
            _82 = _2e(_82, "*_{}[]\\", false);
            return _82;
        };
    var _29 = function (_83) {
            _83 = _83.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g, "<strong>$2</strong>");
            _83 = _83.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g, "<em>$2</em>");
            return _83;
        };
    var _1f = function (_84) {
            _84 = _84.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm, function (_85, m1) {
                var bq = m1;
                bq = bq.replace(/^[ \t]*>[ \t]?/gm, "~0");
                bq = bq.replace(/~0/g, "");
                bq = bq.replace(/^[ \t]+$/gm, "");
                bq = _9(bq);
                bq = bq.replace(/(^|\n)/g, "$1  ");
                bq = bq.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function (_88, m1) {
                    var pre = m1;
                    pre = pre.replace(/^  /mg, "~0");
                    pre = pre.replace(/~0/g, "");
                    return pre;
                });
                return _1c("<blockquote>\n" + bq + "\n</blockquote>");
            });
            return _84;
        };
    var _20 = function (_8b) {
            _8b = _8b.replace(/^\n+/g, "");
            _8b = _8b.replace(/\n+$/g, "");
            var _8c = _8b.split(/\n{2,}/g);
            var _8d = new Array();
            var end = _8c.length;
            for (var i = 0; i < end; i++) {
                var str = _8c[i];
                if (str.search(/~K(\d+)K/g) >= 0) {
                    _8d.push(str);
                } else {
                    if (str.search(/\S/) >= 0) {
                        str = _21(str);
                        str = str.replace(/^([ \t]*)/g, "<p>");
                        str += "</p>";
                        _8d.push(str);
                    }
                }
            }
            end = _8d.length;
            for (var i = 0; i < end; i++) {
                while (_8d[i].search(/~K(\d+)K/) >= 0) {
                    var _91 = _3[RegExp.$1];
                    _91 = _91.replace(/\$/g, "$$$$");
                    _8d[i] = _8d[i].replace(/~K\d+K/, _91);
                }
            }
            return _8d.join("\n\n");
        };
    var _11 = function (_92) {
            _92 = _92.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;");
            _92 = _92.replace(/<(?![a-z\/?\$!])/gi, "&lt;");
            return _92;
        };
    var _25 = function (_93) {
            _93 = _93.replace(/\\(\\)/g, _94);
            _93 = _93.replace(/\\([`*_{}\[\]()>#+-.!])/g, _94);
            return _93;
        };
    var _28 = function (_95) {
            _95 = _95.replace(/<((https?|ftp|dict):[^'">\s]+)>/gi, "<a href=\"$1\">$1</a>");
            _95 = _95.replace(/<(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi, function (_96, m1) {
                return _98(_a(m1));
            });
            return _95;
        };
    var _98 = function (_99) {
            function char2hex(ch) {
                var _9b = "0123456789ABCDEF";
                var dec = ch.charCodeAt(0);
                return (_9b.charAt(dec >> 4) + _9b.charAt(dec & 15));
            }
            var _9d = [function (ch) {
                return "&#" + ch.charCodeAt(0) + ";";
            }, function (ch) {
                return "&#x" + char2hex(ch) + ";";
            }, function (ch) {
                return ch;
            }];
            _99 = "mailto:" + _99;
            _99 = _99.replace(/./g, function (ch) {
                if (ch == "@") {
                    ch = _9d[Math.floor(Math.random() * 2)](ch);
                } else {
                    if (ch != ":") {
                        var r = Math.random();
                        ch = (r > 0.9 ? _9d[2](ch) : r > 0.45 ? _9d[1](ch) : _9d[0](ch));
                    }
                }
                return ch;
            });
            _99 = "<a href=\"" + _99 + "\">" + _99 + "</a>";
            _99 = _99.replace(/">.+:/g, "\">");
            return _99;
        };
    var _a = function (_a3) {
            _a3 = _a3.replace(/~E(\d+)E/g, function (_a4, m1) {
                var _a6 = parseInt(m1);
                return String.fromCharCode(_a6);
            });
            return _a3;
        };
    var _72 = function (_a7) {
            _a7 = _a7.replace(/^(\t|[ ]{1,4})/gm, "~0");
            _a7 = _a7.replace(/~0/g, "");
            return _a7;
        };
    var _6 = function (_a8) {
            _a8 = _a8.replace(/\t(?=\t)/g, "    ");
            _a8 = _a8.replace(/\t/g, "~A~B");
            _a8 = _a8.replace(/~B(.+?)~A/g, function (_a9, m1, m2) {
                var _ac = m1;
                var _ad = 4 - _ac.length % 4;
                for (var i = 0; i < _ad; i++) {
                    _ac += " ";
                }
                return _ac;
            });
            _a8 = _a8.replace(/~A/g, "    ");
            _a8 = _a8.replace(/~B/g, "");
            return _a8;
        };
    var _2e = function (_af, _b0, _b1) {
            var _b2 = "([" + _b0.replace(/([\[\]\\])/g, "\\$1") + "])";
            if (_b1) {
                _b2 = "\\\\" + _b2;
            }
            var _b3 = new RegExp(_b2, "g");
            _af = _af.replace(_b3, _94);
            return _af;
        };
    var _94 = function (_b4, m1) {
            var _b6 = m1.charCodeAt(0);
            return "~E" + _b6 + "E";
        };
};


// @PLUGIN Table sorter by Christian Bach - http://std.li/gD
(function ($) {
    $.extend({
        table: new

        function () {
            var parsers = [],
                widgets = [];
            this.defaults = {
                cssHeader: "",
                cssAsc: "asc",
                cssDesc: "desc",
                cssChildRow: "expand-child",
                sortInitialOrder: "asc",
                sortMultiSortKey: "shiftKey",
                sortForce: null,
                sortAppend: null,
                sortLocaleCompare: true,
                textExtraction: "simple",
                parsers: {},
                widgets: [],
                widgetZebra: {
                    css: ["even", "odd"]
                },
                headers: {},
                widthFixed: false,
                cancelSelection: true,
                sortList: [],
                headerList: [],
                dateFormat: "us",
                decimal: '/\.|\,/g',
                onRenderHeader: null,
                selectorHeaders: 'thead th',
                debug: false
            };

            function benchmark(s, d) {
                log(s + "," + (new Date().getTime() - d.getTime()) + "ms");
            }
            this.benchmark = benchmark;

            function log(s) {
                if (typeof console != "undefined" && typeof console.debug != "undefined") {
                    console.log(s);
                } else {
                    alert(s);
                }
            }
            function buildParserCache(table, $headers) {
                if (table.config.debug) {
                    var parsersDebug = "";
                }
                if (table.tBodies.length == 0) return;
                var rows = table.tBodies[0].rows;
                if (rows[0]) {
                    var list = [],
                        cells = rows[0].cells,
                        l = cells.length;
                    for (var i = 0; i < l; i++) {
                        var p = false;
                        if ($.metadata && ($($headers[i]).metadata() && $($headers[i]).metadata().sorter)) {
                            p = getParserById($($headers[i]).metadata().sorter);
                        } else if ((table.config.headers[i] && table.config.headers[i].sorter)) {
                            p = getParserById(table.config.headers[i].sorter);
                        }
                        if (!p) {
                            p = detectParserForColumn(table, rows, -1, i);
                        }
                        if (table.config.debug) {
                            parsersDebug += "column:" + i + " parser:" + p.id + "\n";
                        }
                        list.push(p);
                    }
                }
                if (table.config.debug) {
                    log(parsersDebug);
                }
                return list;
            };

            function detectParserForColumn(table, rows, rowIndex, cellIndex) {
                var l = parsers.length,
                    node = false,
                    nodeValue = false,
                    keepLooking = true;
                while (nodeValue == '' && keepLooking) {
                    rowIndex++;
                    if (rows[rowIndex]) {
                        node = getNodeFromRowAndCellIndex(rows, rowIndex, cellIndex);
                        nodeValue = trimAndGetNodeText(table.config, node);
                        if (table.config.debug) {
                            log('Checking if value was empty on row:' + rowIndex);
                        }
                    } else {
                        keepLooking = false;
                    }
                }
                for (var i = 1; i < l; i++) {
                    if (parsers[i].is(nodeValue, table, node)) {
                        return parsers[i];
                    }
                }
                return parsers[0];
            }
            function getNodeFromRowAndCellIndex(rows, rowIndex, cellIndex) {
                return rows[rowIndex].cells[cellIndex];
            }
            function trimAndGetNodeText(config, node) {
                return $.trim(getElementText(config, node));
            }
            function getParserById(name) {
                var l = parsers.length;
                for (var i = 0; i < l; i++) {
                    if (parsers[i].id.toLowerCase() == name.toLowerCase()) {
                        return parsers[i];
                    }
                }
                return false;
            }
            function buildCache(table) {
                if (table.config.debug) {
                    var cacheTime = new Date();
                }
                var totalRows = (table.tBodies[0] && table.tBodies[0].rows.length) || 0,
                    totalCells = (table.tBodies[0].rows[0] && table.tBodies[0].rows[0].cells.length) || 0,
                    parsers = table.config.parsers,
                    cache = {
                        row: [],
                        normalized: []
                    };
                for (var i = 0; i < totalRows; ++i) {
                    var c = $(table.tBodies[0].rows[i]),
                        cols = [];
                    if (c.hasClass(table.config.cssChildRow)) {
                        cache.row[cache.row.length - 1] = cache.row[cache.row.length - 1].add(c);
                        continue;
                    }
                    cache.row.push(c);
                    for (var j = 0; j < totalCells; ++j) {
                        cols.push(parsers[j].format(getElementText(table.config, c[0].cells[j]), table, c[0].cells[j]));
                    }
                    cols.push(cache.normalized.length);
                    cache.normalized.push(cols);
                    cols = null;
                };
                if (table.config.debug) {
                    benchmark("Building cache for " + totalRows + " rows:", cacheTime);
                }
                return cache;
            };

            function getElementText(config, node) {
                var text = "";
                if (!node) return "";
                if (!config.supportsTextContent) config.supportsTextContent = node.textContent || false;
                if (config.textExtraction == "simple") {
                    if (config.supportsTextContent) {
                        text = node.textContent;
                    } else {
                        if (node.childNodes[0] && node.childNodes[0].hasChildNodes()) {
                            text = node.childNodes[0].innerHTML;
                        } else {
                            text = node.innerHTML;
                        }
                    }
                } else {
                    if (typeof (config.textExtraction) == "function") {
                        text = config.textExtraction(node);
                    } else {
                        text = $(node).text();
                    }
                }
                return text;
            }
            function appendToTable(table, cache) {
                if (table.config.debug) {
                    var appendTime = new Date()
                }
                var c = cache,
                    r = c.row,
                    n = c.normalized,
                    totalRows = n.length,
                    checkCell = (n[0].length - 1),
                    tableBody = $(table.tBodies[0]),
                    rows = [];
                for (var i = 0; i < totalRows; i++) {
                    var pos = n[i][checkCell];
                    rows.push(r[pos]);
                    if (!table.config.appender) {
                        var l = r[pos].length;
                        for (var j = 0; j < l; j++) {
                            tableBody[0].appendChild(r[pos][j]);
                        }
                    }
                }
                if (table.config.appender) {
                    table.config.appender(table, rows);
                }
                rows = null;
                if (table.config.debug) {
                    benchmark("Rebuilt table:", appendTime);
                }
                applyWidget(table);
                setTimeout(function () {
                    $(table).trigger("sortEnd");
                }, 0);
            };

            function buildHeaders(table) {
                if (table.config.debug) {
                    var time = new Date();
                }
                var meta = ($.metadata) ? true : false;
                var header_index = computeTableHeaderCellIndexes(table);
                $tableHeaders = $(table.config.selectorHeaders, table).each(function (index) {
                    this.column = header_index[this.parentNode.rowIndex + "-" + this.cellIndex];
                    this.order = formatSortingOrder(table.config.sortInitialOrder);
                    this.count = this.order;
                    if (checkHeaderMetadata(this) || checkHeaderOptions(table, index)) this.sortDisabled = true;
                    if (checkHeaderOptionsSortingLocked(table, index)) this.order = this.lockedOrder = checkHeaderOptionsSortingLocked(table, index);
                    if (!this.sortDisabled) {
                        var $th = $(this).addClass(table.config.cssHeader);
                        if (table.config.onRenderHeader) table.config.onRenderHeader.apply($th);
                    }
                    table.config.headerList[index] = this;
                });
                if (table.config.debug) {
                    benchmark("Built headers:", time);
                    log($tableHeaders);
                }
                return $tableHeaders;
            };

            function computeTableHeaderCellIndexes(t) {
                var matrix = [];
                var lookup = {};
                var thead = t.getElementsByTagName('THEAD')[0];
                var trs = thead.getElementsByTagName('TR');
                for (var i = 0; i < trs.length; i++) {
                    var cells = trs[i].cells;
                    for (var j = 0; j < cells.length; j++) {
                        var c = cells[j];
                        var rowIndex = c.parentNode.rowIndex;
                        var cellId = rowIndex + "-" + c.cellIndex;
                        var rowSpan = c.rowSpan || 1;
                        var colSpan = c.colSpan || 1
                        var firstAvailCol;
                        if (typeof (matrix[rowIndex]) == "undefined") {
                            matrix[rowIndex] = [];
                        }
                        for (var k = 0; k < matrix[rowIndex].length + 1; k++) {
                            if (typeof (matrix[rowIndex][k]) == "undefined") {
                                firstAvailCol = k;
                                break;
                            }
                        }
                        lookup[cellId] = firstAvailCol;
                        for (var k = rowIndex; k < rowIndex + rowSpan; k++) {
                            if (typeof (matrix[k]) == "undefined") {
                                matrix[k] = [];
                            }
                            var matrixrow = matrix[k];
                            for (var l = firstAvailCol; l < firstAvailCol + colSpan; l++) {
                                matrixrow[l] = "x";
                            }
                        }
                    }
                }
                return lookup;
            }
            function checkCellColSpan(table, rows, row) {
                var arr = [],
                    r = table.tHead.rows,
                    c = r[row].cells;
                for (var i = 0; i < c.length; i++) {
                    var cell = c[i];
                    if (cell.colSpan > 1) {
                        arr = arr.concat(checkCellColSpan(table, headerArr, row++));
                    } else {
                        if (table.tHead.length == 1 || (cell.rowSpan > 1 || !r[row + 1])) {
                            arr.push(cell);
                        }
                    }
                }
                return arr;
            };

            function checkHeaderMetadata(cell) {
                if (($.metadata) && ($(cell).metadata().sorter === false)) {
                    return true;
                };
                return false;
            }
            function checkHeaderOptions(table, i) {
                if ((table.config.headers[i]) && (table.config.headers[i].sorter === false)) {
                    return true;
                };
                return false;
            }
            function checkHeaderOptionsSortingLocked(table, i) {
                if ((table.config.headers[i]) && (table.config.headers[i].lockedOrder)) return table.config.headers[i].lockedOrder;
                return false;
            }
            function applyWidget(table) {
                var c = table.config.widgets;
                var l = c.length;
                for (var i = 0; i < l; i++) {
                    getWidgetById(c[i]).format(table);
                }
            }
            function getWidgetById(name) {
                var l = widgets.length;
                for (var i = 0; i < l; i++) {
                    if (widgets[i].id.toLowerCase() == name.toLowerCase()) {
                        return widgets[i];
                    }
                }
            };

            function formatSortingOrder(v) {
                if (typeof (v) != "Number") {
                    return (v.toLowerCase() == "desc") ? 1 : 0;
                } else {
                    return (v == 1) ? 1 : 0;
                }
            }
            function isValueInArray(v, a) {
                var l = a.length;
                for (var i = 0; i < l; i++) {
                    if (a[i][0] == v) {
                        return true;
                    }
                }
                return false;
            }
            function setHeadersCss(table, $headers, list, css) {
                $headers.removeClass(css[0]).removeClass(css[1]);
                var h = [];
                $headers.each(function (offset) {
                    if (!this.sortDisabled) {
                        h[this.column] = $(this);
                    }
                });
                var l = list.length;
                for (var i = 0; i < l; i++) {
                    h[list[i][0]].addClass(css[list[i][1]]);
                }
            }
            function fixColumnWidth(table, $headers) {
                var c = table.config;
                if (c.widthFixed) {
                    var colgroup = $('<colgroup>');
                    $("tr:first td", table.tBodies[0]).each(function () {
                        colgroup.append($('<col>').css('width', $(this).width()));
                    });
                    $(table).prepend(colgroup);
                };
            }
            function updateHeaderSortCount(table, sortList) {
                var c = table.config,
                    l = sortList.length;
                for (var i = 0; i < l; i++) {
                    var s = sortList[i],
                        o = c.headerList[s[0]];
                    o.count = s[1];
                    o.count++;
                }
            }
            function multisort(table, sortList, cache) {
                if (table.config.debug) {
                    var sortTime = new Date();
                }
                var dynamicExp = "var sortWrapper = function(a,b) {",
                    l = sortList.length;
                for (var i = 0; i < l; i++) {
                    var c = sortList[i][0];
                    var order = sortList[i][1];
                    var s = (table.config.parsers[c].type == "text") ? ((order == 0) ? makeSortFunction("text", "asc", c) : makeSortFunction("text", "desc", c)) : ((order == 0) ? makeSortFunction("numeric", "asc", c) : makeSortFunction("numeric", "desc", c));
                    var e = "e" + i;
                    dynamicExp += "var " + e + " = " + s;
                    dynamicExp += "if(" + e + ") { return " + e + "; } ";
                    dynamicExp += "else { ";
                }
                var orgOrderCol = cache.normalized[0].length - 1;
                dynamicExp += "return a[" + orgOrderCol + "]-b[" + orgOrderCol + "];";
                for (var i = 0; i < l; i++) {
                    dynamicExp += "}; ";
                }
                dynamicExp += "return 0; ";
                dynamicExp += "}; ";
                if (table.config.debug) {
                    benchmark("Evaling expression:" + dynamicExp, new Date());
                }
                eval(dynamicExp);
                cache.normalized.sort(sortWrapper);
                if (table.config.debug) {
                    benchmark("Sorting on " + sortList.toString() + " and dir " + order + " time:", sortTime);
                }
                return cache;
            };

            function makeSortFunction(type, direction, index) {
                var a = "a[" + index + "]",
                    b = "b[" + index + "]";
                if (type == 'text' && direction == 'asc') {
                    return "(" + a + " == " + b + " ? 0 : (" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : (" + a + " < " + b + ") ? -1 : 1 )));";
                } else if (type == 'text' && direction == 'desc') {
                    return "(" + a + " == " + b + " ? 0 : (" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : (" + b + " < " + a + ") ? -1 : 1 )));";
                } else if (type == 'numeric' && direction == 'asc') {
                    return "(" + a + " === null && " + b + " === null) ? 0 :(" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : " + a + " - " + b + "));";
                } else if (type == 'numeric' && direction == 'desc') {
                    return "(" + a + " === null && " + b + " === null) ? 0 :(" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : " + b + " - " + a + "));";
                }
            };

            function makeSortText(i) {
                return "((a[" + i + "] < b[" + i + "]) ? -1 : ((a[" + i + "] > b[" + i + "]) ? 1 : 0));";
            };

            function makeSortTextDesc(i) {
                return "((b[" + i + "] < a[" + i + "]) ? -1 : ((b[" + i + "] > a[" + i + "]) ? 1 : 0));";
            };

            function makeSortNumeric(i) {
                return "a[" + i + "]-b[" + i + "];";
            };

            function makeSortNumericDesc(i) {
                return "b[" + i + "]-a[" + i + "];";
            };

            function sortText(a, b) {
                if (table.config.sortLocaleCompare) return a.localeCompare(b);
                return ((a < b) ? -1 : ((a > b) ? 1 : 0));
            };

            function sortTextDesc(a, b) {
                if (table.config.sortLocaleCompare) return b.localeCompare(a);
                return ((b < a) ? -1 : ((b > a) ? 1 : 0));
            };

            function sortNumeric(a, b) {
                return a - b;
            };

            function sortNumericDesc(a, b) {
                return b - a;
            };

            function getCachedSortType(parsers, i) {
                return parsers[i].type;
            };
            this.construct = function (settings) {
                return this.each(function () {
                    if (!this.tHead || !this.tBodies) return;
                    var $this, $document, $headers, cache, config, shiftDown = 0,
                        sortOrder;
                    this.config = {};
                    config = $.extend(this.config, $.table.defaults, settings);
                    $this = $(this);
                    $.data(this, "table", config);
                    $headers = buildHeaders(this);
                    this.config.parsers = buildParserCache(this, $headers);
                    cache = buildCache(this);
                    var sortCSS = [config.cssDesc, config.cssAsc];
                    fixColumnWidth(this);
                    $headers.click(function (e) {
                        var totalRows = ($this[0].tBodies[0] && $this[0].tBodies[0].rows.length) || 0;
                        if (!this.sortDisabled && totalRows > 0) {
                            $this.trigger("sortStart");
                            var $cell = $(this);
                            var i = this.column;
                            this.order = this.count++ % 2;
                            if (this.lockedOrder) this.order = this.lockedOrder;
                            if (!e[config.sortMultiSortKey]) {
                                config.sortList = [];
                                if (config.sortForce != null) {
                                    var a = config.sortForce;
                                    for (var j = 0; j < a.length; j++) {
                                        if (a[j][0] != i) {
                                            config.sortList.push(a[j]);
                                        }
                                    }
                                }
                                config.sortList.push([i, this.order]);
                            } else {
                                if (isValueInArray(i, config.sortList)) {
                                    for (var j = 0; j < config.sortList.length; j++) {
                                        var s = config.sortList[j],
                                            o = config.headerList[s[0]];
                                        if (s[0] == i) {
                                            o.count = s[1];
                                            o.count++;
                                            s[1] = o.count % 2;
                                        }
                                    }
                                } else {
                                    config.sortList.push([i, this.order]);
                                }
                            };
                            setTimeout(function () {
                                setHeadersCss($this[0], $headers, config.sortList, sortCSS);
                                appendToTable($this[0], multisort($this[0], config.sortList, cache));
                            }, 1);
                            return false;
                        }
                    }).mousedown(function () {
                        if (config.cancelSelection) {
                            this.onselectstart = function () {
                                return false
                            };
                            return false;
                        }
                    });
                    $this.bind("update", function () {
                        var me = this;
                        setTimeout(function () {
                            me.config.parsers = buildParserCache(me, $headers);
                            cache = buildCache(me);
                        }, 1);
                    }).bind("updateCell", function (e, cell) {
                        var config = this.config;
                        var pos = [(cell.parentNode.rowIndex - 1), cell.cellIndex];
                        cache.normalized[pos[0]][pos[1]] = config.parsers[pos[1]].format(getElementText(config, cell), cell);
                    }).bind("sorton", function (e, list) {
                        $(this).trigger("sortStart");
                        config.sortList = list;
                        var sortList = config.sortList;
                        updateHeaderSortCount(this, sortList);
                        setHeadersCss(this, $headers, sortList, sortCSS);
                        appendToTable(this, multisort(this, sortList, cache));
                    }).bind("appendCache", function () {
                        appendToTable(this, cache);
                    }).bind("applyWidgetId", function (e, id) {
                        getWidgetById(id).format(this);
                    }).bind("applyWidgets", function () {
                        applyWidget(this);
                    });
                    if ($.metadata && ($(this).metadata() && $(this).metadata().sortlist)) {
                        config.sortList = $(this).metadata().sortlist;
                    }
                    if (config.sortList.length > 0) {
                        $this.trigger("sorton", [config.sortList]);
                    }
                    applyWidget(this);
                });
            };
            this.addParser = function (parser) {
                var l = parsers.length,
                    a = true;
                for (var i = 0; i < l; i++) {
                    if (parsers[i].id.toLowerCase() == parser.id.toLowerCase()) {
                        a = false;
                    }
                }
                if (a) {
                    parsers.push(parser);
                };
            };
            this.addWidget = function (widget) {
                widgets.push(widget);
            };
            this.formatFloat = function (s) {
                var i = parseFloat(s);
                return (isNaN(i)) ? 0 : i;
            };
            this.formatInt = function (s) {
                var i = parseInt(s);
                return (isNaN(i)) ? 0 : i;
            };
            this.isDigit = function (s, config) {
                return /^[-+]?\d*$/.test($.trim(s.replace(/[,.']/g, '')));
            };
            this.clearTableBody = function (table) {
                if ($.browser.msie) {
                    function empty() {
                        while (this.firstChild) this.removeChild(this.firstChild);
                    }
                    empty.apply(table.tBodies[0]);
                } else {
                    table.tBodies[0].innerHTML = "";
                }
            };
        }
    });
    $.fn.extend({
        table: $.table.construct
    });
    var ts = $.table;
    ts.addParser({
        id: "text",
        is: function (s) {
            return true;
        },
        format: function (s) {
            return $.trim(s.toLocaleLowerCase());
        },
        type: "text"
    });
    ts.addParser({
        id: "digit",
        is: function (s, table) {
            var c = table.config;
            return $.table.isDigit(s, c);
        },
        format: function (s) {
            return $.table.formatFloat(s);
        },
        type: "numeric"
    });
    ts.addParser({
        id: "currency",
        is: function (s) {
            return /^[Â£$â‚¬?.]/.test(s);
        },
        format: function (s) {
            return $.table.formatFloat(s.replace(new RegExp(/[Â£$â‚¬]/g), ""));
        },
        type: "numeric"
    });
    ts.addParser({
        id: "ipAddress",
        is: function (s) {
            return /^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/.test(s);
        },
        format: function (s) {
            var a = s.split("."),
                r = "",
                l = a.length;
            for (var i = 0; i < l; i++) {
                var item = a[i];
                if (item.length == 2) {
                    r += "0" + item;
                } else {
                    r += item;
                }
            }
            return $.table.formatFloat(r);
        },
        type: "numeric"
    });
    ts.addParser({
        id: "url",
        is: function (s) {
            return /^(https?|ftp|file):\/\/$/.test(s);
        },
        format: function (s) {
            return jQuery.trim(s.replace(new RegExp(/(https?|ftp|file):\/\//), ''));
        },
        type: "text"
    });
    ts.addParser({
        id: "isoDate",
        is: function (s) {
            return /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(s);
        },
        format: function (s) {
            return $.table.formatFloat((s != "") ? new Date(s.replace(new RegExp(/-/g), "/")).getTime() : "0");
        },
        type: "numeric"
    });
    ts.addParser({
        id: "percent",
        is: function (s) {
            return /\%$/.test($.trim(s));
        },
        format: function (s) {
            return $.table.formatFloat(s.replace(new RegExp(/%/g), ""));
        },
        type: "numeric"
    });
    ts.addParser({
        id: "usLongDate",
        is: function (s) {
            return s.match(new RegExp(/^[A-Za-z]{3,10}\.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(AM|PM)))$/));
        },
        format: function (s) {
            return $.table.formatFloat(new Date(s).getTime());
        },
        type: "numeric"
    });
    ts.addParser({
        id: "shortDate",
        is: function (s) {
            return /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test(s);
        },
        format: function (s, table) {
            var c = table.config;
            s = s.replace(/\-/g, "/");
            if (c.dateFormat == "us") {
                s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$1/$2");
            } else if (c.dateFormat == "uk") {
                s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$2/$1");
            } else if (c.dateFormat == "dd/mm/yy" || c.dateFormat == "dd-mm-yy") {
                s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/, "$1/$2/$3");
            }
            return $.table.formatFloat(new Date(s).getTime());
        },
        type: "numeric"
    });
    ts.addParser({
        id: "time",
        is: function (s) {
            return /^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/.test(s);
        },
        format: function (s) {
            return $.table.formatFloat(new Date("2000/01/01 " + s).getTime());
        },
        type: "numeric"
    });
    ts.addParser({
        id: "metadata",
        is: function (s) {
            return false;
        },
        format: function (s, table, cell) {
            var c = table.config,
                p = (!c.parserMetadataName) ? 'sortValue' : c.parserMetadataName;
            return $(cell).metadata()[p];
        },
        type: "numeric"
    });
    ts.addWidget({
        id: "zebra",
        format: function (table) {
            if (table.config.debug) {
                var time = new Date();
            }
            var $tr, row = -1,
                odd;
            $("tr:visible", table.tBodies[0]).each(function (i) {
                $tr = $(this);
                if (!$tr.hasClass(table.config.cssChildRow)) row++;
                odd = (row % 2 == 0);
                $tr.removeClass(table.config.widgetZebra.css[odd ? 0 : 1]).addClass(table.config.widgetZebra.css[odd ? 1 : 0])
            });
            if (table.config.debug) {
                $.table.benchmark("Applying Zebra widget", time);
            }
        }
    });
})(jQuery);


// @PLUGIN Table pagination by Christian Bach and customization by me, such as dots nav, automatic generation of pagination elements etc.
(function($) {
	$.extend({
		pagination: new function() {
			
			function updatePageDisplay(c) {
				var s = $(c.cssPageDisplay,c.container).val((c.page+1) + c.seperator + c.totalPages);	
			}
			
			function dots(table) {
				var c = table.config;

				if(c.container.children('ul.round.table').length>0) {
					c.container.children('ul.round.table').remove();
				}
				
				c.container.append('<ul class="round table" />')
				for (var i = 0; i < c.totalPages; i ++) {
					c.container.children('ul.round.table').append("<li>"+i+"</li>");
				}
				
				c.container.children("ul.round.table").children("li:first-child").addClass("current");
				
				$(c.container + "ul.round.table li").live("tap", function() {
					c.page = parseInt($(this).text());
					moveToPage(table);
					$(this).parents("ul.round").children(".current").removeClass("current");
					$(this).addClass("current");
				});
			}
			
			function setPageSize(table,size) {
				var c = table.config;
				c.size = size;
				c.totalPages = Math.ceil(c.totalRows / c.size);
				c.pagerPositionSet = false;
				moveToPage(table);
				dots(table);
				fixPosition(table);
			}
			
			function fixPosition(table) {
				var c = table.config;
				if(!c.pagerPositionSet && c.positionFixed) {
					var c = table.config, o = $(table);
					if(o.offset) {
						c.container.css({
							top: o.offset().top + o.height() + 'px',
							position: 'absolute'
						});
					}
					c.pagerPositionSet = true;
				}
			}
			
			function moveToFirstPage(table) {
				var c = table.config;
				c.page = 0;
				moveToPage(table);
			}
			
			function moveToLastPage(table) {
				var c = table.config;
				c.page = (c.totalPages-1);
				moveToPage(table);
			}
			
			function moveToNextPage(table) {
				var c = table.config;
				c.page++;
				if(c.page >= (c.totalPages-1)) {
					c.page = (c.totalPages-1);
				}
				moveToPage(table);
			}
			
			function moveToPrevPage(table) {
				var c = table.config;
				c.page--;
				if(c.page <= 0) {
					c.page = 0;
				}
				moveToPage(table);
			}
						
			
			function moveToPage(table) {
				var c = table.config;
				if(c.page < 0 || c.page > (c.totalPages-1)) {
					c.page = 0;
				}
				var number = c.page + 1;
				$(c.container + "ul.round.table li.current").removeClass("current");
				$(c.container + "ul.round.table li:nth-child(" +number+ ")").addClass("current");
				renderTable(table,c.rowsCopy);
			}
			
			function renderTable(table,rows) {
				
				var c = table.config;
				var l = rows.length;
				var s = (c.page * c.size);
				var e = (s + c.size);
				if(e > rows.length ) {
					e = rows.length;
				}
				
				
				var tableBody = $(table.tBodies[0]);
				
				// clear the table body
				
				$.table.clearTableBody(table);
				
				for(var i = s; i < e; i++) {
					
					//tableBody.append(rows[i]);
					
					var o = rows[i];
					var l = o.length;
					for(var j=0; j < l; j++) {
						
						tableBody[0].appendChild(o[j]);

					}
				}
				
				fixPosition(table,tableBody);
				
				$(table).trigger("applyWidgets");
				
				if( c.page >= c.totalPages ) {
        			moveToLastPage(table);
				}
				
				updatePageDisplay(c);
			}
			
			this.appender = function(table,rows) {
				
				var c = table.config;
				
				c.rowsCopy = rows;
				c.totalRows = rows.length;
				c.totalPages = Math.ceil(c.totalRows / c.size);
				
				renderTable(table,rows);
			};
			
			this.defaults = {
				size: 15,
				offset: 0,
				page: 0,
				extended: false,
				totalRows: 0,
				totalPages: 0,
				container: null,
				pageOptions: "5,10,20,40,80,100,200",
				dots: true,
				seperator: "/",
				positionFixed: false,
				appender: this.appender
			};
			
			this.construct = function(settings) {
				
				return this.each(function() {	
					
					config = $.extend(this.config, $.pagination.defaults, settings);
					
					var table = this, pager = config.container;
					
					$(this).trigger("appendCache");
					
					
					$(this).after('<div class="pagination" />');
					pager = $(this).siblings('.pagination');
					config.container = pager;
					
					
					if(config.dots==true) {
						dots(table);
					}
					
					if(config.extended==true) {
						pager.prepend('<button class="first">First</button><button class="prev sugar">Previous</button><button class="next red">Next</button><button class="last">Last</button>');
						$('.first',pager).click(function() {
							moveToFirstPage(table);
							return false;
						});
						$('.next',pager).click(function() {
							moveToNextPage(table);
							return false;
						});
						$('.prev',pager).click(function() {
							moveToPrevPage(table);
							return false;
						});
						$('.last',pager).click(function() {
							moveToLastPage(table);
							return false;
						});
						if(config.pageOptions) {
							var i;
							var views = config.pageOptions;
							views = views.split(",");
							
							$('.last', pager).after('<span class="number"></span>');
							
							for(i = 0; i < views.length; i++){
								$('.number', pager).append('<span>' + views[i] + '</span>'); 
							}
						}
						$('.number > span',pager).bind("tap", function() {
							setPageSize( table, parseInt( $(this).text() ) );
						});
					}
				});
			};
			
		}
	});
	// extend plugin scope
	$.fn.extend({
        pagination: $.pagination.construct
	});
	
})(jQuery);
 
 
// @PLUGIN Tooltip by Drew Wilson (heavily modified / simplified version)
(function($){
	$.fn.tooltip = function(options) {
		var defaults = { 
			activation: "hover",
			keepAlive: false,
			maxWidth: "240px",
			title: false,
			edgeOffset: 3,
			defaultPosition: "bottom",
			delay: 0,
			fadeIn: 100,
			fadeOut: 100,
			attribute: "title",
			theme: false,
			content: false, // HTML or String to fill tooltip with
		  	enter: function(){},
		  	exit: function(){}
	  	};
	 	var opts = $.extend(defaults, options);
	 	
	 	// Setup tip tip elements and render them to the DOM
	 	var tooltip;
	 	var tooltip_content;
	 	var toggle;
	 	function render() {
	 		if($('#tooltip').length>0) {
	 			if($('#tooltip').hasClass('click')) {
	 				toggle = true;
	 			}
	 			$('#tooltip').remove();
	 			if(toggle==true) {
	 				return false;
	 			}
	 		}
	 		tooltip = $('<div id="tooltip" />');
	 		if(opts.theme!=false) {
	 			tooltip.addClass(opts.theme);
	 		}
	 		
	 		if(opts.maxWidth!="240px") {
	 			tooltip.css("max-width", opts.maxWidth);
	 		}
			tooltip_content = $('<p />');
			if(opts.title!=false) {
				tooltip_content.prepend('<h2>' + opts.title + '</h2>');
			}
			$("body").append(tooltip.html(tooltip_content));
		}
		
		return this.each(function(){
			var org_elem = $(this);
			if(opts.content){
				var org_title = opts.content;
			} else {
				if(opts.attribute!="title") {
					var org_title = org_elem.attr(opts.attribute);
				} else {
					var org_title = org_elem.data("title");
				}
			}
			if(org_title != ""){
				if(!opts.content && opts.attribute != "title"){
					org_elem.removeAttr(opts.attribute); //remove original Attribute
				}
				var timeout = false;
				
				if(opts.activation == "hover"){
					org_elem.hover(function(){
						active_tooltip();
					}, function(){
						if(!opts.keepAlive){
							deactive_tooltip();
						}
					});
					if(opts.keepAlive){
						tooltip.hover(function(){}, function(){
							deactive_tooltip();
						});
					}
				} else if(opts.activation == "focus"){
					org_elem.focus(function(){
						active_tooltip();
					}).blur(function(){
						deactive_tooltip();
					});
				} else if(opts.activation == "click"){
					org_elem.click(function(){
						active_tooltip();
						tooltip.addClass("click");
						return false;
					}).hover(function(){},function(){
						if(!opts.keepAlive){
							deactive_tooltip();
						}
					});
					if(opts.keepAlive){
						tooltip.hover(function(){}, function(){
							deactive_tooltip();
						});
					}
				}
			
				function active_tooltip() {
					opts.enter.call(this);
					render();
					tooltip_content.append(org_title);
					
					var top = parseInt(org_elem.offset()['top']);
					var left = parseInt(org_elem.offset()['left']);
					var org_width = parseInt(org_elem.outerWidth());
					var org_height = parseInt(org_elem.outerHeight());
					var tip_w = tooltip.outerWidth();
					var tip_h = tooltip.outerHeight();
					var w_compare = Math.round((org_width - tip_w) / 2);
					var h_compare = Math.round((org_height - tip_h) / 2);
					var marg_left = Math.round(left + w_compare);
					var marg_top = Math.round(top + org_height + opts.edgeOffset);
					var t_class = "";

                    t_class = opts.defaultPosition;
                   	
					
					var right_compare = (w_compare + left) < parseInt($(window).scrollLeft());
					var left_compare = (tip_w + left) > parseInt($(window).width());
					
					if((right_compare && w_compare < 0) || (t_class == "right" && !left_compare) || (t_class == "left" && left < (tip_w + opts.edgeOffset + 5))){
						t_class = "right";
						marg_left = Math.round(left + org_width + opts.edgeOffset);
						marg_top = Math.round(top + h_compare);
					} else if((left_compare && w_compare < 0) || (t_class == "left" && !right_compare)){
						t_class = "left";
						marg_left = Math.round(left - (tip_w + opts.edgeOffset + 5));
						marg_top = Math.round(top + h_compare);
					}

					var top_compare = (top + org_height + opts.edgeOffset + tip_h + 8) > parseInt($(window).height() + $(window).scrollTop());
					var bottom_compare = ((top + org_height) - (opts.edgeOffset + tip_h + 8)) < 0;
					
					if(top_compare || (t_class == "bottom" && top_compare) || (t_class == "top" && !bottom_compare)){
						if(t_class == "top" || t_class == "bottom"){
							t_class = "top";
						} else {
							t_class = t_class+"top";
						}
						marg_top = Math.round(top - (tip_h + 5 + opts.edgeOffset));
					} else if(bottom_compare | (t_class == "top" && bottom_compare) || (t_class == "bottom" && !top_compare)){
						if(t_class == "top" || t_class == "bottom"){
							t_class = "bottom";
						} else {
							t_class = t_class+"bottom";
						}						
						marg_top = Math.round(top + org_height + opts.edgeOffset);
					}
				
					if(t_class == "righttop" || t_class == "lefttop"){
						marg_top = marg_top + 5;
					} else if(t_class == "rightbottom" || t_class == "leftbottom"){		
						marg_top = marg_top - 5;
					}
					if(t_class == "lefttop" || t_class == "leftbottom"){	
						marg_left = marg_left + 5;
					}
					tooltip.css({"left": marg_left+"px", "top": marg_top+"px"}).addClass(t_class);
					
					if (timeout){ clearTimeout(timeout); }
					timeout = setTimeout(function(){ tooltip.stop(true,true).fadeIn(opts.fadeIn); }, opts.delay);	
				}
				
				function deactive_tooltip(){
					opts.exit.call(this);
					if (timeout){ clearTimeout(timeout); }
					tooltip.fadeOut(opts.fadeOut, function() {
						$(this).remove();
					});
				}
			}				
		});
	}
})(jQuery);  	


// @PLUGIN Does the element have the attribute x?
(function($){
	$.fn.hasAttr = function(name) {  
	return this.attr(name) !== undefined;
};
})(jQuery);


// @PLUGIN Modal Pastel plugin by me
(function($){
$.fn.modal = function(options) {
	var defaults = {  
		theme: "light",  
		width: undefined,
		height: undefined,
		layout: undefined,
		url: undefined,
		content: undefined,
		padding: undefined,
		animation: "flipInX"
	};  
	if( $("#overlays .modal").length>0 ) {
		$("#overlays .modal").remove();
	}
	var options = $.extend(defaults, options); 
	
	$("#overlays").addClass("dark").append('<div class="modal"><div class="wrapper"></div></div>');
	var modal = $("#overlays .modal");
	var wrapper = $("#overlays .modal .wrapper");
	
	if(defaults.url==undefined) {
		wrapper.html( this.html() );
	} else {
		wrapper.load(defaults.url);
	}
	
	if(defaults.content!=undefined) {
		wrapper.html(defaults.content);
	}
	
	if(defaults.theme!="light") {
		modal.addClass(defaults.theme);
	}
	
	if(defaults.animation!=false) {
		modal.addClass("animated " + defaults.animation);
	}
	
	if(defaults.layout=="elastic") {
		var si = "%";
		if(defaults.width==undefined) {
			modal.css("width", "90%").css("margin-left", "-45%");
		}
		if(defaults.height==undefined) {
			modal.css("height", "70%").css("margin-top", "-35%");
		}
		
	} else {
		var si = "px";
	}
	
	if(defaults.width!=undefined) {
		var width = defaults.width + si;
		var marginLeft = -(defaults.width / 2) + si;
		modal.css("width", width).css("margin-left", marginLeft);
	}
	if(defaults.height!=undefined) {
		var height = defaults.height + si;
		var marginTop = -(defaults.height / 2) + si;
		modal.css("height", height).css("margin-top", marginTop);
	}
	
	if(defaults.padding!=undefined) {
		wrapper.css("margin", defaults.padding)
	}
	
	
	modal.live("tap", function() {
		return false;
	});
	
	$("#overlays.dark .modal .hide").live("tap", function() {
		remove(modal);
	});
	
	$(document).keyup(function(e) {
		if(e.which == 27) {
			remove(modal);
		}
	});
	
	function remove(modal) {
		modal.remove();
		$("#overlays").removeClass();
		$(document).unbind("keyup");	
	}
	
	
	
}
})(jQuery);


// @PLUGIN Maps Pastel plugin by me
(function($){
	$.fn.maps = function(options) {
	var defaults = {  
		coordinates: "55.680839,12.585955",
		place: undefined,  
		texture: false,
		type: "satellite",
		zoom: 16,
		marker: true,
		geo: false,
		caption: undefined,
		modal: {padding: 0, width: 1100 },
		html: false
	};  
	var obj = this;
	var options = $.extend(defaults, options); 
	var coords = defaults.coordinates;
	var zoom = defaults.zoom;
	var type = defaults.type;
	if(defaults.place!=undefined) {
		coords = $.trim(defaults.place).split(' ').join('+');
	}
	if(defaults.geo==true) {
		if (navigator.geolocation) {  
			navigator.geolocation.getCurrentPosition(
				function(position) {  
					coords = position.coords.latitude + "," + position.coords.longitude;
					return create();  
		  		}, 
		  		function(error) {
		  			var content;
					switch(error.code) {
						case error.TIMEOUT:
							content = "Timeout.";
							break;
						case error.POSITION_UNAVAILABLE:
							content = "Position unavailable"
						case error.PERMISSION_DENIED:
							content = "Permission denied.";
							break;
						case error.UNKNOWN_ERROR:
							content = "Unknown error";
							break;
					}		  			
		  			$.notification( 
		  				{
		  					title: "Your location could not be determined",
		  					content: content,
		  					error: true
		  				}
		  			);
		  		},
		  		{
					enableHighAccuracy: true,
					timeout: 10000
		  		}
		  		
		  	);
		} else {
			$.notification( 
				{
					title: "Your location could not be determined",
					content: "Your browser doesn't support geolocation.",
					error: true
				}
			);
		}
	} else {
		return create();
	}
	function create() {
		var url = "http://maps.googleapis.com/maps/api/staticmap?center=" + coords + "&zoom=" + zoom + "&maptype=" + type + "&size=640x640&sensor=false&scale=2&language=en";
		var con = $("<div>");
		var map = $("<div>");
		map.addClass("map").css("background-image", "url("+url+")");
		if(defaults.marker==true) {
			var marker = $("<div>");
			var glow = $("<div>");
			marker.addClass("marker animated rotateInDownRight");
			glow.addClass("glow").appendTo(marker);	
			marker.appendTo(map);
		}
		if(defaults.texture==true) {
			map.addClass("texture");
		}
		if(defaults.caption!=undefined) {
			var outer = $("<div>");
			var caption = $("<div>");
			outer.addClass("outer");
			caption.addClass("caption animated bounceInDown").html(defaults.caption).appendTo(outer);	
			outer.appendTo(map);
		}
		if($(obj).length>0) {
			map.addClass("non-modal");
		}
		map.appendTo(con);
		if($(obj).length>0) {
			$(obj).html( con.html() );
		} else if (defaults.html==true) {
			return con.html();
		} else {
			con.modal(defaults.modal);
		}
	}
};
})(jQuery);


// @PLUGIN Url hash change
(function($){
	$.change = function(page, title, first) {
	if(!$(page).length>0) {
		$.info({desc: "The hash <strong>"+page+"</strong> is not valid"});
	} else {
		window.location.hash = page;
		if (!$.browser.msie && first==true) {
			history.replaceState('', title, page);
		}
	}
};
})(jQuery);


// @PLUGIN By Scott Jehl: http://std.li/jD | MIT license
(function($){
	$.fn.file = function(){
	//apply events and styles for file input element
	var fileInput = $(this)
		//.addClass('file-input') //add class for CSS
		.mouseover(function(){ upload.addClass('hover'); })
		.mouseout(function(){ upload.removeClass('hover'); })
		.focus(function(){
			upload.addClass('focus'); 
			fileInput.data('val', fileInput.val());
		})
		.blur(function(){ 
			upload.removeClass('focus');
			$(this).trigger('checkChange');
		 })
		 .bind('disable',function(){
		 	fileInput.attr('disabled',true);
			upload.addClass('disabled');
		})
		.bind('enable',function(){
			fileInput.removeAttr('disabled');
			upload.removeClass('disabled');
		})
		.bind('checkChange', function(){
			if(fileInput.val() && fileInput.val() != fileInput.data('val')){
				fileInput.trigger('change');
			}
		})
		.bind('change',function(){
			//get file name
			var fileName = $(this).val().split(/\\/).pop();
			//get file extension
			var fileExt = 'file-ext-' + fileName.split('.').pop().toLowerCase();
			//update the feedback
			uploadFeedback
				.text(fileName) //set feedback text to filename
				.removeClass(uploadFeedback.data('fileExt') || '') //remove any existing file extension class
				.addClass(fileExt) //add file extension class
				.data('fileExt', fileExt) //store file extension for class removal on next change
				.addClass('populated'); //add class to show populated state
			//change text of button	
			uploadButton.text('Change');	
		})
		.click(function(){ //for IE and Opera, make sure change fires after choosing a file, using an async callback
			fileInput.data('val', fileInput.val());
			setTimeout(function(){
				fileInput.trigger('checkChange');
			},100);
		});

	//create custom control container
	var upload = $('<div class="file"></div>');
	//create custom control button
	var uploadButton = $('<button aria-hidden="true">Choose</button>').appendTo(upload);
	//create custom control feedback
	
	if($(this).hasAttr("data-text")) {
		var content = $(this).attr("data-text");
	} else {
		var content = "No file selected"
	}
	
	var uploadFeedback = $('<span class="feedback" aria-hidden="true">'+content+'</span>').appendTo(upload);

	//match disabled state
	if(fileInput.is('[disabled]')){
		fileInput.trigger('disable');
	}


	//on mousemove, keep file input under the cursor to steal click
	upload
		.mousemove(function(e){
			fileInput.css({
				'left': e.pageX - upload.offset().left - fileInput.outerWidth() + 20, //position right side 20px right of cursor X)
				'top': e.pageY - upload.offset().top - $(window).scrollTop() - 3
			});	
		})
		.insertAfter(fileInput); //insert after the input

	fileInput.appendTo(upload);

	//return jQuery
	return $(this);
};
})(jQuery);


// @PLUGIN Gallery plugin by me
(function($){
	$.fn.gallery = function(url, custom) { 
	if(url!=undefined) {
		$.ajax({ 
		    url: url,
		    success: function(html) {
		    	makeGallery(html); 
		    },
		    error: function(jqXHR, textStatus, errorThrown) {
		    	$.notification( 
		    		{
		    			title: errorThrown,
		    			content: "Couldn't access the provided URL",
		    			error: true
		    		}
		    	);
		    	return false;
		    }
		});
	} else if(this.length>0) {
		this.hide();
		makeGallery(this.html());
	} else {
		$.notification( 
			{
				title: 'You have to provide something to the function',
				content: 'You need to provide an url like this: <br>$.fn.gallery("http://example.com") <br><br><strong>or</strong><br><br>Pass an object to the function like this: <br>$("#object").gallery()',
				error: true
			}
		);
		return false;
	}
	function makeGallery(html) {
		var uniqueNum = Math.floor( Math.random()*99999 );
		var uniqueID = "montage-"+String(uniqueNum);
		var montage = $('<div />');
		montage.attr("id", uniqueID).addClass("gallery");
		$('body').append(montage);
		$('body').addClass("transparent");
	    montage.html(html);
		$('#overlays').append('<div class="loader" />');        
        var container 	= montage;
        var imgs		= container.find('img').hide();
        var totalImgs	= imgs.length;
        var cnt			= 0; 
             
        imgs.each(function(i) {
        	$(this).wrap('<a href="#" />')
        	$(this).removeAttr('title');
        	
        	var img	= $(this);
        	$('<img/>').load(function() {
        		$("#overlays .loader").remove();
        		++cnt;
        		if( cnt === totalImgs ) {
        			imgs.show();
        			if(custom!=undefined) {
        				container.montage(custom);
        			} else {
	        			container.montage({
	        				fillLastRow				: true,
	        				alternateHeight			: true,
	        				alternateHeightRange	: {
	        					min	: 150,
	        					max	: 190
	        				}
	        			});
	        		}
        		}
        	}).attr('src',img.attr('src'));
        });
        
        var image;
        $("#" + uniqueID + " img").bind("click", function() {
        	$('#overlays').addClass("montage").append('<div class="photo animated fast rollIn" style="background-image: url('+$(this).attr("src")+')"></div>');
        	
        	image = $(this);
        	return false;
        });
        
        $("#overlays.montage .photo").live("click", function() {
        	$(this).remove();
        	$("#overlays.montage").removeClass("montage");
        });
        
        $(document).keydown(function(e){
        	if (e.which == 37 || e.which == 39 && $("#overlays").hasClass("montage")) { 
        		$("#overlays .photo").attr("class", "photo");
        		var newImage;
        		if(e.which == 37) {
        			newImage = image.parents("a").prev().children("img");
        		} else {
        			newImage = image.parents("a").next().children("img");
        		}	
        		
        		if(newImage.length>0) {
        			image = newImage;
        			$("#overlays .photo").css("background-image", "url("+image.attr("src")+")")
        			return false;
        		} else {
        			$("#overlays .photo").addClass("animated shake fast").delay(400).queue(function(){ 
						$("#overlays .photo").attr("class", "photo");
						 $("#overlays .photo").clearQueue();
					});
        			return false;
        		}
        	}
        });
        
        $(document).keyup(function(e) {
        	if (e.which == 27) {
        		if($("#overlays").hasClass("montage")) {
        			$("#overlays.montage .photo").remove();
        			$("#overlays.montage").removeClass("montage");
        		} else {
        			montage.addClass("hidden");
        			$("#overlays.montage .photo").remove();
        			$("#overlays.montage").removeClass("montage");
        			$('body').removeClass('transparent');
        			$('.loader').remove();
        			$(document).unbind("keyup");
        			$(document).unbind("keydown");
        		}
        		e.preventDefault();
        		return false;
        	} 
        });
        
        
        
	}
	
};
})(jQuery);

// @PLUGIN Overlay plugin by me 
(function($){
	$.fn.overlay = function(heading, url, animation) {
	if(url!=undefined) {
		$.ajax({ 
		    url: url,
		    success: function(html) {
		    	makeOverlay(heading, html, animation); 
		    },
		    error: function(jqXHR, textStatus, errorThrown) {
		    	$.notification( 
		    		{
		    			title: errorThrown,
		    			content: "Couldn't access the provided URL",
		    			error: true
		    		}
		    	);
		    	return false;
		    }
		});
	} else if(this.length>0) {
		makeOverlay(heading, this.html(), animation);
	} else {
		$.notification( 
			{
				title: 'You have to provide something to the function',
				content: 'You need to provide an url like this: <br>$.fn.overlay("Heading","http://example.com") <br><br><strong>or</strong><br><br>Pass an object to the function like this: <br>$("#object").overlay("Heading")',
				error: true
			}
		);
		return false;
	}
	var overlay;
	$(document).keyup(function(e) {
		if(e.which == 27) {
			overlay.remove();
			$(document).unbind("keyup");	
		}
	});
	
	function makeOverlay(heading, html, animation) {
		overlay = $('<div class="overlay"> /')
		var wrapper = $('<div class="wrapper" />');
		
		if(animation!=undefined) {
			overlay.addClass("animated " + animation);
		} else {
			overlay.addClass("animated fadeInDown");
		}
		
		if(heading!=undefined) {
			wrapper.append('<h2>'+heading+'</h2>');
		}	
		wrapper.append(html);
		wrapper.appendTo(overlay);
		$('#overlays').append(overlay);
	}
};
})(jQuery);

// @PLUGIN Info plugin by me
(function($){
	$.info = function(options) {
	var defaults = { 
		icon: "!",
		type: "Error",  
		title: "404",
		particles: "multi",
		desc: "An error occurred",
		theme: undefined
	};  
	var o = $.extend(defaults, options); 
	
	var container;
	function create() {
		remove();
		$("body").addClass("hidden");
		container = $('<div class="particles" />');
		$("#overlays").addClass("info").append(container);
		
		if(o.theme!=undefined) {
			$("#overlays").addClass(o.theme);
		}
		
		$("#overlays").append('<div class="wrapper"><span class="icon">'+o.icon+'</span><h2>'+o.type+': <span>'+o.title+'</span></h2><span class="desc">'+o.desc+'<br>Click anywhere to dismiss this message.</span></div>');
		
		$("#overlays .wrapper").addClass("animated fadeInDown");
		
		$(".particles").live("tap", function() {
			remove();
		});
		
	}
	
	function remove() {
		$("#overlays").removeClass();
		$("#overlays .wrapper").remove();
		$("body").removeClass("hidden");
		$(".particles").remove();
	}
	
	$.getScript("static/scripts/three.js", function(){
		if (!window.requestAnimationFrame) {
		    window.requestAnimationFrame = (function () {
		        return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		        function (callback, element) {
		            window.setTimeout(callback, 1000 / 60)
		        }
		    })()
		}
		var camera, scene, renderer, particle;
		var mouseX = 0,
		    mouseY = 0;
		var windowHalfX = window.innerWidth / 2;
		var windowHalfY = window.innerHeight / 2;
		
		create();
		init();
		animate();
		
		function init() {
		    camera = new THREE.Camera(75, window.innerWidth / window.innerHeight, 1, 3000);
		    camera.position.z = 1000;
		    scene = new THREE.Scene();
		    for (var i = 0; i < 180; i++) {
		    	if(o.particles=="multi") {
		    		var color = Math.random() * 0x808008 + 0x808080;
		    		//Math.random() * 0xCFF09E + 0x3B8686
		    	} else {
		    		var color = "0x" + o.particles;
		    	}
		        particle = new THREE.Particle(new THREE.ParticleCircleMaterial({
		            color: color,
		            opacity: 0.9
		        }));
		        particle.position.x = Math.random() * 2000 - 1000;
		        particle.position.y = Math.random() * 2000 - 1000;
		        particle.position.z = Math.random() * 2000 - 1000;
		        particle.scale.x = particle.scale.y = Math.random() * 10 + 1;
		        scene.addObject(particle)
		    }
		    renderer = new THREE.CanvasRenderer();
		    renderer.setSize(window.innerWidth, window.innerHeight);
		    container.append(renderer.domElement);
		    document.addEventListener('mousemove', onDocumentMouseMove, false);
		    document.addEventListener('touchstart', onDocumentTouchStart, false);
		    document.addEventListener('touchmove', onDocumentTouchMove, false)
		}
		function onDocumentMouseMove(event) {
		    mouseX = event.clientX - windowHalfX;
		    mouseY = event.clientY - windowHalfY
		}
		function onDocumentTouchStart(event) {
		    if (event.touches.length == 1) {
		        event.preventDefault();
		        mouseX = event.touches[0].pageX - windowHalfX;
		        mouseY = event.touches[0].pageY - windowHalfY
		    }
		}
		function onDocumentTouchMove(event) {
		    if (event.touches.length == 1) {
		        event.preventDefault();
		        mouseX = event.touches[0].pageX - windowHalfX;
		        mouseY = event.touches[0].pageY - windowHalfY
		    }
		}
		function animate() {
		    requestAnimationFrame(animate);
		    render()
		}
		function render() {
		    camera.position.x += (mouseX - camera.position.x) * 0.15;
		    camera.position.y += (-mouseY - camera.position.y) * 0.15;
		    renderer.render(scene, camera)
		}
	}).fail(function(jqxhr, settings, exception) {
		create();
	}); 
	
};
})(jQuery);

//Smart function to make colours brighter or darker, based on: http://std.li/L7 (Craig Buckler)
(function($){
	$.colour = function(hex, lum, alpha, brightness) {
	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;
	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}
	if(brightness==undefined) {
		if(alpha!=true) {
			return rgb;
		} else {
			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(rgb);
			return parseInt(result[1], 16) + "," + parseInt(result[2], 16) + "," + parseInt(result[3], 16);
		}
	} else {
		var r = parseInt(hex.substring(0,2),16);
		var g = parseInt(hex.substring(2,4),16);
		var b = parseInt(hex.substring(4,6),16);
		
		return r*2 + g*3 + b;
	}
};
})(jQuery);


(function($){
	$.fn.getColor = function() {
	var rgb = $(this).css('background-color');
	if (!rgb) {
		return '#FFFFFF'; //default color
	}
	var hex_rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/); 
	function hex(x) {return ("0" + parseInt(x).toString(16)).slice(-2);}
	if (hex_rgb) {
		return "#" + hex(hex_rgb[1]) + hex(hex_rgb[2]) + hex(hex_rgb[3]);
	} else {
		return rgb;
	}
}
})(jQuery);

// Chart color tooltips

var previousPoint = null;
(function($){
	$.fn.tooltipColor = function(label) {
		if(label==undefined) {
			label = "visitors";
		}
		this.bind("plothover", function (event, pos, item) {
		    $("#x").text(pos.x.toFixed(2));
		    $("#y").text(pos.y.toFixed(2));
		
		    if (item) {
		        if (previousPoint != item.dataIndex) {
		            previousPoint = item.dataIndex;
		            
		            $(".tooltip").remove();
		            var x = item.datapoint[0].toFixed(2),
		                y = item.datapoint[1].toFixed(2);
		            
		            showTooltip(item.pageX, item.pageY, "<h4>"+item.series.label+"</h4>" + "<strong>" + y + "</strong> " + label, item.series.color);
		        }
		    }
		    else {
		        $(".tooltip").remove();
		        previousPoint = null;            
		    }
		});
		
		function showTooltip(x, y, contents, color) {
			var tooltip = $('<div class="tooltip animated fadeInDown fast" />');
		    tooltip.html(contents).append('<div class="arrow"></div>').appendTo("body");
		    var height = tooltip.height();
		    var width = tooltip.width();
		    
		    if(color!=undefined) {
		    	var color1 = "rgba(" + $.colour(color, 0, true) + ", 0.6)";
		    	var color2 = "rgba(" + $.colour(color, -0.3, true) + ", 1)";
		    	var border = "rgba(" + $.colour(color, -0.38, true) + ", 1)";
		    	var glow = "rgba(" + $.colour(color, 0.38, true) + ", 0.6)";
		    	
		    	tooltip.css({
		    		"background-color" 	: 	color,
		    		"text-shadow" 	:	"0px 1px 0px " + color2,
		    		"border-color"	:	border,
		    		"box-shadow"	:	"0px 0px 12px " + glow
		    	});
		    	
		    	tooltip.css("background", "-webkit-linear-gradient(" + color1 + ", " + color2 + ")");
		    	tooltip.css("background", "-moz-linear-gradient(" + color1 + ", " + color2 + ")");
		    	
		    	$(".tooltip .arrow").css("border-top-color", color2)
		    	
		    }
		    
		    tooltip.css("left", x - 38).css("top", y - height - 44).css("visibility", "visible");
		}
		
	}
})(jQuery);

// Checkbox replacement

(function($){
	$.fn.checkbox = function() {
		var self = $(this).clone().wrapAll("<div/>").parent().html();
		var checkbox = $("<span />").addClass("checkbox");
		var label = $("<label />").append(self).append('<span class="on">on</span><span class="toggle"></span><span class="off">off</span>'); 
		
		if($(this).attr('checked')) { 
			checkbox.addClass("checked");
		}
		
		if($(this).attr('class')) {
			checkbox.addClass( $(this).attr("class") );
		}
		
		if($(this).hasClass("rounded")) {
			checkbox.addClass("rounded");
		}
		
		label.appendTo(checkbox);
		$(this).replaceWith(checkbox);	
	}
})(jQuery);

// Orbit chart

(function($){
	$.fn.orbit = function(options) {
		var one, two, three, four;
		
		var defaults = { 
			one: { speed: undefined, color: undefined, tooltip: "Chart One" },
			animation: "flipInX",
			texture: true,
			two: { speed: undefined, color: undefined, tooltip: "Chart Two" },
			three: { speed: undefined, color: undefined, tooltip: "Chart Three" },
			four: { speed: undefined, color: undefined, tooltip: "Chart Four" }
		};  
		var obj = this;
		var options = $.extend(true, defaults, options); 

		var orbit = $('<ul class="orbit-chart" />');
		$.each(defaults, function(key, value) {
			if(key=="one" || key=="two" || key=="three"|| key=="four") {
				var circle = $("<li />");
				circle.addClass(key);
				if(value["color"]!=undefined) {
					circle.css("background-color", value["color"]);
				}
				circle.append('<span><a href="#"></a></span>');
				
				if(value["speed"]!=undefined) {
					circle.children("span").css(
						{
							"-webkit-animation-duration": value["speed"] + "s",
							"-moz-animation-duration":  value["speed"] + "s"	
						}
					);
				}
				
				if(value["tooltip"]!=undefined) {
					circle.tooltip({content: value["tooltip"]});
				}
				
				circle.appendTo(orbit);
			}
		});
		
		if(defaults.animation!=undefined) {
			orbit.addClass("animated " + defaults.animation);
		}
		
		if(defaults.texture==false) {
			orbit.addClass("notexture");
		}
		
		this.append(orbit);	
	}
	
})(jQuery);
$.editor = function(url, textarea, preview, text) {
	if(url!=undefined  || text!=undefined) {
		if(textarea==undefined) {
			$.notification( 
				{
					title: "Not enough parameters were provided",
					content: "Please check the documentation for the editor.",
					error: true
				}
			);
			return false;
		}
		
		var textareaCon = $('<textarea />');
		var previewCon = $('<div class="preview">');
		
		$(textarea).html('');
		$(preview).html('');
		
		textareaCon.appendTo($(textarea));
		textarea = textareaCon;
		
		previewCon.appendTo($(preview));
		preview = previewCon;
		
		if(url!=undefined) {
			$.get(url, function(data){
				textarea.val(data);
			}).error(
					function(xhr, status, error) { 
						$.notification( 
							{
								title: "An AJAX error occured (" + error + ")",
								content: "Couldn't load the specified text file",
								error: true
							}
						);
					}
				);
		} else {
			textarea.val(text);
		}
		
		
		textarea.wysiwym(Wysiwym.Markdown, {helpEnabled: false});
		
		if(preview!=undefined) {
			var showdown = new Showdown.converter();
			var prev_text = "";
			var update_live_preview = function() {
			    var input_text = textarea.val();
			    if (input_text != prev_text) {
			        var text = $(showdown.makeHtml(input_text));
			        text.find('pre').addClass('prettyprint linenums');
			        text.find('p code').addClass('prettyprint');
			        text.find('code').each(function() {
			            $(this).html(prettyPrintOne($(this).html()));
			        });
		
		
			        preview.html(text);
			        prev_text = input_text;
			    }
			    
			    if(input_text == '') {
			    	preview.hide();
			    } else {
			    	preview.show();
			    }
			}
			clearInterval(update_live_preview);
			setInterval(update_live_preview, 200);
		}
	} else {
		$.notification( 
			{
				title: "Not enough parameters were provided",
				content: "Please check the documentation for the editor.",
				error: true
			}
		);
		return false;
	}
};