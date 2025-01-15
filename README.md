# Sistema de Agendamento de Consultas - ( C# ) React VITE

## Sobre o Projeto -

Crie uma API Web para gerenciar uma aplicação de sua escolha. Os usuários devem ser capazes de realizar as principais operações CRUD (Create, Read, Update, Delete) relacionadas ao tema escolhido. Além disso, o usuário deverá ter uma interface front-end para utilizar a aplicação.
</br>

### Critérios do Projeto

- Requisitos:
• .NET 8 ou superior: Utilize a última versão do .NET.
• React Vite
• DDD (Domain-Driven Design): Aplique os princípios de DDD para estruturar sua aplicação.
• Testes Unitários: Utilize NUnit ou xUnit para escrever testes unitários.
• Utilizar Dapper para acesso ao banco de dados
• .NET 8.0 ou superior
Bônus (Diferencial):
• •	Utilizar um tipo de autenticação. (basic, jwt e etc)
• Utilizar mensageria RabbitMQ ou outro.

### Estrutura do diretório do projeto:

```bash
/src
├── Sistema-CursosOnline               # React project
├── src/                               # Pasta raiz do código fonte
│   ├── Api/                           # Pasta de componentes de aplicação do projeto
│   │  ├── Api.jsx/                    # Configuração dos endpoints da Api
│   ├── Assets/                        # Fotos do projeto
│   ├── Pages/                         # Páginas do projeto
│   │  ├──AgendamentoConsulta          # Página de Agendamento de Consultas
│   │  ├──Cadastro                     # Cadastro de Médico ou Paciente
│   │  ├──HomeMedico                   # Página Home do Médico
│   │  ├──HomePaciente                 # Página Home do Paciente
│   │  ├──Login                        # Página de Login
│   │  ├──Perfil                       # Página de Perfil para Editar/Visualizar os Dados, tanto de Médico quanto Paciente
│   │  ├──VisualizarConsultasMedico    # Página para Médico Visualizar as Consultas
│   │  ├──VisualizarConsultasPaciente  # Página para Paciente Visualizar as Consulta
│   ├── routes/                        # Pasta de rotas
│   │  ├──AppRoutes                    # Rotas da aplicação
│   ├── App.jsx/                       # Aplicação
│   ├── main.jsx/                      # Renderização
```

## 📁 Acesso ao projeto

**Acesse e baixar o código fonte do projeto final
[aqui](https://github.com/delmiraugusto/FrontGerenciamentoConsultasMedicas).**

## Ferramentas utilizadas
- React VITE
