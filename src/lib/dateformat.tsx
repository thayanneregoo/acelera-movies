const dataString = "1972-03-24T03:00:00.000"; // Data original
export const dateformat = (dataString:string)=>{
    // Criar um objeto Date a partir da string de data
const data = new Date(dataString);

// Extrair os componentes da data (dia, mês, ano)
const dia = String(data.getDate()).padStart(2, '0'); // Obtém o dia e adiciona um zero à esquerda, se necessário
const mes = String(data.getMonth() + 1).padStart(2, '0'); // Obtém o mês (vale lembrar que os meses são indexados a partir de 0) e adiciona um zero à esquerda, se necessário
const ano = data.getFullYear(); // Obtém o ano

// Formatar a data no padrão brasileiro (dd/mm/aaaa)
const dataFormatada = `${dia}/${mes}/${ano}`;
return dataFormatada

}
// Criar um objeto Date a partir da string de data
const data = new Date(dataString);

// Extrair os componentes da data (dia, mês, ano)
const dia = String(data.getDate()).padStart(2, '0'); // Obtém o dia e adiciona um zero à esquerda, se necessário
const mes = String(data.getMonth() + 1).padStart(2, '0'); // Obtém o mês (vale lembrar que os meses são indexados a partir de 0) e adiciona um zero à esquerda, se necessário
const ano = data.getFullYear(); // Obtém o ano

// Formatar a data no padrão brasileiro (dd/mm/aaaa)
const dataFormatada = `${dia}/${mes}/${ano}`;

console.log(dataFormatada); // Saída: "24/03/1972"
