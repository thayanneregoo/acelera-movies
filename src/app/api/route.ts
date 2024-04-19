import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
       const dado = await req.json()
       console.log(dado)
       return NextResponse.json({dado})
    } catch (error) {
        // Em caso de erro, retorna uma NextResponseposta de erro
        console.error('Erro:', error);
        return NextResponse.json({ auth: false, message: "Falha ao buscar os usuarios" })
    }
} 