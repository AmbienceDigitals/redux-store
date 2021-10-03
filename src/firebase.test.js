const rewire = require("rewire")
const firebase = rewire("./firebase")
const sendPasswordResetEmail = firebase.__get__("sendPasswordResetEmail")
// @ponicode
describe("sendPasswordResetEmail", () => {
    test("0", async () => {
        await sendPasswordResetEmail("user1+user2@mycompany.com")
    })

    test("1", async () => {
        await sendPasswordResetEmail("something@example.com")
    })

    test("2", async () => {
        await sendPasswordResetEmail("bed-free@tutanota.de")
    })

    test("3", async () => {
        await sendPasswordResetEmail("ponicode.com")
    })

    test("4", async () => {
        await sendPasswordResetEmail("email@Google.com")
    })

    test("5", async () => {
        await sendPasswordResetEmail(undefined)
    })
})
