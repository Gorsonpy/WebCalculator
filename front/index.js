/*
 * @Author: gorsonpy
 * @Date: 2023-09-27 18:14:34
 * @LastEditors: gorsonpy
 * @LastEditTime: 2023-10-09 10:44:10
 * @FilePath: \Web_Calculator\index.js
 * @Description:
 */

/*
* @Author: gorsonpy
* @Date: 2023-09-25 20:18:33
* @LastEditors: gorsonpy
* @LastEditTime: 2023-09-25 20:30:24
* @FilePath: \cal\c.js
* @Description:
*/
/* limpa o display */
// 创建一个自定义符号表

const customSymbols = {
    Π: math.pi,
    e: math.e,
};


// 现在 Math.js

const errMsg = "undefined";
var expression = ""; //实际运算的表达式

function clearf() {
    document.getElementById("operation").value = "";
    document.getElementById("answer").value = "";
    expression = "";
}

function backf() {
    str = document.getElementById("operation").value;
    document.getElementById("answer").value = "";
    document.getElementById("operation").value = str.slice(0, -1);
    expression = expression.slice(0, -1);
}

/* recebe os valores */
function get(value) {
    if (document.getElementById("answer").value === errMsg) {
        document.getElementById("operation").value = "";
        expression = ""
    }
    document.getElementById("operation").value += value;
    expression += value;
}

function pow() {
    if (document.getElementById("answer").value === errMsg) {
        document.getElementById("operation").value = "";
        expression = ""
    }
    document.getElementById("operation").value += "^";
    expression += "^";
}

function pow2() {
    if (document.getElementById("answer").value === errMsg) {
        document.getElementById("operation").value = "";
        expression = ""
    }
    document.getElementById("operation").value += "^2";
    expression += "^2";
}

function get_with_left_bracket(value) {
    if (document.getElementById("answer").value === errMsg) {
        document.getElementById("operation").value = "";
        expression = ""
    }
    document.getElementById("operation").value += value;
    document.getElementById("operation").value += "(";
    expression += value;
    expression += "(";
}


/* calcula */
function calculates() {
    var s = document.getElementById("operation").value;
    var result = "";

    if (expression === "") {
        document.getElementById("ansswer").value = "";
        expression = "";
    } else {
        try {
            result = math.evaluate(expression, customSymbols);

        } catch (error) {
            console.error("An error occurred while evaluating the expression: " + error);
            document.getElementById("answer").value = errMsg;
            return
        }

        document.getElementById("answer").value = result;
        // 创建一个包含表达式和结果的对象
        var dataToSend = {
            exp: s,
            val: document.getElementById("answer").value
        };

        console.log(JSON.stringify(dataToSend))
        // 发送结果给后端
        fetch("http://localhost:8080/history/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
            .then(response => response.json())
            .then(data => {
                // 处理后端的响应
                console.log(data);
            })
            .catch(error => {
                console.error("An error occurred while sending the result to the backend: " + error);
            });
    }
}
