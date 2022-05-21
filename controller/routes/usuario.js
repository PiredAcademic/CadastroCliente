const usuarioBD = require('../../model/repositories/usuarioBD');

module.exports = function(app)
{
    app.get("/login", function(req, res){
        if(req.query.fail)
            res.render('usuario/Login',{mensagemLogin:
            'Usuário e/ou senha incorretos!'});
        else
            res.render('usuario/login', {mensagemLogin: null});
    });
}

app.get("/cadastro", function(req, res){
    if(req.query.fail)
        res.render('usuario/CadastroUsuario', {mensagem: 'Cadastro'});
    else
        res.render('usuario/CadastroUsuario', {mensagem: null});
});

app.post('CadastroCliente/usuario/edit/salvar', (req, res) => {
    var usuario = {nome: req.body.nome,
        senha: req.body.id};
    try {
        usuarioBD.updateUsuario(usuario);
        res.render('usuario/Sucesso', {mensagem: 'alterado'});
    } catch (error) {
        res.render('usuario/EditUsuario', {tilte: 'Edição Cadastro',
        mensagem: 'Erro no cadastrado'})
    }
});

app.post('cadastro/usuario/salvar', (req, res) => {
    try {
        var usuario = {nome: req.body.nome,
            senha: seguranca.ocultarsenha(req.body.senha)}
        usuarioBD.updateUsuario(usuario);
        res.render('usuario/Sucesso', {mensagem: 'cadastrado'});
    } catch (error) {
        res.render('usuario/Cadastro', {tilte: 'Cadastro',
        mensagem: 'Erro no cadastrado'})
    }
});

app.get('lista/usuario', async(req, res, next) => {
    try {
        const docs = await usuarioBD.selectUsuario();
        res.render('usuario/Lista', {mensagem: 'Lista de Usuários', docs});
    } catch (err){
        next(err);
    }
});

app.get('/delete/usuario/:id', async(req, res, next) => {
    try {
        var id = req.params.id;
        await usuarioBD.deleteUsuario(id);
        const docs = await usuarioBD.selectUsuario();
        res.render('usuario/Lista', {mensagem: 'Usuário excuído com sucesso', docs});
    } catch(err){
        next(err);
    }
});

app.get('/edit/usuario/:id', async(req, res, next) => {
    try {
        var id = req.params.id;
        const usuario = await usuarioBD.getUsuarioId(id);
        res.render('usuario/EditUsuario', {mensagem: '', usuario});
    } catch(err){
        next(err);
    }
});

app.post('/login/executar', (req, res) => {
    if(req.body.nome === "Gabriel"
    && req.body.senha === "123456")
        res.render('/lista/usuario', {mensagem: 'cadastrado'});
    else
        res.render('/login/?fail=true');
});