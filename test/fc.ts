import { Request, Response } from 'express'
import * as fc from 'fast-check'
import { Route } from 'fp-ts-routing'
import { Connection } from 'hyper-ts'
import { ExpressConnection } from 'hyper-ts/lib/express'
import { createRequest, createResponse } from 'node-mocks-http'

export * from 'fast-check'

export const request = ({ url }: { url?: fc.Arbitrary<string> } = {}): fc.Arbitrary<Request> =>
  fc.record({ url: url ?? fc.webUrl() }).map(createRequest)

export const response = (): fc.Arbitrary<Response> => fc.record({ req: request() }).map(createResponse)

export const connection = <S>({ url }: { url?: fc.Arbitrary<string> } = {}): fc.Arbitrary<Connection<S>> =>
  fc.tuple(request({ url }), response()).map(args => new ExpressConnection(...args))

export const route = (): fc.Arbitrary<Route> =>
  fc
    .tuple(
      fc.array(fc.string()),
      fc.object({ values: [fc.string(), fc.array(fc.string()), fc.constant(undefined)] }) as fc.Arbitrary<
        Record<string, string | Array<string> | undefined>
      >,
    )
    .map(args => new Route(...args))
