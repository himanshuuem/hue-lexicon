import { test } from "node:test";
import assert from "node:assert/strict";
import { contrastRatio, hexToRgb, readableTextColor } from "./contrast.js";

test("hexToRgb parses six-digit hex", () => {
  assert.deepEqual(hexToRgb("#1D4ED8"), [29, 78, 216]);
});

test("hexToRgb rejects malformed input", () => {
  assert.throws(() => hexToRgb("#abc"), /Invalid hex/);
});

test("black on white is 21:1", () => {
  assert.equal(contrastRatio("#000000", "#ffffff").toFixed(0), "21");
});

test("readableTextColor picks the stronger contrast", () => {
  assert.equal(readableTextColor("#111111"), "#ffffff");
  assert.equal(readableTextColor("#F8F4E3"), "#000000");
});
