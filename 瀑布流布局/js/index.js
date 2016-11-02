

    //思路：
        //首先吧图片按照瀑布流的方式排列
        //其次就是当图片不够的时候添加图片数量

    //用到的技术
        //Math.floor()                                求一个最接近它的整数，它的值小于或等于这个浮点数
        //Math.min.apply(null,Arr);                   取得数组中最小的值
        //$.inArray( value, array [, fromIndex ])     在数组中查找指定值并返回它的索引（如果没有找到，则返回-1）。
        //$(window).resize(）                         当窗口变化时执行
        //$(window).trigger()                         模拟操作

$(window).ready(function () {

    //然图片城瀑布流的方式排列
    function waterfall(){
        var $boxs=$('#main>div');

        var w=$boxs.eq(0).outerWidth();                 //获取box的宽度

        var cols=Math.floor($(window).width()/w);       //计算这个窗口能放下几列图片

        $('#main').width(w*cols).css({                  //让main盒子居中显示
            margin:'0 auto'
        });

        var hArr=[];                                    //用来存放每一列高度的数组

        $boxs.each(function (index,value) {
            var h=$boxs.eq(index).outerHeight();         //获取每个box的高度

            if(index<cols)  {                           //吧第一列图片的高度存放在数组里
              hArr[index]=h;
            }else{
                var minH=Math.min.apply(null,hArr);     //取得数组中最小的值

                var minHIndex=$.inArray(minH,hArr);     //取得最小值在数组中的索引
                $(value).css({                          //把第二列开始出现的每一张图片，依次放在hArr中最小的高度下面
                    position:'absolute',
                    top:minH+'px',
                    left:minHIndex*w+'px'
                });
                hArr[minHIndex]+=$boxs.eq(index).outerHeight();     //让数组在最小值下面家了图片后，在数组相应位置加上那张图片的高度
            }
        })
    }
    waterfall();

    //如果图片到地了，就创建心的图片来添加到#main里
    function addPic(){
        $(window).on('scroll', function () {
            //定义一个数据库，用来作为要添加的图片
            var dataInt={
                "data":[{"src":"10.jpg"},{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},
                    {"src":"1.jpg"},{"src":"11.jpg"},{"src":"2.jpg"},{"src":"2.jpg"},{"src":"6.jpg"},
                    {"src":"10.jpg"},{"src":"15.jpg"},{"src":"2.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},
                    {"src":"2.jpg"},{"src":"9.jpg"},{"src":"12.jpg"},{"src":"13.jpg"},{"src":"14.jpg"}]
            };

            if(checkScrollSlide){
                $.each(dataInt.data, function (key,value) {
                    var oBox=$('<div>').addClass('box').appendTo($('#main'));                   //创建一个含有.box的div
                    var oPic=$('<div>').addClass('pic').appendTo($(oBox));                      //创建一个含有pic的div
                    var oImg=$('<img>').attr('src','img/'+value.src).appendTo($(oPic));         //创建图片
                });
                waterfall();
            }
        });
    }
    addPic();

    //根据最后一个div距离top的高度，和滚动条高度+屏幕高度相比较，如果大于，就是看不见，就不用执行。
    function checkScrollSlide(){
        var $lastBox=$('#main>div').last();         //获取最后一个box
        var lastBoxDis=$lastBox.offset().top;  //最后一个div的中间距离顶部的高度
        var scrollTop=$(window).scrollTop();        //  滚动条距离顶部的高度
        var documentH=$(window).height();           //屏幕的高度
        return (lastBoxDis>scrollTop+documentH)? false: true;
    }

    //当浏览器窗口变化是执行，让效果能够及时的显示
    $(window).resize(function () {
        $(window).trigger('scroll')
    });
});

