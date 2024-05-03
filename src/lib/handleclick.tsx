import { useRouter } from "next/router";
import { useState } from "react";

export const click =  async(email:string,password:string) => {
    const [name, setName] = useState('')
    const router = useRouter()
    const [displayError, setDisplayError] = useState<string>("hidden")


    console.log('Buscando usuário');
    console.log('Verificando email e senha');
    try {
        const userResponse = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            body: JSON.stringify({
                'email': email,
                'password': password
            }),
        });
        const userData = await userResponse.json();
        if (await userData.status==200){
          setName(userData.name)
          router.push('/movies')
        }else{
          setDisplayError("")
          console.log("email ou senha incorretos")
        }


    } catch (error) {
        console.error('Erro:', error);
    }
}