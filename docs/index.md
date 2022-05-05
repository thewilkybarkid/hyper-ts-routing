---
title: Home
nav_order: 1
---

A [hyper-ts] middleware for [fp-ts-routing].

# Example

```ts
import express from 'express'
import * as R from 'fp-ts-routing'
import { flow, pipe } from 'fp-ts/function'
import * as H from 'hyper-ts'
import { route } from 'hyper-ts-routing'
import * as M from 'hyper-ts/lib/Middleware'
import { toRequestHandler } from 'hyper-ts/lib/express'

const user = R.lit('user').then(R.str('user_id')).then(R.end)

const router = user.parser.map(({ user_id }) => `Hello ${user_id}`)

const app = pipe(
  route(router, () => 'Not found'),
  M.ichainFirst(() => M.status(H.Status.OK)),
  M.orElseW(
    flow(
      M.right,
      M.ichainFirst(() => M.status(H.Status.NotFound)),
    ),
  ),
  M.ichainFirst(() => M.closeHeaders()),
  M.ichain(M.send),
)

express().use(toRequestHandler(app)).listen(3000)

/*
- Request to http://localhost:3000/user/some-user sees 'Hello some-user'
- Request to http://localhost:3000/user/ sees 'Not found'
*/
```

[fp-ts-routing]: https://gcanti.github.io/fp-ts-routing/
[hyper-ts]: https://denisfrezzato.github.io/hyper-ts/
