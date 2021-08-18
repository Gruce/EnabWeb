$( document ).ready(function() {
    
    var collected_code = '';
    window.addEventListener("keydown", function (e) {
        // if not input
        var isInput = $(e.target).closest("input")[0];
        if (!isInput) {
            if(e.which !== 13){
                collected_code = collected_code + String.fromCharCode(e.keyCode);
            }

            if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) { 
                e.preventDefault();
                if ($(".search").length > 0){
                    if( !$(e.target).is(".prevent-search") ){
                        if ($('.search').is(":visible"))
                            $('.search').hide();
                        else{
                            $('.search').show();
                            $('.search').find('input').focus();
                        }
                    }
                }
            }
        }

        if (e.ctrlKey && e.keyCode === 81) { 
            e.preventDefault();
            if ($('.quickmenu-dropdown').is(":visible"))
                $('.quickmenu-dropdown').slideUp();
            else
                $('.quickmenu-dropdown').slideDown();

        }

        if(e.which == 13 || e.which == 27){
            e.preventDefault();
            $('.search').hide();
            $('.quickmenu-dropdown').slideUp();
            collected_code = collected_code.replace(/[^a-z0-9]/gi,'')
            if (collected_code.length > 3 && !isInput){
                // IF SCANNED ORDER NUMBER
                if (~collected_code.indexOf("s-o-"))
                    Livewire.emit('order_number', collected_code.replace('s-o-',''));
                else
                    Livewire.emit('barcode', collected_code);
            }
            collected_code = '';
        }
    })

    $('.hideSearch').click( function(e) {
        $('.search').hide();
        $('.search').find('input').val('');
    });

    jQuery('button').click( function(e) {
        jQuery('.collapse').collapse('hide');
    });

    document.addEventListener('swiped-down', function(e) {
        swipe_down();
    });

    document.addEventListener('swiped-up', function(e) {
        swipe_up();
    });

    document.addEventListener('swiped-right', function(e) {
        swipe_right();
    });

    document.addEventListener('swiped-left', function(e) {
        swipe_left();
    });
});

function swipe_down(){
    // if ($('.quickmenu-dropdown').is(":visible")){
    //     $('.quickmenu-dropdown').slideUp();
    // }
    // else {
        $('.search').slideDown();
        $('.search').find('input').focus();
    // }
    
}

function swipe_up(){
    // if ($('.search').is(":visible"))
        $('.search').slideUp();
    // else
        // $('.quickmenu-dropdown').slideDown();
}

function swipe_toggle(){
    $('.quickmenu-dropdown').slideToggle();
}

function swipe_right(){

}

function swipe_left(){

}