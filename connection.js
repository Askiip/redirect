// Liste des comptes utilisateurs ENDUR
const allowed_users = [
    {
      email: "mathilde.angles@edu.ece.fr",
      mdp: "mathilde_angles",
      role: "admin",
    },
    { email: "alice.borie@edu.ece.fr", mdp: "alice_borie", role: "admin" },
    { email: "jean.puigrenier@edu.ece.fr", mdp: "jean_puigrenier", role: "user" },
  ];
  const allowed_emails = allowed_users.map((element) => element.email);
  const passwordRegexpVeryStrong = new RegExp(
    "^(?=.*[A-Z])(?=.*[\\W])(?=.*[0-9])(?=.*[a-z]).{8,32}$"
  );
  const passwordRegexpStrong = new RegExp(
    "^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,32}$|^(?=.*[A-Z])(?=.*[\\W])(?=.*[a-z]).{8,32}$|^(?=.*[0-9])(?=.*[\\W])(?=.*[a-z]).{8,32}$"
  );
  const passwordRegexpMedium = new RegExp(
    "^(?=.*[0-9])(?=.*[a-z]).{8,32}$|^(?=.*[A-Z])(?=.*[a-z]).{8,32}$|^(?=.*[\\W])(?=.*[a-z]).{8,32}$|^(?=.*[A-Z])(?=.*[0-9]).{8,32}$|^(?=.*[\\W])(?=.*[0-9]).{8,32}$|^(?=.*[\\W])(?=.*[A-Z]).{8,32}$"
  );
  const passwordRegexpWeak = new RegExp(
    "^(?=.*[0-9]).{8,32}$|^(?=.*[a-z]).{8,32}$|^(?=.*[A-Z]).{8,32}|^$(?=.*[\\W]).{8,32}$"
  );
  $("#password_register").keyup(function updatePasswordStrength() {
    let password = $("#password_register").val();
    let passwordStrength = [
      passwordRegexpVeryStrong.test(password),
      passwordRegexpStrong.test(password),
      passwordRegexpMedium.test(password),
      passwordRegexpWeak.test(password),
    ];
    console.log(password, passwordStrength, password.length);
    $("#password_strength_bar").removeClass(
      "bg-danger bg-warning bg-info bg-primary bg-success"
    );
    if (passwordStrength[0]) {
      $("#password_strength_bar").addClass("bg-success");
      $("#password_strength_bar").prop({
        style: "width: 100%",
        ariaValuenow: "5",
      });
      $("#password_strength_bar").text("Très Fort");
    } else {
      if (passwordStrength[1]) {
        $("#password_strength_bar").addClass("bg-primary");
        $("#password_strength_bar").prop({
          style: "width: 80%",
          ariaValuenow: "4",
        });
        $("#password_strength_bar").text("Fort");
      } else {
        if (passwordStrength[2]) {
          $("#password_strength_bar").addClass("bg-info");
          $("#password_strength_bar").prop({
            style: "width: 60%",
            ariaValuenow: "3",
          });
          $("#password_strength_bar").text("Moyen");
        } else {
          if (passwordStrength[3]) {
            $("#password_strength_bar").addClass("bg-warning");
            $("#password_strength_bar").prop({
              style: "width: 40%",
              ariaValuenow: "2",
            });
            $("#password_strength_bar").text("Faible");
          } else {
            $("#password_strength_bar").addClass("bg-danger");
            $("#password_strength_bar").prop({
              style: "width: 20%",
              ariaValuenow: "1",
            });
            $("#password_strength_bar").text("Insuffisant");
          }
        }
      }
    }
  });
  
  function showPasswordStrength() {
    $("#password_strength").removeClass("d-none");
  }
  
  function hidePasswordStrength() {
    $("#password_strength").addClass("d-none");
  }
  
  function incorrect(htmlElement, message) {
    $(htmlElement).replaceWith(
      "<div class='form-group text-center' id=" +
        htmlElement.replace("#", "") +
        "><small class='text-danger'>" +
        message +
        "</small></div>"
    );
  }
  
  function invalidField(htmlElement, message, className) {
    console.log($(htmlElement));
    $(htmlElement).replaceWith(
      "<small class='" +
        className +
        "' id=" +
        htmlElement.replace("#", "") +
        "> " +
        message +
        " </small>"
    );
  }
  
  function redirectTo() {
    let email = $("#email_connect").val();
    let password = $("#password_connect").val();
    //remplacer select sur le bdd BOOLEANDB
    let userId = allowed_users.findIndex((element) => element.email === email);
    //
    if (password === "" || email === "") {
      incorrect(
        "#error_log",
        "Veuillez remplir les champs ci-dessus ou créer un nouveau compte utilisateur"
      );
    } else {
      if (userId !== -1) {
        if (allowed_users[userId].mdp === password) {
          window.location.replace(
            allowed_users[userId].role === "user"
              ? "./account/index.html"
              : "./dashboard.html"
          );
        } else {
          incorrect("#error_log", "L'email ou le mot de passe de est incorrect");
        }
      } else {
        incorrect("#error_log", "L'email ou le mot de passe de est incorrect");
      }
    }
  }
  
  function register() {
    let [email, password, confirmation_password, phone, firstName, lastName] = [
      $("#email_register").val(),
      $("#password_register").val(),
      $("#password_confirmation_register").val(),
      $("#phone_register").val(),
      $("#firstname_register").val(),
      $("#lastname_register").val(),
    ];
  
    //remplacer select sur le bdd BOOLEANDB
    let userId = allowed_users.findIndex((element) => element.email === email);
    const invalid = {
      email: email === "",
      password: !passwordRegexpWeak.test(password),
      password_confirmation: confirmation_password === "",
      phone: phone === "" && phone.length <= 12 && phone.length > 10,
      firstname: firstName === "",
      lastname: lastName === "",
    };
    if (
      invalid.email ||
      invalid.password ||
      invalid.password_confirmation ||
      invalid.phone ||
      invalid.firstname ||
      invalid.lastname
    ) {
      Object.keys(invalid).forEach((key) => {
        if (invalid[key]) {
          if (key === "password") {
            invalidField(
              `#${key}_register_alert`,
              "Le mot de passe doit contenir au moins 8 caractères, dont un chiffre, une minuscule et une majuscule",
              "text-danger"
            );
          } else {
            invalidField(
              `#${key}_register_alert`,
              "Ce champs est nécessaire !",
              "text-danger"
            );
          }
        } else {
          if (key === "password") {
            invalidField(
              `#${key}_register_alert`,
              "Le mot de passe doit contenir au moins 8 caractères, dont un chiffre, une minuscule et une majuscule",
              "text-secondary"
            );
          }
          invalidField(`#${key}_register_alert`, "", "text-secondary");
        }
      });
    } else {
      if (userId === -1) {
        if (password === confirmation_password) {
          //AJOUTER UTILISATEUR DB puis
          window.location.replace("./account/index.html");
        }
      } else {
        incorrect(
          "#error_create",
          "Un compte avec cette adresse email exitse déjà"
        );
      }
    }
  }
  