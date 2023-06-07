import { CounterContainer } from "@/components/elements/Counter";

export const AdminOverviewData = (versionData, data) => {
  const { isLastestVersion, currentVersion } = versionData;

  return [
    {
      title: 'Version Info',
      description: (
        <p className={`${isLastestVersion ? 'text-white' : 'text-red-500'} text-xl`}>
          {currentVersion}
        </p>
      ),
      paragraph: <p>{isLastestVersion ? 'You have the latest version of the panel in operation!' : 'The version of your panel is outdated, consider upgrading immediately.'}</p>,
      borderColor: `${isLastestVersion ? 'border-green-500' : 'border-red-500'}`
    },
    {
      title: 'Admin Info',
      description: CounterContainer({
        title: 'Total Admins',
        to: data.usersCount
      }),
      paragraph: '',
      borderColor: 'border-blue-500'
    },
    {
      title: 'Server Info',
      description: CounterContainer({
        title: 'Total Servers',
        to: data.serversCount
      }),
      paragraph: '',
      borderColor: 'border-yellow-500'
    },
    {
      title: 'Bans Info',
      description: CounterContainer({
        title: 'Total Bans',
        to: data.bansCount
      }),
      paragraph: '',
      borderColor: 'border-red-500'
    },
    {
      title: 'Protests Info',
      description: CounterContainer({
        title: 'Total Appeals',
        to: data.appealsCount
      }),
      paragraph: '',
      borderColor: 'border-purple-500'
    },
    {
      title: 'Submissions Info',
      description: CounterContainer({
        title: 'Total Reports',
        to: data.reportsCount
      }),
      paragraph: '',
      borderColor: 'border-gray-500'
    },
    {
      title: 'System Info',
      description: CounterContainer({
        title: 'Total Demos',
        to: data.demosCount
      }),
      paragraph: CounterContainer({
        title: 'Total Demo Size',
        to: data.totalDemoSize,
        convertToHumanSizeUnit: true
      }),
      borderColor: 'border-cyan-500'
    }
  ]
}
