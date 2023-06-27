import { CounterContainer } from "@/components/elements/Counter";
import { useTranslation } from "react-i18next";

export const AdminOverviewData = (versionData, data) => {
  const { isLastestVersion, currentVersion } = versionData;
  const { t } = useTranslation();

  return [
    {
      title: t('admin_overview.version_info'),
      description: (
        <p className={`${isLastestVersion ? 'text-white' : 'text-red-500'} text-xl`}>
          {currentVersion}
        </p>
      ),
      paragraph: <p>{isLastestVersion ? t('admin_overview.panel_updated') : t('admin_overview.panel_outdated')}</p>,
      borderColor: `${isLastestVersion ? 'border-green-500' : 'border-red-500'}`
    },
    {
      title: t('admin_overview.admins_info'),
      description: CounterContainer({
        title: t('admin_overview.total_admins'),
        to: data.usersCount
      }),
      paragraph: '',
      borderColor: 'border-blue-500'
    },
    {
      title: t('admin_overview.servers_info'),
      description: CounterContainer({
        title: t('admin_overview.total_servers'),
        to: data.serversCount
      }),
      paragraph: '',
      borderColor: 'border-yellow-500'
    },
    {
      title: t('admin_overview.bans_info'),
      description: CounterContainer({
        title: t('admin_overview.total_bans'),
        to: data.bansCount
      }),
      paragraph: '',
      borderColor: 'border-red-500'
    },
    {
      title: t('admin_overview.protests_info'),
      description: CounterContainer({
        title: t('admin_overview.total_appeals'),
        to: data.appealsCount
      }),
      paragraph: '',
      borderColor: 'border-purple-500'
    },
    {
      title: t('admin_overview.submissions_info'),
      description: CounterContainer({
        title: t('admin_overview.total_reports'),
        to: data.reportsCount
      }),
      paragraph: '',
      borderColor: 'border-gray-500'
    },
    {
      title: t('admin_overview.system_info'),
      description: CounterContainer({
        title: t('admin_overview.total_demos'),
        to: data.demosCount
      }),
      paragraph: CounterContainer({
        title: t('admin_overview.total_demos_size'),
        to: data.totalDemoSize,
        convertToHumanSizeUnit: true
      }),
      borderColor: 'border-cyan-500'
    }
  ]
}
