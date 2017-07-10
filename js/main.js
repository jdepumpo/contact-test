var vForm = document.getElementById('mgform');
var vInput = document.getElementById('mail');

vForm.onsubmit = function() {
if (this.hid == "sendbut") {
    location = "/sendbut/" + encodeURIComponent(vInput.value);
}

return false;
}
