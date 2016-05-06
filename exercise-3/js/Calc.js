window.Calc = (function() {
    // Write a constructor function which takes a number, stores it, and
    // defines all Calc API functions
    var c = function(num) {
        var calc = {};
        calc.currNum = num;

        // Implement getVal, plus, minus, times, divide, and clear
        calc.getVal = function() {
            return this.currNum;
        }
        
        calc.plus = function(n) {
            this.currNum += n;
            return this;
        }

        calc.minus = function(n) {
            this.currNum -= n;
            return this;
        }

        calc.times = function(n) {
            this.currNum *= n;
            return this;
        }

        calc.divide = function(n) {
            this.currNum /= n;
            return this;
        }

        calc.clear = function() {
            this.currNum = 0;
            return this;
        }

        return calc;
    };

    // Return your constructed object
    return c;
})();
