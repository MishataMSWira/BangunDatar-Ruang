import express from "express"
import { kelilingLingkaran, kelilingPersegi, kelilingPersegiPanjang, luasLingkaran, luasPersegi, luasPersegiPanjang, luasSegitiga,  } from "../controller/bangunDatar"
import * as validate from "../middleware/validateDatar"
const app = express()

/** allow read a body */
app.use(express.json())

/** fungsi use() digunakan untuk menerapkan sebuah fungsi
 * pada object express. fungsi tersebut akan otomatis 
 * dijalankan
 */


app.post(`/lingkaran/luas`, validate.validateLingkaran, luasLingkaran)
app.post(`/lingkaran/keliling`, validate.validateLingkaran,kelilingLingkaran)
app.post(`/persegi/luas`, validate.validatePersegi,luasPersegi)
app.post(`/persegi/keliling`, validate.validatePersegi,kelilingPersegi)
app.post(`/persegipanjang/luas`, validate.validatePersegiPanjang,luasPersegiPanjang)
app.post(`/persegipanjang/keliling`, validate.validatePersegiPanjang,kelilingPersegiPanjang)
app.post(`/segitiga/luas`, validate.validateSegitiga,luasSegitiga)


export default app

