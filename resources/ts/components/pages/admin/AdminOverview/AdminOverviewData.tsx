import { CounterContainer } from "@/components/elements/Counter";
import { useTranslation } from "react-i18next";
import { FlashProp, ErrorsProp } from "@/types";

export interface Props {
  flash: FlashProp
  errors: ErrorsProp
  appealsCount: number
  bansCount: number
  demosCount: number
  reportsCount: number
  serversCount: number
  totalDemoSize: number
  usersCount: number
  versionData: {
    currentVersion: string
    isLatestVersion: boolean
  }
}

export const AdminOverviewData = ({ versionData, ...props }: Props) => {
  const { isLatestVersion, currentVersion } = versionData;
  const { t } = useTranslation();

  return [
    {
      title: t('admin_overview.version_info'),
      description: (
        <p className={`${isLatestVersion ? 'text-white' : 'text-red-500'} text-xl`}>
          {currentVersion}
        </p>
      ),
      paragraph: <p>{isLatestVersion ? t('admin_overview.panel_updated') : t('admin_overview.panel_outdated')}</p>,
      borderColor: `${isLatestVersion ? 'border-green-500' : 'border-red-500'}`
    },
    {
      title: t('admin_overview.admins_info'),
      description: CounterContainer({
        title: t('admin_overview.total_admins'),
        to: props.usersCount
      }),
      paragraph: '',
      borderColor: 'border-blue-500'
    },
    {
      title: t('admin_overview.servers_info'),
      description: CounterContainer({
        title: t('admin_overview.total_servers'),
        to: props.serversCount
      }),
      paragraph: '',
      borderColor: 'border-yellow-500'
    },
    {
      title: t('admin_overview.bans_info'),
      description: CounterContainer({
        title: t('admin_overview.total_bans'),
        to: props.bansCount
      }),
      paragraph: '',
      borderColor: 'border-red-500'
    },
    {
      title: t('admin_overview.protests_info'),
      description: CounterContainer({
        title: t('admin_overview.total_appeals'),
        to: props.appealsCount
      }),
      paragraph: '',
      borderColor: 'border-purple-500'
    },
    {
      title: t('admin_overview.submissions_info'),
      description: CounterContainer({
        title: t('admin_overview.total_reports'),
        to: props.reportsCount
      }),
      paragraph: '',
      borderColor: 'border-gray-500'
    },
    {
      title: t('admin_overview.system_info'),
      description: CounterContainer({
        title: t('admin_overview.total_demos'),
        to: props.demosCount
      }),
      paragraph: CounterContainer({
        title: t('admin_overview.total_demos_size'),
        to: props.totalDemoSize,
        convertToHumanSizeUnit: true
      }),
      borderColor: 'border-cyan-500'
    }
  ]
}
