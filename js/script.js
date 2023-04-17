var vm = avalon.define({
    $id: 'yiran',
    show_image_url: '',
    large_image_name: '',
    large_image_desc: '',
    load_image: false,
    group_list: [],
    imageLayout: function () {
        groups = [];
        image_json.forEach(function (img_item) {
            img_item['flex'] = img_item.small_width * 200 / img_item.small_height;
            img_item['show_desc'] = false;
            if(img_item['group'] in groups) {
                groups[img_item['group']].push(img_item);
            }
            else {
                groups[img_item['group']] = [];
            }
        });
        group_json.forEach(function (item) {
            item['pictures'] = groups[item['group_id']];
            vm.group_list.push(item);
        });
    },

    show_large_image: function (img) {
        console.log($(window).width());
        if ($(window).width() > 720) {
            vm.show_image_url = "";

            var win_height = $(window).scrollTop() - $(window).height();
            vm.show_image_url = img.large;
            vm.large_image_desc = img.desc;
            vm.large_image_name = img.name;
            var pic = $('#large_picture');
            console.log("win:", win_height);
            pic.fadeIn({
                duration: 500
            });
            vm.load_image = true;
            if (img.small_height > img.small_width) {
                pic.css('top', win_height + 'px');
            } else {
                pic.css('top', win_height + 50 + 'px');
            }
            var img_dom = $('#large_image');
            vm.load_image = false;
            if (img.small_height > img.small_width) {
                img_dom.css('margin-left',  $(window).width() * 0.45 - img.large_width * 0.2 + 'px');
                img_dom.animate({height: img.large_height * 0.4 + 'px'});
                img_dom.animate({width: img.large_width * 0.4 + 'px'});
                // img_dom.css('height', img.large_height * 0.4 + 'px');
                // img_dom.css('width', img.large_width * 0.4 + 'px');
            } else {
                img_dom.css('margin-left',  $(window).width() * 0.45 - img.large_width * 0.2 + 'px');
                img_dom.animate({height: img.large_height * 0.4 + 'px'});
                img_dom.animate({width: img.large_width * 0.4 + 'px'});
                // img_dom.css('height', img.large_height * 0.4 + 'px');
                // img_dom.css('width', img.large_width * 0.4 + 'px');
            }
        }
    },

    select_image: function (img) {
        img.small_height += 2;
        img['flex'] = img.small_width * 200 / img.small_height;
    },

    cancel_select: function (img) {
        img.small_height -= 2;
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
    $('#large_picture').fadeOut({
        duration: 10
    });
    
    change_music();
    setInterval(function () {
        change_music();
    }, 300000)

    change_background();
    setInterval(function () {
        change_background();
    }, 20000);

    get_days()
    setInterval(function () {
        get_days();
    }, 1000);

    vm.imageLayout();

    $(document).dblclick(function () {
        var pic = $('#large_picture');
        pic.fadeOut({
            duration: 500
        })
    });
    document.getElementById('large_image').onload = function (e) {
        vm.load_image = false;
    }

});


function hide_image() {
    var pic = $('#large_picture');
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

function change_background() {
    var attr = "url('pictures/back/" + randomNum(1, 6) + ".jpg')";
    $('.banner').css("background-image", attr);
}

function change_music() {
    var music_src = "music/" + randomNum(1, 3) + ".mp3";
    console.log(music_src)
    var audio = document.getElementsByTagName('audio')[0];
    audio.src = music_src;
}

function randomNum(minNum, maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random() * minNum + 1, 10); 
        break; 
        case 2: 
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10); 
        break; 
        default: 
            return 0; 
        break; 
    } 
} 



