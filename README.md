
![AcaiDelivery](src/assets/LogoP.png)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

## Aplicativo android criado com React Native
### Algumas das tecnologias que foram usadas

> Aplicativo criado pra automatizar o pedido de açai online e atender uma rede de açai's

- @react-native-community/async-storage": ^1.5.0  
- axios: ^0.19.0  
- react-native: 0.59.5  
- react-native-gesture-handler: ^1.3.0  
- react-native-svg: ^9.5.1  
- react-native-svg-transformer: ^0.13.0  
- styled-components: ^4.3.1  


Desenhado e desenvolvido por mim, AcaiDelivery é uma base de aplicativo com ideais novos e animaçôes otimizadas para celulares mais antigos, um design simples e sugestivo pra acompanhar o cliente ate o final.

1. Escolher um  [Apelido](#Apelido)
1. Adicionar o seu [Endereco](#Endereco)
1. Escolher o [Tamanho](#Medida) do Copo
1. [Criando](#Criando) seu copo, carios adicionais
1. Escolher [finalizar](#Finalizar) ou continuar comprando

# Sistema de cadastro
# Apelido
## Primeiro: Crie um nome de usuario unico e escolha a senha
##### Atrelado sempre a seu nome verdadeiro
O apelido pode te dar futuramente a possibilidade de criar uma promoção por fidelidade.  
Essa funcionalidade ainda nao foi implementada!

<div>
  <img width="40%" src='assets/readme/CriarUsuario.gif' ></img>
  <img width="40%" src='assets/readme/CriandoSenha.gif' ></img>
</div>

O usúario vai se logar usando seu apelido e senha  
Esses dados sarão persistidos para login automático ao abrir a aplicação.
  
---
# Endereco
## Segundo: Diga onde você mora

Esse dado é conferido no servidor da aplicacao e redirecionado pra rota que vai tratar e enviar pra aplicação certa da cozinha, so vai ser visualizado os pedidos referente aquela cidade que a cozinha se localiza.  

Depois de ter escolhido a cidade onde você está localizado, você diz o nome da rua, bairro e numero da casa, assim na cozinha o pedido já chega pronto, automatizando e ganhando tempo na produção. O usúario pode alterar esse endereço no momendo de concluir o pedido.

<div>
  <img width="40%" src='assets/readme/PegarCidade.gif' ></img>
  <img width="40%" src='assets/readme/Endereco.gif' ></img>
</div>

Depois do cadastro o usúario já é autenticado, seus dados são salvo no AsyncStorage podendo ser alterado futuramente na funcionalidade de configurações de perfil que ainda não foi implementada.

---
# Medida
## Terceiro: Escolha o tamanho do copo
### Cada medida de copo tem um número de adicional grátis.

- Copo 300ml - 2 Adicionais.
- Copo 500ml - 2 Adicionais.
- Copo 750ml - 2 Adicionais.
- Barca 500ml - 5 Adicionais.
- Barca 1000ml - 6 Adicionais.

<div>
  <img width="40%" src='assets/readme/CopoAdcGratis.gif' ></img>
  <img width="40%" src='assets/readme/CopoAdcMaior1.gif' ></img>
</div>

##### Os adicionais grátis pertence apenas aos adicionais de R$ 1,25

1. Granola
1. Leite Condensado
1. Leite Linho
1. Paçoca

---
# Criando
## Quarto: Escolha variaos adicionais e de um nome ao copo hehe

Olha só tem varios adicionais mesmo!  
Tem pra todo gosto.

|       2,50      |         1,50          |        1,25       |
|        ---      |          ---          |         ---       |
| Nutela          | Choco Power Ball      | Granola           |
| KitKat          | Gotas de Chocolate    | Leite Condensado  |
| Baton           | Confete de Chocolate  | Leite Ninho       |
| Sonho de Valsa  | Morango               | Paçoca            |
| Bis             | Banana                | -                 |
| -               | Kiwi                  | -                 |
---
<div>
  <img width="40%" src='assets/readme/Adicionais.gif' ></img>
  <img width="40%" src='assets/readme/NomeCopo.gif' ></img>
</div>

##### Na hora de finalizar o pedido voce pode escolher entre voltar e continuar pedindo ou pode concluir e confirmar o endereço para entrega do açai.

# Finalizar
Se escolher continuar montando um pedido de açai você vai passar pelas mesmas etapas de antes, dar um nome novo pra esse novo copo, e uma lista de copos é montada pra ser entregue a cozinha da aplicação.

<div>
  <img width="40%" src='assets/readme/ContPedido.gif' ></img>
  <img width="40%" src='assets/readme/Finalizar.gif' ></img>
</div>

O endereço como citado mais acima vai poder ser alterado na hora do pedido.  
Também vai existir a opção de editar o endereço nas configurações de usúarios.

<div>
  <img width="40%" src='assets/readme/MudarEnde.gif' ></img>
  <imgwidth="38.2%" src='assets/readme/DelivStatus.png' ></img>
</div>

Bom depois daqui é so dexar o serviço com o backend, a aplicação da cozinha e os profissionais que estão do outro lado do aplicativo C:  
O aplicativo da cozinha ainda nao foi criado, esse é um projeto ainda em andamento, além do aplicatativo da cozinha responsivo ser reutilizado por outros clientes de deliverys (Apps)

# Contatos

[**Github**](github.com/Tesse-rato)  
[**Linkedin**](linkedin.com/in/bruno-frança-2799b1166)  
[**Facebook**](facebook.com/BrunoFrancaM)  
[**Instagram**](instagram.com/salve_franca/)

