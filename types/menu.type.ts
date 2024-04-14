import type { MenuLevelEnum } from "~/enums/menu-level.enum";
import type { RoleEnum } from "~/enums/role.enum";

export type Menu = {
	readonly parentId?: string;
	readonly title: string;
	readonly prefix: string;
	readonly icon?: string;
	readonly level: MenuLevelEnum;
	readonly url: string;
	readonly isHorizontal: boolean;
	readonly isShow: boolean;
	readonly roles: RoleEnum[];
	readonly subMenus: Menu[];
};
