export interface IUserPermissions {
  status: number;
  message: string;
  data: IPermissionData[];
}

interface IPermissionData {
  project_id: number;
  rol_id: number;
  name: string;
  logo: string;
  views_permissions: IViewPermission[];
  action_permissions: string[];
  is_super_admin: boolean;
}

interface IViewPermission {
  page_name: string;
  components: IComponentPermission[];
}

interface IComponentPermission {
  component_name: string;
  create_permission: boolean;
  update_permission: boolean;
  delete_permission: boolean;
}
