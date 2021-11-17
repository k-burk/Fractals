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