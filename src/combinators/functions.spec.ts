import { expect } from "chai";
import { slow, suite, test, timeout } from "mocha-typescript";
import { TypeGuard } from "../guards";
import * as o from "../objects";
import * as p from "../primitives";
import * as c from "./functions";

interface SimpleInterface {
  str: string;
  num: number;
}

/**
 * Compilation tests for the combinator types.
 */
@suite(timeout(3000), slow(5))
export class CombinatorsSpec {
  @test public unionStringNumber() {
    const isStringOrNumber = c.isUnion(p.isNumber, p.isString);

    expect(isStringOrNumber("foo")).to.equal(true);
    expect(isStringOrNumber(5)).to.equal(true);
    expect(isStringOrNumber(null)).to.equal(false);
  }

  @test public intersectionObject() {
    const isInterface: TypeGuard<SimpleInterface> =
      c.isIntersection(o.hasProperty("str", p.isString), o.hasProperty("num", p.isNumber));

    expect(isInterface({ str: "foo", num: 10 })).to.equal(true);
    expect(isInterface({ str: "foo" })).to.equal(false);
    expect(isInterface({ num: 10 })).to.equal(false);
  }
}
