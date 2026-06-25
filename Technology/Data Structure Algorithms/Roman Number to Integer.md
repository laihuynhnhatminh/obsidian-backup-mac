<span class="mcl-back-button">[[Technology/Data Structure Algorithms/index|← Data Structure Algorithms]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


#algorithm #fundamental #skills #typescript 

https://leetcode.com/problems/roman-to-integer/
## The caveman way. 

It work and work fast but does not mean that it is pretty. Just point out every possible way of the value it could return. This work due to the problem constraint `s` value will always be between `1 - 3999` making this way possible. Otherwise the switch would need to go even longer. 
A friend of mine sent me this so I tried this, it works but it looks painful. Haha

```ts
function romanToInt(s: string): number {
    let sum: number = 0;
    const stringArr = s.split("");
    
    stringArr.forEach((v, i) => {
        const singleDigit = ["V", "X"];
        const doubleDigit = ["L", "C"];
        const tripleDigit = ["D", "M"];
        const nextVal = stringArr[i + 1];
        const prevVal = stringArr[i - 1];

        switch (v) {
            case "I":
                if (singleDigit.includes(nextVal)) {
                    break;
                }
                sum += 1;
                break;

            case "V":
                if (prevVal === "I") {
                    sum += 4;
                    break;
                }

                sum += 5;
                break;

            case "X":
                if (prevVal === "I") {
                    sum += 9;
                    break;

                }

                if (doubleDigit.includes(nextVal)) {
                    break;
                }

                sum += 10;
                break;

            case "L":
                if (prevVal === "X") {
                    sum += 40;
                    break
                }

                sum += 50;
                break;

            case "C":
                if (prevVal === "X") {
                    sum += 90;
                    break;
                }

                if (tripleDigit.includes(nextVal)) {
                    break;
                }

                sum += 100;
                break;
            case "D":
                if (prevVal === "C") {
                    sum += 400;
                    break
                }

                sum += 500;
                break;

            case "M":
                if (prevVal === "C") {
                    sum += 900;
                    break
                }

                sum += 1000;
                break;
                
            default:
                break;
        }

    });

    return sum;
};
```

## My Way - a bit smarter:

```ts
function romanToInt(s: string): number {
        // Create a record of all the possible roman numbers
       const values: Record<string,number> = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    }

    return s.split('').reduce<number>((totalValue, romanNumber, index, original) => {


        // The first character's value is added to the totalValue 
        if ( index === 0) {
            return totalValue + values[romanNumber]
        } else {

            const prev = values[original[index - 1]]
            const curr = values[romanNumber];
            // We check if the current character 
            // represents a higher value than the previous 
            //( if so we need to substract the previousValue from the CurrentValue )
            if ( curr > prev ) {
                // Don't forget to also substract the previously added value, aka we need to remove the preValue 2 times
                return totalValue - prev * 2 + curr
            } else {
                return totalValue + curr;
            }
        }
    }, 0);

};
```

## Online solution:

```ts
type symbolicValueObject = {
  I: number;
  V: number;
  X: number;
  L: number;
  C: number;
  D: number;
  M: number;
};

const symbolicValue: symbolicValueObject = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

function romanToInt(s: string): number {
  const stringList = s.split("");
  let output = 0;
  let index = 0;
  while (index < stringList.length) {
    if (
      symbolicValue[stringList[index]] < symbolicValue[stringList[index + 1]]
    ) {
      output +=
        symbolicValue[stringList[index + 1]] - symbolicValue[stringList[index]];
      index++;
    } else {
      output += symbolicValue[stringList[index]];
    }
    index++;
  }
  return output;
}
```



```ts
const multipliers: { [key: string]: number } = {
  IV: 4,
  IX: 9,
  XL: 40,
  XC: 90,
  CD: 400,
  CM: 900,
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
}

const tokens = Object.keys(multipliers)

function romanToInt(s: string): number {
	function next(): string {
		for (const token of tokens) {
			if (s.startsWith(token)) {
				s = s.substr(token.length)
				return token
			}
		}

		throw new Error(`Unknown token: $(s)`)
	}

	const chars: string[] = []

	while (s.length > 0) { chars.push(next()) }

	return chars.reduce((sum, char) => {
		return sum += multipliers[char]
	}, 0)
}
```