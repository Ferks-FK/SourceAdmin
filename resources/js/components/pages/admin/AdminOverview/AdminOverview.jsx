import { AdminOverviewData } from "@/components/pages/admin/AdminOverview/AdminOverviewData";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { Box } from "@/components/elements/Box";

function AdminOverview({ versionData, ...props }) {
  const overviewData = AdminOverviewData(versionData, props)

  return (
    <PageContentBlock title={'Admin Overview'} className={'items-center'}>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:max-w-5xl">
        {overviewData.map((data) => (
          <Box
            key={data.title.replace(' ', '_').toLowerCase()}
            title={data.title}
            description={data.description}
            paragraph={data.paragraph}
            borderColor={data.borderColor}
            className={'hover:bg-dark-secondary transition-all duration-150 select-none'}
          />
        ))}
      </div>
    </PageContentBlock>
  )
}

export default AdminOverview
