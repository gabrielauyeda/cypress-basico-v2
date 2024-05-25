///<reference types="Cypress" />
describe('Central de Atendimento ao Cliente TAT', function() {
    //SEÇÃO 3 - Localizando, digitando e clicando em elementos
    //Exercício e Exercício Extra 1 (adicionar valor 0 ao delay no comando type)
    beforeEach(() => {
        cy.visit('./src/index.html')
      })
    it('Verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('Preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('Gabriela')
        cy.get('#lastName').type('Ando')
        cy.get('#email').type('gabriela.uyeda@gmail.com')
        const longText = 'texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto'
        cy.get('#open-text-area').type(longText, { delay:0 })
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })
    //Exercício Extra 2
    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Gabriela')
        cy.get('#lastName').type('Ando')
        cy.get('#email').type('gabriela.uyeda-gmail.com')
        cy.get('#open-text-area').type('Ainda não sei.')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
    //Exercício extra 3
    it('Campo teelfone continua vazio ao tentar digitar valores não numéricos', function() {
        cy.get('#phone')
            .type('Gabriela')
            .should('have.value', '')
    })
    //Exercício extra 4
    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Gabriela')
        cy.get('#lastName').type('Ando')
        cy.get('#email').type('gabriela.uyeda@gmail.com')
        cy.get('#open-text-area').type('Ainda não sei.')
        cy.get('#phone-checkbox').click()
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
    //Exercício extra 5
    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
            .type('Gabriela')
            .should('have.value', 'Gabriela')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Ando')
            .should('have.value', 'Ando')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('gabriela.uyeda@gmail.com')
            .should('have.value', 'gabriela.uyeda@gmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('985409010')
            .should('have.value', '985409010')
            .clear()
            .should('have.value', '')
    })
    //Exercício extra 6
    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    //Exercício extra 6
    it('Envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
    //Exercício extra 8 - alterado cy.get para cy.contains para localizar o botão Enviar no Exercício extra 6
    //SEÇÃO 4 - Selecionando opções em campos de seleção suspensa
    //Exercício
    it('Seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })
    //Exercício extra 1
    it('Seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })
    //Exercício extra 2
    it('Seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })
    //SEÇÃO 5 - Marcando inputs do tipo rádio
    //Exercício
    it('Marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('be.checked')
    })
    //Exercício extra
    it('Marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')  
            .should('have.length', 3)
            .each(function($elemento) {
                cy.wrap($elemento).check()
                cy.wrap($elemento).should('be.checked')
            })
    })
    //SEÇÃO 6 - Marcando e desmarcando inputs do tipo checkbox
    //Exercício
    it('Marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })
    //Exercício extra (review Exercício Extra 4 - Seção 3)
    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Gabriela')
        cy.get('#lastName').type('Ando')
        cy.get('#email').type('gabriela.uyeda@gmail.com')
        cy.get('#open-text-area').type('Teste')
        cy.get('#phone-checkbox').check()
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
    //SEÇÃO 7 - Upload de arquivos com Cypress
    //Exercício
    it('Seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    //Exercício extra 1
    it('Seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    //Exercício extra 2
    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('aliasFile')
        cy.get('input[type="file"]#file-upload')
            .selectFile('@aliasFile')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    //SEÇÃO 8 - Lidando com links que abrem em outra aba do navegador
    //Exercício
    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
    //Exercício extra 1
    it('Acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing').should('be.visible')
    })
    //Exercício extra 2
    it('Testa a página da política de privacidade de forma independente', function() {
        cy.visit('./src/privacy.html')
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
        cy.contains('Talking About Testing').should('be.visible')
    })
    //SEÇÃO 9 - Simulando as dimensões de um dispositivo móvel
    //Exercício
    //adicionada configuração para executar o Cypress em outra resolução ao arquivo package.json 
    //"cy:open:mobile": "cypress open --config viewportWidth=410 viewportHeight=860",
    //Exercício extra
    //adicionada configuração para executar o Cypress em modo headless e em outra resolução ao arquivo package.json 
    //"test:mobile": "cypress run --config viewportWidth=410 viewportHeight=860"

    //SEÇÃO 10 - Documentação do projeto de testes automatizados
})