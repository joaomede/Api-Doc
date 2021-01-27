import { defineComponent, reactive, computed } from '@vue/composition-api'
import { Dialog } from './dialog'
import { i18n } from '../boot/i18n'

export const DialogAddApi = defineComponent({
  props: {
    /**
     * Dialog Boolean
     */
    dialog: {
      type: Boolean
    }
  },
  setup (p, ctx) {
    const resetForm = {
      apiName: '',
      descriptionApi: '',
      version: '',
      email: '',
      license: '',
      isPublic: false,
      baseURL: ''
    }

    const state = reactive({
      form: Object.assign({}, resetForm),
      title: i18n.t('menu.dialogAddApi.title'),
      fieldOptions: [
        {
          label: i18n.t('menu.dialogAddApi.form.apiName'),
          formField: 'apiName',
          required: true,
          type: 'input'
        },
        {
          label: i18n.t('menu.dialogAddApi.form.descriptionApi'),
          formField: 'descriptionApi',
          required: true,
          type: 'input'
        },
        {
          label: i18n.t('menu.dialogAddApi.form.version'),
          formField: 'version',
          required: true,
          type: 'input'
        },
        {
          label: i18n.t('menu.dialogAddApi.form.email'),
          formField: 'email',
          required: true,
          type: 'input'
        },
        {
          label: i18n.t('menu.dialogAddApi.form.license'),
          formField: 'license',
          required: true,
          type: 'input'
        },
        {
          label: i18n.t('menu.dialogAddApi.form.isPublic'),
          formField: 'isPublic',
          required: false,
          type: 'checkbox'
        },
        {
          label: i18n.t('menu.dialogAddApi.form.baseURL'),
          formField: 'baseURL',
          required: true,
          type: 'input'
        }
      ]
    })

    const reset = () => {
      state.form = Object.assign({}, resetForm)
    }

    const evtClose = () => {
      /**
       * Event Close
       */
      ctx.emit('eventClose')
      reset()
    }

    const evtConfirm = () => {
      /**
       * Event Confirm
       */
      ctx.emit('eventConfirm', state.form)
      evtClose()
    }

    /**
     * Card Section Action (contains Button actions)
     */
    const sectionAction = () => {
      return (
        <q-card-section align="center">
          <q-btn class="q-ma-xs" color="black" onclick={evtClose}>
            {i18n.t('geral.back')}
          </q-btn>
          <q-btn class="q-ma-xs" color="green" onclick={evtConfirm}>
            {i18n.t('geral.confirm')}
          </q-btn>
        </q-card-section>
      )
    }

    /**
     * Input Element (contains inputs)
     *
     * @param {*} el element ex. {formField, required, label and type}
     * @returns
     */
    const inputElement = (el) => {
      if (el.type === 'checkbox') {
        return (
          <q-card-section>
            <div class="q-gutter-sm">
              <q-checkbox
                v-model={state.form[el.formField]}
                keep-color
                required={el.required}
                label={el.label}
                color="blue"
              />
            </div>
          </q-card-section>
        )
      }

      if (el.type === 'input') {
        return (
          <q-card-section>
            <q-input
              v-model={state.form[el.formField]}
              label={el.label}
              required={el.required}
              dense
            />
          </q-card-section>
        )
      }
    }

    /**
     * Main Content (body, Title, Form inputs and Actions buttons)
     */
    const mainContent = () => {
      return (
        <div>
          <q-card-section>
            <div class="text-h6">
              {state.title}
            </div>
          </q-card-section>

          <q-form class="q-gutter-md">
            {state.fieldOptions.map(e => inputElement(e))}
          </q-form>

          {sectionAction()}
        </div>
      )
    }

    const dialogComponent = computed({
      get () {
        return p.dialog
      },
      set () {
        evtClose()
      }
    })

    return () => {
      return (
        <Dialog
          dialog={dialogComponent.value}
          onEventClose={e => (dialogComponent.value = e)}
        >
          <div slot={'body'}>{mainContent()}</div>
        </Dialog>
      )
    }
  }
})
