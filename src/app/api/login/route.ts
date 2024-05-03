import {NextResponse  } from "next/server";
import { getDBConnection } from "../../../data-source";
import { Users } from "../../../entity/User";


export async function POST(req:Request) {
    try {
        console.log('iniciando')
         //Inicializa o AppDataSource
        const conection = await getDBConnection();
        const users = conection.getRepository(Users);
        const data = await req.json()
        const email = data.email
        const password = data.password
        const user = await users.manager.findOne(Users,{
            where:{
            email:email 
        }
        })
        if (user){
            if (user.email == email && user.password == password){
                return NextResponse.json({"status":"200",auth: true ,message: "Usuário encontrado", id:user.id}); 
            }else{
                return NextResponse.json({"status":"404",auth: false, message:"falha na solicitação"})
            }
        }else{
            return NextResponse.json({ auth: false, message: "Usuário não encontrado"});
        }        
    } catch (error) {
        // Em caso de erro, retorna uma NextResponseposta de erro
        console.error('Erro:', error);
        return NextResponse.json({ "status":"500",auth: false, message: "Falha ao buscar os usuarios" })
    }
}

