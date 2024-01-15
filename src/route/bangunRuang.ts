import express from "express"
import { luaspermukaanBalok, luaspermukaanBola, luaspermukaanKubus, luaspermukaanTabung, volumeBalok, volumeBola, volumeKubus, volumeTabung } from "../controller/bangunRuang"
import * as validate from "../middleware/validateRuang"
const app = express()

app.use(express.json())

app.post(`/tabung/volume`, validate.validateTabung, volumeTabung)
app.post(`/tabung/luaspermukaan`, validate.validateTabung, luaspermukaanTabung)
app.post(`/kubus/volume`, validate.validateKubus, volumeKubus)
app.post(`/kubus/luaspermukaan`, validate.validateKubus, luaspermukaanKubus)
app.post(`/balok/volume`, validate.validateBalok, volumeBalok)
app.post(`/balok/luaspermukaan`, validate.validateBalok, luaspermukaanBalok)
app.post(`/bola/volume`, validate.validateBola, volumeBola)
app.post(`/bola/luaspermukaan`, validate.validateBola, luaspermukaanBola)

export default app