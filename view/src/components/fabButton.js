import { defineComponent, reactive, computed, getCurrentInstance } from '@vue/composition-api'

export const FabButton = defineComponent({
  props: {
    /**
     * Position, ex.: "left", "center", "right"
     */
    position: {
      type: String
    },
    /**
     * Icon, ex.: "add", "fas fa-arrow-left", "plus"
     */
    icon: {
      type: String
    },
    /**
     * Color, ex.: "blue"
     */
    color: {
      type: String
    }
  },
  setup (prop, ctx) {
    const root = getCurrentInstance().proxy.$root
    const evt = () => {
      /**
       * Event Click
       */
      ctx.emit('eventClick')
    }

    const modeView = computed(() => {
      if (root.$q.platform.is.desktop) {
        return {
          type: 'desktop'
        }
      } else if (root.$q.platform.is.mobile) {
        return {
          type: 'mobile'
        }
      }
    })

    const position = computed(() => {
      if (prop.position === 'center') {
        return style.center
      } else if (prop.position === 'left') {
        return style.left
      } else if (prop.position === 'right') {
        return style.right
      } else if (prop.position === 'back') {
        return style.back
      }
    })

    const style = reactive({
      center: {
        height: '75px',
        width: '75px',
        bottom: '10px',
        left: 'calc(50% - 20px)',
        'z-index': 2500
      },
      left: {
        left: '18px',
        bottom: '40px',
        'z-index': 2500
      },
      right: {
        right: '18px',
        bottom: '40px',
        'z-index': 2500
      },
      iconFabCenter: {
        'font-size': '50px !important'
      }
    })

    return () => {
      return (
        <q-btn
          round
          color={prop.color}
          class={'fixed'}
          style={[position.value]}
          onClick={evt}
        >
          <q-icon class={
            position === 'center' && modeView.value.type === 'desktop' ? style.iconFabCenter : ''
          } name={prop.icon}
          />
        </q-btn>
      )
    }
  }
})
