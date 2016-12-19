/*

The code here is horrible and should not be taken
as an example. It had been written only for demostrating purposes.


*/





const RED = "#d11c0c"
const GREEN = "#3aa812"

const GUIDELOGIN = "<h4>CA357 HCI Project</h4><p>Welcome to a login screen of the <a href='https://ca357.koltunm.com/'>Phone Banking App</a>. Please keep in mind this is only a prototype design. Its purpose is to demonstrate features improving human-computer interface of the app.</p> <h4>Fingerprint Authentication</h4><p> Drag one of the <span>fingers</span> from the left pane and drop it onto the <span>finger-print area</span> of the phone. This activity invokes the authenticaion process. If the fingerpint matches, the process succeeds and the app displays the next page, otherwise a user is notified about the failure. <br><br> Alternatively...<br><br> Normal login proecedure can also be used. Please enter these dummy credential numbers and click 'Log in' button: <br><br> Registration: <span>12345678</span> <br> PAC: <span>1 2 3</span></p>";
const GUIDEACCOUNT = "<h4>CA357 HCI Project</h4><p>This screen displays balance of user's accounts.<h4>Voice Control feature</h4><p>A user can query details about their accounts using voice commands. <span>Make sure you microphone extension is enabled and volume </span>. </p><p>For example, to obtain details about the current account, say: <br><br><span>SELECT CURRENT</span><br><span>GET CREDIT BALANCE</span><br><span>GET CURRENT IBAN</span></p><p>Other commands are:<br><br><span>Logout</span><br><span>Help</span><br><span>List Commands</span></p>";
const GUIDEDETAILS = "<h4>CA357 HCI Project</h4><p>The details screen contains relevant information about selected account.<h4>Voice commands</h4><p>A user can query specific details about their accounts using voice commands.\
    <br>\
    <br><span>GET BALANCE</span>\
    <br><span>GET LAST TRANSACTION</span>\
    <br><span>GET BIC</span>\
    <br><span>GET IBAN</span>\
    <p>User can also select another account \
    <br>\
    <br><span>SELECT SAVING</span>\
    <br><span>SELECT CREDIT</span>\
    <p>Other commands are:<br><br><span>Logout</span><br><span>Help</span><br><span>List Commands</span></p>";

const LOGIN = 0;
const ACCOUNT = 1;
const DETAILS = 2;

var STATE = LOGIN;
generateAmounts();
setTimeout(function() {
    setGuide(GUIDELOGIN, 0);
    $("#fingers").show(500);
}, 1500);
setTimeout(function() {
    $("#warning-box").show(500);
}, 2500);

$("#account-screen").hide(0);
$("#detail-screen").hide(0);
$("#login-screen").show(0);

$("#good-finger").draggable({
    revert: 'invalid'
});
$("#bad-finger").draggable({
    revert: function() {
        $("#fingerprint").css({
            "border": "5px solid red",
            "border-radius": "5px"
        });
        notification("Authentication has failed.");
        setTimeout(function() {
            $("#fingerprint").css({
                "border": "",
                "border-radius": "5px"
            });
        }, 3500);
        return true;
    }
});
$("#fingerprint-area").droppable({
    accept: '#good-finger',
    drop: function(event, ui) {
        var id = ui.draggable.attr("id");
        if ($("#good-finger").is($("#"+id))){
            $("#good-finger").hide(1000);
            setTimeout(gotoAccount, 1000);
        }
    }
});

$("#login-switch").click(function() {
    gotoLogin();
});
$("#acc-switch").click(function() {
    gotoAccount();
});
$("#details-switch").click(function() {
    gotoDetail();
});
$("#logout").click(function() {
     window.location = "https://ca357.koltunm.com/";
});
$("#good-finger, #bad-finger").css('z-index','1000');
$("#login-button").click(function() {
    var regnum = $("#reg-input").val();
    var pac1 = $("#pac1").val();
    var pac3 = $("#pac3").val();
    var pac5 = $("#pac5").val();
    if (pac1 == 1 && pac3 == 2 && pac5 == 3 && regnum == 12345678) {
        gotoAccount();
    } else {
        $("input").css({
            "border": "2px solid red"
        });
        setTimeout(function() {
            $("input").css({
                "border": ""
            });
        }, 3500);
    }
});
$("#current-acc").click(function() {
    gotoDetail();
});
$("#saving-acc").click(function() {
    notification("We're sorry, but only CURRENT account is supported.");
});
$("#credit-acc").click(function() {
    notification("We're sorry, but only CURRENT account is supported.");
});
$("#back").click(function() {
    $("#detail-screen").hide(0);
    gotoAccount();
});
$("#close-warning").click(function() {
    $("#warning-box").hide(500);
});
$("#close-unsupported").click(function() {
    $("#unsupported").hide(500);
});
$("#help").click(function(){
    speak("To select an account, use the command SELECT. For example, SELECT CURRENT.");
    speak("To obtain specific information, either select the account, or, use command GET, followed by a name of the account and, desired piece of information. For example, GET CURRENT BALANCE. or, GET SAVING IBAN.");
});

