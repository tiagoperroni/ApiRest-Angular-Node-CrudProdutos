const Produto = require("../models/Produto");

exports.criarProduto = async(req, res) => {
    
    try {
        let produto;
        //criando um produto
        produto = new Produto(req.body);
        await produto.save();
        res.send(produto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Houve um erro');
    }
}

exports.obterProdutos = async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.json(produtos)
    }catch (error) {
        console.log(error);
        res.status(500).send('Houve um erro');
    }
}

exports.atualizaProduto = async (req, res) => {
    try{
        const { nome, categoria, local, preco } = req.body;
        let produto = await Produto.findById(req.params.id);

        if(!produto){
            res.status(404).json({ msg: 'Produto não existe' })
        }
        produto.nome = nome;
        produto.categoria = categoria;
        produto.local = local;
        produto.preco = preco;

        produto = await Produto.findOneAndUpdate({ _id: req.params.id }, produto, {new: true})
        res.json(produto);

    }catch (error) {
        console.log(error);
        res.status(500).send('Houve um erro');
    }
}

exports.obterProduto = async (req, res) => {
    
    try{
        let produto = await Produto.findById(req.params.id);

        if(!produto){
            res.status(404).json({ msg: 'Produto não existe' })
        }       
        res.json(produto);

    }catch (error) {
        console.log(error);
        res.status(500).send('Houve um erro');
    }
}

exports.deletarProduto = async (req, res) => {
    
    try{
        let produto = await Produto.findById(req.params.id);

        if(!produto){
            res.status(404).json({ msg: 'Produto não existe' })
        }  
        await Produto.findOneAndDelete({ _id: req.params.id})     
        res.json({msg: 'Produto deletado com sucesso!'});

    }catch (error) {
        console.log(error);
        res.status(500).send('Houve um erro');
    }
}