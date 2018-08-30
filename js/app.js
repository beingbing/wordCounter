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

    // readability level using readability-metrics API from Mashape
    readability.addEventListener('click', function () {

        // placeholder until the API returns the score  
        readability.innerHTML = "Fetching score...";

        var requestUrl = "https://ipeirotis-readability-metrics.p.mashape.com/getReadabilityMetrics?text=";
        var data = value;

        var request = new XMLHttpRequest();
        request.open('POST', encodeURI(requestUrl + data), true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.setRequestHeader("X-Mashape-Authorization", "PQ4FOFuaR6mshI6qpnQKQvkDZQXjp1o6Zcqjsnug7GvNggTzUE");
        request.send();

        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                // Success!
                readability.innerHTML = readingEase(JSON.parse(this.response).FLESCH_READING);
            } else {
                // We reached our target server, but it returned an error
                readability.innerHTML = "Not available.";
            }
        };

        request.onerror = function () {
            // There was a connection error of some sort
            readability.innerHTML = "Not available.";
        };
    });

    // function to convert FLESCH READING SCORE into meaningful string.
    function readingEase(num) {
        switch (true) {
            case (num <= 30):
                return "Readability: College graduate.";
                break;
            case (num > 30 && num <= 50):
                return "Readability: College level.";
                break;
            case (num > 50 && num <= 60):
                return "Readability: 10th - 12th grade.";
                break;
            case (num > 60 && num <= 70):
                return "Readability: 8th - 9th grade.";
                break;
            case (num > 70 && num <= 80):
                return "Readability: 7th grade.";
                break;
            case (num > 80 && num <= 90):
                return "Readability: 6th grade.";
                break;
            case (num > 90 && num <= 100):
                return "Readability: 5th grade.";
                break;
            default:
                return "Not available.";
                break;
        }
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