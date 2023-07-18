import { useState } from "react";
import { PageContentBlock } from "@/components/elements/PageContentBlock";
import { Button } from "@/components/elements/button";
import { Form } from "@/components/elements/Form";
import { Field } from "@/components/elements/field";
import { Modal } from "@/components/elements/modal";
import { Formik, FormikHelpers } from "formik";
import { useFlashMessages } from "@/hooks/useFlashMessages";
import { router } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import { UserData } from "@/stores/user";
import { FlashProp, ErrorsProp, GroupObject } from "@/types";
import { GroupEditSchema } from '@/yup/YupSchemas';
import { groupTypes } from "@/components/pages/admin/GroupSettings/GroupCreate";
import route from 'ziggy-js';
import { can } from "@/helpers";

interface Props {
  flash: FlashProp
  errors: ErrorsProp
  group: GroupObject
  auth: {
    user: UserData
  }
}

interface Values {
  name: string
  description: string
  type: string
}

function GroupShow(props: Props) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [userCanEdit, userCanDelete] = [can('admin.groups.edit'), can('admin.groups.destroy')];
  const { t } = useTranslation();

  const handleSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    router.patch(route('admin.groups.update', props.group.id), { ...values }, {
      onFinish: () => {
        setSubmitting(false)
      }
    })
  }

  const handleDelete = () => {
    router.delete(route('admin.groups.destroy', props.group.id))
  }

  const showModal = () => {
    setModalVisible(true);
  }

  const hideModal = () => {
    setModalVisible(false);
  }

  useFlashMessages(props.flash, props.errors)

  return (
    <PageContentBlock title={t('groups_settings.group_editing_name', {groupName: props.group.name})}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          name: props.group.name,
          description: props.group.description ?? '',
          type: props.group.type
        }}
        validationSchema={GroupEditSchema()}
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
                  <h3 className="text-2xl text-left">{t('groups_settings.delete_group', { groupName: props.group.name })}?</h3>
                  <p className="text-base">
                    {t('groups_settings.delete_group_message')}
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
                    label={t('groups_settings.group_name')}
                    disabled={!userCanEdit}
                  />
                  <Field.Text
                    name={'description'}
                    id={'description'}
                    label={t('groups_settings.group_description')}
                    disabled={!userCanEdit}
                  />
                  <Field.Select
                    name={'type'}
                    id={'type'}
                    label={t('groups_settings.group_type')}
                    value={values.type}
                    onChange={(e) => setFieldValue('type', e.target.value)}
                    disabled={!userCanEdit}
                  >
                    {groupTypes.map(({ id, name }) => (
                      <option key={id} value={name.toLowerCase().replace(' ', '_')}>
                        {name}
                      </option>
                    ))}
                  </Field.Select>
                </Field.FieldRow>
                <div className="flex items-center justify-center gap-2">
                  <Button.Text type={'submit'} disabled={isSubmitting || !userCanEdit}>
                    {t('update', { ns: 'buttons' })}
                  </Button.Text>
                  <Button.Danger type="button" className={'!font-header !w-fit'} disabled={!userCanDelete} onClick={showModal}>
                    {t('delete_group', { ns: 'buttons' })}
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

export default GroupShow
