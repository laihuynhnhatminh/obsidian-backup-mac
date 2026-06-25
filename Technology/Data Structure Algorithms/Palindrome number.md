<span class="mcl-back-button">[[Technology/Data Structure Algorithms/index|← Data Structure Algorithms]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


#algorithm #fundamental #skills #typescript 

https://leetcode.com/problems/palindrome-number/

Given an integer `x`, return `true` if the number is a palindrome number and `false` otherwise.

My understanding of the question: Check if the number is palindrome or not? So what is a palindrome number?

```ts
Input = 121;
Output = true;
```
Why? because the reserve order of the number on the `Input` would return the exact same number. Some examples:
```ts
Input: 1234321; <= Is palindrome number;
Input: 1234; <= Reverse is 4321, different from the original input.
```

So how did I go around dealing with this?

My first idea is to change the number into a string then split them to 2 array. 1 in the original order, the other a reversed order of string array. And then we compare them using `every` method from Javascript array. This actually some how has the speed complexity of O(x) so it is very fast.

My resolution:

```ts
function isPalindrome(x: number): boolean {
    if (x < 0) return false;
    
    const a2 = x.toString().split('').reverse();
    return x.toString().split('').every((v, i) => v === a2[i]);
};
```

Other people solution. I think this one is the most fun and easy to understand answer compare to mind. I replicate it by reading their explaination and do the code again myself. Hence this answer.

```ts
function isPalindrome(x: number): boolean {
// Save the original number;
    let num = x;
// Negative number are always false;   
    if (num < 0) return false;
// Starting with the answer
// We remove the last digit of the original number and add them to the answer
// The loop run until the original number `x` is 0; (1 / 10 would return 0);
// How the loop work;
// x = 121;
// x % 10 = 1 (remainder);
// we add the remainder to ans so ans = 1;
// and we remove the last digit of `x` => x = 12;
// continue with the next one
// x % 10 = 2 (remainder);
// ans = 1 * 10 + 2 = 12;
// continue with the next one;
// x % 10 = 1 (remainder);
// ans = 12 * 10 + 1 = 121;
// ans === sum or not return true or false;


    let ans = 0;
    while(x > 0) {
        const remainder = x % 10;
        ans = ans * 10 + remainder;
        x = Math.floor(x / 10);
    }

    return ans === num;
};
```