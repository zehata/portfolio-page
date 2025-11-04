import { isValidUuid } from "@/lib/isValidUuid";

describe(isValidUuid, () => {
  test("check valid uuid4", () => {
    expect(isValidUuid("38ab6e57-4290-4820-a834-61dfb5c86623")).toBeTruthy();
  });

  test("check invalid uuid4 length", () => {
    expect(isValidUuid("38ab6e57-4290-4820-a834-61dfb5c8662")).toBeFalsy();
  });

  test("check invalid uuid4 character", () => {
    expect(isValidUuid("g8ab6e57-4290-4820-a834-61dfb5c86623")).toBeFalsy();
  });
});
