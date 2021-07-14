function verticalLayout() {
  $("#info_container").removeClass("col-md-6");
  $("#contacts_container").removeClass("col-md-6");
  $("#layout_buttons .btn").first().removeClass("active");
  $("#layout_buttons .btn").last().addClass("active");
}

function horizontalLayout() {
  $("#info_container").addClass("col-md-6");
  $("#contacts_container").addClass("col-md-6");
  $("#layout_buttons .btn").first().addClass("active");
  $("#layout_buttons .btn").last().removeClass("active");
}
