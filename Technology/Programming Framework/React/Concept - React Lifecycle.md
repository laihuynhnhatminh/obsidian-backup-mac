<span class="mcl-back-button">[[Technology/Programming Framework/React/index|← React]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


---
created:
  - 2025-01-13
tags:
  - react
  - react-concept
  - browser
  - react-lifecycle
  - rendering
  - react-ref
---
```cardlink
url: https://www.frontendjoy.com/p/react-lifecycle-in-3-minutes?ref=dailydev
title: "✨ React Lifecycle in 3 Minutes"
description: "How React Components Live, Update, and Die"
host: www.frontendjoy.com
favicon: https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/publication/logo/bfa5571b-1050-49e1-bab0-61337cfe7458/thumb_favicon.png
image: https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/72d075ab-8ea2-445c-ab25-ab0737ec5454/how_to_level_up_your_frontend_skills__10_.png?t=1735566574
```

```cardlink
url: https://tigerabrodi.blog/how-reacts-render-effects-and-refs-work-under-the-hood?ref=dailydev
title: "How React's Render, Effects and Refs work under the hood"
description: "Never be confused again and write better React code."
host: tigerabrodi.blog
favicon: https://cdn.hashnode.com/res/hashnode/image/upload/v1662613838563/5t5Y81yiX.png?auto=compress,format&format=webp&fm=png
image: https://hashnode.com/utility/r?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1736276366480%2F861da69e-5f06-48d8-912a-6f1119eb822a.webp%3Fw%3D1200%26h%3D630%26fit%3Dcrop%26crop%3Dentropy%26auto%3Dcompress%2Cformat%26format%3Dwebp%26fm%3Dpng
```

## 1. What is useRef - ref

- [[React - useRef - ref]]
## 2. What is useLayoutEffect

- [[React - useEffect - useLayoutEffect]]
## 3. What is useEffect

- [[React - useEffect - useLayoutEffect]]

## 4. Virtual Dom

- [[Concept - Virtual Dom]]
## 5. Render life cycle

## What Is the React Component Lifecycle?

This process is known as the component lifecycle, which has three main phases:

- **Mounting**: React creates the component and adds it to the DOM.
    
- **Updating**: The component changes in response to state changes.
    
- **Unmounting**: React removes the component and cleans up resources.

Each phase includes specific steps React performs to optimize rendering and manage resources.
## Why Do You Need To Understand React Component Lifecycle?

Understanding the React lifecycle helps you:

- Write better effects with `useEffect` and `useLayoutEffect`.
    
- Avoid inefficiencies, like setting state inside `useEffect`.
    
- Prevent memory leaks by cleaning up.
    
- Optimize performance and avoid unnecessary re-renders.

![[react-lifecycle.png|800]]

### 1. Mounting: When a Component Is First Rendered

Mounting occurs when React adds (mounts) a component to the screen.

**What triggers mounting?**

- When you call `root.render(<MyComponent />)`
    
- When React adds a component to the JSX tree and re-renders its parent to include the new component.
    

**What happens during mounting?**

1. **Render:** React calls the component function (or `render` method in class components) to create React elements. React also initializes hooks.
    
2. **Insert DOM Nodes:** React updates the real DOM with the new elements. This step happens during the **commit phase** when React applies changes to the DOM.
    
3. **Set DOM Refs:** If you use `useRef`, React sets references to the DOM nodes.
    
4. **Run useLayoutEffect:** React runs the `useLayoutEffect` functions. Changes made here won't cause visible flickering since the change will occur before the user sees any visual changes (which happen during painting).
    
5. **DOM Paint:** The browser paints the updated UI.
    
6. **Run useEffect:** Finally, React runs the `useEffect` functions.
    

### 2. **Updating: When a Component Re-Renders**

Updating happens when React re-renders a component to reflect changes.

**What triggers updating?**

- A state update
    
- An updated context value
    
- A parent component re-rendering (if the component wasn't memoized)
    
- Etc.
    

**What happens during updating?**

1. **Re-render:** React recalculates the component's output.
    
2. **Reconciliation:** React compares the new React tree with the previous one to determine changes.
    
3. **Commit Changes:** React updates the DOM with the changes.
    
4. **Unset DOM Refs:** React nullifies `ref.current` and calls **non-stable** ref callbacks with `null` if the referenced DOM node is removed or replaced during the update.
    
5. **Cleanup useLayoutEffect:** React runs cleanup functions from the previous `useLayoutEffect`.
    
6. **Set DOM Refs:** React sets new ref values for the updated DOM elements (like in the mounting phase).
    
7. **Run useLayoutEffect:** React calls `useLayoutEffect` hooks, like in the mounting phase (if its dependencies have changed according to [Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is?utm_source=www.frontendjoy.com&utm_medium=referral&utm_campaign=react-lifecycle-in-3-minutes)).
    
8. **Paint the DOM:** The browser updates the UI to reflect changes.
    
9. **Cleanup useEffect:** Cleanup functions from the previous `useEffect` run to prevent memory leaks.
    
10. **Run useEffect:** React runs the updated `useEffect` function (if its dependencies have changed according to [Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is?utm_source=www.frontendjoy.com&utm_medium=referral&utm_campaign=react-lifecycle-in-3-minutes)).
    

### 3. Unmounting: When React Removes a Component

Unmounting occurs when React removes a component from the DOM, freeing resources.

**What triggers unmounting?**

- The component is no longer part of the JSX tree
    
- React unmounts its parent.
    
- The component’s key changed (React will unmount the old instance and mount a new one.).
    
- Etc.
    

**What happens during unmounting?**

- **Run Cleanup Functions:** React runs cleanup functions defined in `useEffect` and `useLayoutEffect`.
    
- **Unset DOM Refs:** React nullifies `ref.current` and calls ref callbacks with `null`.
    
- **Remove DOM Nodes:** React removes the DOM nodes associated with the element.


## 6. Explanation in Code

# Render phase

Let's finally talk about the render phase.

This is the first phase of the render cycle.

One thing that annoys me sometimes when learning is all the terminologies people try to use.

We can also call this the "first step" of going from state change to DOM change.

Let's look at some pseudo code:

```ts
// RENDER PHASE
function renderPhase(newState) {
  // 1. React creates/updates Virtual DOM by calling components
  function handleStateUpdate() {
    // Create new Virtual DOM tree
    const newVirtualDOM = {
      type: "div",
      props: { className: "app" },
      children: [
        {
          type: "span",
          props: { children: newState },
        },
      ],
    };

    // 2. Reconciliation (Diffing)
    // React compares new Virtual DOM with previous one
    // Figures out what needs to change in real DOM
    const changes = diff(previousVirtualDOM, newVirtualDOM);
    // Results in a list of required DOM operations
    // [{type: 'UPDATE', path: 'span/textContent', value: newState}]
  }
}
```

1. With new state, React creates a new Virtual DOM tree.
    
2. React uses this new Virtual DOM tree to figure out what changes need to be made to the actual DOM.
    
3. It does so by comparing the new Virtual DOM tree with the previous one.
    

Now React knows exactly the changes that need to be made and we don't need to update the full DOM every time a state update happens.

Now, you might think updating the full DOM would be very expensive. The real answer he is that **"it could be"**. It depends on what you're building. It can also be good enough. So we can't say for sure that it would be VERY expensive (this is just me thinking very thoroughly, carefully and from first principles here).

# Commit phase

Ok. Now we know what changes we need to do.

The commit phase is often summarized as "React updates the DOM". But it's a bit deeper than that.

PS! If you're not familiar with the event loop, I recommend reading up on it before continuing. I've a [free advanced JS book](https://github.com/tigerabrodi/intermediate-to-advanced-js-book/). Chapters 12, 13 and 14 are relevant if you wanna learn more about the event loop. MDN and Youtube are also good resources.

Let's look at some pseudo code:

```ts
// 1. React's Commit Phase (Synchronous JavaScript)
// This runs on the main thread
function commitToDOM() {
 // React calls DOM APIs
 // Each call gets added to the call stack
 mutateDOM() {
   document.createElement()
   element.setAttribute()
   element.appendChild()
   // ...
 }

 // remember useLayoutEffect?
 // Now we'll run all the layout effects
 // this is synchronous
 // the code in here gets added to the call stack too
 runLayoutEffects()

 // Queue useEffect for later
 queueMicrotask(() => {
   runEffects()
 })
}

// commitToDOM() is done - time for browser to work

// 2. Browser's Work
// - Calculate Layout
// - Paint
// - Composite

// 3. Microtask Queue
// Now useEffect runs
```

Now, how browsers work is out of scope for this post. But that is super interesting. It's on my list of things to learn in 2025. I so badly wanna explore it deeply lmao. I've done some research on it where I dug into hidden classes and stuff. Let's go over those points quickly, then get back to the topic:

- **Calculating layout:** Browser calculates exact positions and sizes.
    
- **Paint:** Browser converts layout results into visual pixels.
    
- **Composite:** Browser combines layers into final screen image.
    

---

The first thing: Because we now know the updates we need to make, we run synchronous JavaScript code (`mutateDOM()`).

If we just look at this small snippet to get a feel for the event loop:

```ts
function mutateDOM() {
  document.createElement();
  element.setAttribute();
  element.appendChild();
}

mutateDOM();
```

Every call gets added to the call stack. Then the browser clears it from top to bottom.

```ts
1. element.appendChild()
2. element.setAttribute()
3. document.createElement()
4. mutateDOM()
```

A stack is a LIFO (Last In First Out) data structure.

---

When we run the layout effects, we're running synchronous JavaScript code. The function call and the ones it contains get added to the call stack. Now, if you've been following along closely, you understand that every time layout effects' dependencies change, they will run again. This MEANS more synchronous code to go through before the browser can do its thing (which is why React recommends to be careful with `useLayoutEffect`).

I'm trying to go through everything in detail and relate to practical points along the way for us to really understand this.

---

We then run the normal effects. These are queued up with `queueMicrotask()` in our example. HOWEVER, in actuality, React uses its own scheduling system. But I think it helps to view it as a microtask queue to sort of understand the basics.

When the browser does its thing, it's gonna first clear the entire call stack before it runs anything from the microtask queue. Then it runs the microtask queue.

Now we've covered everything except the refs.

# Refs

Now, React 19 is out.

I don't plan on diving into the details of that, I'll do it in an upcoming blog post.

Aye. Let's focus on the refs from the original snippet.

```ts
const divRef = useRef<HTMLDivElement>(null);
```

This ref is created during the render phase. It starts as null because the DOM element doesn't exist during the first render. It gets its actual value after React commits the changes to the DOM. **But you can't know exactly when this happens just by using useRef alone.**

That's why you always need to check if the ref is null before you use it.

```ts
if (divRef.current) {
  console.log(divRef.current.getBoundingClientRect());
}
```

---

What happens when you use a callback ref?

```ts
const handleRef = (node: HTMLDivElement | null) => {
  if (node) {
    console.log("Callback ref:", node.getBoundingClientRect());
  }
};
```

Called immediately when the element is attached to the DOM. You can be 100% sure that the callback ref will run at the right time. It is null when the element is removed in case you need to clean up. It runs before useLayoutEffect. It's best for immediate DOM measurements or setup.

# I need to get dimensions of an element... when is the best time to do this?

Let's say you need to know how to position a tooltip:

```ts
function Tooltip({ text, targetRef }) {
  const tooltipRef = useRef(null);

  // Wrong: Might cause flicker
  // Why?
  // Because this happens after the DOM is painted
  // You will tooltip in its original position
  // Then it flickers when this runs
  useEffect(() => {
    const targetRect = targetRef.current.getBoundingClientRect();
    tooltipRef.current.style.top = `${targetRect.bottom}px`;
  }, []);

  // Better: No flicker
  // Why?
  // Because this happens before the DOM is painted
  // You will see the tooltip in its final position
  useLayoutEffect(() => {
    const targetRect = targetRef.current.getBoundingClientRect();
    tooltipRef.current.style.top = `${targetRect.bottom}px`;
  }, []);

  // Best: Most direct
  // Why?
  // Because this happens immediately after the DOM is attached (layout effect happens AFTER the DOM is attached)
  const handleRef = (node) => {
    if (node) {
      const targetRect = targetRef.current.getBoundingClientRect();
      node.style.top = `${targetRect.bottom}px`;
    }
  };

  return <div ref={handleRef}>{text}</div>;
}
```

# When do cleanup functions run?

After a render, right BEFORE React runs the effect (useEffect or useLayoutEffect, only if dependencies changed), it runs the cleanup functions with the previous values. Then it runs the new effect with the new values. Or of course if the component unmounts.