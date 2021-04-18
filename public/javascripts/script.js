const shortenForm = document.querySelector("#shorten-form")
var longUrl = shortenForm["long-url"];

$(document).ready(() => {

    shortenForm.addEventListener("submit", (e) => {
        e.preventDefault();

        var data = { longUrl: longUrl.value };

        $.ajax({
                url: "/api/url/shorten",
                type: "post",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function(res) {
                    longUrl.value = res["shortUrl"];
                    longUrl.select();

                    $("#shorten-btn").addClass("copy")
                    $("#shorten-btn").text("Copy")
                },
                error: function(err) {
                    console.log(err.message);
                }
            })
            //console.log(longUrl);
    })

    // Copy text to clickboard after url has been shortened
    $("#shorten-btn").click(e => {
        if ($(e.target).hasClass('copy')) {
            longUrl.select();
            longUrl.setSelectionRange(0, 99999); /* For mobile devices */

            /* Copy the text inside the text field */
            document.execCommand("copy");

            /* Alert the copied text */
            alert("Copied the text: " + longUrl.value);
        }
    })


    /*$(longUrl).change(e => {
        if (e.target.value.length < 2) {
            alert("Empty")
            $("#shorten-btn").removeClass("copy");
            $("#shorten-btn").text("Shorten");
        }
    })
*/
    document.addEventListener('keydown', (e) => {
        if (longUrl.value.length < 1) {
            //alert("Empty")
            $("#shorten-btn").removeClass("copy");
            $("#shorten-btn").text("Shorten");
        }
    })
})