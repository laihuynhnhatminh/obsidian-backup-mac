<span class="mcl-back-button">[[Technology/Programming Framework/React/index|← React]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


## What is Virtual DOM?

Virtual DOM is just JavaScript objects. It's a representation of the actual DOM.

```
// Virtual DOM is just JavaScript objects
const virtualElement = {
  type: "div",
  props: { className: "container" },
  children: [
    {
      type: "span",
      props: { children: "Hello" },
    },
  ],
};

// Real DOM is actual browser APIs
const realElement = document.createElement("div");
realElement.className = "container";
```

### Different platforms

By having a virtual DOM, React isn't tied to the browser's DOM.

This means React can render to different platforms.

That's why React Native exists and works. Mobile apps are not using the browser's DOM hehe...

Just pseudo code for our enlightenment:

```
// React can render to different targets
function render(virtualElement) {
  switch (environment) {
    case "web":
      return renderToDOM(virtualElement);
    case "mobile":
      return renderToNative(virtualElement);
    case "server":
      return renderToString(virtualElement);
  }
}
```

### Batching updates

As we discussed before, React re renders the entire component (including its children) whenever a state update happens.

This means when state updates happen, it could result in a lot of DOM changes in the end.

With Virtual DOM, React can batch these updates. It can figure out all the changes that it needs to do, and apply them in a single pass when the commit phase is executed.

```
// Without Virtual DOM
state.change1(); // DOM update
state.change2(); // DOM update
state.change3(); // DOM update

// With Virtual DOM
state.change1(); // Update virtual tree
state.change2(); // Update virtual tree
state.change3(); // Update virtual tree
// One single DOM update at the end!
```

