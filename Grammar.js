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



    var tree = "F[+++FF--]"//FFF[--]F[+++][FFF]"//grammar("F", 5);
    var n = .2, pos=0, xmove = n/9, len = 0, tempy = n/3, straight = 0;
    var angle = 20;
    //length, pos, angle, iteration, xmove
    for (var i = 0; i < tree.length; i++) {
        //console.log(tree[i]);
        console.log(pos);
        skip = true;
        switch (tree[i]) {
            case 'F':
                if (flag){
                    branch(n, pos, 0, 0.04, 0);
                }
                else{
                    branch(len, (straight), 0, 0.02, xmove + n/4);
                    straight = tempy - n/4;
                    tempy = tempy + n/2;
                    xmove = xmove + n/12;
                    len = n/1.2;
                }
                break;
            case '+':

                if (tree[i-1] == "-" || tree[i-1] == "F"){
                    xmove = -xmove - n/4
                    branchPlus(len, tempy, 20, 0.02, xmove);
                }
                else{
                    branchPlus(len, tempy, 20, 0.02, xmove);
                    straight = tempy
                    tempy = len/1.2 + tempy
                    xmove = xmove - n/4;
                    len = n/1.2;
                }
                break;
            case '-':
                if(tree[i-1] == "+" || tree[i-1] == "F"){
                    xmove = -xmove - n/4
                    branchMinus(len, tempy, -angle, 0.02, xmove);
                    straight = tempy
                    tempy = tempy + len/1.2;
                    xmove = xmove - n/4;
                    len = n/1.2;
                }
                else{
                    branchMinus(len, tempy, -angle, 0.02, xmove);
                    straight = tempy
                    tempy = tempy + len/1.2;
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
                tempy = n/3 + pos;
                xmove = -n/4;
               var skip = false;
                break;
        }
        if (flag && skip){
            pos = pos + n/3;
        }
    }

