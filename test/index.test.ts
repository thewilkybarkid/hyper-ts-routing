import * as R from 'fp-ts-routing'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import * as _ from '../src'
import * as fc from './fc'

describe('hyper-ts-routing', () => {
  describe('constructors', () => {
    describe('route', () => {
      test('when the parser returns a some', async () => {
        await fc.assert(
          fc.asyncProperty(
            fc.connection(),
            fc.anything(),
            fc.route(),
            fc.anything(),
            async (connection, value, route, onNone) => {
              const parser = new R.Parser(() => O.some([value, route]))

              const actual = await pipe(
                connection,
                _.route(parser, () => onNone),
              )()

              expect(actual).toStrictEqual(E.right([value, connection]))
            },
          ),
        )
      })

      test('when the parser returns a none', async () => {
        await fc.assert(
          fc.asyncProperty(fc.connection(), fc.anything(), async (connection, onNone) => {
            const parser = new R.Parser(() => O.none)

            const actual = await pipe(
              connection,
              _.route(parser, () => onNone),
            )()

            expect(actual).toStrictEqual(E.left(onNone))
          }),
        )
      })
    })
  })
})
