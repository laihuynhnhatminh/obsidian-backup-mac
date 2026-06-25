<span class="mcl-back-button">[[Technology/Data Structure Algorithms/index|← Data Structure Algorithms]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


#algorithm #fundamental #skills #typescript 

[https://leetcode.com/problems/custom-sort-string/description](https://leetcode.com/problems/custom-sort-string/description)

One of my first problem in Leetcode, it is not particularly hard. Just required more thinking than I usually do and I need my note and pen to do some writing out my ideas on how to clear this.

- Level: Easy
- Technical Req: Basic knowledge of array method on how array work.

That being said, I fucked this up quite bad, my first solution was just, how do I make this work without doing all those fancy array method with sort or reduce.

What I did was I get the amount of letter of each letter of the “order” variable and then put them into a new string sequentially and replace those letter from the “s” variable with nothing so it would remove those letter from the “s” variable. Combined the new string with the same order with the remaining letter from “s” variable and we have our result.

⇒ It worked but terrible result (slow speed, memory usage all over the place due to multiple variable taking up places). I’m bad yes I know.

```tsx
function customSortString(order: string, s: string): string {
    const orderArr = order.split('');
    let sArr = s.split('');
    let string = '';
    for (let i = 0; i < orderArr.length; i++) {
        for (let j = 0; j < sArr.length; j++) {
            if (orderArr[i] === sArr[j]) {
                const numberOfSameChar = (s.match(new RegExp(orderArr[i], 'g')) || []).length;
                string += orderArr[i].repeat(numberOfSameChar);
                const newRegex = new RegExp(orderArr[i], 'g');
                s = s.replace(newRegex, '');
                sArr = s.split('');
            }
        }
    }

    return string + sArr.join('');
};

```

So after finished the challenge, I took a look at others and most of them use sort and just use the orders from the “order” variable ⇒ and sort them using the basic bubble sort. DAMN, it’s that easy? I couldn’t think of the answer but now it just popped into my head like it’s always been there.

Here is the code on how to do it. This should make it easier to understand.

```tsx
function customSortString(order: string, s: string): string {
    const orders = {};

    for (let i = 0; i < order.length; i++) {
        orders[order[i]] = i;
    }

    return s.split('').sort((a: string, b: string) => {
        return  (orders[a] || -1) - (orders[b] || -1);
    }).join('');
};
```

You can also write it like this, but it is a bit more cryptic, unless you understand JS/TS, it won’t be very simple to read. It work the same way as the 2nd solution but more compact.

```tsx
function customSortString(order: string, s: string): string {
    return s.split("").sort((a: string, b: string) => order.indexOf(a) - order.indexOf(b)).join("");
};
```

## Conclusion

I am happy with this. I did clear this challenge albeit not very good, but I try to think it through and work my way through it rather than using chatgpt. And I can understand other answer and replicate them and understand it in my own way.