// o nome desse arquivo é definido por padrão
import { NextRequest, NextResponse } from "next/server";
import { getDBConnection } from "../../../data-source";
import { Movie } from "../../../entity/Movie";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET() {
    try {
        console.log('obtendo data source')
         // Inicializa o AppDataSource
        const conection = await getDBConnection();
        const movieRepository = conection.getRepository(Movie);
        const allMovies = await movieRepository.find();
        // Retorna a resposta com os filmes encontrados
        return NextResponse.json(allMovies);
    } catch (error) {
        // Em caso de erro, retorna uma resposta de erro
        console.error('Erro:', error);
        return NextResponse.json({ auth: false, message: "Falha ao buscar os filmes" });
    }
}
export async function POST(req:Request) {
    try {
        const conection = await getDBConnection();
        const movie = new Movie()
        const data = await req.json()
        movie.title = data.title;
        movie.gender = data.gender;
        movie.classification = data.classification;
        movie.subtitle = data.subtitle;
        movie.image = data.image;
        movie.releasedate = data.releasedate;
        movie.director = data.director;
        movie.writer = data.writer;
        movie.studio = data.studio;
        movie.actors = data.actors;
        movie.resume = data.resume;
        movie.awards = data.awards;
        movie.note = data.note;
        if (!movie.title){
           return NextResponse.json({message:"Campo obrigatório"})
        }else{
            await conection.manager.save(movie)
            return NextResponse.json({"status":"200", message:"adiconado com sucesso: ",movie})
        }
       
        } catch (error) {
            console.error('Erro:', error);
            return NextResponse.json({ "status":"500", message: "Falha ao adicionar o filme" });
    }
}
