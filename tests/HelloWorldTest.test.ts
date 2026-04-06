import { describe, it, expect } from "vitest";
import { helloWorld } from "../apps/api/src/HelloWorldTest.js";

// @sdoc[REQ-HW-001]
describe("HelloWorldTest", () => {
  it('should return "Hello, World!"', () => {
    expect(helloWorld()).toBe("Hello, World!");
  });
});
// @sdoc[/REQ-HW-001]
