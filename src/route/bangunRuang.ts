import express from "express"
import { luaspermukaanBalok, luaspermukaanBola, luaspermukaanKubus, luaspermukaanTabung, volumeBalok, volumeBola, volumeKubus, volumeTabung } from "../controller/bangunRuang"
const app = express()

app.use(express.json())

app.post(`/tabung/volume`, volumeTabung)
app.post(`/tabung/luaspermukaan`, luaspermukaanTabung)
app.post(`/kubus/volume`, volumeKubus)
app.post(`/kubus/luaspermukaan`, luaspermukaanKubus)
app.post(`/balok/volume`, volumeBalok)
app.post(`/balok/luaspermukaan`, luaspermukaanBalok)
app.post(`/bola/volume`, volumeBola)
app.post(`/bola/luaspermukaan`, luaspermukaanBola)

export default app