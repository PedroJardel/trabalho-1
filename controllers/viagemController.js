import { Op, Sequelize } from "sequelize";
import { Viagem } from "../models/viagem.js"

export const viagemIndex = async (req, res) => {
  try {
    const viagens = await Viagem.findAll();
    res.status(200).json(viagens)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const viagemCreate = async (req, res) => {
  const { destino, transporte, preco, duracao } = req.body

  if (!destino || !transporte || !preco || !duracao) {
    res.status(400).json({ id: 0, msg: "Erro... Informe destino, transporte, preço e duração da viagem." })
    return
  }

  try {
    if (validaTransporte(transporte)) {
      const viagem = await Viagem.create({
        destino, transporte: transporte.toLowerCase(), preco, duracao
      });
      res.status(201).json(viagem)
    } else {
      res.status(400).send("Transporte Incorreto, por favor digite: 'terrestre', 'maritimo' ou 'aereo'")
    }
  } catch (error) {
    res.status(400).send(Op.error)
  }
}

const validaTransporte = (transporte) => {
  if (transporte.toLowerCase() == "terrestre" || transporte.toLowerCase() == "maritimo" || transporte.toLowerCase() == "aereo") {
    return true
  } else {
    return false
  }
}

export const viagemUpdate = async (req, res) => {
  const { id } = req.params
  const { destino, transporte, preco, duracao } = req.body

  if (!destino || !transporte || !preco || !duracao) {
    res.status(400).json({ id: 0, msg: "Erro... Informe o destino , trasporte , valor e a duração  da Viagem." })
    return
  }

  try {
    if (validaTransporte(transporte)) {
      const viagem = await Viagem.update({
        destino, transporte: transporte.toLowerCase(), preco, duracao
      }, {
        where: { id }
      });
      res.status(200).json(viagem)
    } else {
      res.status(400).send("Transporte Incorreto, por favor digite: 'terrestre', 'maritimo' ou 'aereo'")
    }
  } catch (error) {
    res.status(400).send(error)
  }
}

export const viagemDestroy = async (req, res) => {
  const { id } = req.params
  try {
    const viagem = await Viagem.destroy({
      where: { id }
    });
    res.status(200).json(viagem)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const viagemPesqTransporte = async (req, res) => {
  const { trans } = req.params
  try {
    if (validaTransporte(trans)) {
      const viagens = await Viagem.findAll({
        where: {
          transporte: {
            [Op.substring]: trans
          }
        }
      });
      res.status(200).json(viagens)
    } else {
      res.status(400).send("Transporte Incorreto, por favor digite: 'terrestre', 'maritimo' ou 'aereo'")
    }
  } catch (error) {
    res.status(400).send(error)
  }
}

export const viagemPesqPreco = async (req, res) => {
  if (req.params.preco) {
    const { preco } = req.params
    try {
      const viagens = await Viagem.findAll({
        where: {
          preco: {
            [Op.lte]: preco
          }
        }
      });
      res.status(200).json(viagens)
    } catch (error) {
      res.status(400).send(error)
    }
  } else {
    res.status(400).send("Preço incorreto, digite novamente")
  }
}

export const viagemGetDestino = async (req, res) => {
  try {
    const viagens = await Viagem.findAll({
      attributes: ['destino', 'preco', 'duracao'],
      order: [
        ['destino', 'ASC']
      ]
    });
    res.status(200).json(viagens)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const viagemPrecoMedio = async (req, res) => {
  try {
    const numero = await Viagem.count()
    const soma = await Viagem.sum('preco')
    const media = soma / numero
    res.status(200).json({ numero, soma, media })
  } catch (error) {
    res.status(400).send(error)
  }
}

export const viagemDuracaoMedio = async (req, res) => {
  try {
    const numero = await Viagem.count()
    const soma = await Viagem.sum('duracao')
    const media = Math.floor(soma / numero)
    res.status(200).json({ numero, soma, media })
  } catch (error) {
    res.status(400).send(error)
  }
}

export const viagemAumentaPreco = async (req, res) => {
  const { taxa } = req.params
  try {
    if (taxa > 1) {
        const ajuste = Viagem.update({preco: Sequelize.literal(`preco * ${parseFloat(taxa)}`)}, {where: {}})
        res.status(200).json(ajuste)
      }
    } catch (error) {
    res.status(400).send(error)
  }
}

