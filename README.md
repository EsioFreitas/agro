### **Agro**

O **Agro** é uma API RESTful desenvolvida para gerenciar dados agrícolas e gerar gráficos relacionados à área cultivada.

#### **Documentação Swagger**

Swagger Documentation - http://localhost:3000/api

#### **Modelo de Relacionamento do Banco de Dados - Agro**

![Modelo de Relacionamento](https://github.com/EsioFreitas/agro/blob/main/rural_producers%20-%20public.png?raw=true)

##### Relações do Banco de Dados

###### Entidades:

1. **Producers**:

   - `id` (UUID): Identificador único do produtor.
   - `name` (string): Nome do produtor.
   - `document` (string): Documento do produtor (CPF ou CNPJ).

2. **Properties**:

   - `id` (UUID): Identificador único da propriedade.
   - `name` (string): Nome da propriedade.
   - `city` (string): Cidade onde está localizada.
   - `state` (string): Estado onde está localizada.
   - `totalArea` (decimal): Área total em hectares.
   - `farmableArea` (decimal): Área cultivável em hectares.
   - `vegetationArea` (decimal): Área de vegetação em hectares.
   - `producerId` (UUID): Relacionamento com o produtor (chave estrangeira).

3. **Crops**:

   - `id` (UUID): Identificador único da cultura.
   - `name` (string): Nome da cultura.

4. **Harvests**:

   - `id` (UUID): Identificador único da colheita.
   - `name` (string): Nome da colheita.
   - `year` (int): Ano da colheita.
   - `propertyId` (UUID): Relacionamento com a propriedade (chave estrangeira).

5. **HarvestCrops**:
   - `id` (UUID): Identificador único da relação colheita-cultura.
   - `harvestId` (UUID): Relacionamento com a colheita (chave estrangeira).
   - `cropId` (UUID): Relacionamento com a cultura (chave estrangeira).
   - `area` (decimal): Área em hectares plantada.

###### Relacionamentos:

- **One-to-Many**:
  - Um **produtor** pode ter muitas **propriedades**.
  - Uma **propriedade** pode ter muitas **colheitas**.
- **Many-to-Many**:
  - Muitas **colheitas** podem estar associadas a muitas **culturas**, utilizando a tabela intermediária **harvest_crops**.

---

### **Como Rodar o Projeto**

#### **Pré-requisitos**

- Docker e Docker Compose (para o banco de dados)
- Node.js (versão 16 ou superior)
- Yarn ou NPM
- Insomnia para testar os endpoints (arquivo de exemplo fornecido)

---

#### **Passo a Passo**

1. **Clone o repositório**

2. **Configure as variáveis de ambiente**
   Crie um arquivo `.env` baseado no `.env.example` e configure as seguintes variáveis:

   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=user
   DATABASE_PASSWORD=password
   DATABASE_NAME=rural_producers
   ```

3. **Suba o banco de dados com Docker**
   Execute o seguinte comando para iniciar o banco de dados:

   ```bash
   docker-compose up -d
   ```

4. **Instale as dependências**

   ```bash
   npm run install
   ```

5. **Execute as migrações do banco**

   ```bash
   npm run migration:run
   ```

6. **Inicie o servidor**

   ```bash
   npm run start:debug
   ```

7. **Acesse a API**

   - Acesse a documentação Swagger em: [http://localhost:3000/api](http://localhost:3000/api)

8. **Teste os endpoints**
   Utilize o arquivo do Insomnia fornecido para testar os endpoints da API.  
   **Importe o arquivo no Insomnia** para ver as requisições com exemplos prontos.

---

### **Insomnia**

- O arquivo **`dashboard-api-insomnia.json`** está disponível para importação no Insomnia.
- Ele contém exemplos completos de requisições para cada endpoint da API, incluindo os parâmetros necessários e respostas esperadas.
