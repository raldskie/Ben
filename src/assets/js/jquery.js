jQuery(function () {

    $('#signup-form').submit(function (event) {
        var username = $('#name').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var password_ = $('#re_password').val();

        if (!username || !email || !password || !password_) {
            alert("Please fill all fields!");
        }
        else if (password != password_) {
            alert("Passwords don't match!");
        }
        else {
            return;
        }
        event.preventDefault();
    });

    $('#save-edit').submit(function (event) {
        var name = $('#name').val();
        if (!name) {
            alert("Leave No Blanks!!!");
        } else {
            $('form').submit();
        }
        event.preventDefault();
    });

});