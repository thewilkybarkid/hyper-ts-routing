---
title: index.ts
nav_order: 1
parent: Modules
---

## index overview

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [route](#route)

---

# constructors

## route

Returns a middleware that tries to route the request.

**Signature**

```ts
export declare function route<I = StatusOpen, E = never, A = never>(
  parser: Parser<A>,
  onNone: Lazy<E>
): Middleware<I, I, E, A>
```

Added in v0.1.0
