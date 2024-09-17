"use client";
import { useAppStore } from "@/lib/store/store";
import { IComponentPermission } from "@/types/userPermissions/IUserPermissions";
import { TMSMODULES } from "@/utils/constants/globalConstants";
import { checkUserComponentPermissions } from "@/utils/utils";

type Props = {
  children?: React.ReactNode;
  componentName: string;
  viewName: keyof typeof TMSMODULES;
  // eslint-disable-next-line no-unused-vars
  checkFunction?: (permission: IComponentPermission) => boolean;
};
export default function ProtectedComponent({
  children,
  componentName,
  viewName,
  checkFunction
}: Props) {
  const { selectedProject: project, isHy } = useAppStore((state) => state);
  if (!checkFunction)
    checkFunction = ({ create_permission, update_permission, delete_permission }) =>
      create_permission || update_permission || delete_permission;
  if (checkUserComponentPermissions(project, viewName, componentName, checkFunction))
    return <>{children}</>;
  if (!isHy) return <></>;
  return <></>;
}
