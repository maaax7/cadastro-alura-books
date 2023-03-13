(() => {
    async function buscaEndereco(cep) {
        var mensagemErro = document.getElementById('erro');
        mensagemErro.innerHTML = "";

        try {
            var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json`)
            var consultaCepConvertida = await consultaCep.json();

            if (consultaCepConvertida.erro) {
                throw Error('CEP nao existente!');
            }
            
            console.log(consultaCepConvertida);
            var bairro = document.getElementById('bairro');
            bairro.value = consultaCepConvertida.bairro;
            var cidade = document.getElementById('cidade');
            cidade.value = consultaCepConvertida.localidade;
            var endereco = document.getElementById('endereco');
            endereco.value = consultaCepConvertida.logradouro;
            var uf = document.getElementById('estado');
            uf.value = consultaCepConvertida.uf;

            
            return consultaCepConvertida;
        }
        catch (erro) {
            mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
            console.log(erro);
        }
    }

    // let ceps = ['09993300','09993300'];
    // let conjuntoCeps = ceps.map(cep => buscaEndereco(cep));
    // Promise.all(conjuntoCeps).then(result => console.log(result));
    const cep = document.getElementById('cep');
    cep.addEventListener('focusout', () => buscaEndereco(cep.value));

})()