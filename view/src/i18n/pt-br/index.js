export default {
  geral: {
    questionDelete: 'Deseja realmente apagar este item?',
    confirm: 'Sim',
    deny: 'Não',
    back: 'Voltar'
  },
  menu: {
    dialogAddApi: {
      title: 'Informe os dados da sua API',
      form: {
        apiName: 'Nome da nova API',
        descriptionApi: 'Informe uma descrição',
        version: 'Informe a versão atual da api',
        email: 'Informe um e-mail para contato',
        license: 'Informe o tipo de licença ou link',
        isPublic: 'É publica?',
        baseURL: 'Informe o endereço a URL da API'
      }
    }
  },
  commonCodes: {
    // 1xx
    '100': {
      code: '100 Continue',
      reason: 'Essa resposta provisória indica que tudo ocorreu bem até agora e que o cliente deve continuar com a requisição ou ignorar se já concluiu o que gostaria.'
    },
    '101': {
      code: '101 Switching Protocol',
      reason: 'Esse código é enviado em resposta a um cabeçalho de solicitação Upgrade pelo cliente, e indica o protocolo a que o servidor está alternando.'
    },
    '103': {
      code: '103 Early Hints',
      reason: 'Este código tem principalmente o objetivo de ser utilizado com o cabeçalho Link, indicando que o agente deve iniciar a pré-carregar recursos enquanto o servidor prepara uma resposta.'
    },
    // 2xx
    '200': {
      code: '200 OK',
      reason: 'Estas requisição foi bem sucedida.'
    },
    '201': {
      code: '201 Created.',
      reason: 'A requisição foi bem sucedida e um novo recurso foi criado como resultado. Esta é uma tipica resposta enviada após uma requisição POST.'
    },
    '202': {
      code: '202 Accepted.',
      reason: 'A requisição foi recebida mas nenhuma ação foi tomada sobre ela. Isto é uma requisição não-comprometedora, o que significa que não há nenhuma maneira no HTTP para enviar uma resposta assíncrona indicando o resultado do processamento da solicitação.'
    },
    '203': {
      code: '203 Non-Authoritative Information.',
      reason: 'Esse código de resposta significa que o conjunto de meta-informações retornadas não é o conjunto exato disponível no servidor de origem, mas coletado de uma cópia local ou de terceiros.'
    },
    '204': {
      code: '204 No Content',
      reason: 'Não há conteúdo para enviar para esta solicitação, mas os cabeçalhos podem ser úteis.'
    },
    '205': {
      code: '205 Reset Content',
      reason: 'Esta requisição é enviada após realizanda a solicitação para informar ao user agent redefinir a visualização do documento que enviou essa solicitação.'
    },
    '206': {
      code: '206 Partial Content',
      reason: 'Esta resposta é usada por causa do cabeçalho de intervalo enviado pelo cliente para separar o download em vários fluxos.'
    },
    // 3xx
    '300': {
      code: '300 Multiple Choice',
      reason: 'A requisição tem mais de uma resposta possível.'
    },
    '301': {
      code: '301 Moved Permanently',
      reason: 'Esse código de resposta significa que a URI do recurso requerido mudou.'
    },
    '302': {
      code: '302 Found',
      reason: 'Esse código de resposta significa que a URI do recurso requerido foi mudada temporariamente. Novas mudanças na URI poderão ser feitas no futuro.'
    },
    '303': {
      code: '303 See Other',
      reason: 'O servidor manda essa resposta para instruir ao cliente buscar o recurso requisitado em outra URI com uma requisição GET.'
    },
    '304': {
      code: '304 Not Modified',
      reason: 'Essa resposta é usada para questões de cache. Diz ao cliente que a resposta não foi modificada.'
    },
    '307': {
      code: '307 Temporary Redirect',
      reason: 'O servidor mandou essa resposta direcionando o cliente a buscar o recurso requisitado em outra URI com o mesmo método que foi utilizado na requisição original.'
    },
    '308': {
      code: '308 Permanent Redirect',
      reason: 'Esse código significa que o recurso agora está permanentemente localizado em outra URI, especificada pelo cabeçalho de resposta Location.'
    },
    // 4xx
    '400': {
      code: '400 Bad Request',
      reason: 'Essa resposta significa que o servidor não entendeu a requisição pois está com uma sintaxe inválida.'
    },
    '401': {
      code: '401 Unauthorized',
      reason: 'Embora o padrão HTTP especifique "unauthorized", semanticamente, essa resposta significa "unauthenticated".'
    },
    '403': {
      code: '403 Forbidden',
      reason: 'O cliente não tem direitos de acesso ao conteúdo portanto o servidor está rejeitando dar a resposta.'
    },
    '404': {
      code: '404 Not Found',
      reason: 'O servidor não pode encontrar o recurso solicitado.'
    },
    '405': {
      code: '405 Method Not Allowed',
      reason: 'O método de solicitação é conhecido pelo servidor, mas foi desativado e não pode ser usado.'
    },
    '406': {
      code: '406 Not Acceptable',
      reason: 'Essa resposta é enviada quando o servidor da Web após realizar a negociação de conteúdo orientada pelo servidor, não encontra nenhum conteúdo seguindo os critérios fornecidos pelo agente do usuário.'
    },
    '407': {
      code: '407 Proxy Authentication Required',
      reason: 'Semelhante ao 401 porem é necessário que a autenticação seja feita por um proxy.'
    },
    '408': {
      code: '408 Request Timeout',
      reason: 'Esta resposta é enviada por alguns servidores em uma conexão ociosa, mesmo sem qualquer requisição prévia pelo cliente.'
    },
    '409': {
      code: '409 Conflict',
      reason: 'Esta resposta será enviada quando uma requisição conflitar com o estado atual do servidor.'
    },
    '410': {
      code: '410 Gone',
      reason: 'Esta resposta será enviada quando o conteúdo requisitado foi permanentemente deletado do servidor, sem nenhum endereço de redirecionamento.'
    },
    '411': {
      code: '411 Length Required',
      reason: 'O servidor rejeitou a requisição porque o campo Content-Length do cabeçalho não está definido e o servidor o requer.'
    },
    '412': {
      code: '412 Precondition Failed',
      reason: 'O cliente indicou nos seus cabeçalhos pré-condições que o servidor não atende.'
    },
    '413': {
      code: '413 Payload Too Large',
      reason: 'A entidade requisição é maior do que os limites definidos pelo servidor; o servidor pode fechar a conexão ou retornar um campo de cabeçalho Retry-After.'
    },
    '414': {
      code: '414 URI Too Long',
      reason: 'A URI requisitada pelo cliente é maior do que o servidor aceita para interpretar.'
    },
    '415': {
      code: '415 Unsupported Media Type',
      reason: 'O formato de mídia dos dados requisitados não é suportado pelo servidor, então o servidor rejeita a requisição.'
    },
    '416': {
      code: '416 Range Not Satisfiable',
      reason: 'O trecho especificado pelo campo Range do cabeçalho na requisição não pode ser preenchido; é possível que o trecho esteja fora do tamanho dos dados da URI alvo.'
    },
    '417': {
      code: '417 Expectation Failed',
      reason: 'Este código de resposta significa que a expectativa indicada pelo campo Expect do cabeçalho da requisição não pode ser satisfeita pelo servidor.'
    },
    '418': {
      code: '418 Im a teapot',
      reason: 'O servidor recusa a tentativa de coar café num bule de chá.'
    },
    '425': {
      code: '425 Too Early',
      reason: 'Indica que o servidor não está disposto a arriscar processar uma requisição que pode ser refeita.'
    },
    '426': {
      code: '426 Upgrade Required',
      reason: 'O servidor se recusa a executar a requisição usando o protocolo corrente mas estará pronto a fazê-lo após o cliente atualizar para um protocolo diferente.'
    },
    '428': {
      code: '428 Precondition Required',
      reason: 'O servidor de origem requer que a resposta seja condicional'
    },
    '429': {
      code: '429 Too Many Requests',
      reason: 'O usuário enviou muitas requisições num dado tempo ("limitação de frequência").'
    },
    '431': {
      code: '431 Request Header Fields Too Large',
      reason: 'O servidor não quer processar a requisição porque os campos de cabeçalho são muito grandes.'
    },
    '451': {
      code: '451 Unavailable For Legal Reasons',
      reason: 'O usuário requisitou um recurso ilegal, tal como uma página censurada por um governo.'
    },
    // 5xx
    '500': {
      code: '500 Internal Server Error',
      reason: 'O servidor encontrou uma situação com a qual não sabe lidar.'
    },
    '501': {
      code: '501 Not Implemented',
      reason: 'O método da requisição não é suportado pelo servidor e não pode ser manipulado.'
    },
    '502': {
      code: '502 Bad Gateway',
      reason: 'Esta resposta de erro significa que o servidor, ao trabalhar como um gateway a fim de obter uma resposta necessária para manipular a requisição, obteve uma resposta inválida.'
    },
    '503': {
      code: '503 Service Unavailable',
      reason: 'O servidor não está pronto para manipular a requisição. Causas comuns são um servidor em manutenção ou sobrecarregado.'
    },
    '504': {
      code: '504 Gateway Timeout',
      reason: 'Esta resposta de erro é dada quando o servidor está atuando como um gateway e não obtém uma resposta à tempo.'
    },
    '505': {
      code: '505 HTTP Version Not Supported',
      reason: 'A versão HTTP usada na requisição não é suportada pelo servidor.'
    },
    '506': {
      code: '506 Variant Also Negotiates',
      reason: 'O servidor tem um erro de configuração interno: a negociação transparente de conteúdo para a requisição resulta em uma referência circular.'
    },
    '510': {
      code: '510 Not Extended',
      reason: 'Exigem-se extenções posteriores à requisição para o servidor atendê-la.'
    },
    '511': {
      code: '511 Network Authentication Required',
      reason: 'O código de status 511 indica que o cliente precisa se autenticar para ganhar acesso à rede.'
    }
  }
}
