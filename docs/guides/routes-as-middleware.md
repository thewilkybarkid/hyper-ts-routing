---
title: Route as middleware
nav_order: 1
parent: Guides
---

# Routes as middleware

Route handlers can be hyper-ts middleware if [`M.iflatten`] is used immediately after [`route`], as this removes the nesting.

## Example

```ts
import express from 'express'
import * as R from 'fp-ts-routing'
import { pipe } from 'fp-ts/function'
import * as H from 'hyper-ts'
import { route } from 'hyper-ts-routing'
import * as M from 'hyper-ts/lib/Middleware'
import { toRequestHandler } from 'hyper-ts/lib/express'

const user = R.lit('user').then(R.str('user_id')).then(R.end)

const userHandler = (userId: string) =>
  pipe(
    M.status(H.Status.OK),
    M.ichainFirst(() => M.closeHeaders()),
    M.ichain(() => M.send(`Hello ${userId}`)),
  )

const notFoundHandler = pipe(
  M.status(H.Status.NotFound),
  M.ichain(() => M.closeHeaders()),
  M.ichain(() => M.send('Not found')),
)

const router = user.parser.map(({ user_id }) => userHandler(user_id))

const app = pipe(
  route(router, () => 'Not found'),
  M.iflatten,
  M.orElse(() => notFoundHandler),
)

express().use(toRequestHandler(app)).listen(3000)

/*
- Request to http://localhost:3000/user/some-user sees 'Hello some-user'
- Request to http://localhost:3000/user/ sees 'Not found'
*/
```

[`m.iflatten`]: https://denisfrezzato.github.io/hyper-ts/modules/Middleware.ts.html#iflatten
[`route`]: ../modules/index.ts.md#route
