const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.post('/', produtoController.criarProduto);
router.get('/', produtoController.obterProdutos );
router.put('/:id', produtoController.atualizaProduto );
router.get('/:id', produtoController.obterProduto );
router.delete('/:id', produtoController.deletarProduto );


module.exports = router;