function gotoLogin() {
    STATE = LOGIN;
    $("#login-screen").show(0);
}
function gotoAccount() {
    STATE = ACCOUNT;
    $("#account-screen").show(0);
    $("#fingers").hide(500);
    setGuide(GUIDEACCOUNT, 500);
}
function gotoDetail() {
    STATE = DETAILS;
    $("#detail-screen").show(0);
    $("#account-screen").show(0);
    $("#fingers").hide(500);
    setGuide(GUIDEDETAILS, 500);
}


function showFingers() {
    $("#fingers").hide(500);
    setTimeout(function() {
        $("#fingers").show(500);
    },500);
}
function setGuide(text, wait) {
    $("#guide").hide(500);
    setTimeout(function() {
        $("#guide").html(text);
        $("#guide").show(500);
    },wait);
}
function notification(message) {
    $("#notification").text(message);
    $("#notification").show(300);
    setTimeout(function() {
        $("#notification").hide(400);
    }, 3500);
}
// Below function is absolutely horrible and should be fixed
function generateAmounts() {
    var current = $("#current-amount");
    var detBalance = $("#detail-balance");
    current.text(getRandomFloat(-150, 300).toFixed(2));
    detBalance.text(("\u20AC" + current.text()));
    if (Number(current.text()) < 0) {
        current.css("color", RED);
        detBalance.css("color", RED);
    } else {
        current.css("color", GREEN);
        detBalance.css("color", GREEN);
    }

    var saving = $("#saving-amount");
    saving.text(getRandomFloat(0, 2000).toFixed(2));
    if (Number(saving.text()) < 0) {
        saving.css("color", RED);
    } else {
        saving.css("color", GREEN);
    }

    var credit = $("#credit-amount");
    credit.text(getRandomFloat(-400, 0).toFixed(2));
    if (Number(credit.text()) < 0) {
        credit.css("color", RED);
    } else {
        console.log(credit.val());
        credit.css("color", GREEN);
    }

    var detOverDraft = $("#detail-overdraft");
    detOverDraft.text("\u20AC" + getRandomInt(3,10) * 100 + ".00");

    var trans1 = $("#trans1-amount");
    trans1.text(getRandomFloat(-100, 0).toFixed(2));
    if (Number(trans1.text()) < 0) {
        trans1.css("color", RED);
    } else {
        console.log(trans1.val());
        trans1.css("color", GREEN);
    }

    var trans2 = $("#trans2-amount");
    trans2.text(getRandomFloat(-50, 0).toFixed(2));
    if (Number(trans2.text()) < 0) {
        trans2.css("color", RED);
    } else {
        console.log(trans2.val());
        trans2.css("color", GREEN);
    }

    var trans3 = $("#trans3-amount");
    trans3.text(getRandomFloat(600, 1200).toFixed(2));
    if (Number(trans3.text()) < 0) {
        trans3.css("color", RED);
    } else {
        console.log(trans3.val());
        trans3.css("color", GREEN);
    }

    var trans4 = $("#trans4-amount");
    trans4.text(getRandomFloat(-100, 0).toFixed(2));
    if (Number(trans4.text()) < 0) {
        trans4.css("color", RED);
    } else {
        console.log(trans4.val());
        trans4.css("color", GREEN);
    }
}
function getRandomFloat(min, max) {
    return (Math.random() * (max - min) + min);
}
function getRandomInt(min, max) {
    return Math.floor(getRandomFloat(min,max));
}
