import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { getDBConnection } from "../../../../data-source";
import { Movie } from "../../../../entity/Movie";

export async function GET(
    req:Request,
    { params }: { params: { id: number } }) {
    try {
        console.log('iniciando')
         //Inicializa o AppDataSource
        const conection = await getDBConnection();
        const movies = conection.getRepository(Movie);
        const id = params.id
        const movie = await movies.manager.findOne(Movie,{where:{
            id:id }})
        if (movie){
            return NextResponse.json({"status":"200",auth: true ,message: "Filme encontrado", movie});
        }else{
            return NextResponse.json({ auth: false, message: "Filme não encontrado"});
        }        
    } catch (error) {
        // Em caso de erro, retorna uma resposta de erro
        console.error('Erro:', error);
        return NextResponse.json({"status":"500", auth: false, message: "Falha ao buscar os usuarios" })
    }
}

export async function DELETE(
    req:Request,
    { params }: { params: { id: number } }) {
    try {
        console.log('iniciando')
         //Inicializa o AppDataSource
        const conection = await getDBConnection();
        const movies = conection.getRepository(Movie);
        const id = params.id
        const movie = await movies.manager.findOne(Movie,{where:{
            id:id }})
        if (movie){
            await conection
            .createQueryBuilder()
            .delete()
            .from(Movie)
            .where("id = :id", { id: id })
            .execute()
            // await conection.manager.delete(movie)
            return NextResponse.json({"status":"200",auth: true ,message: `Filme "${movie.title}" deletado com sucesso`});
        }else{
            return NextResponse.json({ auth: false, message: "Filme não encontrado"});
        }        
    } catch (error) {
        // Em caso de erro, retorna uma resposta de erro
        console.error('Erro:', error);
        return NextResponse.json({"status":"500", auth: false, message: "Falha ao buscar os filmes" })
    }
}

export async function PUT(
    req:Request,
    { params }: { params: { id: number } }) {

    try {
        const conection = await getDBConnection();
        const movies = conection.getRepository(Movie);
        const id = params.id
        const data = await req.json()

        await movies
        .createQueryBuilder()
        .update(Movie)
        .set(
            {
                title : data.title,
                gender : (data.gender),
                classification : (data.classification),
                subtitle : (data.subtitle),
                image : (data.image),
                releasedate : (data.releaseDate),
                director : (data.director),
                writer : (data.writer),
                studio : (data.studio),
                actors : (data.actors),
                resume : (data.resume),
                awards : (data.awards),
                note : (data.note )
            }
        )
        .where("id = :id", { id: id })
        .execute()
        return NextResponse.json({"status":"200", message: "Filme alterado com sucesso "})
       
        } catch (error) {
            console.error('Erro:', error);
            return NextResponse.json({ "status":"500", message: "Falha ao alterar o filme" });
    }
}