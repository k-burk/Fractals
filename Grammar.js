"use strict";

var grammar2 = "";
let stack = [];
let flag = true;
function previewFile() {
    const content = document.querySelector('.content');
    const [file] = document.querySelector('input[type=file]').files;
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        // this will then display a text file

        content.innerText = reader.result;
        grammar2 = content.innerText;
    }, false);

    if (file) {

        reader.readAsText(file);
        var input = content.toString();
    }

    /*for (let i = 0; i < input.length; i++){
       if (input[i] === 'F'){
           grammar2 = grammar2 + "F[+F]F[-F]F";
       }
       else{
           grammar2 = grammar2 + "!!!";
       }

    }*/
    console.log(input);
    console.log("Break");
    console.log(grammar2);
    //console.log(grammar("F", 4));

}

    function grammar(input, n) {
        if (!n) {
            n = 1;
        }
        let output = '';
        input = input.toString();
        for (let i = 0; i < input.length; i++) {
            if (input[i] === 'F') {
                output = output.concat('F+F-F+');
            }
        }
        n--;
        if (n === 0) {
            return output;
        } else {
            grammar(output, n);
        }

    }

class Rule {
    constructor(rule) {
        this.rule = rule; // rule in the form of a string (ex: "F: F[-F]F+F"
    }

    // returns regular expression to replace
    get exp() {
        return this.createExp();
    }

    // returns replacement string
    get replStr() {
        return this.createReplStr();
    }

    // creates regular expression from characters in string before the colon
    createExp() {
        var lhs = "";
        for(var i = 0; i < this.rule.length; i++) {
            if(this.rule[i] != ':') {
                lhs = lhs.concat(this.rule[i])
            }
            else if(this.rule[i] == ':') {
                break;
            }
        }

        return new RegExp(lhs, 'g');
    }

    // extracts the replacement string from the rule
    createReplStr() {
        for(var i = 0; i < this.rule.length; i++) {
            if(this.rule[i] != ':') {
                continue;
            }

            else if(this.rule[i] == ":") {
                i += 2;
                return this.rule.slice(i, this.rule.length);
            }
        }
    }

    // returns the turtle string from a starting string and number of iterations
    turtleStr(input, n) {
        if(n == 0) {
            return input;
        }

        else if(n > 0) {
            input = input.replace(this.exp, this.replStr);
            return this.turtleStr(input, n - 1);
        }
    }

}

const myRule = new Rule("F: F[+F]F[-F]F");
const myTurtleStr = myRule.turtleStr("F", 3);



    var tree = "F[+++]FFF[--]F[+++]"//grammar("F", 5);
    var n = .2, pos=0, xmove = n/9, len = 0, tempPos = n/3;
    var angle = 20;
    //length, pos, angle, iteration, xmove
    for (var i = 0; i < tree.length; i++) {
        console.log(tree[i]);
        switch (tree[i]) {
            case 'F':
                if (flag){
                    branch(n, pos, 0, 0.02, -n / 6);
                }
                else{
                    branch(len, tempPos, 0, 0.02, xmove);
                    tempPos = tempPos + n/2;
                    xmove = xmove - n/3.3
                    len = n/1.2;
                }
                break;
            case '+':
                if (flag){
                    branchPlus(n, pos, 20, 0.02, -n / 6);
                }
                else{
                    branchPlus(len, tempPos, 20, 0.02, xmove);
                    tempPos = len/1.2 + tempPos
                    xmove = xmove - n/4;
                    len = n/1.2;
                }
                break;
            case '-':
                if(flag){
                    branchMinus(n, pos, -angle, 0.02, -n / 6);
                }else{
                    branchMinus(len, tempPos, -angle, 0.02, xmove);
                    tempPos = len/1.2 + tempPos;
                    xmove = xmove - n/4;
                    len = n/1.2;
                }
                break;
            case '[':
                flag = !flag;
                break;
            case']':
                flag = !flag;
                len = n;
                tempPos = n/3 + pos;
                xmove = -n/9;
                break;
        }
        if (flag){
            pos = pos + n/3;

        }
    }

