
//#region PHONE
function validatePhoneNumber(inputField) {
    var phoneNumber = inputField.val();
    var phoneNumberPattern = /^((\+84)|0)[3|5|7|8|9][0-9]{8}$/;
    if (!phoneNumberPattern.test(phoneNumber)) {
        inputField.addClass("is-invalid");
        inputField.next(".invalid-feedback").html("Số điện thoại không hợp lệ.");
        return false;
    } else {
        inputField.removeClass("is-invalid");
        inputField.next(".invalid-feedback").html("");
        return true;
    }
}
//#endregion

//#region MIC
function validateMicLevel(inputField) {
    var value = inputField.val();
    if (isNaN(value) || value < 1 || value > 55) {
        inputField.addClass("is-invalid");
        inputField.next(".invalid-feedback").html("Giá trị âm lượng MIC phải từ 1 đến 55.");
        return false;
    } else {
        inputField.removeClass("is-invalid");
        inputField.next(".invalid-feedback").html("");
        return true;
    }
}
//#endregion

//#region SPEAKER
function validateSpeakerLevel(inputField) {
    var value = inputField.val();
    if (isNaN(value) || value < 1 || value > 55) {
        inputField.addClass("is-invalid");
        inputField.next(".invalid-feedback").html("Giá trị âm lượng Speaker phải từ 1 đến 55.");
        return false;
    } else {
        inputField.removeClass("is-invalid");
        inputField.next(".invalid-feedback").html("");
        return true;
    }
}
//#endregion

//#region KINH ĐỘ
function validateLongitude(inputField) {
    var value = inputField.val();
    var pattern = /^[-+]?\d{1,3}\.\d{1,15}$/;
    if (!pattern.test(value)) {
        inputField.addClass("is-invalid");
        inputField.next(".invalid-feedback").html("Kinh độ không hợp lệ.");
        return false;
    } else {
        inputField.removeClass("is-invalid");
        inputField.next(".invalid-feedback").html("");
        return true;
    }
}
//#endregion

//#region VĨ ĐỘ
function validateLatitude(inputField) {
    var value = inputField.val();
    var pattern = /^[-+]?\d{1,2}\.\d{1,15}$/;
    if (!pattern.test(value)) {
        inputField.addClass("is-invalid");
        inputField.next(".invalid-feedback").html("Vĩ độ không hợp lệ.");
        return false;
    } else {
        inputField.removeClass("is-invalid");
        inputField.next(".invalid-feedback").html("");
        return true;
    }
}
//#endregion