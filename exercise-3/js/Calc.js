window.Calc = (function() {
    var c = function(num) {
        var calc = {};
        calc.currNum = num;

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

    return c;
})();
