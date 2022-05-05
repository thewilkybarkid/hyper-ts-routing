/**
 * @since 0.1.0
 */
import * as R from 'fp-ts-routing'
import * as E from 'fp-ts/Either'
import * as T from 'fp-ts/Tuple'
import { Lazy, flow } from 'fp-ts/function'
import { Connection, StatusOpen } from 'hyper-ts'
import * as M from 'hyper-ts/lib/Middleware'

import Middleware = M.Middleware
import Parser = R.Parser

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Returns a middleware that tries to route the request.
 *
 * @category constructors
 * @since 0.1.0
 */
export function route<I = StatusOpen, E = never, A = never>(
  parser: Parser<A>,
  onNone: Lazy<E>,
): Middleware<I, I, E, A> {
  return M.fromConnection(flow(routeFromConnection, E.fromOptionK(onNone)(parser.run), E.map(T.fst)))
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

function routeFromConnection<I>(c: Connection<I>) {
  return R.Route.parse(c.getOriginalUrl())
}
