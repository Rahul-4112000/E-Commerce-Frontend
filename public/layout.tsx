import { API_PATHS, BASE_URL } from "@/config/api.path";
import { EROLE, user } from "@/feature/auth/types/auth.type";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({children}:{
  children: React.ReactNode;
}) {
//   const cookieStore = await cookies();
//   const accessToken = cookieStore.get('accessToken');

//   const response = await fetch(`${BASE_URL}/${API_PATHS.verify}`,{
//     method: "POST",
//     headers : {
//        Cookie: `accessToken=${accessToken}`
//     }
//   })
  
//   const userProfile: user = await response.json();

//   if(userProfile.role !== EROLE.SUPER_ADMIN){
//     redirect('/login');
//   }
  return (
    {children}
  )
}

