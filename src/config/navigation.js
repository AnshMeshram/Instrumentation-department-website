import navConfig from "./navigation.json";

export const NAV_GROUPS = navConfig;

export const NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items);

export const NAV_ITEM_BY_PATH = NAV_ITEMS.reduce((acc, item) => {
  acc[item.path] = item;
  return acc;
}, {});

export function getActiveGroup(pathname) {
  return NAV_GROUPS.find((group) =>
    group.items.some(
      (item) => pathname === item.path || pathname.startsWith(`${item.path}/`)
    )
  );
}
