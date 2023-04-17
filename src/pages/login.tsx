import Seo from "@component/SEO";
import NextLink from "next/link";
import { Flex, Link } from "@chakra-ui/react";

import React from "react";
import Authentication from "@component/Authentication";
import { useAuth } from "../context/AuthContext";
import { RouteUnAuthProtect } from "@layout/RouteGuard";

export default function Login() {
  const { signInWithGoogle, signInWithGithub, loading } = useAuth();

  return (
    <RouteUnAuthProtect>
      <Seo title={"Login | Viber"} />
      <Authentication
        title={"Login"}
        loading={loading}
        signInWithGoogle={signInWithGoogle}
        signInWithGithub={signInWithGithub}
      />
    </RouteUnAuthProtect>
  );
}
