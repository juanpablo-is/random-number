$(".btnGenerate").click(function () {
    calculateTable();
});

$(".pnlDate").each(function () {
    let parent = this;
    $(this).find("input").on("input", function () {
        let val = $(this).val();
        return processBinary(val, parent);
    })
});

// Convert number decimal to expression binary.
function convertToBinary(number) {
    if (typeof number !== 'number' || isNaN(number)) return 0;

    var instance = number;
    var binary = "";

    while (instance != 0) {
        binary = (instance % 2 == 0 ? 0 : 1) + binary;
        instance = Math.floor(instance / 2);
    }

    return binary;
}

// Convert number expression binary to decimal.
function convertToDecimal(number) {
    var instance = 0;
    var lengthBinary = number.toString().split("");
    var cont = 0;
    for (let i = lengthBinary.length - 1; i >= 0; i--) {
        instance += lengthBinary[cont++] * (Math.pow(2, i));
    }

    return instance;
}

// Function auto for change value input according date.
(function () {
    var date = new Date();
    date.setUTCDate(7);

    $("#day").val(date.getDay() + 1);
    $("#month").val(date.getMonth() + 1);
    $("#year").val(date.getFullYear());

    $(".pnlDate").each(function () {
        let parent = this;
        $(this).find("input").each(function () {
            let val = $(this).val();
            return processBinary(val, parent);
        })
    });
})();

// Function that modify text of TD of Table.
function processBinary(val, parent) {
    if (!val)
        return false;

    let convert = convertToBinary(parseInt(val)).split("");

    $(parent).find("td").each(function (i) {
        $(this).text("-")
        $(this).text(convert[i])
    })
    return true;
}

var cont = 0;
(function () {
    let initialStateArr = [];

    $(".tableInput td").each(function () {
        $(this).click(function () {
            let td = $(this);
            let index = td.index() + 1;
            let text = td.text();
            if (text == "-") return true;

            if (td.hasClass("clicked")) {
                td.removeClass("clicked");
                td.removeAttr("id");
                cont--;
                initialState();
                initialStateArr.splice(cont, 1);
            } else {
                if (cont < 5) {
                    td.addClass("clicked");
                    td.attr("id", cont + 1);
                    cont++;
                    initialState();

                    let textIS = "";
                    if ($(td).parent().hasClass("day")) {
                        textIS = ` day(${index}) `;
                    }
                    else if ($(td).parent().hasClass("month")) {
                        textIS = ` month(${index}) `;
                    }
                    else if ($(td).parent().hasClass("year")) {
                        textIS = ` year(${index}) `;
                    }
                    initialStateArr.push(textIS);
                }
            }
            $("#pnlIS p").text(JSON.stringify(initialStateArr).replace(/['"]+/g, ""));
        });

    })
})();

// Modify value initial state.
function initialState() {
    let clicked = $(".clicked");
    $(".is").each(function (i) {
        let item = clicked[i];
        $(this).text(item ? $(item).text() : "-");
    });
}

// Generate table.
function calculateTable() {
    let fields = $(".field-process");
    let fieldsResultados = $(".field-result");
    let fieldsResultadosTable = $(".tableResult td");
    let binary = "";

    if ($(".clicked").length == 5) {
        for (let i = 5; i < fields.length; i++) {
            if (i % 5 == 0) {
                let x1 = $(fields[i - 5]).text();
                let x2 = $(fields[i - 2]).text();
                $(fields[i]).text(x1 === x2 ? 0 : 1)
            } else {
                let x1 = $(fields[i - 6]).text();
                $(fields[i]).text(x1);
            }

            binary += $(fields[i]).text();

            if ((i + 1) % 5 == 0) {
                let binaryToDecimal = convertToDecimal(binary);
                $(fieldsResultados[(i + 1) / 5 - 2]).text(binaryToDecimal);
                $(fieldsResultadosTable[(i + 1) / 5 - 2]).text(binaryToDecimal);

                binary = "";
            }
        }
    }
}