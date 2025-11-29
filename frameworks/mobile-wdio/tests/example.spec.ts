describe("Mobile App test", () => {
  it("should open the app", async () => {
    const el = await $("~Login");
    await el.waitForExist();
  });
});
