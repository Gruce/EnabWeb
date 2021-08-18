$(function() {
    
    var __dx;
    var __dy;
    var __scale=0.5;
    var __recoupLeft, __recoupTop;
    
    $(".draggable").draggable({
        //revert: true,
        cursor: "move",
        zIndex: 9999,
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


        
    // $(document).bind("contextmenu", function (event) {
    //     event.preventDefault();
    //     $(".custom-menu").finish().toggle(100).
    //     css({
    //         top: event.pageY + "px",
    //         left: event.pageX + "px"
    //     });
    // });


    // $(document).bind("mousedown", function (e) {
    //     if (!$(e.target).parents(".custom-menu").length > 0) {
    //         $(".custom-menu").hide(100);
    //     }
    // });

    $(".custom-menu li").click(function(){
        switch($(this).attr("data-action")) {
            case "search": 
                if ($('.search').length)
                    $('.search').slideToggle();
                else
                    alert('لايمكن البحث في هذه الصفحة.')
            break;
            case "copy": document.execCommand('copy'); break;
            case "paste": document.execCommand('paste');; break;
        }
        $(".custom-menu").hide(100);
    });
    
})



function clock() {
    var hours = $(".hours");
    var minutes = $(".minutes");
    var seconds = $(".seconds");
    var phase = $(".phase");

    var h = new Date().getHours();
    var m = new Date().getMinutes();
    var s = new Date().getSeconds();
    var am = "ص";

    if (h > 12) {
        h = h - 12;
        var am = "م";
    }

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    hours.html(h);
    minutes.html(m);
    if(seconds)
        seconds.html(s);
    phase.html(am);
}

var interval = setInterval(clock, 1000);



function printDiv(id){
    var divToPrint=document.getElementById(id);
    var newWin=window.open('','Print-Window');
    newWin.document.open();
    var head = $('head').html();
    newWin.document.write('<html>'+head+'<body onload="window.print()">'+divToPrint.innerHTML+'</body></html>');
    newWin.document.close();
    setTimeout(function(){newWin.close();},10);
}

function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}


