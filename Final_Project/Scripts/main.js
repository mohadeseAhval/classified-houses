function funcCheckPass() {
    var pass = document.getElementById('Password1').value;
    var confirmPass = document.getElementById('passr').value;
    if (pass == confirmPass) {
        document.getElementById('btn-send').disabled = false;
    }
    else {
        alert(' تکرار رمز عبور با رمز وارد شده مطابقت ندارد');
    }
}