import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { getDBConnection } from "../../../../data-source";
import { Movie } from "../../../../entity/Movie";

export async function POST() {
    try {
        console.log('iniciando')
         //Inicializa o AppDataSource
        const conection = await getDBConnection();
        const movies = conection.getRepository(Movie);
        const id = 1 //verificar como receber esse dado por parametro com next ou pelo front

        const movie = await movies.manager.findOne(Movie,{where:{
            id:id }})
        if (movie){
            return NextResponse.json({auth: true ,message: "Filme encontrado", movie});
        }else{
            return NextResponse.json({ auth: false, message: "Filme não encontrado"});
        }        
    } catch (error) {
        // Em caso de erro, retorna uma resposta de erro
        console.error('Erro:', error);
        return NextResponse.json({ auth: false, message: "Falha ao buscar os usuarios" })
    }
}