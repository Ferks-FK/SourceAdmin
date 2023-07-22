import { AdminOverviewData } from "@/components/pages/admin/AdminOverview/AdminOverviewData";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { Box } from "@/components/elements/Box";
import { useTranslation } from "react-i18next";
import { Props } from "@/components/pages/admin/AdminOverview/AdminOverviewData";
import { useFlashMessages } from "@/hooks/useFlashMessages";

function AdminOverview({ versionData, ...props }: Props) {
  const overviewData = AdminOverviewData({ versionData, ...props });
  const { t } = useTranslation();

  useFlashMessages(props.flash, props.errors)

  return (
    <PageContentBlock title={t('admin_overview.admin_overview')} className={'items-center'}>
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
