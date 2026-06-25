<span class="mcl-back-button">[[Technology/To Be Clean Up/Interview/index|← Interview]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


#basic #javascript #react #frontend #fresher #backend #oop
# 1. Language
### Typescript/Javascript

#### - Javascript
- Hoisting

- Event loop

- Closure
-> A function **remembers the variables from the place where it was created**, even after that outer function has finished running.

```js
function outer() {
  let count = 0

  function inner() {
    count++
    console.log(count)
  }

  return inner
}

const counter = outer()

counter() // 1
counter() // 2
counter() // 3
```

- Scope
	- Global scope
	- Block scope
	- Function scope
	- Module scope

- Truthy/Falsy vs True/False
 -> True/False value are actual boolean value
 -> Truthy/Falsy behave somewhat the same but not entirely the same as Boolean but within JS it is treated as.
 
```javascript
// Falsy

false  
0  
-0  
0n  
""  
null  
undefined  
NaN
```

- Class - OOP application in Javascript

```js
Inheritance
Polymorphism
Abstraction
Encapsulation
```

- Promise -> What is a promise
	- Callback
		- Handle asynchronously -> Trigger the original promise (resolve, reject) -> handle async for `.then` or `.catch` or `.finally`
	- Try Catch
		- Handle code in a more synchronous way, It will await the promise to finished it resolve, reject then continue the function afterward in order.
- Loop in JS
	- For in, For of, While
	- Loop method in array.
- Array: Transformation (reduce, flat, at, etc...)
- Object
#### - Typescript

- Type vs Interface
- Type casting.
- Composition usage.
- Union type, discriminated union.

- Advanced usage
	- null -> declare the value of variable is empty
	- undefined -> declare the variable is initialized but no value is assigned to it.
	- Pick, Omit, Include, Exclude
	- Readonly, Partial
- Customize Generic Type that transform type

### HTML

 - HTML sematic
	- What are the element on HTML -> div,  table, article, span, button. -> Can go further into this
	- HTML5 new element -> audio
	- Basic DOM explanation -> Tree like dom, how it work
	- SEO
	- Shadow dom
### CSS

- CSS priority order
	- Which apply first?  Important -> inline styles -> id -> class -> element -> last applied class override the first one
	- CSS minify. Why not bootstrap, why use tailwind
	- CSS with darkmode, how does it work. How would you implement it
	- CSS debugging - environment
- CSS Layout Design
	- Flex -> Why? 2D
	- Grid -> Why? 3D
- BEM naming method for CSS -> 

```css
.card {}  
  
.card__title {}  
.card__title-info {}  
  
.card__content {}  
  
.card__footer {}  
.card__icon {}
```
- Responsive -> how and why
- CSS pseudo class

# 2. Framework

### React - NextJS

##### React

- Basic
	- Life cycle
	- Hooks in general
	- Fetching in React
	- Re rendering
	- State Management
	- Global State Management
	- Optimization

- Advance
	- `forwardRef` -> state lifting
	- why `useRef` does not make state changes
	- Higher order Component  -> What, how to use and why using it. -> `A HOC is a function that takes a component and returns a new component with extra behavior.`
	- Custom hooks

##### NextJS


- Basic
	- CSR, SSR, ISR, SSG.
	- Hydration
	- Server action
	- Middleware (Proxy)
	- directive 'use client'
	- Routes
	- SEO
- Advance
	- Caching with intention.
	- Optimization for web
	- Why use NextJS if React can do all of this. (including RSC - React server component)
	- directive 'server-only' -> although custom/npm but it is very important

### Tailwind

- Basic
	- Why use Tailwind
	- What is tailwind
	- Trade off compare to traditional CSS
- Advance
	- Token exchanges.
	- Non-existing behavior compare to css

### State Management with Library (NPM):

- Zustand
- Redux
- Atom
- xState

### Writing your own component library vs Shadcn 

# 3. Concept

### OOP

### Composition

# 4. Personality


### TOPIC

- Template topic
	- Template question


```
nextSteps: { hasNextSteps: {{ nextStepSwitch.value }}, hasApplicationForm: {{ formApplicationSwitch.value }} , documents: {{ selected_document_templates.value.documents }}  }
purchaseDetails: { firstName: {{ selected_offers.value.purchase_details.first_name }}, loanType: {{ selected_offers.value.purchase_details.loan_type }}, buildModel: {{ selected_offers.value.purchase_details.build_model }}, depositAmount: {{ selected_offers.value.purchase_details.deposit_amount }}, purchasePrice: {{ selected_offers.value.purchase_details.purchase_price }} }
```