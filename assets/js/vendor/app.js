counter = function () {
    var value = $('#text').val();

    if (value.length == 0) {
        $('#wordCount').html(0);
        $('#totalChars').html(0);
        $('#charCount').html(0);
        $('#charCountNoSpace').html(0);
        $('#sms').html(0);
        return;
    }

    let facebook = 250;
    let twitter = 280;
    let google = 300;
    let sms = 250;
    var regex = /\s+/gi;
    var wordCount = value.trim().replace(regex, ' ').split(' ').length;
    var totalChars = value.length;
    var charCount = value.trim().length;
    var charCountNoSpace = value.replace(regex, '').length;
    var noOfParas = value.replace(/\n$/gm, '').split(/\n/).length;
    var total_sentences = value.trim().split(/[\.\?\!]\s/).length;
    // var keywordsDiv = document.querySelectorAll('.keywords')[0];
    // var topKeywords = document.querySelector('#topKeywords');

    // if (totalChars > 360) {
    //     $('#showSocial').toggle(false);
    // } else {
    //     $('#showSocial').toggle(true);
    // }

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

    // finding out top keywords and their count
    // step-1: remove all the stop words
    // step-2: form an object with keywords and their count
    // step-3: sort the object by first converting it to a 2D array
    // step-4: display top 4 keywords and their count

    // if (value) {

    //     // step-1: removing all the stop words
    //     var nonStopWords = [];
    //     var stopWords = ["a", "able", "about", "above", "abst", "accordance", "according", "accordingly", "across", "act", "actually", "added", "adj", "affected", "affecting", "affects", "after", "afterwards", "again", "against", "ah", "all", "almost", "alone", "along", "already", "also", "although", "always", "am", "among", "amongst", "an", "and", "announce", "another", "any", "anybody", "anyhow", "anymore", "anyone", "anything", "anyway", "anyways", "anywhere", "apparently", "approximately", "are", "aren", "arent", "arise", "around", "as", "aside", "ask", "asking", "at", "auth", "available", "away", "awfully", "b", "back", "be", "became", "because", "become", "becomes", "becoming", "been", "before", "beforehand", "begin", "beginning", "beginnings", "begins", "behind", "being", "believe", "below", "beside", "besides", "between", "beyond", "biol", "both", "brief", "briefly", "but", "by", "c", "ca", "came", "can", "cannot", "can't", "cause", "causes", "certain", "certainly", "co", "com", "come", "comes", "contain", "containing", "contains", "could", "couldnt", "d", "date", "did", "didn't", "different", "do", "does", "doesn't", "doing", "done", "don't", "down", "downwards", "due", "during", "e", "each", "ed", "edu", "effect", "eg", "eight", "eighty", "either", "else", "elsewhere", "end", "ending", "enough", "especially", "et", "et-al", "etc", "even", "ever", "every", "everybody", "everyone", "everything", "everywhere", "ex", "except", "f", "far", "few", "ff", "fifth", "first", "five", "fix", "followed", "following", "follows", "for", "former", "formerly", "forth", "found", "four", "from", "further", "furthermore", "g", "gave", "get", "gets", "getting", "give", "given", "gives", "giving", "go", "goes", "gone", "got", "gotten", "h", "had", "happens", "hardly", "has", "hasn't", "have", "haven't", "having", "he", "hed", "hence", "her", "here", "hereafter", "hereby", "herein", "heres", "hereupon", "hers", "herself", "hes", "hi", "hid", "him", "himself", "his", "hither", "home", "how", "howbeit", "however", "hundred", "i", "id", "ie", "if", "i'll", "im", "immediate", "immediately", "importance", "important", "in", "inc", "indeed", "index", "information", "instead", "into", "invention", "inward", "is", "isn't", "it", "itd", "it'll", "its", "itself", "i've", "j", "just", "k", "keep", "keeps", "kept", "kg", "km", "know", "known", "knows", "l", "largely", "last", "lately", "later", "latter", "latterly", "least", "less", "lest", "let", "lets", "like", "liked", "likely", "line", "little", "'ll", "look", "looking", "looks", "ltd", "m", "made", "mainly", "make", "makes", "many", "may", "maybe", "me", "mean", "means", "meantime", "meanwhile", "merely", "mg", "might", "million", "miss", "ml", "more", "moreover", "most", "mostly", "mr", "mrs", "much", "mug", "must", "my", "myself", "n", "na", "name", "namely", "nay", "nd", "near", "nearly", "necessarily", "necessary", "need", "needs", "neither", "never", "nevertheless", "new", "next", "nine", "ninety", "no", "nobody", "non", "none", "nonetheless", "noone", "nor", "normally", "nos", "not", "noted", "nothing", "now", "nowhere", "o", "obtain", "obtained", "obviously", "of", "off", "often", "oh", "ok", "okay", "old", "omitted", "on", "once", "one", "ones", "only", "onto", "or", "ord", "other", "others", "otherwise", "ought", "our", "ours", "ourselves", "out", "outside", "over", "overall", "owing", "own", "p", "page", "pages", "part", "particular", "particularly", "past", "per", "perhaps", "placed", "please", "plus", "poorly", "possible", "possibly", "potentially", "pp", "predominantly", "present", "previously", "primarily", "probably", "promptly", "proud", "provides", "put", "q", "que", "quickly", "quite", "qv", "r", "ran", "rather", "rd", "re", "readily", "really", "recent", "recently", "ref", "refs", "regarding", "regardless", "regards", "related", "relatively", "research", "respectively", "resulted", "resulting", "results", "right", "run", "s", "said", "same", "saw", "say", "saying", "says", "sec", "section", "see", "seeing", "seem", "seemed", "seeming", "seems", "seen", "self", "selves", "sent", "seven", "several", "shall", "she", "shed", "she'll", "shes", "should", "shouldn't", "show", "showed", "shown", "showns", "shows", "significant", "significantly", "similar", "similarly", "since", "six", "slightly", "so", "some", "somebody", "somehow", "someone", "somethan", "something", "sometime", "sometimes", "somewhat", "somewhere", "soon", "sorry", "specifically", "specified", "specify", "specifying", "still", "stop", "strongly", "sub", "substantially", "successfully", "such", "sufficiently", "suggest", "sup", "sure", "t", "take", "taken", "taking", "tell", "tends", "th", "than", "thank", "thanks", "thanx", "that", "that'll", "thats", "that've", "the", "their", "theirs", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "thered", "therefore", "therein", "there'll", "thereof", "therere", "theres", "thereto", "thereupon", "there've", "these", "they", "theyd", "they'll", "theyre", "they've", "think", "this", "those", "thou", "though", "thoughh", "thousand", "throug", "through", "throughout", "thru", "thus", "til", "tip", "to", "together", "too", "took", "toward", "towards", "tried", "tries", "truly", "try", "trying", "ts", "twice", "two", "u", "un", "under", "unfortunately", "unless", "unlike", "unlikely", "until", "unto", "up", "upon", "ups", "us", "use", "used", "useful", "usefully", "usefulness", "uses", "using", "usually", "v", "value", "various", "'ve", "very", "via", "viz", "vol", "vols", "vs", "w", "want", "wants", "was", "wasn't", "way", "we", "wed", "welcome", "we'll", "went", "were", "weren't", "we've", "what", "whatever", "what'll", "whats", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "wheres", "whereupon", "wherever", "whether", "which", "while", "whim", "whither", "who", "whod", "whoever", "whole", "who'll", "whom", "whomever", "whos", "whose", "why", "widely", "willing", "wish", "with", "within", "without", "won't", "words", "world", "would", "wouldn't", "www", "x", "y", "yes", "yet", "you", "youd", "you'll", "your", "youre", "yours", "yourself", "yourselves", "you've", "z", "zero"];
    //     for (var i = 0; i < value.length; i++) {
    //         // filtering out stop words and numbers
    //         if (stopWords.indexOf(value[i].toLowerCase()) === -1 && isNaN(value[i])) {
    //             nonStopWords.push(value[i].toLowerCase());
    //         }
    //     }
    //     // console.log(nonStopWords);

    //     // step-2: forming an object with keywords and their count
    //     var keywords = {};
    //     for (var i = 0; i < nonStopWords.length; i++) {
    //         // checking if the word(property) already exists
    //         // if it does increment the count otherwise set it to one
    //         if (nonStopWords[i] in keywords) {
    //             keywords[nonStopWords[i]] += 1;
    //         } else {
    //             keywords[nonStopWords[i]] = 1;
    //         }
    //     }

    //     // step-3: sorting the object by first converting it to a 2D array
    //     var sortedKeywords = [];
    //     for (var keyword in keywords) {
    //         sortedKeywords.push([keyword, keywords[keyword]])
    //     }
    //     sortedKeywords.sort(function (a, b) {
    //         return b[1] - a[1]
    //     });
    //     // console.log(sortedKeywords);

    //     // step-4: displaying top 4 keywords and their count
    //     topKeywords.innerHTML = "";
    //     for (var i = 0; i < sortedKeywords.length && i < 4; i++) {
    //         var li = document.createElement('li');
    //         li.innerHTML = "<b>" + sortedKeywords[i][0] + "</b>: " + sortedKeywords[i][1];
    //         topKeywords.appendChild(li);
    //     }
    // }

    // displaying top keywords only if there is a word in the text area
    // if (value) {
    //     keywordsDiv.style.display = "block";
    // } else {
    //     keywordsDiv.style.display = "none";
    // }

    // readability level using readability-metrics API from Mashape
    // readability.addEventListener('click', function () {

    //     // placeholder until the API returns the score  
    //     readability.innerHTML = "Fetching score...";

    //     var requestUrl = "https://ipeirotis-readability-metrics.p.mashape.com/getReadabilityMetrics?text=";
    //     var data = value;

    //     var request = new XMLHttpRequest();
    //     request.open('POST', encodeURI(requestUrl + data), true);
    //     request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    //     request.setRequestHeader("X-Mashape-Authorization", "PQ4FOFuaR6mshI6qpnQKQvkDZQXjp1o6Zcqjsnug7GvNggTzUE");
    //     request.send();

    //     request.onload = function () {
    //         if (this.status >= 200 && this.status < 400) {
    //             // Success!
    //             readability.innerHTML = readingEase(JSON.parse(this.response).FLESCH_READING);
    //         } else {
    //             // We reached our target server, but it returned an error
    //             readability.innerHTML = "Not available.";
    //         }
    //     };

    //     request.onerror = function () {
    //         // There was a connection error of some sort
    //         readability.innerHTML = "Not available.";
    //     };
    // });

    // function to convert FLESCH READING SCORE into meaningful string.
    // function readingEase(num) {
    //     switch (true) {
    //         case (num <= 30):
    //             return "Readability: College graduate.";
    //             break;
    //         case (num > 30 && num <= 50):
    //             return "Readability: College level.";
    //             break;
    //         case (num > 50 && num <= 60):
    //             return "Readability: 10th - 12th grade.";
    //             break;
    //         case (num > 60 && num <= 70):
    //             return "Readability: 8th - 9th grade.";
    //             break;
    //         case (num > 70 && num <= 80):
    //             return "Readability: 7th grade.";
    //             break;
    //         case (num > 80 && num <= 90):
    //             return "Readability: 6th grade.";
    //             break;
    //         case (num > 90 && num <= 100):
    //             return "Readability: 5th grade.";
    //             break;
    //         default:
    //             return "Not available.";
    //             break;
    //     }
    // }

    $('#wordCount').html(wordCount);
    $('#totalChars').html(totalChars);
    $('#facebook').html(facebook - totalChars);
    $('#twitter').html(twitter - totalChars);
    $('#google').html(google - totalChars);
    $('#sms').html(sms - totalChars);
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