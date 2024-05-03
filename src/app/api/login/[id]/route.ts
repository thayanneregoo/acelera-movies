import { getDBConnection } from "@/data-source";
import { Users } from "@/entity/User";
import { NextResponse } from "next/server";

export async function GET(
    req:Request,
    { params }: { params: { id: number } }) {
    try {
        console.log('iniciando')
         //Inicializa o AppDataSource
        const conection = await getDBConnection();
        const users = conection.getRepository(Users);
        const id = params.id
        const user = await users.manager.findOne(Users,{where:{
            id:id }})
        if (user){
            return NextResponse.json({"status":"200",auth: true ,message: "Usuário encontrado", name:user.firstName});
        }else{
            return NextResponse.json({ auth: false, message: "Filme não encontrado"});
        }        
    } catch (error) {
        // Em caso de erro, retorna uma resposta de erro
        console.error('Erro:', error);
        return NextResponse.json({"status":"500", auth: false, message: "Falha ao buscar os usuarios" })
    }
}
