var vm = avalon.define({
    $id: 'yiran',
    img_list: [],
    img_1_list: [],
    img_2_list: [],
    img_3_list: [],
    show_image_url: '',
    middle_image_name: '',
    middle_image_desc: '',
    load_image: false,
    imageLayout: function () {
        image_json.forEach(function (item) {
            console.log(item);
            item['flex'] = item.small_width * 200 / item.small_height;
            item['show_desc'] = false;
            if (item.type === "00000000") {
                vm.img_1_list.push(item);
            } else if (item.type === '20230101') {
                vm.img_2_list.push(item);
            } else if (item.type === '20221031') {
                vm.img_3_list.push(item);
            }
        })
    },

    show_middle_image: function (img) {
        console.log($(window).width());
        if ($(window).width() > 720) {
            vm.show_image_url = "";

            var win_height = $(window).scrollTop() - $(window).height();
            vm.show_image_url = img.middle;
            vm.middle_image_desc = img.desc;
            vm.middle_image_name = img.name;
            var pic = $('#middle_picture');
            console.log("win:", win_height);
            pic.fadeIn({
                duration: 500
            });
            vm.load_image = true;
            pic.css('top', win_height + 50 + 'px');
            var img_dom = $('#middle_image');
            vm.load_image = false;
            if (img.small_height > img.small_width) {
                img_dom.css('margin-left',  $(window).width() * 0.45 - img.middle_width * 0.2 + 'px');
                // img_dom.animate({height: img.middle_height * 0.4 + 'px'});
                // img_dom.animate({width: img.middle_width * 0.4 + 'px'});
                img_dom.css('height', img.middle_height * 0.4 + 'px');
                img_dom.css('width', img.middle_width * 0.4 + 'px');
            } else {
                img_dom.css('margin-left',  $(window).width() * 0.45 - img.middle_width * 0.2 + 'px');
                // img_dom.animate({height: img.middle_height * 0.4 + 'px'});
                // img_dom.animate({width: img.middle_width * 0.4 + 'px'});
                img_dom.css('height', img.middle_height * 0.4 + 'px');
                img_dom.css('width', img.middle_width * 0.4 + 'px');
            }
        }
    },

    select_image: function (img) {
        img.small_height += 10;
        img['flex'] = img.small_width * 200 / img.small_height;
    },

    cancel_select: function (img) {
        img.small_height -= 10;
        img['flex'] = img.small_width * 200 / img.small_height;
    },

    show_photo_desc: function (img) {
        img.show_desc = true;
        $('.photo_desc').css("margin-top", '0px');
        $('.photo_desc').animate({marginTop: '-50px'});
    },

    hide_photo_desc: function (img) {
        img.show_desc = false;
        $('.photo_desc').css("margin-top", '0px');
    }

});

$(document).ready(function () {
    $('#middle_picture').fadeOut({
        duration: 10
    });
    var index = 1;
    setInterval(function () {
        var attr = "url('pictures/back/" + index + ".jpg')";
        // var attr = "url('http://www.xiaomaidong.com/fuyuko/images/back_" + index + ".png')";
        console.log(attr);
        $('.banner').css("background-image", attr);
        index += 1;
        if (index > 6) {
            index = 1;
        }
    }, 20000);
    get_days()
    setInterval(function () {
        get_days();
    }, 1000);

    vm.imageLayout();

    $(document).dblclick(function () {
        var pic = $('#middle_picture');
        pic.fadeOut({
            duration: 500
        })
    });
    document.getElementById('middle_image').onload = function (e) {
        vm.load_image = false;
    }

});


function hide_image() {
    var pic = $('#middle_picture');
    pic.fadeOut({
        duration: 500
    })
}

function get_days() {
    var begin = new Date("October 30,2022 17:07:37"); // 17:07:37
    var s2 = new Date();
    var delta_time_s = (s2.getTime() - begin.getTime()) / 1000;
    var days = parseInt(delta_time_s / (60 * 60 * 24));
    var days_s = delta_time_s - days * (60 * 60 * 24);
    var hour = parseInt(days_s / 3600);
    var min = parseInt((days_s - hour * 3600) / 60);
    var sec = parseInt(days_s - hour * 3600 - min * 60);
    $('#count_day').html(days + ' days ' + hour + 'h ' + min + 'm ' + sec + 's')
}





