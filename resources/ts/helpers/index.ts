import { MD5 } from "crypto-js";
import { FilterDataProps } from "@/helpers/types";
import { PunishmentObject } from "@/types";
import { TFunction } from "i18next";
import { useUserStore } from "@/stores/user";

export function md5(string: string) {
  return MD5(string.toLowerCase().trim())
}

export const getStyleAndName = (props: PunishmentObject, t: TFunction) => {
  // TODO: Find a user-friendly way to translate the strings from the `time_bans` table.
  const now = Date.now();
  const end = new Date(props.end_at).getTime();
  const timeBanName = props.time_ban_name.toLowerCase()

  if (props.removed_by) {
    return {
      style: 'bg-blue-500',
      name: `${t(timeBanName, { ns: 'table' })} (${t('unbanned', { ns: 'table' })})`
    };
  }

  if (props.time_ban_value === 0) {
    return {
      style: 'bg-red-500',
      name: t(timeBanName, { ns: 'table' })
    };
  }

  if (end > now) {
    return {
      style: 'bg-yellow-500',
      name: props.time_ban_name // The DB result is capitalized here.
    };
  }

  return {
    style: 'bg-green-500',
    name: `${timeBanName} (${t('expired', { ns: 'table' })})`
  };
};

export function getPercentage(props: PunishmentObject) {
  // Punishment removed or permanent.
  if (props.removed_by || props.time_ban_value == 0) {
    return 100;
  }

  const now = Date.now();
  const end = new Date(props.end_at).getTime();
  const difference = end - now;
  const percentage = 100 - (difference / (1000 * 60 * 60 * 24 * 365)) * 100;

  return percentage > 100 ? 100 : percentage;
};

export const filterData = (props: FilterDataProps) => {
  return props.data.filter((item) => props.keys.some((key) => {
    if (item[key] == null) {
      return null
    }

    return item[key].toLowerCase().includes(props.query.toLowerCase())
  }))
}

export function separateInternalObjects(array: any[]) {
  return array.flatMap(object => Object.entries(object).map(([key, value]) => ({ [key]: value })));
}

export function formatSizeUnits(size: number) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  let index = 0;

  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index++;
  }

  return `${size.toFixed(2)} ${units[index]}`;
}

export function can(permission: string) {
    const [ data ] = useUserStore((state) => [state.data])

    if (data?.roles.at(0)?.permissions?.some((permission) => permission.name === '*')) {
        return true
    }

    if (data?.roles.at(0)?.permissions?.find((perm) => perm.name === permission)) {
        return true
    }

    if (data?.permissions?.some((permission) => permission.name === '*')){
        return true
    }

    return data?.permissions?.find((perm) => perm.name === permission) ? true : false
}
