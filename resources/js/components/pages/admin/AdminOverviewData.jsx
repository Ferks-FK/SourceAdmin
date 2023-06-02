export const AdminOverviewData = (versionData, data) => {

  return [
    {
      title: 'Version Info',
      description: (
        <p className={`${versionData.isLastestVersion ? 'text-white' : 'text-red-500'}`}>
          {versionData.currentVersion}
        </p>
      ),
      paragraph: `${versionData.isLastestVersion ? 'You have the latest version of the panel in operation!' : 'The version of your panel is outdated, consider upgrading immediately.'}`,
      borderColor: `${versionData.isLastestVersion ? 'border-green-500' : 'border-red-500'}`
    },
    {
      title: 'Admin Info',
      description: (
        <p>{data.usersCount} Total Admins</p>
      ),
      paragraph: '',
      borderColor: 'border-blue-500'
    },
    {
      title: 'Server Info',
      description: (
        <p>{data.serversCount} Total Servers</p>
      ),
      paragraph: '',
      borderColor: 'border-yellow-500'
    },
    {
      title: 'Bans Info',
      description: (
        <p>{data.bansCount} Total Bans</p>
      ),
      paragraph: '',
      borderColor: 'border-red-500'
    },
    {
      title: 'Protests Info',
      description: (
        <p>{data.appealsCount} Total Appeals</p>
      ),
      paragraph: '',
      borderColor: 'border-purple-500'
    },
    {
      title: 'Submissions Info',
      description: (
        <p>{data.reportsCount} Total Reports</p>
      ),
      paragraph: '',
      borderColor: 'border-gray-500'
    }
  ]
}
