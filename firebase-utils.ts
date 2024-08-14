import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "./firebase";
import { STORAGE_TOKEN } from "@/utils/constants/globalConstants";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useAppStore } from "@/lib/store/store";

const getAuth = async (
  email: string,
  password: string,
  router: AppRouterInstance,
  isSignUp: any,
  openNotification: () => void
) => {
  if (isSignUp) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCred) => {
        const token = await userCred.user.getIdToken();
        fetch("/api/auth", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${await userCred.user.getIdToken()}`
          }
        }).then((response) => {
          localStorage.setItem(STORAGE_TOKEN, token);
          if (response.status === 200) {
            router.push("/");
          }
        });
      })
      .catch((error) => {
        alert(`Sign up failed: ${error.message} - ${error.code}`);
      });
  } else {
    signInWithEmailAndPassword(auth, email.trim(), password)
      .then(async (userCred) => {
        const token = await userCred.user.getIdToken();
        fetch("/api/auth", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            tokenExm: `${JSON.stringify(userCred)}`
          }
        }).then((response) => {
          if (response.status === 200) {
            localStorage.setItem(STORAGE_TOKEN, token);
            router.push("/clientes/all");
          }
        });
      })
      .catch((error) => {
        console.error({ error });
        openNotification();
      });
  }
};
const logOut = (router: AppRouterInstance) => {
  window.location.href = "/auth/login";
  signOut(auth);
  localStorage.removeItem(STORAGE_TOKEN);
  const { resetStore } = useAppStore.getState();
  resetStore();
};

const sendEmailResetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    handleError(error);
  }
};
export { getAuth, logOut, sendEmailResetPassword };

function handleError(error: unknown): void {
  if (error instanceof Error) {
    console.error(`Error: ${error.message}`);
  } else {
    console.error("An unknown error occurred:", error);
  }
}
