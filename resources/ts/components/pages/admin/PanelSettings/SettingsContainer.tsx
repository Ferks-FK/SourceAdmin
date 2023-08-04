import { useState, FC, ComponentType, lazy, Suspense } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock"
import { SubNavigation } from "@/components/elements/SubNavigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faEnvelope, faMicrochip } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { Spinner } from "@/components/elements/Spinner";
import classNames from "classnames";

const GeneralSettings = lazy(() => import('@/components/pages/admin/PanelSettings/GeneralSettings'));
const MailSettings = lazy(() => import('@/components/pages/admin/PanelSettings/MailSettings'));

interface Props {
  group: string
  key: string
  icon: IconDefinition
}

const Tabs: Props[] = [
  {
      group: 'GeneralSettings',
      key: 'general',
      icon: faMicrochip,
  },
  {
      group: 'MailSettings',
      key: 'mail',
      icon: faEnvelope
  }
]

function SettingsContainer() {
  const [activeTab, setActiveTab] = useState<string>('GeneralSettings');
  const { t } = useTranslation();

  return (
    <PageContentBlock title={t('panel_settings.settings')}>
      <div className={`w-full flex flex-row items-center mb-4`}>
        <div className={`flex flex-col flex-shrink min-w-0`}>
          <h2 className={`text-2xl text-neutral-50 font-header font-medium`}>{t('panel_settings.settings')}</h2>
          <p className={`text-base text-neutral-400 overflow-hidden`}>{t('panel_settings.settings_description')}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <SubNavigation>
          {Tabs.map((tab) => (
            <button
              key={tab.key}
              className={classNames('flex justify-center gap-2 items-center min-w-[7rem] p-2 rounded nav-link-hover', {
                ['bg-dark-secondary']: tab.group === activeTab
              })}
              onClick={() => setActiveTab(tab.group)}
            >
              <FontAwesomeIcon icon={tab.icon} size="lg" className="text-neutral-100" />
              <p>{t(`panel_settings.${tab.key}`)}</p>
            </button>
          ))}
        </SubNavigation>
        <Suspense fallback={<Spinner centered size="large"/>}>
          <ComponentRenderer component={activeTab} group={activeTab} />
        </Suspense>
      </div>
    </PageContentBlock>
  )
}

const ComponentRenderer: FC<{ component: string, group: string }> = ({ component, group }) => {
  type ComponentProps = Record<string, ComponentType<{ group: string }>>

  const components: ComponentProps = {
    GeneralSettings: GeneralSettings,
    MailSettings: MailSettings
  };

  const ComponentToRender = components[component];

  if (!ComponentToRender) {
    return null;
  }

  return <ComponentToRender group={group} />;
};

export default SettingsContainer
