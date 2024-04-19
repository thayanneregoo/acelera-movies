import {NextResponse  } from "next/server";
import { getDBConnection } from "../../../data-source";
import { Users } from "../../../entity/User";



export async function POST(res:NextResponse, req:Request) {
    try {
        console.log('iniciando')
         //Inicializa o AppDataSource
        const conection = await getDBConnection();
        const users = conection.getRepository(Users);
        const data = await req.json()
        const email = 'jo'
        const password = ''
        console.log({data})
        const user = await users.manager.findOne(Users,{
            where:{
            email:email 
        }
        })
        if (user){
            if (user.password == password){
                return NextResponse.json({auth: true ,message: "Usuário encontrado"}); // quando o dado é estático não funciona
            }
            else if(user.email == email && user.password == password) {
                return NextResponse.json({auth: false, message:"password incorreta"})
            }else{
                return NextResponse.json({auth: false, message:"falha na solicitação"})
            }
        }else{
            return NextResponse.json({ auth: false, message: "Usuário não encontrado",data});
        }        
    } catch (error) {
        // Em caso de erro, retorna uma NextResponseposta de erro
        console.error('Erro:', error);
        return NextResponse.json({ auth: false, message: "Falha ao buscar os usuarios" })
    }
}

