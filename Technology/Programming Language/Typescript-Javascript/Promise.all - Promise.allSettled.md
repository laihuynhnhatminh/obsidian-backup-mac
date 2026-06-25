<span class="mcl-back-button">[[Technology/Programming Language/Typescript-Javascript/index|← Typescript-Javascript]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


---
created:
  - 2025-01-13
tags:
  - javascript
  - typescript
  - promise
  - programming
aliases:
  - Understanding Promise.all usage
---
### 1. About Promise.all()

```cardlink
url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
title: "Promise.all() - JavaScript | MDN"
description: "The Promise.all() static method takes an iterable of promises as input and returns a single Promise. This returned promise fulfills when all of the input's promises fulfill (including when an empty iterable is passed), with an array of the fulfillment values. It rejects when any of the input's promises rejects, with this first rejection reason."
host: developer.mozilla.org
favicon: https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png
image: https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png
```

- The **`Promise.all()`** static method takes an iterable of promises as input and returns a single [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). This returned promise fulfills when all of the input's promises fulfill (including when an empty iterable is passed), with an array of the fulfillment values. It rejects when any of the input's promises rejects, with this first rejection reason.

```ts
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
// Expected output: Array [3, 42, "foo"]****
```

### 2. About Promise.allSettled()

- The **`Promise.allSettled()`** static method takes an iterable of promises as input and returns a single [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). This returned promise fulfills when all of the input's promises settle (including when an empty iterable is passed), with an array of objects that describe the outcome of each promise.

```cardlink
url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
title: "Promise.allSettled() - JavaScript | MDN"
description: "The Promise.allSettled() static method takes an iterable of promises as input and returns a single Promise. This returned promise fulfills when all of the input's promises settle (including when an empty iterable is passed), with an array of objects that describe the outcome of each promise."
host: developer.mozilla.org
favicon: https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png
image: https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png
```

```ts
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) =>
  setTimeout(reject, 100, 'foo'),
);
const promises = [promise1, promise2];

Promise.allSettled(promises).then((results) =>
  results.forEach((result) => console.log(result.status)),
);

// Expected output:
// "fulfilled"
// "rejected"
```

### 3. Explanation

```cardlink
url: https://tigerabrodi.blog/i-misunderstood-promiseall-in-javascript
title: "I misunderstood Promise.all in JavaScript"
description: "My misunderstanding of Promise.allFor a long time I thought Promise.all was used to fire and run promises concurrently.Every time I encountered code that used two awaits, I always proposed using Promise.all instead. Now, this still holds true, but ..."
host: tigerabrodi.blog
favicon: https://cdn.hashnode.com/res/hashnode/image/upload/v1662613838563/5t5Y81yiX.png?auto=compress,format&format=webp&fm=png
image: https://hashnode.com/utility/r?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1734774089255%2F3311bb54-c85c-425e-b580-b870cb9ac087.avif%3Fw%3D1200%26h%3D630%26fit%3Dcrop%26crop%3Dentropy%26auto%3Dcompress%2Cformat%26format%3Dwebp%26fm%3Dpng
```

- `Promise.all()` is a method that observe the Promise rather than calling the Promise to resolve it again. Hence it waited for the Promise to resolve/reject and deal with them. If `rejected` the Promise.all ended and throw an error/exception
- `Promise.allSettled()` is similar but it will wait for all Promise to finish `reject/resolve` rather than ending the observation and throw an exception upon an error.
- Given these 2 method only observing the Promise. If you resolve a promise before hand and use `Promise.all()` again, it will not call the `Promise.resolve()` again but rather take the resolve/reject of the promise and just return then instantly.
- Hence these use case:

```ts
const firstPromise = await someFunction();
const secondPromise = await someOtherFunction();

// Don't need to wait anymore since the promises are already resolved
const [
  firstPromiseResultFromSomeFunction,
  secondPromiseResultFromSomeOtherFunction,
] = await Promise.all([firstPromise, secondPromise]);

// Don't need to wait anymore since the promises are already resolved
const [
  firstPromiseResultFromSomeFunction2,
  secondPromiseResultFromSomeOtherFunction2,
] = await Promise.all([firstPromise, secondPromise]);
```

```ts
const firstPromise = somePromise();
const secondPromise = someOtherPromise();

// Will wait for all Promises to resolve/reject and handle it from there.
const [
  firstPromiseResultFromSomeFunction,
  secondPromiseResultFromSomeOtherFunction,
] = await Promise.all([somePromise, someOtherPromise]);

// Don't need to wait anymore since the promises are already resolved
const [
  firstPromiseResultFromSomeFunction2,
  secondPromiseResultFromSomeOtherFunction2,
] = await Promise.all([somePromise, someOtherPromise]);
```

- Real life use case for debug on a `Promise.all()`, this would still perform as fast just running pure `Promise.all()` alone, but with the addition `Promise.allSettled()`, it helped with debugging which API or function failed to help us debug more efficiently

```ts
const operations = [
  { name: "fetchUserInfo", promise: fetchUserInfo() },
  { name: "fetchPreferences", promise: fetchUserPreferences() },
  { name: "calculateMetrics", promise: calculateMetrics() },
];

// results looks like -> [{status: 'fulfilled', value: ...}, {status: 'fulfilled', value: ...}, {status: 'rejected', reason: ...}]
const results = await Promise.allSettled(operations.map((op) => op.promise));

results.forEach((result, index) => {
  if (result.status === "rejected") {
    // logger -> e.g. datadog, sentry, etc
    logger.error({
      // operation -> e.g. fetchUserInfo
      operation: operations[index].name,
      // error -> e.g. Error: Failed to fetch user info
      error: result.reason,

      // You can include more fields here if you need
      // ...
    });
  }
});

return await Promise.all(operations.map((op) => op.promise));
```