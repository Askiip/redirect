const user = {
  email: "user@gmail.com",
  mdp: "mdp_user",
  phone: "+33663113982",
  firstname: "Jean",
  lastname: "Bronson",
  contacts: [{ first: "Gérard", last: "Lupin", phone: "+43788990010" }],
};

function getUserContactsCard() {
  user.contacts.forEach((contact, index) => {
    $("#contacts").prepend(
      "<div class='card border rounded px-4 mb-2'><div class='card-body justify-content-center'>" +
        "<div class='form row'>\n " +
        "<div class='col-12'><h4> Contact " +
        (index + 1) +
        "</h4></div>" +
        "<div class='form-group col-12 col-md-4'><label for='firstname_contact_" +
        index +
        "'>Prénom</label> \n" +
        "<input type='text' class='form-control'id='firstname_contact_" +
        index +
        "' placeholder='Michel' value='" +
        contact.first +
        "'/></div>" +
        "<div class='form-group col-12 col-md-4'><label for='lastname_contact_" +
        index +
        "'>Nom</label> \n" +
        "<input type='text' class='form-control'id='lastname_contact_" +
        index +
        "' placeholder='Dupont' value='" +
        contact.last +
        "'/></div>" +
        "<div class='form-group col-12 col-md-4'><label for='phone_contact_" +
        index +
        "'>Téléphone</label> \n" +
        "<input type='text' class='form-control'id='phone_contact_" +
        index +
        "' placeholder='+3369903...' value='" +
        contact.phone +
        "'/></div>" +
        "</div>" +
        "</div>" +
        "</div>"
    );
  });
}

function openContactAdditionModal() {
  $(".container-fluid").prepend(
    "<div class='modal' tabindex='-1' role='dialog' id='addContactModal'>" +
      "<div class='modal-dialog modal-lg' role='document'>" +
      "<div class='modal-content rounded p-4'>" +
      "<div class='form row'>\n " +
      "<div class='col-12'><h4> Nouveau Contact " +
      "</h4></div>" +
      "<div class='form-group col-12 col-md-4'><label for='firstname_new_contact'>Prénom</label> \n" +
      "<input type='text' class='form-control'id='firstname_new_contact' placeholder='Michel'/></div>" +
      "<div class='form-group col-12 col-md-4'><label for='lastname_new_contact'>Nom</label> \n" +
      "<input type='text' class='form-control'id='lastname_new_contact' placeholder='Dupont''/></div>" +
      "<div class='form-group col-12 col-md-4'><label for='phone_new_contact'>Téléphone</label> \n" +
      "<input type='text' class='form-control'id='phone_new_contact' placeholder='+3369903...''/></div>" +
      "</div>" +
      "<div class='row justify-content-around mt-4'>" +
      "<button class='btn btn-primary' disabled='true' onClick='saveNewContact()'>Confimer</button>" +
      "<button class='btn btn-primary' onclick='closeModal()'>Annuler</button>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>"
  );
  $("#addContactModal").modal({ backdrop: "static" });
}

$(document).ready(function () {
  getUserContactsCard();
});
