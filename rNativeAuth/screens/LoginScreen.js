import { useContext, useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import { login } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const [isLogin, setIsLogin] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signInHandler({ email, password }) {
    setIsLogin(true);
    try { //where the user is authenticated through our ctx API
      const token = await login(email, password);
      authCtx.authenticate(token);
      // console.log(email, password)
    } catch (error) {
      Alert.alert(
        "Authentication Failed!",
        "Could not log you in. Please check your credentials or try again Later?"
      );
      setIsLogin(false);
    }
  }

  if (isLogin) {
    return <LoadingOverlay message="Signing in..." />;
  }

  return <AuthContent isLogin onAuthenticate={signInHandler} />;
}

export default LoginScreen;
