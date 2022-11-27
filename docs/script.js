$(document).ready(function ($) {
    $("#search-input").on('keypress', function (e) {
        if (e.which == 13) {
            exibeResultado();
        }
    });

    $("section.search-container > div > div > i").click(function () {
        exibeResultado();
    })
});

async function busca(inputValue) {
    let dadosFetch = await
        fetch(`https://apitestedevatak20221126200451.azurewebsites.net/api/Busca?busca=${inputValue}`);
    let json = dadosFetch.json();
    return json;

}

function exibeResultado() {
    let inputValue = $("#search-input").val().trim();
    if (inputValue != "") {
        let json = busca(inputValue);
        $("li").each(function () {
            $(this).remove();
        });

        json.then((result) => {
            for (const resultado of result.Resultados) {
                $(".lista-de-resultados").append(`<li><div><h2>${resultado.Titulo}</h2><a href=\"${resultado.Link}\" target=\"_blank\">${resultado.Link}</a></div></li>`);
            }
        })
        $("#search-input").val("");
        $("#search-input").blur()
    }
}