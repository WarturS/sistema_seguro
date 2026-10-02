const loginSection = document.getElementById("loginSection");
const dashboardSection = document.getElementById("dashboardSection");

const loginForm = document.getElementById("loginForm");

const loginMessage = document.getElementById("loginMessage");

const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userProfile = document.getElementById("userProfile");

const result = document.getElementById("result");

const clientesButton = document.getElementById("clientesButton");
const auditoriaButton = document.getElementById("auditoriaButton");

const logoutButton = document.getElementById("logoutButton");


let token = sessionStorage.getItem("token");

let usuario = JSON.parse(
    sessionStorage.getItem("usuario") || "null"
);


function mostrarDashboard() {

    loginSection.classList.add("hidden");

    dashboardSection.classList.remove("hidden");

    userName.textContent = usuario.nome;
    userEmail.textContent = usuario.email;
    userProfile.textContent = usuario.perfil;

}


function mostrarLogin() {

    loginSection.classList.remove("hidden");

    dashboardSection.classList.add("hidden");

}


loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    loginMessage.textContent = "Autenticando...";

    try {

        const response = await fetch("/api/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                senha
            })

        });


        const data = await response.json();


        if (!response.ok) {

            loginMessage.textContent =
                data.erro || "Erro ao realizar login.";

            return;
        }


        token = data.token;
        usuario = data.usuario;


        sessionStorage.setItem(
            "token",
            token
        );

        sessionStorage.setItem(
            "usuario",
            JSON.stringify(usuario)
        );


        loginMessage.textContent = "";

        mostrarDashboard();


    } catch (error) {

        loginMessage.textContent =
            "Não foi possível conectar ao servidor.";

    }

});


clientesButton.addEventListener("click", async () => {

    result.textContent = "Carregando...";


    try {

        const response = await fetch(
            "/api/clientes",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );


        const data = await response.json();


        result.textContent =
            JSON.stringify(data, null, 2);


    } catch (error) {

        result.textContent =
            "Erro ao consultar clientes.";

    }

});


auditoriaButton.addEventListener("click", async () => {

    result.textContent = "Consultando auditoria...";


    try {

        const response = await fetch(
            "/api/auditoria",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );


        const data = await response.json();


        result.textContent =
            JSON.stringify(
                {
                    status: response.status,
                    resposta: data
                },
                null,
                2
            );


    } catch (error) {

        result.textContent =
            "Erro ao consultar auditoria.";

    }

});


logoutButton.addEventListener("click", () => {

    sessionStorage.removeItem("token");

    sessionStorage.removeItem("usuario");

    token = null;

    usuario = null;

    mostrarLogin();

});


if (token && usuario) {

    mostrarDashboard();

}