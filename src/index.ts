/**
 * @since 0.1.0
 */
import * as R from 'fp-ts-routing'
import { Lazy } from 'fp-ts/function'
import { StatusOpen } from 'hyper-ts'
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
export declare function route<I = StatusOpen, E = never, A = never>(
  parser: Parser<A>,
  onNone: Lazy<E>,
): Middleware<I, I, E, A>
