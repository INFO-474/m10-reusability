# Calc.js API Reference

The world's smallest JavaScript calculator library (probably).

## Usage

```javascript
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
