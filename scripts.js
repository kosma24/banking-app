var red = "#d11c0c"
var green = "#3aa812"

function getRandomFloat(min, max) {
    return (Math.random() * (max - min) + min);
}

var current = $("#current-amount");
current.text(getRandomFloat(-50, 500).toFixed(2));
if (Number(current.text()) < 0) {
    current.css("color", red);
} else {
    current.css("color", green);
}

var saving = $("#saving-amount");
saving.text(getRandomFloat(0, 2000).toFixed(2));
if (Number(saving.text()) < 0) {
    saving.css("color", red);
} else {
    saving.css("color", green);
}

var credit = $("#credit-amount");
credit.text(getRandomFloat(-400, 0).toFixed(2));
if (Number(credit.text()) < 0) {
    credit.css("color", red);
} else {
    console.log(credit.val());
    credit.css("color", green);
}

$("#login-switch").click(function() {
    $(".phone-screen").hide(1);
    $("#login-screen").show(1);
});
$("#acc-switch").click(function() {
    $(".phone-screen").hide(1);
    $("#account-screen").show(1);
});
$("#trans-switch").click(function() {
    $(".phone-screen").hide(1);
    $("#trans-screen").show(1);
});

$("#account-screen").show(1);
