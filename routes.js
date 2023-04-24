import { Router } from "express"
import { viagemIndex, viagemCreate, viagemUpdate, viagemDestroy, viagemPesqTransporte, viagemPesqPreco, viagemGetDestino, viagemPrecoMedio, viagemDuracaoMedio, viagemAumentaPreco } from "./controllers/viagemController.js"

const router = Router()

router.get('/viagens', viagemIndex)
    .post('/viagens', viagemCreate)
    .put('/viagens/:id', viagemUpdate)
    .delete('/viagens/:id', viagemDestroy)
    .get('/viagens/pesq-trans/:trans', viagemPesqTransporte)
    .get('/viagens/pesq-preco/:preco', viagemPesqPreco)
    .get('/viagens/destino', viagemGetDestino)
    .get('/viagens/media/preco', viagemPrecoMedio)
    .get('/viagens/media/duracao', viagemDuracaoMedio)
    .put('/viagens/taxa/:taxa', viagemAumentaPreco)

export default router