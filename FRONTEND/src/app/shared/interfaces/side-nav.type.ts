export interface SideNavInterface {
  path: string;
  title: string;
  iconType: '' | 'nzIcon' | 'fontawesome' | 'faIcon';
  iconTheme: '' | 'fab' | 'far' | 'fas' | 'fill' | 'outline' | 'twotone';
  icon: string;
  nav?: boolean; // make the property optional by adding the "?" symbol
  navTitle?: string;
  submenu: SideNavInterface[];
  role?: string[];
}
