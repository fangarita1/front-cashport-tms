import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get(process.env.COOKIE_SESSION_NAME ?? "");

  //TODO: logica para devolvernos a proyectos si entramos al login si estamos logeados y con token

  //Regresar a /login si no hay cookie de sesion
  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  //Llamar a la API para validar el token
  const responseAPI = await fetch(`${request.nextUrl.origin}/api/auth`, {
    headers: {
      Cookie: `${process.env.COOKIE_SESSION_NAME}=${session?.value}`
    }
  });

  //Regresar a /login si la validacion falla
  if (responseAPI.status !== 200) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

//Nuestras rutas protegidas
export const config = {
  matcher: ["/", "/proyectos/:path*"]
};
