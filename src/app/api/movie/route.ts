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
// export async function POST(req:NextApiRequest, res:NextResponse) {
//     try {
//         const conection = await getDBConnection();
//         const movie = new Movie()
//         console.log(req.body)
//         movie.title = req.body.title;
//         movie.gender = req.body.gender;
//         movie.classification = req.body.classification;
//         movie.subtitle = req.body.subtitle;
//         movie.image = req.body.image;
//         movie.releasedate = req.body.releasedate;
//         movie.director = req.body.director;
//         movie.writer = req.body.writer;
//         movie.studio = req.body.studio;
//         movie.actors = req.body.actors;
//         movie.resume = req.body.resume;
//         movie.awards = req.body.awards;
//         movie.note = req.body.note;
//         if (!movie.title){
//            return NextResponse.json({message:"Campo obrigatório"})
//         }else{
//             await conection.manager.save(movie)
//             return NextResponse.json({message:"adiconado com sucesso: ",movie})
//         }
       
//         } catch (error) {
//             console.error('Erro:', error);
//             return NextResponse.json({ auth: false, message: "Falha ao adicionar o filme" });
//     }
    
// }
