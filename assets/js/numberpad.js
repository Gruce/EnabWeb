$(function() {

    $(".numberpad").draggable({
        cursor: "move",
        zIndex: 100,
        drag: function (event, ui) {
            //resize bug fix ui drag `enter code here`
            __dx = ui.position.left - ui.originalPosition.left;
            __dy = ui.position.top - ui.originalPosition.top;
            //ui.position.left = ui.originalPosition.left + ( __dx/__scale);
            //ui.position.top = ui.originalPosition.top + ( __dy/__scale );
            ui.position.left = ui.originalPosition.left + (__dx);
            ui.position.top = ui.originalPosition.top + (__dy);
            //
            ui.position.left += __recoupLeft;
            ui.position.top += __recoupTop;
        },
        start: function (event, ui) {
            $(this).css('cursor', 'pointer');
            //resize bug fix ui drag
            var left = parseInt($(this).css('left'), 10);
            left = isNaN(left) ? 0 : left;
            var top = parseInt($(this).css('top'), 10);
            top = isNaN(top) ? 0 : top;
            __recoupLeft = left - ui.position.left;
            __recoupTop = top - ui.position.top;
        },
    });


    var input;
    var total_price;
    $("[data-numberpad='true']").click( function(e) {
        if ($(this).find("button").length > 0 && !$(this).find("button").is(":disabled")){
            let suggestion = [1000, 5000, 10000, 25000];
            input = $(this).find('input[type=hidden]');
            if (input.val().length === 0)
                input.val(0)
            $('.numberpad .number').text(addCommas(input.val()))
            Livewire.emit('cashUpdate', input.val());
    
            //SUGGEST Price
            if (!($("[data-numberpad='true']").data('suggestion').length === 0)){
                total_price = $('.' + $("[data-numberpad='true']").data('suggestion'));
                total_price = total_price.text().replace(/[^\d\.\-]/g, "");
                total_price = parseFloat(total_price);
    
                $('.numberpad .suggestions').text('');
    
                $('.numberpad .suggestions').append('<div class="col-6 p-1"><a href="#" class="btn btn-outline-white p-1 fs-5 w-100">'+addCommas(Math.ceil(total_price / 5000) * 5000)+'</a></div>')
                $('.numberpad .suggestions').append('<div class="col-6 p-1"><a href="#" class="btn btn-outline-white p-1 fs-5 w-100">'+addCommas(total_price)+'</a></div>')
                
                $.each(suggestion, function( i, v ) {
                    $('.numberpad .suggestions').append('<div class="col-3 p-1"><a href="#" class="btn btn-outline-default p-1 fs-6">'+addCommas(v)+'</a></div>')
                });
            }
    
    
            $(".numberpad").show();
    
            $(".numberpad").position({
                my:        "right ",
                at:        "left",
                of:        this,
                collision: "flip"
            });
        }
    });

    $('.numberpad button').click( function(e) {
        var maxLength = (input.attr("maxLength") == undefined ? 12 : input.attr("maxLength"))
        if (input.val().length <= maxLength){
            var button_value = $(this).text().trim();
            var new_value = input.val() + button_value;
            
            input.val(parseInt(new_value));
            $('.numberpad .number').text(addCommas(input.val()))
            if (!($("[data-numberpad='true']").data('suggestion').length === 0))
                $('.numberpad-left').text(addCommas(input.val() - total_price));

            Livewire.emit('cashUpdate', input.val());
        }
    });


    $(document).on( "click", ".numberpad a", function(e) {
        e.preventDefault();
        if ($(this).hasClass("backspace")){
            var str = $(input).val();
            if (str.length <= 1)
                $(input).val(0)
            else
                $(input).val(str.substring(0, str.length - 1));
            $('.numberpad .number').text(addCommas(input.val()))
            if (!($("[data-numberpad='true']").data('suggestion').length === 0))
                $('.numberpad-left').text(addCommas(input.val() - total_price));
        } else {
            var a_value = parseFloat($(this).text().replace(/[^\d\.\-]/g, ""));
            input.val(a_value);
            $('.numberpad .number').text(addCommas(input.val()))
            if (!($("[data-numberpad='true']").data('suggestion').length === 0))
                $('.numberpad-left').text(addCommas(input.val() - total_price));
        }
        Livewire.emit('cashUpdate', input.val());
    });

    $(document).mouseup(function(e) {
        if (!$(".numberpad").hasClass('ui-draggable-dragging')) {
            var container = $(".numberpad");
            if (!container.is(e.target) && container.has(e.target).length === 0) 
                container.hide();
        }
    });



    

});