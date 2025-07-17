/* eslint-disable @typescript-eslint/no-explicit-any */
import { PermissionType } from "@/constant";
import { useAuthContext } from "@/context/auth-provider";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withPermission = (
  WrappedComponent: React.ComponentType<any>,
  requiredPermission: PermissionType
) => {
  const WithPermission = (props: any) => {
    const { user, hasPermission, isLoading } = useAuthContext();
    const navigate = useNavigate();
    const workspaceId = useWorkspaceId();

    useEffect(() => {
      if (!isLoading && (!user || !hasPermission(requiredPermission))) {
        navigate(`/workspace/${workspaceId}`);
      }
    }, [user, hasPermission, isLoading, navigate, workspaceId, requiredPermission]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!user || !hasPermission(requiredPermission)) {
      return null; // <--- clean fallback
    }

    return <WrappedComponent {...props} />;
  };

  return WithPermission;
};

export default withPermission;
