# Calc.js API Reference

The world's smallest JavaScript calculator library (probably).

***Your Task:***

You should include a block of JavaScript code showing how to use your library. Additionally you should provide a function reference for each function in the Calc library. The first one has been done for you so you have a good idea of how it should be formatted.

The functions you should implement and document are as follows:

- Calc(number)
- Calc.getVal()
- Calc.plus(number)
- Calc.minus(number)
- Calc.times(number)
- Calc.divide(number)
- Calc.clear()



## Usage

```
var c1 = Calc(2);
var c2 = Calc(10);

c1.add(6);

c2.minus(1);

c1.divide(2);


console.log(c1.getVal()) // Prints 4
console.log(c2.getVal()) // Prints 9
```

## API Functions



\# *Calc*(number)

> Constructs a Calc object with the current value set to `number`

\# *Calc*.**getVal**()
> Returns the current value stored by the calc instance.

\# *Calc*.**plus**(number)
> Sets the current value of the calc instance to the current value plus `number` and returns that calc instance.

\# *Calc*.**minus**(number)
> Sets the current value of the calc instance to the current value minus `number` and returns that calc instance.


\# *Calc*.**times**(number)
> Sets the current value of the calc instance to the current value times `number` and returns that calc instance.

\# *Calc*.**divide**(number)
> Sets the current value of the calc instance to the current value divided by `number` and returns that calc instance.

\# *Calc*.**clear**()
> Sets the current value of the calc instance to 0
