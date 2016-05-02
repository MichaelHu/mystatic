// Just use it everywhere. Don't care where it is. 
window.fly = window.fly 
    || (function(){

    // @require jQuery

    function random(min, max){
        return min + Math.random() * ( max - min );
    }

    function randomData(min, max, size) {
        var data = [];
        for ( var i=0; i<size; i++ ) {
            data.push(random(min, max));
        }
        return data;
    }

    function randomColor(){

        function pad(v){
            if(v.length < 2) {
                v = '0' + v;
            }
            return v;
        }

        return '#'
            + pad( ( randomData(0, 255, 1)[0] | 0 ).toString(16) )
            + pad( ( randomData(0, 255, 1)[0] | 0 ).toString(16) )
            + pad( ( randomData(0, 255, 1)[0] | 0 ).toString(16) )
            ;
    }

    var Display = {

        show: function($cont, $console){
            return function(){
                var arr = [], arg, txt;
                if(arguments.length){
                    for(var i=0; i<arguments.length; i++){
                        arg = arguments[i];; 
                        if('function' == typeof arg) arg = arg.toString();
                        arr.push(JSON.stringify(arg));
                    } 
                    txt = arr.join(' | ')
                            .replace(/</g, '&lt;')
                            ;
                }
                else {
                    txt = $cont.html()
                        .replace(/</g, '&lt;')
                        ;
                }

                $console.html(txt)
            };
        }

        , append_show: function($cont, $console){
            return function(content){
                var arr = [], txt;
                if(arguments.length){
                    for(var i=0; i<arguments.length; i++){
                        arg = arguments[i];; 
                        if('function' == typeof arg) arg = arg.toString();
                        arr.push(JSON.stringify(arg));
                    } 
                    txt = arr.join(' | ')
                            .replace(/</g, '&lt;')
                            ;
                }
                else {
                    txt = $cont.html()
                        .replace(/</g, '&lt;')
                        ;
                }

                $console.html(
                    $console.html() 
                    + '<br>'
                    + txt 
                ); 
            };
        }

    };

    function createShow(wrapper) {

        var $wrapper = $(wrapper); 

        var $cont = $wrapper.find('.test-container')
            , $console = $wrapper.find('.test-console');

        var show = Display.show($cont, $console);
        var append_show = Display.append_show($cont, $console);

        return {
            show: show
            , append_show: append_show
        };
    }




    $(function(){

        $('pre').each(function(index, item){
            var $pre = $(item)
                , str = $pre.data('script')
                ;

            exec(str);
            checkEditable(str);

            function execScript(){
                $(
                    '<' + 'script>'
                    + $pre.text()
                    + '</' + 'script>'
                )
                .insertBefore($pre)
                ;
            }

            function execHTML(){
                var $insertBefore = $pre;
                if($pre.prev('button').length){
                    $insertBefore = $pre.prev('button'); 
                }

                $insertBefore
                    .prev('.mp-exec-html')
                    .remove()
                    ;

                $(
                    '<div class="mp-exec-html">'
                    + $pre.text()
                    + '</div>'
                )
                .insertBefore($insertBefore)
                ;
            }

            function exec(script) {
                if(script && script.indexOf('javascript') >= 0){
                    execScript();
                }
                else if(script && script.indexOf('html') >= 0){
                    execHTML();
                }
            }

            function checkEditable(script){
                if(script && script.indexOf('editable') >= 0){
                    $pre.find('code')
                        .attr('contenteditable', "true")
                        ;

                    $('<button style="margin-bottom:5px;">Restart</button>')
                        .insertBefore($pre)
                        .on('click', function(){
                            exec(script);
                        })
                        ;
                }
            }

        });

    });


    return {
        random: random
        , randomData: randomData
        , randomColor: randomColor
        , createShow: createShow
    };


})();