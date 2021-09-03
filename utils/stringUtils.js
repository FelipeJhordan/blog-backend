const bcrypt = require("bcrypt")
module.exports = {
    cryptString: async (pass) =>  await bcrypt.hashSync(pass, 14),
    compareCryptString: async (pass, passBd) => {
        const match = await bcrypt.compareSync(pass, passBd)
        return match
    },
    delAccentsRegex:  (string) => {
        return string
            .split(" ")
            .map((str)=>  str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Zs]/g, ""))
            .filter((str) => str !== "")
            .join("-")
    }
}