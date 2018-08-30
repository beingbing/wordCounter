counter = function () {
    var value = $('#text').val();

    if (value.length == 0) {
        $('#wordCount').html(0);
        $('#totalChars').html(0);
        $('#charCount').html(0);
        $('#charCountNoSpace').html(0);
        return;
    }

    let facebook = 250;
    let twitter = 280;
    let google = 300;
    var regex = /\s+/gi;
    var wordCount = value.trim().replace(regex, ' ').split(' ').length;
    var totalChars = value.length;
    var charCount = value.trim().length;
    var charCountNoSpace = value.replace(regex, '').length;
    var noOfParas = value.replace(/\n$/gm, '').split(/\n/).length;
    var total_sentences = value.trim().split(/[\.\?\!]\s/).length;

    if (totalChars > 360) {
        $('#showSocial').toggle(false);
    } else {
        $('#showSocial').toggle(true);
    }

    if (wordCount) {
        var seconds = Math.floor(wordCount * 60 / 275);
        var time = seconds;
        // need to convert seconds to minutes and hours
        if (seconds > 59) {
            var minutes = Math.floor(seconds / 60);
            seconds = seconds - minutes * 60;
            time = minutes + "m " + seconds + "s";
            $('#readingTime').html(time);

        } else {
            time = seconds + "s";
            $('#readingTime').html(time);
        }
    } else {
        var time = "0s";
        $('#readingTime').html(time);
    }

    $('#wordCount').html(wordCount);
    $('#totalChars').html(totalChars);
    $('#facebook').html(facebook - totalChars);
    $('#twitter').html(twitter - totalChars);
    $('#google').html(google - totalChars);
    $('#charCount').html(charCount);
    $('#charCountNoSpace').html(charCountNoSpace);
    $('#noOfParas').html(noOfParas);
    $('#total_sentences').html(total_sentences);
};

$(document).ready(function () {
    $('#count').click(counter);
    $('#text').change(counter);
    $('#text').keydown(counter);
    $('#text').keypress(counter);
    $('#text').keyup(counter);
    $('#text').blur(counter);
    $('#text').focus(counter);
});