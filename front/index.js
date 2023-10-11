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
let st = 0;
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
function initOp(){
    if (document.getElementById("answer").value === errMsg) {
        document.getElementById("operation").value = "";
        expression = ""
    }else if(document.getElementById("answer").value !== ""
        && document.getElementById("answer").value !== errMsg
        && document.getElementById("answer").value !== "Infinity")
    {
        document.getElementById("operation").value =
            document.getElementById("answer").value;
        expression = document.getElementById("operation").value
        document.getElementById("answer").value = "";
    }
}
/* recebe os valores */
function get(value) {
    initOp()
    document.getElementById("operation").value += value;
    expression += value;
}

function pow() {
    initOp()
    document.getElementById("operation").value += "^";
    expression += "^";
}

function get_with_left_bracket(value) {
    initOp()
    document.getElementById("operation").value += value;
    document.getElementById("operation").value += "(";
    expression += value;
    expression += "(";
}
function ans() {
    fetch("http://localhost:8080/history/", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            // 处理后端的响应
            if (data.code === 200) {
                const expVal = data.result;

                if (expVal.length > 0) {
                    const displayText = expVal.map((item, index) => `
          <div class="expression-container" id="expression-${index}">
            $ ${item.Exp} = ${item.Val} $
          </div>
        `).join('<br>');

                    Swal.fire({
                        title: '历史记录(近 10 条)',
                        html: displayText,
                        icon: 'success',
                        confirmButtonText: '关闭'
                    });

                    // 使用MathJax渲染数学表达式
                    for (let i = 0; i < expVal.length; i++) {
                        MathJax.Hub.Queue(["Typeset", MathJax.Hub, `expression-${i}`]);
                    }

                } else {
                    // 如果没有之前的数据，显示提示消息
                    Swal.fire('没有可显示的数据', '', 'error');
                }
            } else {
                // code 不为 200，给出提示
                console.error(`响应状态不是 200，错误消息：${data.msg}`);
            }
        })
        .catch(error => {
            console.error("An error occurred while receiving the result from the backend: " + error);
        });
}

function mode() {
    st = (st + 1) % 3;
    const normalCalculator = document.querySelector('.normal');
    const interestCalculator = document.querySelector('.interest');
    let bt = document.getElementById("topMode");

    var updateInter = document.getElementById("update_inter");
    var updateInter2 = document.getElementById("update_inter2");
    if (st === 0) {
        normalCalculator.style.display = 'block';
        interestCalculator.style.display = 'none';
        bt.innerHTML = "科学计算器"
    } else if (st === 1) {
        normalCalculator.style.display = 'none';
        interestCalculator.style.display = 'block';
        updateInter.style.display = "block";
        updateInter2.style.display = "none";
        bt.innerHTML = "存款计算器"
    } else if (st === 2) {
        normalCalculator.style.display = 'none';
        interestCalculator.style.display = 'block';
        updateInter2.style.display = "block";
        updateInter.style.display = "none";
        bt.innerHTML = "贷款计算器"
    }
}

function calculateInterest() {

    // 获取文本框的值
    const principalValue = document.getElementById("principal").value;
    const durationValue = document.getElementById("duration").value;
    let apiUrl
    // 构建URL，将查询参数附加到其中
    if (st === 1) apiUrl = `http://localhost:8080/deposit/?principal=${encodeURIComponent(principalValue)}&duration=${encodeURIComponent(durationValue)}`;
    else apiUrl = `http://localhost:8080/loans/?principal=${encodeURIComponent(principalValue)}&duration=${encodeURIComponent(durationValue)}`;

    console.log(principalValue)
    console.log(durationValue)
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            if (data.code === 200) {
                document.getElementById("inter").value = data.result.toFixed(4)
            } else {
                document.getElementById("inter").value = data.msg
            }
        })
        .catch(error => {
            console.error("An error occurred while sending to the backend: " + error);
        });
}

function pow2() {
    if (document.getElementById("answer").value === errMsg) {
        document.getElementById("operation").value = "";
        expression = ""
    }else if(document.getElementById("answer").value !== ""
        && document.getElementById("answer").value !== errMsg
        && document.getElementById("answer").value !== "infinity")
    {
        document.getElementById("operation").value =
            document.getElementById("answer").value;
    }
    document.getElementById("operation").value += "^2";
    expression += "^2";
}


/* calcula */
function calculates() {
    var s = document.getElementById("operation").value;
    var result = "";

    if (expression === "") {
        document.getElementById("answer").value = "";
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
        console.log(expression)
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

function updateInterest() {
    var dataToSend;
    if (st === 1) {
        dataToSend = {
            duration: parseFloat(document.getElementById("duration2").value),
            rate: parseFloat(document.getElementById("rate").value),
        }
    } else {
        dataToSend = {
            duration: parseFloat(document.getElementById("time2").value),
            rate: parseFloat(document.getElementById("rate2").value),
        }
    }
    let fetchUrl = `http://localhost:8080/deposit/`;
    if (st === 2) {
        fetchUrl = `http://localhost:8080/loans/`
    }
    console.log(dataToSend)

    // 发送结果给后端
    fetch(fetchUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    })
        .then(response => response.json())
        .then(data => {
            if (data.code === 200) {
                Swal.fire({
                    html: "修改成功",
                    icon: 'success',
                    confirmButtonText: '关闭'
                });
            } else {
                Swal.fire('系统异常，稍后再试', '', 'error');
            }
        })
        .catch(error => {
            console.error("An error occurred while sending the result to the backend: " + error);
        });
}


