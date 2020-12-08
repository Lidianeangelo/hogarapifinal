
const solicitanteCollection = require('../models/solicitanteSchema')


//Get em todos os solicitantes cadastratos - deve ser utilizado pelas instituições com acesso (ongs, abrigos, governo)
const getAll = (req, res) => {
  solicitanteCollection.find((error, solicitantes) => {
    if (error) {
      return res.status(500).send(error)
    } else {
      return res.status(200).json({
        mensagem: "Todos os solicitantes cadastrados.",
        solicitantes
      })
    }
  })
}



//GET getName - busca os solicitantes pelo nome (acesso pelas instituições)
const getName = (req, res) => {
  solicitanteCollection.findOne({ nome: req.params.nome }, (error, nome) => {
    if (nome) {
      return res.status(200).json({
        mensagem: "Nome encontrado",
        nome

      })

    } else {
      return res.status(500).send({
        mensagem: "Nome não encontrado",
        error
      })
    }
  })
}


//POST para add solicitante - pode ser realizado pelo próprio solicitante ou por agente institucional com permissão (assistente social)
const addSolicitante = (req, res) => {
  const solicitanteBody = req.body
  const cadastro = new solicitanteCollection(solicitanteBody)

  cadastro.save((error) => {
    if (error) {
      return res.status(400).send(error)
    } else {
      return res.status(200).send({
        mensagem: "Cadastro realizado com sucesso!",
        cadastro
      })
    }
  })
}


//DELETE - deleta solicitante por id específico e retorna mensagem - próprio solicitante e instituições com permissão
//csolicitante/deletar/[_ID]" 
const deleteById = (req, res) => {
  const idParam = req.query
  solicitanteCollection.findByIdAndDelete(idParam, (error, solicitante) => {
    if (error) {
      return res.status(500).send({
        mensagem: "Algo inesperado aconteceu ao deletar",
        error
      })

    } else {
      if (solicitante) {
        return res.status(200).send({
          mensagem: "Cadastro apagado com sucesso"
        })
      } else {
        return res.sendStatus(404)
      }
    }
  })
}


module.exports = {
  getAll,
  getName,
  addSolicitante,
  deleteById
}
