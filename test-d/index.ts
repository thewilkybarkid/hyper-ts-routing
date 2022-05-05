import { expectTypeOf } from 'expect-type'
import * as R from 'fp-ts-routing'
import { Lazy, pipe } from 'fp-ts/function'
import { BodyOpen, HeadersOpen, StatusOpen } from 'hyper-ts'
import * as M from 'hyper-ts/lib/Middleware'
import * as _ from '../src'

import Middleware = M.Middleware
import Parser = R.Parser

declare const lazyN: Lazy<number>
declare const lazyS: Lazy<string>
declare const middleware: Middleware<HeadersOpen, BodyOpen, Error, boolean>
declare const parserN: Parser<number>
declare const parserS: Parser<string>

//
// route
//

expectTypeOf(_.route(parserN, lazyS)).toMatchTypeOf<Middleware<StatusOpen, StatusOpen, string, number>>()
expectTypeOf(_.route(parserS, lazyN)).toMatchTypeOf<Middleware<StatusOpen, StatusOpen, number, string>>()
expectTypeOf(
  pipe(
    middleware,
    M.ichainW(() => _.route(parserN, lazyS)),
  ),
).toMatchTypeOf<Middleware<HeadersOpen, BodyOpen, Error | string, number>>()
