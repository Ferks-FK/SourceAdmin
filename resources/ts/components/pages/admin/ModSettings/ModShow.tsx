import { useState } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { Button } from "@/components/elements/button";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/field";
import { Image } from "@/components/elements/Image";
import { Modal } from "@/components/elements/modal";
import { Formik, FormikHelpers } from "formik";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { router } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import { UserData } from "@/stores/user";
import { FlashProp, ErrorsProp, ModObject } from "@/types";
import { OptionImage } from '@/components/pages/admin/ModSettings/ModCreate';
import { ModEditSchema } from "@/yup/YupSchemas";
import { can } from "@/helpers";
import route from 'ziggy-js';

interface Props {
  mods: ModObject[]
  mod: ModObject
  flash: FlashProp
  errors: ErrorsProp
  auth: {
    user: UserData
  }
}

interface Values {
  name: string
  mod: string
  icon_id: number
  enabled: boolean
}

function ModShow(props: Props) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modsData] = useState<ModObject[]>(props.mods);
  const [userCanEdit, userCanDelete] = [can('admin.mods.edit'), can('admin.mods.destroy')];
  const { t } = useTranslation();

  const handleSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    router.patch(route('admin.mods.update', props.mod.id), { ...values }, {
      onFinish: () => {
        setSubmitting(false)
      }
    })
  }

  let selectedMod: OptionImage

  // There is probably a better way to do this.
  modsData.forEach((mod) => {
    if (mod.id === props.mod.id) {
      selectedMod = {
        label: mod.name,
        value: mod.id,
        image: mod.mod
      }
    }

    return
  })

  const handleDelete = () => {
    router.delete(route('admin.mods.destroy', props.mod.id))
  }

  const showModal = () => {
    setModalVisible(true);
  }

  const hideModal = () => {
    setModalVisible(false);
  }

  useFlashMessages(props.flash, props.errors)

  return (
    <PageContentBlock title={t('mods_settings.mod_editing_name', { modName: props.mod.name })}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          name: props.mod.name,
          mod: props.mod.mod,
          icon_id: props.mod.id,
          enabled: props.mod.enabled
        }}
        validationSchema={ModEditSchema()}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <>
            <Modal
              isVisible={modalVisible}
              onClickCloseBtn={hideModal}
              onPressEscKey={hideModal}
              onClickBackdrop={hideModal}
            >
              <div className="flex flex-col justify-between h-full items-center gap-2 p-2">
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl text-left">{t('mods_settings.delete_mod', { modName: props.mod.name })}?</h3>
                  <p className="text-base">
                    {t('mods_settings.delete_mod_message')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button.Text onClick={hideModal}>
                    {t('cancel', { ns: 'buttons' })}
                  </Button.Text>
                  <Button.Danger onClick={handleDelete}>
                    {t('delete', { ns: 'buttons' })}
                  </Button.Danger>
                </div>
              </div>
            </Modal>
            <Form
              formikClassNames={'flex justify-center w-full'}
              formSize={'full'}
              className={'max-w-6xl w-full'}
            >
              <div className="flex flex-col gap-6">
                <Field.FieldRow>
                  <Field.Text
                    name={'name'}
                    id={'name'}
                    label={t('mods_settings.mod_name')}
                    disabled={!userCanEdit}
                  />
                  <Field.Text
                    name={'mod'}
                    id={'mod'}
                    label={t('mods_settings.mod_image_name')}
                    description={t('mods_settings.mod_image_description')}
                    disabled={!userCanEdit}
                  />
                  <Field.MultiSelect
                    name={'icon_id'}
                    id={'icon_id'}
                    label={t('mods_settings.mod_icon')}
                    isMulti={false}
                    options={modsData.map((mod) => ({ label: mod.name, value: mod.id, image: mod.mod }))}
                    // @ts-expect-error
                    onChange={(option: OptionImage) => {
                      setFieldValue('icon_id', option.value)
                      setFieldValue('name', option.label)
                      setFieldValue('mod', option.image)
                    }}
                    // @ts-expect-error
                    formatOptionLabel={(option: OptionImage) => (
                      <div className="flex gap-1">
                        <Image src={`/images/games/${option.image}.png`} alt={option.label} className="w-5" />
                        <span>{option.label}</span>
                      </div>
                    )}
                    defaultValue={selectedMod}
                    isDisabled={!userCanEdit}

                  />
                  <Field.CheckBox
                    name={'enabled'}
                    id={'enabled'}
                    label={t('enabled', { ns: 'table' })}
                    value={values.enabled ? 1 : 0}
                    checked={values.enabled}
                    onChange={(e) => setFieldValue('enabled', e.target.checked)}
                    disabled={!userCanEdit}
                  />
                </Field.FieldRow>
                <div className="flex items-center justify-center gap-2">
                  <Button.Text type={'submit'} disabled={isSubmitting || !userCanEdit}>
                    {t('update', { ns: 'buttons' })}
                  </Button.Text>
                  <Button.Danger type="button" className={'!font-header !w-fit'} disabled={!userCanDelete} onClick={showModal}>
                    {t('delete_mod', { ns: 'buttons' })}
                  </Button.Danger>
                </div>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </PageContentBlock>
  )
}

export default ModShow
