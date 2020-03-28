var inputSearch = $("#inputSearch");
var ariaSearch = $("#ariaSearch");
var cancelSearch = $("#cancelSearch");
var searchBox = $("#searchBox");
var searchAlert = $("#searchAlert");
var searchResult = $("#searchResult");
var leaderboards = $("#leaderboards");

inputSearch.on("keypress", function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) {
    ariaSearch.click();
  }
  e.stopPropagation();
});

ariaSearch.on("click", function() {
  if (inputSearch != "") {
    $("#loader").addClass("is-loading");
    $("#spinner").css("display", "flex");
    $.ajax({
      type: "POST",
      url: "/apps/main/public/ajax/search.php?action=leaderboards&server=" + leaderboardsID,
      data: {username: inputSearch.val()},
      success: function(result) {
        if (result == false) {
          cancelSearch.css("display", "inline-block");
          searchResult.css("display", "none");
          leaderboards.css("display", "table-row-group");
          searchAlert.attr("class", "alert alert-danger").text("Oyuncu bulunamadı!").css("display", "block").prepend('<i class="fa fa-times-circle"></i>');
          $("#loader").removeClass("is-loading");
          $("#spinner").css("display", "none");
        }
        else {
          searchResult.html(result);
          searchResult.css("display", "table-row-group");
          leaderboards.css("display", "none");
          cancelSearch.css("display", "inline-block");
          searchAlert.attr("class", null).text(null).css("display", "none");
          $("#loader").removeClass("is-loading");
          $("#spinner").css("display", "none");
        }
        console.log(result);
      }
    });
  }
});
cancelSearch.on("click", function() {
  $("#inputSearch").val(null);
  cancelSearch.css("display", "none");
  searchAlert.attr("class", null).text(null).css("display", "none");
  searchResult.css("display", "none");
  leaderboards.css("display", "table-row-group");
});
