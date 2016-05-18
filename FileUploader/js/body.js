
document.getElementById("uploadBtn").onchange = function () {
  document.getElementById("name").value = this.value;
  SelectedFile = this.value;
};


$(document).ready(function() {

  $('#uploadForm').submit(function() {
    $("#status").empty().text("File is uploading...");

    $(this).ajaxSubmit({

      error: function(xhr) {
        status('Error: ' + xhr.status);
      },

      success: function(response) {
        console.log(response)
        $("#status").empty().text(response);
      }
    });

    return false;
  });
});
