"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "./useRedux";
import PageLoader from "@/components/Loading/PageLoader";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthenticatedComponent = (props: P) => {
    const { isLoading, user } = useAppSelector((state) => state.auth);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (!isLoading && !user) {
        router.replace(`/?redirect=${encodeURIComponent(pathname)}`);
      } else {
      }
    }, [isLoading, user, pathname, router]);

    if (isLoading || !user) {
      return (
        <div className="bg-white min-h-screen">
          <PageLoader />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
